import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { supabase, getSubscriptionPlan, createSubscription, awardTokens } from '../supabase/client';
import crypto from 'crypto';

const router = Router();

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY || '';
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const { data: plans, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    if (error) throw error;
    
    res.json({ plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
});

// Create crypto payment
router.post('/crypto/create', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { plan_id, billing_interval, currency = 'usdttrc20' } = req.body;
    const userId = req.user!.id;
    
    // Get plan details
    const plan = await getSubscriptionPlan(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    const amount = billing_interval === 'yearly' ? plan.price_yearly : plan.price_monthly;
    
    // Create payment in NOWPayments
    const paymentResponse = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NOWPAYMENTS_API_KEY,
      },
      body: JSON.stringify({
        price_amount: amount / 100, // Convert cents to dollars
        price_currency: 'usd',
        pay_currency: currency,
        order_id: `${userId}_${plan_id}_${Date.now()}`,
        order_description: `EthosLife ${plan.name} Subscription`,
        ipn_callback_url: `${process.env.API_URL}/webhooks/nowpayments`,
        success_url: `${process.env.APP_URL}/payment/success`,
        cancel_url: `${process.env.APP_URL}/payment/cancel`,
      }),
    });
    
    if (!paymentResponse.ok) {
      const error = await paymentResponse.json();
      throw new Error(error.message || 'Failed to create payment');
    }
    
    const paymentData = await paymentResponse.json();
    
    // Create pending payment record
    await supabase.from('payments').insert([{
      user_id: userId,
      amount: amount,
      currency: 'USD',
      payment_method: 'crypto',
      payment_provider: 'nowpayments',
      provider_payment_id: paymentData.payment_id,
      status: 'pending',
      crypto_address: paymentData.pay_address,
      metadata: {
        plan_id,
        billing_interval,
        pay_currency: currency,
        original_amount: amount / 100,
      },
    }]);
    
    res.json({
      payment_id: paymentData.payment_id,
      pay_address: paymentData.pay_address,
      pay_amount: paymentData.pay_amount,
      pay_currency: paymentData.pay_currency,
      valid_until: paymentData.valid_until,
    });
  } catch (error) {
    console.error('Create crypto payment error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Create Unity token payment (internal)
router.post('/unity/create', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { plan_id, billing_interval } = req.body;
    const userId = req.user!.id;
    
    // Get plan details
    const plan = await getSubscriptionPlan(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    const unityPrice = billing_interval === 'yearly' 
      ? plan.unity_price_yearly 
      : plan.unity_price_monthly;
    
    // Get user wallet
    const { data: wallet } = await supabase
      .from('user_wallets')
      .select('unity_balance')
      .eq('user_id', userId)
      .single();
    
    if (!wallet || wallet.unity_balance < unityPrice) {
      return res.status(400).json({ 
        error: 'Insufficient UNITY tokens',
        required: unityPrice,
        balance: wallet?.unity_balance || 0,
      });
    }
    
    // Deduct tokens
    const newBalance = wallet.unity_balance - unityPrice;
    await supabase
      .from('user_wallets')
      .update({ unity_balance: newBalance })
      .eq('user_id', userId);
    
    // Record transaction
    await supabase.from('token_transactions').insert([{
      user_id: userId,
      transaction_type: 'subscription_payment',
      amount: -unityPrice,
      balance_after: newBalance,
      reference_type: 'subscription',
      description: `Payment for ${plan.name} (${billing_interval})`,
    }]);
    
    // Create subscription
    const subscription = await createSubscription({
      user_id: userId,
      plan_id,
      billing_interval,
      payment_provider: 'unity_token',
      amount_paid: billing_interval === 'yearly' ? plan.price_yearly : plan.price_monthly,
      currency: 'USD',
      unity_tokens_used: unityPrice,
    });
    
    res.json({
      success: true,
      subscription,
      tokens_deducted: unityPrice,
      new_balance: newBalance,
    });
  } catch (error) {
    console.error('Unity payment error:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Get payment status
router.get('/status/:paymentId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { paymentId } = req.params;
    
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('provider_payment_id', paymentId)
      .eq('user_id', req.user!.id)
      .single();
    
    if (error || !payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    res.json({ payment });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Get user's payment history
router.get('/history', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*, subscription:user_subscriptions(*)')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({ payments });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// Get current subscription
router.get('/subscription', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*, plan:subscription_plans(*)')
      .eq('user_id', req.user!.id)
      .eq('status', 'active')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    res.json({ subscription });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Failed to get subscription' });
  }
});

// Cancel subscription
router.post('/subscription/cancel', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .update({ 
        cancel_at_period_end: true,
        cancelled_at: new Date().toISOString(),
      })
      .eq('user_id', req.user!.id)
      .eq('status', 'active')
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({ message: 'Subscription cancelled', subscription });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel' });
  }
});

// Webhook handler for NOWPayments
router.post('/webhooks/nowpayments', async (req, res) => {
  try {
    const { 
      payment_id, 
      payment_status, 
      pay_address, 
      pay_amount,
      actually_paid,
      order_id,
    } = req.body;
    
    // Verify signature if needed
    // const signature = req.headers['x-nowpayments-sig'];
    
    if (payment_status === 'finished' || payment_status === 'confirmed') {
      // Get payment record
      const { data: payment } = await supabase
        .from('payments')
        .select('*, metadata')
        .eq('provider_payment_id', payment_id)
        .single();
      
      if (!payment || payment.status === 'completed') {
        return res.json({ received: true });
      }
      
      // Update payment status
      await supabase
        .from('payments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          crypto_tx_hash: req.body.pay_transaction_hash,
        })
        .eq('id', payment.id);
      
      // Create subscription
      const metadata = payment.metadata || {};
      await createSubscription({
        user_id: payment.user_id,
        plan_id: metadata.plan_id,
        billing_interval: metadata.billing_interval || 'monthly',
        payment_provider: 'nowpayments',
        amount_paid: payment.amount,
        currency: payment.currency,
      });
      
      // Award referral bonus if applicable
      const { data: user } = await supabase
        .from('profiles')
        .select('referred_by')
        .eq('id', payment.user_id)
        .single();
      
      if (user?.referred_by) {
        await awardTokens(user.referred_by, 'referral_subscription');
      }
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;

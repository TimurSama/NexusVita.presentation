import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1';

// Create crypto payment
router.post('/crypto/create', async (req, res) => {
  try {
    const { plan_id, payment_currency = 'USDTTRC20' } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get plan details
    const planPrices: Record<string, number> = {
      'basic': 20,
      'premium': 50,
      'specialist_pro': 30,
      'center_basic': 100,
      'center_premium': 300,
      'center_corporate': 1000,
    };

    const amount = planPrices[plan_id];
    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Create payment with NOWPayments
    const response = await fetch(`${NOWPAYMENTS_API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NOWPAYMENTS_API_KEY || '',
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: 'usd',
        pay_currency: payment_currency,
        order_id: `${decoded.userId}_${plan_id}_${Date.now()}`,
        order_description: `Subscription: ${plan_id}`,
        ipn_callback_url: `${process.env.API_URL}/api/payments/webhook`,
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('NOWPayments error:', error);
      return res.status(400).json({ error: 'Failed to create payment' });
    }

    const paymentData = await response.json();

    // Store pending payment
    await supabase.from('payments').insert({
      user_id: decoded.userId,
      plan_id,
      amount,
      currency: payment_currency,
      provider: 'nowpayments',
      provider_payment_id: paymentData.payment_id,
      status: 'pending',
      metadata: paymentData,
    });

    res.json({
      payment_id: paymentData.payment_id,
      payment_url: paymentData.pay_address,
      amount: paymentData.pay_amount,
      currency: payment_currency,
      address: paymentData.pay_address,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pay with Unity tokens
router.post('/token/pay', async (req, res) => {
  try {
    const { plan_id } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get plan price in Unity tokens (1 USD = 8.5 UNITY)
    const planPrices: Record<string, number> = {
      'basic': 20 * 8.5,
      'premium': 50 * 8.5,
      'specialist_pro': 30 * 8.5,
      'center_basic': 100 * 8.5,
      'center_premium': 300 * 8.5,
      'center_corporate': 1000 * 8.5,
    };

    const tokenAmount = planPrices[plan_id];
    if (!tokenAmount) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Check balance
    const { data: userTokens } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', decoded.userId)
      .single();

    if (!userTokens || userTokens.balance < tokenAmount) {
      return res.status(400).json({ error: 'Insufficient token balance' });
    }

    // Deduct tokens
    const { error: updateError } = await supabase
      .from('user_tokens')
      .update({
        balance: userTokens.balance - tokenAmount,
        total_spent: supabase.rpc('increment_spent', { amount: tokenAmount }),
      })
      .eq('user_id', decoded.userId);

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    // Record transaction
    await supabase.from('token_transactions').insert({
      user_id: decoded.userId,
      amount: -tokenAmount,
      type: 'payment',
      description: `Subscription: ${plan_id}`,
    });

    // Activate subscription
    await activateSubscription(decoded.userId, plan_id, 'unity_token');

    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.error('Token payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user subscription
router.get('/subscription', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', decoded.userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    res.json({ subscription: subscription || null });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get token balance
router.get('/tokens/balance', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data: balance } = await supabase
      .from('user_tokens')
      .select('balance, total_earned, total_spent')
      .eq('user_id', decoded.userId)
      .single();

    const { data: transactions } = await supabase
      .from('token_transactions')
      .select('*')
      .eq('user_id', decoded.userId)
      .order('created_at', { ascending: false })
      .limit(20);

    res.json({
      balance: balance?.balance || 0,
      total_earned: balance?.total_earned || 0,
      total_spent: balance?.total_spent || 0,
      transactions: transactions || [],
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Webhook handler for NOWPayments
router.post('/webhook', async (req, res) => {
  try {
    const { payment_id, payment_status, order_id } = req.body;

    if (payment_status === 'finished') {
      // Find payment
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('provider_payment_id', payment_id)
        .single();

      if (payment && payment.status === 'pending') {
        // Update payment status
        await supabase
          .from('payments')
          .update({ status: 'completed', metadata: { ...payment.metadata, ...req.body } })
          .eq('id', payment.id);

        // Activate subscription
        await activateSubscription(payment.user_id, payment.plan_id, 'crypto');

        // Handle referrals
        await processReferralBonus(payment.user_id, payment.amount);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper functions
async function activateSubscription(userId: string, planId: string, paymentMethod: string) {
  const planDurations: Record<string, number> = {
    'basic': 30,
    'premium': 30,
    'specialist_pro': 30,
    'center_basic': 30,
    'center_premium': 30,
    'center_corporate': 30,
  };

  const duration = planDurations[planId] || 30;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);

  await supabase.from('subscriptions').insert({
    user_id: userId,
    plan_id: planId,
    status: 'active',
    payment_provider: paymentMethod,
    current_period_start: now.toISOString(),
    current_period_end: expiresAt.toISOString(),
  });

  // Update user profile
  await supabase
    .from('user_profiles')
    .update({ subscription_tier: planId })
    .eq('id', userId);
}

async function processReferralBonus(userId: string, amount: number) {
  // Find referrer
  const { data: referral } = await supabase
    .from('referrals')
    .select('referrer_id, commission_paid')
    .eq('referred_id', userId)
    .eq('status', 'pending')
    .single();

  if (referral && !referral.commission_paid) {
    const commission = amount * 0.2; // 20% referral bonus

    // Credit referrer
    await supabase.rpc('add_token_balance', {
      p_user_id: referral.referrer_id,
      p_amount: commission * 8.5, // Convert USD to UNITY
    });

    // Record transaction
    await supabase.from('token_transactions').insert({
      user_id: referral.referrer_id,
      amount: commission * 8.5,
      type: 'referral',
      description: 'Referral commission',
    });

    // Update referral
    await supabase
      .from('referrals')
      .update({ status: 'completed', commission_paid: true, commission_amount: commission })
      .eq('referrer_id', referral.referrer_id)
      .eq('referred_id', userId);
  }
}

// Get crypto payment status
router.get('/crypto/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get payment from database
    const { data: payment, error } = await supabase
      .from('payments')
      .select('status, metadata')
      .eq('provider_payment_id', paymentId)
      .single();

    if (error || !payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check with NOWPayments API for latest status
    try {
      const response = await fetch(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY || '',
        },
      });

      if (response.ok) {
        const nowPaymentsData = await response.json();
        
        // Update status if changed
        if (nowPaymentsData.payment_status !== payment.status) {
          await supabase
            .from('payments')
            .update({ 
              status: nowPaymentsData.payment_status,
              metadata: { ...payment.metadata, ...nowPaymentsData }
            })
            .eq('provider_payment_id', paymentId);

          // Activate subscription if completed
          if (nowPaymentsData.payment_status === 'finished') {
            const paymentData = await supabase
              .from('payments')
              .select('user_id, plan_id')
              .eq('provider_payment_id', paymentId)
              .single();

            if (paymentData.data) {
              await activateSubscription(
                paymentData.data.user_id,
                paymentData.data.plan_id,
                'crypto'
              );
            }
          }

          return res.json({ status: nowPaymentsData.payment_status });
        }
      }
    } catch (apiError) {
      console.error('NOWPayments API error:', apiError);
    }

    res.json({ status: payment.status });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Transfer tokens to another user
router.post('/tokens/transfer', async (req, res) => {
  try {
    const { amount, recipient_username } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Find recipient
    const { data: recipient } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', recipient_username.replace('@', ''))
      .single();

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    if (recipient.id === decoded.userId) {
      return res.status(400).json({ error: 'Cannot send to yourself' });
    }

    // Check sender balance
    const { data: senderTokens } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', decoded.userId)
      .single();

    if (!senderTokens || senderTokens.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct from sender
    await supabase
      .from('user_tokens')
      .update({
        balance: senderTokens.balance - amount,
        total_spent: supabase.rpc('increment', { x: amount }),
      })
      .eq('user_id', decoded.userId);

    // Add to recipient
    await supabase.rpc('add_token_balance', {
      p_user_id: recipient.id,
      p_amount: amount,
    });

    // Record transactions
    await Promise.all([
      supabase.from('token_transactions').insert({
        user_id: decoded.userId,
        amount: -amount,
        type: 'transfer',
        description: `Transfer to @${recipient_username}`,
        status: 'completed',
      }),
      supabase.from('token_transactions').insert({
        user_id: recipient.id,
        amount: amount,
        type: 'transfer',
        description: `Transfer from @${decoded.userId}`,
        status: 'completed',
      }),
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

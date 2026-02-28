import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';

interface Plan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  unity_price_monthly: number;
  unity_price_yearly: number;
  features: Record<string, any>;
}

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/payments/plans');
      if (response.ok) {
        const data = await response.json();
        const userPlans = data.plans.filter((p: Plan) => p.id.startsWith('user_'));
        setPlans(userPlans);
      }
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      toast.info(t('auth.noAccount'));
      navigate('/register');
      return;
    }
    navigate(`/checkout?plan=${planId}&interval=${billingInterval}`);
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(0)}`;
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    return Math.round((savings / monthlyCost) * 100);
  };

  const getFeatureLabel = (key: string, value: any): string | null => {
    switch (key) {
      case 'modules':
        return value === -1 
          ? t('pricing.features.allModules') 
          : `${value} ${t('health.title')}`;
      case 'ai_messages':
        return value === -1 
          ? t('pricing.features.unlimitedAI') 
          : `${value} ${t('pricing.features.aiChat')}`;
      case 'habits':
        return value === -1 
          ? t('pricing.features.unlimitedHabits') 
          : `${value} ${t('health.modules.habits')}`;
      case 'wearables':
        return t('pricing.features.wearables');
      case 'unity_cashback':
        return `${value} UNITY/${t('pricing.month')}`;
      case 'specialists':
        return t('pricing.features.specialists');
      case 'export':
        return value === true ? t('pricing.features.export') : null;
      case 'priority_support':
        return value === true ? t('pricing.features.prioritySupport') : null;
      case 'ads':
        return value === true ? 'No ads' : null;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            {t('pricing.subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${billingInterval === 'monthly' ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
              {t('pricing.monthly')}
            </span>
            <button
              onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-slate-200 rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  billingInterval === 'yearly' ? 'translate-x-8' : ''
                }`}
              />
            </button>
            <span className={`text-sm ${billingInterval === 'yearly' ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
              {t('pricing.yearly')}
            </span>
            {billingInterval === 'yearly' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {t('pricing.save')} 17%
              </span>
            )}
          </div>
        </div>

        {/* Unity Token Banner */}
        <div className="max-w-3xl mx-auto mb-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{t('wallet.bonusInfo')}</h3>
              <p className="text-slate-600 text-sm">
                {t('wallet.rate')}: {t('wallet.1USD')}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/wallet')}>
              {t('common.details')}
            </Button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isPopular = plan.id === 'user_basic';
            const price = billingInterval === 'yearly' ? plan.price_yearly : plan.price_monthly;
            const unityPrice = billingInterval === 'yearly' ? plan.unity_price_yearly : plan.unity_price_monthly;

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${
                  isPopular
                    ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-200 scale-105'
                    : 'border border-slate-200'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 text-sm font-medium">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    {t('pricing.popular')}
                  </div>
                )}

                <CardHeader className={`pt-${isPopular ? '12' : '6'} pb-6`}>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mt-1">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-slate-900">
                        {formatPrice(price)}
                      </span>
                      <span className="text-slate-500">
                        /{billingInterval === 'yearly' ? t('pricing.year') : t('pricing.month')}
                      </span>
                    </div>
                    {unityPrice > 0 && (
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="text-slate-500">{t('common.or')}</span>
                        <span className="font-medium text-yellow-600">
                          {unityPrice} UNITY
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          -15%
                        </span>
                      </div>
                    )}
                    {billingInterval === 'yearly' && plan.price_monthly > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        {t('pricing.save')} {calculateSavings(plan.price_monthly, plan.price_yearly)}%
                      </p>
                    )}
                  </div>

                  <Button
                    className={`w-full py-6 mb-6 ${
                      isPopular
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                        : plan.id === 'user_free'
                        ? 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={user?.subscription_tier === plan.id.replace('user_', '')}
                  >
                    {user?.subscription_tier === plan.id.replace('user_', '')
                      ? t('pricing.currentPlan')
                      : plan.id === 'user_free'
                      ? t('pricing.startFree')
                      : t('pricing.subscribe')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <ul className="space-y-3">
                    {Object.entries(plan.features).map(([key, value]) => {
                      const label = getFeatureLabel(key, value);
                      if (!label) return null;
                      
                      return (
                        <li key={key} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 ${isPopular ? 'text-emerald-500' : 'text-green-500'}`} />
                          <span className="text-slate-700 text-sm">{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">FAQ</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">Can I change my plan later?</h3>
              <p className="text-slate-600 text-sm">Yes, you can upgrade or downgrade anytime. Changes take effect in the next billing period.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">What are UNITY tokens?</h3>
              <p className="text-slate-600 text-sm">UNITY is the internal currency. Earn tokens for activity and referrals, spend on subscriptions with 15% discount.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">What payment methods?</h3>
              <p className="text-slate-600 text-sm">We accept crypto (BTC, ETH, USDT, USDC) via NOWPayments and UNITY tokens.</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500">
            {t('pricing.moneyBack')} • {t('pricing.cancelAnytime')}
          </p>
        </div>
      </div>
    </div>
  );
}

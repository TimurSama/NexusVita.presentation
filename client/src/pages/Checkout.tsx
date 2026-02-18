import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, Wallet, Copy, CheckCircle, AlertCircle,
  ArrowLeft, Loader2, Gift
} from 'lucide-react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

interface PaymentData {
  payment_id: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  valid_until: string;
}

export default function Checkout() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const planId = params.get('plan');
  const interval = params.get('interval') as 'monthly' | 'yearly' || 'monthly';
  
  const { user, token, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('usdttrc20');
  const [copied, setCopied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [unityBalance, setUnityBalance] = useState(0);
  const [planDetails, setPlanDetails] = useState<any>(null);

  const currencies = [
    { id: 'usdttrc20', name: 'USDT (TRC20)', icon: '💎' },
    { id: 'usdterc20', name: 'USDT (ERC20)', icon: '💎' },
    { id: 'btc', name: 'Bitcoin', icon: '₿' },
    { id: 'eth', name: 'Ethereum', icon: 'Ξ' },
    { id: 'unity', name: 'UNITY Token', icon: '🪙' },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/register?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }
    
    fetchPlanDetails();
    fetchWalletBalance();
  }, [isAuthenticated, planId]);

  const fetchPlanDetails = async () => {
    try {
      const response = await fetch('/api/payments/plans');
      if (response.ok) {
        const data = await response.json();
        const plan = data.plans.find((p: any) => p.id === planId);
        setPlanDetails(plan);
      }
    } catch (error) {
      console.error('Failed to fetch plan:', error);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const response = await fetch('/api/wallet/balance', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUnityBalance(data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const createCryptoPayment = async () => {
    if (selectedCurrency === 'unity') {
      createUnityPayment();
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/payments/crypto/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_id: planId,
          billing_interval: interval,
          currency: selectedCurrency,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentData(data);
        toast.success('Платеж создан! Отправьте точную сумму на указанный адрес.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Не удалось создать платеж');
      }
    } catch (error) {
      toast.error('Ошибка при создании платежа');
    } finally {
      setLoading(false);
    }
  };

  const createUnityPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments/unity/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_id: planId,
          billing_interval: interval,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Оплата прошла успешно!');
        navigate('/dashboard');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Недостаточно токенов');
      }
    } catch (error) {
      toast.error('Ошибка при оплате токенами');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (paymentData?.pay_address) {
      navigator.clipboard.writeText(paymentData.pay_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Адрес скопирован');
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentData) return;
    
    setCheckingStatus(true);
    try {
      const response = await fetch(`/api/payments/status/${paymentData.payment_id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.payment.status === 'completed') {
          toast.success('Платеж подтвержден!');
          navigate('/dashboard');
        } else {
          toast.info('Платеж еще обрабатывается. Проверьте позже.');
        }
      }
    } catch (error) {
      toast.error('Не удалось проверить статус');
    } finally {
      setCheckingStatus(false);
    }
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(0)}`;

  if (!planDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const price = interval === 'yearly' ? planDetails.price_yearly : planDetails.price_monthly;
  const unityPrice = interval === 'yearly' ? planDetails.unity_price_yearly : planDetails.unity_price_monthly;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/pricing')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к тарифам
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Заказ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">{planDetails.name}</p>
                    <p className="text-sm text-slate-600">
                      {interval === 'yearly' ? 'Годовая подписка' : 'Ежемесячная подписка'}
                    </p>
                  </div>
                  <p className="font-bold text-slate-900">{formatPrice(price)}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Итого</span>
                    <span className="text-2xl font-bold text-slate-900">{formatPrice(price)}</span>
                  </div>
                  <p className="text-sm text-slate-500">
                    или {unityPrice} UNITY токенов с выгодой 15%
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 text-sm">
                    <Gift className="w-4 h-4" />
                    <span>Вы получите {planDetails.features?.unity_cashback || 0} UNITY кэшбэк</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Способ оплаты</CardTitle>
            </CardHeader>
            <CardContent>
              {!paymentData ? (
                <div className="space-y-4">
                  <Tabs value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="usdttrc20">Криптовалюта</TabsTrigger>
                      <TabsTrigger value="unity">UNITY токены</TabsTrigger>
                    </TabsList>

                    <TabsContent value="usdttrc20" className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {currencies.filter(c => c.id !== 'unity').map((currency) => (
                          <button
                            key={currency.id}
                            onClick={() => setSelectedCurrency(currency.id)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                              selectedCurrency === currency.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <span className="text-2xl mr-2">{currency.icon}</span>
                            <span className="text-sm font-medium">{currency.name}</span>
                          </button>
                        ))}
                      </div>

                      <Button
                        className="w-full py-6"
                        onClick={createCryptoPayment}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Создание платежа...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Оплатить {formatPrice(price)}
                          </>
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="unity" className="space-y-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-600">Ваш баланс</span>
                          <span className="font-bold text-slate-900">{unityBalance} UNITY</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">К оплате</span>
                          <span className="font-bold text-yellow-600">{unityPrice} UNITY</span>
                        </div>
                        <div className="mt-2 text-sm text-green-600">
                          Вы экономите {(price / 100 * 0.15).toFixed(2)}$
                        </div>
                      </div>

                      {unityBalance >= unityPrice ? (
                        <Button
                          className="w-full py-6 bg-gradient-to-r from-yellow-500 to-orange-500"
                          onClick={createUnityPayment}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Обработка...
                            </>
                          ) : (
                            <>
                              <Wallet className="w-4 h-4 mr-2" />
                              Оплатить {unityPrice} UNITY
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="p-4 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            <span>Недостаточно токенов</span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            Не хватает {unityPrice - unityBalance} UNITY
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                      <Wallet className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ожидание оплаты</h3>
                    <p className="text-slate-600 text-sm">
                      Отправьте точную сумму на указанный адрес
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-slate-600">Сумма к оплате</Label>
                      <div className="text-2xl font-bold text-slate-900">
                        {paymentData.pay_amount} {paymentData.pay_currency.toUpperCase()}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm text-slate-600">Адрес для оплаты</Label>
                      <div className="flex gap-2">
                        <Input
                          value={paymentData.pay_address}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={copyAddress}
                        >
                          {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                      <p className="font-medium mb-1">⚠️ Важно:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Отправьте точную сумму</li>
                        <li>Используйте только {paymentData.pay_currency.toUpperCase()}</li>
                        <li>Транзакция будет подтверждена после 2 подтверждений сети</li>
                      </ul>
                    </div>

                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={checkPaymentStatus}
                      disabled={checkingStatus}
                    >
                      {checkingStatus ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Проверка...
                        </>
                      ) : (
                        'Проверить оплату'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  Bitcoin, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  QrCode,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface PaymentData {
  payment_id: string;
  payment_url: string;
  amount: number;
  currency: string;
  address: string;
  status: 'pending' | 'confirming' | 'confirmed' | 'completed' | 'failed';
  plan_name: string;
  plan_price: number;
}

const planNames: Record<string, string> = {
  'basic': 'Basic',
  'premium': 'Premium',
  'specialist_pro': 'Specialist Pro',
  'center_basic': 'Center Basic',
  'center_premium': 'Center Premium',
  'center_corporate': 'Center Corporate',
};

const planPrices: Record<string, number> = {
  'basic': 20,
  'premium': 50,
  'specialist_pro': 30,
  'center_basic': 100,
  'center_premium': 300,
  'center_corporate': 1000,
};

export default function CryptoPayment() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const planId = params.planId || 'basic';
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    if (token && planId) {
      createPayment();
    }
  }, [token, planId]);

  useEffect(() => {
    if (!payment || payment.status !== 'pending') return;

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Check payment status
    const checkStatus = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/crypto/status/${payment.payment_id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setPayment((prev) => prev ? { ...prev, status: data.status } : null);

          if (data.status === 'completed') {
            clearInterval(checkStatus);
            clearInterval(timer);
            toast({
              title: "Оплата успешна!",
              description: "Ваша подписка активирована",
            });
            setTimeout(() => setLocation('/dashboard'), 2000);
          }
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 10000); // Check every 10 seconds

    return () => {
      clearInterval(timer);
      clearInterval(checkStatus);
    };
  }, [payment?.payment_id, payment?.status]);

  const createPayment = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/payments/crypto/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_id: planId,
          payment_currency: 'USDTTRC20',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await res.json();
      setPayment({
        ...data,
        plan_name: planNames[planId] || planId,
        plan_price: planPrices[planId] || 0,
        status: 'pending',
      });
    } catch (error) {
      console.error('Create payment error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    if (payment?.address) {
      navigator.clipboard.writeText(payment.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Адрес скопирован" });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = () => {
    switch (payment?.status) {
      case 'completed':
        return <CheckCircle2 className="w-16 h-16 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
      case 'confirming':
      case 'confirmed':
        return <RefreshCw className="w-16 h-16 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-16 h-16 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (payment?.status) {
      case 'completed':
        return 'Оплата подтверждена!';
      case 'failed':
        return 'Оплата не удалась';
      case 'confirming':
        return 'Подтверждение транзакции...';
      case 'confirmed':
        return 'Обработка платежа...';
      default:
        return 'Ожидание оплаты...';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Войдите для оплаты</p>
          <Button onClick={() => setLocation("/login")}>Войти</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-slate-600">Создание платежа...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation('/pricing')}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Криптовалютная оплата</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Status Card */}
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                {getStatusIcon()}
              </div>
              <h2 className="text-xl font-bold mb-2">{getStatusText()}</h2>
              <p className="text-slate-500">
                {payment?.plan_name} — ${payment?.plan_price}
              </p>
              
              {payment?.status === 'pending' && (
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Осталось времени: {formatTime(timeLeft)}</span>
                  </div>
                  <Progress value={(timeLeft / 1800) * 100} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {payment?.status === 'pending' && (
            <>
              {/* Payment Details */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Реквизиты для оплаты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-slate-500">Сумма к оплате</Label>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{payment?.amount}</span>
                      <span className="text-slate-500">{payment?.currency}</span>
                    </div>
                    <p className="text-xs text-slate-400">≈ ${payment?.plan_price} USD</p>
                  </div>

                  <div>
                    <Label className="text-sm text-slate-500">Адрес для перевода</Label>
                    <div className="flex gap-2 mt-1">
                      <code className="flex-1 bg-slate-100 px-3 py-2 rounded-lg text-sm break-all">
                        {payment?.address}
                      </code>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={copyAddress}
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-center py-4">
                    <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
                      <QrCode className="w-20 h-20 text-slate-400" />
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <p className="text-xs text-amber-800">
                        Отправьте точную сумму на указанный адрес. 
                        Комиссия сети не включена — отправьте с учетом комиссии.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Как оплатить</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      <span>Откройте свой криптокошелек (Trust Wallet, MetaMask, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      <span>Выберите сеть TRC20 (Tron)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      <span>Скопируйте адрес и сумму выше</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                      <span>Отправьте точную сумму</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                      <span>Ожидайте подтверждения (обычно 5-15 минут)</span>
                    </li>
                  </ol>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.open('https://nowpayments.io/', '_blank')}
                  >
                    Поддержка NOWPayments <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {payment?.status === 'completed' && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Подписка активирована!
                </h3>
                <p className="text-green-700 mb-4">
                  Спасибо за оплату. Ваша подписка {payment?.plan_name} теперь активна.
                </p>
                <Button onClick={() => setLocation('/dashboard')}>
                  Перейти в дашборд
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  );
}


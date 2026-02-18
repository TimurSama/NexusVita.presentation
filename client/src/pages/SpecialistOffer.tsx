import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, TrendingUp, Award, ArrowRight, CheckCircle,
  Calendar, BarChart3, Gift, Star, Clock, Shield, Zap, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

// Hero Section
function HeroSection() {
  const [, navigate] = useLocation();

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              <span>Для специалистов</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Зарабатывайте на своей экспертизе
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              Присоединяйтесь к экосистеме EthosLife. Получайте доступ к базе клиентов, 
              автоматические выплаты и доход до 95% от консультаций.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Рассчитать доход
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => navigate('/register?role=specialist')}
              >
                Стать специалистом
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-30 blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Ваш потенциальный доход</p>
                    <p className="text-3xl font-bold">$4,750/мес</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">50 клиентов</span>
                    <span>× $100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Комиссия платформы</span>
                    <span className="text-green-400">5%</span>
                  </div>
                  <div className="h-px bg-white/20 my-3" />
                  <div className="flex justify-between font-semibold">
                    <span>Чистый доход</span>
                    <span>$4,750</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    { icon: DollarSign, title: "Доход 95%", desc: "Самая низкая комиссия на рынке — всего 5%" },
    { icon: Users, title: "Готовые клиенты", desc: "База пользователей, ищущих специалистов" },
    { icon: BarChart3, title: "Полная аналитика", desc: "Дашборд со статистикой и прогрессом клиентов" },
    { icon: Clock, title: "Автовыплаты", desc: "Еженедельные автоматические выплаты" },
    { icon: Shield, title: "Гарантии", desc: "Защита данных и прозрачные условия" },
    { icon: Zap, title: "Быстрый старт", desc: "Начните принимать клиентов через 24 часа" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Почему специалисты выбирают EthosLife</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Calculator Section
function CalculatorSection() {
  const [clients, setClients] = useState(20);
  const [price, setPrice] = useState(50);
  const [plan, setPlan] = useState<'starter' | 'pro'>('pro');

  const commission = plan === 'starter' ? 0.15 : 0.05;
  const monthlyRevenue = clients * price;
  const commissionAmount = monthlyRevenue * commission;
  const netIncome = monthlyRevenue - commissionAmount;
  const planCost = plan === 'starter' ? 0 : 30;

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Калькулятор дохода</h2>
          <p className="text-xl text-slate-600">Рассчитайте свой потенциальный заработок</p>
        </div>

        <Card className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <Label className="text-slate-700">Количество клиентов в месяц</Label>
              <Input
                type="number"
                value={clients}
                onChange={(e) => setClients(parseInt(e.target.value) || 0)}
                className="mt-2 text-lg"
              />
              <input
                type="range"
                min="1"
                max="100"
                value={clients}
                onChange={(e) => setClients(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
            <div>
              <Label className="text-slate-700">Стоимость консультации ($)</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                className="mt-2 text-lg"
              />
              <input
                type="range"
                min="20"
                max="500"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>

          <Tabs value={plan} onValueChange={(v) => setPlan(v as 'starter' | 'pro')} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="starter">Starter (Free)</TabsTrigger>
              <TabsTrigger value="pro">Professional ($30/мес)</TabsTrigger>
            </TabsList>
            <TabsContent value="starter" className="p-4 bg-slate-50 rounded-lg mt-4">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>Комиссия: 15%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 mt-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span>До 5 активных подключений</span>
              </div>
            </TabsContent>
            <TabsContent value="pro" className="p-4 bg-blue-50 rounded-lg mt-4">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Комиссия: 5%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 mt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Безлимитные подключения</span>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Валовый доход</p>
              <p className="text-2xl font-bold text-slate-900">${monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Комиссия ({plan === 'starter' ? '15%' : '5%'})</p>
              <p className="text-2xl font-bold text-red-600">-${commissionAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Чистый доход</p>
              <p className="text-3xl font-bold text-green-600">${(netIncome - planCost).toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Bonus Program Section
function BonusSection() {
  const bonuses = [
    { icon: Users, title: "Приведи друга", desc: "Приведите 5 пользователей → 1 мес бесплатно", reward: "1 мес" },
    { icon: Star, title: "Подписки", desc: "Если ваш реферал оформит подписку", reward: "3 мес" },
    { icon: Building, title: "Приведи центр", desc: "Спортзал, СПА, бассейн, клиника", reward: "До 50%" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Бонусная программа</h2>
          <p className="text-xl text-blue-100">Зарабатывайте больше, развивая экосистему</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bonuses.map((bonus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">
                <bonus.icon className="w-7 h-7 text-yellow-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">{bonus.title}</h3>
              <p className="text-blue-100 mb-4">{bonus.desc}</p>
              <div className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-full">
                Награда: {bonus.reward}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">💎 Супер-бонус: Приведи центр</h3>
              <p className="text-blue-100">
                Если вы приведете спортзал, СПА, бассейн или клинику, вы будете получать 
                <span className="text-yellow-300 font-bold"> до 50% от их ежемесячной подписки</span>!
              </p>
            </div>
            <Button className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 px-8 whitespace-nowrap">
              Узнать подробнее
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Регистрация", desc: "Создайте профиль специалиста. Укажите свою специализацию, опыт и стоимость услуг." },
    { number: "02", title: "Верификация", desc: "Подтвердите квалификацию. Это повышает доверие клиентов." },
    { number: "03", title: "Получайте клиентов", desc: "Пользователи находят вас через каталог и подключаются к своему дашборду." },
    { number: "04", title: "Анализ и рекомендации", desc: "Смотрите данные клиентов, давайте персональные рекомендации." },
    { number: "05", title: "Получайте выплаты", desc: "Автоматические выплаты каждую неделю на ваш кошелек." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Как это работает</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const [, navigate] = useLocation();

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Начните зарабатывать на своей экспертизе
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Присоединяйтесь к сообществу специалистов EthosLife уже сегодня
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-12 py-6 text-lg"
          onClick={() => navigate('/register?role=specialist')}
        >
          Стать специалистом
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-slate-500 text-sm mt-6">
          Бесплатная регистрация • Начните через 24 часа • Отмена в любой момент
        </p>
      </div>
    </section>
  );
}

// Main Page
export default function SpecialistOffer() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsSection />
      <CalculatorSection />
      <BonusSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}

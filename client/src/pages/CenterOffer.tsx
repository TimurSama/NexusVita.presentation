import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, Calendar, BarChart3, Shield, Zap, ArrowRight, 
  CheckCircle, Star, TrendingUp, Gift, Clock, Award, Wallet,
  Dumbbell, Heart, Sparkles, Stethoscope, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'wouter';

// Hero Section
function HeroSection() {
  const [, navigate] = useLocation();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Building2 className="w-4 h-4" />
              <span>Для бизнеса</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Развивайте свой{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                wellness-бизнес
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              Присоединяйтесь к экосистеме EthosLife. Получайте поток клиентов, 
              управляйте сотрудниками через CRM, автоматизируйте бронирования.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-indigo-900 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
                onClick={() => navigate('/register?role=center')}
              >
                Подключить центр
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Рассчитать выгоду
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Быстрый запуск за 48 часов</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Без скрытых комиссий</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-30 blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-blue-200">Рост клиентов</span>
                    </div>
                    <p className="text-3xl font-bold">+150%</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-blue-200">Доход</span>
                    </div>
                    <p className="text-3xl font-bold">$15K/мес</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-blue-200">Активные</span>
                    </div>
                    <p className="text-3xl font-bold">1,240</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-blue-200">Рейтинг</span>
                    </div>
                    <p className="text-3xl font-bold">4.9</p>
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
    { 
      icon: Users, 
      title: "Поток клиентов", 
      desc: "Доступ к базе из 50,000+ активных пользователей, ищущих wellness-услуги" 
    },
    { 
      icon: Calendar, 
      title: "Автобронирование", 
      desc: "Система онлайн-записи с интеграцией календаря и напоминаниями" 
    },
    { 
      icon: BarChart3, 
      title: "CRM система", 
      desc: "Управление клиентами, аналитика посещаемости, финансовая отчетность" 
    },
    { 
      icon: Shield, 
      title: "Лояльность клиентов", 
      desc: "Геймификация, бонусы за посещения, система рекомендаций" 
    },
    { 
      icon: Zap, 
      title: "Быстрые выплаты", 
      desc: "Автоматические еженедельные выплаты на крипто-кошелек или банк" 
    },
    { 
      icon: Gift, 
      title: "Программа лояльности", 
      desc: "Unity токены для ваших клиентов, которые стимулируют возвращаться" 
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Преимущества для вашего бизнеса</h2>
          <p className="text-xl text-slate-600">Всё необходимое для роста и автоматизации</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50 transition-colors group border border-transparent hover:border-indigo-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
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

// Types of Centers
function CenterTypesSection() {
  const types = [
    { icon: Dumbbell, name: "Фитнес-клубы", desc: "Тренажерные залы, групповые занятия, персональные тренировки" },
    { icon: Sparkles, name: "SPA & Велнес", desc: "Массаж, сауны, процедуры ухода, релаксация" },
    { icon: Heart, name: "Йога & Пилатес", desc: "Студии йоги, пилатеса, растяжки, медитации" },
    { icon: Stethoscope, name: "Медицинские", desc: "Клиники, диагностические центры, лаборатории" },
    { icon: Users, name: "Бассейны", desc: "Плавание, аквааэробика, детские занятия" },
    { icon: Building2, name: "Другие", desc: "Танцевальные студии, боевые искусства, скалодромы" },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Какие центры подключаются</h2>
          <p className="text-xl text-slate-600">Любые wellness и health направления</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{type.name}</h3>
                <p className="text-slate-600 text-sm">{type.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const [, navigate] = useLocation();

  const plans = [
    {
      name: "Basic Center",
      price: "$100",
      period: "/месяц",
      description: "Для небольших центров",
      features: [
        "До 10 сотрудников",
        "Базовое бронирование",
        "Профиль центра",
        "Отзывы и рейтинг",
        "Комиссия 15%",
        "Email поддержка",
      ],
      popular: false,
    },
    {
      name: "Premium Center",
      price: "$300",
      period: "/месяц",
      description: "CRM и полный контроль",
      features: [
        "Неограниченные сотрудники",
        "CRM система",
        "API доступ",
        "Аналитика и отчеты",
        "Комиссия 10%",
        "Приоритетная поддержка",
        "Интеграция с календарем",
      ],
      popular: true,
    },
    {
      name: "Corporate",
      price: "$1000",
      period: "/месяц",
      description: "Для сетевых центров",
      features: [
        "Всё из Premium",
        "Неограниченные филиалы",
        "White-label опция",
        "Персональный менеджер",
        "Комиссия 5%",
        "SLA гарантии",
        "Кастомная интеграция",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Тарифные планы</h2>
          <p className="text-xl text-slate-600">Выберите подходящий масштаб</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl scale-105' 
                  : 'bg-slate-50 text-slate-900 border border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                    Рекомендуем
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-indigo-100' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className={plan.popular ? 'text-indigo-200' : 'text-slate-500'}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-yellow-400' : 'text-green-500'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-6 ${
                  plan.popular 
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                onClick={() => navigate('/register?role=center')}
              >
                Выбрать план
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">💎 Особое предложение</h3>
              <p className="text-slate-700">
                Специалисты, которые приведут ваш центр, получают <span className="font-bold text-indigo-600">до 50% от вашей подписки</span>.
                Это стимулирует их рекомендовать именно вас!
              </p>
            </div>
            <Button variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8">
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ROI Calculator
function CalculatorSection() {
  const [monthlyClients, setMonthlyClients] = useState(200);
  const [avgCheck, setAvgCheck] = useState(50);
  const [plan, setPlan] = useState<'basic' | 'premium' | 'corporate'>('premium');

  const planCosts = { basic: 100, premium: 300, corporate: 1000 };
  const commissionRates = { basic: 0.15, premium: 0.10, corporate: 0.05 };

  const monthlyRevenue = monthlyClients * avgCheck;
  const commissionCost = monthlyRevenue * commissionRates[plan];
  const subscriptionCost = planCosts[plan];
  const netRevenue = monthlyRevenue - commissionCost - subscriptionCost;
  const roi = ((netRevenue - subscriptionCost) / subscriptionCost * 100).toFixed(0);

  return (
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Калькулятор выгоды</h2>
          <p className="text-xl text-slate-600">Рассчитайте дополнительный доход от подключения</p>
        </div>

        <Card className="p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Новых клиентов в месяц
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={monthlyClients}
                onChange={(e) => setMonthlyClients(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <div className="text-2xl font-bold text-indigo-600">{monthlyClients}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Средний чек ($)
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={avgCheck}
                onChange={(e) => setAvgCheck(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <div className="text-2xl font-bold text-indigo-600">${avgCheck}</div>
            </div>
          </div>

          <Tabs value={plan} onValueChange={(v) => setPlan(v as any)} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic ($100)</TabsTrigger>
              <TabsTrigger value="premium">Premium ($300)</TabsTrigger>
              <TabsTrigger value="corporate">Corporate ($1000)</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Доп. выручка</p>
              <p className="text-2xl font-bold text-slate-900">${monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Комиссия ({(commissionRates[plan] * 100).toFixed(0)}%)</p>
              <p className="text-2xl font-bold text-red-600">-${commissionCost.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Подписка</p>
              <p className="text-2xl font-bold text-orange-600">-${subscriptionCost}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-1">Чистая прибыль</p>
              <p className="text-3xl font-bold text-green-600">${netRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg text-slate-700">
              ROI: <span className="font-bold text-green-600 text-2xl">{roi}%</span> в месяц
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

// How It Works
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Регистрация", desc: "Создайте профиль центра. Укажите услуги, расписание, фото." },
    { number: "02", title: "Верификация", desc: "Подтвердите лицензии и сертификаты. Получите галочку доверия." },
    { number: "03", title: "Настройка", desc: "Добавьте сотрудников, настройте расписание и цены." },
    { number: "04", title: "Первые клиенты", desc: "Пользователи начинают находить вас и бронировать услуги." },
    { number: "05", title: "Рост и аналитика", desc: "Смотрите статистику, оптимизируйте работу, получайте выплаты." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Как подключить центр</h2>
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
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

// Testimonials
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Fitness Pro",
      type: "Сеть фитнес-клубов",
      text: "За 6 месяцев количество новых клиентов выросло на 200%. CRM система значительно упростила управление."
    },
    {
      name: "SPA Wellness",
      type: "СПА центр",
      text: "Автоматическое бронирование освободило 10 часов в неделю администратора. Клиенты довольны удобством."
    },
    {
      name: "Yoga Studio",
      type: "Студия йоги",
      text: "Программа лояльности с Unity токенами увеличила возвращаемость клиентов с 40% до 75%."
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Что говорят партнеры</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.type}</p>
              </div>
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
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Готовы развивать свой бизнес?
        </h2>
        <p className="text-xl text-indigo-100 mb-8">
          Присоединяйтесь к сотням центров, которые уже используют EthosLife
        </p>
        <Button 
          size="lg" 
          className="bg-white text-indigo-900 hover:bg-indigo-50 px-12 py-6 text-lg font-semibold"
          onClick={() => navigate('/register?role=center')}
        >
          Подключить центр
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-indigo-200 text-sm mt-6">
          Бесплатная консультация • Настройка за 48 часов • Отмена в любой момент
        </p>
      </div>
    </section>
  );
}

// Main Page
export default function CenterOffer() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BenefitsSection />
      <CenterTypesSection />
      <PricingSection />
      <CalculatorSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

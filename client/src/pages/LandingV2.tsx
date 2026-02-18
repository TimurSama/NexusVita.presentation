import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, Activity, Brain, Users, Target, Zap, Shield, 
  ChevronRight, Star, CheckCircle, ArrowRight, Play, 
  Wallet, Gift, TrendingUp, Clock, Smartphone, Globe,
  Sparkles, Award, Crown, Gem, Moon, Utensils, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

// Hero Section
function HeroSection() {
  const [, navigate] = useLocation();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-100/40 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Здоровье — это ежедневная привычка</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Единая экосистема
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}вашего здоровья
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-xl">
              7 направлений здоровья. AI-ассистент. Персональные специалисты. 
              Экономика, которая работает на вас. Всё в одном приложении.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-200"
                onClick={() => navigate('/register')}
              >
                Начать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg rounded-xl border-2"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 w-5 h-5" />
                Смотреть видео
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Бесплатный старт</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Без карты</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Отмена в любой момент</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/50 border border-slate-200">
              <img 
                src="/dashboard-preview.jpg" 
                alt="EthosLife Dashboard"
                className="w-full"
              />
              {/* Floating Stats Cards */}
              <motion.div 
                className="absolute -left-6 top-1/4 bg-white rounded-xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Шагов сегодня</p>
                    <p className="text-lg font-bold text-slate-900">8,432</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -right-6 bottom-1/3 bg-white rounded-xl p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Настроение</p>
                    <p className="text-lg font-bold text-slate-900">Отличное</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Как работает EthosLife</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
            <p className="text-white">Видео презентация (в разработке)</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { number: "7", label: "Модулей здоровья", icon: Heart },
    { number: "50K+", label: "Активных пользователей", icon: Users },
    { number: "1,200+", label: "Специалистов", icon: Award },
    { number: "500+", label: "Центров и клиник", icon: Building },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-4">
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Problem/Solution Section
function ProblemSolutionSection() {
  const problems = [
    "Данные разбросаны по разным приложениям",
    "Нет связи между врачом, тренером и нутрициологом",
    "Сложно отслеживать прогресс и привычки",
    "Нет мотивации и системы вознаграждений",
  ];

  const solutions = [
    { icon: Target, title: "Всё в одном", desc: "7 модулей здоровья в единой экосистеме" },
    { icon: Users, title: "Команда экспертов", desc: "Подключайте специалистов к своему дашборду" },
    { icon: Zap, title: "AI-ассистент", desc: "Персональные рекомендации на основе данных" },
    { icon: Gift, title: "Экономика здоровья", desc: "Зарабатывайте на здоровых привычках" },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Почему сложно поддерживать здоровье?
            </h2>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">×</span>
                  </div>
                  <p className="text-slate-700">{problem}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Как EthosLife решает эти проблемы
            </h2>
            <div className="grid gap-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{solution.title}</h3>
                    <p className="text-slate-600 text-sm">{solution.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Modules Section
function ModulesSection() {
  const modules = [
    { 
      icon: Activity, 
      name: "Движение", 
      color: "from-orange-400 to-red-500",
      desc: "Тренировки, шаги, интеграция с wearables" 
    },
    { 
      icon: Heart, 
      name: "Медицина", 
      color: "from-red-400 to-pink-500",
      desc: "Анализы, документы, напоминания о лекарствах" 
    },
    { 
      icon: Brain, 
      name: "Психология", 
      color: "from-purple-400 to-indigo-500",
      desc: "Настроение, дневник, медитации, CBT" 
    },
    { 
      icon: Moon, 
      name: "Сон", 
      color: "from-indigo-400 to-blue-500",
      desc: "Трекинг сна, фазы, умный будильник" 
    },
    { 
      icon: Utensils, 
      name: "Питание", 
      color: "from-green-400 to-emerald-500",
      desc: "Дневник питания, БЖУ, сканер продуктов" 
    },
    { 
      icon: Users, 
      name: "Отношения", 
      color: "from-pink-400 to-rose-500",
      desc: "Социальная сеть, поддержка, челленджи" 
    },
    { 
      icon: Target, 
      name: "Привычки", 
      color: "from-yellow-400 to-orange-500",
      desc: "Трекер привычек, стрики, геймификация" 
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            7 направлений здоровья
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Комплексный подход к вашему благополучию. Все данные связаны и анализируются AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-200"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{module.name}</h3>
              <p className="text-slate-600">{module.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Создайте профиль", desc: "Регистрация за 2 минуты. Выберите направления здоровья, которые хотите отслеживать." },
    { number: "02", title: "Вносите данные", desc: "Вручную или автоматически через wearables. AI анализирует паттерны." },
    { number: "03", title: "Получайте рекомендации", desc: "Персональные планы от AI и подключенных специалистов." },
    { number: "04", title: "Развивайте привычки", desc: "Геймификация, награды, социальная поддержка. Здоровье становится привычкой." },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Как это работает</h2>
          <p className="text-xl text-slate-600">Начните свой путь к здоровью за 4 простых шага</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-blue-200 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent" />
              )}
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
      name: "Free",
      price: "$0",
      period: "навсегда",
      description: "Начните свой путь к здоровью",
      features: [
        "3 модуля здоровья на выбор",
        "Базовый дашборд",
        "5 сообщений с AI/день",
        "3 привычки",
        "Социальная лента",
      ],
      cta: "Начать бесплатно",
      popular: false,
    },
    {
      name: "Basic",
      price: "$20",
      period: "/месяц",
      description: "Все модули для полного контроля",
      features: [
        "Все 7 модулей здоровья",
        "50 сообщений с AI/день",
        "10 привычек",
        "Интеграция с wearables",
        "Экспорт данных",
        "50 UNITY токенов/мес",
      ],
      cta: "Выбрать Basic",
      popular: true,
    },
    {
      name: "Premium",
      price: "$50",
      period: "/месяц",
      description: "Максимум возможностей",
      features: [
        "Всё из Basic",
        "Безлимитный AI-чат",
        "Неограниченные привычки",
        "Подключение специалистов",
        "Персональный AI-планировщик",
        "150 UNITY токенов/мес",
        "Приоритетная поддержка",
      ],
      cta: "Выбрать Premium",
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Тарифные планы</h2>
          <p className="text-xl text-slate-600 mb-4">Выберите подходящий план</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm">
            <Gift className="w-4 h-4" />
            <span>Оплачивайте UNITY токенами и экономьте 15%</span>
          </div>
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
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-105' 
                  : 'bg-slate-50 text-slate-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className={plan.popular ? 'text-blue-200' : 'text-slate-500'}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-6 text-lg ${
                  plan.popular 
                    ? 'bg-white text-blue-600 hover:bg-blue-50' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                onClick={() => navigate('/register')}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Подключение специалиста оплачивается отдельно напрямую специалисту
            <span className="text-blue-600 font-medium"> (комиссия платформы всего 5%)</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Unity Token Section
function TokenSection() {
  const benefits = [
    { icon: Wallet, title: "15% выгода", desc: "При оплате подписок UNITY токенами" },
    { icon: Gift, title: "Кэшбэк", desc: "Получайте токены за активность и достижения" },
    { icon: TrendingUp, title: "Реферальная программа", desc: "500 UNITY за каждого друга" },
    { icon: Shield, title: "Безопасность", desc: "Офчейн токен с полным контролем" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
              <Gem className="w-4 h-4" />
              <span>Unity Token</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Экономика, которая работает на ваше здоровье
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Unity Token — это внутренняя валюта экосистемы. Зарабатывайте токены за здоровые 
              привычки, тратьте на подписки с выгодой 15%.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
                  <Gem className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Unity Token</h3>
                <p className="text-slate-400">UNITY</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-slate-400">Курс</span>
                  <span className="font-bold">1 USD = 8.5 UNITY</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-slate-400">Скидка при оплате</span>
                  <span className="font-bold text-green-400">15%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-slate-400">Приветственный бонус</span>
                  <span className="font-bold text-yellow-400">100 UNITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Анна М.",
      role: "Пользователь Basic",
      text: "За 3 месяца смогла привести вес в норму благодаря комплексному подходу. Нутрициолог и тренер работают в одной системе — это удобно!",
      rating: 5,
    },
    {
      name: "Дмитрий К.",
      role: "Пользователь Premium",
      text: "AI-ассистент заменил мне несколько приложений. Анализирует сон, активность и дает рекомендации. Очень круто!",
      rating: 5,
    },
    {
      name: "Елена С.",
      role: "Специалист-нутрициолог",
      text: "Как специалист, я получаю доступ к полной картине здоровья клиента. Это меняет подход к консультациям.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Что говорят пользователи</h2>
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
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
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
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Начните путь к здоровью сегодня
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Присоединяйтесь к 50,000+ пользователей, которые уже меняют свою жизнь
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl"
            onClick={() => navigate('/register')}
          >
            Создать аккаунт бесплатно
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
            onClick={() => navigate('/pricing')}
          >
            Смотреть тарифы
          </Button>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          Бесплатный план навсегда • Без привязки карты • Отмена в любой момент
        </p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const links = {
    product: [
      { label: "Функции", href: "#features" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Специалистам", href: "/specialist-offer" },
      { label: "Центрам", href: "/center-offer" },
    ],
    company: [
      { label: "О нас", href: "/about" },
      { label: "Блог", href: "/blog" },
      { label: "Карьера", href: "/careers" },
      { label: "Контакты", href: "/contact" },
    ],
    support: [
      { label: "Помощь", href: "/help" },
      { label: "Документация", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Статус", href: "/status" },
    ],
    legal: [
      { label: "Пrivacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EthosLife</span>
            </div>
            <p className="mb-4 max-w-sm">
              Единая экосистема управления здоровьем. 7 модулей, AI-ассистент, 
              специалисты и экономика, работающая на вас.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Продукт</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Компания</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 EthosLife. Все права защищены.</p>
          <div className="flex gap-6">
            {links.legal.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white transition-colors text-sm">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page
export default function LandingV2() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <ProblemSolutionSection />
      <ModulesSection />
      <HowItWorksSection />
      <PricingSection />
      <TokenSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

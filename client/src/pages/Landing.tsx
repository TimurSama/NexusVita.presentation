import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, Star, Users, TrendingUp, Shield, 
  Zap, Heart, Brain, Activity, Apple, Moon, Users as UsersIcon,
  CreditCard, Lock, Gift, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise' | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Базовый',
      price: '$9.99',
      period: '/месяц',
      description: 'Для начинающих свой путь к здоровью',
      features: [
        'Единый биопрофиль',
        '3 модуля здоровья',
        'Базовые рекомендации AI',
        'Интеграция с 2 устройствами',
        'Поддержка 24/7',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: '$29.99',
      period: '/месяц',
      description: 'Полный доступ ко всем возможностям',
      features: [
        'Все 7 модулей здоровья',
        'AI-диагностика 2000+ показателей',
        'Персональный AI-ассистент',
        'Неограниченные интеграции',
        'Приоритетная поддержка',
        'Эксклюзивные консультации',
        'Ранний доступ к новым функциям',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Корпоративный',
      price: '$99',
      period: '/месяц',
      description: 'Для компаний и команд',
      features: [
        'Все функции Премиум',
        'Корпоративный дашборд',
        'Управление командой',
        'Кастомные интеграции',
        'Выделенный менеджер',
        'API доступ',
        'Белый лейбл',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      role: 'Врач-терапевт',
      text: 'EthosLife изменил мой подход к профилактике. Теперь у меня полная картина здоровья пациента.',
      rating: 5,
    },
    {
      name: 'Михаил Соколов',
      role: 'Фитнес-тренер',
      text: 'Мои клиенты стали более мотивированными благодаря отслеживанию прогресса в EthosLife.',
      rating: 5,
    },
    {
      name: 'Елена Иванова',
      role: 'Пользователь',
      text: 'За 3 месяца использования я похудела на 8 кг и нормализовала давление. Платформа работает!',
      rating: 5,
    },
  ];

  const stats = [
    { value: '2000+', label: 'Показателей здоровья', icon: Activity },
    { value: '95%', label: 'Точность AI-диагностики', icon: Brain },
    { value: '500K+', label: 'Пользователей', icon: Users },
    { value: '7', label: 'Модулей здоровья', icon: Heart },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Мгновенные результаты',
      description: 'Получите персональный план оздоровления за 5 минут',
    },
    {
      icon: Shield,
      title: 'Безопасность данных',
      description: 'End-to-end шифрование и полный контроль над данными',
    },
    {
      icon: TrendingUp,
      title: 'Доказанная эффективность',
      description: '95% пользователей видят улучшения в первый месяц',
    },
    {
      icon: Gift,
      title: 'Бесплатный пробный период',
      description: '14 дней полного доступа без оплаты',
    },
  ];

  const handleGetStarted = () => {
    if (selectedPlan) {
      // Scroll to registration form
      document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Scroll to plans
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = () => {
    // Registration logic here
    console.log('Registering:', { name, email, plan: selectedPlan });
    alert('Регистрация успешна! Проверьте email для подтверждения.');
  };

  return (
    <div className="min-h-screen bg-background landing-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 glass-bubbles"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="engraved-card mb-8 p-8"
            >
              <Badge className="mb-4 engraved-badge">Новое поколение здоровья</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 engraved-text">
                EthosLife
              </h1>
              <p className="text-2xl md:text-3xl text-foreground/80 mb-4 engraved-text">
                Здоровая жизнь - это привычка
              </p>
              <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
                Единая платформа для управления всеми аспектами здоровья. 
                AI-анализ 2000+ показателей, персонализированные рекомендации и непрерывный мониторинг 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="engraved-button text-lg px-8 py-6"
                  onClick={handleGetStarted}
                >
                  Начать бесплатно
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="engraved-button-outline text-lg px-8 py-6"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Узнать больше
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="engraved-card p-4"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-2 mx-auto" />
                  <div className="text-3xl font-bold engraved-text mb-1">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 engraved-text">
              Проблема, которую мы решаем
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Данные о здоровье разбросаны по разным приложениям и системам. 
              Нет единой картины, нет персонализации, нет комплексного подхода.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="engraved-card p-8"
            >
              <h3 className="text-2xl font-bold mb-4 engraved-text">Проблема</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Данные в разных приложениях</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Нет персонализации</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Фрагментированная информация</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Нет комплексного подхода</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="engraved-card p-8"
            >
              <h3 className="text-2xl font-bold mb-4 engraved-text">Решение EthosLife</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
                  <span>Единая платформа для всех данных</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
                  <span>AI-персонализация на основе 2000+ показателей</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
                  <span>Комплексный подход к здоровью</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
                  <span>Непрерывный мониторинг 24/7</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 engraved-text">
              Почему выбирают EthosLife
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="engraved-card p-6 text-center"
              >
                <benefit.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2 engraved-text">{benefit.title}</h3>
                <p className="text-foreground/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 engraved-text">
              Что говорят пользователи
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="engraved-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold engraved-text">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 engraved-text">
              Выберите свой план
            </h2>
            <p className="text-xl text-foreground/70">
              14 дней бесплатно. Отмена в любой момент.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`engraved-card p-8 relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 engraved-badge">
                    Популярный
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 engraved-text">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold engraved-text">{plan.price}</span>
                    <span className="text-foreground/60">{plan.period}</span>
                  </div>
                  <p className="text-sm text-foreground/70">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full engraved-button ${plan.popular ? 'btn-premium' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPlan(plan.id as any);
                    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Выбрать план
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="registration" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="engraved-card p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 engraved-text">
                Начните свой путь к здоровью
              </h2>
              <p className="text-lg text-foreground/70">
                Создайте аккаунт и получите 14 дней бесплатного доступа
              </p>
            </div>

            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold engraved-text">
                      Выбранный план: {plans.find(p => p.id === selectedPlan)?.name}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {plans.find(p => p.id === selectedPlan)?.price}
                      {plans.find(p => p.id === selectedPlan)?.period}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPlan(null)}
                  >
                    Изменить
                  </Button>
                </div>
              </motion.div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 engraved-text">
                  Ваше имя
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  className="engraved-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 engraved-text">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivan@example.com"
                  required
                  className="engraved-input"
                />
              </div>

              {!selectedPlan && (
                <div>
                  <label className="block text-sm font-medium mb-2 engraved-text">
                    Выберите план
                  </label>
                  <div className="grid gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id as any)}
                        className={`engraved-card p-4 text-left hover:ring-2 hover:ring-primary transition-all ${
                          selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold engraved-text">{plan.name}</div>
                            <div className="text-sm text-foreground/70">
                              {plan.price}{plan.period}
                            </div>
                          </div>
                          {plan.popular && (
                            <Badge className="engraved-badge">Популярный</Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-5 h-5"
                />
                <label htmlFor="terms" className="text-sm text-foreground/70">
                  Я соглашаюсь с{' '}
                  <a href="#" className="text-primary hover:underline">условиями использования</a>{' '}
                  и{' '}
                  <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full engraved-button text-lg py-6"
                disabled={!name || !email || !selectedPlan}
              >
                <Lock className="mr-2 w-5 h-5" />
                Создать аккаунт и начать
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-foreground/60">
                <Gift className="inline w-4 h-4 mr-1" />
                14 дней бесплатно. Отмена в любой момент. Без скрытых платежей.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="engraved-card p-12 max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 text-primary mb-6 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 engraved-text">
              Готовы изменить свою жизнь?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Присоединяйтесь к 500,000+ пользователям, которые уже на пути к здоровью
            </p>
            <Button
              size="lg"
              className="engraved-button text-lg px-8 py-6"
              onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Начать бесплатно
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

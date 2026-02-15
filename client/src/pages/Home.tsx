import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Activity, Heart, Brain } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const quickStats = [
    {
      title: 'Шаги',
      value: 8420,
      unit: '',
      trend: 'up' as const,
      target: 10000,
      icon: 'movement' as const,
      description: 'Цель: 10,000 шагов',
    },
    {
      title: 'Сон',
      value: 7.5,
      unit: 'ч',
      trend: 'up' as const,
      target: 8,
      icon: 'sleep' as const,
      description: 'Цель: 8 часов',
    },
    {
      title: 'Настроение',
      value: 8,
      unit: '/10',
      trend: 'up' as const,
      icon: 'psychology' as const,
      description: 'Отличное настроение',
    },
  ];

  const quickActions = [
    { path: '/dashboard', label: 'Дашборд', icon: 'chart', description: 'Обзор здоровья' },
    { path: '/medicine', label: 'Медицина', icon: 'medicine', description: 'Анализы и диагностика' },
    { path: '/movement', label: 'Движение', icon: 'movement', description: 'Активность и тренировки' },
    { path: '/nutrition', label: 'Питание', icon: 'nutrition', description: 'Дневник питания' },
    { path: '/psychology', label: 'Психология', icon: 'psychology', description: 'Ментальное здоровье' },
    { path: '/calendar', label: 'Календарь', icon: 'chart', description: 'Планирование' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/5 p-12 md:p-20 border border-border/50">
            <div className="relative z-10 max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                Добро пожаловать в
                <br />
                <span className="text-primary">EthosLife</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-foreground/70 mb-8"
              >
                Ваша персональная экосистема здоровья нового поколения. Отслеживайте, анализируйте и улучшайте свое здоровье с помощью AI-технологий.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/dashboard">
                  <Button className="btn-premium text-lg px-8 py-6">
                    Открыть дашборд
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/presentation">
                  <Button variant="outline" className="text-lg px-8 py-6">
                    Узнать больше
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Сегодня</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStats.map((stat, idx) => (
              <HealthMetricCard
                key={idx}
                {...stat}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Быстрый доступ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Link key={idx} href={action.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="premium-card p-6 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <SketchIcon icon={action.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{action.label}</h3>
                      <p className="text-sm text-foreground/60">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground/40" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Аналитика',
                description: 'Глубокий анализ ваших данных здоровья',
              },
              {
                icon: Activity,
                title: 'Трекинг',
                description: 'Отслеживание всех показателей в реальном времени',
              },
              {
                icon: Brain,
                title: 'AI Рекомендации',
                description: 'Персональные рекомендации на основе AI',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="premium-card p-6"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

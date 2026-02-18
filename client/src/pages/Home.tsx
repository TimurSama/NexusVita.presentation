import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Activity, Heart, Brain } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Button } from '@/components/ui/button';
import { EcosystemPlatformSection } from '@/components/EcosystemPlatformSection';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { user, profile } = useUser();
  const [quickStats, setQuickStats] = useState([
    {
      title: 'Шаги',
      value: 0,
      unit: '',
      trend: 'up' as const,
      target: 10000,
      icon: 'movement' as const,
      description: 'Добавьте данные о шагах',
    },
    {
      title: 'Сон',
      value: 0,
      unit: 'ч',
      trend: 'up' as const,
      target: 8,
      icon: 'sleep' as const,
      description: 'Добавьте данные о сне',
    },
    {
      title: 'Настроение',
      value: 0,
      unit: '/10',
      trend: 'up' as const,
      icon: 'psychology' as const,
      description: 'Добавьте данные о настроении',
    },
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/users/${user.id}/metrics?limit=10`);
        if (response.ok) {
          const data = await response.json();
          const metrics = data.metrics || [];
          
          // Get latest metrics by type
          const metricsByType: Record<string, any> = {};
          metrics.forEach((m: any) => {
            if (!metricsByType[m.metric_type] || new Date(m.created_at) > new Date(metricsByType[m.metric_type].created_at)) {
              metricsByType[m.metric_type] = m;
            }
          });

          setQuickStats([
            {
              title: 'Шаги',
              value: metricsByType['steps']?.value || 0,
              unit: '',
              trend: 'up' as const,
              target: 10000,
              icon: 'movement' as const,
              description: metricsByType['steps'] ? `Цель: 10,000 шагов` : 'Добавьте данные о шагах',
            },
            {
              title: 'Сон',
              value: metricsByType['sleep']?.value || 0,
              unit: 'ч',
              trend: 'up' as const,
              target: 8,
              icon: 'sleep' as const,
              description: metricsByType['sleep'] ? `Цель: 8 часов` : 'Добавьте данные о сне',
            },
            {
              title: 'Настроение',
              value: metricsByType['mood']?.value || 0,
              unit: '/10',
              trend: 'up' as const,
              icon: 'psychology' as const,
              description: metricsByType['mood'] ? 'Отличное настроение' : 'Добавьте данные о настроении',
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [user?.id]);

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
                {user ? `Добро пожаловать, ${user.name}!` : 'Добро пожаловать в'}
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
                {user ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <Button className="btn-premium text-lg px-8 py-6">
                        Начать бесплатно
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" className="text-lg px-8 py-6">
                        Войти
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Ecosystem Platform Section */}
        <EcosystemPlatformSection />

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

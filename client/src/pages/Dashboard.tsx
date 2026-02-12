import { motion } from 'framer-motion';
import { TrendingUp, Activity, Heart, Brain } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { GoalTracker } from '@/components/GoalTracker';
import { RecommendationCard } from '@/components/RecommendationCard';
import { HealthPlanViewer } from '@/components/HealthPlanViewer';
import { Link } from 'wouter';

export default function Dashboard() {
  const todayMetrics = [
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
      title: 'Калории',
      value: 1840,
      unit: 'ккал',
      trend: 'stable' as const,
      target: 2200,
      icon: 'nutrition' as const,
      description: 'Цель: 2,200 ккал',
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

  const goals = [
    {
      id: '1',
      title: '10,000 шагов ежедневно',
      description: 'Достичь цели по шагам 30 дней подряд',
      category: 'fitness' as const,
      target: 30,
      current: 12,
      unit: 'дней',
      deadline: '2025-03-15',
      completed: false,
    },
    {
      id: '2',
      title: 'Пить 2 литра воды',
      description: 'Ежедневное потребление воды',
      category: 'health' as const,
      target: 30,
      current: 18,
      unit: 'дней',
      deadline: '2025-03-15',
      completed: false,
    },
    {
      id: '3',
      title: 'Медитация 10 минут',
      description: 'Ежедневная практика медитации',
      category: 'mental' as const,
      target: 21,
      current: 21,
      unit: 'дней',
      deadline: '2025-03-01',
      completed: true,
    },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Повысить активность',
      description: 'Рекомендуется добавить 20 минут ходьбы для достижения цели по шагам',
      category: 'exercise' as const,
      priority: 'high' as const,
      status: 'pending' as const,
      actionItems: [
        'Прогулка после обеда',
        'Использовать лестницу вместо лифта',
      ],
    },
    {
      id: '2',
      title: 'Оптимизировать сон',
      description: 'Ложиться спать на 30 минут раньше для достижения 8 часов сна',
      category: 'sleep' as const,
      priority: 'medium' as const,
      status: 'in-progress' as const,
      deadline: '2025-02-15',
    },
    {
      id: '3',
      title: 'Добавить белок в рацион',
      description: 'Увеличить потребление белка до 120г в день',
      category: 'nutrition' as const,
      priority: 'medium' as const,
      status: 'pending' as const,
    },
  ];

  const todayPlan = {
    date: new Date().toISOString(),
    items: [
      {
        id: '1',
        time: '07:00',
        title: 'Утренняя зарядка',
        description: '15 минут растяжки и легкие упражнения',
        category: 'exercise' as const,
        completed: true,
      },
      {
        id: '2',
        time: '08:00',
        title: 'Завтрак',
        description: 'Овсянка с фруктами и орехами',
        category: 'nutrition' as const,
        completed: true,
      },
      {
        id: '3',
        time: '12:00',
        title: 'Обед',
        description: 'Салат с курицей и овощами',
        category: 'nutrition' as const,
        completed: false,
      },
      {
        id: '4',
        time: '18:00',
        title: 'Тренировка',
        description: 'Силовая тренировка 45 минут',
        category: 'exercise' as const,
        completed: false,
      },
      {
        id: '5',
        time: '22:00',
        title: 'Подготовка ко сну',
        description: 'Медитация и чтение',
        category: 'mental' as const,
        completed: false,
      },
    ],
    dailyGoals: {
      water: 2.0,
      steps: 10000,
      calories: 2200,
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Дашборд</h1>
          <p className="text-foreground/60">
            Обзор вашего здоровья и прогресса
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {todayMetrics.map((metric, idx) => (
            <HealthMetricCard
              key={idx}
              {...metric}
              delay={idx * 0.1}
            />
          ))}
        </motion.div>

        {/* Goals and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="premium-card p-6"
          >
            <GoalTracker goals={goals} />
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <SketchIcon icon="ai" size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Рекомендации</h2>
            </div>
            {recommendations.map((rec, idx) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                delay={idx * 0.1}
              />
            ))}
          </motion.div>
        </div>

        {/* Today's Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="premium-card p-6"
        >
          <HealthPlanViewer plan={todayPlan} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { path: '/movement', label: 'Добавить тренировку', icon: 'movement' },
              { path: '/nutrition', label: 'Записать прием пищи', icon: 'nutrition' },
              { path: '/psychology', label: 'Отметить настроение', icon: 'psychology' },
              { path: '/habits', label: 'Отметить привычку', icon: 'chart' },
            ].map((action, idx) => (
              <Link key={idx} href={action.path}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full premium-card p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <SketchIcon
                    icon={action.icon as any}
                    size={32}
                    className="text-primary mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

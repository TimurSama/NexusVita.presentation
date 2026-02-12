import { useState } from 'react';
import { ChevronLeft, Plus, Camera, Search } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Nutrition() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  const todayMacros = [
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
      title: 'Белки',
      value: 120,
      unit: 'г',
      trend: 'up' as const,
      target: 150,
      icon: 'nutrition' as const,
      description: 'Цель: 150г',
    },
    {
      title: 'Углеводы',
      value: 180,
      unit: 'г',
      trend: 'stable' as const,
      target: 250,
      icon: 'nutrition' as const,
      description: 'Цель: 250г',
    },
    {
      title: 'Жиры',
      value: 65,
      unit: 'г',
      trend: 'down' as const,
      target: 80,
      icon: 'nutrition' as const,
      description: 'Цель: 80г',
    },
  ];

  const meals = [
    {
      id: '1',
      name: 'Завтрак',
      time: '08:00',
      calories: 450,
      items: ['Овсянка с фруктами', 'Кофе'],
      completed: true,
    },
    {
      id: '2',
      name: 'Обед',
      time: '13:00',
      calories: 650,
      items: ['Салат с курицей', 'Овощи на пару'],
      completed: false,
    },
    {
      id: '3',
      name: 'Ужин',
      time: '19:00',
      calories: 0,
      items: [],
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
      <div className="container py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/')}
              className="md:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <SketchIcon icon="nutrition" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Питание</h1>
                <p className="text-foreground/60">Дневник питания и анализ макронутриентов</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="diary">Дневник</TabsTrigger>
            <TabsTrigger value="macros">Макронутриенты</TabsTrigger>
            <TabsTrigger value="plans">Планы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Macros Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {todayMacros.map((macro, idx) => (
                <HealthMetricCard
                  key={idx}
                  {...macro}
                  delay={idx * 0.1}
                />
              ))}
            </div>

            {/* Today's Meals */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Приемы пищи сегодня</h2>
                <Button className="btn-premium" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить
                </Button>
              </div>
              <div className="space-y-4">
                {meals.map((meal, idx) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      meal.completed
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-muted/30 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{meal.name}</h3>
                        <p className="text-sm text-foreground/60">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{meal.calories} ккал</p>
                        {meal.completed && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                            <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {meal.items.length > 0 && (
                      <div className="mt-2">
                        {meal.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="inline-block px-2 py-1 mr-2 mb-1 text-xs bg-muted rounded-lg text-foreground/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Сканер продуктов', icon: Camera, type: 'lucide' as const },
                { label: 'Поиск блюд', icon: Search, type: 'lucide' as const },
                { label: 'Добавить прием пищи', icon: Plus, type: 'lucide' as const },
                { label: 'Планы питания', icon: 'nutrition' as const, type: 'sketch' as const },
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="premium-card p-4 text-center"
                >
                  {action.type === 'sketch' ? (
                    <SketchIcon icon={action.icon as any} size={24} className="text-primary mx-auto mb-2" />
                  ) : (
                    <action.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Дневник питания</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>

          <TabsContent value="macros" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Детальный анализ макронутриентов</h2>
              <div className="space-y-4">
                {todayMacros.map((macro, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{macro.title}</span>
                      <span className="text-sm text-foreground/60">
                        {macro.value} / {macro.target} {macro.unit}
                      </span>
                    </div>
                    <Progress value={(macro.value / macro.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Планы питания</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

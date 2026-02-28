import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Calendar, Clock, CheckCircle2, Circle, Bell, Zap, 
  TrendingUp, Activity, Heart, Brain, Apple, Moon,
  Plus, Settings, ChevronRight, Sparkles, Target,
  BarChart3, FileText, ArrowRight
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  path: string;
  description?: string;
}

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'plan' | 'metric' | 'goal';
  completed: boolean;
}

export default function HealthCenter() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [todayPlans, setTodayPlans] = useState<any[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [healthDirections, setHealthDirections] = useState<any[]>([]);

  // Quick actions for health directions
  const quickActions: QuickAction[] = [
    { id: 'movement', label: 'Движение', icon: 'movement', color: '#3B82F6', path: '/health/movement', description: 'Активность и тренировки' },
    { id: 'nutrition', label: 'Питание', icon: 'nutrition', color: '#10B981', path: '/health/nutrition', description: 'Рацион и калории' },
    { id: 'sleep', label: 'Сон', icon: 'sleep', color: '#8B5CF6', path: '/health/sleep', description: 'Качество сна' },
    { id: 'psychology', label: 'Психология', icon: 'psychology', color: '#F59E0B', path: '/health/psychology', description: 'Ментальное здоровье' },
    { id: 'medicine', label: 'Медицина', icon: 'medicine', color: '#EF4444', path: '/health/medicine', description: 'Анализы и лечение' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.id.toString();
        const today = new Date().toISOString().split('T')[0];

        // Fetch today's plans
        const plansResponse = await fetch(`/api/users/${userId}/plans?date=${today}`);
        if (plansResponse.ok) {
          const plansData = await plansResponse.json();
          setTodayPlans(plansData.plans || []);
          
          // Create reminders from plans
          const planReminders: Reminder[] = (plansData.plans || [])
            .filter((p: any) => !p.completed && p.time)
            .slice(0, 5)
            .map((p: any) => ({
              id: `plan-${p.id}`,
              title: p.title,
              time: p.time,
              type: 'plan' as const,
              completed: false,
            }));
          setReminders(planReminders);
        }

        // Fetch metrics
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?limit=5`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics || []);
        }

        // Fetch goals
        const goalsResponse = await fetch(`/api/users/${userId}/goals`);
        if (goalsResponse.ok) {
          const goalsData = await goalsResponse.json();
          setGoals(goalsData.goals || []);
        }

        // Fetch health directions
        // TODO: Add API endpoint for health directions
        setHealthDirections(quickActions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const completedPlans = todayPlans.filter(p => p.completed).length;
  const totalPlans = todayPlans.length;
  const progressPercent = totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Загрузка единого центра...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Единый центр здоровья
              </h1>
              <p className="text-foreground/60">
                Ваш персональный центр управления здоровьем
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation('/dashboard/settings')}
              className="engraved-button-outline"
            >
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions - Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="engraved-card border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="engraved-text flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Быстрый доступ
                </CardTitle>
                <Badge variant="outline" className="engraved-badge">
                  {healthDirections.length} направлений
                </Badge>
              </div>
              <CardDescription>
                Перейдите к любому направлению здоровья одним нажатием
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocation(action.path)}
                    className="premium-card p-3 sm:p-4 text-center group hover:shadow-lg transition-all"
                    style={{ borderColor: action.color + '40' }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-all group-hover:scale-110"
                        style={{ backgroundColor: action.color + '20' }}
                      >
                        <SketchIcon 
                          icon={action.icon as any} 
                          size={20}
                          className="sm:w-6 sm:h-6 transition-colors"
                          style={{ color: action.color }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm sm:text-base">{action.label}</p>
                        {action.description && (
                          <p className="text-xs text-foreground/60 mt-1 hidden sm:block">{action.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reminders and Today's Progress - Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="engraved-card h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Сегодня
                  </CardTitle>
                  <Badge variant="outline" className="engraved-badge">
                    {completedPlans}/{totalPlans} выполнено
                  </Badge>
                </div>
                <CardDescription>
                  {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {totalPlans > 0 ? (
                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-foreground/60">Прогресс дня</span>
                        <span className="text-sm font-semibold text-foreground">{progressPercent}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Plans List */}
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {todayPlans.map((plan, idx) => (
                          <motion.div
                            key={plan.id || idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                              plan.completed 
                                ? 'bg-green-50/50 border-green-200 dark:bg-green-950/20' 
                                : 'bg-card border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Clock className="w-4 h-4 text-foreground/60 flex-shrink-0" />
                              <span className="font-mono text-xs text-foreground/70 flex-shrink-0">
                                {plan.time || '00:00'}
                              </span>
                              <span className="flex-1 font-medium text-foreground truncate">
                                {plan.title}
                              </span>
                              {plan.category && (
                                <SketchIcon 
                                  icon={plan.category as any} 
                                  size={16} 
                                  className="text-primary flex-shrink-0" 
                                />
                              )}
                            </div>
                            {plan.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-foreground/30 flex-shrink-0" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60 mb-4">На сегодня планов нет</p>
                    <Button
                      variant="outline"
                      onClick={() => setLocation('/calendar')}
                      className="engraved-button-outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Создать план
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Reminders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="engraved-card h-full">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Напоминания
                </CardTitle>
                <CardDescription>
                  Важные события и задачи
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reminders.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {reminders.map((reminder, idx) => (
                        <motion.div
                          key={reminder.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm mb-1">
                                {reminder.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-foreground/60">
                                <Clock className="w-3 h-3" />
                                <span>{reminder.time}</span>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                            >
                              {reminder.type === 'plan' ? 'План' : reminder.type === 'metric' ? 'Метрика' : 'Цель'}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60">Нет активных напоминаний</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Information - Bottom Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 engraved-tabs">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Метрики
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Цели
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Отчеты
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {healthDirections.map((direction) => {
                const directionPlans = todayPlans.filter(p => p.category === direction.id);
                const completed = directionPlans.filter(p => p.completed).length;
                const total = directionPlans.length;
                
                return (
                  <motion.div
                    key={direction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="premium-card p-4 cursor-pointer"
                    onClick={() => setLocation(direction.path)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: direction.color + '20' }}
                      >
                        <SketchIcon 
                          icon={direction.icon as any} 
                          size={20}
                          style={{ color: direction.color }}
                        />
                      </div>
                      <ChevronRight className="w-4 h-4 text-foreground/40" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{direction.label}</h3>
                    {total > 0 ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">Прогресс</span>
                          <span className="font-medium text-foreground">{completed}/{total}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${(completed / total) * 100}%`,
                              backgroundColor: direction.color
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-foreground/60">Нет активных планов</p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Последняя активность</CardTitle>
                <CardDescription>Ваши недавние действия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.slice(0, 5).map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {metric.metric_type === 'steps' ? 'Шаги' :
                           metric.metric_type === 'calories' ? 'Калории' :
                           metric.metric_type === 'sleep' ? 'Сон' :
                           metric.metric_type === 'mood' ? 'Настроение' :
                           metric.metric_type}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {metric.value} {metric.unit || ''}
                        </p>
                      </div>
                      <span className="text-xs text-foreground/40">
                        {new Date(metric.recorded_at || metric.created_at).toLocaleTimeString('ru-RU', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Все метрики</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation('/metrics')}
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить метрику
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {metric.metric_type === 'steps' ? 'Шаги' :
                           metric.metric_type === 'calories' ? 'Калории' :
                           metric.metric_type === 'sleep' ? 'Сон' :
                           metric.metric_type === 'mood' ? 'Настроение' :
                           metric.metric_type}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {new Date(metric.recorded_at || metric.created_at).toLocaleDateString('ru-RU')}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {metric.value} <span className="text-sm text-foreground/60">{metric.unit || ''}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Мои цели</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation('/goals')}
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Новая цель
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {goals.length > 0 ? (
                  <div className="space-y-4">
                    {goals.map((goal, idx) => {
                      const progress = goal.target_value 
                        ? Math.round((goal.current_value / goal.target_value) * 100) 
                        : 0;
                      
                      return (
                        <div key={goal.id || idx} className="p-4 rounded-lg border border-border bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground">{goal.title}</h3>
                            {goal.completed ? (
                              <Badge className="bg-green-500">Выполнено</Badge>
                            ) : (
                              <Badge variant="outline">{progress}%</Badge>
                            )}
                          </div>
                          {goal.description && (
                            <p className="text-sm text-foreground/60 mb-3">{goal.description}</p>
                          )}
                          {goal.target_value && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-foreground/60">Прогресс</span>
                                <span className="font-medium text-foreground">
                                  {goal.current_value}{goal.unit || ''} / {goal.target_value}{goal.unit || ''}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(progress, 100)}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-2 bg-primary rounded-full"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60 mb-4">У вас пока нет целей</p>
                    <Button
                      variant="outline"
                      onClick={() => setLocation('/goals')}
                      className="engraved-button-outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Создать цель
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Отчеты</CardTitle>
                <CardDescription>
                  Детальная аналитика по всем направлениям здоровья
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {healthDirections.map((direction) => (
                    <motion.button
                      key={direction.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLocation(`${direction.path}/reports`)}
                      className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: direction.color + '20' }}
                        >
                          <SketchIcon 
                            icon={direction.icon as any} 
                            size={20}
                            style={{ color: direction.color }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{direction.label}</h3>
                          <p className="text-xs text-foreground/60">Отчеты и аналитика</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground/40 ml-auto" />
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

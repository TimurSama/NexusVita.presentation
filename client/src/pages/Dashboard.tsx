import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { 
  TrendingUp, Activity, Heart, Brain, Calendar, Clock, CheckCircle2, 
  MessageSquare, Bot, User, Zap, ArrowRight, ChevronRight, Sparkles
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { GoalTracker } from '@/components/GoalTracker';
import { RecommendationCard } from '@/components/RecommendationCard';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const [chatType, setChatType] = useState<'ai' | 'specialist' | 'ai-plus'>('ai');
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [todayMetrics, setTodayMetrics] = useState<any[]>([]);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<any[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.id.toString();

        // Fetch today's plans
        const today = new Date().toISOString().split('T')[0];
        const plansResponse = await fetch(`/api/users/${userId}/plans?date=${today}`);
        if (plansResponse.ok) {
          const plansData = await plansResponse.json();
          const plans = plansData.plans || [];
          setTodaySchedule(plans.map((p: any) => ({
            time: p.time || '00:00',
            title: p.title,
            category: p.category || 'other',
            completed: p.completed || false,
          })));
        }

        // Fetch metrics
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?limit=10`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          const metrics = metricsData.metrics || [];
          
          // Group metrics by type and get latest
          const metricsByType: Record<string, any> = {};
          metrics.forEach((m: any) => {
            if (!metricsByType[m.metric_type] || new Date(m.created_at) > new Date(metricsByType[m.metric_type].created_at)) {
              metricsByType[m.metric_type] = m;
            }
          });

          // Map to dashboard format
          const mappedMetrics = [
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
              title: 'Калории',
              value: metricsByType['calories']?.value || 0,
              unit: 'ккал',
              trend: 'stable' as const,
              target: 2200,
              icon: 'nutrition' as const,
              description: metricsByType['calories'] ? `Цель: 2,200 ккал` : 'Добавьте данные о калориях',
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
          ];
          setTodayMetrics(mappedMetrics);
        }

        // For weekly activity, we'll use empty data for now
        // TODO: Fetch weekly metrics when API supports it
        setWeeklyActivity([]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [healthModules, setHealthModules] = useState<any[]>([]);

  // Fetch health modules data from real metrics
  useEffect(() => {
    const fetchModulesData = async () => {
      if (!user?.id) return;

      try {
        const userId = user.id.toString();
        
        // Fetch goals for each module
        const goalsResponse = await fetch(`/api/users/${userId}/goals`);
        const goalsData = goalsResponse.ok ? await goalsResponse.json() : { goals: [] };
        const goals = goalsData.goals || [];

        // Fetch documents count
        const docsResponse = await fetch(`/api/users/${userId}/documents`);
        const docsData = docsResponse.ok ? await docsResponse.json() : { documents: [] };
        const documents = docsData.documents || [];

        // Fetch metrics for last 3 months for charts
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?limit=100`);
        const metricsData = metricsResponse.ok ? await metricsResponse.json() : { metrics: [] };
        const metrics = metricsData.metrics || [];

        // Calculate module data from real metrics
        const modules = [
          {
            id: 'medicine',
            title: 'Медицина',
            icon: 'medicine' as const,
            path: '/medicine',
            metrics: [
              { 
                label: 'Анализы', 
                value: documents.filter((d: any) => d.document_type === 'medical').length.toString(),
                trend: 'stable' as const
              },
              { 
                label: 'Документы', 
                value: documents.length.toString(),
                trend: 'stable' as const
              },
            ],
            chartData: calculateChartData(metrics, 'medical', 3),
          },
          {
            id: 'movement',
            title: 'Движение',
            icon: 'movement' as const,
            path: '/movement',
            metrics: [
              { 
                label: 'Тренировки', 
                value: `${goals.filter((g: any) => g.category === 'movement' && g.completed).length}/${goals.filter((g: any) => g.category === 'movement').length}`,
                trend: 'up' as const
              },
              { 
                label: 'Активность', 
                value: metrics.filter((m: any) => m.metric_type === 'steps').length > 0 ? 'Есть' : 'Нет',
                trend: 'up' as const
              },
            ],
            chartData: calculateChartData(metrics, 'steps', 3),
          },
          {
            id: 'nutrition',
            title: 'Питание',
            icon: 'nutrition' as const,
            path: '/nutrition',
            metrics: [
              { 
                label: 'Записи', 
                value: metrics.filter((m: any) => m.metric_type === 'calories' || m.metric_type === 'nutrition').length.toString(),
                trend: 'stable' as const
              },
              { 
                label: 'Цели', 
                value: goals.filter((g: any) => g.category === 'nutrition').length.toString(),
                trend: 'stable' as const
              },
            ],
            chartData: calculateChartData(metrics, 'calories', 3),
          },
          {
            id: 'sleep',
            title: 'Сон',
            icon: 'sleep' as const,
            path: '/sleep',
            metrics: [
              { 
                label: 'Записи', 
                value: metrics.filter((m: any) => m.metric_type === 'sleep').length.toString(),
                trend: 'up' as const
              },
              { 
                label: 'Среднее', 
                value: calculateAverage(metrics, 'sleep') || 'Нет данных',
                trend: 'stable' as const
              },
            ],
            chartData: calculateChartData(metrics, 'sleep', 3),
          },
          {
            id: 'psychology',
            title: 'Психология',
            icon: 'psychology' as const,
            path: '/psychology',
            metrics: [
              { 
                label: 'Настроение', 
                value: calculateAverage(metrics, 'mood') ? `${calculateAverage(metrics, 'mood')}/10` : 'Нет данных',
                trend: 'up' as const
              },
              { 
                label: 'Записи', 
                value: metrics.filter((m: any) => m.metric_type === 'mood').length.toString(),
                trend: 'stable' as const
              },
            ],
            chartData: calculateChartData(metrics, 'mood', 3),
          },
          {
            id: 'relationships',
            title: 'Отношения',
            icon: 'relationships' as const,
            path: '/relationships',
            metrics: [
              { 
                label: 'Активность', 
                value: goals.filter((g: any) => g.category === 'relationships').length > 0 ? 'Есть' : 'Нет',
                trend: 'up' as const
              },
              { 
                label: 'Цели', 
                value: goals.filter((g: any) => g.category === 'relationships').length.toString(),
                trend: 'stable' as const
              },
            ],
            chartData: calculateChartData(metrics, 'relationships', 3),
          },
          {
            id: 'spirituality',
            title: 'Привычки',
            icon: 'spirituality' as const,
            path: '/habits',
            metrics: [
              { 
                label: 'Привычки', 
                value: `${goals.filter((g: any) => g.category === 'habits' && g.completed).length}/${goals.filter((g: any) => g.category === 'habits').length}`,
                trend: 'up' as const
              },
              { 
                label: 'Активные', 
                value: goals.filter((g: any) => g.category === 'habits' && !g.completed).length.toString(),
                trend: 'up' as const
              },
            ],
            chartData: calculateChartData(metrics, 'habits', 3),
          },
        ];

        setHealthModules(modules);
      } catch (error) {
        console.error('Error fetching modules data:', error);
        // Set empty modules if error
        setHealthModules([]);
      }
    };

    fetchModulesData();
  }, [user?.id]);

  // Helper functions
  function calculateChartData(metrics: any[], type: string, months: number) {
    const now = new Date();
    const data: any[] = [];
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthMetrics = metrics.filter((m: any) => {
        const mDate = new Date(m.recorded_at || m.created_at);
        return m.metric_type === type && 
               mDate.getMonth() === date.getMonth() && 
               mDate.getFullYear() === date.getFullYear();
      });
      
      const avg = monthMetrics.length > 0
        ? monthMetrics.reduce((sum: number, m: any) => sum + (m.value || 0), 0) / monthMetrics.length
        : 0;
      
      data.push({
        name: date.toLocaleDateString('ru-RU', { month: 'short' }),
        value: Math.round(avg * 10) / 10,
      });
    }
    
    return data.length > 0 ? data : [
      { name: 'Нет данных', value: 0 },
    ];
  }

  function calculateAverage(metrics: any[], type: string): number | null {
    const typeMetrics = metrics.filter((m: any) => m.metric_type === type);
    if (typeMetrics.length === 0) return null;
    const sum = typeMetrics.reduce((acc: number, m: any) => acc + (m.value || 0), 0);
    return Math.round((sum / typeMetrics.length) * 10) / 10;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-full px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Дашборд</h1>
          <p className="text-foreground/60">
            Обзор вашего здоровья и прогресса
          </p>
        </motion.div>

        {/* Schedule Viewer - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="engraved-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  <CardTitle className="engraved-text">Расписание дня</CardTitle>
                </div>
                <Link href="/calendar">
                  <Button variant="ghost" size="sm">
                    Все расписание
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      item.completed ? 'bg-green-50/50 border-green-200' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Clock className="w-5 h-5 text-foreground/60" />
                      <span className="font-mono text-sm text-foreground/70">{item.time}</span>
                      <span className="flex-1 font-medium">{item.title}</span>
                      <SketchIcon icon={item.category as any} size={20} className="text-primary" />
                    </div>
                    {item.completed && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Metrics and Chat Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="engraved-card h-full">
              <CardHeader>
                <CardTitle className="engraved-text">Метрики сегодня</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {todayMetrics.map((metric, idx) => (
                    <HealthMetricCard
                      key={idx}
                      {...metric}
                      delay={idx * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="engraved-card h-full">
              <CardHeader>
                <CardTitle className="engraved-text">Чат</CardTitle>
                <CardDescription>Получите помощь и рекомендации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Tabs value={chatType} onValueChange={(v) => setChatType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ai" className="text-xs">
                      <Bot className="w-4 h-4 mr-1" />
                      ИИ
                    </TabsTrigger>
                    <TabsTrigger value="specialist" className="text-xs">
                      <User className="w-4 h-4 mr-1" />
                      Специалист
                    </TabsTrigger>
                    <TabsTrigger value="ai-plus" className="text-xs">
                      <Zap className="w-4 h-4 mr-1" />
                      ИИ+
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="ai" className="mt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/70 mb-3">
                        Базовый AI-ассистент для общих вопросов о здоровье
                      </p>
                      <Link href="/ai-chat">
                        <Button className="w-full engraved-button">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Открыть чат
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent value="specialist" className="mt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/70 mb-3">
                        Консультация с врачом, тренером или другим специалистом
                      </p>
                      <Link href="/social/specialists">
                        <Button variant="outline" className="w-full engraved-button-outline">
                          <User className="w-4 h-4 mr-2" />
                          Найти специалиста
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  <TabsContent value="ai-plus" className="mt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-foreground/70 mb-3">
                        Продвинутый AI с персонализацией и расширенными возможностями
                      </p>
                      <Link href="/ai-chat">
                        <Button className="w-full engraved-button">
                          <Zap className="w-4 h-4 mr-2" />
                          Подключить ИИ+
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Activity Chart */}
        {weeklyActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Активность за неделю</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="steps" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="calories" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Health Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground engraved-text">Модули здоровья</h2>
            <Link href="/presentation">
              <Button variant="ghost" size="sm">
                Все модули
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          {healthModules.length === 0 ? (
            <Card className="engraved-card">
              <CardContent className="py-12 text-center">
                <p className="text-foreground/60 mb-2">Нет данных для отображения</p>
                <p className="text-sm text-foreground/40">
                  Добавьте метрики и цели, чтобы увидеть статистику по модулям
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthModules.map((module, idx) => (
              <Link key={module.id} href={module.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="engraved-card p-6 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <SketchIcon icon={module.icon} size={32} className="text-primary" />
                      <h3 className="text-xl font-bold engraved-text">{module.title}</h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-foreground/40" />
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {module.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{metric.value}</span>
                          {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {metric.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={module.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="currentColor" 
                          strokeWidth={2}
                          dot={false}
                          className="text-primary"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </Link>
            ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

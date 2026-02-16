import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Apple, TrendingUp, Target, Calendar, BarChart3,
  Plus, ChevronLeft, Settings, FileText
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function NutritionHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.id.toString();

        // Fetch metrics for nutrition
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?metric_type=calories&limit=30`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics || []);
        }

        // Fetch goals
        const goalsResponse = await fetch(`/api/users/${userId}/goals?category=nutrition`);
        if (goalsResponse.ok) {
          const goalsData = await goalsResponse.json();
          setGoals(goalsData.goals || []);
        }
      } catch (error) {
        console.error('Error fetching nutrition data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const todayCalories = metrics.find(m => {
    const date = new Date(m.recorded_at || m.created_at).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  })?.value || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-7xl px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/health-center')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <SketchIcon icon="nutrition" size={28} className="text-green-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Питание</h1>
                <p className="text-foreground/60">Рацион и калории</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Калории сегодня</p>
                  <p className="text-3xl font-bold text-foreground">{todayCalories}</p>
                  <p className="text-xs text-foreground/60 mt-1">Цель: 2,200 ккал</p>
                </div>
                <Apple className="w-12 h-12 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Белки</p>
                  <p className="text-3xl font-bold text-foreground">--</p>
                  <p className="text-xs text-foreground/60 mt-1">г</p>
                </div>
                <Target className="w-12 h-12 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Активных целей</p>
                  <p className="text-3xl font-bold text-foreground">{goals.filter(g => !g.completed).length}</p>
                  <p className="text-xs text-foreground/60 mt-1">Всего: {goals.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 engraved-tabs">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="diary">Дневник</TabsTrigger>
            <TabsTrigger value="macros">Макронутриенты</TabsTrigger>
            <TabsTrigger value="plans">Планы</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Обзор питания</CardTitle>
                <CardDescription>Статистика и рекомендации</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Дневник питания</CardTitle>
                  <Button variant="outline" size="sm" className="engraved-button-outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить прием пищи
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="macros" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Макронутриенты</CardTitle>
                <CardDescription>Белки, жиры, углеводы</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Планы питания</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Настройки</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Настройки находятся в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Moon, TrendingUp, Target, Calendar, BarChart3,
  Plus, ChevronLeft, Settings
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SleepHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const userId = user.id.toString();
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?metric_type=sleep&limit=30`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics || []);
        }
      } catch (error) {
        console.error('Error fetching sleep data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const todaySleep = metrics.find(m => {
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
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <SketchIcon icon="sleep" size={28} className="text-purple-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Сон</h1>
                <p className="text-foreground/60">Качество и продолжительность сна</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <Card className="engraved-card mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Сон сегодня</p>
                <p className="text-3xl font-bold text-foreground">{todaySleep} ч</p>
                <p className="text-xs text-foreground/60 mt-1">Цель: 8 часов</p>
              </div>
              <Moon className="w-12 h-12 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 engraved-tabs">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="quality">Качество</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Обзор сна</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Качество сна</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Функционал находится в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Расписание сна</CardTitle>
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

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Brain, TrendingUp, Target, Calendar, BarChart3,
  Plus, ChevronLeft, Settings
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PsychologyHealth() {
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
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?metric_type=mood&limit=30`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics || []);
        }
      } catch (error) {
        console.error('Error fetching psychology data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const todayMood = metrics.find(m => {
    const date = new Date(m.recorded_at || m.created_at).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  })?.value || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
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
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <SketchIcon icon="psychology" size={28} className="text-amber-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Psychology</h1>
                <p className="text-foreground/60">Mental health and mood</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <Card className="engraved-card mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Mood Today</p>
                <p className="text-3xl font-bold text-foreground">{todayMood}/10</p>
                <p className="text-xs text-foreground/60 mt-1">Average: 7.5/10</p>
              </div>
              <Brain className="w-12 h-12 text-amber-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 engraved-tabs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Mental State Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Mood Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Stress Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

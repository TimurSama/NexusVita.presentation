import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Activity, TrendingUp, Target, Calendar, BarChart3,
  Plus, ChevronLeft, Clock, CheckCircle2, Circle,
  Settings, FileText, Zap
} from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MovementHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<any[]>([]);
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
        const today = new Date().toISOString().split('T')[0];

        // Fetch plans for movement
        const plansResponse = await fetch(`/api/users/${userId}/plans?date=${today}&category=movement`);
        if (plansResponse.ok) {
          const plansData = await plansResponse.json();
          setPlans(plansData.plans || []);
        }

        // Fetch metrics for movement
        const metricsResponse = await fetch(`/api/users/${userId}/metrics?metric_type=steps&limit=30`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics || []);
        }

        // Fetch goals
        const goalsResponse = await fetch(`/api/users/${userId}/goals?category=movement`);
        if (goalsResponse.ok) {
          const goalsData = await goalsResponse.json();
          setGoals(goalsData.goals || []);
        }
      } catch (error) {
        console.error('Error fetching movement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const todaySteps = metrics.find(m => {
    const date = new Date(m.recorded_at || m.created_at).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  })?.value || 0;

  const weeklyData = metrics.slice(0, 7).reverse().map(m => ({
    date: new Date(m.recorded_at || m.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    steps: m.value,
  }));

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
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <SketchIcon icon="movement" size={28} className="text-blue-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Movement</h1>
                <p className="text-foreground/60">Activity and workouts</p>
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
                  <p className="text-sm text-foreground/60 mb-1">Steps Today</p>
                  <p className="text-3xl font-bold text-foreground">{todaySteps.toLocaleString()}</p>
                  <p className="text-xs text-foreground/60 mt-1">Goal: 10,000</p>
                </div>
                <Activity className="w-12 h-12 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Active Plans</p>
                  <p className="text-3xl font-bold text-foreground">{plans.filter(p => !p.completed).length}</p>
                  <p className="text-xs text-foreground/60 mt-1">Of {plans.length} total</p>
                </div>
                <Target className="w-12 h-12 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="engraved-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Active Goals</p>
                  <p className="text-3xl font-bold text-foreground">{goals.filter(g => !g.completed).length}</p>
                  <p className="text-xs text-foreground/60 mt-1">Total goals: {goals.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 engraved-tabs">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Chart */}
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Weekly Activity</CardTitle>
                <CardDescription>Steps chart for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                {weeklyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="steps" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60">No data to display</p>
                    <Button
                      variant="outline"
                      className="mt-4 engraved-button-outline"
                      onClick={() => setLocation('/health-center')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Metrics
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Today's Plans */}
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Today's Plans</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation('/calendar')}
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {plans.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {plans.map((plan, idx) => (
                        <div
                          key={plan.id || idx}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            plan.completed 
                              ? 'bg-green-50/50 border-green-200 dark:bg-green-950/20' 
                              : 'bg-card border-border'
                          }`}
                        >
                          <Clock className="w-4 h-4 text-foreground/60" />
                          <span className="font-mono text-xs text-foreground/70">
                            {plan.time || '00:00'}
                          </span>
                          <span className="flex-1 font-medium text-foreground">
                            {plan.title}
                          </span>
                          {plan.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-foreground/30" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60 mb-4">No plans for today</p>
                    <Button
                      variant="outline"
                      onClick={() => setLocation('/calendar')}
                      className="engraved-button-outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Workout Plans</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Plans feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Metrics History</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {metrics.length > 0 ? (
                  <div className="space-y-3">
                    {metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">
                              {metric.value.toLocaleString()} {metric.unit || 'steps'}
                            </p>
                            <p className="text-sm text-foreground/60">
                              {new Date(metric.recorded_at || metric.created_at).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <Badge variant="outline">Steps</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                    <p className="text-foreground/60">No metric records</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="engraved-text">Movement Goals</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="engraved-button-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
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
                            <Badge variant={goal.completed ? "default" : "outline"}>
                              {goal.completed ? 'Completed' : `${progress}%`}
                            </Badge>
                          </div>
                          {goal.target_value && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-foreground/60">Progress</span>
                                <span className="font-medium text-foreground">
                                  {goal.current_value}{goal.unit || ''} / {goal.target_value}{goal.unit || ''}
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full transition-all"
                                  style={{ width: `${Math.min(progress, 100)}%` }}
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
                    <p className="text-foreground/60">No movement goals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Module Settings</CardTitle>
                <CardDescription>Personalize the movement module</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/60">Settings under development</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

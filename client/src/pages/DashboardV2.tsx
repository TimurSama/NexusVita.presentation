import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  Activity, 
  Utensils, 
  Moon, 
  Brain, 
  Heart, 
  Users, 
  Sparkles,
  TrendingUp,
  Calendar,
  Flame,
  Droplets,
  Footprints,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Bell,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Stories } from "@/components/Stories";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface DashboardData {
  healthScore: number;
  activeModules: string[];
  todayStats: {
    steps: number;
    water: number;
    sleep: number;
    calories: number;
  };
  weeklyData: any[];
  recentEntries: any[];
  streaks: {
    current: number;
    longest: number;
  };
}

interface DailyPlan {
  id: number;
  title: string;
  description?: string;
  time?: string;
  completed: boolean;
  category?: string;
}

interface ModuleMetric {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  lastEntry: string;
}

const modules = [
  { id: 'movement', name: 'Movement', icon: Activity, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', description: 'Steps, workouts, activity' },
  { id: 'nutrition', name: 'Nutrition', icon: Utensils, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', description: 'Calories, macros, water' },
  { id: 'sleep', name: 'Sleep', icon: Moon, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50', description: 'Hours, quality, phases' },
  { id: 'psychology', name: 'Psychology', icon: Brain, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', description: 'Mood, stress, journal' },
  { id: 'medicine', name: 'Medicine', icon: Heart, color: 'from-red-500 to-rose-500', bgColor: 'bg-red-50', description: 'Tests, appointments, medications' },
  { id: 'relationships', name: 'Relationships', icon: Users, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50', description: 'Social connections, communication' },
  { id: 'habits', name: 'Habits', icon: Sparkles, color: 'from-cyan-500 to-teal-500', bgColor: 'bg-cyan-50', description: 'Tracker, streaks, goals' },
];

export default function DashboardV2() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyPlans, setDailyPlans] = useState<DailyPlan[]>([]);
  const [moduleMetrics, setModuleMetrics] = useState<ModuleMetric[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    if (token) {
      loadDashboardData();
      loadDailyPlans();
      loadModuleMetrics();
    }
  }, [token, selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/dashboard?period=${selectedPeriod}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        const dashboardData = await res.json();
        setData(dashboardData);
      }
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDailyPlans = async () => {
    if (!user?.id) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch(`/api/users/${user.id}/plans?date=${today}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setDailyPlans(data.plans || []);
      }
    } catch (error) {
      console.error('Plans load error:', error);
    }
  };

  const loadModuleMetrics = async () => {
    if (!user?.id) return;
    
    try {
      const userId = user.id.toString();
      
      // Load metrics for all modules
      const metricsPromises = modules.map(async (module) => {
        try {
          const res = await fetch(`/api/users/${userId}/metrics?metric_type=${module.id}&limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          
          if (res.ok) {
            const data = await res.json();
            const metric = data.metrics?.[0];
            
            return {
              id: module.id,
              name: module.name,
              icon: module.icon,
              color: module.color,
              bgColor: module.bgColor,
              value: metric?.value || 0,
              unit: getUnitForModule(module.id),
              trend: 'neutral',
              lastEntry: metric?.recorded_at ? new Date(metric.recorded_at).toLocaleDateString('en-US') : 'No data',
            };
          }
        } catch (e) {
          console.error(`Error loading ${module.id} metrics:`, e);
        }
        
        return {
          id: module.id,
          name: module.name,
          icon: module.icon,
          color: module.color,
          bgColor: module.bgColor,
          value: 0,
          unit: getUnitForModule(module.id),
          trend: 'neutral',
          lastEntry: 'No data',
        };
      });
      
      const loadedMetrics = await Promise.all(metricsPromises);
      setModuleMetrics(loadedMetrics);
    } catch (error) {
      console.error('Module metrics load error:', error);
    }
  };

  const getUnitForModule = (moduleId: string) => {
    const units: Record<string, string> = {
      movement: 'steps',
      nutrition: 'kcal',
      sleep: 'hours',
      psychology: 'score',
      medicine: 'records',
      relationships: 'score',
      habits: 'streak',
    };
    return units[moduleId] || '';
  };

  const togglePlan = async (planId: number, completed: boolean) => {
    try {
      const res = await fetch(`/api/users/${user?.id}/plans/${planId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed }),
      });

      if (res.ok) {
        setDailyPlans(prev => prev.map(p => 
          p.id === planId ? { ...p, completed } : p
        ));
        
        toast({
          title: completed ? 'Completed! ✅' : 'Cancelled',
          description: completed ? 'Great work!' : 'Task marked as incomplete',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Sign in to view dashboard</p>
          <Button onClick={() => setLocation("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Stories Bar */}
      <Stories />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header with Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome & Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-500">Welcome,</p>
                    <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
                    <p className="text-sm text-slate-400 mt-1">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  {data && (
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getHealthScoreColor(data.healthScore)}`}>
                          {data.healthScore}
                        </div>
                        <p className="text-xs text-slate-400">Health Score</p>
                      </div>
                      <div className="w-16 h-16 relative">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${(data.healthScore / 100) * 175.9} 175.9`}
                            className={getHealthScoreColor(data.healthScore)}
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-5 h-5" />
                      <span className="text-orange-100">Streak</span>
                    </div>
                    <div className="text-3xl font-bold">
                      {data?.streaks?.current || 0} days
                    </div>
                    <p className="text-sm text-orange-100 mt-1">
                      Best: {data?.streaks?.longest || 0} days
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl">🔥</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Daily Plans & Reminders - TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold">Today's Plan</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/calendar')}>
              Calendar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Today's Plans */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {dailyPlans.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-400 mb-2">No scheduled tasks</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setLocation('/journal')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ) : (
                  dailyPlans.slice(0, 4).map((plan) => (
                    <div 
                      key={plan.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        plan.completed ? 'bg-green-50' : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <button
                        onClick={() => togglePlan(plan.id, !plan.completed)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          plan.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-slate-300 hover:border-cyan-500'
                        }`}
                      >
                        {plan.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${plan.completed ? 'line-through text-slate-400' : ''}`}>
                          {plan.title}
                        </p>
                        {plan.time && (
                          <p className="text-xs text-slate-400">{plan.time}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Add / Reminders */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Drink water</p>
                    <p className="text-xs text-slate-500">In 30 minutes</p>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Moon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sleep preparation</p>
                    <p className="text-xs text-slate-500">22:00</p>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Log meal</p>
                    <p className="text-xs text-slate-500">Dinner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Module Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold">Module Summary</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/health-center')}>
              All modules <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {moduleMetrics.map((module, index) => {
              const moduleConfig = modules.find(m => m.id === module.id);
              const Icon = module.icon;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`${module.bgColor} border-0 hover:shadow-lg transition-all cursor-pointer group`}
                    onClick={() => setLocation(`/health/${module.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/health/${module.id}`);
                          }}
                        >
                          Open
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                      
                      <h3 className="font-semibold text-slate-800">{module.name}</h3>
                      <p className="text-xs text-slate-500 mb-2">{moduleConfig?.description}</p>
                      
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-slate-700">
                            {module.value > 0 ? module.value.toLocaleString() : '-'}
                          </p>
                          <p className="text-xs text-slate-400">{module.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400">{module.lastEntry}</p>
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-3 bg-white/50 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(`/health/${module.id}`);
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Stats */}
        {data?.todayStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-lg font-semibold mb-4">Today</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Footprints className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{data.todayStats.steps.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">steps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{data.todayStats.water}L</p>
                      <p className="text-xs text-slate-500">water</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Moon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{data.todayStats.sleep}h</p>
                      <p className="text-xs text-slate-500">sleep</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{data.todayStats.calories}</p>
                      <p className="text-xs text-slate-500">kcal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Activity</CardTitle>
                  <div className="flex gap-1">
                    {(['day', 'week', 'month'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          selectedPeriod === period
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {period === 'day' ? 'Day' : period === 'week' ? 'Week' : 'Month'}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data?.weeklyData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8"
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="steps" 
                        stroke="#0ea5e9" 
                        strokeWidth={2}
                        dot={{ fill: '#0ea5e9', strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="calories" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        dot={{ fill: '#f97316', strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sleep Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.weeklyData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8"
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="sleep" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/create-post')}
          >
            <Plus className="w-6 h-6" />
            <span>New Post</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/journal')}
          >
            <Calendar className="w-6 h-6" />
            <span>Journal</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/ai-chat')}
          >
            <Zap className="w-6 h-6" />
            <span>AI Chat</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/social/friends')}
          >
            <Users className="w-6 h-6" />
            <span>Friends</span>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

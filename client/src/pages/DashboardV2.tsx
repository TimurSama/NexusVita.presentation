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
  Timer,
  ChevronRight,
  Plus
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

const modules = [
  { id: 'movement', name: 'Движение', icon: Activity, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
  { id: 'nutrition', name: 'Питание', icon: Utensils, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' },
  { id: 'sleep', name: 'Сон', icon: Moon, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50' },
  { id: 'psychology', name: 'Психология', icon: Brain, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50' },
  { id: 'medicine', name: 'Медицина', icon: Heart, color: 'from-red-500 to-rose-500', bgColor: 'bg-red-50' },
  { id: 'relationships', name: 'Отношения', icon: Users, color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50' },
  { id: 'habits', name: 'Привычки', icon: Sparkles, color: 'from-cyan-500 to-teal-500', bgColor: 'bg-cyan-50' },
];

export default function DashboardV2() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    if (token) {
      loadDashboardData();
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

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Войдите, чтобы просмотреть дашборд</p>
          <Button onClick={() => setLocation("/login")}>Войти</Button>
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
                    <p className="text-slate-500">Добро пожаловать,</p>
                    <h1 className="text-2xl font-bold">{user.full_name || user.username}</h1>
                    <p className="text-sm text-slate-400 mt-1">
                      {new Date().toLocaleDateString('ru-RU', { 
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
                        <p className="text-xs text-slate-400">Индекс здоровья</p>
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
                      {data?.streaks?.current || 0} дней
                    </div>
                    <p className="text-sm text-orange-100 mt-1">
                      Лучший: {data?.streaks?.longest || 0} дней
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

        {/* Today's Stats */}
        {data?.todayStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">Сегодня</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Footprints className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{data.todayStats.steps.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">шагов</p>
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
                      <p className="text-2xl font-bold">{data.todayStats.water}л</p>
                      <p className="text-xs text-slate-500">воды</p>
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
                      <p className="text-2xl font-bold">{data.todayStats.sleep}ч</p>
                      <p className="text-xs text-slate-500">сна</p>
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
                      <p className="text-xs text-slate-500">ккал</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Health Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Модули здоровья</h2>
            <Button variant="ghost" size="sm" onClick={() => setLocation('/health-center')}>
              Все модули <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setLocation(`/health/${module.id}`)}
                className={`${module.bgColor} rounded-xl p-4 text-center hover:shadow-lg transition-all group`}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-700">{module.name}</p>
                {data?.activeModules?.includes(module.id) && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Активен
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Активность</CardTitle>
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
                        {period === 'day' ? 'День' : period === 'week' ? 'Неделя' : 'Месяц'}
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
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ru-RU', { weekday: 'short' })}
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
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Качество сна</CardTitle>
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
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ru-RU', { weekday: 'short' })}
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
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/create-post')}
          >
            <Plus className="w-6 h-6" />
            <span>Новый пост</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/journal')}
          >
            <Calendar className="w-6 h-6" />
            <span>Дневник</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/ai-chat')}
          >
            <Sparkles className="w-6 h-6" />
            <span>ИИ Чат</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => setLocation('/social/friends')}
          >
            <Users className="w-6 h-6" />
            <span>Друзья</span>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

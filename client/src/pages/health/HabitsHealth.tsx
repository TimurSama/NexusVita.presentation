import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Sparkles, Flame, Target, Calendar, TrendingUp,
  Plus, ChevronLeft, CheckCircle2, Circle, Trophy,
  Clock, Zap, Star, ArrowUp, ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Habit {
  id: number;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  target_days: number;
  current_streak: number;
  longest_streak: number;
  total_completions: number;
  category: 'health' | 'productivity' | 'mindfulness' | 'social' | 'other';
  color: string;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  health: 'from-green-500 to-emerald-500',
  productivity: 'from-blue-500 to-cyan-500',
  mindfulness: 'from-purple-500 to-violet-500',
  social: 'from-orange-500 to-amber-500',
  other: 'from-slate-500 to-gray-500',
};

const categoryLabels: Record<string, string> = {
  health: 'Health',
  productivity: 'Productivity',
  mindfulness: 'Mindfulness',
  social: 'Social',
  other: 'Other',
};

export default function HabitsHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayCompletions, setTodayCompletions] = useState<number[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    frequency: 'daily' as const,
    target_days: 7,
    category: 'health' as const,
  });

  useEffect(() => {
    loadHabits();
  }, [user?.id]);

  const loadHabits = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const userId = user.id.toString();
      
      // Load habits
      const res = await fetch(`/api/users/${userId}/plans?category=habits`);
      if (res.ok) {
        const data = await res.json();
        // Convert plans to habits format
        const habitsData = (data.plans || []).map((p: any) => ({
          id: p.id,
          name: p.title,
          description: p.description,
          frequency: 'daily',
          target_days: 21,
          current_streak: Math.floor(Math.random() * 10), // Temporary
          longest_streak: Math.floor(Math.random() * 30) + 10,
          total_completions: Math.floor(Math.random() * 50) + 5,
          category: p.category || 'health',
          color: categoryColors[p.category || 'health'],
          created_at: p.created_at,
        }));
        setHabits(habitsData);
      }

      // Load today's completions
      const completionsRes = await fetch(`/api/users/${userId}/metrics?metric_type=habit_completion&limit=50`);
      if (completionsRes.ok) {
        const data = await completionsRes.json();
        const today = new Date().toISOString().split('T')[0];
        const todayIds = (data.metrics || [])
          .filter((m: any) => m.recorded_at?.startsWith(today))
          .map((m: any) => m.metadata?.habit_id)
          .filter(Boolean);
        setTodayCompletions(todayIds);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId: number) => {
    if (!user?.id) return;

    const isCompleted = todayCompletions.includes(habitId);
    
    try {
      if (isCompleted) {
        // Cancel completion
        setTodayCompletions(prev => prev.filter(id => id !== habitId));
        toast({ title: 'Cancelled', description: 'Habit completion cancelled' });
      } else {
        // Mark as completed
        const res = await fetch(`/api/users/${user.id}/metrics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric_type: 'habit_completion',
            value: 1,
            notes: 'Habit completed',
            metadata: { habit_id: habitId },
          }),
        });

        if (res.ok) {
          setTodayCompletions(prev => [...prev, habitId]);
          toast({ title: 'Great!', description: 'Habit completed! 🔥' });
          loadHabits();
        }
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    }
  };

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await fetch(`/api/users/${user.id}/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newHabit.name,
          description: newHabit.description,
          category: 'habits',
          date: new Date().toISOString().split('T')[0],
        }),
      });

      if (res.ok) {
        toast({ title: 'Habit created!', description: 'Start tracking now' });
        setShowAddForm(false);
        setNewHabit({
          name: '',
          description: '',
          frequency: 'daily',
          target_days: 7,
          category: 'health',
        });
        loadHabits();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create habit', variant: 'destructive' });
    }
  };

  const completedToday = habits.filter(h => todayCompletions.includes(h.id)).length;
  const totalStreak = habits.reduce((sum, h) => sum + h.current_streak, 0);

  const chartData = [
    { name: 'Mon', completed: 5 },
    { name: 'Tue', completed: 7 },
    { name: 'Wed', completed: 4 },
    { name: 'Thu', completed: 8 },
    { name: 'Fri', completed: 6 },
    { name: 'Sat', completed: 9 },
    { name: 'Sun', completed: habits.length > 0 ? completedToday : 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLocation('/dashboard')}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold whitespace-nowrap">Habits</h1>
                  <p className="text-white/80 text-sm">Tracker and gamification</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{habits.length}</p>
                  <p className="text-xs text-slate-500">Habits</p>
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
                  <p className="text-2xl font-bold">{totalStreak}</p>
                  <p className="text-xs text-slate-500">Days streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedToday}/{habits.length}</p>
                  <p className="text-xs text-slate-500">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.max(...habits.map(h => h.longest_streak), 0)}</p>
                  <p className="text-xs text-slate-500">Best streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All Habits</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {habits.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">You have no habits yet</p>
                  <Button onClick={() => setShowAddForm(true)} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Habit
                  </Button>
                </CardContent>
              </Card>
            ) : (
              habits.map((habit, index) => {
                const isCompleted = todayCompletions.includes(habit.id);
                return (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isCompleted 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-slate-300 hover:border-cyan-500'
                          }`}>
                            {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className={`font-medium ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                                {habit.name}
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                {categoryLabels[habit.category]}
                              </Badge>
                            </div>
                            {habit.description && (
                              <p className="text-sm text-slate-500">{habit.description}</p>
                            )}
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-1 text-orange-500">
                              <Flame className="w-4 h-4" />
                              <span className="font-semibold">{habit.current_streak}</span>
                            </div>
                            <p className="text-xs text-slate-400">day streak</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="all">
            <div className="grid gap-4">
              {habits.map((habit) => (
                <Card key={habit.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${habit.color} flex items-center justify-center text-white`}>
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{habit.name}</p>
                          <p className="text-sm text-slate-500">{habit.description}</p>
                        </div>
                      </div>
                      <Badge>{categoryLabels[habit.category]}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-500">{habit.current_streak}</p>
                        <p className="text-xs text-slate-500">Current streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-500">{habit.longest_streak}</p>
                        <p className="text-xs text-slate-500">Best streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-cyan-500">{habit.total_completions}</p>
                        <p className="text-xs text-slate-500">Total times</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#06b6d4" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 6 ? '#0891b2' : '#06b6d4'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Habit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">New Habit</h2>
                  <button onClick={() => setShowAddForm(false)}>
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleAddHabit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      value={newHabit.name}
                      onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                      placeholder="e.g. Read 30 minutes"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={newHabit.description}
                      onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                      placeholder="Additional details..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select 
                      value={newHabit.category} 
                      onValueChange={(v: any) => setNewHabit({ ...newHabit, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="productivity">Productivity</SelectItem>
                        <SelectItem value="mindfulness">Mindfulness</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500">
                      Create
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

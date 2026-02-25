import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { 
  Users, Heart, MessageCircle, Calendar, TrendingUp,
  Plus, ChevronLeft, Clock, CheckCircle2, Circle,
  Settings, Smile, Frown, Meh, Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RelationshipsHealth() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    relationship_quality: 5,
    communication_level: 5,
    support_level: 5,
    time_together: '',
    notes: '',
    gratitude: '',
  });

  useEffect(() => {
    loadData();
  }, [user?.id]);

  const loadData = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const userId = user.id.toString();
      
      // Загрузка метрик
      const metricsRes = await fetch(`/api/users/${userId}/metrics?metric_type=relationship_quality&limit=30`);
      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data.metrics || []);
      }

      // Загрузка записей
      const entriesRes = await fetch(`/api/users/${userId}/plans?category=relationships`);
      if (entriesRes.ok) {
        const data = await entriesRes.json();
        setEntries(data.plans || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      const res = await fetch(`/api/users/${user.id}/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_type: 'relationship_quality',
          value: formData.relationship_quality,
          notes: formData.notes,
        }),
      });

      if (res.ok) {
        toast({ title: 'Сохранено!', description: 'Запись добавлена' });
        setShowAddForm(false);
        setFormData({
          relationship_quality: 5,
          communication_level: 5,
          support_level: 5,
          time_together: '',
          notes: '',
          gratitude: '',
        });
        loadData();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить', variant: 'destructive' });
    }
  };

  const chartData = metrics.slice(-14).map((m: any) => ({
    date: new Date(m.recorded_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    quality: m.value,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
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
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Отношения</h1>
                  <p className="text-white/80 text-sm">Социальное здоровье и связи</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="entries">Записи</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics.length > 0 ? metrics[metrics.length - 1].value : '-'}</p>
                      <p className="text-xs text-slate-500">Качество отношений</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{entries.filter((e: any) => e.completed).length}</p>
                      <p className="text-xs text-slate-500">Взаимодействий</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{entries.length}</p>
                      <p className="text-xs text-slate-500">Записей</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{metrics.length > 0 ? Math.round(metrics.reduce((a: number, b: any) => a + b.value, 0) / metrics.length) : '-'}</p>
                      <p className="text-xs text-slate-500">Среднее</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика качества отношений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                      <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="quality" stroke="#f97316" fillOpacity={1} fill="url(#colorQuality)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Совет дня</h3>
                    <p className="text-white/90 text-sm">
                      Проводите качественное время с близкими. Даже 15 минут искреннего разговора 
                      без отвлекающих факторов укрепляет отношения больше, чем часы совместного времяпрепровождения с телефонами.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entries">
            <div className="space-y-4">
              {entries.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Пока нет записей</p>
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      className="mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить первую запись
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                entries.map((entry: any, index: number) => (
                  <motion.div
                    key={entry.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{entry.title}</p>
                            <p className="text-sm text-slate-500 mt-1">{entry.description}</p>
                            <p className="text-xs text-slate-400 mt-2">
                              {new Date(entry.date || entry.created_at).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          {entry.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Подробная статистика</CardTitle>
                <CardDescription>Анализ ваших социальных связей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Всего записей</span>
                  <span className="font-semibold">{entries.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Среднее качество отношений</span>
                  <span className="font-semibold">
                    {metrics.length > 0 ? (metrics.reduce((a: number, b: any) => a + b.value, 0) / metrics.length).toFixed(1) : '-'}/10
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Лучший показатель</span>
                  <span className="font-semibold">
                    {metrics.length > 0 ? Math.max(...metrics.map((m: any) => m.value)) : '-'}/10
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Новая запись</h2>
                  <button onClick={() => setShowAddForm(false)}>
                    <Plus className="w-6 h-6 rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Качество отношений (1-10)</label>
                    <Slider
                      value={[formData.relationship_quality]}
                      onValueChange={([v]) => setFormData({ ...formData, relationship_quality: v })}
                      min={1}
                      max={10}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Плохо</span>
                      <span className="font-medium">{formData.relationship_quality}</span>
                      <span>Отлично</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Заметки</label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Как прошел день?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">За что благодарны?</label>
                    <Textarea
                      value={formData.gratitude}
                      onChange={(e) => setFormData({ ...formData, gratitude: e.target.value })}
                      placeholder="Напишите, что вас порадовало..."
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                      Отмена
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500">
                      Сохранить
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

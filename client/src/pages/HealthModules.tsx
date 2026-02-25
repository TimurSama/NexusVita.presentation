import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  Activity, 
  Utensils, 
  Moon, 
  Brain, 
  Heart, 
  Users, 
  Sparkles,
  ChevronLeft,
  Plus,
  Save,
  Clock,
  Flame,
  Droplets,
  Smile,
  Frown,
  Meh
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const modules = {
  movement: {
    name: 'Движение',
    icon: Activity,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    fields: [
      { name: 'activity_type', label: 'Тип активности', type: 'select', options: ['Бег', 'Ходьба', 'Плавание', 'Велосипед', 'Силовая', 'Йога', 'Другое'] },
      { name: 'duration', label: 'Длительность (мин)', type: 'number', min: 1 },
      { name: 'steps', label: 'Шаги', type: 'number', min: 0 },
      { name: 'calories_burned', label: 'Сожжено калорий', type: 'number', min: 0 },
      { name: 'distance', label: 'Расстояние (км)', type: 'number', min: 0, step: 0.1 },
      { name: 'heart_rate_avg', label: 'Средний пульс', type: 'number', min: 0 },
      { name: 'notes', label: 'Заметки', type: 'textarea' },
    ]
  },
  nutrition: {
    name: 'Питание',
    icon: Utensils,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    fields: [
      { name: 'meal_type', label: 'Прием пищи', type: 'select', options: ['Завтрак', 'Обед', 'Ужин', 'Перекус'] },
      { name: 'food_name', label: 'Название блюда', type: 'text' },
      { name: 'calories', label: 'Калории', type: 'number', min: 0 },
      { name: 'protein', label: 'Белки (г)', type: 'number', min: 0 },
      { name: 'carbs', label: 'Углеводы (г)', type: 'number', min: 0 },
      { name: 'fats', label: 'Жиры (г)', type: 'number', min: 0 },
      { name: 'water', label: 'Вода (л)', type: 'number', min: 0, step: 0.1 },
    ]
  },
  sleep: {
    name: 'Сон',
    icon: Moon,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    fields: [
      { name: 'bedtime', label: 'Легли спать', type: 'time' },
      { name: 'wakeup_time', label: 'Проснулись', type: 'time' },
      { name: 'duration_hours', label: 'Длительность (часов)', type: 'number', min: 0, max: 24, step: 0.5 },
      { name: 'quality_score', label: 'Качество сна', type: 'slider', min: 1, max: 10 },
      { name: 'awakenings', label: 'Пробуждений за ночь', type: 'number', min: 0 },
      { name: 'dream_notes', label: 'Сны / заметки', type: 'textarea' },
    ]
  },
  psychology: {
    name: 'Психология',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    fields: [
      { name: 'mood_score', label: 'Настроение (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'stress_level', label: 'Уровень стресса (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'energy_level', label: 'Энергия (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'anxiety_level', label: 'Тревожность (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'journal_entry', label: 'Запись в дневнике', type: 'textarea' },
      { name: 'gratitude', label: 'За что благодарны сегодня', type: 'textarea' },
    ]
  },
  medicine: {
    name: 'Медицина',
    icon: Heart,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    fields: [
      { name: 'document_type', label: 'Тип документа', type: 'select', options: ['Анализ', 'Прием врача', 'Диагноз', 'Назначение', 'Вакцинация'] },
      { name: 'title', label: 'Название', type: 'text' },
      { name: 'doctor_name', label: 'Врач', type: 'text' },
      { name: 'clinic', label: 'Клиника', type: 'text' },
      { name: 'results', label: 'Результаты', type: 'textarea' },
      { name: 'notes', label: 'Заметки', type: 'textarea' },
    ]
  },
  habits: {
    name: 'Привычки',
    icon: Sparkles,
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50',
    fields: [
      { name: 'habit_name', label: 'Название привычки', type: 'text' },
      { name: 'completed', label: 'Выполнено', type: 'checkbox' },
      { name: 'difficulty', label: 'Сложность (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'notes', label: 'Заметки', type: 'textarea' },
    ]
  },
  relationships: {
    name: 'Отношения',
    icon: Users,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    fields: [
      { name: 'relationship_quality', label: 'Качество отношений (1-10)', type: 'slider', min: 1, max: 10 },
      { name: 'time_together', label: 'Время вместе (часов)', type: 'number', min: 0, step: 0.5 },
      { name: 'interaction_type', label: 'Тип взаимодействия', type: 'select', options: ['Разговор', 'Совместная активность', 'Помощь', 'Другое'] },
      { name: 'notes', label: 'Заметки', type: 'textarea' },
      { name: 'gratitude', label: 'За что благодарны', type: 'textarea' },
    ]
  },
};

export default function HealthModules() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const moduleId = params.moduleId as keyof typeof modules;
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const module = modules[moduleId];

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Модуль не найден</p>
          <Button onClick={() => setLocation('/dashboard')}>На дашборд</Button>
        </div>
      </div>
    );
  }

  const Icon = module.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы сохранить данные",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`/api/users/${user?.id}/health/${moduleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      toast({
        title: "Сохранено!",
        description: "Данные успешно добавлены",
      });

      setFormData({});
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.label}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            min={field.min}
            max={field.max}
            step={field.step || 1}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: Number(e.target.value) })}
            placeholder={field.label}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.label}
            rows={3}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="">Выберите...</option>
            {field.options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      
      case 'slider':
        return (
          <div className="space-y-2">
            <Slider
              value={[value || field.min]}
              onValueChange={([v]) => setFormData({ ...formData, [field.name]: v })}
              min={field.min}
              max={field.max}
              step={1}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>{field.min}</span>
              <span className="font-medium text-slate-700">{value || field.min}</span>
              <span>{field.max}</span>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span>Выполнено</span>
          </label>
        );
      
      case 'time':
        return (
          <Input
            type="time"
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${module.bgColor} pb-20`}>
      {/* Header */}
      <header className={`bg-gradient-to-r ${module.color} text-white`}>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation('/dashboard')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{module.name}</h1>
                <p className="text-white/80 text-sm">Добавить запись</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Новая запись</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {module.fields.map((field) => (
                  <div key={field.name}>
                    <Label className="mb-2 block">{field.label}</Label>
                    {renderField(field)}
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setLocation('/dashboard')}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-gradient-to-r ${module.color}`}
                  >
                    {isSubmitting ? (
                      <><Clock className="w-4 h-4 mr-2 animate-spin" /> Сохранение...</>
                    ) : (
                      <><Save className="w-4 h-4 mr-2" /> Сохранить</>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-2`}>
                <Plus className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-slate-500">Сегодня</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-2`}>
                <Flame className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-slate-500">Неделя</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-white mb-2`}>
                <Activity className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-slate-500">Месяц</p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

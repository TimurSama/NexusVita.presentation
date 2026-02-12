import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import SketchIcon from './SketchIcon';
import { RecommendationCard } from './RecommendationCard';

interface PlanItem {
  id: string;
  time: string;
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mental' | 'prevention';
  completed: boolean;
}

interface HealthPlan {
  date: string;
  items: PlanItem[];
  dailyGoals: {
    water: number;
    steps: number;
    calories: number;
  };
}

interface HealthPlanViewerProps {
  plan: HealthPlan;
  onItemComplete?: (itemId: string) => void;
}

export function HealthPlanViewer({ plan, onItemComplete }: HealthPlanViewerProps) {
  const [selectedDay, setSelectedDay] = useState(plan.date);

  const completedCount = plan.items.filter(item => item.completed).length;
  const totalCount = plan.items.length;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SketchIcon icon="roadmap" size={24} className="text-primary" />
          <h2 className="text-2xl font-bold text-foreground">План на день</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Calendar className="w-4 h-4" />
          <span>{new Date(plan.date).toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(plan.dailyGoals).map(([key, value]) => (
          <div key={key} className="bg-card border border-border/50 rounded-xl p-4">
            <div className="text-xs text-foreground/60 mb-1 capitalize">{key === 'water' ? 'Вода' : key === 'steps' ? 'Шаги' : 'Калории'}</div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-foreground/40 mt-1">
              {key === 'water' ? 'литров' : key === 'steps' ? 'шагов' : 'ккал'}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Progress */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Прогресс выполнения</h3>
          <span className="text-sm text-foreground/60">
            {completedCount} / {totalCount}
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <div className="text-xs text-foreground/60 mt-2 text-right">
          {Math.round(completionRate)}% выполнено
        </div>
      </div>

      {/* Plan Items */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Расписание
        </h3>
        {plan.items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card border border-border/50 rounded-xl p-5 transition-all ${
              item.completed ? 'opacity-60' : 'hover:border-primary/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-foreground/30" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{item.time}</span>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                  </div>
                  {!item.completed && (
                    <button
                      onClick={() => onItemComplete?.(item.id)}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      Выполнено
                    </button>
                  )}
                </div>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

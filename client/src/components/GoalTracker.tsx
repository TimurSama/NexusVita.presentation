import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Target } from 'lucide-react';
import SketchIcon from './SketchIcon';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'fitness' | 'mental' | 'social';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

interface GoalTrackerProps {
  goals: Goal[];
  onGoalUpdate?: (goalId: string, progress: number) => void;
}

export function GoalTracker({ goals, onGoalUpdate }: GoalTrackerProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const getProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'health':
        return 'heart';
      case 'fitness':
        return 'movement';
      case 'mental':
        return 'brain';
      case 'social':
        return 'relationships';
      default:
        return 'chart';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <SketchIcon icon="chart" size={24} className="text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Цели и планы</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal, idx) => {
          const progress = getProgress(goal);
          const isSelected = selectedGoal === goal.id;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedGoal(isSelected ? null : goal.id)}
              className={`bg-card border border-border/50 rounded-xl p-6 cursor-pointer transition-all ${
                isSelected ? 'border-primary/50 shadow-lg' : 'hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <SketchIcon
                      icon={getCategoryIcon(goal.category) as any}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {goal.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-foreground/30" />
                      )}
                      <h3 className="font-semibold text-foreground">{goal.title}</h3>
                    </div>
                    <p className="text-sm text-foreground/60">{goal.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="font-semibold text-primary">{Math.round(progress)}%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${
                      goal.completed ? 'bg-primary' : 'bg-primary/70'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-foreground/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>До {goal.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>{goal.category}</span>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-border/50"
                  >
                    <input
                      type="range"
                      min={0}
                      max={goal.target}
                      value={goal.current}
                      onChange={(e) => {
                        onGoalUpdate?.(goal.id, Number(e.target.value));
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-2">
                      <span>Обновить прогресс</span>
                      <span>{goal.current} {goal.unit}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

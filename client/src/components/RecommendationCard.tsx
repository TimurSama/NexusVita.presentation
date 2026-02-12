import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import SketchIcon from './SketchIcon';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mental' | 'prevention';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  deadline?: string;
  actionItems?: string[];
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onStatusChange?: (id: string, status: Recommendation['status']) => void;
  delay?: number;
}

export function RecommendationCard({
  recommendation,
  onStatusChange,
  delay = 0,
}: RecommendationCardProps) {
  const getCategoryIcon = (category: Recommendation['category']) => {
    switch (category) {
      case 'nutrition':
        return 'nutrition';
      case 'exercise':
        return 'movement';
      case 'sleep':
        return 'sleep';
      case 'mental':
        return 'psychology';
      case 'prevention':
        return 'medicine';
      default:
        return 'chart';
    }
  };

  const getPriorityColor = () => {
    switch (recommendation.priority) {
      case 'high':
        return 'border-accent/50 bg-accent/5';
      case 'medium':
        return 'border-primary/30 bg-primary/5';
      case 'low':
        return 'border-border/50 bg-card';
    }
  };

  const getStatusIcon = () => {
    switch (recommendation.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-secondary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-foreground/40" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`bg-card border rounded-xl p-6 ${getPriorityColor()} transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SketchIcon
              icon={getCategoryIcon(recommendation.category) as any}
              size={20}
              className="text-primary"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getStatusIcon()}
              <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                recommendation.priority === 'high'
                  ? 'bg-accent/20 text-accent'
                  : recommendation.priority === 'medium'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-foreground/10 text-foreground/60'
              }`}>
                {recommendation.priority === 'high' ? 'Высокий' : recommendation.priority === 'medium' ? 'Средний' : 'Низкий'}
              </span>
            </div>
            <p className="text-sm text-foreground/70">{recommendation.description}</p>
          </div>
        </div>
      </div>

      {recommendation.actionItems && recommendation.actionItems.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
            Действия:
          </h4>
          <ul className="space-y-1">
            {recommendation.actionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        {recommendation.deadline && (
          <span className="text-xs text-foreground/60">
            Срок: {recommendation.deadline}
          </span>
        )}
        <div className="flex gap-2">
          {recommendation.status !== 'completed' && (
            <button
              onClick={() => onStatusChange?.(recommendation.id, 'in-progress')}
              className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              Начать
            </button>
          )}
          {recommendation.status === 'in-progress' && (
            <button
              onClick={() => onStatusChange?.(recommendation.id, 'completed')}
              className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Завершить
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

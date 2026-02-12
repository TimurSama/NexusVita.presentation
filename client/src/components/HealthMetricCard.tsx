import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import SketchIcon from './SketchIcon';

interface HealthMetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  target?: number;
  icon?: 'chart' | 'monitor' | 'heart' | 'brain';
  description?: string;
  delay?: number;
}

export function HealthMetricCard({
  title,
  value,
  unit = '',
  trend,
  target,
  icon = 'chart',
  description,
  delay = 0,
}: HealthMetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-accent" />;
      default:
        return <Minus className="w-4 h-4 text-foreground/40" />;
    }
  };

  const getProgress = () => {
    if (!target || typeof value !== 'number') return null;
    const percentage = Math.min((value / target) * 100, 100);
    return percentage;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SketchIcon icon={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-foreground/60 mt-1">{description}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-foreground/60">{unit}</span>}
        </div>

        {target && typeof value === 'number' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground/60">
              <span>Цель: {target}{unit}</span>
              <span>{Math.round(getProgress() || 0)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ delay: delay + 0.2, duration: 0.6 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

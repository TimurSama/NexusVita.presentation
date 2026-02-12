import { motion } from 'framer-motion';
import { Calendar, FileText, TrendingUp, Smile } from 'lucide-react';
import { JournalStats } from '@/types/journal';
import SketchIcon from './SketchIcon';

interface JournalStatsProps {
  stats: JournalStats;
}

export function JournalStatsComponent({ stats }: JournalStatsProps) {
  const statCards = [
    {
      label: 'Всего записей',
      value: stats.totalEntries,
      icon: 'chart' as const,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'За этот месяц',
      value: stats.entriesThisMonth,
      icon: 'calendar' as const,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'Среднее настроение',
      value: stats.averageMood ? stats.averageMood.toFixed(1) : '—',
      icon: 'heart' as const,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Активность',
      value: stats.entriesThisMonth > 0 ? 'Активен' : 'Нет активности',
      icon: 'trending' as const,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="premium-card p-4"
        >
          <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
            <SketchIcon icon={stat.icon} size={20} className={stat.color} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
          <div className="text-sm text-foreground/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

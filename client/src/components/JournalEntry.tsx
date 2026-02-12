import { motion } from 'framer-motion';
import { Calendar, Tag, Smile, Edit, Trash2 } from 'lucide-react';
import { JournalEntry, MoodLevel } from '@/types/journal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SketchIcon from './SketchIcon';
// Using native Date methods instead of date-fns

interface JournalEntryProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const entryTypeLabels: Record<JournalEntry['type'], string> = {
  day: 'День',
  health: 'Здоровье',
  reflection: 'Размышления',
  goal: 'Цель',
  gratitude: 'Благодарность',
};

const entryTypeIcons: Record<JournalEntry['type'], string> = {
  day: 'chart',
  health: 'heart',
  reflection: 'brain',
  goal: 'trending',
  gratitude: 'heart',
};

const moodEmojis: Record<MoodLevel, string> = {
  1: '😢',
  2: '😞',
  3: '😐',
  4: '🙂',
  5: '😊',
  6: '😄',
  7: '😁',
  8: '🤩',
  9: '🥳',
  10: '🌟',
};

export function JournalEntryCard({ entry, onEdit, onDelete }: JournalEntryProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = d.toDateString() === today.toDateString();
    const isYesterday = d.toDateString() === yesterday.toDateString();
    
    if (isToday) return 'Сегодня';
    if (isYesterday) return 'Вчера';
    
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <SketchIcon icon={entryTypeIcons[entry.type] as any} size={20} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {entryTypeLabels[entry.type]}
              </Badge>
              {entry.category && (
                <Badge variant="secondary" className="text-xs">
                  {entry.category}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-foreground mt-1">{entry.title}</h3>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(entry)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(entry.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <p className="text-foreground/70 mb-4 line-clamp-3">{entry.content}</p>

      {/* Meta */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-foreground/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(entry.date)}</span>
          </div>
          {entry.mood && (
            <div className="flex items-center gap-1">
              <Smile className="h-4 w-4" />
              <span className="text-lg">{moodEmojis[entry.mood]}</span>
              <span className="text-xs">({entry.mood}/10)</span>
            </div>
          )}
        </div>
        {entry.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="h-4 w-4" />
            {entry.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 3 && (
              <span className="text-xs">+{entry.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

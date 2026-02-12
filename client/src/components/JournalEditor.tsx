import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Tag, Smile, MapPin, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { JournalEntry, JournalEntryType, MoodLevel } from '@/types/journal';
import SketchIcon from './SketchIcon';

interface JournalEditorProps {
  entry?: JournalEntry | null;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const entryTypes: { value: JournalEntryType; label: string; icon: string }[] = [
  { value: 'day', label: 'День', icon: 'chart' },
  { value: 'health', label: 'Здоровье', icon: 'heart' },
  { value: 'reflection', label: 'Размышления', icon: 'brain' },
  { value: 'goal', label: 'Цель', icon: 'trending' },
  { value: 'gratitude', label: 'Благодарность', icon: 'heart' },
];

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

export function JournalEditor({ entry, onSave, onCancel, isOpen }: JournalEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<JournalEntryType>('day');
  const [mood, setMood] = useState<MoodLevel | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setType(entry.type);
      setMood(entry.mood);
      setTags(entry.tags || []);
      setCategory(entry.category || '');
      setDate(new Date(entry.date).toISOString().split('T')[0]);
    } else {
      // Reset for new entry
      setTitle('');
      setContent('');
      setType('day');
      setMood(undefined);
      setTags([]);
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [entry, isOpen]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    const newEntry: JournalEntry = {
      id: entry?.id || `entry-${Date.now()}`,
      type,
      title: title || 'Без названия',
      content,
      date: new Date(date),
      mood,
      tags,
      category: category || undefined,
      createdAt: entry?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    onSave(newEntry);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] bg-background rounded-2xl shadow-xl border border-border overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">
              {entry ? 'Редактировать запись' : 'Новая запись'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Type Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Тип записи
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {entryTypes.map((et) => (
                  <button
                    key={et.value}
                    onClick={() => setType(et.value)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      type === et.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <SketchIcon icon={et.icon as any} size={20} className="mx-auto mb-1" />
                    <div className="text-xs font-medium">{et.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Дата
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Заголовок
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="О чем эта запись?"
                className="w-full"
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Содержание
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Расскажите о своем дне, мыслях, чувствах..."
                className="w-full min-h-[200px] resize-none"
              />
            </div>

            {/* Mood */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Smile className="h-4 w-4" />
                Настроение
              </label>
              <div className="flex gap-2 flex-wrap">
                {(Object.keys(moodEmojis) as MoodLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setMood(mood === level ? undefined : level)}
                    className={`p-3 rounded-xl border-2 transition-all text-2xl ${
                      mood === level
                        ? 'border-primary bg-primary/10 scale-110'
                        : 'border-border hover:border-primary/50'
                    }`}
                    title={`${level}/10`}
                  >
                    {moodEmojis[level]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Теги
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Добавить тег"
                  className="flex-1"
                />
                <Button onClick={handleAddTag} variant="outline">
                  Добавить
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Категория
              </label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Например: Работа, Отдых, Спорт..."
                className="w-full"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Сохранить
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

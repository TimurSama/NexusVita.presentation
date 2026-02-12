import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import SketchIcon from './SketchIcon';

export interface Metric {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  category?: string;
  icon?: string;
  min?: number;
  max?: number;
  notes?: string;
  timestamp?: Date;
}

interface MetricInputProps {
  metric: Metric;
  onSave: (metric: Metric) => void;
  onCancel?: () => void;
  categories?: string[];
}

export function MetricInput({ metric, onSave, onCancel, categories }: MetricInputProps) {
  const [value, setValue] = useState(metric.value);
  const [notes, setNotes] = useState(metric.notes || '');
  const [category, setCategory] = useState(metric.category || '');

  const handleSave = () => {
    onSave({
      ...metric,
      value,
      notes,
      category,
      timestamp: new Date(),
    });
  };

  const getTrend = (): 'up' | 'down' | 'stable' => {
    if (typeof value === 'number' && metric.min !== undefined && metric.max !== undefined) {
      const mid = (metric.min + metric.max) / 2;
      if (value > mid * 1.1) return 'up';
      if (value < mid * 0.9) return 'down';
    }
    return 'stable';
  };

  const trend = getTrend();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {metric.icon && (
            <SketchIcon icon={metric.icon as any} size={24} className="text-primary" />
          )}
          <div>
            <h3 className="font-semibold text-foreground">{metric.name}</h3>
            {metric.category && (
              <p className="text-sm text-foreground/60">{metric.category}</p>
            )}
          </div>
        </div>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Value Input */}
        <div>
          <Label>Значение</Label>
          <div className="flex gap-2 items-center">
            <Input
              type={typeof metric.value === 'number' ? 'number' : 'text'}
              value={value}
              onChange={(e) =>
                setValue(typeof metric.value === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)
              }
              min={metric.min}
              max={metric.max}
              step={typeof metric.value === 'number' ? 0.1 : undefined}
              className="flex-1"
            />
            {metric.unit && (
              <span className="text-sm text-foreground/60 px-2">{metric.unit}</span>
            )}
            {trend !== 'stable' && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                trend === 'up' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
          {metric.min !== undefined && metric.max !== undefined && (
            <p className="text-xs text-foreground/50 mt-1">
              Норма: {metric.min} - {metric.max} {metric.unit}
            </p>
          )}
        </div>

        {/* Category */}
        {categories && categories.length > 0 && (
          <div>
            <Label>Категория</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Notes */}
        <div>
          <Label>Заметки</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Дополнительная информация..."
            rows={3}
          />
        </div>

        {/* Timestamp */}
        {metric.timestamp && (
          <div className="text-xs text-foreground/50">
            Последнее обновление: {new Date(metric.timestamp).toLocaleString('ru-RU')}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Отмена
          </Button>
        )}
        <Button onClick={handleSave} className="flex-1 gap-2">
          <Save className="h-4 w-4" />
          Сохранить
        </Button>
      </div>
    </motion.div>
  );
}

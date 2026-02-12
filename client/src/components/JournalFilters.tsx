import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JournalFilters, JournalEntryType } from '@/types/journal';
import { motion, AnimatePresence } from 'framer-motion';

interface JournalFiltersProps {
  filters: JournalFilters;
  onFiltersChange: (filters: JournalFilters) => void;
}

const entryTypes: { value: JournalEntryType; label: string }[] = [
  { value: 'day', label: 'День' },
  { value: 'health', label: 'Здоровье' },
  { value: 'reflection', label: 'Размышления' },
  { value: 'goal', label: 'Цель' },
  { value: 'gratitude', label: 'Благодарность' },
];

export function JournalFiltersComponent({ filters, onFiltersChange }: JournalFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = <K extends keyof JournalFilters>(key: K, value: JournalFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      type: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      tags: undefined,
      mood: undefined,
      category: undefined,
    });
  };

  const hasActiveFilters = !!(
    filters.type ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.tags?.length ||
    filters.mood ||
    filters.category
  );

  return (
    <div className="space-y-4">
      {/* Basic Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
          <Input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Поиск по записям..."
            className="pl-10"
          />
        </div>
        <Button
          variant={showAdvanced ? 'default' : 'outline'}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Фильтры
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Сбросить
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="premium-card p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Тип записи
                  </label>
                  <Select
                    value={filters.type || 'all'}
                    onValueChange={(value) =>
                      updateFilter('type', value === 'all' ? undefined : (value as JournalEntryType))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      {entryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Период
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={filters.dateFrom ? new Date(filters.dateFrom).toISOString().split('T')[0] : ''}
                      onChange={(e) =>
                        updateFilter('dateFrom', e.target.value ? new Date(e.target.value) : undefined)
                      }
                      placeholder="От"
                      className="flex-1"
                    />
                    <Input
                      type="date"
                      value={filters.dateTo ? new Date(filters.dateTo).toISOString().split('T')[0] : ''}
                      onChange={(e) =>
                        updateFilter('dateTo', e.target.value ? new Date(e.target.value) : undefined)
                      }
                      placeholder="До"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Категория
                  </label>
                  <Input
                    value={filters.category || ''}
                    onChange={(e) => updateFilter('category', e.target.value || undefined)}
                    placeholder="Категория"
                  />
                </div>

                {/* Mood */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Настроение (от)
                  </label>
                  <Select
                    value={filters.mood?.toString() || 'all'}
                    onValueChange={(value) =>
                      updateFilter('mood', value === 'all' ? undefined : (parseInt(value) as any))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Любое" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любое</SelectItem>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                        <SelectItem key={level} value={level.toString()}>
                          {level}/10
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

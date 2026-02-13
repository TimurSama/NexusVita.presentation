import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeightSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  label?: string;
}

const weights = [
  { value: 20, label: '20 кг', color: 'from-red-500 to-red-600' },
  { value: 10, label: '10 кг', color: 'from-orange-500 to-orange-600' },
  { value: 5, label: '5 кг', color: 'from-yellow-500 to-yellow-600' },
  { value: 1, label: '1 кг', color: 'from-green-500 to-green-600' },
  { value: 0.5, label: '0.5 кг', color: 'from-blue-500 to-blue-600' },
];

export function WeightSelector({
  value,
  onChange,
  min = 30,
  max = 200,
  step = 0.5,
  unit = 'кг',
  label = 'Вес',
}: WeightSelectorProps) {
  const [selectedWeights, setSelectedWeights] = useState<number[]>([]);
  const [scaleValue, setScaleValue] = useState(value);

  const addWeight = (weight: number) => {
    const newValue = Math.min(max, value + weight);
    onChange(newValue);
    setSelectedWeights([...selectedWeights, weight]);
    setScaleValue(newValue);
  };

  const removeWeight = (weight: number) => {
    const newValue = Math.max(min, value - weight);
    onChange(newValue);
    setSelectedWeights(selectedWeights.filter((w) => w !== weight));
    setScaleValue(newValue);
  };

  const calculateWeightCount = (targetWeight: number) => {
    const counts: Record<number, number> = {};
    let remaining = targetWeight;
    
    weights.forEach((w) => {
      counts[w.value] = 0;
    });

    weights.forEach((w) => {
      while (remaining >= w.value) {
        counts[w.value]++;
        remaining -= w.value;
      }
    });

    return counts;
  };

  const weightCounts = calculateWeightCount(value);

  return (
    <div className="flex flex-col items-center gap-6">
      {label && (
        <label className="text-sm font-medium text-foreground/70">{label}</label>
      )}

      {/* Scale Display */}
      <div className="relative w-64 h-80">
        {/* Scale base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />

        {/* Scale platform */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-8 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg shadow-lg"
          animate={{ y: -Math.min(60, (value - min) * 0.5) }}
        />

        {/* Weights on scale */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          {weights.map((weight) => {
            const count = weightCounts[weight.value] || 0;
            return Array.from({ length: Math.min(count, 3) }).map((_, i) => (
              <motion.div
                key={`${weight.value}-${i}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className={`w-16 h-12 bg-gradient-to-br ${weight.color} rounded-lg shadow-lg flex items-center justify-center text-white text-xs font-bold`}
                style={{ marginTop: i * 2 }}
              >
                {weight.label}
              </motion.div>
            ));
          })}
        </div>

        {/* Scale indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-primary origin-bottom"
          animate={{ rotate: Math.min(45, Math.max(-45, (value - (min + max) / 2) * 0.5)) }}
        />
      </div>

      {/* Weight value display */}
      <div className="text-center">
        <motion.div
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold text-primary mb-2"
        >
          {value.toFixed(1)} <span className="text-2xl text-foreground/60">{unit}</span>
        </motion.div>
      </div>

      {/* Weight controls */}
      <div className="grid grid-cols-5 gap-2 w-full max-w-md">
        {weights.map((weight) => {
          const count = weightCounts[weight.value] || 0;
          const canAdd = value + weight <= max;
          const canRemove = value - weight >= min && count > 0;

          return (
            <div key={weight.value} className="flex flex-col items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addWeight(weight.value)}
                disabled={!canAdd}
                className={`w-full h-16 bg-gradient-to-br ${weight.color} text-white border-0 hover:opacity-80 disabled:opacity-30`}
              >
                <div className="flex flex-col items-center">
                  <Plus className="h-4 w-4 mb-1" />
                  <span className="text-xs">{weight.label}</span>
                </div>
              </Button>
              {count > 0 && (
                <div className="text-xs text-foreground/60">×{count}</div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeWeight(weight.value)}
                disabled={!canRemove}
                className="w-full h-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Quick adjust buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          -1 {unit}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +1 {unit}
        </Button>
      </div>
    </div>
  );
}

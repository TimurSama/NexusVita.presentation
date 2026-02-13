import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmojiMoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const moods = [
  { emoji: '😢', value: 1, label: 'Очень плохо', color: 'from-red-500 to-red-600' },
  { emoji: '😞', value: 2, label: 'Плохо', color: 'from-orange-500 to-orange-600' },
  { emoji: '😐', value: 3, label: 'Нейтрально', color: 'from-yellow-500 to-yellow-600' },
  { emoji: '🙂', value: 4, label: 'Хорошо', color: 'from-lime-500 to-lime-600' },
  { emoji: '😊', value: 5, label: 'Очень хорошо', color: 'from-green-500 to-green-600' },
  { emoji: '😄', value: 6, label: 'Отлично', color: 'from-emerald-500 to-emerald-600' },
  { emoji: '🤩', value: 7, label: 'Превосходно', color: 'from-cyan-500 to-cyan-600' },
  { emoji: '🥳', value: 8, label: 'Эйфория', color: 'from-blue-500 to-blue-600' },
  { emoji: '😍', value: 9, label: 'В восторге', color: 'from-purple-500 to-purple-600' },
  { emoji: '🌟', value: 10, label: 'Идеально', color: 'from-pink-500 to-pink-600' },
];

export function EmojiMoodSlider({
  value,
  onChange,
  min = 1,
  max = 10,
  label = 'Настроение',
}: EmojiMoodSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const currentMood = moods.find((m) => m.value === value) || moods[4];

  const handleSliderChange = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {label && (
        <label className="text-sm font-medium text-foreground/70">{label}</label>
      )}

      {/* Emoji Display */}
      <motion.div
        key={value}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="text-8xl"
        >
          {currentMood.emoji}
        </motion.div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-semibold text-foreground/70 bg-background/80 px-2 py-1 rounded">
            {currentMood.label}
          </span>
        </div>
      </motion.div>

      {/* Slider */}
      <div className="w-full max-w-md px-4">
        <div className="relative">
          {/* Track */}
          <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />

          {/* Thumb */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDrag={(_, info) => {
              const sliderWidth = 400; // max-w-md
              const percentage = (info.point.x - 200) / sliderWidth;
              const newValue = Math.round(min + percentage * (max - min));
              handleSliderChange(newValue);
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="absolute top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
            style={{
              left: `${((value - min) / (max - min)) * 100}%`,
              x: '-50%',
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentMood.color} shadow-lg border-2 border-background`} />
          </motion.div>
        </div>

        {/* Value display */}
        <div className="flex justify-between mt-2 text-xs text-foreground/50">
          <span>{min}</span>
          <motion.span
            key={value}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-primary"
          >
            {value}
          </motion.span>
          <span>{max}</span>
        </div>
      </div>

      {/* Quick select buttons */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {moods.map((mood) => (
          <motion.button
            key={mood.value}
            onClick={() => onChange(mood.value)}
            className={`p-2 rounded-lg text-2xl transition-all ${
              value === mood.value
                ? `bg-gradient-to-br ${mood.color} scale-110 shadow-lg`
                : 'bg-muted hover:bg-accent'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

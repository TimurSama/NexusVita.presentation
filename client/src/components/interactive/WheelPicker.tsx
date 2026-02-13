import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface WheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  label?: string;
}

export function WheelPicker({
  value,
  onChange,
  min = 100,
  max = 220,
  step = 1,
  unit = 'см',
  label = 'Рост',
}: WheelPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { damping: 30, stiffness: 300 });

  // Generate values array
  const values = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);
  const itemHeight = 60;
  const visibleItems = 5;
  const totalHeight = values.length * itemHeight;

  // Calculate current index
  const currentIndex = values.indexOf(value);
  const offsetY = currentIndex * itemHeight;

  useEffect(() => {
    y.set(-offsetY);
  }, [value, y, offsetY]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? step : -step;
    const newValue = Math.max(min, Math.min(max, value + delta));
    onChange(newValue);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const deltaY = clientY - centerY;
    const deltaSteps = Math.round(deltaY / itemHeight);
    const newIndex = Math.max(0, Math.min(values.length - 1, currentIndex + deltaSteps));
    const newValue = values[newIndex];
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {label && (
        <label className="text-sm font-medium text-foreground/70">{label}</label>
      )}
      <div
        ref={containerRef}
        className="relative w-32 h-80 overflow-hidden rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20"
        onWheel={handleWheel}
      >
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background z-10 pointer-events-none" />

        {/* Center indicator */}
        <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 border-t-2 border-b-2 border-primary z-20 pointer-events-none">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
        </div>

        {/* Values */}
        <motion.div
          style={{ y: springY }}
          className="flex flex-col items-center justify-center"
          drag="y"
          dragConstraints={{ top: -totalHeight + itemHeight * visibleItems, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={(_, info) => {
            const delta = -info.offset.y;
            const steps = Math.round(delta / itemHeight);
            const newIndex = Math.max(0, Math.min(values.length - 1, currentIndex + steps));
            if (newIndex !== currentIndex) {
              onChange(values[newIndex]);
            }
          }}
        >
          {values.map((val, index) => {
            const distance = Math.abs(index - currentIndex);
            const scale = distance === 0 ? 1 : Math.max(0.5, 1 - distance * 0.15);
            const opacity = distance === 0 ? 1 : Math.max(0.3, 1 - distance * 0.2);

            return (
              <motion.div
                key={val}
                className="flex items-center justify-center w-full"
                style={{
                  height: itemHeight,
                  scale,
                  opacity,
                }}
              >
                <span className="text-2xl font-bold text-foreground">
                  {val}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Display value */}
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-1">
          {value} <span className="text-xl text-foreground/60">{unit}</span>
        </div>
        <p className="text-xs text-foreground/50">Прокрутите или перетащите</p>
      </div>
    </div>
  );
}

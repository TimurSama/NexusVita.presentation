import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export function StatCounter({ value, label, suffix = '', delay = 0 }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 50;
      const interval = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= value) {
            clearInterval(interval);
            return value;
          }
          return next;
        });
      }, 30);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {Math.round(count)}{suffix}
      </div>
      <div className="text-sm text-foreground/60">{label}</div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface InfoIndicatorProps {
  onClick: () => void;
  className?: string;
}

export function InfoIndicator({ onClick, className = '' }: InfoIndicatorProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`w-6 h-6 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors ${className}`}
      aria-label="Подробнее"
    >
      <Info className="w-4 h-4 text-primary" />
    </motion.button>
  );
}

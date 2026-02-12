import { motion } from 'framer-motion';

interface SketchIconProps {
  icon: 'medicine' | 'nutrition' | 'movement' | 'psychology' | 'sleep' | 'relationships' | 'spirituality' | 
        'systematization' | 'economic' | 'roadmap' | 'investment' | 'ai' | 'tokenomics' | 'dna' | 'chart' | 
        'network' | 'monitor' | 'link' | 'scale' | 'brain' | 'heart' | 'users' | 'zap' | 'trending';
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const iconPaths: Record<SketchIconProps['icon'], string> = {
  medicine: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z M12 8v4 M12 16h.01',
  nutrition: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z M12 6v6 M12 16h.01',
  movement: 'M5 12h14 M12 5l7 7-7 7',
  psychology: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  sleep: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  relationships: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  spirituality: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  systematization: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5 M12 2v20',
  economic: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  roadmap: 'M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  investment: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  ai: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  tokenomics: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  dna: 'M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l1.42 1.42A6.5 6.5 0 0 0 9.5 3 6.5 6.5 0 0 0 3 9.5c0 1.61.59 3.09 1.56 4.23l-1.42 1.42A6.5 6.5 0 0 1 9.5 3z M14.5 21A6.5 6.5 0 0 1 8 14.5c0-1.61.59-3.09 1.56-4.23l-1.42-1.42A6.5 6.5 0 0 0 14.5 21a6.5 6.5 0 0 0 6.5-6.5c0-1.61-.59-3.09-1.56-4.23l1.42-1.42A6.5 6.5 0 0 1 14.5 21z',
  chart: 'M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3',
  network: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  monitor: 'M5 12h14 M12 5v14 M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z',
  link: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  scale: 'M3 6h18 M3 12h18 M3 18h18',
  brain: 'M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2.5 22l4.54-2.06A2.5 2.5 0 0 1 9.5 20.5v-16z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44L21.5 22l-4.54-2.06A2.5 2.5 0 0 0 14.5 20.5v-16z',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  trending: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
};

export default function SketchIcon({ 
  icon, 
  className = '', 
  size = 24, 
  strokeWidth = 1.5 
}: SketchIconProps) {
  const path = iconPaths[icon];
  if (!path) return null;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`sketch-icon ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
      }}
    >
      <motion.path
        d={path}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { InfoIndicator } from './InfoIndicator';

interface InteractiveCardProps {
  children: ReactNode;
  onInfoClick: () => void;
  className?: string;
  showInfo?: boolean;
}

export function InteractiveCard({
  children,
  onInfoClick,
  className = '',
  showInfo = true,
}: InteractiveCardProps) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      {showInfo && (
        <div className="absolute top-4 right-4 z-10">
          <InfoIndicator onClick={onInfoClick} />
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { InDevelopmentPopup } from './InDevelopmentPopup';
import { Construction } from 'lucide-react';

interface FeatureButtonProps {
  label: string;
  featureName: string;
  description?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  icon?: React.ReactNode;
}

export function FeatureButton({
  label,
  featureName,
  description,
  variant = 'outline',
  size = 'default',
  className = '',
  icon,
}: FeatureButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        onClick={() => setIsOpen(true)}
      >
        {icon || <Construction className="h-4 w-4" />}
        {label}
      </Button>
      <InDevelopmentPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        featureName={featureName}
        description={description || `Функция "${featureName}" находится в разработке и скоро будет доступна.`}
      />
    </>
  );
}

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Construction, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface InDevelopmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  description?: string;
}

export function InDevelopmentPopup({
  isOpen,
  onClose,
  featureName = 'Эта функция',
  description = 'Мы активно работаем над этой функцией. Она скоро появится!',
}: InDevelopmentPopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5 text-foreground/60" />
            </button>

            <div className="flex flex-col items-center text-center gap-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="relative"
              >
                <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                  <Construction className="w-12 h-12 text-primary" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-6 h-6 text-primary/60" />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {featureName} в разработке
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {description}
                </p>
                <p className="text-sm text-foreground/50">
                  Мы работаем над этим и скоро добавим эту функцию в приложение.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="w-full space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  />
                </div>
                <p className="text-xs text-foreground/50">Прогресс разработки: ~65%</p>
              </div>

              {/* Button */}
              <Button onClick={onClose} className="w-full">
                Понятно
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

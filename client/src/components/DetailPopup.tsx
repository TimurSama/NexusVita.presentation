import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface PopupContent {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  sections?: {
    title: string;
    content: string | React.ReactNode;
  }[];
  visualizations?: React.ReactNode;
  relatedLinks?: { label: string; path: string }[];
}

interface DetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: PopupContent | null;
}

export function DetailPopup({ isOpen, onClose, content }: DetailPopupProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
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

  if (!content) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] z-50 bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex-1 pr-4">
                <h2 className="text-3xl font-bold text-foreground mb-2">{content.title}</h2>
                {content.subtitle && (
                  <p className="text-foreground/60 text-lg">{content.subtitle}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-xl hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Main Description */}
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                  {content.description}
                </p>
              </div>

              {/* Sections */}
              {content.sections && content.sections.length > 0 && (
                <div className="space-y-6 mb-6">
                  {content.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="premium-card p-6"
                    >
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {section.title}
                      </h3>
                      <div className="text-foreground/70">
                        {typeof section.content === 'string' ? (
                          <p className="leading-relaxed">{section.content}</p>
                        ) : (
                          section.content
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Visualizations */}
              {content.visualizations && (
                <div className="mb-6">
                  {content.visualizations}
                </div>
              )}

              {/* Related Links */}
              {content.relatedLinks && content.relatedLinks.length > 0 && (
                <div className="border-t border-border/50 pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Связанные разделы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {content.relatedLinks.map((link, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => {
                          window.location.href = link.path;
                          onClose();
                        }}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Activity,
  Apple,
  Brain,
  Moon,
  Users,
  Leaf,
  Map,
  FileText,
  MessageSquare,
  Presentation,
} from 'lucide-react';
import SketchIcon from './SketchIcon';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
  const [location] = useLocation();

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

  // Prevent body scroll when menu is open
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

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
    { path: '/calendar', icon: Calendar, label: 'Календарь' },
    { path: '/profile', icon: User, label: 'Профиль' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
  ];

  const healthModules = [
    { path: '/medicine', icon: 'medicine', label: 'Медицина' },
    { path: '/movement', icon: 'movement', label: 'Движение' },
    { path: '/nutrition', icon: 'nutrition', label: 'Питание' },
    { path: '/psychology', icon: 'psychology', label: 'Психология' },
    { path: '/sleep', icon: 'sleep', label: 'Сон' },
    { path: '/relationships', icon: 'relationships', label: 'Отношения' },
    { path: '/habits', icon: 'chart', label: 'Привычки' },
    { path: '/environment', icon: 'monitor', label: 'Среда' },
  ];

  const otherPages = [
    { path: '/presentation', icon: Presentation, label: 'Презентация' },
    { path: '/whitepaper', icon: FileText, label: 'Whitepaper' },
    { path: '/journal', icon: FileText, label: 'Ежедневник' },
    { path: '/ai-chat', icon: MessageSquare, label: 'ИИ+ Чат' },
    { path: '/interactive-demo', icon: FileText, label: 'Интерактивные элементы' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border z-50 overflow-y-auto"
            onTouchStart={(e) => {
              // Swipe to close
              const touch = e.touches[0];
              const startX = touch.clientX;
              
              const handleTouchMove = (e: TouchEvent) => {
                const currentX = e.touches[0].clientX;
                if (currentX < startX - 100) {
                  onClose();
                  document.removeEventListener('touchmove', handleTouchMove);
                }
              };
              
              document.addEventListener('touchmove', handleTouchMove);
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <SketchIcon icon="dna" size={32} className="text-primary" />
                <div>
                  <h2 className="text-xl font-bold text-foreground">EthosLife</h2>
                  <p className="text-xs text-foreground/60">Экосистема здоровья</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3 px-3">
                  Основное
                </h3>
                {mainNavItems.map((item) => {
                  const isActive = location === item.path;
                  const Icon = item.icon;

                  return (
                    <Link key={item.path} href={item.path}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer mb-1 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Health Modules */}
              <div>
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3 px-3">
                  Модули здоровья
                </h3>
                {healthModules.map((item) => {
                  const isActive = location.startsWith(item.path);

                  return (
                    <Link key={item.path} href={item.path}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer mb-1 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <SketchIcon icon={item.icon as any} size={20} className="flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Other Pages */}
              <div>
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider mb-3 px-3">
                  Дополнительно
                </h3>
                {otherPages.map((item) => {
                  const isActive = location.startsWith(item.path);
                  const Icon = item.icon;

                  return (
                    <Link key={item.path} href={item.path}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer mb-1 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

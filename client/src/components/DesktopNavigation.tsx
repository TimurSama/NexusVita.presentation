import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Home, LayoutDashboard, Calendar, User, Settings,
  Activity, Heart, Apple, Brain, Moon, Users, Leaf, Map
} from 'lucide-react';
import SketchIcon from './SketchIcon';

const mainNavItems = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { path: '/calendar', icon: Calendar, label: 'Календарь' },
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

export function DesktopNavigation() {
  const [location] = useLocation();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-card/95 backdrop-blur-xl border-r border-border/50 z-40 flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <SketchIcon icon="dna" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">EthosLife</h1>
              <p className="text-xs text-foreground/60">Экосистема здоровья</p>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="mb-6">
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
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border/50">
        <Link href="/profile">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Профиль</p>
              <p className="text-xs text-foreground/60 truncate">Настройки</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </aside>
  );
}

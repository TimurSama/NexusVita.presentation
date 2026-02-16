import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Newspaper, LayoutDashboard, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Newspaper, label: 'Новости' },
  { path: '/health-center', icon: LayoutDashboard, label: 'Центр' },
  { path: '/account', icon: User, label: 'Аккаунт' },
];

export function MobileNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-card/95 backdrop-blur-xl border-t border-border/50">
        <div className="container">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = location === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} href={item.path}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 relative z-10 ${
                        isActive ? 'scale-110' : ''
                      } transition-transform`}
                    />
                    <span
                      className={`text-xs font-medium relative z-10 ${
                        isActive ? 'font-semibold' : ''
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

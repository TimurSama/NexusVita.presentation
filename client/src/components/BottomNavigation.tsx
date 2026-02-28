import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  Heart, 
  Bot, 
  Target, 
  Sparkles,
  Wallet,
  User,
  Settings,
  FileText,
  Map,
  Users,
  Newspaper,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavSection {
  title: string;
  items: {
    path: string;
    icon: React.ElementType;
    label: string;
    badge?: string;
  }[];
}

export function BottomNavigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useI18n();

  const navSections: NavSection[] = [
    {
      title: t('nav.home'),
      items: [
        { path: '/', icon: Home, label: t('nav.home') },
        { path: '/landing', icon: Sparkles, label: 'Landing V1' },
        { path: '/v2', icon: Sparkles, label: 'Landing V2' },
        { path: '/newstyle', icon: Sparkles, label: 'New Style' },
      ],
    },
    {
      title: t('nav.health'),
      items: [
        { path: '/health-center', icon: Heart, label: t('nav.health') },
        { path: '/health/movement', icon: Heart, label: t('health.modules.movement') },
        { path: '/health/nutrition', icon: Heart, label: t('health.modules.nutrition') },
        { path: '/health/sleep', icon: Heart, label: t('health.modules.sleep') },
        { path: '/health/psychology', icon: Heart, label: t('health.modules.psychology') },
        { path: '/health/medicine', icon: Heart, label: t('health.modules.medicine') },
        { path: '/health/relationships', icon: Heart, label: t('health.modules.relationships') },
        { path: '/health/habits', icon: Heart, label: t('health.modules.habits') },
      ],
    },
    {
      title: 'Platform',
      items: [
        { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
        { path: '/ai-chat', icon: Bot, label: t('nav.aiChat') },
        { path: '/wallet', icon: Wallet, label: t('nav.wallet') },
        { path: '/specialists', icon: Users, label: t('nav.specialists') },
        { path: '/map', icon: Map, label: t('nav.map') },
        { path: '/news', icon: Newspaper, label: t('nav.news') },
      ],
    },
    {
      title: 'Investment',
      items: [
        { path: '/roadmap', icon: Target, label: t('nav.roadmap') },
        { path: '/tokenomics', icon: Wallet, label: t('nav.tokenomics') },
        { path: '/whitepaper', icon: FileText, label: t('nav.whitepaper') },
        { path: '/pricing', icon: Sparkles, label: t('nav.pricing') },
      ],
    },
    {
      title: 'Account',
      items: [
        { path: '/account', icon: User, label: t('nav.profile') },
        { path: '/settings', icon: Settings, label: t('nav.settings') },
      ],
    },
  ];

  // Quick nav items for bottom bar
  const quickNavItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/health-center', icon: Heart, label: t('nav.health') },
    { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/ai-chat', icon: Bot, label: t('nav.aiChat') },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-around h-16">
            {/* Burger Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
              <span className="text-xs font-medium">{t('nav.menu')}</span>
            </motion.button>

            {/* Quick Nav Items */}
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link key={item.path} href={item.path}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                      active
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Menu Panel - Slide from bottom on mobile, from left on desktop */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-0 md:w-[400px] md:right-auto bg-white z-50 overflow-hidden flex flex-col rounded-t-3xl md:rounded-none"
            >
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg">EthosLife</h1>
                      <p className="text-xs text-white/80">
                        {isAuthenticated ? user?.name || user?.email : 'Guest'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pb-20">
                {navSections.map((section) => (
                  <div key={section.title} className="border-b last:border-0">
                    <div className="px-4 py-2 bg-gray-50">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                          <Link key={item.path} href={item.path}>
                            <button
                              onClick={() => setIsMenuOpen(false)}
                              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                                active
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-gray-400'}`} />
                              <span className="flex-1 text-left font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-gray-300'}`} />
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('nav.register')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed bottom nav */}
      <div className="h-16" />
    </>
  );
}

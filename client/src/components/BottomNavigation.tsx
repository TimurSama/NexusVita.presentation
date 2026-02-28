import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Heart, 
  LayoutDashboard, 
  Bot, 
  Target, 
  Wallet,
  User,
  Settings,
  FileText,
  Map,
  Users,
  Newspaper,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export function BottomNavigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useI18n();

  const isActive = (path: string) => location === path;

  const mainNavItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/health-center', icon: Heart, label: t('nav.health') },
    { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/ai-chat', icon: Bot, label: t('nav.aiChat') },
  ];

  const menuSections = [
    {
      title: t('nav.home'),
      items: [
        { path: '/', label: t('nav.home') },
        { path: '/landing', label: 'Landing' },
        { path: '/v2', label: 'Landing V2' },
        { path: '/presentation', label: 'Presentation' },
      ],
    },
    {
      title: t('health.title'),
      items: [
        { path: '/health-center', label: t('nav.health') },
        { path: '/health/movement', label: t('health.modules.movement') },
        { path: '/health/nutrition', label: t('health.modules.nutrition') },
        { path: '/health/sleep', label: t('health.modules.sleep') },
        { path: '/health/psychology', label: t('health.modules.psychology') },
        { path: '/health/medicine', label: t('health.modules.medicine') },
      ],
    },
    {
      title: 'Platform',
      items: [
        { path: '/wallet', label: t('nav.wallet') },
        { path: '/specialists', label: t('nav.specialists') },
        { path: '/map', label: t('nav.map') },
        { path: '/news', label: t('nav.news') },
      ],
    },
    {
      title: 'Info',
      items: [
        { path: '/roadmap', label: t('nav.roadmap') },
        { path: '/tokenomics', label: t('nav.tokenomics') },
        { path: '/whitepaper', label: t('nav.whitepaper') },
        { path: '/pricing', label: t('nav.pricing') },
      ],
    },
  ];

  return (
    <>
      {/* Bottom Navigation Bar - Compact */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link key={item.path} href={item.path}>
                <button
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-colors ${
                    active ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''} transition-transform`} />
                </button>
              </Link>
            );
          })}
          
          {/* Menu Button - Icon only */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-white rounded-t-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold">Menu</span>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                  {menuSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <Link key={item.path} href={item.path}>
                            <button
                              onClick={() => setIsMenuOpen(false)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive(item.path)
                                  ? 'bg-emerald-50 text-emerald-700 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {item.label}
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium truncate max-w-[150px]">
                        {user?.name || user?.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-1 text-red-600 text-sm px-3 py-2 rounded-lg hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="sm">
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

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Heart, 
  LayoutDashboard, 
  Bot, 
  Menu,
  X,
  LogOut,
  User,
  Wallet,
  Settings,
  Target,
  FileText,
  Sparkles,
  Map,
  Users,
  Newspaper,
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
    { path: '/', icon: Home },
    { path: '/health-center', icon: Heart },
    { path: '/dashboard', icon: LayoutDashboard },
    { path: '/ai-chat', icon: Bot },
  ];

  const menuSections = [
    {
      title: 'Main',
      items: [
        { path: '/', label: 'Home' },
        { path: '/landing', label: 'Landing' },
        { path: '/presentation', label: 'Presentation' },
      ],
    },
    {
      title: 'Health',
      items: [
        { path: '/health-center', label: 'Health Center' },
        { path: '/health/movement', label: 'Movement' },
        { path: '/health/nutrition', label: 'Nutrition' },
        { path: '/health/sleep', label: 'Sleep' },
        { path: '/health/psychology', label: 'Psychology' },
        { path: '/health/medicine', label: 'Medicine' },
        { path: '/health/relationships', label: 'Relationships' },
        { path: '/health/habits', label: 'Habits' },
      ],
    },
    {
      title: 'Platform',
      items: [
        { path: '/wallet', label: 'Wallet' },
        { path: '/specialists', label: 'Specialists' },
        { path: '/map', label: 'Map' },
        { path: '/news', label: 'News' },
      ],
    },
    {
      title: 'Info',
      items: [
        { path: '/roadmap', label: 'Roadmap' },
        { path: '/tokenomics', label: 'Tokenomics' },
        { path: '/whitepaper', label: 'Whitepaper' },
        { path: '/pricing', label: 'Pricing' },
      ],
    },
  ];

  return (
    <>
      {/* Bottom Navigation - Menu on LEFT */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
        <div className="flex items-center h-12">
          {/* Menu button - LEFT */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-12 h-12 text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200" />

          {/* Main nav items */}
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link key={item.path} href={item.path}>
                <button
                  className={`flex items-center justify-center w-12 h-12 transition-colors ${
                    active ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                </button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Menu Overlay */}
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <span className="font-bold">Menu</span>
                <div className="flex items-center gap-1">
                  <LanguageSwitcher />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="p-2">
                {menuSections.map((section) => (
                  <div key={section.title} className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase px-2 mb-1">
                      {section.title}
                    </h3>
                    {section.items.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full text-left px-2 py-1.5 text-sm rounded ${
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
                ))}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-2 border-t bg-gray-50">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-2 text-red-600 text-sm hover:bg-red-50 rounded"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" className="w-full" size="sm" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="sm" onClick={() => setIsMenuOpen(false)}>
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-12" />
    </>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SketchIcon from './SketchIcon';
import { BurgerMenu } from './BurgerMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Burger Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-muted transition-colors md:hidden"
              aria-label="Открыть меню"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.button>

            {/* Desktop Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">Меню</span>
            </motion.button>

            {/* Logo - Centered */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <SketchIcon icon="heart" size={32} className="text-primary" />
                <div className="hidden sm:block">
                  <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                    EthosLife
                  </h1>
                  <p className="text-xs text-foreground/60 hidden md:block">
                    Здоровая жизнь - это привычка
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Right side - placeholder for future actions */}
            <div className="w-10 md:w-20" />
          </div>
        </div>
      </header>

      {/* Burger Menu */}
      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

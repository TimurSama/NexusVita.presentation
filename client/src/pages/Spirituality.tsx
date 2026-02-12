import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Spirituality() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">🕉️ Духовность</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sketch-panel p-8 bg-gradient-to-br from-amber-500/10 to-amber-600/5"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Модуль духовности</h2>
            <p className="text-foreground/70 mb-6">
              Смысл жизни, личностное развитие и духовный рост.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">Основные функции</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Оценка смысла жизни</li>
                  <li>• Программы личностного развития</li>
                  <li>• Практики медитации и рефлексии</li>
                  <li>• Поддержка духовного роста</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

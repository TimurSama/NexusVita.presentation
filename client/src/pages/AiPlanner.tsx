import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function AiPlanner() {
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
          <h1 className="text-2xl font-bold text-foreground">🤖 AI-Планировщик</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sketch-panel p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">AI-Планировщик здоровья</h2>
            <p className="text-foreground/70 mb-6">
              6-этапный алгоритм персонализации с 1000+ рекомендациями для каждого пользователя.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">6 Этапов алгоритма</h3>
                <ol className="space-y-2 text-foreground/70">
                  <li>1. Сбор данных о здоровье</li>
                  <li>2. Анализ и диагностика</li>
                  <li>3. Определение приоритетов</li>
                  <li>4. Генерация персональных рекомендаций</li>
                  <li>5. Создание плана действий</li>
                  <li>6. Отслеживание и адаптация</li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

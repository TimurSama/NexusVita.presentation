import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function AIPlanner() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

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
          <h1 className="text-2xl font-bold text-foreground">AI-Планировщик</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'algorithm', 'features', 'examples'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Обзор'}
                {tab === 'algorithm' && 'Алгоритм'}
                {tab === 'features' && 'Возможности'}
                {tab === 'examples' && 'Примеры'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-3xl font-bold text-foreground mb-4">AI-Планировщик NexusVita</h2>
                <p className="text-foreground/70 mb-6">
                  Персональный AI-ассистент, который создаёт недельные и месячные планы здоровья на основе данных из всех 5 комплексов системы.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">180+</h3>
                    <p className="text-foreground/70">параметров анализа</p>
                  </div>
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">1000+</h3>
                    <p className="text-foreground/70">возможных рекомендаций</p>
                  </div>
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">98%</h3>
                    <p className="text-foreground/70">точность прогнозов</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'algorithm' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Алгоритм планирования</h2>
              
              <div className="space-y-4">
                {[
                  {
                    step: '1. Сбор данных',
                    desc: 'Анализ 180+ параметров из всех 5 комплексов здоровья'
                  },
                  {
                    step: '2. Выявление взаимосвязей',
                    desc: 'Определение корреляций между показателями'
                  },
                  {
                    step: '3. Прогнозирование',
                    desc: 'Предсказание эффекта от различных интервенций'
                  },
                  {
                    step: '4. Оптимизация',
                    desc: 'Выбор оптимальной комбинации рекомендаций'
                  },
                  {
                    step: '5. Персонализация',
                    desc: 'Адаптация плана под предпочтения и ограничения'
                  },
                  {
                    step: '6. Мониторинг',
                    desc: 'Отслеживание прогресса и корректировка плана'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <h3 className="font-bold text-foreground mb-2">{item.step}</h3>
                    <p className="text-foreground/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'features' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Ключевые возможности</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Недельные планы',
                    desc: 'Детальные планы на каждый день недели'
                  },
                  {
                    title: 'Месячные планы',
                    desc: 'Долгосрочные стратегии достижения целей'
                  },
                  {
                    title: 'Адаптивность',
                    desc: 'Автоматическая корректировка по прогрессу'
                  },
                  {
                    title: 'Интеграция',
                    desc: 'Синхронизация с календарём и wearables'
                  },
                  {
                    title: 'Рекомендации',
                    desc: '1000+ персональных рекомендаций'
                  },
                  {
                    title: 'Аналитика',
                    desc: 'Детальные отчёты о прогрессе'
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'examples' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Примеры планов</h2>
              
              <div className="space-y-6">
                {[
                  {
                    scenario: 'Сценарий 1: Подготовка к марафону',
                    plan: 'Интенсивные тренировки + восстановление + питание + психологическая подготовка'
                  },
                  {
                    scenario: 'Сценарий 2: Восстановление после болезни',
                    plan: 'Щадящие упражнения + медикаментозная поддержка + питание + психологическая реабилитация'
                  },
                  {
                    scenario: 'Сценарий 3: Управление стрессом',
                    plan: 'Медитация + физическая активность + социальная поддержка + когнитивные тренировки'
                  },
                  {
                    scenario: 'Сценарий 4: Улучшение когнитивных функций',
                    plan: 'Тренировка памяти + качественный сон + питание для мозга + социальное взаимодействие'
                  },
                ].map((example, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <h3 className="font-bold text-foreground mb-2">{example.scenario}</h3>
                    <p className="text-sm text-foreground/70">{example.plan}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function CognitiveHealth() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Когнитивное здоровье</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'assessment', 'training', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Обзор'}
                {tab === 'assessment' && 'Тестирование'}
                {tab === 'training' && 'Тренировка'}
                {tab === 'research' && 'Исследования'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Когнитивное здоровье</h2>
                <p className="text-foreground/70 mb-6">
                  Когнитивное здоровье включает концентрацию внимания, память, скорость обработки информации и стратегическое мышление. Это ключевой компонент продуктивности и качества жизни.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Концентрация', icon: '🎯', desc: 'Способность к фокусировке' },
                    { title: 'Память', icon: '🧠', desc: 'Краткосрочная и долгосрочная' },
                    { title: 'Скорость обработки', icon: '⚡', desc: 'Реакция и анализ' },
                    { title: 'Стратегическое мышление', icon: '♟️', desc: 'Планирование и анализ' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'assessment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Когнитивное тестирование</h2>
                
                <div className="space-y-6">
                  {[
                    { title: 'Тест внимания', desc: 'Оцените вашу способность к концентрации' },
                    { title: 'Тест памяти', desc: 'Проверьте краткосрочную и долгосрочную память' },
                    { title: 'Тест скорости реакции', desc: 'Измерьте время реакции' },
                    { title: 'Тест логического мышления', desc: 'Решите логические головоломки' },
                  ].map((test, idx) => (
                    <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                      <h3 className="font-bold text-foreground mb-2">{test.title}</h3>
                      <p className="text-sm text-foreground/70">{test.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'training' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Программы тренировки</h2>
              {[
                { title: 'Brain Training', count: '200+ упражнений' },
                { title: 'Скоростное чтение', count: '15 курсов' },
                { title: 'Мнемоника', count: '20 техник' },
                { title: 'Стратегические игры', count: '50+ игр' },
              ].map((program, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-primary font-semibold">{program.count}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Последние исследования</h2>
              {[
                { title: 'Нейропластичность и обучение', date: '2026-02-10' },
                { title: 'Влияние сна на память', date: '2026-02-08' },
                { title: 'Когнитивный резерв и долголетие', date: '2026-02-05' },
              ].map((research, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-foreground mb-2">{research.title}</h3>
                  <p className="text-sm text-foreground/60">{research.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

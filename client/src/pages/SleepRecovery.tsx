import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SleepRecovery() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Сон и восстановление</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'tracking', 'recovery', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Обзор'}
                {tab === 'tracking' && 'Мониторинг'}
                {tab === 'recovery' && 'Восстановление'}
                {tab === 'research' && 'Исследования'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Сон и восстановление</h2>
                <p className="text-foreground/70 mb-6">
                  Сон — это критический компонент здоровья, влияющий на метаболизм, иммунную систему, когнитивные функции и эмоциональное благополучие. Восстановление включает активный отдых, растяжку и регенеративные практики.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Качество сна', icon: '😴', desc: 'Глубина и непрерывность' },
                    { title: 'Продолжительность', icon: '⏱️', desc: 'Часы сна в ночь' },
                    { title: 'Циркадные ритмы', icon: '🌙', desc: 'Синхронизация с природой' },
                    { title: 'Восстановление', icon: '💪', desc: 'Активный отдых и регенерация' },
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

          {selectedTab === 'tracking' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Мониторинг сна</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Интеграция с wearables</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Apple Watch', 'Fitbit', 'Garmin', 'Oura Ring', 'Whoop', 'Samsung Galaxy'].map((device, idx) => (
                        <button key={idx} className="sketch-panel p-4 hover:ring-2 hover:ring-primary transition-all text-sm font-semibold">
                          {device}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sketch-panel p-6 bg-gradient-to-br from-primary/5 to-primary/2">
                    <h4 className="font-bold text-foreground mb-4">Ваши показатели сна</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Среднее время сна</span>
                        <span className="text-2xl font-bold text-primary">7.2 ч</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Качество сна</span>
                        <span className="text-2xl font-bold text-primary">82%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Глубокий сон</span>
                        <span className="text-2xl font-bold text-primary">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'recovery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Программы восстановления</h2>
              {[
                { title: 'Йога для восстановления', count: '50+ программ' },
                { title: 'Медитация перед сном', count: '100+ сеансов' },
                { title: 'Техники дыхания', count: '30+ упражнений' },
                { title: 'Массаж и растяжка', count: '40+ видео' },
              ].map((program, idx) => (
                <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                  <h3 className="font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-sm text-primary font-semibold">{program.count}</p>
                </button>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Последние исследования</h2>
              {[
                { title: 'Сон и метаболизм', date: '2026-02-10' },
                { title: 'Циркадные ритмы и здоровье', date: '2026-02-08' },
                { title: 'Восстановление и производительность', date: '2026-02-05' },
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

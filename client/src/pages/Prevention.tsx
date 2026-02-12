import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Prevention() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Профилактика и окружающая среда</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'environment', 'prevention', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Обзор'}
                {tab === 'environment' && 'Окружение'}
                {tab === 'prevention' && 'Профилактика'}
                {tab === 'research' && 'Исследования'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Профилактика и окружающая среда</h2>
                <p className="text-foreground/70 mb-6">
                  Окружающая среда оказывает прямое влияние на здоровье. Качество воздуха, воды, температура, загрязнение и экологические факторы интегрируются в систему для персональных рекомендаций.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Качество воздуха', icon: '💨', desc: 'PM2.5, озон, CO2' },
                    { title: 'Качество воды', icon: '💧', desc: 'Чистота и минерализация' },
                    { title: 'Температура', icon: '🌡️', desc: 'Комфортный диапазон' },
                    { title: 'Загрязнение', icon: '⚠️', desc: 'Уровень токсинов' },
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

          {selectedTab === 'environment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Мониторинг окружающей среды</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { metric: 'Качество воздуха (AQI)', value: '45', status: 'Хорошо' },
                      { metric: 'Уровень влажности', value: '55%', status: 'Оптимально' },
                      { metric: 'Температура', value: '22°C', status: 'Комфортно' },
                      { metric: 'Уровень шума', value: '55 дБ', status: 'Приемлемо' },
                    ].map((item, idx) => (
                      <div key={idx} className="sketch-panel p-4">
                        <p className="text-sm text-foreground/70 mb-2">{item.metric}</p>
                        <p className="text-2xl font-bold text-primary mb-1">{item.value}</p>
                        <p className="text-xs text-foreground/60">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'prevention' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Профилактические программы</h2>
              {[
                { title: 'Вакцинация', count: '20+ рекомендаций' },
                { title: 'Профилактические осмотры', count: '15 типов' },
                { title: 'Скрининг заболеваний', count: '30+ тестов' },
                { title: 'Диспансеризация', count: '12 программ' },
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
                { title: 'Загрязнение воздуха и здоровье', date: '2026-02-10' },
                { title: 'Экологические факторы и долголетие', date: '2026-02-08' },
                { title: 'Качество воды и иммунитет', date: '2026-02-05' },
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

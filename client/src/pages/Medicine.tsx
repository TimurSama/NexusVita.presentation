import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useLocation } from 'wouter';

interface Popup {
  type: string;
  title: string;
  content: string;
  details?: string[];
}

export default function Medicine() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [activePopup, setActivePopup] = useState<Popup | null>(null);

  const medicineCategories = [
    {
      id: 'analysis',
      title: 'Анализы и диагностика',
      icon: '🔬',
      description: 'Лабораторные исследования и инструментальная диагностика'
    },
    {
      id: 'treatment',
      title: 'Лечение',
      icon: '💊',
      description: 'Медикаментозное лечение и терапевтические протоколы'
    },
    {
      id: 'recovery',
      title: 'Восстановление',
      icon: '🏥',
      description: 'Реабилитационные программы и восстановительные процедуры'
    },
    {
      id: 'prevention',
      title: 'Профилактика',
      icon: '🛡️',
      description: 'Профилактические меры и скрининги'
    },
  ];

  const showPopup = (popup: Popup) => {
    setActivePopup(popup);
  };

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
          <h1 className="text-2xl font-bold text-foreground">Медицина</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'assessment', 'infrastructure', 'research'].map(tab => (
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
                {tab === 'assessment' && 'Диагностика'}
                {tab === 'infrastructure' && 'Инфраструктура'}
                {tab === 'research' && 'Исследования'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Медицина: Фундамент диагностики и лечения</h2>
                <p className="text-foreground/70 mb-6">
                  Медицинский модуль интегрирует лабораторную диагностику, клинические исследования, назначение лечения и мониторинг восстановления в единую систему управления здоровьем.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {medicineCategories.map(category => (
                    <div
                      key={category.id}
                      onClick={() => showPopup({
                        type: 'category',
                        title: category.title,
                        content: category.description
                      })}
                      className="sketch-panel p-6 cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary transition-all"
                    >
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="font-bold text-foreground mb-2">{category.title}</h3>
                      <p className="text-sm text-foreground/70">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'assessment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Интерактивная медицинская диагностика</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Хронические заболевания</h3>
                    <div className="sketch-panel p-6 bg-background space-y-3">
                      {['Диабет', 'Гипертензия', 'Сердечные заболевания', 'Астма', 'Артрит'].map((condition, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-foreground/70">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-4">Текущие препараты</h3>
                    <div className="sketch-panel p-6 bg-background">
                      <textarea
                        placeholder="Перечислите принимаемые препараты"
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                      />
                    </div>
                  </div>

                  <button className="btn-sketch bg-primary text-white w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Завершить диагностику
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'infrastructure' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Подключение медицинской инфраструктуры</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Клиники', icon: '🏥', count: '2,500+' },
                  { title: 'Лаборатории', icon: '🔬', count: '1,200+' },
                  { title: 'Врачи-специалисты', icon: '👨‍⚕️', count: '15,000+' },
                  { title: 'Интеграции с системами', icon: '🔗', count: '50+' },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-2xl font-bold text-primary">{item.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Последние медицинские исследования</h2>
              {[
                { title: 'Новые маркеры воспаления и долголетия', date: '2026-02-10', source: 'Nature Medicine' },
                { title: 'Персонализированная медицина и генетика', date: '2026-02-08', source: 'The Lancet' },
                { title: 'Профилактика сердечно-сосудистых заболеваний', date: '2026-02-05', source: 'JAMA Cardiology' },
              ].map((research, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                  <h3 className="font-bold text-foreground mb-2">{research.title}</h3>
                  <p className="text-sm text-foreground/60">{research.source} • {research.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {activePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="sketch-panel bg-background rounded-2xl max-w-2xl w-full">
            <div className="bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">{activePopup.title}</h3>
              <button
                onClick={() => setActivePopup(null)}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-foreground/70">{activePopup.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

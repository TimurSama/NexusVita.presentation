import { useState } from 'react';
import { ChevronLeft, Activity, TrendingUp } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PhysicalHealth() {
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
          <h1 className="text-2xl font-bold text-foreground">Физическое здоровье</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setSelectedTab('assessment')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'assessment'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Диагностика
            </button>
            <button
              onClick={() => setSelectedTab('research')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'research'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Исследования
            </button>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Фундамент системной устойчивости организма</h2>
                <p className="text-foreground/70 mb-6">
                  Физическое здоровье — это основа, на которой строится вся система благополучия человека. Оно включает в себя комплексный анализ метаболизма, гормонального фона, качества сна, уровня физической активности и восстановления.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Антропометрия', desc: 'Рост, вес, тип телосложения' },
                    { title: 'Метаболизм', desc: 'Базовый метаболический уровень' },
                    { title: 'Сон', desc: 'Качество и продолжительность сна' },
                    { title: 'Активность', desc: 'Виды и интенсивность тренировок' },
                    { title: 'Восстановление', desc: 'Время восстановления и адаптация' },
                    { title: 'Питание', desc: 'Калорийность и макронутриенты' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Системные взаимосвязи</h3>
                <p className="text-foreground/70 mb-4">
                  Все показатели физического здоровья влияют друг на друга через нейроэндокринную систему:
                </p>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Качество сна напрямую влияет на гормональный фон и метаболизм</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Физическая активность улучшает качество сна и восстановления</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Питание обеспечивает энергию для тренировок и восстановления</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Стресс снижает эффективность восстановления и гормональный баланс</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Assessment Tab */}
          {selectedTab === 'assessment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Интерактивная диагностика</h2>
                
                <div className="space-y-8">
                  {/* Age */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Возраст</h3>
                    <p className="text-sm text-foreground/70 mb-4">Выберите год рождения (интерактивное колесо-календарь)</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="number" placeholder="Год рождения" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" />
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Рост (см)</h3>
                    <p className="text-sm text-foreground/70 mb-4">Потяните вверх для увеличения (интерактивная рулетка)</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="range" min="140" max="220" defaultValue="175" className="w-full" />
                      <p className="text-center mt-4 text-lg font-bold text-primary">175 см</p>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Вес (кг)</h3>
                    <p className="text-sm text-foreground/70 mb-4">Добавьте "блины" на штангу (интерактивный тренажёр)</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="range" min="40" max="150" defaultValue="75" className="w-full" />
                      <p className="text-center mt-4 text-lg font-bold text-primary">75 кг</p>
                    </div>
                  </div>

                  {/* Body Type */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Тип телосложения</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Эктоморф', 'Мезоморф', 'Эндоморф'].map((type, idx) => (
                        <button key={idx} className="sketch-panel p-4 hover:ring-2 hover:ring-primary transition-all">
                          <p className="font-semibold text-foreground">{type}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Текущая физическая активность</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-foreground/70 mb-2">Виды активности (выберите несколько)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {['Силовые', 'Кардио', 'Йога', 'HIIT', 'Плавание', 'Ходьба', 'Спорт', 'Растяжка'].map((activity, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm text-foreground/70">{activity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-foreground/70 mb-2">Частота (раз в неделю)</label>
                        <input type="range" min="0" max="7" defaultValue="3" className="w-full" />
                      </div>
                    </div>
                  </div>

                  <button className="btn-sketch bg-primary text-white w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Завершить диагностику
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Research Tab */}
          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Последние исследования</h2>
              {[
                { title: 'Новые протоколы восстановления', date: '2026-02-10' },
                { title: 'Нейрофизиология тренировок высокой интенсивности', date: '2026-02-08' },
                { title: 'Метаболизм и циркадные ритмы', date: '2026-02-05' },
                { title: 'Инновации в мониторинге сна', date: '2026-02-01' },
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

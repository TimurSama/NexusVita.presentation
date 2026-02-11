import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface SystemComplex {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  elements: string[];
  connection: string;
  marketSize?: string;
}

export default function Systematization() {
  const [selectedComplex, setSelectedComplex] = useState<string | null>(null);
  const [mode, setMode] = useState<'user' | 'investor'>('user');

  const complexes: SystemComplex[] = [
    {
      id: 'biological',
      name: 'Биологический комплекс',
      emoji: '🧬',
      color: 'from-primary/20 to-primary/5',
      description: 'Фундамент системной устойчивости организма',
      elements: ['Метаболизм', 'Гормональный фон', 'Сон', 'Питание', 'Физическая активность', 'Восстановление'],
      connection: 'Все показатели влияют друг на друга через нейроэндокринную систему',
      marketSize: '$150B глобально',
    },
    {
      id: 'psycho',
      name: 'Психоэмоциональный комплекс',
      emoji: '🧠',
      color: 'from-secondary/20 to-secondary/5',
      description: 'Стресс-реакции, эмоциональная устойчивость и мотивация',
      elements: ['Стресс-реакции', 'Тревожность', 'Мотивация', 'Эмоциональная устойчивость', 'Когнитивная нагрузка'],
      connection: 'Хронический стресс снижает эффективность физического восстановления и гормональный баланс',
      marketSize: '$80B глобально',
    },
    {
      id: 'cognitive',
      name: 'Когнитивный комплекс',
      emoji: '🎯',
      color: 'from-primary/20 to-primary/5',
      description: 'Концентрация, память и стратегическое мышление',
      elements: ['Концентрация', 'Обучаемость', 'Память', 'Стратегическое мышление'],
      connection: 'Питание + сон + уровень стресса = производительность мозга',
      marketSize: '$60B глобально',
    },
    {
      id: 'social',
      name: 'Социальный комплекс',
      emoji: '👥',
      color: 'from-secondary/20 to-secondary/5',
      description: 'Окружение, поддержка и участие в сообществе',
      elements: ['Окружение', 'Уровень поддержки', 'Цифровое взаимодействие', 'Участие в сообществах', 'Групповая динамика'],
      connection: 'Социальная среда напрямую влияет на устойчивость привычек и психоэмоциональное благополучие',
      marketSize: '$40B глобально',
    },
    {
      id: 'infrastructure',
      name: 'Инфраструктурный комплекс',
      emoji: '🏥',
      color: 'from-primary/20 to-primary/5',
      description: 'Специалисты, клиники и инновационные решения',
      elements: ['Специалисты', 'Клиники', 'Магазины', 'Лаборатории', 'Исследования', 'Разработчики инноваций'],
      connection: 'NexusVita становится соединительным слоем между всеми участниками экосистемы',
      marketSize: '$200B+ глобально',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Принцип систематизации</h1>
              <p className="text-sm text-foreground/60 mt-1">Здоровье фрагментировано. Мы объединяем 5 комплексов в одну экосистему</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('user')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-card text-foreground hover:bg-card/80'
                }`}
              >
                Обзор
              </button>
              <button
                onClick={() => setMode('investor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'investor'
                    ? 'bg-primary text-white'
                    : 'bg-card text-foreground hover:bg-card/80'
                }`}
              >
                Рынок
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Problem Statement */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Почему необходима систематизация?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Фитнес отдельно',
                'Психология отдельно',
                'Питание отдельно',
                'Диагностика отдельно',
                'Сообщество отдельно',
                'Исследования отдельно',
                'Социальная среда отдельно',
              ].map((item, idx) => (
                <div key={idx} className="sketch-panel p-4">
                  <p className="text-foreground/70 flex items-center gap-2">
                    <span className="text-primary font-bold">✗</span>
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-foreground/70 mt-8 text-lg">
              Человек получает фрагменты, но не систему.
            </p>
          </div>
        </section>

        {/* Orbital Visualization */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">5 системных комплексов</h2>

            {/* SVG Orbital Diagram */}
            <div className="relative w-full aspect-square max-w-2xl mx-auto mb-12">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Orbital rings */}
                <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(168, 144, 128, 0.1)" strokeWidth="2" />
                <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(168, 144, 128, 0.08)" strokeWidth="2" />
                <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(168, 144, 128, 0.06)" strokeWidth="2" />

                {/* Center human */}
                <circle cx="200" cy="200" r="25" fill="rgba(255, 138, 101, 0.2)" stroke="rgba(255, 138, 101, 0.5)" strokeWidth="2" />
                <text x="200" y="210" textAnchor="middle" className="text-sm font-bold fill-primary">
                  👤
                </text>

                {/* Orbital elements */}
                {complexes.map((complex, idx) => {
                  const angle = (idx * 72) - 90; // 72 degrees apart (360/5)
                  const radius = 130;
                  const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <g key={complex.id}>
                      {/* Orbital line */}
                      <line
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke="rgba(168, 144, 128, 0.15)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                      {/* Element circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill={selectedComplex === complex.id ? 'rgba(255, 138, 101, 0.3)' : 'rgba(255, 138, 101, 0.1)'}
                        stroke={selectedComplex === complex.id ? 'rgba(255, 138, 101, 0.8)' : 'rgba(255, 138, 101, 0.3)'}
                        strokeWidth="2"
                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onClick={() => setSelectedComplex(selectedComplex === complex.id ? null : complex.id)}
                      />
                      <text
                        x={x}
                        y={y + 8}
                        textAnchor="middle"
                        className="text-lg"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedComplex(selectedComplex === complex.id ? null : complex.id)}
                      >
                        {complex.emoji}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="text-center text-sm text-foreground/60 mt-4">
                <p>Нажмите на элемент для подробной информации</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="space-y-4">
              {complexes.map(complex => (
                <div
                  key={complex.id}
                  className={`sketch-panel overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                    selectedComplex === complex.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedComplex(selectedComplex === complex.id ? null : complex.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{complex.emoji}</span>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{complex.name}</h3>
                          <p className="text-sm text-foreground/60">{complex.description}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-6 h-6 text-foreground/40 transition-transform ${
                          selectedComplex === complex.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>

                    {selectedComplex === complex.id && (
                      <div className="border-t border-border pt-6 space-y-4 animate-fade-in-up">
                        {/* Elements */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Компоненты:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {complex.elements.map((element, idx) => (
                              <div key={idx} className="bg-background rounded-lg p-2 text-sm text-foreground/70">
                                • {element}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Connection */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Взаимосвязь:</h4>
                          <p className="text-foreground/70 text-sm italic">{complex.connection}</p>
                        </div>

                        {/* Market Size for Investor Mode */}
                        {mode === 'investor' && complex.marketSize && (
                          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
                            <h4 className="font-semibold text-foreground mb-1">Размер рынка:</h4>
                            <p className="text-lg font-bold text-primary">{complex.marketSize}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System Integration */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Системная интеграция</h2>
            <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <p className="text-foreground/80 mb-4">
                NexusVita объединяет все 5 комплексов в единую цифровую архитектуру, где:
              </p>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Данные из одного комплекса информируют рекомендации в других</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Алгоритмы учитывают взаимозависимости между системами</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Специалисты видят полную картину здоровья пользователя</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">→</span>
                  <span>Инфраструктура партнёров интегрируется в единую экосистему</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Готовы исследовать свою систему?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Начните персональную диагностику и откройте новые инсайты о взаимосвязях в вашем здоровье.
          </p>
          <button className="btn-sketch bg-primary text-white">
            Начать диагностику
          </button>
        </section>
      </main>
    </div>
  );
}

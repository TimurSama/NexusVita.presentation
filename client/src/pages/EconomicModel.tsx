import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useLocation } from 'wouter';

export default function EconomicModel() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedRoadmap, setExpandedRoadmap] = useState<string | null>(null);

  const revenueStreams = [
    {
      id: 'subscription',
      title: 'Подписка пользователей',
      icon: '👤',
      revenue: '$450M',
      description: 'Персональные планы: базовый ($5/мес), премиум ($15/мес), VIP ($50/мес)',
      metrics: ['5M активных пользователей', 'ARPU: $12/месяц', 'Retention: 85%']
    },
    {
      id: 'partners',
      title: 'Комиссии от партнёров',
      icon: '🤝',
      revenue: '$320M',
      description: 'Комиссия 15-25% от продаж через маркетплейс',
      metrics: ['2,500+ партнёров', 'GMV: $2.1B', 'Take rate: 18%']
    },
    {
      id: 'marketplace',
      title: 'Маркетплейс и сервисы',
      icon: '🛍️',
      revenue: '$280M',
      description: 'Продажа товаров, услуг, консультаций',
      metrics: ['50,000+ SKU', 'Средний чек: $45', 'Конверсия: 3.2%']
    },
    {
      id: 'b2b',
      title: 'B2B и корпоративные',
      icon: '🏢',
      revenue: '$150M',
      description: 'Лицензирование для компаний и медучреждений',
      metrics: ['500+ корпоративных клиентов', 'Средний контракт: $300K', 'Retention: 92%']
    },
  ];

  const roadmap = [
    {
      phase: 'Phase 1: MVP (2026 Q1-Q2)',
      investment: '$2M',
      goals: [
        'Запуск 7 модулей здоровья',
        'Интеграция 100+ партнёров',
        'Первые 100K пользователей',
        'AI-планировщик базовой версии'
      ]
    },
    {
      phase: 'Phase 2: Масштабирование (2026 Q3-Q4)',
      investment: '$8M',
      goals: [
        'Расширение до 1M пользователей',
        'Интеграция 500+ партнёров',
        'Запуск токеномики и DAO',
        'Мобильное приложение iOS/Android'
      ]
    },
    {
      phase: 'Phase 3: Глобальная экспансия (2027)',
      investment: '$20M',
      goals: [
        'Выход на 10 стран',
        'Локализация контента',
        'Интеграция с национальными системами здравоохранения',
        'Партнёрства с крупными компаниями'
      ]
    },
    {
      phase: 'Phase 4: Финансирование (2027-2028)',
      investment: '$50M+',
      goals: [
        'Достижение 50M пользователей',
        'Профитабельность',
        'IPO подготовка',
        'Расширение в смежные области'
      ]
    },
  ];

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
          <h1 className="text-2xl font-bold text-foreground">Экономическая модель</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'revenue', 'roadmap', 'metrics'].map(tab => (
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
                {tab === 'revenue' && 'Доходы'}
                {tab === 'roadmap' && 'Дорожная карта'}
                {tab === 'metrics' && 'Метрики'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-3xl font-bold text-foreground mb-4">Экономическая модель NexusVita</h2>
                <p className="text-foreground/70 mb-6">
                  NexusVita использует многоканальную модель монетизации, сочетающую подписки пользователей, комиссии от партнёров, маркетплейс и B2B лицензирование.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">$1.2B</h3>
                    <p className="text-foreground/70">Прогнозируемый годовой доход к 2027 году</p>
                  </div>
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">$80M</h3>
                    <p className="text-foreground/70">Требуемые инвестиции на 3 года</p>
                  </div>
                </div>
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Ключевые показатели юнит-экономики</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { metric: 'CAC (Customer Acquisition Cost)', value: '$8', desc: 'Стоимость привлечения пользователя' },
                    { metric: 'LTV (Lifetime Value)', value: '$240', desc: 'Пожизненная стоимость пользователя' },
                    { metric: 'Payback Period', value: '2 месяца', desc: 'Период окупаемости' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <p className="text-sm text-foreground/70 mb-2">{item.metric}</p>
                      <p className="text-2xl font-bold text-primary mb-1">{item.value}</p>
                      <p className="text-xs text-foreground/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'revenue' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">4 источника дохода</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {revenueStreams.map(stream => (
                  <div key={stream.id} className="sketch-panel p-6">
                    <div className="text-4xl mb-4">{stream.icon}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{stream.title}</h3>
                    <p className="text-lg font-bold text-primary mb-4">{stream.revenue}</p>
                    <p className="text-sm text-foreground/70 mb-4">{stream.description}</p>
                    <div className="space-y-2">
                      {stream.metrics.map((metric, idx) => (
                        <p key={idx} className="text-xs text-foreground/60">• {metric}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Прогноз доходов</h3>
                <div className="space-y-4">
                  {[
                    { year: '2026', revenue: '$200M', users: '1M' },
                    { year: '2027', revenue: '$600M', users: '5M' },
                    { year: '2028', revenue: '$1.2B', users: '15M' },
                  ].map((forecast, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-foreground">{forecast.year}</span>
                        <span className="text-lg font-bold text-primary">{forecast.revenue}</span>
                      </div>
                      <p className="text-sm text-foreground/70">{forecast.users} активных пользователей</p>
                      <div className="w-full bg-background rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: idx === 0 ? '16%' : idx === 1 ? '50%' : '100%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'roadmap' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Дорожная карта развития</h2>
              {roadmap.map((phase, idx) => (
                <div
                  key={idx}
                  onClick={() => setExpandedRoadmap(expandedRoadmap === phase.phase ? null : phase.phase)}
                  className="sketch-panel p-6 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{phase.phase}</h3>
                      <p className="text-primary font-bold">{phase.investment}</p>
                    </div>
                    <div className={`transform transition-transform ${expandedRoadmap === phase.phase ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>
                  
                  {expandedRoadmap === phase.phase && (
                    <div className="border-t border-border pt-4 mt-4">
                      <h4 className="font-bold text-foreground mb-3">Цели:</h4>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, gidx) => (
                          <li key={gidx} className="flex items-start gap-2 text-foreground/70">
                            <span className="text-primary font-bold mt-1">→</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'metrics' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Ключевые метрики</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { metric: 'DAU (Daily Active Users)', value: '500K', growth: '+45% YoY' },
                  { metric: 'MAU (Monthly Active Users)', value: '2.5M', growth: '+60% YoY' },
                  { metric: 'Churn Rate', value: '15%', growth: '-5% YoY' },
                  { metric: 'Net Revenue Retention', value: '125%', growth: '+10% YoY' },
                  { metric: 'Customer Satisfaction (NPS)', value: '72', growth: '+8 pts' },
                  { metric: 'Partner Satisfaction', value: '8.5/10', growth: '+1.2 pts' },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <p className="text-sm text-foreground/70 mb-2">{item.metric}</p>
                    <p className="text-3xl font-bold text-primary mb-2">{item.value}</p>
                    <p className="text-sm text-foreground/60">{item.growth}</p>
                  </div>
                ))}
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Финансовые прогнозы</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Gross Margin', value: '72%' },
                    { metric: 'Operating Margin (2028)', value: '25%' },
                    { metric: 'EBITDA Margin (2028)', value: '30%' },
                    { metric: 'Payback Period', value: '18 месяцев' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 sketch-panel">
                      <span className="font-semibold text-foreground">{item.metric}</span>
                      <span className="text-lg font-bold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react';

interface RevenueStream {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  color: string;
}

export default function EconomicModel() {
  const [expandedStream, setExpandedStream] = useState<string | null>('subscription');

  const revenueStreams: RevenueStream[] = [
    {
      id: 'subscription',
      title: 'Подписочная модель (SaaS)',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Основной источник дохода от пользователей',
      details: [
        'Basic: $19–29/мес (базовый доступ, персональный план, базовая аналитика)',
        'Pro: $49–79/мес (углублённая диагностика, интеграции с носимыми устройствами, расширенная аналитика)',
        'Premium: $149–299/мес (куратор, приоритетные партнёры, индивидуальные консультации)',
      ],
      color: 'from-primary/10 to-primary/5',
    },
    {
      id: 'partnership',
      title: 'Партнёрская инфраструктура',
      icon: <Users className="w-6 h-6" />,
      description: 'Комиссия с интегрированных партнёров',
      details: [
        'Клиники и лаборатории: 15–20% комиссии',
        'Специалисты (нутрициологи, тренеры): 20–25%',
        'Фитнес-клубы и wellness-центры: 10–15%',
        'Бренды БАДов и оборудования: 25–35%',
      ],
      color: 'from-secondary/10 to-secondary/5',
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: <Zap className="w-6 h-6" />,
      description: 'Продажа протоколов, курсов и программ',
      details: [
        'Протоколы и курсы: 30–50% комиссия',
        'AI-программы адаптивного планирования: 40–60%',
        'Корпоративные пакеты: 25–35%',
        'Тематические программы (сон, антистресс, выгорание): 35–45%',
      ],
      color: 'from-primary/10 to-primary/5',
    },
    {
      id: 'corporate',
      title: 'B2B / Corporate Wellness',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Лицензирование для корпоративного сектора',
      details: [
        'Стандартная лицензия: $10K–50K/год',
        'Премиум лицензия: $50K–150K/год',
        'Включает: HR-интеграции, отчётность, программы для топ-менеджеров',
        'Масштабируется с количеством сотрудников',
      ],
      color: 'from-secondary/10 to-secondary/5',
    },
  ];

  const metrics = [
    { label: 'CAC (Customer Acquisition Cost)', value: '$20–50', description: 'В зависимости от рынка' },
    { label: 'LTV (Lifetime Value)', value: '$500–2000', description: 'За 2–3 года' },
    { label: 'Retention Rate', value: '70–80%', description: 'Ежемесячная удержание' },
    { label: 'Gross Margin', value: '75–85%', description: 'После прямых затрат' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <h1 className="text-2xl font-bold text-foreground">Экономическая модель</h1>
          <p className="text-sm text-foreground/60 mt-1">Многоуровневая архитектура монетизации</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Overview */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Стратегическая модель дохода</h2>
            <p className="text-foreground/70 mb-8">
              NexusVita — это не один источник дохода, а многоуровневая экосистема монетизации, которая создаёт множественные точки соприкосновения с пользователями, партнёрами и корпоративными клиентами.
            </p>

            {/* Revenue Streams */}
            <div className="space-y-4">
              {revenueStreams.map(stream => (
                <div
                  key={stream.id}
                  className="sketch-panel overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg"
                  onClick={() => setExpandedStream(expandedStream === stream.id ? null : stream.id)}
                >
                  <div className={`p-6 bg-gradient-to-r ${stream.color}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-primary mt-1">{stream.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{stream.title}</h3>
                          <p className="text-sm text-foreground/60 mt-1">{stream.description}</p>
                        </div>
                      </div>
                      <button className="text-foreground/40 hover:text-foreground transition-colors">
                        {expandedStream === stream.id ? '−' : '+'}
                      </button>
                    </div>

                    {expandedStream === stream.id && (
                      <div className="mt-6 pt-6 border-t border-border/30 space-y-3 animate-fade-in-up">
                        {stream.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span className="text-foreground/70">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unit Economics */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Юнит-экономика</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                  <p className="text-sm text-foreground/60 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                  <p className="text-sm text-foreground/70">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Projections */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Прогнозы роста</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  year: 'Год 1',
                  users: '10K',
                  mrr: '$150K',
                  description: 'Запуск, ранние адаптеры, первые партнёры',
                },
                {
                  year: 'Год 2',
                  users: '100K',
                  mrr: '$1.5M',
                  description: 'Масштабирование, расширение партнёрской сети',
                },
                {
                  year: 'Год 3',
                  users: '500K',
                  mrr: '$6M+',
                  description: 'Корпоративный сегмент, международное расширение',
                },
              ].map((projection, idx) => (
                <div key={idx} className="sketch-panel p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h4 className="text-lg font-bold text-foreground mb-4">{projection.year}</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Пользователи</p>
                      <p className="text-2xl font-bold text-primary">{projection.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">MRR</p>
                      <p className="text-2xl font-bold text-secondary">{projection.mrr}</p>
                    </div>
                    <p className="text-sm text-foreground/70 pt-2 border-t border-border/30">
                      {projection.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Advantages */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Ключевые преимущества</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Множественные источники дохода',
                  description: 'Не зависим от одного канала монетизации, что снижает риск',
                },
                {
                  title: 'Сетевые эффекты',
                  description: 'Каждый новый партнёр привлекает больше пользователей, каждый пользователь привлекает партнёров',
                },
                {
                  title: 'Высокая маржинальность',
                  description: 'Цифровой продукт с минимальными переменными затратами',
                },
                {
                  title: 'Долгосрочная ценность',
                  description: 'Подписочная модель обеспечивает предсказуемый повторяющийся доход',
                },
                {
                  title: 'B2B потенциал',
                  description: 'Корпоративный сегмент открывает новые масштабы роста',
                },
                {
                  title: 'Данные как актив',
                  description: 'Обезличенная аналитика может быть ценна для исследований и страховых моделей',
                },
              ].map((advantage, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-foreground mb-2">{advantage.title}</h4>
                  <p className="text-sm text-foreground/70">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Инвестируйте в будущее здоровья</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            NexusVita предлагает уникальную возможность участвовать в трансформации индустрии здоровья и благополучия.
          </p>
          <button className="btn-sketch bg-primary text-white">
            Связаться с инвесторским отделом
          </button>
        </section>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, TrendingUp, Target, Zap, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function InvestmentProposal() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  const fundingRounds = [
    {
      name: 'Ангельский раунд',
      amount: '$100-250K',
      equity: '10-15%',
      valuation: '$800K-1.5M',
      timeline: 'Сейчас',
      use: {
        product: '60%',
        design: '15%',
        marketing: '10%',
        operations: '15%'
      },
      metrics: {
        users: '500-1K',
        retention: '40%+',
        partners: '5-10',
        arr: '$0-50K'
      },
      description: 'Создание рабочего прототипа с 2-3 модулями и подтверждение ключевых гипотез'
    },
    {
      name: 'Пре-сид раунд',
      amount: '$150-350K',
      equity: '8-12%',
      valuation: '$1.5M-3M',
      timeline: '6 месяцев',
      use: {
        product: '50%',
        marketing: '25%',
        partnerships: '15%',
        operations: '10%'
      },
      metrics: {
        users: '5-10K',
        paying: '500-2K',
        retention: '35%+',
        arr: '$50-150K',
        partners: '20-50'
      },
      description: 'Масштабирование до полного набора функций и запуск первых монетизационных механизмов'
    },
    {
      name: 'Сид раунд',
      amount: '$2-4M',
      equity: '15-20%',
      valuation: '$8-15M',
      timeline: '12 месяцев',
      use: {
        product: '40%',
        marketing: '30%',
        team: '20%',
        operations: '10%'
      },
      metrics: {
        users: '100K+',
        paying: '10-20K',
        retention: '30%+',
        arr: '$5-10M',
        partners: '500+',
        corporate: '20-50'
      },
      description: 'Региональное масштабирование и запуск всех 5 модулей здоровья'
    },
    {
      name: 'Серия А',
      amount: '$8-15M',
      equity: '15-20%',
      valuation: '$40-80M',
      timeline: '24 месяца',
      use: {
        product: '35%',
        marketing: '35%',
        team: '20%',
        operations: '10%'
      },
      metrics: {
        users: '500K+',
        paying: '50-100K',
        arr: '$50-100M',
        partners: '2000+',
        corporate: '100-200',
        regions: '3+'
      },
      description: 'Международное расширение на рынки США и Европы'
    },
    {
      name: 'Серия Б',
      amount: '$25-50M',
      equity: '12-18%',
      valuation: '$150-300M',
      timeline: '36 месяцев',
      use: {
        product: '30%',
        marketing: '40%',
        team: '20%',
        operations: '10%'
      },
      metrics: {
        users: '1M+',
        arr: '$150-300M',
        partners: '5000+',
        corporate: '500+',
        regions: '10+',
        developers: '1000+'
      },
      description: 'Экосистемное развитие с открытым API и white-label решениями'
    }
  ];

  const exitStrategies = [
    {
      type: 'Стратегическая продажа',
      timeline: 'После серии А/Б',
      buyers: ['Хелстек компании', 'Страховые корпорации', 'Крупные технологические компании'],
      valuation: '$200M-1B',
      probability: 'Высокая'
    },
    {
      type: 'Слияния и поглощения',
      timeline: 'На любом этапе',
      buyers: ['Дополняющие платформы', 'Медицинские сети', 'Фитнес-экосистемы'],
      valuation: 'Переменная',
      probability: 'Средняя'
    },
    {
      type: 'IPO',
      timeline: 'После достижения прибыльности',
      buyers: ['Публичные рынки'],
      valuation: '$500M-2B',
      probability: 'Средняя'
    }
  ];

  const risks = [
    {
      risk: 'Регуляторные ограничения',
      impact: 'Высокое',
      mitigation: 'Привлечение юридических экспертов, консультации с регуляторными органами'
    },
    {
      risk: 'Высокая конкуренция',
      impact: 'Высокое',
      mitigation: 'Уникальное торговое предложение системного подхода и интеграции'
    },
    {
      risk: 'Технические сложности масштабирования',
      impact: 'Среднее',
      mitigation: 'Поэтапная разработка, тестирование, опытные специалисты'
    },
    {
      risk: 'Низкое удержание пользователей',
      impact: 'Высокое',
      mitigation: 'Постоянное улучшение продукта, функции повышения вовлечённости'
    },
    {
      risk: 'Недостаток финансирования',
      impact: 'Критическое',
      mitigation: 'Резервный фонд, поэтапное привлечение инвестиций с метриками'
    }
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
          <h1 className="text-2xl font-bold text-foreground">Инвестиционное предложение</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'rounds', 'exit', 'risks'].map(tab => (
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
                {tab === 'rounds' && 'Раунды финансирования'}
                {tab === 'exit' && 'Выходы для инвестора'}
                {tab === 'risks' && 'Риски и митигация'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-3xl font-bold text-foreground mb-4">Текущая стадия и запрос</h2>
                <p className="text-foreground/70 mb-6 text-lg">
                  NexusVita находится на стадии альфа-разработки с возможностью запуска MVP в течение 6 месяцев.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="sketch-panel p-6 bg-background/50">
                    <h3 className="font-bold text-foreground mb-2">Текущий запрос</h3>
                    <p className="text-2xl font-bold text-primary mb-2">$100-250K</p>
                    <p className="text-sm text-foreground/70">Ангельский раунд</p>
                  </div>
                  <div className="sketch-panel p-6 bg-background/50">
                    <h3 className="font-bold text-foreground mb-2">Предлагаемая доля</h3>
                    <p className="text-2xl font-bold text-primary mb-2">10-15%</p>
                    <p className="text-sm text-foreground/70">При оценке $800K-1.5M</p>
                  </div>
                  <div className="sketch-panel p-6 bg-background/50">
                    <h3 className="font-bold text-foreground mb-2">Использование средств</h3>
                    <p className="text-2xl font-bold text-primary mb-2">60% Продукт</p>
                    <p className="text-sm text-foreground/70">15% Дизайн, 25% Маркетинг & Ops</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">Использование средств ангельского раунда</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Разработка', value: '60%', color: 'from-blue-500 to-blue-600' },
                      { label: 'Дизайн', value: '15%', color: 'from-purple-500 to-purple-600' },
                      { label: 'Маркетинг', value: '10%', color: 'from-green-500 to-green-600' },
                      { label: 'Операции', value: '15%', color: 'from-orange-500 to-orange-600' },
                    ].map((item, idx) => (
                      <div key={idx} className={`sketch-panel p-4 bg-gradient-to-br ${item.color}`}>
                        <p className="text-white/70 text-sm mb-2">{item.label}</p>
                        <p className="text-2xl font-bold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sketch-panel p-8 bg-gradient-to-br from-green-500/10 to-green-600/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Ключевые метрики успеха (3 месяца)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Активные пользователи', value: '500-1K' },
                    { label: 'Удержание (D30)', value: '40%+' },
                    { label: 'Партнёры', value: '5-10' },
                    { label: 'ARR', value: '$0-50K' },
                    { label: 'NPS', value: '50+' },
                    { label: 'Готовность к Пре-сид', value: '✓' },
                  ].map((metric, idx) => (
                    <div key={idx} className="sketch-panel p-4 text-center">
                      <p className="text-xs text-foreground/60 mb-2">{metric.label}</p>
                      <p className="text-lg font-bold text-primary">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Funding Rounds Tab */}
          {selectedTab === 'rounds' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {fundingRounds.map((round, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="sketch-panel p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{round.name}</h3>
                      <p className="text-sm text-foreground/70">{round.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{round.amount}</p>
                      <p className="text-xs text-foreground/60">{round.equity} equity</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 bg-background/50 rounded">
                      <p className="text-xs text-foreground/60 mb-1">Оценка</p>
                      <p className="font-bold text-foreground">{round.valuation}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded">
                      <p className="text-xs text-foreground/60 mb-1">Таймлайн</p>
                      <p className="font-bold text-foreground">{round.timeline}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded">
                      <p className="text-xs text-foreground/60 mb-1">Пользователи</p>
                      <p className="font-bold text-foreground">{round.metrics.users}</p>
                    </div>
                    <div className="p-3 bg-background/50 rounded">
                      <p className="text-xs text-foreground/60 mb-1">ARR</p>
                      <p className="font-bold text-foreground">{round.metrics.arr}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(round.use).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="w-full bg-background rounded-full h-2 mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: value }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="bg-primary h-2 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-foreground/60 capitalize">{key}</p>
                        <p className="text-sm font-bold text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Exit Strategies Tab */}
          {selectedTab === 'exit' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="sketch-panel p-8 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                <h2 className="text-2xl font-bold text-foreground mb-6">Варианты выхода для инвестора</h2>

                {exitStrategies.map((strategy, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="sketch-panel p-6 mb-4 bg-background/50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">{strategy.type}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        strategy.probability === 'Высокая' ? 'bg-green-500/20 text-green-700' :
                        strategy.probability === 'Средняя' ? 'bg-yellow-500/20 text-yellow-700' :
                        'bg-red-500/20 text-red-700'
                      }`}>
                        {strategy.probability}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-foreground/60 mb-2">Таймлайн</p>
                        <p className="font-bold text-foreground">{strategy.timeline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/60 mb-2">Потенциальная оценка</p>
                        <p className="font-bold text-primary">{strategy.valuation}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-foreground/60 mb-2">Потенциальные покупатели</p>
                      <div className="flex flex-wrap gap-2">
                        {strategy.buyers.map((buyer, bidx) => (
                          <span key={bidx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {buyer}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="sketch-panel p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                <h3 className="text-xl font-bold text-foreground mb-4">Прогнозируемые оценки компании</h3>
                <div className="space-y-3">
                  {[
                    { round: 'Сид раунд', valuation: '$8-15M' },
                    { round: 'Серия А', valuation: '$40-80M' },
                    { round: 'Серия Б', valuation: '$150-300M' },
                    { round: 'Серия С', valuation: '$500M-1B' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded">
                      <p className="font-semibold text-foreground">{item.round}</p>
                      <p className="text-lg font-bold text-primary">{item.valuation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Risks Tab */}
          {selectedTab === 'risks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {risks.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="sketch-panel p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-1 ${
                      item.impact === 'Критическое' ? 'text-red-500' :
                      item.impact === 'Высокое' ? 'text-orange-500' :
                      'text-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">{item.risk}</h3>
                      <span className={`inline-block px-3 py-1 rounded text-xs font-semibold mb-3 ${
                        item.impact === 'Критическое' ? 'bg-red-500/20 text-red-700' :
                        item.impact === 'Высокое' ? 'bg-orange-500/20 text-orange-700' :
                        'bg-yellow-500/20 text-yellow-700'
                      }`}>
                        {item.impact}
                      </span>
                      <p className="text-foreground/70">{item.mitigation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

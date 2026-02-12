import { useState } from 'react';
import { ChevronLeft, TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { AnimatedPopup } from '@/components/AnimatedPopup';

export default function EconomicModel() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const monetizationLayers = [
    {
      id: 'subscription',
      name: 'Подписочная модель',
      icon: '📱',
      revenue: '$450M',
      percentage: 38,
      description: 'Три тарифных плана для разных сегментов',
      plans: [
        { name: 'Базовый', price: '$19-29', features: ['Основные модули', 'Персональный план', 'Базовая аналитика'] },
        { name: 'Профессиональный', price: '$49-79', features: ['Углублённая диагностика', 'Wearables интеграция', 'Расширенная аналитика'] },
        { name: 'Премиум', price: '$149-299', features: ['Персональный куратор', 'Приоритетный доступ', 'Индивидуальные консультации'] },
      ]
    },
    {
      id: 'partners',
      name: 'Партнёрская инфраструктура',
      icon: '🤝',
      revenue: '$320M',
      percentage: 27,
      description: 'Комиссия 10-35% от услуг партнёров',
      partners: ['Клиники', 'Лаборатории', 'Нутрициологи', 'Тренеры', 'Фитнес-клубы', 'Велнес-центры', 'Онлайн-школы', 'БАДы']
    },
    {
      id: 'marketplace',
      name: 'Маркетплейс',
      icon: '🛍️',
      revenue: '$280M',
      percentage: 24,
      description: 'Продажа протоколов, курсов и программ',
      items: ['Протоколы здоровья', 'Онлайн-курсы', 'AI-программы', 'Корпоративные пакеты', 'Тематические программы']
    },
    {
      id: 'corporate',
      name: 'Корпоративное оздоровление',
      icon: '🏢',
      revenue: '$150M',
      percentage: 8,
      description: 'Лицензии для компаний $10K-$150K/год',
      features: ['Интеграция с HR-системами', 'Деперсонализированная отчётность', 'Программы для топ-менеджеров', 'Поддержка команды']
    },
    {
      id: 'analytics',
      name: 'Интеллектуальная аналитика',
      icon: '📊',
      revenue: '$100M',
      percentage: 8,
      description: 'Обезличенная аналитика для исследований',
      uses: ['Научные исследования', 'Страховые модели', 'Корпоративная статистика', 'Эпидемиологические данные']
    },
  ];

  const unitEconomics = [
    { metric: 'CAC (Customer Acquisition Cost)', value: '$15-60', segment: 'Массовый сегмент' },
    { metric: 'CAC', value: '$80-200', segment: 'Премиум сегмент' },
    { metric: 'Средняя подписка', value: '$39', period: 'в месяц' },
    { metric: 'Период удержания', value: '14 месяцев', note: 'средний' },
    { metric: 'Доход от подписки', value: '$546', period: 'за период' },
    { metric: 'Партнёрские комиссии', value: '$150-400', period: 'за период' },
    { metric: 'LTV (Lifetime Value)', value: '$700-950', note: 'общая' },
    { metric: 'LTV/CAC Ratio', value: '7-9x', note: 'превышает целевой 4x' },
  ];

  const growthScenarios = [
    {
      name: 'Консервативный',
      users: '50K',
      arpu: '$35',
      mrr: '$1.75M',
      arr: '$21M',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Реалистичный',
      users: '200K',
      arpu: '$42',
      mrr: '$8.4M',
      arr: '$100M+',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Агрессивный',
      users: '1M',
      arpu: '$40',
      mrr: '$40M',
      arr: '$500M+',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const expenseStructure = [
    { category: 'Backend & AI', range: '$250-400K', period: '12-18 месяцев' },
    { category: 'Frontend (Web & Mobile)', range: '$120-250K', period: '12-18 месяцев' },
    { category: 'UI/UX Design', range: '$60-120K', period: '12-18 месяцев' },
    { category: 'API Integrations', range: '$80-150K', period: '12-18 месяцев' },
    { category: 'DevOps & Security', range: '$70-150K', period: '12-18 месяцев' },
    { category: 'Total Development', range: '$580-1000K', period: 'Phase 1' },
    { category: 'Marketing Budget', range: '$500-2000K', period: 'в год' },
    { category: 'Operations (Team, Support, Servers)', range: '$70-150K', period: 'в месяц' },
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
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'monetization', 'uniteconomics', 'expenses', 'scenarios'].map(tab => (
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
                {tab === 'monetization' && '5 слоёв доходов'}
                {tab === 'uniteconomics' && 'Юнит-экономика'}
                {tab === 'expenses' && 'Расходы'}
                {tab === 'scenarios' && 'Сценарии роста'}
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
                <h2 className="text-3xl font-bold text-foreground mb-4">Многослойная модель монетизации</h2>
                <p className="text-foreground/70 mb-6 text-lg">
                  Экономическая модель NexusVita построена на пяти взаимодополняющих уровнях дохода, обеспечивающих диверсификацию и устойчивость бизнеса.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                  {monetizationLayers.map((layer, idx) => (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="sketch-panel p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="text-3xl mb-2">{layer.icon}</div>
                      <p className="font-bold text-foreground text-sm mb-2">{layer.name}</p>
                      <p className="text-lg font-bold text-primary">{layer.revenue}</p>
                      <p className="text-xs text-foreground/60">{layer.percentage}% доходов</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-background/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground/70">
                    <strong>Общий прогнозируемый доход к 2027:</strong> $1.2B
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="sketch-panel p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Диверсификация</h3>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Пять независимых источников дохода снижают риск зависимости от одного канала
                  </p>
                </div>

                <div className="sketch-panel p-6 bg-gradient-to-br from-green-500/10 to-green-600/5">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                    <h3 className="font-bold text-foreground">Масштабируемость</h3>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Каждый слой масштабируется независимо с растущей базой пользователей
                  </p>
                </div>

                <div className="sketch-panel p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Синергия</h3>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Слои усиливают друг друга: партнёры привлекают пользователей, пользователи покупают услуги
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Monetization Layers Tab */}
          {selectedTab === 'monetization' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {monetizationLayers.map((layer, idx) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="sketch-panel p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-3xl">{layer.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{layer.name}</h3>
                        <p className="text-sm text-foreground/70">{layer.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{layer.revenue}</p>
                      <p className="text-xs text-foreground/60">{layer.percentage}% модели</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-background rounded-full h-2 mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${layer.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>

                  {/* Layer-specific content */}
                  {layer.id === 'subscription' && (
                    <div className="space-y-3">
                      {layer.plans?.map((plan, pidx) => (
                        <div key={pidx} className="p-3 bg-background/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{plan.name}</h4>
                            <span className="text-primary font-bold">{plan.price}/мес</span>
                          </div>
                          <ul className="text-xs text-foreground/70 space-y-1">
                            {plan.features.map((f, fidx) => (
                              <li key={fidx}>• {f}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {layer.id === 'partners' && (
                    <div className="flex flex-wrap gap-2">
                      {layer.partners?.map((p, pidx) => (
                        <span key={pidx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}

                  {layer.id === 'marketplace' && (
                    <div className="space-y-2">
                      {layer.items?.map((item, iidx) => (
                        <div key={iidx} className="flex items-center gap-2 text-sm text-foreground/70">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {layer.id === 'corporate' && (
                    <div className="space-y-2">
                      {layer.features?.map((f, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-sm text-foreground/70">
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                          {f}
                        </div>
                      ))}
                    </div>
                  )}

                  {layer.id === 'analytics' && (
                    <div className="space-y-2">
                      {layer.uses?.map((use, uidx) => (
                        <div key={uidx} className="flex items-center gap-2 text-sm text-foreground/70">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {use}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Unit Economics Tab */}
          {selectedTab === 'uniteconomics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="sketch-panel p-8 bg-gradient-to-br from-green-500/10 to-green-600/5">
                <h2 className="text-2xl font-bold text-foreground mb-4">Юнит-экономика</h2>
                <p className="text-foreground/70 mb-6">
                  Соотношение жизненной ценности клиента к стоимости его привлечения демонстрирует здоровую экономику бизнеса.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {unitEconomics.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="sketch-panel p-4 bg-background/50"
                    >
                      <p className="text-sm text-foreground/70 mb-2">{item.metric}</p>
                      <p className="text-2xl font-bold text-primary mb-1">{item.value}</p>
                      <p className="text-xs text-foreground/60">
                        {item.segment || item.period || item.note}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded">
                  <h3 className="font-bold text-foreground mb-2">Ключевой вывод</h3>
                  <p className="text-foreground/80">
                    LTV/CAC ratio 7-9x значительно превышает целевой показатель 4x для здоровой экономики, что указывает на устойчивый и масштабируемый бизнес-модель.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Expenses Tab */}
          {selectedTab === 'expenses' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="sketch-panel p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
                <h2 className="text-2xl font-bold text-foreground mb-6">Структура расходов</h2>

                <div className="space-y-4">
                  {expenseStructure.map((expense, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="sketch-panel p-4 bg-background/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{expense.category}</h3>
                        <span className="text-primary font-bold">{expense.range}</span>
                      </div>
                      <p className="text-xs text-foreground/60">{expense.period}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Growth Scenarios Tab */}
          {selectedTab === 'scenarios' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="sketch-panel p-8 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                <h2 className="text-2xl font-bold text-foreground mb-6">Сценарии роста</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {growthScenarios.map((scenario, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`sketch-panel p-6 bg-gradient-to-br ${scenario.color}`}
                    >
                      <h3 className="text-xl font-bold text-white mb-6">{scenario.name}</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/70 text-sm">Активные пользователи</p>
                          <p className="text-2xl font-bold text-white">{scenario.users}</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-sm">ARPU (Average Revenue Per User)</p>
                          <p className="text-2xl font-bold text-white">{scenario.arpu}</p>
                        </div>
                        <div className="border-t border-white/20 pt-4">
                          <p className="text-white/70 text-sm">MRR (Monthly Recurring Revenue)</p>
                          <p className="text-2xl font-bold text-white">{scenario.mrr}</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-sm">ARR (Annual Recurring Revenue)</p>
                          <p className="text-2xl font-bold text-white">{scenario.arr}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

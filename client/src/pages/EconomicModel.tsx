import { useState } from 'react';
import { ChevronLeft, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PremiumCard } from '@/components/PremiumCard';
import { DataVisualization } from '@/components/DataVisualization';
import { StatCounter } from '@/components/StatCounter';

export default function EconomicModel() {
  const [, setLocation] = useLocation();
  const [selectedYear, setSelectedYear] = useState(2025);

  const revenueStreams = [
    {
      name: 'Подписки пользователей',
      value: 45,
      color: 'from-blue-500 to-blue-600',
      description: 'Premium подписки для личного использования',
      icon: '👤'
    },
    {
      name: 'B2B партнёрства',
      value: 30,
      color: 'from-green-500 to-green-600',
      description: 'Интеграция с корпоративными системами здоровья',
      icon: '🏢'
    },
    {
      name: 'Маркетплейс услуг',
      value: 15,
      color: 'from-purple-500 to-purple-600',
      description: 'Комиссия от партнёрских услуг',
      icon: '🛍️'
    },
    {
      name: 'Данные и аналитика',
      value: 10,
      color: 'from-orange-500 to-orange-600',
      description: 'Анонимизированные данные для исследований',
      icon: '📊'
    },
  ];

  const projections = [
    { year: 2025, revenue: 2.5, users: 0.5 },
    { year: 2026, revenue: 8.2, users: 2.1 },
    { year: 2027, revenue: 25.5, users: 6.8 },
    { year: 2028, revenue: 68.3, users: 18.5 },
    { year: 2029, revenue: 156.7, users: 42.3 },
    { year: 2030, revenue: 320.5, users: 95.6 },
  ];

  const currentProjection = projections.find(p => p.year === selectedYear);

  const unitEconomics = [
    { label: 'CAC (Cost of Acquisition)', value: 15, unit: '$' },
    { label: 'LTV (Lifetime Value)', value: 450, unit: '$' },
    { label: 'LTV/CAC Ratio', value: 30, unit: 'x' },
    { label: 'Payback Period', value: 2.5, unit: 'мес' },
  ];

  const margins = [
    { label: 'Gross Margin', value: 78, color: 'from-green-500 to-green-600' },
    { label: 'Operating Margin', value: 35, color: 'from-blue-500 to-blue-600' },
    { label: 'Net Margin', value: 22, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">💰 Экономическая модель</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 via-green-600/10 to-green-700/5 p-12 border border-border/50">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-foreground mb-4">Устойчивая модель доходов</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  Диверсифицированные источники дохода с прогнозом $320.5M к 2030 году
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCounter value={320.5} label="Прогноз доходов 2030" suffix="M$" delay={0.1} />
                  <StatCounter value={95.6} label="Пользователей 2030" suffix="M" delay={0.2} />
                  <StatCounter value={4} label="Источников дохода" delay={0.3} />
                  <StatCounter value={30} label="LTV/CAC Ratio" suffix="x" delay={0.4} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Revenue Streams */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">4 Источника дохода</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {revenueStreams.map((stream, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stream.color} p-6 text-white border border-white/10`}
                >
                  <div className="absolute top-0 right-0 text-6xl opacity-20">{stream.icon}</div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{stream.name}</h3>
                      <span className="text-2xl font-bold">{stream.value}%</span>
                    </div>
                    <p className="text-white/80 text-sm">{stream.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue Distribution Chart */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-foreground mb-6">Распределение доходов</h3>
              <DataVisualization data={revenueStreams.map(s => ({
                label: s.name,
                value: s.value,
                color: s.color
              }))} />
            </PremiumCard>
          </motion.section>

          {/* Financial Projections */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Финансовые прогнозы</h2>
            
            {/* Year Selector */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {projections.map(p => (
                <button
                  key={p.year}
                  onClick={() => setSelectedYear(p.year)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedYear === p.year
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary'
                  }`}
                >
                  {p.year}
                </button>
              ))}
            </div>

            {/* Projection Details */}
            {currentProjection && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedYear}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              >
                <PremiumCard gradient="from-blue-500/10 to-blue-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Прогнозируемый доход</p>
                    <p className="text-5xl font-bold text-primary mb-2">${currentProjection.revenue}M</p>
                    <p className="text-xs text-foreground/60">В год {selectedYear}</p>
                  </div>
                </PremiumCard>

                <PremiumCard gradient="from-green-500/10 to-green-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Прогнозируемые пользователи</p>
                    <p className="text-5xl font-bold text-green-500 mb-2">{currentProjection.users}M</p>
                    <p className="text-xs text-foreground/60">Активных пользователей</p>
                  </div>
                </PremiumCard>
              </motion.div>
            )}

            {/* Projection Chart */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-foreground mb-6">Рост доходов и пользователей</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Доход (M$)</p>
                  <DataVisualization data={projections.map(p => ({
                    label: p.year.toString(),
                    value: Math.min(100, (p.revenue / 320.5) * 100),
                    color: 'from-blue-500 to-blue-600'
                  }))} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Пользователи (M)</p>
                  <DataVisualization data={projections.map(p => ({
                    label: p.year.toString(),
                    value: Math.min(100, (p.users / 95.6) * 100),
                    color: 'from-green-500 to-green-600'
                  }))} />
                </div>
              </div>
            </PremiumCard>
          </motion.section>

          {/* Unit Economics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Юнит-экономика</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unitEconomics.map((item, idx) => (
                <PremiumCard key={idx} delay={idx * 0.1}>
                  <p className="text-sm text-foreground/60 mb-2">{item.label}</p>
                  <p className="text-4xl font-bold text-primary mb-1">
                    {item.value}{item.unit}
                  </p>
                  <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (item.value / 500) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/50"
                    />
                  </div>
                </PremiumCard>
              ))}
            </div>
          </motion.section>

          {/* Margins */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Маржинальность</h2>
            <PremiumCard>
              <DataVisualization data={margins.map(m => ({
                label: m.label,
                value: m.value,
                color: m.color
              }))} />
            </PremiumCard>
          </motion.section>

          {/* Key Metrics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Ключевые метрики</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'MRR Growth', value: '15%', icon: '📈' },
                { label: 'Churn Rate', value: '2.5%', icon: '📉' },
                { label: 'CAC Payback', value: '2.5 мес', icon: '⏱️' },
              ].map((metric, idx) => (
                <PremiumCard key={idx} delay={idx * 0.1}>
                  <div className="text-center">
                    <span className="text-4xl mb-3 block">{metric.icon}</span>
                    <p className="text-sm text-foreground/60 mb-2">{metric.label}</p>
                    <p className="text-3xl font-bold text-primary">{metric.value}</p>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

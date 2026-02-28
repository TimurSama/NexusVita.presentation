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
      name: 'Subscriptions (SaaS)',
      value: 11,
      amount: 0.7,
      unit: 'M$',
      color: 'from-blue-500 to-blue-600',
      description: 'Basic ($11/month), Premium ($33/month), Corporate ($1,100/month)',
      icon: '👤',
      details: {
        basic: { price: 11, users: 2500, mrr: 0.027 },
        premium: { price: 33, users: 1000, mrr: 0.033 },
        corporate: { price: 1100, companies: 10, mrr: 0.011 }
      }
    },
    {
      name: 'Partner Commissions',
      value: 66,
      amount: 4.3,
      unit: 'M$',
      color: 'from-green-500 to-green-600',
      description: 'Medical clinics (15%), Fitness centers (10%), Nutrition (5%)',
      icon: '🏢',
      details: {
        clinics: { commission: 15, count: 50, revenue: 1.47 },
        fitness: { commission: 10, count: 100, revenue: 0.91 },
        nutrition: { commission: 5, count: 200, revenue: 1.96 }
      }
    },
    {
      name: 'Data Sales',
      value: 7,
      amount: 0.43,
      unit: 'M$',
      color: 'from-purple-500 to-purple-600',
      description: 'Anonymized data for research and pharmaceutical companies',
      icon: '📊',
      details: {
        research: { price: 0.054, count: 4, revenue: 0.22 },
        pharma: { price: 0.109, count: 2, revenue: 0.22 }
      }
    },
    {
      name: 'Advertising and Sponsorship',
      value: 17,
      amount: 1.09,
      unit: 'M$',
      color: 'from-orange-500 to-orange-600',
      description: 'In-app advertising (CPM $5.4) and content sponsorship',
      icon: '📢',
      details: {
        ads: { cpm: 5.4, impressions: 10, revenue: 0.65 },
        sponsorship: { sponsors: 20, price: 0.022, revenue: 0.44 }
      }
    },
  ];

  const projections = [
    { 
      year: 2025, 
      revenue: 6.6, 
      users: 0.2, 
      expenses: 1.33,
      profit: 5.27,
      margin: 79.7,
      subscriptions: 0.7,
      commissions: 4.3,
      data: 0.43,
      ads: 1.09
    },
    { 
      year: 2026, 
      revenue: 19.6, 
      users: 1.0, 
      expenses: 4.35,
      profit: 15.25,
      margin: 77.8,
      subscriptions: 2.17,
      commissions: 13.04,
      data: 1.63,
      ads: 2.72
    },
    { 
      year: 2027, 
      revenue: 98.0, 
      users: 5.0, 
      expenses: 21.74,
      profit: 76.26,
      margin: 77.8,
      subscriptions: 10.87,
      commissions: 65.22,
      data: 8.15,
      ads: 13.04
    },
    { 
      year: 2028, 
      revenue: 272.0, 
      users: 15.0, 
      expenses: 65.22,
      profit: 206.78,
      margin: 76.0,
      subscriptions: 32.61,
      commissions: 173.91,
      data: 27.17,
      ads: 38.04
    },
    { 
      year: 2029, 
      revenue: 653.0, 
      users: 35.0, 
      expenses: 163.04,
      profit: 489.96,
      margin: 75.0,
      subscriptions: 86.96,
      commissions: 434.78,
      data: 65.22,
      ads: 65.22
    },
    { 
      year: 2030, 
      revenue: 980.0, 
      users: 50.0, 
      expenses: 217.39,
      profit: 762.61,
      margin: 77.8,
      subscriptions: 130.43,
      commissions: 652.17,
      data: 97.83,
      ads: 97.83
    },
  ];

  const currentProjection = projections.find(p => p.year === selectedYear) || projections[0];

  const unitEconomics = [
    { label: 'CAC (Cost of Acquisition)', value: 15, unit: '$' },
    { label: 'LTV (Lifetime Value)', value: 450, unit: '$' },
    { label: 'LTV/CAC Ratio', value: 30, unit: 'x' },
    { label: 'Payback Period', value: 2.5, unit: 'mo' },
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
            Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">💰 Economic Model</h1>
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
                <h2 className="text-4xl font-bold text-foreground mb-4">Sustainable Revenue Model</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  Diversified revenue streams: $6.6M in year 1, projected $980M by 2030
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCounter value={6.6} label="Year 1 Revenue" suffix="M$" delay={0.1} />
                  <StatCounter value={5.27} label="Year 1 Profit" suffix="M$" delay={0.2} />
                  <StatCounter value={79.7} label="Margin" suffix="%" delay={0.3} />
                  <StatCounter value={4} label="Revenue Streams" delay={0.4} />
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
            <h2 className="text-3xl font-bold text-foreground mb-8">4 Revenue Streams (Year 1)</h2>
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
                      <div className="text-right">
                        <span className="text-2xl font-bold block">{stream.amount} {stream.unit}</span>
                        <span className="text-sm opacity-80">{stream.value}%</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mb-3">{stream.description}</p>
                    {stream.details && (
                      <div className="mt-3 pt-3 border-t border-white/20 text-xs space-y-1">
                        {stream.details.clinics && (
                          <div>Clinics: {stream.details.clinics.count} × {stream.details.clinics.commission}% = ${stream.details.clinics.revenue}M</div>
                        )}
                        {stream.details.fitness && (
                          <div>Fitness: {stream.details.fitness.count} × {stream.details.fitness.commission}% = ${stream.details.fitness.revenue}M</div>
                        )}
                        {stream.details.basic && (
                          <div>Basic: {stream.details.basic.users} × ${stream.details.basic.price} = ${stream.details.basic.mrr}M/mo</div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Revenue Distribution Chart */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-foreground mb-6">Revenue Distribution</h3>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Financial Projections</h2>
            
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
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
              >
                <PremiumCard gradient="from-blue-500/10 to-blue-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Revenue</p>
                    <p className="text-3xl font-bold text-primary mb-1">${currentProjection.revenue}M</p>
                    <p className="text-xs text-foreground/60">Year {selectedYear}</p>
                  </div>
                </PremiumCard>

                <PremiumCard gradient="from-green-500/10 to-green-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Users</p>
                    <p className="text-3xl font-bold text-green-500 mb-1">{currentProjection.users}M</p>
                    <p className="text-xs text-foreground/60">Active</p>
                  </div>
                </PremiumCard>

                <PremiumCard gradient="from-purple-500/10 to-purple-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Profit</p>
                    <p className="text-3xl font-bold text-purple-500 mb-1">${currentProjection.profit}M</p>
                    <p className="text-xs text-foreground/60">{currentProjection.margin}% margin</p>
                  </div>
                </PremiumCard>

                <PremiumCard gradient="from-orange-500/10 to-orange-600/5">
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Expenses</p>
                    <p className="text-3xl font-bold text-orange-500 mb-1">${currentProjection.expenses}M</p>
                    <p className="text-xs text-foreground/60">Operational</p>
                  </div>
                </PremiumCard>
              </motion.div>
            )}

            {/* Projection Chart */}
            <PremiumCard>
              <h3 className="text-xl font-bold text-foreground mb-6">Revenue and User Growth</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Revenue (M$)</p>
                  <DataVisualization data={projections.map(p => ({
                    label: p.year.toString(),
                    value: Math.min(100, (p.revenue / 980) * 100),
                    color: 'from-blue-500 to-blue-600'
                  }))} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Users (M)</p>
                  <DataVisualization data={projections.map(p => ({
                    label: p.year.toString(),
                    value: Math.min(100, (p.users / 50) * 100),
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Unit Economics</h2>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Margins</h2>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'MRR Growth', value: '15%', icon: '📈' },
                { label: 'Churn Rate', value: '2.5%', icon: '📉' },
                { label: 'CAC Payback', value: '2.5 mo', icon: '⏱️' },
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

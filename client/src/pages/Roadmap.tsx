import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';

export default function Roadmap() {
  const [, setLocation] = useLocation();

  const phases = [
    {
      phase: 1,
      name: 'MVP & Фундамент',
      period: 'Q1-Q2 2025',
      investment: '$500K',
      goals: [
        'Запуск MVP с 3 модулями здоровья',
        '10,000 первых пользователей',
        'Интеграция с 50 партнёрскими клиниками',
        'Базовая AI-диагностика'
      ],
      metrics: [
        { label: 'DAU', value: '5K' },
        { label: 'Retention', value: '45%' },
        { label: 'NPS', value: '42' }
      ],
      color: 'from-blue-500 to-blue-600',
      icon: '🚀'
    },
    {
      phase: 2,
      name: 'Расширение',
      period: 'Q3-Q4 2025',
      investment: '$1.5M',
      goals: [
        'Добавить 4 новых модуля здоровья',
        '100,000 активных пользователей',
        'Интеграция с 200 клиниками',
        'Маркетплейс услуг'
      ],
      metrics: [
        { label: 'DAU', value: '45K' },
        { label: 'Retention', value: '52%' },
        { label: 'NPS', value: '58' }
      ],
      color: 'from-purple-500 to-purple-600',
      icon: '📈'
    },
    {
      phase: 3,
      name: 'Масштабирование',
      period: 'H1 2026',
      investment: '$5M',
      goals: [
        'Полная экосистема 7 модулей',
        '1 миллион пользователей',
        'Интеграция с 1000 партнёров',
        'Расширение на новые рынки'
      ],
      metrics: [
        { label: 'DAU', value: '350K' },
        { label: 'Retention', value: '58%' },
        { label: 'NPS', value: '68' }
      ],
      color: 'from-green-500 to-green-600',
      icon: '🌍'
    },
    {
      phase: 4,
      name: 'Глобализация',
      period: 'H2 2026-2027',
      investment: '$15M',
      goals: [
        'Запуск в 15 странах',
        '10 миллионов пользователей',
        'Интеграция с 5000 партнёров',
        'Локализация контента'
      ],
      metrics: [
        { label: 'DAU', value: '2.5M' },
        { label: 'Retention', value: '62%' },
        { label: 'NPS', value: '72' }
      ],
      color: 'from-orange-500 to-orange-600',
      icon: '🗺️'
    },
    {
      phase: 5,
      name: 'Лидерство',
      period: '2028-2030',
      investment: '$50M',
      goals: [
        'Выход на IPO',
        '100 миллионов пользователей',
        'Глобальный лидер в health-tech',
        'Расширение в смежные рынки'
      ],
      metrics: [
        { label: 'DAU', value: '25M' },
        { label: 'Retention', value: '65%' },
        { label: 'NPS', value: '75' }
      ],
      color: 'from-pink-500 to-pink-600',
      icon: '👑'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

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
          <h1 className="text-2xl font-bold text-foreground">🗺️ Дорожная карта</h1>
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 via-indigo-600/10 to-indigo-700/5 p-12 border border-border/50">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-foreground mb-4">5-летний план развития</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  От MVP к глобальному лидеру в экосистеме здоровья
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <StatCounter value={71.5} label="Инвестиции" suffix="M$" delay={0.1} />
                  <StatCounter value={100} label="Миллионов пользователей" delay={0.2} />
                  <StatCounter value={5} label="Фаз развития" delay={0.3} />
                  <StatCounter value={5000} label="Партнёров" suffix="+" delay={0.4} />
                  <StatCounter value={2030} label="Год IPO" delay={0.5} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12"
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary to-transparent opacity-20" />

              {/* Phases */}
              <div className="space-y-12">
                {phases.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className={`flex gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-lg relative z-10"
                    >
                      {phase.phase}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${phase.color} p-6 text-white border border-white/10`}
                      >
                        <div className="absolute top-0 right-0 text-6xl opacity-20">{phase.icon}</div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-1">{phase.name}</h3>
                              <p className="text-white/80 text-sm">{phase.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/70 mb-1">Инвестиции</p>
                              <p className="text-2xl font-bold">{phase.investment}</p>
                            </div>
                          </div>

                          <div className="mb-6 pb-6 border-b border-white/20">
                            <h4 className="text-sm font-semibold mb-3 text-white/90">Цели:</h4>
                            <ul className="space-y-2">
                              {phase.goals.map((goal, gidx) => (
                                <li key={gidx} className="text-sm text-white/80 flex items-start gap-2">
                                  <span className="text-lg leading-none">✓</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold mb-3 text-white/90">Ключевые метрики:</h4>
                            <div className="grid grid-cols-3 gap-4">
                              {phase.metrics.map((metric, midx) => (
                                <div key={midx} className="text-center">
                                  <p className="text-xs text-white/70 mb-1">{metric.label}</p>
                                  <p className="text-xl font-bold">{metric.value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Milestones */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Ключевые вехи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  date: 'Q2 2025',
                  event: 'Запуск MVP',
                  description: 'Первая версия платформы с 3 модулями здоровья'
                },
                {
                  date: 'Q4 2025',
                  event: 'Серия A',
                  description: 'Привлечение $2M инвестиций'
                },
                {
                  date: 'H1 2026',
                  event: 'Миллион пользователей',
                  description: 'Достижение 1M активных пользователей'
                },
                {
                  date: 'H2 2026',
                  event: 'Серия B',
                  description: 'Привлечение $10M инвестиций'
                },
                {
                  date: '2027',
                  event: 'Глобальное расширение',
                  description: 'Запуск в 15 странах'
                },
                {
                  date: '2030',
                  event: 'IPO',
                  description: 'Выход на публичный рынок'
                },
              ].map((milestone, idx) => (
                <PremiumCard key={idx} delay={idx * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📅</div>
                    <div className="flex-1">
                      <p className="text-xs text-foreground/60 mb-1">{milestone.date}</p>
                      <h3 className="text-lg font-bold text-foreground mb-1">{milestone.event}</h3>
                      <p className="text-sm text-foreground/70">{milestone.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </motion.section>

          {/* Investment Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Инвестиционный план</h2>
            <PremiumCard gradient="from-green-500/10 to-green-600/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Общие инвестиции</p>
                  <p className="text-4xl font-bold text-primary mb-2">$71.5M</p>
                  <p className="text-xs text-foreground/60">На 5 лет развития</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Средний раунд</p>
                  <p className="text-4xl font-bold text-green-500 mb-2">$14.3M</p>
                  <p className="text-xs text-foreground/60">На фазу</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">ROI прогноз</p>
                  <p className="text-4xl font-bold text-blue-500 mb-2">25-30x</p>
                  <p className="text-xs text-foreground/60">К 2030 году</p>
                </div>
              </div>
            </PremiumCard>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

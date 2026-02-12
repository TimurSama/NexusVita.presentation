import { useState } from 'react';
import { ChevronLeft, Heart, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PremiumCard } from '@/components/PremiumCard';
import { DataVisualization } from '@/components/DataVisualization';
import { StatCounter } from '@/components/StatCounter';

export default function Medicine() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  const diagnosticAreas = [
    {
      name: 'Кардиоваскулярная система',
      icon: '❤️',
      metrics: [
        { label: 'Артериальное давление', value: 'Норма' },
        { label: 'Частота сердечных сокращений', value: '60-100 уд/мин' },
        { label: 'Холестерин', value: 'Контроль' },
      ]
    },
    {
      name: 'Дыхательная система',
      icon: '🫁',
      metrics: [
        { label: 'Функция легких', value: 'FEV1 норма' },
        { label: 'Кислород в крови', value: '95-100%' },
        { label: 'Дыхательный индекс', value: 'Оптимальный' },
      ]
    },
    {
      name: 'Метаболизм',
      icon: '⚗️',
      metrics: [
        { label: 'Глюкоза крови', value: '70-100 мг/дл' },
        { label: 'Индекс массы тела', value: '18.5-24.9' },
        { label: 'Метаболический возраст', value: 'Оптимальный' },
      ]
    },
    {
      name: 'Иммунная система',
      icon: '🛡️',
      metrics: [
        { label: 'Лейкоциты', value: 'Норма' },
        { label: 'Антитела', value: 'Защита' },
        { label: 'Воспаление', value: 'Контроль' },
      ]
    },
  ];

  const preventionPrograms = [
    {
      name: 'Скрининг здоровья',
      description: 'Комплексная диагностика основных показателей',
      frequency: 'Ежегодно',
      color: 'from-blue-500 to-blue-600',
      icon: '🔍'
    },
    {
      name: 'Вакцинация',
      description: 'Профилактика инфекционных заболеваний',
      frequency: 'По графику',
      color: 'from-green-500 to-green-600',
      icon: '💉'
    },
    {
      name: 'Физическое обследование',
      description: 'Детальный осмотр у специалистов',
      frequency: 'Ежегодно',
      color: 'from-purple-500 to-purple-600',
      icon: '👨‍⚕️'
    },
    {
      name: 'Лабораторные тесты',
      description: 'Анализ крови и биохимические исследования',
      frequency: 'По показаниям',
      color: 'from-orange-500 to-orange-600',
      icon: '🧪'
    },
  ];

  const riskFactors = [
    { label: 'Курение', value: 85, color: 'from-red-500 to-red-600' },
    { label: 'Гиподинамия', value: 72, color: 'from-orange-500 to-orange-600' },
    { label: 'Неправильное питание', value: 68, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Стресс', value: 65, color: 'from-pink-500 to-pink-600' },
    { label: 'Лишний вес', value: 58, color: 'from-red-400 to-red-500' },
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
          <h1 className="text-2xl font-bold text-foreground">⚕️ Медицина</h1>
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-700/5 p-12 border border-border/50">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2">Комплексная диагностика здоровья</h2>
                    <p className="text-foreground/70 text-lg">Интегрированная система мониторинга и профилактики заболеваний</p>
                  </div>
                  <Heart className="w-16 h-16 text-primary opacity-20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                  <StatCounter value={95} label="Точность диагностики" suffix="%" delay={0.1} />
                  <StatCounter value={2000} label="Интегрированных показателей" delay={0.2} />
                  <StatCounter value={150} label="Партнёрских клиник" delay={0.3} />
                  <StatCounter value={24} label="Часовой мониторинг" suffix="/7" delay={0.4} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'diagnostics', 'prevention', 'risks'].map(tab => (
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
                {tab === 'diagnostics' && 'Диагностика'}
                {tab === 'prevention' && 'Профилактика'}
                {tab === 'risks' && 'Факторы риска'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Персональная диагностика',
                    description: 'AI-анализ 2000+ медицинских показателей для выявления рисков',
                    icon: '🔬'
                  },
                  {
                    title: 'Интеграция с клиниками',
                    description: 'Прямая связь с 150+ медицинскими учреждениями',
                    icon: '🏥'
                  },
                  {
                    title: 'Мониторинг в реальном времени',
                    description: '24/7 отслеживание ключевых показателей здоровья',
                    icon: '📊'
                  },
                  {
                    title: 'Профилактические рекомендации',
                    description: 'Персональные протоколы предотвращения заболеваний',
                    icon: '✅'
                  },
                ].map((item, idx) => (
                  <PremiumCard key={idx} delay={idx * 0.1}>
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-foreground/70 text-sm">{item.description}</p>
                  </PremiumCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Diagnostics Tab */}
          {selectedTab === 'diagnostics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diagnosticAreas.map((area, idx) => (
                  <PremiumCard key={idx} delay={idx * 0.1} gradient="from-blue-500/10 to-blue-600/5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{area.icon}</span>
                      <h3 className="text-lg font-bold text-foreground">{area.name}</h3>
                    </div>
                    <div className="space-y-3">
                      {area.metrics.map((metric, midx) => (
                        <motion.div
                          key={midx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + midx * 0.05 }}
                          className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
                        >
                          <span className="text-sm text-foreground/70">{metric.label}</span>
                          <span className="text-sm font-semibold text-primary">{metric.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prevention Tab */}
          {selectedTab === 'prevention' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {preventionPrograms.map((program, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${program.color} p-6 text-white border border-white/10`}
                  >
                    <div className="absolute top-0 right-0 text-6xl opacity-20">{program.icon}</div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                      <p className="text-white/80 text-sm mb-4">{program.description}</p>
                      <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                        {program.frequency}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Risk Factors Tab */}
          {selectedTab === 'risks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <PremiumCard>
                <h3 className="text-2xl font-bold text-foreground mb-6">Факторы риска заболеваний</h3>
                <DataVisualization data={riskFactors} />
              </PremiumCard>

              <PremiumCard gradient="from-orange-500/10 to-orange-600/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Важно знать</h3>
                    <p className="text-foreground/70 text-sm">
                      Регулярный мониторинг факторов риска и своевременная коррекция образа жизни могут снизить вероятность развития хронических заболеваний на 70-80%.
                    </p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

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
      name: 'Q1 2025: Базовая разработка',
      period: 'Январь - Март 2025',
      investment: '50M₽',
      investmentUsd: '$545K',
      goals: [
        '✅ Frontend мобильного приложения (базовая версия)',
        '✅ Backend API и база данных',
        '✅ Система аутентификации',
        '✅ Базовые модули здоровья (3 из 7)',
        '✅ Система сбора данных',
        'Создание бренда и сайта',
        'Запуск социальных сетей',
        'Поиск первых медицинских партнеров (5 клиник)',
        'Переговоры с фитнес-центрами (10 центров)'
      ],
      metrics: [
        { label: 'Пользователи', value: '10K' },
        { label: 'Платящие', value: '500' },
        { label: 'MRR', value: '1.5M₽' }
      ],
      color: 'from-blue-500 to-blue-600',
      icon: '🚀',
      development: ['Frontend MVP', 'Backend API', 'Аутентификация', '3 модуля здоровья'],
      marketing: ['Брендинг', 'Сайт', 'Соцсети', 'Первые публикации'],
      partnerships: ['5 клиник', '10 фитнес-центров']
    },
    {
      phase: 2,
      name: 'Q2 2025: Расширение функционала',
      period: 'Апрель - Июнь 2025',
      investment: '80M₽',
      investmentUsd: '$872K',
      goals: [
        'Все 7 модулей здоровья',
        'ИИ-чат и рекомендации',
        'Интеграции с устройствами',
        'Система аналитики',
        'Запуск рекламных кампаний',
        'Партнерский маркетинг',
        'Медицинские клиники: 20',
        'Фитнес-центры: 30',
        'Партнеры по питанию: 50'
      ],
      metrics: [
        { label: 'Пользователи', value: '30K' },
        { label: 'Платящие', value: '2K' },
        { label: 'MRR', value: '5M₽' }
      ],
      color: 'from-purple-500 to-purple-600',
      icon: '📈',
      development: ['Все модули', 'ИИ-чат', 'Интеграции', 'Аналитика'],
      marketing: ['Реклама', 'Партнерский', 'Контент'],
      partnerships: ['20 клиник', '30 фитнес', '50 питание']
    },
    {
      phase: 3,
      name: 'Q3 2025: Масштабирование',
      period: 'Июль - Сентябрь 2025',
      investment: '120M₽',
      investmentUsd: '$1.3M',
      goals: [
        'Корпоративная версия',
        'Расширенная аналитика',
        'OCR для документов',
        'Интеграции с EHR системами',
        'Масштабирование рекламы',
        'События и конференции',
        'Медицинские клиники: 50',
        'Фитнес-центры: 100',
        'Партнеры по питанию: 200',
        'Корпоративные клиенты: 5'
      ],
      metrics: [
        { label: 'Пользователи', value: '100K' },
        { label: 'Платящие', value: '5K' },
        { label: 'MRR', value: '15M₽' }
      ],
      color: 'from-green-500 to-green-600',
      icon: '🌍',
      development: ['Корпоративная версия', 'OCR', 'EHR интеграции'],
      marketing: ['Масштабирование', 'События', 'PR'],
      partnerships: ['50 клиник', '100 фитнес', '200 питание', '5 корп']
    },
    {
      phase: 4,
      name: 'Q4 2025: Оптимизация и рост',
      period: 'Октябрь - Декабрь 2025',
      investment: '150M₽',
      investmentUsd: '$1.6M',
      goals: [
        'Оптимизация производительности',
        'Новые функции на основе обратной связи',
        'Мобильные приложения (iOS/Android)',
        'Региональное расширение',
        'Международные рынки (СНГ)',
        'Медицинские клиники: 100',
        'Фитнес-центры: 200',
        'Партнеры по питанию: 500',
        'Корпоративные клиенты: 20'
      ],
      metrics: [
        { label: 'Пользователи', value: '200K' },
        { label: 'Платящие', value: '10K' },
        { label: 'MRR', value: '30M₽' }
      ],
      color: 'from-orange-500 to-orange-600',
      icon: '🗺️',
      development: ['Оптимизация', 'Мобильные приложения', 'Новые функции'],
      marketing: ['Региональное', 'Международное', 'СНГ'],
      partnerships: ['100 клиник', '200 фитнес', '500 питание', '20 корп']
    },
    {
      phase: 5,
      name: '2026: Рост и расширение',
      period: 'Январь - Декабрь 2026',
      investment: '300M₽',
      investmentUsd: '$3.3M',
      goals: [
        'Международная версия (английский, китайский)',
        'Расширенный ИИ (GPT-4 интеграция)',
        'Виртуальные консультации',
        'Телемедицина',
        'Международное расширение',
        'Крупные PR кампании',
        'Медицинские клиники: 500',
        'Фитнес-центры: 1,000',
        'Партнеры по питанию: 2,000',
        'Корпоративные клиенты: 100'
      ],
      metrics: [
        { label: 'Пользователи', value: '1M' },
        { label: 'Платящие', value: '50K' },
        { label: 'ARR', value: '1.8B₽' }
      ],
      color: 'from-green-500 to-green-600',
      icon: '🌍',
      development: ['Международная версия', 'Расширенный ИИ', 'Телемедицина'],
      marketing: ['Международное', 'PR кампании', 'Инфлюенсеры'],
      partnerships: ['500 клиник', '1K фитнес', '2K питание', '100 корп']
    },
    {
      phase: 6,
      name: '2027: Доминирование рынка',
      period: 'Январь - Декабрь 2027',
      investment: '1B₽',
      investmentUsd: '$10.9M',
      goals: [
        'ИИ-диагностика (FDA/Росздравнадзор сертификация)',
        'Генетический анализ',
        'Персонализированная медицина',
        'Блокчейн для данных',
        'Глобальное присутствие',
        'Научные публикации',
        'Медицинские клиники: 2,000',
        'Фитнес-центры: 5,000',
        'Партнеры по питанию: 10,000',
        'Корпоративные клиенты: 500'
      ],
      metrics: [
        { label: 'Пользователи', value: '5M' },
        { label: 'Платящие', value: '250K' },
        { label: 'ARR', value: '9B₽' }
      ],
      color: 'from-orange-500 to-orange-600',
      icon: '🗺️',
      development: ['ИИ-диагностика', 'Генетика', 'Блокчейн'],
      marketing: ['Глобальное', 'Научные публикации', 'Конференции'],
      partnerships: ['2K клиник', '5K фитнес', '10K питание', '500 корп']
    },
    {
      phase: 7,
      name: '2028-2029: Лидерство и IPO',
      period: 'Январь 2028 - Декабрь 2029',
      investment: '3B₽',
      investmentUsd: '$32.7M',
      goals: [
        'Глобальная платформа',
        'Исследования и разработки',
        'Новые технологии (AR/VR, квантовые вычисления)',
        'Глобальный бренд',
        'Стратегические партнерства',
        'Медицинские клиники: 10,000+',
        'Фитнес-центры: 50,000+',
        'Партнеры по питанию: 100,000+',
        'Корпоративные клиенты: 5,000+',
        'Подготовка к IPO'
      ],
      metrics: [
        { label: 'Пользователи', value: '50M' },
        { label: 'Платящие', value: '2.5M' },
        { label: 'ARR', value: '90B₽' }
      ],
      color: 'from-pink-500 to-pink-600',
      icon: '👑',
      development: ['Глобальная платформа', 'R&D', 'AR/VR', 'Квантовые вычисления'],
      marketing: ['Глобальный бренд', 'Стратегические партнерства'],
      partnerships: ['10K+ клиник', '50K+ фитнес', '100K+ питание', '5K+ корп']
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
                  <StatCounter value={400} label="Инвестиции" suffix="M₽" delay={0.1} />
                  <StatCounter value={200} label="Пользователей год 1" suffix="K" delay={0.2} />
                  <StatCounter value={7} label="Фаз развития" delay={0.3} />
                  <StatCounter value={800} label="Партнёров год 1" delay={0.4} />
                  <StatCounter value={2029} label="Год IPO" delay={0.5} />
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
                              <p className="text-xl font-bold">{phase.investment}</p>
                              {phase.investmentUsd && (
                                <p className="text-xs text-white/60">({phase.investmentUsd})</p>
                              )}
                            </div>
                          </div>

                          <div className="mb-6 pb-6 border-b border-white/20">
                            <h4 className="text-sm font-semibold mb-3 text-white/90">Цели:</h4>
                            <ul className="space-y-2">
                              {phase.goals.map((goal, gidx) => (
                                <li key={gidx} className="text-sm text-white/80 flex items-start gap-2">
                                  <span className="text-lg leading-none">{goal.startsWith('✅') ? '✅' : '•'}</span>
                                  <span>{goal.replace('✅ ', '')}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {phase.development && (
                            <div className="mb-4 pb-4 border-b border-white/10">
                              <h4 className="text-xs font-semibold mb-2 text-white/70">Разработка:</h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.development.map((item, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded text-white/80">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {phase.marketing && (
                            <div className="mb-4 pb-4 border-b border-white/10">
                              <h4 className="text-xs font-semibold mb-2 text-white/70">Маркетинг:</h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.marketing.map((item, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded text-white/80">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {phase.partnerships && (
                            <div className="mb-4">
                              <h4 className="text-xs font-semibold mb-2 text-white/70">Партнерства:</h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.partnerships.map((item, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded text-white/80">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

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

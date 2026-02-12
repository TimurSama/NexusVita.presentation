import { useState } from 'react';
import { ChevronLeft, CheckCircle2, Target, Zap } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Roadmap() {
  const [, setLocation] = useLocation();
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase1');

  const phases = [
    {
      id: 'phase1',
      name: 'Фаза 1: Альфа-разработка',
      duration: '0–6 месяцев',
      color: 'from-blue-500 to-blue-600',
      icon: '🚀',
      description: 'Создание MVP с 2-3 ключевыми модулями',
      goals: [
        'Запуск платформы в одном регионе на одном языке',
        'Привлечение 3-5 первых партнёров для тестирования',
        'Закрытая бета-версия с 500-1000 активными пользователями',
        'Удержание 40% через 30 дней',
        'Положительные отзывы о пользовательском опыте'
      ],
      technical: [
        'Базовая архитектура платформы',
        'Система аутентификации пользователей',
        'Система сбора данных',
        'Простой интерфейс'
      ],
      investment: '$100-250K (ангельский раунд)',
      metrics: {
        users: '500-1K',
        retention: '40%',
        partners: '3-5',
        arr: '$0-50K'
      }
    },
    {
      id: 'phase2',
      name: 'Фаза 2: Бета-запуск',
      duration: '6–12 месяцев',
      color: 'from-green-500 to-green-600',
      icon: '📱',
      description: 'Расширение до всех 5 модулей здоровья',
      goals: [
        'Расширение функциональности до всех пяти модулей',
        'Интеграции с носимыми устройствами',
        'Маркетплейс услуг',
        'Пилотная программа для корпоративных клиентов',
        '10,000–25,000 активных пользователей'
      ],
      technical: [
        'Все 5 модулей здоровья',
        'Wearables интеграция',
        'Маркетплейс платформа',
        'Корпоративный API'
      ],
      investment: '$150-350K (пре-сид раунд)',
      metrics: {
        users: '10-25K',
        paying: '500-2K',
        retention: '35%',
        arr: '$50-150K',
        partners: '20-50'
      }
    },
    {
      id: 'phase3',
      name: 'Фаза 3: Региональное расширение',
      duration: '12–24 месяца',
      color: 'from-purple-500 to-purple-600',
      icon: '🌍',
      description: 'Масштабирование в пределах региона',
      goals: [
        'Локализация на дополнительные языки',
        'Расширение партнёрской сети до 100-200 организаций',
        'Медицинские интеграции с лабораториями и клиниками',
        '100,000+ активных пользователей',
        'Корпоративная программа для 20-50 компаний'
      ],
      technical: [
        'Многоязычная поддержка',
        'Медицинские интеграции',
        'Оптимизация инфраструктуры',
        'Улучшенные AI алгоритмы'
      ],
      investment: '$2-4M (сид раунд)',
      metrics: {
        users: '100K+',
        paying: '10-20K',
        retention: '30%+',
        arr: '$5-10M',
        partners: '100-200',
        corporate: '20-50'
      }
    },
    {
      id: 'phase4',
      name: 'Фаза 4: Международное масштабирование',
      duration: '24–48 месяцев',
      color: 'from-orange-500 to-orange-600',
      icon: '🌐',
      description: 'Выход на международные рынки',
      goals: [
        'Запуск в США, Европе и Азии',
        'Адаптация под местные рынки и регуляторные требования',
        'Стратегические партнёрства со страховыми компаниями',
        '500,000+ активных пользователей',
        'Расширение корпоративного сегмента до 200+ компаний'
      ],
      technical: [
        'Продвинутые AI функции',
        'Предиктивная аналитика',
        'Персонализированные протоколы ML',
        'Международная инфраструктура'
      ],
      investment: '$8-15M (серия А)',
      metrics: {
        users: '500K+',
        paying: '50-100K',
        arr: '$50-100M',
        partners: '2000+',
        corporate: '100-200',
        regions: '3+'
      }
    },
    {
      id: 'phase5',
      name: 'Фаза 5: Экосистемный слой',
      duration: '48+ месяцев',
      color: 'from-pink-500 to-pink-600',
      icon: '🔗',
      description: 'Открытая экосистема для сторонних разработчиков',
      goals: [
        'API для сторонних разработчиков',
        'White-label решения для партнёров',
        'SDK для интеграций',
        'Платформа исследований на основе данных',
        '1,000,000+ активных пользователей'
      ],
      technical: [
        'Открытый API',
        'White-label платформа',
        'SDK и документация',
        'Платформа исследований'
      ],
      investment: '$25-50M (серия Б)',
      metrics: {
        users: '1M+',
        arr: '$150-300M',
        partners: '5000+',
        corporate: '500+',
        regions: '10+',
        developers: '1000+'
      }
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
          <h1 className="text-2xl font-bold text-foreground">Дорожная карта развития</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Timeline Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">5 Фаз развития</h2>
            
            {/* Timeline visualization */}
            <div className="relative mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 ml-8"></div>
              
              <div className="space-y-8">
                {phases.map((phase, idx) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    className="cursor-pointer"
                  >
                    <div className="ml-20 sketch-panel p-6 hover:shadow-lg transition-all">
                      <div className={`absolute -left-5 top-6 w-10 h-10 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold`}>
                        {idx + 1}
                      </div>

                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{phase.name}</h3>
                          <p className="text-sm text-foreground/60">{phase.duration}</p>
                        </div>
                        <span className="text-3xl">{phase.icon}</span>
                      </div>

                      <p className="text-foreground/70 mb-4">{phase.description}</p>

                      {/* Expandable content */}
                      {expandedPhase === phase.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-border space-y-6"
                        >
                          {/* Goals */}
                          <div>
                            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Ключевые цели
                            </h4>
                            <ul className="space-y-2">
                              {phase.goals.map((goal, gidx) => (
                                <li key={gidx} className="flex items-start gap-2 text-sm text-foreground/70">
                                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technical */}
                          <div>
                            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Технические фокусы
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {phase.technical.map((tech, tidx) => (
                                <div key={tidx} className="px-3 py-2 bg-background/50 rounded text-sm text-foreground/70">
                                  • {tech}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Investment */}
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-foreground/60 mb-1">Требуемое финансирование</p>
                            <p className="text-lg font-bold text-primary">{phase.investment}</p>
                          </div>

                          {/* Metrics */}
                          <div>
                            <h4 className="font-bold text-foreground mb-3">Целевые метрики</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {Object.entries(phase.metrics).map(([key, value]) => (
                                <div key={key} className="sketch-panel p-3 text-center">
                                  <p className="text-xs text-foreground/60 mb-1 capitalize">{key}</p>
                                  <p className="text-lg font-bold text-primary">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
            <h2 className="text-2xl font-bold text-foreground mb-4">Путь к масштабированию</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                <strong>Альфа-фаза</strong> подтверждает основные гипотезы и создаёт рабочий прототип.
              </p>
              <p>
                <strong>Бета-фаза</strong> расширяет функциональность и начинает монетизацию.
              </p>
              <p>
                <strong>Региональная фаза</strong> масштабирует платформу в пределах одного региона с 100K+ пользователей.
              </p>
              <p>
                <strong>Международная фаза</strong> выводит продукт на глобальные рынки с 500K+ пользователей.
              </p>
              <p>
                <strong>Экосистемная фаза</strong> превращает платформу в открытую экосистему с 1M+ пользователей и становится стандартом в индустрии.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

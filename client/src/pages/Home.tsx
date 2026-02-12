import { useState } from 'react';
import { ChevronRight, Heart, Brain, Users, Zap, Moon, Shield, Stethoscope, TrendingUp } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const healthModules = [
    {
      id: 'medicine',
      name: 'Медицина',
      icon: Stethoscope,
      color: 'from-primary/20 to-primary/5',
      description: 'Анализы, лечение, восстановление, профилактика',
      details: ['История анализов', 'Рекомендации ИИ', 'Напоминания', 'Интеграция клиник'],
      route: '/medicine'
    },
    {
      id: 'physical',
      name: 'Физическое здоровье',
      icon: Heart,
      color: 'from-secondary/20 to-secondary/5',
      description: 'Тренировки, реабилитация, прогресс',
      details: ['Планировщик тренировок', 'Видео-уроки', 'Прогресс по KPI', 'Интеграция фитнеса'],
      route: '/physical-health'
    },
    {
      id: 'psycho',
      name: 'Психо-эмоциональное',
      icon: Brain,
      color: 'from-primary/20 to-primary/5',
      description: 'Терапия, стресс-менеджмент, эмоции',
      details: ['Медитация', 'Психотерапевтические сессии', 'Трекеры эмоций', 'Поддержка'],
      route: '/psycho-emotional'
    },
    {
      id: 'nutrition',
      name: 'Питание',
      icon: Zap,
      color: 'from-secondary/20 to-secondary/5',
      description: 'Персонализированные планы, интеграция с магазинами',
      details: ['Рецепты', 'Калорийность', 'Интеграция доставки', 'БАДы'],
      route: '/nutrition'
    },
    {
      id: 'social',
      name: 'Социальное здоровье',
      icon: Users,
      color: 'from-primary/20 to-primary/5',
      description: 'Группы, челленджи, поддержка сообщества',
      details: ['Социальная сеть', 'Добавление друзей', 'Обсуждения', 'Челленджи'],
      route: '/social'
    },
    {
      id: 'sleep',
      name: 'Сон и восстановление',
      icon: Moon,
      color: 'from-secondary/20 to-secondary/5',
      description: 'Wearables, анализ сна, рекомендации',
      details: ['Мониторинг сна', 'Умный будильник', 'Восстановительные программы', 'Синхронизация'],
      route: '/sleep-recovery'
    },
    {
      id: 'prevention',
      name: 'Профилактика и окружающая среда',
      icon: Shield,
      color: 'from-primary/20 to-primary/5',
      description: 'Рекомендации, мониторинг качества',
      details: ['Данные IoT-сетей', 'Качество воды', 'Качество воздуха', 'Температура'],
      route: '/prevention'
    },
    {
      id: 'cognitive',
      name: 'Когнитивное здоровье',
      icon: Brain,
      color: 'from-secondary/20 to-secondary/5',
      description: 'Концентрация, память, стратегическое мышление',
      details: ['Тесты на внимание', 'Тренировка памяти', 'Аналитика фокуса', 'Обучение'],
      route: '/cognitive'
    },
  ];

  const systemComplexes = [
    {
      id: 'biological',
      name: 'Биологический комплекс',
      emoji: '🧬',
      description: 'Фундамент системной устойчивости организма',
      elements: ['Метаболизм', 'Гормональный фон', 'Сон', 'Питание', 'Физическая активность', 'Восстановление'],
    },
    {
      id: 'psycho',
      name: 'Психоэмоциональный комплекс',
      emoji: '🧠',
      description: 'Стресс-реакции, эмоциональная устойчивость',
      elements: ['Стресс-реакции', 'Тревожность', 'Мотивация', 'Эмоциональная устойчивость', 'Когнитивная нагрузка'],
    },
    {
      id: 'cognitive',
      name: 'Когнитивный комплекс',
      emoji: '🎯',
      description: 'Концентрация, память и стратегическое мышление',
      elements: ['Концентрация', 'Обучаемость', 'Память', 'Стратегическое мышление'],
    },
    {
      id: 'social',
      name: 'Социальный комплекс',
      emoji: '👥',
      description: 'Окружение, поддержка и участие в сообществе',
      elements: ['Окружение', 'Уровень поддержки', 'Цифровое взаимодействие', 'Участие в сообществах'],
    },
    {
      id: 'infrastructure',
      name: 'Инфраструктурный комплекс',
      emoji: '🏥',
      description: 'Специалисты, клиники и инновационные решения',
      elements: ['Специалисты', 'Клиники', 'Магазины', 'Лаборатории', 'Исследования', 'Инновации'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                NV
              </div>
              <h1 className="text-xl font-bold text-foreground">NexusVita</h1>
            </button>
            
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <button
                onClick={() => setLocation('/systematization')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Систематизация
              </button>
              <button
                onClick={() => setLocation('/economic')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Экономика
              </button>
              <button
                onClick={() => setLocation('/ai-planner')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                AI-Планировщик
              </button>
              <button
                onClick={() => setLocation('/tokenomics')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Токеномика
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            NexusVita
          </h1>
          <h2 className="text-2xl md:text-3xl text-foreground/80 mb-6 font-light">
            Системная экосистема управления здоровьем, средой и потенциалом человека
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            Платформа, объединяющая физическое, психоэмоциональное, когнитивное и социальное здоровье в единую цифровую архитектуру с ИИ-планировщиком, личным дневником и интерактивной социально-экономической системой.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setLocation('/physical-health')}
              className="btn-sketch bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Начать персональную диагностику
            </button>
            <button
              onClick={() => setLocation('/systematization')}
              className="btn-sketch bg-card text-foreground px-8 py-3 rounded-lg font-semibold border border-border hover:shadow-lg transition-shadow"
            >
              Изучить систему
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="sketch-panel p-4">
              <p className="text-3xl font-bold text-primary">7</p>
              <p className="text-sm text-foreground/70">модулей здоровья</p>
            </div>
            <div className="sketch-panel p-4">
              <p className="text-3xl font-bold text-secondary">180+</p>
              <p className="text-sm text-foreground/70">параметров оценки</p>
            </div>
            <div className="sketch-panel p-4">
              <p className="text-3xl font-bold text-primary">30</p>
              <p className="text-sm text-foreground/70">дней в плане</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-gradient-to-b from-background to-background/50 py-16 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Ценностные предложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
              <h3 className="text-xl font-bold text-foreground mb-4">Для пользователя</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Ясность в управлении здоровьем</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Полный контроль над данными</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Системный подход к благополучию</span>
                </li>
              </ul>
            </div>

            <div className="sketch-panel p-8 bg-gradient-to-br from-secondary/5 to-secondary/2">
              <h3 className="text-xl font-bold text-foreground mb-4">Для партнёра</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Поток квалифицированных клиентов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Цифровая интеграция и API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Аналитика и инсайты</span>
                </li>
              </ul>
            </div>

            <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
              <h3 className="text-xl font-bold text-foreground mb-4">Для инвестора</h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Масштабируемая архитектура</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Повторяющаяся подписочная модель</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Мультисекторный рынок</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Health Modules Overview */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">7 Модулей здоровья</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthModules.map(module => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => setLocation(module.route)}
                className="sketch-panel p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-foreground">{module.name}</h3>
                </div>
                <p className="text-sm text-foreground/70 mb-4">{module.description}</p>
                <button className="text-primary text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Подробнее <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* System Complexes Overview */}
      <section className="bg-gradient-to-b from-background to-background/50 py-20 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">5 Системных комплексов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {systemComplexes.map(complex => (
              <div
                key={complex.id}
                onClick={() => setLocation('/systematization')}
                className="sketch-panel p-6 cursor-pointer hover:shadow-lg transition-all hover:ring-2 hover:ring-primary"
              >
                <div className="text-4xl mb-4">{complex.emoji}</div>
                <h3 className="font-bold text-foreground mb-2">{complex.name}</h3>
                <p className="text-xs text-foreground/70 mb-4">{complex.description}</p>
                <div className="text-xs text-foreground/60 space-y-1">
                  {complex.elements.slice(0, 3).map((el, idx) => (
                    <div key={idx}>• {el}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Ключевые возможности</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: 'AI-планировщик',
              description: 'Персональные недельные и месячные планы с автоматической корректировкой по прогрессу',
              icon: '🤖'
            },
            {
              title: 'Личный дневник',
              description: 'Постоянный сбор данных о целях, привычках, состоянии тела и психики',
              icon: '📔'
            },
            {
              title: 'Интеграция партнёров',
              description: 'Подключение тренеров, клиник, магазинов и центров в единую систему',
              icon: '🤝'
            },
            {
              title: 'Социальная экосистема',
              description: 'Группы, челленджи, друзья и мотивационные задания',
              icon: '👥'
            },
            {
              title: 'Токеномика и DAO',
              description: 'Реферальные вознаграждения, кэшбэки и управление токенами',
              icon: '💰'
            },
            {
              title: 'Интерактивные визуализации',
              description: 'Скетчевые графики, орбитальные диаграммы и микро-анимации',
              icon: '📊'
            },
          ].map((feature, idx) => (
            <div key={idx} className="sketch-panel p-6">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Готовы исследовать свою систему?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Начните персональную диагностику и откройте новые инсайты о взаимосвязях в вашем здоровье.
          </p>
          <button
            onClick={() => setLocation('/physical-health')}
            className="btn-sketch bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Начать диагностику
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">NexusVita</h3>
              <p className="text-sm text-foreground/70">Системная экосистема управления здоровьем</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Модули</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><button onClick={() => setLocation('/physical-health')} className="hover:text-foreground">Физическое здоровье</button></li>
                <li><button onClick={() => setLocation('/psycho-emotional')} className="hover:text-foreground">Психо-эмоциональное</button></li>
                <li><button onClick={() => setLocation('/cognitive')} className="hover:text-foreground">Когнитивное</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Система</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><button onClick={() => setLocation('/systematization')} className="hover:text-foreground">Систематизация</button></li>
                <li><button onClick={() => setLocation('/ai-planner')} className="hover:text-foreground">AI-Планировщик</button></li>
                <li><button onClick={() => setLocation('/tokenomics')} className="hover:text-foreground">Токеномика</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Бизнес</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><button onClick={() => setLocation('/economic')} className="hover:text-foreground">Экономическая модель</button></li>
                <li><a href="#" className="hover:text-foreground">Для партнёров</a></li>
                <li><a href="#" className="hover:text-foreground">Для инвесторов</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>© 2026 NexusVita. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

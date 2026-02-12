import { ChevronLeft, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PremiumCard } from '@/components/PremiumCard';
import { DataVisualization } from '@/components/DataVisualization';
import { StatCounter } from '@/components/StatCounter';

export default function InvestmentProposal() {
  const [, setLocation] = useLocation();

  const fundingRounds = [
    {
      round: 'Seed',
      amount: '$500K',
      valuation: '$5M',
      use: ['MVP разработка', 'Команда', 'Маркетинг'],
      timeline: 'Q2 2025',
      icon: '🌱'
    },
    {
      round: 'Series A',
      amount: '$2M',
      valuation: '$20M',
      use: ['Масштабирование', 'Партнёрства', 'Продукт'],
      timeline: 'Q4 2025',
      icon: '📈'
    },
    {
      round: 'Series B',
      amount: '$10M',
      valuation: '$100M',
      use: ['Глобализация', 'Команда', 'Маркетинг'],
      timeline: 'H2 2026',
      icon: '🚀'
    },
    {
      round: 'Series C',
      amount: '$25M',
      valuation: '$300M',
      use: ['Расширение', 'Акquisitions', 'Инфраструктура'],
      timeline: '2027',
      icon: '🌟'
    },
    {
      round: 'Series D',
      amount: '$35M',
      valuation: '$800M',
      use: ['IPO подготовка', 'Глобальная сеть', 'Инновации'],
      timeline: '2028-2029',
      icon: '👑'
    }
  ];

  const riskFactors = [
    { label: 'Конкуренция', value: 65, color: 'from-red-500 to-red-600' },
    { label: 'Регуляция', value: 45, color: 'from-orange-500 to-orange-600' },
    { label: 'Технология', value: 30, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Рынок', value: 25, color: 'from-green-500 to-green-600' },
    { label: 'Команда', value: 15, color: 'from-blue-500 to-blue-600' },
  ];

  const exitStrategies = [
    {
      strategy: 'IPO',
      timeline: '2030',
      valuation: '$3-5B',
      probability: '85%',
      icon: '📊'
    },
    {
      strategy: 'Acquisition',
      timeline: '2028-2029',
      valuation: '$1-2B',
      probability: '60%',
      icon: '🤝'
    },
    {
      strategy: 'Secondary Sale',
      timeline: '2027-2028',
      valuation: '$500M-1B',
      probability: '40%',
      icon: '💰'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
          <h1 className="text-2xl font-bold text-foreground">💼 Инвестиционное предложение</h1>
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-amber-700/5 p-12 border border-border/50">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-foreground mb-4">Инвестируйте в будущее здоровья</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  Возможность войти в $9.3T рынок здоровья с революционной платформой
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <StatCounter value={71.5} label="Требуемых инвестиций" suffix="M$" delay={0.1} />
                  <StatCounter value={3} label="Валюация IPO" suffix="B$" delay={0.2} />
                  <StatCounter value={25} label="ROI множитель" suffix="x" delay={0.3} />
                  <StatCounter value={5} label="Раундов финансирования" delay={0.4} />
                  <StatCounter value={2030} label="Целевой год IPO" delay={0.5} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Funding Rounds */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Раунды финансирования</h2>
            <div className="space-y-6">
              {fundingRounds.map((round, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-6 border border-border/50"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-5xl flex-shrink-0">{round.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{round.round}</h3>
                          <p className="text-sm text-foreground/60">{round.timeline}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{round.amount}</p>
                          <p className="text-sm text-foreground/60">Валюация: {round.valuation}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {round.use.map((use, uidx) => (
                          <span key={uidx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Use of Funds */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Использование средств</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PremiumCard>
                <h3 className="text-xl font-bold text-foreground mb-6">Распределение бюджета</h3>
                <DataVisualization data={[
                  { label: 'Разработка', value: 35, color: 'from-blue-500 to-blue-600' },
                  { label: 'Маркетинг', value: 30, color: 'from-green-500 to-green-600' },
                  { label: 'Команда', value: 20, color: 'from-purple-500 to-purple-600' },
                  { label: 'Операции', value: 15, color: 'from-orange-500 to-orange-600' },
                ]} />
              </PremiumCard>

              <PremiumCard gradient="from-green-500/10 to-green-600/5">
                <h3 className="text-xl font-bold text-foreground mb-6">Ключевые инвестиции</h3>
                <div className="space-y-4">
                  {[
                    { item: 'Команда разработки', amount: '$25M' },
                    { item: 'Маркетинг и рост', amount: '$21.5M' },
                    { item: 'Инфраструктура', amount: '$14M' },
                    { item: 'Партнёрства', amount: '$11M' },
                  ].map((inv, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                    >
                      <span className="text-foreground/70">{inv.item}</span>
                      <span className="font-bold text-primary">{inv.amount}</span>
                    </motion.div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </motion.section>

          {/* Risk Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Анализ рисков</h2>
            <PremiumCard gradient="from-orange-500/10 to-orange-600/5">
              <div className="flex items-start gap-4 mb-8">
                <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Управление рисками</h3>
                  <p className="text-foreground/70 text-sm">
                    Все выявленные риски имеют стратегии смягчения и мониторинга
                  </p>
                </div>
              </div>
              <DataVisualization data={riskFactors.map(r => ({
                label: r.label,
                value: r.value,
                color: r.color
              }))} />
            </PremiumCard>
          </motion.section>

          {/* Exit Strategies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Стратегии выхода</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exitStrategies.map((exit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 border border-border/50"
                >
                  <div className="text-5xl mb-4">{exit.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{exit.strategy}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Временной горизонт</p>
                      <p className="font-semibold text-foreground">{exit.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Ожидаемая валюация</p>
                      <p className="font-semibold text-primary">{exit.valuation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">Вероятность</p>
                      <p className="font-semibold text-green-500">{exit.probability}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Investment Highlights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Ключевые преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Огромный рынок',
                  description: '$9.3T глобального рынка здоровья с растущим спросом на цифровые решения',
                  icon: '🌍'
                },
                {
                  title: 'Уникальная позиция',
                  description: 'Единственная платформа, интегрирующая 7 направлений здоровья',
                  icon: '🎯'
                },
                {
                  title: 'Сильная команда',
                  description: 'Опытные специалисты в health-tech, AI и стартапах',
                  icon: '👥'
                },
                {
                  title: 'Доказанная модель',
                  description: 'Успешные пилоты с 95% точностью диагностики',
                  icon: '✅'
                },
                {
                  title: 'Масштабируемость',
                  description: 'Технология готова к расширению на 100M+ пользователей',
                  icon: '📈'
                },
                {
                  title: 'Множественные потоки доходов',
                  description: '4 источника дохода обеспечивают устойчивость бизнеса',
                  icon: '💰'
                },
              ].map((highlight, idx) => (
                <PremiumCard key={idx} delay={idx * 0.1}>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{highlight.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{highlight.title}</h3>
                      <p className="text-foreground/70 text-sm">{highlight.description}</p>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <PremiumCard gradient="from-primary/20 to-primary/10">
              <div className="text-center py-8">
                <h3 className="text-3xl font-bold text-foreground mb-4">Готовы инвестировать?</h3>
                <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Присоединяйтесь к революции в здравоохранении и будьте частью создания глобальной экосистемы здоровья
                </p>
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Связаться с нами
                </button>
              </div>
            </PremiumCard>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

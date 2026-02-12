import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Brain, Users, Zap, TrendingUp } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const healthModules = [
    {
      title: 'Медицина',
      icon: '⚕️',
      description: 'Комплексная диагностика и профилактика заболеваний',
      color: 'from-blue-500 to-blue-600',
      path: '/medicine'
    },
    {
      title: 'Питание',
      icon: '🥗',
      description: 'Персональные рекомендации и анализ макронутриентов',
      color: 'from-green-500 to-green-600',
      path: '/nutrition'
    },
    {
      title: 'Движение',
      icon: '🏃',
      description: 'Фитнес, активность и интеграция с носимыми устройствами',
      color: 'from-orange-500 to-orange-600',
      path: '/movement'
    },
    {
      title: 'Психология',
      icon: '🧠',
      description: 'Психическое здоровье и управление стрессом',
      color: 'from-purple-500 to-purple-600',
      path: '/psychology'
    },
    {
      title: 'Сон',
      icon: '😴',
      description: 'Качество сна и оптимизация циркадных ритмов',
      color: 'from-indigo-500 to-indigo-600',
      path: '/sleep'
    },
    {
      title: 'Отношения',
      icon: '💑',
      description: 'Социальные связи и здоровые отношения',
      color: 'from-pink-500 to-pink-600',
      path: '/relationships'
    },
    {
      title: 'Духовность',
      icon: '🕉️',
      description: 'Личностный рост и смысл жизни',
      color: 'from-amber-500 to-amber-600',
      path: '/spirituality'
    },
  ];

  const ecosystemSections = [
    {
      title: 'Систематизация',
      description: '5 интегрированных комплексов здоровья',
      icon: '🔗',
      path: '/systematization',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Экономическая модель',
      description: 'Устойчивые источники дохода и прогнозы',
      icon: '💰',
      path: '/economic-model',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Дорожная карта',
      description: '5-летний план развития и инвестиции',
      icon: '🗺️',
      path: '/roadmap',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Инвестиции',
      description: 'Раунды финансирования и стратегии выхода',
      icon: '💼',
      path: '/investment',
      color: 'from-amber-500 to-amber-600'
    },
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
        <div className="container py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="text-3xl">🧬</div>
            <h1 className="text-2xl font-bold text-foreground">NexusVita</h1>
          </motion.div>
          <p className="text-sm text-foreground/60">Экосистема здоровья</p>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 p-16 border border-border/50">
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
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-foreground mb-6"
              >
                Экосистема здоровья нового поколения
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-foreground/70 mb-8 max-w-3xl"
              >
                Интегрированная платформа для комплексного развития 7 направлений здоровья с AI-диагностикой и персональными рекомендациями
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <StatCounter value={9.3} label="Триллионов рынка" suffix="T$" delay={0.5} />
                <StatCounter value={7} label="Модулей здоровья" delay={0.6} />
                <StatCounter value={2000} label="Показателей" suffix="+" delay={0.7} />
                <StatCounter value={95} label="Точность диагностики" suffix="%" delay={0.8} />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 7 Health Modules */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-10"
          >
            7 Модулей здоровья
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthModules.map((module, idx) => (
              <Link key={idx} href={module.path}>
                <motion.a
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ y: -8 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${module.color} p-6 text-white border border-white/10 cursor-pointer block h-full`}
                >
                  <div className="absolute top-0 right-0 text-6xl opacity-20">{module.icon}</div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{module.icon}</span>
                      <motion.div
                        animate={{ x: hoveredCard === idx ? 5 : 0 }}
                        className="text-white/70"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                    <p className="text-white/80 text-sm">{module.description}</p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Ecosystem Sections */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-10"
          >
            Экосистема
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ecosystemSections.map((section, idx) => (
              <Link key={idx} href={section.path}>
                <motion.a
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.color} p-8 text-white border border-white/10 cursor-pointer block`}
                >
                  <div className="absolute top-0 right-0 text-6xl opacity-20">{section.icon}</div>
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{section.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="text-white/80">{section.description}</p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-10"
          >
            Ключевые возможности
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI-диагностика',
                description: 'Анализ 2000+ показателей здоровья с точностью 95%',
                icon: '🤖'
              },
              {
                title: 'Персональные рекомендации',
                description: '1000+ рекомендаций для каждого пользователя',
                icon: '✨'
              },
              {
                title: 'Интеграция партнёров',
                description: 'Сеть 5000+ партнёрских организаций',
                icon: '🤝'
              },
              {
                title: 'Мониторинг 24/7',
                description: 'Постоянное отслеживание ключевых показателей',
                icon: '📊'
              },
              {
                title: 'Синергия данных',
                description: 'Холистический анализ всех направлений здоровья',
                icon: '🔗'
              },
              {
                title: 'Масштабируемость',
                description: 'Готовность к 100M+ пользователей',
                icon: '📈'
              },
            ].map((feature, idx) => (
              <PremiumCard key={idx} delay={idx * 0.1}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{feature.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-foreground/70 text-sm">{feature.description}</p>
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
          className="mb-16"
        >
          <PremiumCard gradient="from-primary/20 to-primary/10">
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Начните исследование</h3>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Откройте для себя полный потенциал экосистемы здоровья NexusVita
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/medicine">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Начать с медицины
                  </motion.a>
                </Link>
                <Link href="/systematization">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-background border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    Узнать о системе
                  </motion.a>
                </Link>
              </div>
            </div>
          </PremiumCard>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 py-8">
        <div className="container text-center text-foreground/60 text-sm">
          <p>© 2025 NexusVita. Экосистема здоровья нового поколения.</p>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';
import SketchIcon from '@/components/SketchIcon';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const healthModules = [
    {
      title: 'Медицина',
      icon: 'medicine' as const,
      description: 'Комплексная диагностика и профилактика заболеваний',
      path: '/medicine'
    },
    {
      title: 'Питание',
      icon: 'nutrition' as const,
      description: 'Персональные рекомендации и анализ макронутриентов',
      path: '/nutrition'
    },
    {
      title: 'Движение',
      icon: 'movement' as const,
      description: 'Фитнес, активность и интеграция с носимыми устройствами',
      path: '/movement'
    },
    {
      title: 'Психология',
      icon: 'psychology' as const,
      description: 'Психическое здоровье и управление стрессом',
      path: '/psychology'
    },
    {
      title: 'Сон',
      icon: 'sleep' as const,
      description: 'Качество сна и оптимизация циркадных ритмов',
      path: '/sleep'
    },
    {
      title: 'Отношения',
      icon: 'relationships' as const,
      description: 'Социальные связи и здоровые отношения',
      path: '/relationships'
    },
    {
      title: 'Духовность',
      icon: 'spirituality' as const,
      description: 'Личностный рост и смысл жизни',
      path: '/spirituality'
    },
  ];

  const ecosystemSections = [
    {
      title: 'Систематизация',
      description: '5 интегрированных комплексов здоровья',
      icon: 'systematization' as const,
      path: '/systematization',
    },
    {
      title: 'Экономическая модель',
      description: 'Устойчивые источники дохода и прогнозы',
      icon: 'economic' as const,
      path: '/economic-model',
    },
    {
      title: 'Дорожная карта',
      description: '5-летний план развития и инвестиции',
      icon: 'roadmap' as const,
      path: '/roadmap',
    },
    {
      title: 'Инвестиции',
      description: 'Раунды финансирования и стратегии выхода',
      icon: 'investment' as const,
      path: '/investment',
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
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
      <main className="container py-6 md:py-8">
        {/* Hero Section - Premium Description */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-12 md:p-20 border border-border/50 shadow-lg">
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            <div className="relative z-10 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                  Экосистема здоровья
                  <br />
                  <span className="text-primary">нового поколения</span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mb-12"
              >
                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
                  Комплексная платформа для системного управления здоровьем, объединяющая 
                  <span className="font-medium text-foreground"> семь взаимосвязанных модулей</span> в единую 
                  интеллектуальную экосистему.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  NexusVita обеспечивает глубокий анализ показателей здоровья, персональные рекомендации 
                  на основе искусственного интеллекта и непрерывный мониторинг всех аспектов благополучия 
                  через интеграцию с медицинскими системами, носимыми устройствами и партнёрской сетью.
                </p>
                <p className="text-base text-foreground/60 leading-relaxed">
                  Научно обоснованный подход к профилактике, диагностике и оптимизации здоровья 
                  с применением передовых технологий и системного анализа данных.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">9.3T$</div>
                  <div className="text-sm text-foreground/60">Адресуемый рынок</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">7</div>
                  <div className="text-sm text-foreground/60">Модулей здоровья</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">2000+</div>
                  <div className="text-sm text-foreground/60">Показателей</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-foreground/60">Точность диагностики</div>
                </div>
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
                  className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 cursor-pointer block h-full group hover:border-primary/30 transition-all"
                >
                  <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <SketchIcon icon={module.icon} size={80} className="text-primary" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <SketchIcon icon={module.icon} size={24} className="text-primary" />
                      </div>
                      <motion.div
                        animate={{ x: hoveredCard === idx ? 5 : 0 }}
                        className="text-foreground/40"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{module.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{module.description}</p>
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
                  className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 cursor-pointer block group hover:border-primary/30 transition-all"
                >
                  <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <SketchIcon icon={section.icon} size={100} className="text-primary" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 inline-block p-3 bg-primary/10 rounded-xl">
                      <SketchIcon icon={section.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{section.title}</h3>
                    <p className="text-foreground/70">{section.description}</p>
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
                icon: 'ai' as const
              },
              {
                title: 'Персональные рекомендации',
                description: '1000+ рекомендаций для каждого пользователя',
                icon: 'brain' as const
              },
              {
                title: 'Интеграция партнёров',
                description: 'Сеть 5000+ партнёрских организаций',
                icon: 'network' as const
              },
              {
                title: 'Мониторинг 24/7',
                description: 'Постоянное отслеживание ключевых показателей',
                icon: 'monitor' as const
              },
              {
                title: 'Синергия данных',
                description: 'Холистический анализ всех направлений здоровья',
                icon: 'link' as const
              },
              {
                title: 'Масштабируемость',
                description: 'Готовность к 100M+ пользователей',
                icon: 'trending' as const
              },
            ].map((feature, idx) => (
              <PremiumCard key={idx} delay={idx * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <SketchIcon icon={feature.icon} size={20} className="text-primary" />
                  </div>
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
          <PremiumCard gradient="from-primary/10 to-secondary/5">
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

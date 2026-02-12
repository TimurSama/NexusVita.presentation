import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';
import SketchIcon from '@/components/SketchIcon';

export default function Presentation() {
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
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
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
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed"
                >
                  Платформа нового поколения, объединяющая передовую AI-диагностику, персонализированные планы и комплексный мониторинг для достижения оптимального физического, ментального и социального благополучия.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      <SketchIcon icon="dna" size={48} className="inline-block mr-2" />
                      Системный
                    </div>
                    <div className="text-sm text-foreground/60">Подход к здоровью</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      <SketchIcon icon="brain" size={48} className="inline-block mr-2" />
                      AI-Driven
                    </div>
                    <div className="text-sm text-foreground/60">Персонализация</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      <SketchIcon icon="network" size={48} className="inline-block mr-2" />
                      Интеграции
                    </div>
                    <div className="text-sm text-foreground/60">Специалисты и устройства</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      <SketchIcon icon="monitor" size={48} className="inline-block mr-2" />
                      24/7
                    </div>
                    <div className="text-sm text-foreground/60">Мониторинг</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Health Modules */}
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
                title: 'Персонализация',
                description: 'Индивидуальные планы на основе ваших данных и целей',
                icon: 'brain' as const
              },
              {
                title: 'Интеграции',
                description: 'Подключение к медицинским учреждениям и устройствам',
                icon: 'network' as const
              },
              {
                title: 'Мониторинг 24/7',
                description: 'Непрерывное отслеживание показателей здоровья',
                icon: 'monitor' as const
              },
            ].map((feature, idx) => (
              <PremiumCard key={idx} delay={idx * 0.1}>
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <SketchIcon icon={feature.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </PremiumCard>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

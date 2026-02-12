import { useState } from 'react';
import { ChevronLeft, TrendingUp, Users, Globe } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';

export default function Systematization() {
  const [, setLocation] = useLocation();
  const [selectedComplex, setSelectedComplex] = useState(0);

  const complexes = [
    {
      name: 'Физический комплекс',
      icon: '💪',
      color: 'from-orange-500 to-orange-600',
      marketSize: '$2.1T',
      modules: ['Медицина', 'Питание', 'Движение'],
      description: 'Интеграция медицинской диагностики, персональной диетологии и фитнес-программ',
      marketShare: 28,
      growth: '+15% в год'
    },
    {
      name: 'Психоэмоциональный комплекс',
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      marketSize: '$1.8T',
      modules: ['Психология', 'Сон', 'Отношения'],
      description: 'Психическое здоровье, качество сна и социальные связи',
      marketShare: 24,
      growth: '+22% в год'
    },
    {
      name: 'Социальный комплекс',
      icon: '👥',
      color: 'from-pink-500 to-pink-600',
      marketSize: '$1.5T',
      modules: ['Отношения', 'Сообщество', 'Сотрудничество'],
      description: 'Укрепление социальных связей и построение здоровых отношений',
      marketShare: 20,
      growth: '+18% в год'
    },
    {
      name: 'Духовный комплекс',
      icon: '🕉️',
      color: 'from-amber-500 to-amber-600',
      marketSize: '$1.2T',
      modules: ['Духовность', 'Смысл', 'Развитие'],
      description: 'Личностный рост, смысл жизни и духовное развитие',
      marketShare: 16,
      growth: '+25% в год'
    },
    {
      name: 'Экосистемный комплекс',
      icon: '🌍',
      color: 'from-green-500 to-green-600',
      marketSize: '$2.7T',
      modules: ['Интеграция', 'Данные', 'Партнёры'],
      description: 'Объединение всех компонентов в единую экосистему здоровья',
      marketShare: 36,
      growth: '+30% в год'
    }
  ];

  const synergies = [
    {
      title: 'Синергия данных',
      description: 'Интеграция 2000+ показателей здоровья для холистического анализа',
      icon: '📊'
    },
    {
      title: 'Синергия рекомендаций',
      description: 'Персональные протоколы учитывают все 7 направлений здоровья',
      icon: '✨'
    },
    {
      title: 'Синергия партнёров',
      description: 'Экосистема 5000+ партнёров для комплексного обслуживания',
      icon: '🤝'
    },
    {
      title: 'Синергия результатов',
      description: 'Улучшение одного направления усиливает результаты в других',
      icon: '🚀'
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
        <div className="container py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">🔗 Систематизация</h1>
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
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-cyan-600/10 to-cyan-700/5 p-12 border border-border/50">
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-foreground mb-4">5 Интегрированных комплексов</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  Система взаимодействующих компонентов, охватывающих $9.3 триллиона глобального рынка здоровья
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <StatCounter value={9.3} label="Триллионов рынка" suffix="T$" delay={0.1} />
                  <StatCounter value={5} label="Комплексов" delay={0.2} />
                  <StatCounter value={7} label="Модулей здоровья" delay={0.3} />
                  <StatCounter value={2000} label="Показателей" suffix="+" delay={0.4} />
                  <StatCounter value={5000} label="Партнёров" suffix="+" delay={0.5} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Orbital Visualization */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative h-96 flex items-center justify-center mb-8">
              {/* Central hub */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-4xl shadow-2xl"
              >
                🧬
              </motion.div>

              {/* Orbiting complexes */}
              {complexes.map((complex, idx) => {
                const angle = (idx / complexes.length) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedComplex(idx)}
                    animate={{
                      x: x,
                      y: y,
                      rotate: angle * (180 / Math.PI),
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'linear',
                    }}
                    className={`absolute w-20 h-20 rounded-full flex items-center justify-center text-3xl cursor-pointer transition-all ${
                      selectedComplex === idx
                        ? 'ring-4 ring-primary shadow-lg scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, var(--color-${idx}))`,
                    }}
                  >
                    {complex.icon}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {complexes.map((complex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedComplex(idx)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedComplex === idx
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{complex.icon}</div>
                  <p className="text-xs font-semibold text-foreground">{complex.name}</p>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Selected Complex Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedComplex}
            className="mb-12"
          >
            <PremiumCard gradient={`${complexes[selectedComplex].color.replace('from-', 'from-')}/10 to-${complexes[selectedComplex].color.split(' ')[1]}/5`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{complexes[selectedComplex].name}</h3>
                  <p className="text-foreground/70">{complexes[selectedComplex].description}</p>
                </div>
                <span className="text-5xl">{complexes[selectedComplex].icon}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Размер рынка</p>
                  <p className="text-2xl font-bold text-primary">{complexes[selectedComplex].marketSize}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Доля NexusVita</p>
                  <p className="text-2xl font-bold text-primary">{complexes[selectedComplex].marketShare}%</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Годовой рост</p>
                  <p className="text-2xl font-bold text-green-500">{complexes[selectedComplex].growth}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Модули</p>
                  <p className="text-lg font-bold text-foreground">{complexes[selectedComplex].modules.length}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {complexes[selectedComplex].modules.map((module, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-semibold">
                    {module}
                  </span>
                ))}
              </div>
            </PremiumCard>
          </motion.section>

          {/* Synergies */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">Синергии системы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {synergies.map((synergy, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 border border-border/50"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{synergy.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{synergy.title}</h3>
                      <p className="text-foreground/70 text-sm">{synergy.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Market Opportunity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <PremiumCard gradient="from-green-500/10 to-green-600/5">
              <h3 className="text-2xl font-bold text-foreground mb-6">Рыночная возможность</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Общий адресуемый рынок (TAM)</p>
                  <p className="text-3xl font-bold text-primary">$9.3T</p>
                  <p className="text-xs text-foreground/60 mt-2">Глобальный рынок здоровья</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Достижимый рынок (SAM)</p>
                  <p className="text-3xl font-bold text-primary">$2.1T</p>
                  <p className="text-xs text-foreground/60 mt-2">Цифровые решения</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Целевой рынок (SOM)</p>
                  <p className="text-3xl font-bold text-primary">$150B</p>
                  <p className="text-xs text-foreground/60 mt-2">К 2030 году</p>
                </div>
              </div>
            </PremiumCard>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

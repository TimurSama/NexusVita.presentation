import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const healthModules = [
    {
      id: 'medicine',
      name: 'Медицина',
      icon: '⚕️',
      color: 'from-blue-500 to-blue-600',
      description: 'Диагностика, профилактика и лечение',
      path: '/medicine'
    },
    {
      id: 'nutrition',
      name: 'Питание',
      icon: '🥗',
      color: 'from-green-500 to-green-600',
      description: 'Персональные рекомендации по питанию',
      path: '/nutrition'
    },
    {
      id: 'movement',
      name: 'Движение',
      icon: '🏃',
      color: 'from-orange-500 to-orange-600',
      description: 'Фитнес, активность и реабилитация',
      path: '/movement'
    },
    {
      id: 'psychology',
      name: 'Психология',
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      description: 'Психическое здоровье и благополучие',
      path: '/psychology'
    },
    {
      id: 'sleep',
      name: 'Сон',
      icon: '😴',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Качество сна и восстановление',
      path: '/sleep'
    },
    {
      id: 'relationships',
      name: 'Отношения',
      icon: '💑',
      color: 'from-pink-500 to-pink-600',
      description: 'Социальные связи и общение',
      path: '/relationships'
    },
    {
      id: 'spirituality',
      name: 'Духовность',
      icon: '🕉️',
      color: 'from-amber-500 to-amber-600',
      description: 'Смысл жизни и развитие личности',
      path: '/spirituality'
    },
  ];

  const ecosystemSections = [
    {
      title: 'Систематизация',
      description: '5 комплексов здоровья и их взаимодействие',
      icon: '🔗',
      path: '/systematization',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Экономическая модель',
      description: '5 слоёв доходов и монетизация',
      icon: '💰',
      path: '/economic-model',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Дорожная карта',
      description: '5 фаз развития до $1.2B',
      icon: '🗺️',
      path: '/roadmap',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Инвестиции',
      description: 'Раунды финансирования и выходы',
      icon: '📈',
      path: '/investment',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'AI-Планировщик',
      description: '6-этапный алгоритм персонализации',
      icon: '🤖',
      path: '/ai-planner',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Токеномика',
      description: 'DAO управление и распределение',
      icon: '🪙',
      path: '/tokenomics',
      color: 'from-yellow-500 to-yellow-600'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
            <span className="text-3xl">🧬</span>
            <h1 className="text-2xl font-bold text-foreground">NexusVita</h1>
          </motion.div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-background/50 rounded-lg transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/50 backdrop-blur-sm"
          >
            <div className="container py-4 space-y-2">
              {healthModules.map(module => (
                <button
                  key={module.id}
                  onClick={() => { setLocation(module.path); setMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground"
                >
                  {module.icon} {module.name}
                </button>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                {ecosystemSections.map(section => (
                  <button
                    key={section.title}
                    onClick={() => { setLocation(section.path); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-foreground/70 hover:text-foreground text-sm"
                  >
                    {section.icon} {section.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="sketch-panel p-12 bg-gradient-to-br from-primary/10 to-primary/5 text-center mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            >
              Экосистема здоровья
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-foreground/70 mb-8"
            >
              Интегрированная платформа для комплексного развития 7 направлений здоровья
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow cursor-pointer"
            >
              Начать исследование
            </motion.div>
          </div>
        </motion.section>

        {/* Health Modules Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8">7 Модулей здоровья</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {healthModules.map((module, idx) => (
              <motion.button
                key={module.id}
                variants={itemVariants}
                onClick={() => setLocation(module.path)}
                className="sketch-panel p-6 bg-gradient-to-br from-background to-background/50 hover:shadow-lg transition-all group text-left h-full"
              >
                <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{module.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{module.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  Подробнее
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
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
          <h2 className="text-4xl font-bold text-foreground mb-8">Экосистема</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemSections.map((section, idx) => (
              <motion.button
                key={section.title}
                variants={itemVariants}
                onClick={() => setLocation(section.path)}
                className={`sketch-panel p-6 bg-gradient-to-br ${section.color} hover:shadow-xl transition-all group text-white text-left h-full`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                <p className="text-sm text-white/80 mb-4">{section.description}</p>
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  Изучить
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Ключевые показатели</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Модулей здоровья', value: '7', icon: '📊' },
              { label: 'Комплексов', value: '5', icon: '🔗' },
              { label: 'Источников дохода', value: '5', icon: '💰' },
              { label: 'Фаз развития', value: '5', icon: '🚀' },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="sketch-panel p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5"
              >
                <div className="text-4xl mb-3">{metric.icon}</div>
                <p className="text-3xl font-bold text-primary mb-2">{metric.value}</p>
                <p className="text-foreground/70 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sketch-panel p-12 bg-gradient-to-br from-primary/10 to-primary/5 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Готовы начать?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Исследуйте полную экосистему здоровья, узнайте о нашей экономической модели и инвестиционных возможностях.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation('/medicine')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Начать с модулей
            </button>
            <button
              onClick={() => setLocation('/investment')}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Узнать об инвестициях
            </button>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-16">
        <div className="container py-8 text-center text-foreground/60 text-sm">
          <p>© 2024 NexusVita. Экосистема интегрированного здоровья.</p>
        </div>
      </footer>
    </div>
  );
}

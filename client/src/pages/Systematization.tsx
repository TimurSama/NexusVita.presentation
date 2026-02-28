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
      name: 'Physical Complex',
      icon: '💪',
      color: 'from-orange-500 to-orange-600',
      marketSize: '$2.1T',
      modules: ['Medicine', 'Nutrition', 'Movement'],
      description: 'Integration of medical diagnostics, personal dietetics, and fitness programs',
      marketShare: 28,
      growth: '+15% per year'
    },
    {
      name: 'Psycho-Emotional Complex',
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      marketSize: '$1.8T',
      modules: ['Psychology', 'Sleep', 'Relationships'],
      description: 'Mental health, sleep quality, and social connections',
      marketShare: 24,
      growth: '+22% per year'
    },
    {
      name: 'Social Complex',
      icon: '👥',
      color: 'from-pink-500 to-pink-600',
      marketSize: '$1.5T',
      modules: ['Relationships', 'Community', 'Collaboration'],
      description: 'Strengthening social connections and building healthy relationships',
      marketShare: 20,
      growth: '+18% per year'
    },
    {
      name: 'Spiritual Complex',
      icon: '🕉️',
      color: 'from-amber-500 to-amber-600',
      marketSize: '$1.2T',
      modules: ['Spirituality', 'Meaning', 'Development'],
      description: 'Personal growth, life purpose, and spiritual development',
      marketShare: 16,
      growth: '+25% per year'
    },
    {
      name: 'Ecosystem Complex',
      icon: '🌍',
      color: 'from-green-500 to-green-600',
      marketSize: '$2.7T',
      modules: ['Integration', 'Data', 'Partners'],
      description: 'Uniting all components into a single health ecosystem',
      marketShare: 36,
      growth: '+30% per year'
    }
  ];

  const synergies = [
    {
      title: 'Data Synergy',
      description: 'Integration of 2000+ health indicators for holistic analysis',
      icon: '📊'
    },
    {
      title: 'Recommendation Synergy',
      description: 'Personal protocols consider all 7 health directions',
      icon: '✨'
    },
    {
      title: 'Partner Synergy',
      description: 'Ecosystem of 5000+ partners for comprehensive service',
      icon: '🤝'
    },
    {
      title: 'Results Synergy',
      description: 'Improvement in one direction enhances results in others',
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
            Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">🔗 Systematization</h1>
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
                <h2 className="text-4xl font-bold text-foreground mb-4">5 Integrated Complexes</h2>
                <p className="text-foreground/70 text-lg mb-8">
                  A system of interacting components covering $9.3 trillion of the global health market
                </p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <StatCounter value={9.3} label="Trillion Market" suffix="T$" delay={0.1} />
                  <StatCounter value={5} label="Complexes" delay={0.2} />
                  <StatCounter value={7} label="Health Modules" delay={0.3} />
                  <StatCounter value={2000} label="Indicators" suffix="+" delay={0.4} />
                  <StatCounter value={5000} label="Partners" suffix="+" delay={0.5} />
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
                  <p className="text-xs text-foreground/60 mb-1">Market Size</p>
                  <p className="text-2xl font-bold text-primary">{complexes[selectedComplex].marketSize}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">EthosLife Share</p>
                  <p className="text-2xl font-bold text-primary">{complexes[selectedComplex].marketShare}%</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Annual Growth</p>
                  <p className="text-2xl font-bold text-green-500">{complexes[selectedComplex].growth}</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-xs text-foreground/60 mb-1">Modules</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">System Synergies</h2>
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
              <h3 className="text-2xl font-bold text-foreground mb-6">Market Opportunity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Total Addressable Market (TAM)</p>
                  <p className="text-3xl font-bold text-primary">$9.3T</p>
                  <p className="text-xs text-foreground/60 mt-2">Global health market</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Serviceable Addressable Market (SAM)</p>
                  <p className="text-3xl font-bold text-primary">$2.1T</p>
                  <p className="text-xs text-foreground/60 mt-2">Digital solutions</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Serviceable Obtainable Market (SOM)</p>
                  <p className="text-3xl font-bold text-primary">$150B</p>
                  <p className="text-xs text-foreground/60 mt-2">By 2030</p>
                </div>
              </div>
            </PremiumCard>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

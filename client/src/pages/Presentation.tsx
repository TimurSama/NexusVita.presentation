import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import SketchIcon from '@/components/SketchIcon';
import { Button } from '@/components/ui/button';

export default function Presentation() {
  const [, setLocation] = useLocation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const healthAspects = [
    {
      title: 'Medical Examinations',
      icon: 'medicine' as const,
      description: 'Regular medical check-ups and tests help identify risks early.',
      details: 'Systematic monitoring of vital signs, blood tests, sugar levels, cholesterol, etc.'
    },
    {
      title: 'Sports & Fitness',
      icon: 'movement' as const,
      description: 'Regular physical activity is proven to slow down aging.',
      details: 'Exercises improve heart, blood vessels, metabolism, immunity, and muscular system.'
    },
    {
      title: 'Nutrition',
      icon: 'nutrition' as const,
      description: 'Balanced diet is the foundation of health.',
      details: 'Proper nutrition provides all necessary macro and micro elements, regulates weight.'
    },
    {
      title: 'Sleep',
      icon: 'sleep' as const,
      description: 'Quality sleep is essential for body recovery.',
      details: 'App tracks sleep patterns and provides sleep hygiene recommendations.'
    },
    {
      title: 'Mental Health',
      icon: 'psychology' as const,
      description: 'Emotional wellbeing and stress management are key to overall health.',
      details: 'Modules for mood tracking, meditation, and relaxation techniques.'
    },
    {
      title: 'Social Health',
      icon: 'relationships' as const,
      description: 'Quality of social connections directly affects health.',
      details: 'Strong social bonds extend life and improve psychological wellbeing.'
    },
    {
      title: 'Relationships & Family',
      icon: 'heart' as const,
      description: 'Quality of intimate and family relationships is crucial.',
      details: 'Section for improving family bonds, compatibility tests, trust exercises.'
    },
    {
      title: 'Habits & Lifestyle',
      icon: 'spirituality' as const,
      description: 'Healthy daily habits accumulate over years and strongly affect longevity.',
      details: 'Habit tracker with rewards for consistency.'
    },
  ];

  const howItWorks = [
    {
      title: 'Unified Bio Profile',
      description: 'Central hub with your metrics: age, height, weight, lab results, step tracker, etc.',
      icon: 'chart' as const,
    },
    {
      title: 'AI-Powered Analysis',
      description: 'System generates optimal personal wellness plan based on your data and goals.',
      icon: 'psychology' as const,
    },
    {
      title: '7 Health Modules',
      description: 'Comprehensive tracking across all health dimensions with gamification.',
      icon: 'target' as const,
    },
  ];

  const stats = [
    { value: '2,450+', label: 'Development Hours' },
    { value: '47', label: 'Database Tables' },
    { value: '7', label: 'Health Modules' },
    { value: '3', label: 'AI Providers' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              EthosLife Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              Comprehensive Health Ecosystem
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Your personal health companion combining AI, medical tracking, fitness, nutrition, 
              psychology, and social connections in one unified platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-700 hover:bg-white/90"
                onClick={() => setLocation('/register')}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => setLocation('/whitepaper')}
              >
                Read Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 8 Health Aspects */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            8 Dimensions of Health
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Holistic approach to wellness covering all aspects of your life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthAspects.map((aspect, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group"
            >
              <PremiumCard className="h-full p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SketchIcon icon={aspect.icon} size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{aspect.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{aspect.description}</p>
                <p className={`text-xs text-gray-500 transition-all duration-300 ${
                  hoveredCard === idx ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                } overflow-hidden`}>
                  {aspect.details}
                </p>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to transform your health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {idx + 1}
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <SketchIcon icon={step.icon} size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tokenomics Preview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">UNITY Token</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Earn rewards for healthy habits, stake tokens for APY, and get discounts on premium features.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold">8.5</div>
              <div className="text-white/80">UNITY per $1</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold">15%</div>
              <div className="text-white/80">Payment Bonus</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold">15-25%</div>
              <div className="text-white/80">Staking APY</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-emerald-700 hover:bg-white/90"
            onClick={() => setLocation('/tokenomics')}
          >
            Explore Tokenomics
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users transforming their health with EthosLife.
            Start free and upgrade anytime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setLocation('/register')}
            >
              <CheckCircle2 className="mr-2 w-5 h-5" />
              Create Free Account
            </Button>
            <Link href="/roadmap">
              <Button 
                size="lg" 
                variant="outline"
              >
                View Roadmap
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

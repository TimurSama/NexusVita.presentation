import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

export default function Home() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  
  const isTelegram = typeof window !== 'undefined' && (
    window.location.search.includes('tgWebAppStartParam') || 
    window.location.search.includes('tgWebAppData')
  );
  
  useEffect(() => {
    if (isTelegram) {
      setLocation('/telegram-auth');
    }
  }, [isTelegram, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-10 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Heart className="w-8 h-8" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome to EthosLife
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-2">
              Your personal health ecosystem
            </p>
            <p className="text-sm text-white/80 mb-6">
              Track, analyze, and improve your health with AI-powered insights
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {user ? (
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-white/90"
                  onClick={() => setLocation('/dashboard')}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-white text-emerald-700 hover:bg-white/90"
                    onClick={() => setLocation('/register')}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => setLocation('/login')}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Everything You Need
          </h2>
          <p className="text-sm text-gray-600">
            Comprehensive health tracking in one place
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: '7 Health Modules',
              desc: 'Track medicine, movement, nutrition, psychology, sleep, relationships, and habits',
              icon: '✨',
            },
            {
              title: 'AI Assistant',
              desc: 'Get personalized health recommendations from our advanced AI',
              icon: '🤖',
            },
            {
              title: 'Expert Support',
              desc: 'Connect with certified health specialists when you need help',
              icon: '👨‍⚕️',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center"
        >
          <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-80" />
          <h2 className="text-xl font-bold mb-2">Ready to start?</h2>
          <p className="text-sm text-white/90 mb-4">
            Join thousands of users improving their health with EthosLife
          </p>
          <Button 
            className="bg-white text-emerald-700 hover:bg-white/90"
            onClick={() => setLocation(user ? '/dashboard' : '/register')}
          >
            {user ? 'Go to Dashboard' : 'Create Free Account'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

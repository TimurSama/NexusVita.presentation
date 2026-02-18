import { BlueprintBackground, GlassBubbles, GlassGrain } from '@/components/newstyle/effects';
import {
  Hero,
  ForWhom,
  HowItWorks,
  DashboardDemo,
  Benefits,
  Pricing,
  Testimonials,
  Partners,
  FinalCTA,
} from '@/components/newstyle/sections';

export default function NewStyleLanding() {
  return (
    <div className="relative min-h-screen newstyle-landing">
      {/* Background Effects */}
      <BlueprintBackground />
      <GlassGrain />
      <GlassBubbles />

      {/* Main Content */}
      <main className="relative z-20">
        <Hero />
        <ForWhom />
        <HowItWorks />
        <DashboardDemo />
        <Benefits />
        <Pricing />
        <Testimonials />
        <Partners />
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-8 px-4 border-t border-glass-border/30">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center border border-glass-border">
              <span className="font-mono text-xs text-text-primary">EL</span>
            </div>
            <span className="font-medium text-text-primary">EthosLife</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Главная
            </a>
            <a href="/dashboard" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Дашборд
            </a>
            <a href="/health-center" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Центр здоровья
            </a>
          </div>
          
          <span className="font-mono text-xs text-text-subtle">
            © 2026 EthosLife
          </span>
        </div>
      </footer>
    </div>
  );
}

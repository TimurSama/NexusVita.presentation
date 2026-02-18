import { BlueprintBackground, GlassBubbles, GlassGrain } from './components/effects';
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
} from './components/sections';

function App() {
  return (
    <div className="relative min-h-screen">
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
              <span className="font-mono text-xs text-text-primary">GP</span>
            </div>
            <span className="font-medium text-text-primary">Glass Panel</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              О платформе
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Документация
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Поддержка
            </a>
          </div>
          
          <span className="font-mono text-xs text-text-subtle">
            © 2025 Glass Panel
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;

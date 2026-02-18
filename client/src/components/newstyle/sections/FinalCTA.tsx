import { useEffect, useRef, useState } from 'react';
import { UserPlus, Monitor, Building2 } from 'lucide-react';

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="section-container">
        {/* Large Central Glass Insert */}
        <div
          className={`glass-groove glass-groove-lg max-w-3xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-insert glass-insert-lg p-10 sm:p-16 text-center relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blueprint opacity-30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blueprint opacity-30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blueprint opacity-30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blueprint opacity-30" />

            {/* Technical Label */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-blueprint" />
              <span className="tech-label">FINAL</span>
              <div className="w-8 h-[1px] bg-blueprint" />
            </div>

            {/* Main Title - Deeply Etched */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-text-primary mb-4 tracking-tight">
              Начните сегодня
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
              Присоединяйтесь к экосистеме и откройте новые возможности
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Button 1 */}
              <div className="glass-groove glass-groove-sm">
                <button className="glass-insert glass-insert-sm px-8 py-4 flex items-center justify-center gap-3 group hover:shadow-glow">
                  <UserPlus className="w-5 h-5 text-text-etched group-hover:text-text-primary transition-colors" />
                  <span className="font-medium text-text-primary">Регистрация</span>
                </button>
              </div>

              {/* Button 2 */}
              <div className="glass-groove glass-groove-sm">
                <button className="glass-insert glass-insert-sm px-8 py-4 flex items-center justify-center gap-3 group hover:shadow-glow">
                  <Monitor className="w-5 h-5 text-text-etched group-hover:text-text-primary transition-colors" />
                  <span className="font-medium text-text-primary">Запрос демо</span>
                </button>
              </div>

              {/* Button 3 */}
              <div className="glass-groove glass-groove-sm">
                <button className="glass-insert glass-insert-sm px-8 py-4 flex items-center justify-center gap-3 group hover:shadow-glow">
                  <Building2 className="w-5 h-5 text-text-etched group-hover:text-text-primary transition-colors" />
                  <span className="font-medium text-text-primary">Подключение центра</span>
                </button>
              </div>
            </div>

            {/* Completion Indicator */}
            <div className="mt-10 pt-8 border-t border-glass-border/50">
              <div className="flex items-center justify-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blueprint opacity-40" />
                <span className="font-mono text-xs text-text-subtle">
                  Система готова к работе
                </span>
                <div className="w-2 h-2 rounded-full bg-blueprint opacity-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Technical Info */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-6 opacity-40">
            <span className="font-mono text-xs text-text-subtle">
              VER: 2.4.1
            </span>
            <div className="w-1 h-1 rounded-full bg-text-subtle" />
            <span className="font-mono text-xs text-text-subtle">
              BUILD: 2025.02.17
            </span>
            <div className="w-1 h-1 rounded-full bg-text-subtle" />
            <span className="font-mono text-xs text-text-subtle">
              STATUS: OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

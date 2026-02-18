import { useEffect, useRef, useState } from 'react';
import { 
  Plug, 
  Code2, 
  Shield, 
  Zap,
  ArrowRight
} from 'lucide-react';

const integrationPoints = [
  { icon: Plug, text: 'Простое API', ref: 'INT-01' },
  { icon: Code2, text: 'Документация', ref: 'INT-02' },
  { icon: Shield, text: 'Безопасность', ref: 'INT-03' },
  { icon: Zap, text: 'Быстрый старт', ref: 'INT-04' },
];

export function Partners() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-blueprint" />
            <span className="tech-label">Модуль 07</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Для партнёров
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Интегрируйте платформу в свои сервисы
          </p>
        </div>

        {/* Main Partner Section */}
        <div className="glass-groove max-w-4xl mx-auto">
          <div className="glass-insert p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                <span className="font-mono text-xs text-text-subtle block mb-4">
                  // API v2.0
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-light text-text-primary mb-4">
                  Программа интеграции
                </h3>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Открытый API для разработчиков и компаний. 
                  Встраивайте функционал платформы в свои продукты 
                  и создавайте новые возможности для пользователей.
                </p>

                {/* Integration Points */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {integrationPoints.map((point, index) => {
                    const Icon = point.icon;
                    return (
                      <div
                        key={point.ref}
                        className={`flex items-center gap-3 p-3 rounded-lg bg-white/30 transition-all duration-500 ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                      >
                        <Icon className="w-4 h-4 text-text-etched" />
                        <div>
                          <span className="text-sm text-text-primary block">{point.text}</span>
                          <span className="font-mono text-[10px] text-text-subtle">{point.ref}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="glass-groove glass-groove-sm inline-block">
                  <button className="glass-insert glass-insert-sm px-6 py-3 flex items-center gap-2 group">
                    <span className="font-medium text-text-primary">Стать партнёром</span>
                    <ArrowRight className="w-4 h-4 text-text-secondary group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right: Integration Schema */}
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="relative">
                  {/* Schema Visualization */}
                  <div className="aspect-square max-w-[300px] mx-auto relative">
                    {/* Center Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full p-2 bg-gradient-to-br from-white/50 to-white/20">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/70 to-white/40 flex items-center justify-center border border-glass-border">
                        <span className="font-mono text-xs text-text-primary text-center">
                          GLASS
                          <br />
                          PANEL
                        </span>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                      <defs>
                        <linearGradient id="partnerLine" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180, 190, 200, 0.3)" />
                          <stop offset="100%" stopColor="rgba(180, 190, 200, 0.1)" />
                        </linearGradient>
                      </defs>
                      {/* Lines to satellites */}
                      <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="url(#partnerLine)" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="url(#partnerLine)" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="url(#partnerLine)" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="url(#partnerLine)" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>

                    {/* Satellite Nodes */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full p-1.5 bg-gradient-to-br from-white/40 to-white/20">
                      <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-text-etched" />
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-12 h-12 rounded-full p-1.5 bg-gradient-to-br from-white/40 to-white/20">
                      <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-text-etched" />
                      </div>
                    </div>

                    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full p-1.5 bg-gradient-to-br from-white/40 to-white/20">
                      <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
                        <Plug className="w-5 h-5 text-text-etched" />
                      </div>
                    </div>

                    <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-12 h-12 rounded-full p-1.5 bg-gradient-to-br from-white/40 to-white/20">
                      <div className="w-full h-full rounded-full bg-white/50 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-text-etched" />
                      </div>
                    </div>
                  </div>

                  {/* Technical Labels */}
                  <div className="absolute -bottom-4 left-0 right-0 text-center">
                    <span className="font-mono text-xs text-text-subtle">
                      SCHEMA: integration.hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-16 h-[1px] bg-blueprint" />
            <span className="font-mono text-xs text-text-subtle">
              SDK доступен для JavaScript, Python, PHP
            </span>
            <div className="w-16 h-[1px] bg-blueprint" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { User, Stethoscope } from 'lucide-react';

export function Hero() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="section-container flex flex-col items-center">
        {/* Main Glass Groove Container */}
        <div 
          className={`glass-groove w-full max-w-5xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-insert p-8 sm:p-12 lg:p-16">
            {/* Technical Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-blueprint" />
              <span className="tech-label">Система v2.4.1</span>
              <div className="w-8 h-[1px] bg-blueprint" />
            </div>

            {/* Main Title - Etched Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-etched-deep tracking-tight leading-tight mb-6">
              Платформа для подбора
              <br />
              <span className="text-text-primary">специалистов</span>
            </h1>

            {/* Subtitle - Technical Style */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mb-4 font-light">
              Единая экосистема для пользователей, специалистов и медицинских центров
            </p>
            
            {/* Technical Annotation */}
            <p className="font-mono text-sm text-text-subtle mb-12">
              // Интегрированное решение для цифровизации записи и управления
            </p>

            {/* CTA Buttons in Individual Grooves */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Button 1 */}
              <div className="glass-groove glass-groove-sm">
                <button className="glass-insert glass-insert-sm w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 group">
                  <User className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
                  <span className="font-medium text-text-primary">Начать как пользователь</span>
                </button>
              </div>

              {/* Button 2 */}
              <div className="glass-groove glass-groove-sm">
                <button className="glass-insert glass-insert-sm w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-3 group">
                  <Stethoscope className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
                  <span className="font-medium text-text-primary">Стать специалистом</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Technical Elements */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-[1px] h-20 bg-blueprint" />
            <span className="font-mono text-xs text-text-subtle rotate-90 origin-center whitespace-nowrap">
              COORD: 45.032, 38.971
            </span>
          </div>
        </div>

        <div className="absolute bottom-32 right-10 hidden lg:block">
          <div className="flex flex-col items-end gap-2 opacity-40">
            <span className="font-mono text-xs text-text-subtle">
              REF: GP-2024-001
            </span>
            <div className="w-20 h-[1px] bg-blueprint" />
          </div>
        </div>
      </div>
    </section>
  );
}

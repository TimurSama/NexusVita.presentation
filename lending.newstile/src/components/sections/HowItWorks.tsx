import { useEffect, useRef, useState } from 'react';
import { UserPlus, Search, MessageSquare, CreditCard, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Регистрация',
    description: 'Создайте аккаунт за 2 минуты',
    ref: 'STEP-01',
  },
  {
    icon: Search,
    title: 'Подбор',
    description: 'Найдите подходящего специалиста',
    ref: 'STEP-02',
  },
  {
    icon: MessageSquare,
    title: 'Взаимодействие',
    description: 'Запишитесь на приём онлайн',
    ref: 'STEP-03',
  },
  {
    icon: CreditCard,
    title: 'Подписка',
    description: 'Выберите удобный тариф',
    ref: 'STEP-04',
  },
  {
    icon: TrendingUp,
    title: 'Монетизация',
    description: 'Развивайте свой бизнес',
    ref: 'STEP-05',
  },
];

export function HowItWorks() {
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
            <span className="tech-label">Модуль 02</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Как работает экосистема
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Пять простых шагов от регистрации до масштабирования
          </p>
        </div>

        {/* Main Flow Container */}
        <div className="glass-groove">
          <div className="glass-insert p-6 sm:p-10">
            {/* Connection Lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(180, 190, 200, 0.2)" />
                  <stop offset="50%" stopColor="rgba(180, 190, 200, 0.4)" />
                  <stop offset="100%" stopColor="rgba(180, 190, 200, 0.2)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Steps Grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div
                    key={step.ref}
                    className={`relative transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    {/* Connection Line (not for last item) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-12 left-full w-full h-[1px]">
                        <div className="w-full h-full bg-gradient-to-r from-blueprint via-blueprint to-transparent opacity-40" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-blueprint rotate-45 opacity-40" />
                      </div>
                    )}

                    {/* Step Card */}
                    <div className="glass-groove glass-groove-sm">
                      <div className="glass-insert glass-insert-sm p-5 text-center group hover:shadow-glow transition-all duration-300">
                        {/* Step Number */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-white/60 to-white/30 flex items-center justify-center border border-glass-border">
                          <span className="font-mono text-xs text-text-subtle">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Reference */}
                        <span className="font-mono text-xs text-text-subtle block mb-3">
                          {step.ref}
                        </span>

                        {/* Icon */}
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-text-etched" />
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-medium text-text-primary mb-2">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Flow Indicator */}
            <div className="mt-10 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blueprint to-transparent" />
                <span className="font-mono text-xs text-text-subtle">
                  Циклический процесс
                </span>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blueprint to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Notes */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blueprint opacity-50" />
            <span className="font-mono text-xs text-text-subtle">
              Интеграция API доступна
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blueprint opacity-50" />
            <span className="font-mono text-xs text-text-subtle">
              SLA: 99.9% uptime
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blueprint opacity-50" />
            <span className="font-mono text-xs text-text-subtle">
              Шифрование данных
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

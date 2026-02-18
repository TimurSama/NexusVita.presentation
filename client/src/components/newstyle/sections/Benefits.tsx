import { useEffect, useRef, useState } from 'react';
import { 
  UserCheck, 
  CalendarCheck, 
  History, 
  Sparkles,
  CalendarDays,
  Settings,
  BarChart3,
  UserPlus
} from 'lucide-react';

const userBenefits = [
  { icon: UserCheck, text: 'Проверенные специалисты' },
  { icon: CalendarCheck, text: 'Удобная запись онлайн' },
  { icon: History, text: 'История визитов' },
  { icon: Sparkles, text: 'Персональные рекомендации' },
];

const proBenefits = [
  { icon: CalendarDays, text: 'Управление расписанием' },
  { icon: Settings, text: 'Автоматизация процессов' },
  { icon: BarChart3, text: 'Аналитика и отчёты' },
  { icon: UserPlus, text: 'Рост клиентской базы' },
];

export function Benefits() {
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
            <span className="tech-label">Модуль 04</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Преимущества подписки
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Выгоды для каждого участника экосистемы
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Column */}
          <div
            className={`glass-groove transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="glass-insert p-6 sm:p-8 h-full">
              {/* Column Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-text-etched" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary">Пользователь</h3>
                  <span className="font-mono text-xs text-text-subtle">ROLE: USER</span>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {userBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-white/30 transition-all duration-500 hover:bg-white/50 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-text-etched" />
                      </div>
                      <span className="text-text-primary">{benefit.text}</span>
                      
                      {/* Technical Line */}
                      <div className="ml-auto hidden sm:block">
                        <div className="w-8 h-[1px] bg-blueprint opacity-40" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Blueprint Decoration */}
              <div className="mt-6 pt-6 border-t border-glass-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-subtle">
                    Доступно в тарифе: Базовый
                  </span>
                  <div className="w-4 h-4 border border-blueprint opacity-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Column */}
          <div
            className={`glass-groove transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="glass-insert p-6 sm:p-8 h-full">
              {/* Column Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/50 to-white/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-text-etched" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-text-primary">Специалист / Центр</h3>
                  <span className="font-mono text-xs text-text-subtle">ROLE: PRO / ORG</span>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {proBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-white/30 transition-all duration-500 hover:bg-white/50 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${350 + index * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-text-etched" />
                      </div>
                      <span className="text-text-primary">{benefit.text}</span>
                      
                      {/* Technical Line */}
                      <div className="ml-auto hidden sm:block">
                        <div className="w-8 h-[1px] bg-blueprint opacity-40" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Blueprint Decoration */}
              <div className="mt-6 pt-6 border-t border-glass-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-subtle">
                    Доступно в тарифе: Профессиональный
                  </span>
                  <div className="w-4 h-4 border border-blueprint opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Line Between Columns */}
        <div className="hidden lg:flex items-center justify-center mt-8">
          <div className="flex items-center gap-4">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blueprint to-transparent" />
            <span className="font-mono text-xs text-text-subtle">
              Синхронизация данных
            </span>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blueprint to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

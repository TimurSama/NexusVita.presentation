import { useEffect, useRef, useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, CheckCircle, Shield } from 'lucide-react';

const dashboardFeatures = [
  { icon: Calendar, label: 'Управление расписанием', ref: 'FTR-01' },
  { icon: Users, label: 'База клиентов', ref: 'FTR-02' },
  { icon: TrendingUp, label: 'Аналитика', ref: 'FTR-03' },
  { icon: Clock, label: 'Автоматические напоминания', ref: 'FTR-04' },
  { icon: CheckCircle, label: 'Подтверждение записей', ref: 'FTR-05' },
  { icon: Shield, label: 'Защита данных', ref: 'FTR-06' },
];

export function DashboardDemo() {
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
      { threshold: 0.15 }
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
            <span className="tech-label">Модуль 03</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Интерфейс платформы
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Интуитивная панель управления для всех участников экосистемы
          </p>
        </div>

        {/* Large Central Groove with Dashboard */}
        <div 
          className={`glass-groove glass-groove-lg transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-insert glass-insert-lg p-4 sm:p-6">
            {/* Dashboard Mockup */}
            <div className="relative bg-gradient-to-br from-white/40 to-white/20 rounded-2xl overflow-hidden border border-glass-border">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-glass-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <span className="font-mono text-xs text-text-subtle">
                  dashboard.glass-panel.io
                </span>
              </div>

              {/* Dashboard Content */}
              <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Sidebar */}
                <div className="hidden lg:block lg:col-span-1 space-y-3">
                  <div className="h-10 rounded-lg bg-white/30 flex items-center px-4">
                    <span className="text-sm text-text-secondary">Главная</span>
                  </div>
                  <div className="h-10 rounded-lg bg-white/50 flex items-center px-4">
                    <span className="text-sm text-text-primary font-medium">Расписание</span>
                  </div>
                  <div className="h-10 rounded-lg bg-white/30 flex items-center px-4">
                    <span className="text-sm text-text-secondary">Клиенты</span>
                  </div>
                  <div className="h-10 rounded-lg bg-white/30 flex items-center px-4">
                    <span className="text-sm text-text-secondary">Аналитика</span>
                  </div>
                  <div className="h-10 rounded-lg bg-white/30 flex items-center px-4">
                    <span className="text-sm text-text-secondary">Настройки</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-white/40">
                      <span className="font-mono text-xs text-text-subtle block mb-1">Записи</span>
                      <span className="text-2xl font-light text-text-primary">24</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/40">
                      <span className="font-mono text-xs text-text-subtle block mb-1">Клиенты</span>
                      <span className="text-2xl font-light text-text-primary">156</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/40">
                      <span className="font-mono text-xs text-text-subtle block mb-1">Выручка</span>
                      <span className="text-2xl font-light text-text-primary">89K</span>
                    </div>
                  </div>

                  {/* Calendar Placeholder */}
                  <div className="p-4 rounded-xl bg-white/30 min-h-[200px]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-text-primary">Расписание на неделю</span>
                      <span className="font-mono text-xs text-text-subtle">Февраль 2025</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                        <div key={day} className="text-center">
                          <span className="text-xs text-text-subtle">{day}</span>
                        </div>
                      ))}
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                            i === 16
                              ? 'bg-white/60 text-text-primary font-medium'
                              : 'bg-white/20 text-text-secondary'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blueprint Annotations */}
              <div className="absolute top-20 -left-16 hidden xl:block">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-[1px] bg-blueprint" />
                  <span className="font-mono text-xs text-text-subtle whitespace-nowrap">
                    VIEW: main.dashboard
                  </span>
                </div>
              </div>

              <div className="absolute bottom-20 -right-20 hidden xl:block">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-text-subtle whitespace-nowrap">
                    RES: 1440x900
                  </span>
                  <div className="w-12 h-[1px] bg-blueprint" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Below */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {dashboardFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.ref}
                className={`glass-groove glass-groove-sm transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${400 + index * 80}ms` }}
              >
                <div className="glass-insert glass-insert-sm p-4 text-center group hover:shadow-glow transition-all duration-300">
                  <Icon className="w-5 h-5 mx-auto mb-2 text-text-etched group-hover:text-text-primary transition-colors" />
                  <span className="text-xs text-text-secondary leading-tight block">
                    {feature.label}
                  </span>
                  <span className="font-mono text-[10px] text-text-subtle mt-1 block">
                    {feature.ref}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

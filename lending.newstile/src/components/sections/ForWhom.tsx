import { useEffect, useRef, useState } from 'react';
import { Users, Stethoscope, Building2, Store } from 'lucide-react';

const audienceItems = [
  {
    icon: Users,
    title: 'Пользователи',
    description: 'Находите проверенных специалистов и записывайтесь онлайн',
    ref: 'USR-01',
  },
  {
    icon: Stethoscope,
    title: 'Специалисты',
    description: 'Принимайте клиентов и управляйте расписанием',
    ref: 'SPC-02',
  },
  {
    icon: Building2,
    title: 'Центры',
    description: 'Цифровизируйте процессы и масштабируйте бизнес',
    ref: 'CTR-03',
  },
  {
    icon: Store,
    title: 'Партнёры',
    description: 'Интегрируйте сервисы и расширяйте возможности',
    ref: 'PRT-04',
  },
];

export function ForWhom() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger animation for items
          audienceItems.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
          });
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
            <span className="tech-label">Модуль 01</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep">
            Кому подходит
          </h2>
        </div>

        {/* Main Glass Plate with 4 Cells */}
        <div className="glass-groove">
          <div className="glass-insert p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {audienceItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.ref}
                    className={`glass-groove glass-groove-sm transition-all duration-700 ${
                      visibleItems[index]
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="glass-insert glass-insert-sm p-6 h-full flex flex-col group hover:shadow-glow transition-all duration-300">
                      {/* Reference Code */}
                      <span className="font-mono text-xs text-text-subtle mb-4">
                        // {item.ref}
                      </span>
                      
                      {/* Icon - Etched */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-text-etched" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-medium text-text-primary mb-2">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                        {item.description}
                      </p>
                      
                      {/* Decorative Corner */}
                      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-blueprint opacity-30" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Annotation */}
        <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
          <div className="w-16 h-[1px] bg-blueprint" />
          <span className="font-mono text-xs text-text-subtle">
            Все модули интегрированы в единую экосистему
          </span>
          <div className="w-16 h-[1px] bg-blueprint" />
        </div>
      </div>
    </section>
  );
}

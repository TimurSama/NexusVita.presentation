import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Базовый',
    ref: 'PLN-BSC',
    price: '0',
    period: 'навсегда',
    description: 'Для знакомства с платформой',
    features: [
      'Поиск специалистов',
      'Онлайн-запись',
      'История посещений',
      'Базовые уведомления',
    ],
    highlighted: false,
  },
  {
    name: 'Профессиональный',
    ref: 'PLN-PRO',
    price: '990',
    period: '/мес',
    description: 'Для специалистов',
    features: [
      'Всё из Базового',
      'Управление расписанием',
      'CRM клиентов',
      'Аналитика',
      'Приоритетная поддержка',
    ],
    highlighted: true,
  },
  {
    name: 'Бизнес',
    ref: 'PLN-BIZ',
    price: '2 990',
    period: '/мес',
    description: 'Для центров и клиник',
    features: [
      'Всё из Профессионального',
      'Мультипользовательский доступ',
      'API интеграция',
      'White-label решение',
      'Выделенный менеджер',
    ],
    highlighted: false,
  },
];

export function Pricing() {
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
            <span className="tech-label">Модуль 05</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Тарифы
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Выберите подходящий план для ваших задач
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.ref}
              className={`glass-groove transition-all duration-700 ${
                plan.highlighted ? 'glass-groove-lg' : 'glass-groove-sm'
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`glass-insert ${
                  plan.highlighted ? 'glass-insert-lg' : 'glass-insert-sm'
                } p-6 h-full flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-white/60 to-white/30'
                    : ''
                }`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-text-subtle">
                      {plan.ref}
                    </span>
                    {plan.highlighted && (
                      <span className="px-2 py-1 rounded-full bg-white/50 text-xs font-medium text-text-primary">
                        Популярный
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-text-primary mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-text-secondary">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-glass-border/50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-light text-etched-deep">
                      {plan.price}
                    </span>
                    <span className="text-lg text-text-subtle">₽</span>
                    <span className="text-sm text-text-subtle ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-text-etched" />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-text-primary text-white hover:bg-text-primary/90'
                      : 'glass-button'
                  }`}
                >
                  Выбрать
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/30">
            <div className="w-2 h-2 rounded-full bg-blueprint opacity-50" />
            <span className="font-mono text-xs text-text-subtle">
              Все тарифы включают базовое шифрование и резервное копирование
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Анна Морозова',
    role: 'Пользователь',
    avatar: 'АМ',
    ref: 'REV-001',
    rating: 5,
    text: 'Нашла отличного специалиста за 10 минут. Запись онлайн — огромная экономия времени. Рекомендую всем!',
  },
  {
    name: 'Дмитрий Волков',
    role: 'Специалист',
    avatar: 'ДВ',
    ref: 'REV-002',
    rating: 5,
    text: 'Платформа полностью изменила мой рабочий процесс. Теперь у меня больше клиентов и меньше хлопот с расписанием.',
  },
  {
    name: 'Елена Соколова',
    role: 'Директор клиники',
    avatar: 'ЕС',
    ref: 'REV-003',
    rating: 5,
    text: 'Внедрили систему в наш центр. Эффективность выросла на 40%. Отличная аналитика и поддержка.',
  },
];

export function Testimonials() {
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
            <span className="tech-label">Модуль 06</span>
            <div className="w-12 h-[1px] bg-blueprint" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-etched-deep mb-4">
            Отзывы
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Что говорят участники экосистемы
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.ref}
              className={`glass-groove glass-groove-sm transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="glass-insert glass-insert-sm p-6 h-full flex flex-col">
                {/* Reference */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-text-subtle">
                    {testimonial.ref}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400/60 text-yellow-400/60"
                      />
                    ))}
                  </div>
                </div>

                {/* Avatar and Name */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Circular Avatar Groove */}
                  <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-br from-white/40 to-white/20">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white/60 to-white/30 flex items-center justify-center border border-glass-border">
                      <span className="text-sm font-medium text-text-primary">
                        {testimonial.avatar}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">
                      {testimonial.name}
                    </h4>
                    <span className="text-xs text-text-secondary">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Decorative Element */}
                <div className="mt-4 pt-4 border-t border-glass-border/30 flex items-center justify-between">
                  <div className="w-6 h-[1px] bg-blueprint opacity-40" />
                  <div className="w-2 h-2 rounded-full bg-blueprint opacity-30" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-light text-etched-deep mb-1">4.9</div>
            <div className="font-mono text-xs text-text-subtle">Средний рейтинг</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-etched-deep mb-1">2.5K+</div>
            <div className="font-mono text-xs text-text-subtle">Отзывов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-etched-deep mb-1">98%</div>
            <div className="font-mono text-xs text-text-subtle">Рекомендуют</div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useLocation } from 'wouter';

interface Complex {
  id: string;
  name: string;
  emoji: string;
  description: string;
  marketSize: string;
  elements: string[];
  details: string;
}

export default function Systematization() {
  const [, setLocation] = useLocation();
  const [selectedComplex, setSelectedComplex] = useState<Complex | null>(null);

  const complexes: Complex[] = [
    {
      id: 'biological',
      name: 'Биологический комплекс',
      emoji: '🧬',
      description: 'Фундамент системной устойчивости организма',
      marketSize: '$2.3 трлн',
      elements: ['Метаболизм', 'Гормональный фон', 'Сон', 'Питание', 'Физическая активность', 'Восстановление'],
      details: 'Включает все физиологические процессы, обеспечивающие жизнедеятельность организма. Интегрирует данные о метаболизме, гормональном статусе, качестве сна и физической активности для создания персональных рекомендаций по питанию и тренировкам.'
    },
    {
      id: 'psycho',
      name: 'Психоэмоциональный комплекс',
      emoji: '🧠',
      description: 'Стресс-реакции, эмоциональная устойчивость',
      marketSize: '$1.8 трлн',
      elements: ['Стресс-реакции', 'Тревожность', 'Мотивация', 'Эмоциональная устойчивость', 'Когнитивная нагрузка'],
      details: 'Управляет психоэмоциональным состоянием через мониторинг уровня кортизола, анализ стресс-реакций и предоставление персональных техник релаксации, медитации и психотерапевтической поддержки.'
    },
    {
      id: 'cognitive',
      name: 'Когнитивный комплекс',
      emoji: '🎯',
      description: 'Концентрация, память и стратегическое мышление',
      marketSize: '$850 млрд',
      elements: ['Концентрация', 'Обучаемость', 'Память', 'Стратегическое мышление'],
      details: 'Оптимизирует когнитивные функции через персональные тренировки, анализ фокуса и предоставление техник улучшения памяти, скорости обработки информации и стратегического мышления.'
    },
    {
      id: 'social',
      name: 'Социальный комплекс',
      emoji: '👥',
      description: 'Окружение, поддержка и участие в сообществе',
      marketSize: '$1.2 трлн',
      elements: ['Окружение', 'Уровень поддержки', 'Цифровое взаимодействие', 'Участие в сообществах'],
      details: 'Создаёт социальную экосистему через интеграцию с социальными сетями, организацию челленджей, поддержку групп по интересам и мониторинг качества социальных взаимодействий.'
    },
    {
      id: 'infrastructure',
      name: 'Инфраструктурный комплекс',
      emoji: '🏥',
      description: 'Специалисты, клиники и инновационные решения',
      marketSize: '$3.1 трлн',
      elements: ['Специалисты', 'Клиники', 'Магазины', 'Лаборатории', 'Исследования', 'Инновации'],
      details: 'Интегрирует экосистему поставщиков услуг здоровья: врачей, клиник, лабораторий, магазинов здоровых продуктов и инновационных решений для предоставления комплексного доступа к ресурсам.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Систематизация экосистемы</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">5 Системных комплексов здоровья</h2>
            <p className="text-foreground/70 mb-6">
              NexusVita организует все аспекты здоровья в 5 взаимосвязанных комплексов, каждый из которых охватывает определённый сегмент рынка и предоставляет специализированные услуги и рекомендации.
            </p>
            <p className="text-foreground/70 mb-6">
              Общий размер адресуемого рынка: <span className="font-bold text-primary">$9.3 трлн</span> в год
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {complexes.map(complex => (
              <div
                key={complex.id}
                onClick={() => setSelectedComplex(complex)}
                className="sketch-panel p-6 cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary transition-all"
              >
                <div className="text-5xl mb-4">{complex.emoji}</div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{complex.name}</h3>
                <p className="text-xs text-foreground/70 mb-4">{complex.description}</p>
                <p className="text-lg font-bold text-primary">{complex.marketSize}</p>
              </div>
            ))}
          </div>

          <div className="sketch-panel p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Системные взаимосвязи</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Биологический ↔ Психоэмоциональный',
                  desc: 'Гормональный фон влияет на эмоции, стресс влияет на метаболизм'
                },
                {
                  title: 'Когнитивный ↔ Социальный',
                  desc: 'Когнитивные функции влияют на качество социальных взаимодействий'
                },
                {
                  title: 'Все комплексы ↔ Инфраструктурный',
                  desc: 'Инфраструктура поддерживает все остальные комплексы специалистами и услугами'
                },
                {
                  title: 'Сон ↔ Все комплексы',
                  desc: 'Качество сна влияет на все аспекты здоровья и восстановления'
                },
              ].map((connection, idx) => (
                <div key={idx} className="sketch-panel p-4 bg-gradient-to-br from-primary/5 to-primary/2">
                  <h4 className="font-bold text-foreground mb-2">{connection.title}</h4>
                  <p className="text-sm text-foreground/70">{connection.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-panel p-8 mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Анализ рынка</h3>
            <div className="space-y-6">
              {complexes.map(complex => (
                <div key={complex.id} className="sketch-panel p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-foreground">{complex.emoji} {complex.name}</span>
                    <span className="text-lg font-bold text-primary">{complex.marketSize}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{
                        width: complex.id === 'infrastructure' ? '33%' : complex.id === 'biological' ? '25%' : '20%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedComplex && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="sketch-panel bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedComplex.emoji}</span>
                <h3 className="text-2xl font-bold text-foreground">{selectedComplex.name}</h3>
              </div>
              <button
                onClick={() => setSelectedComplex(null)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-2">Описание</h4>
                <p className="text-foreground/70">{selectedComplex.details}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-foreground mb-3">Ключевые элементы</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedComplex.elements.map((element, idx) => (
                    <div key={idx} className="sketch-panel p-3 bg-gradient-to-br from-primary/5 to-primary/2">
                      <p className="text-sm font-semibold text-foreground">{element}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sketch-panel p-4 bg-gradient-to-br from-primary/5 to-primary/2">
                <p className="text-sm text-foreground/70 mb-2">
                  <span className="font-bold text-primary">Размер рынка:</span> {selectedComplex.marketSize}
                </p>
                <p className="text-xs text-foreground/60">
                  Этот комплекс обслуживает значительную часть глобального рынка здоровья и благополучия
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

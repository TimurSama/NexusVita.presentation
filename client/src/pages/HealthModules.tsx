import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HealthData {
  age: number;
  height: number;
  weight: number;
  bodyType: string;
  activityLevel: number;
  activityIntensity: string;
  sleepStart: string;
  sleepEnd: string;
  sleepQuality: number;
  stress: number;
  anxiety: number;
  motivation: number;
  focus: number;
  memory: number;
  socialConnections: number;
  communityParticipation: number;
}

interface ExpandedModules {
  [key: string]: boolean;
}

export default function HealthModules() {
  const [expandedModules, setExpandedModules] = useState<ExpandedModules>({
    physical: true,
    psycho: false,
    cognitive: false,
    social: false,
  });

  const [healthData, setHealthData] = useState<HealthData>({
    age: 30,
    height: 175,
    weight: 75,
    bodyType: 'mesomorph',
    activityLevel: 3,
    activityIntensity: 'moderate',
    sleepStart: '23:00',
    sleepEnd: '07:00',
    sleepQuality: 7,
    stress: 5,
    anxiety: 4,
    motivation: 7,
    focus: 6,
    memory: 7,
    socialConnections: 5,
    communityParticipation: 3,
  });

  const toggleModule = (module: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setHealthData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const modules = [
    {
      id: 'physical',
      title: 'Физическое здоровье',
      icon: '💪',
      color: 'text-primary',
      description: 'Фундамент системной устойчивости организма',
      sections: [
        {
          name: 'Антропометрия',
          fields: [
            { label: 'Возраст', key: 'age', type: 'number', min: 1, max: 120 },
            { label: 'Рост (см)', key: 'height', type: 'number', min: 100, max: 250 },
            { label: 'Вес (кг)', key: 'weight', type: 'number', min: 30, max: 300 },
            {
              label: 'Тип телосложения',
              key: 'bodyType',
              type: 'select',
              options: [
                { value: 'ectomorph', label: 'Эктоморф' },
                { value: 'mesomorph', label: 'Мезоморф' },
                { value: 'endomorph', label: 'Эндоморф' },
                { value: 'hybrid', label: 'Гибридный' },
              ],
            },
          ],
        },
        {
          name: 'Активность и цель',
          fields: [
            { label: 'Уровень активности (раз/неделю)', key: 'activityLevel', type: 'range', min: 0, max: 7 },
            {
              label: 'Интенсивность',
              key: 'activityIntensity',
              type: 'select',
              options: [
                { value: 'light', label: 'Лёгкая' },
                { value: 'moderate', label: 'Умеренная' },
                { value: 'high', label: 'Высокая' },
              ],
            },
          ],
        },
        {
          name: 'Сон',
          fields: [
            { label: 'Время засыпания', key: 'sleepStart', type: 'time' },
            { label: 'Время пробуждения', key: 'sleepEnd', type: 'time' },
            { label: 'Качество сна (1-10)', key: 'sleepQuality', type: 'range', min: 1, max: 10 },
          ],
        },
      ],
    },
    {
      id: 'psycho',
      title: 'Психоэмоциональное здоровье',
      icon: '🧠',
      color: 'text-secondary',
      description: 'Стресс-реакции, эмоциональная устойчивость и мотивация',
      sections: [
        {
          name: 'Эмоциональное состояние',
          fields: [
            { label: 'Уровень стресса (1-10)', key: 'stress', type: 'range', min: 1, max: 10 },
            { label: 'Тревожность (1-10)', key: 'anxiety', type: 'range', min: 1, max: 10 },
            { label: 'Мотивация (1-10)', key: 'motivation', type: 'range', min: 1, max: 10 },
          ],
        },
      ],
    },
    {
      id: 'cognitive',
      title: 'Когнитивное здоровье',
      icon: '🎯',
      color: 'text-primary',
      description: 'Концентрация, память и стратегическое мышление',
      sections: [
        {
          name: 'Когнитивные функции',
          fields: [
            { label: 'Фокус (1-10)', key: 'focus', type: 'range', min: 1, max: 10 },
            { label: 'Память (1-10)', key: 'memory', type: 'range', min: 1, max: 10 },
          ],
        },
      ],
    },
    {
      id: 'social',
      title: 'Социальное здоровье',
      icon: '👥',
      color: 'text-secondary',
      description: 'Окружение, поддержка и участие в сообществе',
      sections: [
        {
          name: 'Социальные связи',
          fields: [
            { label: 'Количество близких контактов', key: 'socialConnections', type: 'range', min: 0, max: 20 },
            { label: 'Участие в сообществе (1-10)', key: 'communityParticipation', type: 'range', min: 0, max: 10 },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <h1 className="text-2xl font-bold text-foreground">Модули здоровья</h1>
          <p className="text-sm text-foreground/60 mt-1">Интерактивная диагностика</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {modules.map(module => (
            <div key={module.id} className="sketch-panel overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${module.color}`}>{module.title}</h3>
                    <p className="text-sm text-foreground/60">{module.description}</p>
                  </div>
                </div>
                {expandedModules[module.id] ? (
                  <ChevronUp className="w-6 h-6 text-foreground/60" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-foreground/60" />
                )}
              </button>

              {/* Module Content */}
              {expandedModules[module.id] && (
                <div className="border-t border-border px-6 py-6 space-y-8">
                  {module.sections.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg font-semibold text-foreground mb-4">{section.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.fields.map(field => (
                          <div key={field.key} className="flex flex-col">
                            <label className="text-sm font-medium text-foreground mb-2">
                              {field.label}
                            </label>

                            {field.type === 'number' && (
                              <input
                                type="number"
                                value={healthData[field.key as keyof HealthData]}
                                onChange={e => handleInputChange(field.key, parseInt(e.target.value))}
                                min={field.min}
                                max={field.max}
                                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            )}

                            {field.type === 'time' && (
                              <input
                                type="time"
                                value={healthData[field.key as keyof HealthData]}
                                onChange={e => handleInputChange(field.key, e.target.value)}
                                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            )}

                            {field.type === 'range' && (
                              <div className="flex items-center gap-4">
                                <input
                                  type="range"
                                  value={healthData[field.key as keyof HealthData]}
                                  onChange={e => handleInputChange(field.key, parseInt(e.target.value))}
                                  min={field.min}
                                  max={field.max}
                                  className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-sm font-semibold text-foreground w-12 text-right">
                                  {healthData[field.key as keyof HealthData]}
                                </span>
                              </div>
                            )}

                            {field.type === 'select' && 'options' in field && field.options && (
                              <select
                                value={healthData[field.key as keyof HealthData]}
                                onChange={e => handleInputChange(field.key, e.target.value)}
                                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              >
                                {field.options!.map((opt: { value: string; label: string }) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Summary Section */}
          <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="text-xl font-bold text-foreground mb-4">Ваш профиль здоровья</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-foreground/60 mb-2">BMI</p>
                <p className="text-2xl font-bold text-primary">
                  {(healthData.weight / ((healthData.height / 100) ** 2)).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Часов сна</p>
                <p className="text-2xl font-bold text-secondary">
                  {Math.round((parseInt(healthData.sleepEnd.split(':')[0]) - parseInt(healthData.sleepStart.split(':')[0]) + 24) % 24)}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Средний стресс</p>
                <p className="text-2xl font-bold text-primary">{healthData.stress}/10</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-2">Когнитивный индекс</p>
                <p className="text-2xl font-bold text-secondary">
                  {Math.round((healthData.focus + healthData.memory) / 2)}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <button className="btn-sketch bg-primary text-white">
              Получить персональный план
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

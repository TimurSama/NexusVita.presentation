import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Activity, TrendingUp, Users } from 'lucide-react';
import { useLocation } from 'wouter';

type ViewMode = 'user' | 'partner' | 'investor';

export default function Home() {
  const [mode, setMode] = useState<ViewMode>('user');
  const [, setLocation] = useLocation();

  const heroImageUrl = 'https://private-us-east-1.manuscdn.com/sessionFile/T54MGYBG8qUMdiAh9EYSMQ/sandbox/dKcMJDDmuFBPFb8n1jhBju-img-1_1770810157000_na1fn_aGVyby1iZy1tYWlu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDU0TUdZQkc4cVVNZGlBaDlFWVNNUS9zYW5kYm94L2RLY01KRERtdUZCUEZiOG4xamhCanUtaW1nLTFfMTc3MDgxMDE1NzAwMF9uYTFmbl9hR1Z5YnkxaVp5MXRZV2x1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=J5C9mxi-GF5lnDFT6f8xwTGE1NVjuvXE1oVonvNxx4m6cftsMWNlTAI2OJdqsT-0SgMyy~1MJMg-ekKwO3m1NlIFH3mliFwNhBQrkGavKFX2d8fDGagrRyUCwMxPb7jpnBZKGJyucv3QSX61VkjIq7GyZic5jxIECnSU6bwlbrbgvSXZh7LuajwWQE2EWJwoAr8D7wS8N7PYlZdNKtWY7ISwr36yB56DN2q1zTyTvzXTkM0QYOtbz6BY98kBnIw0gcIvubI6p2iuesjRj7UTD0pz0kW1hkqlaQ79568qOkjO~i4i2TjQa7QmiYZAC6QyVfckBWCrQhpVQ9b-Y7rAuw__';
  const healthModulesImageUrl = 'https://private-us-east-1.manuscdn.com/sessionFile/T54MGYBG8qUMdiAh9EYSMQ/sandbox/dKcMJDDmuFBPFb8n1jhBju-img-2_1770810154000_na1fn_aGVhbHRoLW1vZHVsZXMtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVDU0TUdZQkc4cVVNZGlBaDlFWVNNUS9zYW5kYm94L2RLY01KRERtdUZCUEZiOG4xamhCanUtaW1nLTJfMTc3MDgxMDE1NDAwMF9uYTFmbl9hR1ZoYkhSb0xXMXZaSFZzWlhNdFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=GzsSXloM2R0uKJITpvOJVGG~gdi53dpfHXCvgLBc-Ux324I7zuqMPuRXF9vd93-5nXPmjrO2AyTmPn6nfGLo4so2zpjs3T~xZ8yPESrLhwonbrrWZAduAkOP9qo6964uUdHigL5GlnsGbP~l3ciAkEzWNUyFoklvIxzH-P9u0KJGpVvvWH6kmU-XT-2SukMrQwubobglFWVCM9yjUmjFxGq3-LtREJA45lSw6g0IAbNtVw68LemDcmfh0ipEeWcRe3av0lemdFqSbEiLMQjXqWNXMwNgxM5D3AxJ1ERj9c2jzG0tfgjo~39lOsr5mHl2pdtCRbwkPKKyZ-v8BvyUyQ__';

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Mode Switcher */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                NV
              </div>
              <h1 className="text-xl font-bold text-foreground">NexusVita</h1>
            </button>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button
                onClick={() => setLocation('/systematization')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Систематизация
              </button>
              <button
                onClick={() => setLocation('/modules')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Модули
              </button>
              <button
                onClick={() => setLocation('/economic')}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                Экономика
              </button>
            </nav>
          </div>
          
          <div className="mode-switcher">
            <button
              onClick={() => setMode('user')}
              className={`mode-button ${mode === 'user' ? 'active' : ''}`}
            >
              👤 User
            </button>
            <button
              onClick={() => setMode('partner')}
              className={`mode-button ${mode === 'partner' ? 'active' : ''}`}
            >
              🤝 Partner
            </button>
            <button
              onClick={() => setMode('investor')}
              className={`mode-button ${mode === 'investor' ? 'active' : ''}`}
            >
              📈 Investor
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />

        <div className="container relative z-20 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nexus Vita
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-4 font-medium">
              Системная экосистема управления здоровьем, средой и потенциалом человека
            </p>
            <p className="text-base md:text-lg text-foreground/70 mb-8">
              Платформа, объединяющая физическое, психоэмоциональное, когнитивное и социальное здоровье в единую цифровую архитектуру.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="sketch-panel p-4">
                <p className="text-sm font-semibold text-primary mb-2">Персонализация</p>
                <p className="text-xs text-foreground/70">на основе данных</p>
              </div>
              <div className="sketch-panel p-4">
                <p className="text-sm font-semibold text-secondary mb-2">Интеграция</p>
                <p className="text-xs text-foreground/70">специалистов и бизнеса</p>
              </div>
              <div className="sketch-panel p-4">
                <p className="text-sm font-semibold text-primary mb-2">AI-алгоритмы</p>
                <p className="text-xs text-foreground/70">адаптивного планирования</p>
              </div>
              <div className="sketch-panel p-4">
                <p className="text-sm font-semibold text-secondary mb-2">Маркетплейс</p>
                <p className="text-xs text-foreground/70">решений</p>
              </div>
            </div>

            <button
              onClick={() => setLocation('/modules')}
              className="btn-sketch bg-primary text-white mb-8 inline-block"
            >
              Начать персональную диагностику
            </button>

            {/* Micro Indicators */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-foreground/80">7 модулей здоровья</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-foreground/80">180+ параметров оценки</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-foreground/80">30-дневный план</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-pulse-soft">
          <ChevronDown className="w-6 h-6 text-foreground/60" />
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Value */}
            <div className="sketch-panel p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Для пользователя</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Ясность в управлении здоровьем</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Полный контроль над данными</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Системный подход к благополучию</span>
                </li>
              </ul>
            </div>

            {/* Partner Value */}
            <div className="sketch-panel p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-secondary mb-4">Для партнёра</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span>Поток квалифицированных клиентов</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span>Цифровая интеграция и API</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold mt-1">•</span>
                  <span>Детальная аналитика клиентов</span>
                </li>
              </ul>
            </div>

            {/* Investor Value */}
            <div className="sketch-panel p-8 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Для инвестора</h3>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Масштабируемая архитектура</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Повторяющаяся подписочная модель</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Мультисекторный рынок</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Systematization Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Принцип систематизации
            </h2>
            <p className="text-center text-foreground/70 mb-12">
              Здоровье фрагментировано. Мы объединяем 5 системных комплексов в одну экосистему.
            </p>

            {/* Health Systems Visualization */}
            <div className="mb-12">
              <img
                src={healthModulesImageUrl}
                alt="Health Systems"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-primary mb-3">Биологический комплекс</h4>
                <p className="text-sm text-foreground/70 mb-3">
                  Метаболизм, гормональный фон, сон, питание, физическая активность, восстановление
                </p>
                <p className="text-xs text-foreground/60 italic">
                  Все показатели влияют друг на друга через нейроэндокринную систему
                </p>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-secondary mb-3">Психоэмоциональный комплекс</h4>
                <p className="text-sm text-foreground/70 mb-3">
                  Стресс-реакции, тревожность, мотивация, эмоциональная устойчивость
                </p>
                <p className="text-xs text-foreground/60 italic">
                  Хронический стресс снижает эффективность восстановления
                </p>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-primary mb-3">Когнитивный комплекс</h4>
                <p className="text-sm text-foreground/70 mb-3">
                  Концентрация, обучаемость, память, стратегическое мышление
                </p>
                <p className="text-xs text-foreground/60 italic">
                  Питание + сон + стресс = производительность мозга
                </p>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-secondary mb-3">Социальный комплекс</h4>
                <p className="text-sm text-foreground/70 mb-3">
                  Окружение, поддержка, цифровое взаимодействие, сообщества
                </p>
                <p className="text-xs text-foreground/60 italic">
                  Социальная среда напрямую влияет на устойчивость привычек
                </p>
              </div>
            </div>

            <div className="sketch-divider" />

            <div className="sketch-panel p-8 bg-gradient-to-br from-card to-card/50">
              <h4 className="text-lg font-bold text-primary mb-3">Инфраструктурный комплекс</h4>
              <p className="text-foreground/70">
                Специалисты, клиники, магазины, лаборатории, исследования, разработчики инноваций. NexusVita становится соединительным слоем между ними.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mode-specific content */}
      {mode === 'investor' && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background/50 to-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Экономическая модель
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-primary mb-4">Подписочная модель</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">Basic</p>
                    <p className="text-sm text-foreground/70">$19–29/мес</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pro</p>
                    <p className="text-sm text-foreground/70">$49–79/мес</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Premium</p>
                    <p className="text-sm text-foreground/70">$149–299/мес</p>
                  </div>
                </div>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-secondary mb-4">Партнёрская инфраструктура</h4>
                <div className="space-y-3 text-sm text-foreground/70">
                  <p>Комиссия: 10–35%</p>
                  <p>Клиники, лаборатории, специалисты, фитнес-клубы, wellness-центры</p>
                </div>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-primary mb-4">Marketplace</h4>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p>• Протоколы и курсы</p>
                  <p>• AI-программы</p>
                  <p>• Корпоративные пакеты</p>
                </div>
              </div>

              <div className="sketch-panel p-6">
                <h4 className="text-lg font-bold text-secondary mb-4">B2B / Corporate</h4>
                <div className="space-y-3 text-sm text-foreground/70">
                  <p>Лицензия: $10K–150K/год</p>
                  <p>HR-интеграции, отчётность, программы для топ-менеджеров</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Готовы начать?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Присоединитесь к экосистеме NexusVita и откройте новые возможности для управления здоровьем и благополучием.
          </p>
          <button
            onClick={() => setLocation('/modules')}
            className="btn-sketch bg-primary text-white"
          >
            Начать диагностику
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container text-center text-sm text-foreground/60">
          <p>© 2026 NexusVita. Все права защищены.</p>
          <p className="mt-2">Системная экосистема управления здоровьем и потенциалом</p>
        </div>
      </footer>
    </div>
  );
}

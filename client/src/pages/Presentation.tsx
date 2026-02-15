import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';
import { StatCounter } from '@/components/StatCounter';
import SketchIcon from '@/components/SketchIcon';
import { DetailPopup } from '@/components/DetailPopup';
import { InfoIndicator } from '@/components/InfoIndicator';
import { whitepaperContent } from '@/data/whitepaperContent';
import { Button } from '@/components/ui/button';
import { WheelPicker } from '@/components/interactive/WheelPicker';
import { WeightSelector } from '@/components/interactive/WeightSelector';
import { MayanCalendar } from '@/components/interactive/MayanCalendar';
import type { PopupContent } from '@/components/DetailPopup';

export default function Presentation() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    height: 175,
    age: new Date(1993, 0, 1),
    weight: 72,
    referralCode: ''
  });

  const healthAspects = [
    {
      title: 'Медицинские обследования и рекомендации врачей',
      icon: 'medicine' as const,
      description: 'Регулярные медицинские осмотры и анализы позволяют своевременно выявлять риски и отклонения в работе организма.',
      details: 'Систематический мониторинг показателей (давление, анализы крови, уровень сахара, холестерина и т.д.) обеспечивает контроль за основными физиологическими функциями и выявляет скрытые проблемы до появления симптомов.',
      popupId: 'medicine-module'
    },
    {
      title: 'Спорт и фитнес',
      icon: 'movement' as const,
      description: 'Регулярная физическая активность признана наиболее влиятельным фактором на замедление старения организма.',
      details: 'Упражнения улучшают работу сердца, сосудов и обмена веществ, укрепляют иммунитет и мышечную систему. Приложение учитывает возраст, уровень подготовки и индивидуальные особенности, рекомендуя оптимальный режим тренировок.',
      popupId: 'movement-module'
    },
    {
      title: 'Питание',
      icon: 'nutrition' as const,
      description: 'Сбалансированная диета — необходимый фундамент здоровья.',
      details: 'Правильное питание обеспечивает организм всеми необходимыми макро- и микроэлементами, регулирует вес и метаболизм. Приложение поможет сформировать и отслеживать рацион, учитывая индивидуальные потребности и цели.',
      popupId: 'nutrition-module'
    },
    {
      title: 'Сон',
      icon: 'sleep' as const,
      description: 'Качественный сон необходим для восстановления всех систем организма.',
      details: 'Хронический недосып провоцирует сбои в работе гормональной системы, повышает риск сердечно-сосудистых заболеваний и ослабляет когнитивные функции. Приложение отслеживает режим сна и даёт рекомендации по гигиене сна.',
      popupId: 'sleep-module'
    },
    {
      title: 'Психоэмоциональное здоровье',
      icon: 'psychology' as const,
      description: 'Эмоциональное благополучие и управление стрессом — ключ к общему самочувствию.',
      details: 'Более миллиарда человек страдают от различных расстройств. Приложение включает модули для контроля настроения, медитации и методов релаксации. Пользователь фиксирует уровни стресса и получает персонализированные рекомендации.',
      popupId: 'psychology-module'
    },
    {
      title: 'Социальное и общественное здоровье',
      icon: 'relationships' as const,
      description: 'Качество социальных связей напрямую влияет на здоровье.',
      details: 'Крепкие социальные связи продлевают жизнь и улучшают психологическое благополучие намного сильнее, чем интеллектуальный уровень или доход. Приложение мотивирует поддерживать общение и участвовать в тематических сообществах.',
      popupId: 'relationships-module'
    },
    {
      title: 'Отношения, любовь, семья и сексуальное здоровье',
      icon: 'heart' as const,
      description: 'Качество интимных и семейных отношений — важнейший фактор благополучия.',
      details: 'Хорошие взаимоотношения делают нас счастливее и здоровее. Приложение предлагает секцию для улучшения семейных и любовных связей: советы психолога, тесты совместимости, упражнения на доверие.',
      popupId: 'relationships-module'
    },
    {
      title: 'Привычки, хобби и жизненная философия',
      icon: 'spirituality' as const,
      description: 'Здоровые ежедневные привычки накапливаются годами и сильно влияют на долголетие.',
      details: 'Наличие чётких целей или увлечений замедляет старение мозга и продлевает жизнь. В приложении пользователь заводит «ежедневник привычек» и получает награды за их соблюдение.',
      popupId: 'spirituality-module'
    },
  ];

  const howItWorks = [
    {
      title: 'Единый биопрофиль',
      description: 'В центре — единый биопрофиль пользователя с основными метриками (возраст, рост, вес, данные анализов, трекер шагов и т.д.)',
      icon: 'chart' as const,
      popupId: 'unified-bio-profile'
    },
    {
      title: 'Гибкий анализ и планирование',
      description: 'Система генерирует оптимальный персональный план оздоровления на основе ваших данных, целей и ограничений.',
      icon: 'brain' as const,
      popupId: 'flexible-analysis'
    },
    {
      title: 'Отслеживание целей и прогресса',
      description: 'Платформа помогает разбивать большие цели на небольшие задачи с метриками и критериями успеха.',
      icon: 'trending' as const,
      popupId: 'goal-tracking'
    },
    {
      title: 'Персональный поиск специалистов',
      description: 'Умная система поиска врачей, тренеров, диетологов и психологов с фильтрами по методикам и типу психологии.',
      icon: 'users' as const,
      popupId: 'specialist-search'
    },
    {
      title: 'Система подписок на услуги',
      description: 'Персонализированные программы подписки на оздоровительные услуги: тренировки, массажи, физиопроцедуры, консультации.',
      icon: 'heart' as const,
      popupId: 'subscription-services'
    },
    {
      title: 'Коллаборации и партнёрства',
      description: 'Интеграция с сетью фитнес-клубов, клиник и wellness-центров. Скидки и бонусы для пользователей.',
      icon: 'network' as const,
      popupId: 'partnerships'
    },
    {
      title: 'Интеграция с гаджетами',
      description: 'Синхронизация с умными браслетами, часами, трекерами сна и медицинскими девайсами для сбора объективных данных.',
      icon: 'monitor' as const,
      popupId: 'device-integration'
    },
    {
      title: 'Библиотека знаний',
      description: 'Обширный раздел с актуальной библиотекой статей, исследований и рекомендаций экспертов.',
      icon: 'ai' as const,
      popupId: 'knowledge-library'
    },
    {
      title: 'ИИ-система и персонализация',
      description: 'Искусственный интеллект анализирует медицинскую историю, генетические особенности и психологический профиль.',
      icon: 'brain' as const,
      popupId: 'ai-personalization'
    },
    {
      title: 'Токеномика',
      description: 'Внутренняя виртуальная валюта — токены, которые упрощают расчёты внутри экосистемы.',
      icon: 'chart' as const,
      popupId: 'tokenomics'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleRegistration = () => {
    // Здесь будет логика регистрации
    alert('Заполните анкету за 5 минут и получите первый персональный отчёт и план!');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-12 md:p-20 border border-border/50 shadow-lg">
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            <div className="relative z-10 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                      EthoLife
                    </h1>
                    <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
                      Ваш персональный гид к долгой и здоровой жизни
                    </p>
                  </div>
                  <div className="ml-4">
                    <InfoIndicator onClick={() => setOpenPopup('platform-overview')} />
                  </div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed"
                >
                  Приложение EthoLife объединяет все аспекты персонального здоровья в единую экосистему. Только комплексный подход к здоровью, включающий медицину, питание, сон, физические нагрузки и психологию, обеспечивает оптимальный результат.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button 
                    size="lg" 
                    className="btn-premium"
                    onClick={() => setShowRegistration(true)}
                  >
                    Начать
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setOpenPopup('platform-overview')}
                  >
                    Узнать больше
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Почему нужен комплексный подход */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-6"
          >
            Почему нужен комплексный подход к здоровью
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="premium-card p-8 mb-8"
          >
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              Здоровье человека многогранно. Всемирная организация здравоохранения определяет его как состояние полного физического, психического и социального благополучия, а не просто отсутствие болезней.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Следовательно, физическое, психоэмоциональное и социальное благополучие должны отслеживаться совместно. Ни один фактор не работает в одиночку: плохо налаженный сон усугубляет стресс, дефицит витаминов снижает иммунитет, нехватка активности увеличивает риск болезней, а социальная изоляция ухудшает и психологическое, и физическое состояние человека.
            </p>
          </motion.div>
        </motion.section>

        {/* Аспекты здоровья */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-10"
          >
            Все аспекты здоровья в одной экосистеме
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthAspects.map((aspect, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                onClick={() => setOpenPopup(aspect.popupId)}
                className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 cursor-pointer block h-full group hover:border-primary/30 transition-all text-left"
              >
                <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <SketchIcon icon={aspect.icon} size={80} className="text-primary" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <SketchIcon icon={aspect.icon} size={24} className="text-primary" />
                    </div>
                    <InfoIndicator 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenPopup(aspect.popupId);
                      }} 
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">{aspect.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-2">{aspect.description}</p>
                  <p className="text-foreground/60 text-xs leading-relaxed">{aspect.details}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Как работает приложение */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-10"
          >
            Как работает приложение
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.map((feature, idx) => (
              <motion.button
                key={idx}
                variants={itemVariants}
                className="premium-card p-6 text-left hover:scale-105 transition-transform cursor-pointer"
                onClick={() => feature.popupId && setOpenPopup(feature.popupId)}
              >
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <SketchIcon icon={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Регистрация */}
        {showRegistration && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="premium-card p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Начало работы: регистрация</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowRegistration(false)}
                >
                  ×
                </Button>
              </div>
              
              <p className="text-lg text-foreground/70 mb-8">
                Заполните анкету за 5 минут и получите первый персональный отчёт и план!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Реферальный код (опционально)
                  </label>
                  <input
                    type="text"
                    value={registrationData.referralCode}
                    onChange={(e) => setRegistrationData({ ...registrationData, referralCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Введите код"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Рост
                  </label>
                  <WheelPicker
                    value={registrationData.height}
                    onChange={(val) => setRegistrationData({ ...registrationData, height: val })}
                    label=""
                    min={100}
                    max={220}
                    unit="см"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Вес
                  </label>
                  <WeightSelector
                    value={registrationData.weight}
                    onChange={(val) => setRegistrationData({ ...registrationData, weight: val })}
                    label=""
                    min={30}
                    max={200}
                    unit="кг"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Дата рождения
                  </label>
                  <MayanCalendar
                    value={registrationData.age}
                    onChange={(val) => setRegistrationData({ ...registrationData, age: val })}
                    label=""
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <input
                  type="checkbox"
                  id="consent"
                  className="w-5 h-5 rounded border-border"
                />
                <label htmlFor="consent" className="text-sm text-foreground/70">
                  Я соглашаюсь на обработку персональных данных
                </label>
              </div>

              <Button
                size="lg"
                className="btn-premium w-full md:w-auto"
                onClick={handleRegistration}
                disabled={!registrationData.name}
              >
                Регистрация
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.section>
        )}

        {/* Whitepaper */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="premium-card p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Whitepaper</h2>
            <p className="text-lg text-foreground/70 mb-6">
              Расширенное описание проекта с подробностями о структуре модулей, алгоритмах, результатах исследований, бизнес-плане и токеномике платформы.
            </p>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setOpenPopup('platform-overview')}
            >
              Открыть Whitepaper
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.section>
      </main>

      {/* Detail Popup */}
      <DetailPopup
        isOpen={openPopup !== null}
        onClose={() => setOpenPopup(null)}
        content={openPopup && whitepaperContent[openPopup] ? whitepaperContent[openPopup] : null}
      />
    </div>
  );
}

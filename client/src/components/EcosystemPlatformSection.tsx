import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Search, Calendar, Handshake, Smartphone, BookOpen, 
  Brain, Coins, ArrowRight, Info
} from 'lucide-react';
import { DetailPopup } from '@/components/DetailPopup';
import { ecosystemFeatures } from '@/data/ecosystemFeatures';

const features = [
  {
    id: 'flexible-analysis',
    title: 'Гибкий анализ и планирование',
    icon: Target,
    description: 'Система генерирует оптимальный персональный план оздоровления на основе ваших данных, целей и ограничений.',
  },
  {
    id: 'goal-tracking',
    title: 'Отслеживание целей и прогресса',
    icon: Target,
    description: 'Разбивайте большие цели на задачи, отслеживайте прогресс с помощью графиков и метрик.',
  },
  {
    id: 'specialist-search',
    title: 'Персональный поиск специалистов',
    icon: Search,
    description: 'Умная система поиска врачей, тренеров, диетологов и психологов с фильтрами по методикам.',
  },
  {
    id: 'subscription-system',
    title: 'Система подписок на услуги',
    icon: Calendar,
    description: 'Персонализированные программы подписки на тренировки, массажи, процедуры и консультации.',
  },
  {
    id: 'partnerships',
    title: 'Коллаборации и партнёрства',
    icon: Handshake,
    description: 'Интеграция с фитнес-клубами, клиниками и wellness-центрами. Скидки и бонусы для пользователей.',
  },
  {
    id: 'gadget-integration',
    title: 'Интеграция с гаджетами',
    icon: Smartphone,
    description: 'Синхронизация с умными браслетами, часами, трекерами сна и медицинскими девайсами.',
  },
  {
    id: 'knowledge-library',
    title: 'Библиотека знаний',
    icon: BookOpen,
    description: 'Актуальная библиотека статей, исследований и рекомендаций экспертов с верификацией.',
  },
  {
    id: 'ai-system',
    title: 'ИИ-система и персонализация',
    icon: Brain,
    description: 'Искусственный интеллект анализирует все данные и создает персонализированные рекомендации.',
  },
  {
    id: 'tokenomics',
    title: 'Токеномика',
    icon: Coins,
    description: 'Внутренняя валюта для упрощения расчётов. Зарабатывайте токены за активности и тратьте на услуги.',
  },
];

export function EcosystemPlatformSection() {
  const [openPopup, setOpenPopup] = useState<string | null>(null);

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

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 engraved-text">
            Единая экосистемная платформа
            <br />
            для твоего ежедневного здоровья
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Комплексное решение, объединяющее все аспекты здоровья в единую систему с AI-персонализацией
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className="engraved-card p-6 cursor-pointer relative group"
              onClick={() => setOpenPopup(feature.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 engraved-text">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <Info className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                <span>Узнать больше</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <DetailPopup
        isOpen={openPopup !== null}
        onClose={() => setOpenPopup(null)}
        content={openPopup && ecosystemFeatures[openPopup] ? ecosystemFeatures[openPopup] : null}
      />
    </>
  );
}

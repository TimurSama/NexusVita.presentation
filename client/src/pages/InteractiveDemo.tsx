import { useState } from 'react';
import { motion } from 'framer-motion';
import { WheelPicker } from '@/components/interactive/WheelPicker';
import { WeightSelector } from '@/components/interactive/WeightSelector';
import { MayanCalendar } from '@/components/interactive/MayanCalendar';
import { EmojiMoodSlider } from '@/components/interactive/EmojiMoodSlider';
import { InDevelopmentPopup } from '@/components/InDevelopmentPopup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SketchIcon from '@/components/SketchIcon';
import { Construction, Sparkles } from 'lucide-react';

export default function InteractiveDemo() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [birthDate, setBirthDate] = useState(new Date(1990, 0, 1));
  const [mood, setMood] = useState(7);
  const [devPopupOpen, setDevPopupOpen] = useState(false);
  const [devFeature, setDevFeature] = useState('');

  const handleDevClick = (featureName: string) => {
    setDevFeature(featureName);
    setDevPopupOpen(true);
  };

  const features = [
    { name: 'Манжета для давления', icon: 'heart', description: 'Интерактивная манжета для измерения артериального давления' },
    { name: 'Пульсометр', icon: 'heart', description: 'Визуализация пульса в реальном времени' },
    { name: 'Термометр стресса', icon: 'chart', description: 'Интерактивный термометр для оценки уровня стресса' },
    { name: 'Звездное небо для сна', icon: 'sleep', description: 'Оценка качества сна через звезды' },
    { name: 'Шагомер', icon: 'movement', description: 'Интерактивный счетчик шагов' },
    { name: 'Стакан воды', icon: 'nutrition', description: 'Визуализация потребления воды' },
    { name: 'Карта тела', icon: 'medicine', description: 'Интерактивная карта для указания локализации боли' },
    { name: 'Батарейка энергии', icon: 'chart', description: 'Визуализация уровня энергии' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Интерактивные методы сбора данных
            </h1>
          </div>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Визуально привлекательные и интуитивно понятные элементы для сбора информации о здоровье
          </p>
        </motion.div>

        {/* Active Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Height Picker */}
          <Card className="p-6">
            <WheelPicker
              value={height}
              onChange={setHeight}
              label="Рост"
              min={100}
              max={220}
              unit="см"
            />
          </Card>

          {/* Weight Selector */}
          <Card className="p-6">
            <WeightSelector
              value={weight}
              onChange={setWeight}
              label="Вес"
              min={30}
              max={200}
              unit="кг"
            />
          </Card>

          {/* Date Picker */}
          <Card className="p-6">
            <MayanCalendar
              value={birthDate}
              onChange={setBirthDate}
              label="Дата рождения"
            />
          </Card>

          {/* Mood Slider */}
          <Card className="p-6">
            <EmojiMoodSlider
              value={mood}
              onChange={setMood}
              label="Настроение"
              min={1}
              max={10}
            />
          </Card>
        </div>

        {/* Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Construction className="w-8 h-8 text-primary" />
            Скоро появится
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className="p-6 cursor-pointer hover:shadow-lg transition-all group"
                  onClick={() => handleDevClick(feature.name)}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <SketchIcon icon={feature.icon as any} size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.name}</h3>
                      <p className="text-sm text-foreground/60">{feature.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      В разработке
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="premium-card p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Интерактивный сбор данных
          </h3>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Все интерактивные элементы разработаны с учетом лучших практик UX/UI дизайна.
            Они визуально привлекательны, интуитивно понятны и работают на всех устройствах.
          </p>
        </motion.div>

        {/* Development Popup */}
        <InDevelopmentPopup
          isOpen={devPopupOpen}
          onClose={() => setDevPopupOpen(false)}
          featureName={devFeature}
          description={`Мы активно работаем над функцией "${devFeature}". Она будет включать интерактивные элементы для более удобного сбора данных о здоровье.`}
        />
      </main>
    </div>
  );
}

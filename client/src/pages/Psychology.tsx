import { useState } from 'react';
import { ChevronLeft, Smile, Frown, Meh, TrendingUp, ClipboardList, CheckCircle2, Settings } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { QuestionnaireComponent } from '@/components/Questionnaire';
import { psychologyQuestionnaire } from '@/data/questionnaires/psychology';
import { SettingsPanel } from '@/components/SettingsPanel';
import { psychologySettings } from '@/data/settings/psychology';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Psychology() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [mood, setMood] = useState(7);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const moodData = [
    { date: '2025-02-12', value: 8, icon: Smile },
    { date: '2025-02-11', value: 7, icon: Smile },
    { date: '2025-02-10', value: 6, icon: Meh },
    { date: '2025-02-09', value: 8, icon: Smile },
    { date: '2025-02-08', value: 5, icon: Frown },
  ];

  const stressLevel = 4;
  const sleepQuality = 7.5;
  const energyLevel = 7;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/')}
              className="md:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <SketchIcon icon="psychology" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Психология</h1>
                <p className="text-foreground/60">Ментальное здоровье и эмоциональное благополучие</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="mood">Настроение</TabsTrigger>
            <TabsTrigger value="stress">Стресс</TabsTrigger>
            <TabsTrigger value="tools">Инструменты</TabsTrigger>
            <TabsTrigger value="questionnaire">
              <ClipboardList className="w-4 h-4 mr-2" />
              Анкета
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Mood */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Текущее настроение</h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Smile className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{mood}/10</p>
                  <p className="text-sm text-foreground/60 mt-1">Отлично</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Оцените настроение</label>
                <Slider
                  value={[mood]}
                  onValueChange={(value) => setMood(value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-foreground/60">
                  <span>Плохо</span>
                  <span>Отлично</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Стресс</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{stressLevel}/10</p>
                <p className="text-sm text-foreground/60 mt-1">Низкий уровень</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <SketchIcon icon="sleep" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Качество сна</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{sleepQuality}/10</p>
                <p className="text-sm text-foreground/60 mt-1">Хорошо</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <SketchIcon icon="zap" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Энергия</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{energyLevel}/10</p>
                <p className="text-sm text-foreground/60 mt-1">Высокий уровень</p>
              </motion.div>
            </div>

            {/* Mood History */}
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">История настроения</h2>
              <div className="space-y-3">
                {moodData.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{item.date}</p>
                          <p className="text-sm text-foreground/60">Настроение: {item.value}/10</p>
                        </div>
                      </div>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value * 10}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mood" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Трекер настроения</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Управление стрессом</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Опросник ментального здоровья</h2>
                  <p className="text-foreground/60">
                    Помогите нам лучше понять ваше ментальное состояние
                  </p>
                </div>
                {questionnaireCompleted && (
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Анкета заполнена</span>
                  </div>
                )}
              </div>
              <QuestionnaireComponent
                questionnaire={psychologyQuestionnaire}
                onComplete={(answers) => {
                  console.log('Psychology questionnaire answers:', answers);
                  setQuestionnaireCompleted(true);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Инструменты</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

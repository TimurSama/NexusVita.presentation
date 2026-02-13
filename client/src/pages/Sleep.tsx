import { useState } from 'react';
import { ChevronLeft, Settings, ClipboardList } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { Button } from '@/components/ui/button';
import { SettingsPanel } from '@/components/SettingsPanel';
import { sleepSettings } from '@/data/settings/sleep';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionnaireComponent } from '@/components/Questionnaire';
import { sleepQuestionnaire } from '@/data/questionnaires/sleep';

export default function Sleep() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
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
              <SketchIcon icon="sleep" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Сон</h1>
                <p className="text-foreground/60">Качество сна и восстановление</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Настройки
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Настройки модуля Сон</DialogTitle>
                </DialogHeader>
                <SettingsPanel
                  title="Настройки"
                  settings={sleepSettings}
                  onSave={(settings) => {
                    console.log('Sleep settings saved:', settings);
                  }}
                  categories={['Общие', 'Уведомления', 'Цели', 'Интеграции']}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="questionnaire">
              <ClipboardList className="w-4 h-4 mr-2" />
              Анкета
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-8"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Модуль сна</h2>
              <p className="text-foreground/70 mb-6">
                Качество сна, восстановление и оптимизация циркадных ритмов.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <h3 className="font-bold text-foreground mb-2">Основные функции</h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li>• Отслеживание качества сна</li>
                    <li>• Анализ циркадных ритмов</li>
                    <li>• Рекомендации по улучшению сна</li>
                    <li>• Интеграция с трекерами сна</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            <QuestionnaireComponent
              questions={sleepQuestionnaire}
              onSubmit={(data) => {
                console.log('Sleep questionnaire data:', data);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

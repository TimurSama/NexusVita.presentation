import { useState } from 'react';
import { ChevronLeft, Settings } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { Button } from '@/components/ui/button';
import { SettingsPanel } from '@/components/SettingsPanel';
import { relationshipsSettings } from '@/data/settings/relationships';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Relationships() {
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
              <SketchIcon icon="relationships" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Отношения</h1>
                <p className="text-foreground/60">Социальные связи и здоровые отношения</p>
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
                  <DialogTitle>Настройки модуля Отношения</DialogTitle>
                </DialogHeader>
                <SettingsPanel
                  title="Настройки"
                  settings={relationshipsSettings}
                  onSave={(settings) => {
                    console.log('Relationships settings saved:', settings);
                  }}
                  categories={['Общие', 'Уведомления', 'Сообщество', 'Приватность', 'Интеграции']}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Модуль отношений</h2>
          <p className="text-foreground/70 mb-6">
            Социальные связи, общение и построение здоровых отношений.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg">
              <h3 className="font-bold text-foreground mb-2">Основные функции</h3>
              <ul className="space-y-2 text-foreground/70">
                <li>• Оценка качества отношений</li>
                <li>• Рекомендации по улучшению коммуникации</li>
                <li>• Поддержка социальных связей</li>
                <li>• Интеграция с социальными сетями</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

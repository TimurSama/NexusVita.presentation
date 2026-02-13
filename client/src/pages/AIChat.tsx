import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIChat as AIChatComponent } from '@/components/AIChat';
import { AIMessage, AISettings } from '@/types/ai-chat';
import SketchIcon from '@/components/SketchIcon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Mock AI responses - в будущем будет заменено на реальный API
const generateAIResponse = (userMessage: string): AIMessage => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple mock responses based on keywords
  let content = '';
  let recommendations: string[] = [];
  let links: { label: string; path: string }[] = [];

  if (lowerMessage.includes('здоровье') || lowerMessage.includes('самочувствие')) {
    content = `На основе анализа ваших данных, ваше общее состояние здоровья хорошее. 

**Ключевые показатели:**
- Индекс здоровья: 8.2/10
- Активность: в норме
- Сон: качественный
- Питание: сбалансированное

**Рекомендации:**
- Продолжайте регулярные тренировки
- Поддерживайте режим сна
- Обратите внимание на водный баланс`;
    
    recommendations = [
      'Увеличьте потребление воды до 2.5 литров в день',
      'Добавьте 10 минут медитации утром',
      'Проверьте уровень витамина D'
    ];
    
    links = [
      { label: 'Дашборд', path: '/dashboard' },
      { label: 'Профиль здоровья', path: '/profile' }
    ];
  } else if (lowerMessage.includes('питание') || lowerMessage.includes('еда')) {
    content = `Ваше питание в целом сбалансированное, но есть области для улучшения.

**Анализ:**
- Калории: в пределах нормы
- Белки: достаточное количество
- Углеводы: немного превышены
- Жиры: в норме

**Рекомендации по улучшению:**
- Добавьте больше овощей в каждый прием пищи
- Уменьшите потребление обработанных продуктов
- Увеличьте потребление омега-3 жирных кислот`;
    
    recommendations = [
      'Добавьте 2 порции овощей в обед',
      'Замените один перекус на орехи',
      'Пейте воду перед каждым приемом пищи'
    ];
    
    links = [
      { label: 'Модуль питания', path: '/nutrition' }
    ];
  } else if (lowerMessage.includes('тренировк') || lowerMessage.includes('спорт') || lowerMessage.includes('активность')) {
    content = `Отличная работа! Ваша активность на хорошем уровне.

**Статистика:**
- Средние шаги: 8,420/день
- Тренировки: регулярные
- Восстановление: хорошее

**Рекомендации:**
- Добавьте силовые тренировки 2 раза в неделю
- Увеличьте кардио до 150 минут в неделю
- Не забывайте о растяжке после тренировок`;
    
    recommendations = [
      'Планируйте тренировки заранее в календаре',
      'Добавьте разминку перед тренировкой',
      'Отслеживайте пульс во время активности'
    ];
    
    links = [
      { label: 'Модуль движения', path: '/movement' },
      { label: 'Календарь', path: '/calendar' }
    ];
  } else if (lowerMessage.includes('сон')) {
    content = `Ваш сон в целом качественный, но есть возможности для улучшения.

**Анализ:**
- Средняя длительность: 7.5 часов
- Качество: хорошее
- Регулярность: стабильная

**Рекомендации:**
- Старайтесь ложиться спать в одно и то же время
- Избегайте экранов за час до сна
- Создайте ритуал перед сном`;
    
    recommendations = [
      'Установите фиксированное время отхода ко сну',
      'Используйте затемняющие шторы',
      'Практикуйте дыхательные упражнения перед сном'
    ];
    
    links = [
      { label: 'Модуль сна', path: '/sleep' }
    ];
  } else if (lowerMessage.includes('риск') || lowerMessage.includes('опасность')) {
    content = `На основе анализа ваших данных, текущие риски для здоровья минимальны.

**Оценка рисков:**
- Сердечно-сосудистые: низкий риск
- Метаболические: низкий риск
- Ментальное здоровье: в норме

**Профилактические меры:**
- Продолжайте регулярные медицинские осмотры
- Поддерживайте активный образ жизни
- Следите за питанием`;
    
    recommendations = [
      'Пройдите ежегодный медосмотр',
      'Продолжайте отслеживать ключевые показатели',
      'Поддерживайте здоровый вес'
    ];
    
    links = [
      { label: 'Медицина', path: '/medicine' },
      { label: 'Профиль', path: '/profile' }
    ];
  } else if (lowerMessage.includes('план') || lowerMessage.includes('неделя')) {
    content = `Вот ваш персональный план на неделю:

**Понедельник:**
- Утро: Кардио 30 мин
- Обед: Сбалансированное питание
- Вечер: Медитация 10 мин

**Вторник:**
- Утро: Силовая тренировка
- Обед: Овощной салат
- Вечер: Прогулка 20 мин

**Среда:**
- Утро: Йога 30 мин
- Обед: Рыба с овощами
- Вечер: Чтение

*[План продолжается на всю неделю]*`;
    
    recommendations = [
      'Синхронизируйте план с календарем',
      'Установите напоминания',
      'Отслеживайте выполнение'
    ];
    
    links = [
      { label: 'Календарь', path: '/calendar' },
      { label: 'Планировщик ИИ', path: '/ai-planner' }
    ];
  } else if (lowerMessage.includes('настроение') || lowerMessage.includes('эмоции') || lowerMessage.includes('стресс')) {
    content = `Ваше ментальное здоровье - важная часть общего благополучия.

**Анализ:**
- Уровень стресса: умеренный
- Настроение: стабильное
- Эмоциональный баланс: хороший

**Рекомендации:**
- Практикуйте ежедневную медитацию
- Ведите дневник эмоций
- Поддерживайте социальные связи
- Обратитесь к специалисту при необходимости`;

    recommendations = [
      '10 минут медитации утром',
      'Дыхательные упражнения при стрессе',
      'Регулярные прогулки на природе'
    ];

    links = [
      { label: 'Психология', path: '/psychology' },
      { label: 'Ежедневник', path: '/journal' }
    ];
  } else if (lowerMessage.includes('анализ') || lowerMessage.includes('результат')) {
    content = `Вот анализ ваших ключевых показателей:

**Физическое здоровье:**
- Индекс здоровья: 8.2/10
- Активность: 8,420 шагов/день
- Сон: 7.5 часов, качество хорошее

**Питание:**
- Калории: в норме
- Баланс БЖУ: оптимальный
- Витамины: достаточное количество

**Ментальное здоровье:**
- Настроение: стабильное
- Стресс: под контролем
- Энергия: хороший уровень`;

    recommendations = [
      'Продолжайте текущий режим',
      'Добавьте больше овощей',
      'Увеличьте кардио активность'
    ];

    links = [
      { label: 'Дашборд', path: '/dashboard' },
      { label: 'Профиль', path: '/profile' }
    ];
  } else {
    content = `Спасибо за ваш вопрос! Я проанализирую ваши данные и предоставлю персональные рекомендации.

**Я могу помочь вам с:**
- Анализом общего состояния здоровья
- Рекомендациями по питанию и тренировкам
- Оптимизацией режима сна
- Управлением стрессом и настроением
- Оценкой рисков для здоровья
- Созданием персональных планов

**Для более точного ответа, уточните:**
- О каком аспекте здоровья вы спрашиваете?
- Какие конкретные данные вас интересуют?
- Есть ли проблемы, которые вас беспокоят?

Или выберите один из быстрых вопросов выше для начала!`;
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    timestamp: new Date(),
    metadata: {
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      links: links.length > 0 ? links : undefined,
    },
  };
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<AISettings>({
    detailLevel: 'normal',
    communicationStyle: 'friendly',
    focusModules: [],
    recommendationFrequency: 'medium',
    privacyLevel: 'full',
  });

  const handleSendMessage = async (userMessage: string) => {
    // Add user message
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate AI response delay with typing effect
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-12 h-[calc(100vh-5rem)] md:h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
                <SketchIcon icon="ai" size={32} className="text-primary" />
                ИИ+ Чат
              </h1>
              <p className="text-foreground/60 text-lg">
                Персональный помощник для анализа здоровья и рекомендаций
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Настройки
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Настройки ИИ</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div>
                    <Label>Уровень детализации</Label>
                    <Select
                      value={settings.detailLevel}
                      onValueChange={(value: any) =>
                        setSettings({ ...settings, detailLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brief">Краткий</SelectItem>
                        <SelectItem value="normal">Обычный</SelectItem>
                        <SelectItem value="detailed">Подробный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Стиль общения</Label>
                    <Select
                      value={settings.communicationStyle}
                      onValueChange={(value: any) =>
                        setSettings({ ...settings, communicationStyle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Формальный</SelectItem>
                        <SelectItem value="friendly">Дружелюбный</SelectItem>
                        <SelectItem value="casual">Неформальный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 premium-card overflow-hidden flex flex-col"
        >
          <AIChatComponent
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            showQuickQuestions={true}
          />
        </motion.div>
      </main>
    </div>
  );
}

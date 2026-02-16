import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, BookOpen, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleCompleteOnboarding = async (skip: boolean = false) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'onboarding', completed: true, skip }),
      });

      if (response.ok) {
        // Redirect to dashboard
        setLocation('/dashboard');
      } else {
        console.error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Добро пожаловать в EthosLife! 🎉
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            Спасибо за интерес к нашему проекту
          </p>
        </motion.div>

        {/* Welcome Gift */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="engraved-card border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="engraved-text">Подарочные токены</CardTitle>
                  <CardDescription>Ваш приветственный бонус</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">100 токенов</p>
                  <p className="text-foreground/60">
                    Используйте токены для доступа к премиум функциям, консультациям специалистов и AI-аналитике
                  </p>
                </div>
                <div className="text-6xl">🎁</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Learn More */}
          <Card className="engraved-card hover:border-primary/30 transition-colors cursor-pointer"
            onClick={() => setLocation('/presentation')}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="engraved-text">Изучить подробнее</CardTitle>
              </div>
              <CardDescription>
                Узнайте больше о возможностях платформы, экосистеме здоровья и наших технологиях
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/70 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>7 модулей здоровья</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>AI-диагностика и рекомендации</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Персональные планы оздоровления</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Экосистема токенов</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full engraved-button-outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation('/presentation');
                }}
              >
                Открыть презентацию
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Start Questionnaire */}
          <Card className="engraved-card hover:border-primary/30 transition-colors cursor-pointer"
            onClick={() => setLocation('/profile')}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="engraved-text">Заполнить анкету</CardTitle>
              </div>
              <CardDescription>
                Создайте персональный план оздоровления на месяц, заполнив анкету о вашем здоровье
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/70 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Биометрические данные</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Цели и предпочтения</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Оптимальный план на месяц</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Персональные рекомендации</span>
                </li>
              </ul>
              <Button 
                className="w-full engraved-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation('/profile');
                }}
              >
                Начать заполнение
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="engraved-button text-lg px-8"
            onClick={() => handleCompleteOnboarding(false)}
            disabled={loading}
          >
            Перейти к дашборду
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="engraved-button-outline text-lg px-8"
            onClick={() => handleCompleteOnboarding(true)}
            disabled={loading}
          >
            Пропустить и изучить позже
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

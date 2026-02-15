import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, CheckCircle2, Circle, Info, BookOpen, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mariaExerciseDescriptions, mariaMassageTechniques, mariaRecommendations } from '@/data/maria-dashboard-content';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MariaDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [selectedMassage, setSelectedMassage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch plans for selected date
    const fetchPlans = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/1/plans?date=${selectedDate.toISOString().split('T')[0]}`);
        // const data = await response.json();
        // setPlans(data.plans);

        // Mock data for now
        const today = new Date();
        const dayOfWeek = today.getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = dayNames[dayOfWeek];

        // Generate plans based on day of week
        const mockPlans = generatePlansForDay(dayName);
        setPlans(mockPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [selectedDate]);

  const generatePlansForDay = (dayName: string) => {
    const plansByDay: Record<string, any[]> = {
      monday: [
        { id: 1, time: '07:00', title: 'Лёгкая ходьба', description: '5-минутная лёгкая ходьба', category: 'movement', completed: false, exerciseKey: 'morning-walk' },
        { id: 2, time: '07:10', title: 'Утренний комплекс', description: 'Колено к груди, мостик, кошка-корова', category: 'movement', completed: false },
        { id: 3, time: '12:00', title: 'Перерыв на работе', description: 'Каждые 30 мин: наклоны и вращения тазом', category: 'movement', completed: false },
        { id: 4, time: '20:00', title: 'Вечерняя растяжка', description: 'Наклон вперед к вытянутым ногам', category: 'movement', completed: false },
        { id: 5, time: '22:00', title: 'Лёгкий массаж поясницы', description: 'Круговые поглаживания', category: 'massage', completed: false, massageKey: 'lower-back' },
      ],
      tuesday: [
        { id: 6, time: '07:00', title: 'Повороты туловища', description: 'Лёжа, колени влево-вправо', category: 'movement', completed: false, exerciseKey: 'torso-twists' },
        { id: 7, time: '07:15', title: 'Ягодичная растяжка', description: 'Сидя, одна нога на колене другой', category: 'movement', completed: false, exerciseKey: 'glute-stretch' },
        { id: 8, time: '19:00', title: 'Планка на локтях', description: '2-3 подхода по 10-20 сек', category: 'movement', completed: false, exerciseKey: 'plank' },
        { id: 9, time: '21:00', title: 'Самомассаж бёдер', description: 'С маслом', category: 'massage', completed: false, massageKey: 'thighs' },
      ],
      wednesday: [
        { id: 10, time: '07:00', title: 'Растяжка тазобедренных', description: 'Выпад вперед, 20 сек на ногу', category: 'movement', completed: false, exerciseKey: 'hip-flexor-stretch' },
        { id: 11, time: '07:15', title: 'Упражнение "лодочка"', description: '5 раз', category: 'movement', completed: false, exerciseKey: 'boat' },
        { id: 12, time: '12:00', title: 'Сведение лопаток', description: '10 раз по 5 сек', category: 'movement', completed: false, exerciseKey: 'shoulder-blades' },
        { id: 13, time: '20:00', title: 'Вытяжение боков', description: 'Наклоны влево-вправо', category: 'movement', completed: false, exerciseKey: 'side-stretch' },
      ],
      thursday: [
        { id: 14, time: '07:00', title: 'Утренний комплекс', description: 'Повторить понедельник, увеличив подходы', category: 'movement', completed: false },
        { id: 15, time: '20:00', title: 'Растяжка "бабочка"', description: '20 секунд', category: 'movement', completed: false, exerciseKey: 'butterfly-stretch' },
        { id: 16, time: '21:00', title: 'Массаж стенки таза', description: 'Круговые движения', category: 'massage', completed: false, massageKey: 'pelvis' },
      ],
      friday: [
        { id: 17, time: '07:00', title: 'Скручивания сидя', description: 'Корпус влево-вправо', category: 'movement', completed: false },
        { id: 18, time: '20:00', title: 'Поза "ребёнка"', description: '30 секунд', category: 'movement', completed: false, exerciseKey: 'child-pose' },
      ],
      saturday: [
        { id: 19, time: '08:00', title: 'Прогулка', description: '10 минут', category: 'movement', completed: false },
        { id: 20, time: '21:00', title: 'Самомассаж спины', description: 'Мягкий массаж', category: 'massage', completed: false },
      ],
      sunday: [
        { id: 21, time: '08:00', title: 'Медленные вращения', description: 'Таз и плечи', category: 'movement', completed: false },
        { id: 22, time: '20:00', title: 'Полный комплекс растяжек', description: 'Все упражнения по 1 подходу', category: 'movement', completed: false },
      ],
    };

    return plansByDay[dayName] || [];
  };

  const handleComplete = async (planId: number) => {
    try {
      // TODO: API call to mark as completed
      // await fetch(`/api/users/1/plans/${planId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ completed: true }),
      // });

      setPlans(plans.map(p => p.id === planId ? { ...p, completed: true } : p));
    } catch (error) {
      console.error('Error completing plan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground engraved-text">Дашборд Марии</h1>
          </div>
          <p className="text-foreground/60">
            Персональный план восстановления и укрепления спины
          </p>
        </motion.div>

        <Tabs defaultValue="plan" className="space-y-6">
          <TabsList className="engraved-tabs">
            <TabsTrigger value="plan">📅 План на день</TabsTrigger>
            <TabsTrigger value="exercises">💪 Упражнения</TabsTrigger>
            <TabsTrigger value="massage">🤲 Массаж</TabsTrigger>
            <TabsTrigger value="recommendations">💡 Рекомендации</TabsTrigger>
          </TabsList>

          {/* Daily Plan */}
          <TabsContent value="plan" className="space-y-4">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  План на {selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-foreground/60">Загрузка плана...</div>
                ) : plans.length === 0 ? (
                  <div className="text-center py-8 text-foreground/60">На сегодня планов нет</div>
                ) : (
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {plan.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-foreground/40" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-foreground/60" />
                                <span className="text-sm font-medium text-foreground/60">{plan.time}</span>
                                <Badge variant="outline" className="text-xs">
                                  {plan.category === 'movement' ? 'Движение' : plan.category === 'massage' ? 'Массаж' : plan.category}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-foreground mb-1">{plan.title}</h3>
                              <p className="text-sm text-foreground/70">{plan.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {(plan.exerciseKey || plan.massageKey) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    if (plan.exerciseKey) setSelectedExercise(plan.exerciseKey);
                                    if (plan.massageKey) setSelectedMassage(plan.massageKey);
                                  }}
                                  className="engraved-button-ghost"
                                >
                                  <Info className="w-4 h-4" />
                                </Button>
                              )}
                              {!plan.completed && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleComplete(plan.id)}
                                  className="engraved-button-outline"
                                >
                                  Выполнено
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exercises */}
          <TabsContent value="exercises" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mariaExerciseDescriptions).map(([key, exercise]) => (
                <Card key={key} className="engraved-card hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedExercise(key)}>
                  <CardHeader>
                    <CardTitle className="engraved-text text-lg">{exercise.title}</CardTitle>
                    <CardDescription>{exercise.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70 mb-3">{exercise.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground/60">Польза:</p>
                      <ul className="text-xs text-foreground/70 space-y-1">
                        {exercise.benefits.map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    {exercise.technique && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs font-semibold text-foreground/60 mb-1">Техника:</p>
                        <p className="text-xs text-foreground/70">{exercise.technique}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Massage */}
          <TabsContent value="massage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mariaMassageTechniques).map(([key, massage]) => (
                <Card key={key} className="engraved-card hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedMassage(key)}>
                  <CardHeader>
                    <CardTitle className="engraved-text text-lg">{massage.title}</CardTitle>
                    <CardDescription>{massage.duration} • {massage.frequency}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70 mb-3">{massage.description}</p>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs font-semibold text-foreground/60 mb-1">Техника:</p>
                      <p className="text-xs text-foreground/70">{massage.technique}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommendations" className="space-y-4">
            {mariaRecommendations.map((category, idx) => (
              <Card key={idx} className="engraved-card">
                <CardHeader>
                  <CardTitle className="engraved-text">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Exercise Detail Dialog */}
        <Dialog open={selectedExercise !== null} onOpenChange={(open) => !open && setSelectedExercise(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            {selectedExercise && mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions] && (
              <>
                <DialogHeader>
                  <DialogTitle className="engraved-text">
                    {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].title}
                  </DialogTitle>
                  <DialogDescription>
                    Длительность: {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].duration}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Описание</h4>
                      <p className="text-foreground/80">
                        {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Польза</h4>
                      <ul className="space-y-1">
                        {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground/80">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].technique && (
                      <div>
                        <h4 className="font-semibold mb-2">Техника выполнения</h4>
                        <p className="text-foreground/80">
                          {mariaExerciseDescriptions[selectedExercise as keyof typeof mariaExerciseDescriptions].technique}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Massage Detail Dialog */}
        <Dialog open={selectedMassage !== null} onOpenChange={(open) => !open && setSelectedMassage(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh]">
            {selectedMassage && mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques] && (
              <>
                <DialogHeader>
                  <DialogTitle className="engraved-text">
                    {mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques].title}
                  </DialogTitle>
                  <DialogDescription>
                    {mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques].duration} • {mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques].frequency}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Описание</h4>
                      <p className="text-foreground/80">
                        {mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques].description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Техника выполнения</h4>
                      <p className="text-foreground/80">
                        {mariaMassageTechniques[selectedMassage as keyof typeof mariaMassageTechniques].technique}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

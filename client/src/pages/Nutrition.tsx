import { useState } from 'react';
import { ChevronLeft, Plus, Camera, Search, ClipboardList, CheckCircle2, Settings } from 'lucide-react';
import { FeatureButton } from '@/components/FeatureButton';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuestionnaireComponent } from '@/components/Questionnaire';
import { nutritionQuestionnaire } from '@/data/questionnaires/nutrition';
import { SettingsPanel } from '@/components/SettingsPanel';
import { nutritionSettings } from '@/data/settings/nutrition';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Nutrition() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const todayMacros = [
    {
      title: 'Calories',
      value: 1840,
      unit: 'kcal',
      trend: 'stable' as const,
      target: 2200,
      icon: 'nutrition' as const,
      description: 'Goal: 2,200 kcal',
    },
    {
      title: 'Protein',
      value: 120,
      unit: 'g',
      trend: 'up' as const,
      target: 150,
      icon: 'nutrition' as const,
      description: 'Goal: 150g',
    },
    {
      title: 'Carbs',
      value: 180,
      unit: 'g',
      trend: 'stable' as const,
      target: 250,
      icon: 'nutrition' as const,
      description: 'Goal: 250g',
    },
    {
      title: 'Fats',
      value: 65,
      unit: 'g',
      trend: 'down' as const,
      target: 80,
      icon: 'nutrition' as const,
      description: 'Goal: 80g',
    },
  ];

  const meals = [
    {
      id: '1',
      name: 'Breakfast',
      time: '08:00',
      calories: 450,
      items: ['Oatmeal with fruits', 'Coffee'],
      completed: true,
    },
    {
      id: '2',
      name: 'Lunch',
      time: '13:00',
      calories: 650,
      items: ['Chicken salad', 'Steamed vegetables'],
      completed: false,
    },
    {
      id: '3',
      name: 'Dinner',
      time: '19:00',
      calories: 0,
      items: [],
      completed: false,
    },
  ];

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
              <SketchIcon icon="nutrition" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Nutrition</h1>
                <p className="text-foreground/60">Food diary and macronutrient analysis</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Nutrition Module Settings</DialogTitle>
                </DialogHeader>
                <SettingsPanel
                  title="Settings"
                  settings={nutritionSettings}
                  onSave={(settings) => {
                    console.log('Nutrition settings saved:', settings);
                  }}
                  categories={['General', 'Goals', 'Notifications', 'Integrations']}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diary">Diary</TabsTrigger>
            <TabsTrigger value="macros">Macros</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="questionnaire">
              <ClipboardList className="w-4 h-4 mr-2" />
              Questionnaire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Macros Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {todayMacros.map((macro, idx) => (
                <HealthMetricCard
                  key={idx}
                  {...macro}
                  delay={idx * 0.1}
                />
              ))}
            </div>

            {/* Today's Meals */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Today's Meals</h2>
                <Button className="btn-premium" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-4">
                {meals.map((meal, idx) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      meal.completed
                        ? 'bg-primary/5 border-primary/20'
                        : 'bg-muted/30 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{meal.name}</h3>
                        <p className="text-sm text-foreground/60">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{meal.calories} kcal</p>
                        {meal.completed && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                            <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {meal.items.length > 0 && (
                      <div className="mt-2">
                        {meal.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="inline-block px-2 py-1 mr-2 mb-1 text-xs bg-muted rounded-lg text-foreground/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Barcode Scanner', icon: Camera, type: 'lucide' as const },
                { label: 'Search Foods', icon: Search, type: 'lucide' as const },
                { label: 'Add Meal', icon: Plus, type: 'lucide' as const },
                { label: 'Meal Plans', icon: 'nutrition' as const, type: 'sketch' as const },
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="premium-card p-4 text-center"
                >
                  {action.type === 'sketch' ? (
                    <SketchIcon icon={action.icon as any} size={24} className="text-primary mx-auto mb-2" />
                  ) : (
                    <action.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6">
            <div className="flex items-center justify-end gap-2 mb-4">
              <FeatureButton
                label="Barcode Scanner"
                featureName="Barcode Scanner"
                description="Scan food barcodes for quick addition to your food diary. The system will automatically determine the composition and calories."
                icon={<Camera className="h-4 w-4" />}
                size="sm"
              />
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Food
              </Button>
            </div>
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Food Diary</h2>
              <p className="text-foreground/60">Use the buttons above to add foods</p>
            </div>
          </TabsContent>

          <TabsContent value="macros" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Detailed Macronutrient Analysis</h2>
              <div className="space-y-4">
                {todayMacros.map((macro, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{macro.title}</span>
                      <span className="text-sm text-foreground/60">
                        {macro.value} / {macro.target} {macro.unit}
                      </span>
                    </div>
                    <Progress value={(macro.value / macro.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Meal Plans</h2>
              <p className="text-foreground/60">Section under development</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

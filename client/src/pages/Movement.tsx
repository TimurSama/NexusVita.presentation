import { useState } from 'react';
import { ChevronLeft, Activity, TrendingUp, Target, Zap, ClipboardList, CheckCircle2, Settings, Watch } from 'lucide-react';
import { FeatureButton } from '@/components/FeatureButton';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { QuestionnaireComponent } from '@/components/Questionnaire';
import { movementQuestionnaire } from '@/data/questionnaires/movement';
import { SettingsPanel } from '@/components/SettingsPanel';
import { movementSettings } from '@/data/settings/movement';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Movement() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const todayStats = [
    {
      title: 'Steps',
      value: 8420,
      unit: '',
      trend: 'up' as const,
      target: 10000,
      icon: 'movement' as const,
      description: 'Goal: 10,000 steps',
    },
    {
      title: 'Activity',
      value: 45,
      unit: 'min',
      trend: 'up' as const,
      target: 60,
      icon: 'movement' as const,
      description: 'Goal: 60 minutes',
    },
    {
      title: 'Calories',
      value: 420,
      unit: 'kcal',
      trend: 'up' as const,
      icon: 'movement' as const,
      description: 'Burned today',
    },
  ];

  const workouts = [
    {
      id: '1',
      name: 'Strength Training',
      duration: 45,
      calories: 320,
      date: '2025-02-12',
      completed: true,
    },
    {
      id: '2',
      name: 'Cardio',
      duration: 30,
      calories: 250,
      date: '2025-02-11',
      completed: true,
    },
    {
      id: '3',
      name: 'Yoga',
      duration: 60,
      calories: 180,
      date: '2025-02-10',
      completed: true,
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
              <SketchIcon icon="movement" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Movement</h1>
                <p className="text-foreground/60">Activity and workout tracking</p>
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
                  <DialogTitle>Movement Module Settings</DialogTitle>
                </DialogHeader>
                <SettingsPanel
                  title="Settings"
                  settings={movementSettings}
                  onSave={(settings) => {
                    console.log('Movement settings saved:', settings);
                  }}
                  categories={['General', 'Goals', 'Integrations', 'Notifications']}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="questionnaire">
              <ClipboardList className="w-4 h-4 mr-2" />
              Questionnaire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Today Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {todayStats.map((stat, idx) => (
                <HealthMetricCard
                  key={idx}
                  {...stat}
                  delay={idx * 0.1}
                />
              ))}
            </div>

            {/* Weekly Progress */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Weekly Progress</h2>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const progress = Math.random() * 100;
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{day}</span>
                        <span className="text-sm text-foreground/60">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Start Workout', icon: Activity },
                { label: 'Add Activity', icon: Zap },
                { label: 'Goals', icon: Target },
                { label: 'Statistics', icon: TrendingUp },
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
                  <action.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </motion.button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="space-y-6">
            <div className="flex items-center justify-end gap-2 mb-4">
              <FeatureButton
                label="Connect Device"
                featureName="Wearables Integration"
                description="Connect Apple Watch, Garmin, Fitbit or other devices for automatic synchronization of workout data, heart rate and activity."
                icon={<Watch className="h-4 w-4" />}
                size="sm"
              />
            </div>
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Workout History</h2>
                <Button className="btn-premium">New Workout</Button>
              </div>
              <div className="space-y-4">
                {workouts.map((workout, idx) => (
                  <motion.div
                    key={workout.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{workout.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <span>{workout.duration} min</span>
                          <span>{workout.calories} kcal</span>
                          <span>{workout.date}</span>
                        </div>
                      </div>
                      {workout.completed && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Workout Programs</h2>
              <p className="text-foreground/60">Section under development</p>
            </div>
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Activity Questionnaire</h2>
                  <p className="text-foreground/60">
                    Tell us about your physical activity and goals
                  </p>
                </div>
                {questionnaireCompleted && (
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Questionnaire Completed</span>
                  </div>
                )}
              </div>
              <QuestionnaireComponent
                questionnaire={movementQuestionnaire}
                onComplete={(answers) => {
                  console.log('Movement questionnaire answers:', answers);
                  setQuestionnaireCompleted(true);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Analytics</h2>
              <p className="text-foreground/60">Section under development</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, Calendar, TrendingUp } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'fitness' | 'mental' | 'social';
  frequency: 'daily' | 'weekly';
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  color: string;
}

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Drink 2 liters of water',
      description: 'Daily water intake',
      category: 'health',
      frequency: 'daily',
      streak: 12,
      bestStreak: 30,
      completedToday: true,
      color: 'bg-blue-500',
    },
    {
      id: '2',
      title: '10,000 steps',
      description: 'Daily step goal',
      category: 'fitness',
      frequency: 'daily',
      streak: 8,
      bestStreak: 15,
      completedToday: false,
      color: 'bg-green-500',
    },
    {
      id: '3',
      title: 'Meditation 10 minutes',
      description: 'Daily practice',
      category: 'mental',
      frequency: 'daily',
      streak: 21,
      bestStreak: 21,
      completedToday: true,
      color: 'bg-purple-500',
    },
    {
      id: '4',
      title: 'Reading 30 minutes',
      description: 'Development and learning',
      category: 'mental',
      frequency: 'daily',
      streak: 5,
      bestStreak: 12,
      completedToday: false,
      color: 'bg-amber-500',
    },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit =>
      habit.id === id
        ? { ...habit, completedToday: !habit.completedToday, streak: habit.completedToday ? habit.streak - 1 : habit.streak + 1 }
        : habit
    ));
  };

  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedToday = habits.filter(h => h.completedToday).length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Habits</h1>
            <p className="text-foreground/60">
              Build healthy habits day by day
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-premium">
                <Plus className="w-4 h-4 mr-2" />
                New Habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Example: Drink water" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input placeholder="Habit description" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="mental">Mental</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Daily" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full btn-premium">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Active Streaks</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalStreaks}</p>
            <p className="text-sm text-foreground/60 mt-1">Total days in a row</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="premium-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Today</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {completedToday} / {habits.length}
            </p>
            <p className="text-sm text-foreground/60 mt-1">Habits completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="premium-card p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Progress</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {Math.round((completedToday / habits.length) * 100)}%
            </p>
            <p className="text-sm text-foreground/60 mt-1">Completion today</p>
          </motion.div>
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          {habits.map((habit, idx) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl ${habit.color} flex items-center justify-center flex-shrink-0`}>
                    <SketchIcon
                      icon={habit.category === 'health' ? 'heart' : habit.category === 'fitness' ? 'movement' : 'brain'}
                      size={24}
                      className="text-white"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-1">{habit.title}</h3>
                    <p className="text-sm text-foreground/60 mb-3">{habit.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          {habit.streak} days
                        </span>
                      </div>
                      <span className="text-sm text-foreground/60">
                        Best: {habit.bestStreak} days
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleHabit(habit.id)}
                  className={`ml-4 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                    habit.completedToday
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {habit.completedToday ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

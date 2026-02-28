import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CalendarEvent {
  id: string;
  time: string;
  title: string;
  type: 'workout' | 'meal' | 'therapy' | 'medication' | 'other';
  description?: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: Record<string, CalendarEvent[]> = {
    '2025-02-12': [
      { id: '1', time: '07:00', title: 'Morning Exercise', type: 'workout' },
      { id: '2', time: '08:00', title: 'Breakfast', type: 'meal' },
      { id: '3', time: '12:00', title: 'Lunch', type: 'meal' },
      { id: '4', time: '18:00', title: 'Workout', type: 'workout' },
      { id: '5', time: '22:00', title: 'Meditation', type: 'therapy' },
    ],
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Empty cells for days before month start
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'workout': return 'bg-primary/10 text-primary border-primary/20';
      case 'meal': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'therapy': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'medication': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-foreground border-border';
    }
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const dayEvents = events[selectedDateKey] || [];

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
            <h1 className="text-4xl font-bold text-foreground mb-2">Calendar</h1>
            <p className="text-foreground/60">
              Planning and activity tracking
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-premium">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Event</DialogTitle>
              </DialogHeader>
              <p className="text-foreground/60">Event form (under development)</p>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 premium-card p-6"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-2xl font-bold text-foreground">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-foreground/60 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                if (!day) {
                  return <div key={idx} className="aspect-square" />;
                }

                const dayKey = formatDateKey(day);
                const hasEvents = events[dayKey]?.length > 0;
                const isToday = formatDateKey(new Date()) === dayKey;
                const isSelected = formatDateKey(selectedDate) === dayKey;

                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-xl p-2 transition-all ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : isToday
                        ? 'bg-primary/10 text-primary border-2 border-primary'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">{day.getDate()}</div>
                    {hasEvents && (
                      <div className="flex gap-1 justify-center">
                        {events[dayKey]?.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-primary-foreground' : 'bg-primary'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="premium-card p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>

            {dayEvents.length > 0 ? (
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${getEventColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold">{event.time}</span>
                      <SketchIcon
                        icon={
                          event.type === 'workout'
                            ? 'movement'
                            : event.type === 'meal'
                            ? 'nutrition'
                            : 'psychology'
                        }
                        size={16}
                      />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
                    {event.description && (
                      <p className="text-sm text-foreground/60">{event.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-foreground/60">
                <p>No events for this day</p>
                <Button variant="ghost" className="mt-4">
                  Add Event
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

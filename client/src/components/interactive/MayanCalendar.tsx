import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface MayanCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

export function MayanCalendar({ value, onChange, label = 'Дата рождения' }: MayanCalendarProps) {
  const [selectedDay, setSelectedDay] = useState(value.getDate());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());

  const dayY = useMotionValue(0);
  const monthY = useMotionValue(0);
  const yearY = useMotionValue(0);

  const daySpring = useSpring(dayY, { damping: 30, stiffness: 300 });
  const monthSpring = useSpring(monthY, { damping: 30, stiffness: 300 });
  const yearSpring = useSpring(yearY, { damping: 30, stiffness: 300 });

  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    onChange(newDate);
  }, [selectedDay, selectedMonth, selectedYear, onChange]);

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    dayY.set(-(day - 1) * 50);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    monthY.set(-month * 50);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const yearIndex = years.indexOf(year);
    yearY.set(-yearIndex * 50);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {label && (
        <label className="text-sm font-medium text-foreground/70 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {label}
        </label>
      )}

      {/* Mayan Calendar Wheel */}
      <div className="relative w-80 h-80">
        {/* Outer ring - Year */}
        <div className="absolute inset-0 rounded-full border-8 border-amber-600/30 bg-gradient-to-br from-amber-900/20 to-amber-700/20">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ rotate: yearSpring }}
            drag="y"
            dragConstraints={{ top: -1000, bottom: 1000 }}
            onDrag={(_, info) => {
              const delta = info.offset.y;
              const steps = Math.round(delta / 50);
              const currentIndex = years.indexOf(selectedYear);
              const newIndex = Math.max(0, Math.min(years.length - 1, currentIndex - steps));
              if (newIndex !== currentIndex) {
                handleYearChange(years[newIndex]);
              }
            }}
          >
            {years.slice(0, 20).map((year, index) => {
              const angle = (index / 20) * 360;
              const radius = 140;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <div
                  key={year}
                  className="absolute text-xs font-bold text-amber-600"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {year}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Middle ring - Month */}
        <div className="absolute inset-8 rounded-full border-6 border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-orange-700/20">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ rotate: monthSpring }}
            drag="y"
            dragConstraints={{ top: -600, bottom: 600 }}
            onDrag={(_, info) => {
              const delta = info.offset.y;
              const steps = Math.round(delta / 50);
              const newMonth = Math.max(0, Math.min(11, selectedMonth - steps));
              if (newMonth !== selectedMonth) {
                handleMonthChange(newMonth);
              }
            }}
          >
            {months.map((month, index) => {
              const angle = (index / 12) * 360;
              const radius = 100;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <div
                  key={month}
                  className="absolute text-xs font-semibold text-orange-500"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {month.slice(0, 3)}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Inner circle - Day */}
        <div className="absolute inset-16 rounded-full border-4 border-yellow-500/40 bg-gradient-to-br from-yellow-900/30 to-yellow-700/30 flex items-center justify-center">
          <motion.div
            className="text-4xl font-bold text-yellow-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            {selectedDay}
          </motion.div>
        </div>

        {/* Center indicator */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary z-10" />
      </div>

      {/* Date display */}
      <div className="text-center">
        <motion.div
          key={`${selectedDay}-${selectedMonth}-${selectedYear}`}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-primary mb-2"
        >
          {selectedDay} {months[selectedMonth]} {selectedYear}
        </motion.div>
        <p className="text-xs text-foreground/50">Вращайте кольца для выбора</p>
      </div>

      {/* Quick controls */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <label className="text-xs text-foreground/60">День</label>
          <div className="flex gap-1">
            <button
              onClick={() => handleDayChange(Math.max(1, selectedDay - 1))}
              className="px-3 py-1 rounded bg-background border border-border hover:bg-accent"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="31"
              value={selectedDay}
              onChange={(e) => handleDayChange(Math.max(1, Math.min(31, parseInt(e.target.value) || 1)))}
              className="w-16 text-center border border-border rounded bg-background"
            />
            <button
              onClick={() => handleDayChange(Math.min(31, selectedDay + 1))}
              className="px-3 py-1 rounded bg-background border border-border hover:bg-accent"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-xs text-foreground/60">Месяц</label>
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(parseInt(e.target.value))}
            className="px-3 py-1 rounded bg-background border border-border"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-xs text-foreground/60">Год</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="px-3 py-1 rounded bg-background border border-border"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

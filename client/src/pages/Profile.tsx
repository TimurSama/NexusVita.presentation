import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Pill, Activity, AlertCircle, TrendingUp } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const healthScore = 87;
  const riskLevel = 'low';

  const biometrics = [
    { label: 'Возраст', value: '32 года' },
    { label: 'Рост', value: '175 см' },
    { label: 'Вес', value: '72 кг' },
    { label: 'ИМТ', value: '23.5' },
  ];

  const recentAnalyses = [
    { date: '2025-02-10', type: 'Общий анализ крови', status: 'Норма' },
    { date: '2025-01-15', type: 'Биохимия', status: 'Норма' },
    { date: '2024-12-20', type: 'Гормоны', status: 'Требует внимания' },
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Профиль здоровья</h1>
          <p className="text-foreground/60">
            Единая цифровая карта вашего здоровья
          </p>
        </motion.div>

        {/* Health Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Индекс здоровья</h2>
              <p className="text-foreground/60">Динамический показатель состояния</p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-primary"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - healthScore / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">{healthScore}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl ${
              riskLevel === 'low' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
            }`}>
              <span className="text-sm font-semibold">
                Риск: {riskLevel === 'low' ? 'Низкий' : 'Средний'}
              </span>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground/60">+3% за месяц</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="biometrics">Биометрия</TabsTrigger>
            <TabsTrigger value="medical">Медицина</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Biometrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {biometrics.map((bio, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card p-4"
                >
                  <p className="text-sm text-foreground/60 mb-1">{bio.label}</p>
                  <p className="text-2xl font-bold text-foreground">{bio.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Недавняя активность</h3>
              <div className="space-y-3">
                {recentAnalyses.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{item.type}</p>
                        <p className="text-sm text-foreground/60">{item.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      item.status === 'Норма'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="biometrics" className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Биометрические данные</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Возраст', value: '32', unit: 'лет' },
                  { label: 'Рост', value: '175', unit: 'см' },
                  { label: 'Вес', value: '72', unit: 'кг' },
                  { label: 'ИМТ', value: '23.5', unit: '' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-muted/30">
                    <p className="text-sm text-foreground/60 mb-1">{item.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">{item.value}</span>
                      {item.unit && <span className="text-foreground/60">{item.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Медицинская история</h3>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Документы и анализы</h3>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

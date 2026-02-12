import { useState } from 'react';
import { ChevronLeft, Upload, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Medicine() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  const diagnosticAreas = [
    {
      name: 'Кардиоваскулярная система',
      icon: 'heart' as const,
      metrics: [
        { label: 'Артериальное давление', value: '120/80', status: 'normal' },
        { label: 'Пульс', value: '72', unit: 'уд/мин', status: 'normal' },
        { label: 'Холестерин', value: '4.8', unit: 'ммоль/л', status: 'normal' },
      ]
    },
    {
      name: 'Дыхательная система',
      icon: 'chart' as const,
      metrics: [
        { label: 'Функция легких', value: 'FEV1', status: 'normal' },
        { label: 'Кислород в крови', value: '98', unit: '%', status: 'normal' },
        { label: 'Дыхательный индекс', value: 'Оптимальный', status: 'normal' },
      ]
    },
    {
      name: 'Метаболизм',
      icon: 'scale' as const,
      metrics: [
        { label: 'Глюкоза крови', value: '5.2', unit: 'ммоль/л', status: 'normal' },
        { label: 'ИМТ', value: '23.5', status: 'normal' },
        { label: 'Метаболический возраст', value: '28', unit: 'лет', status: 'normal' },
      ]
    },
    {
      name: 'Иммунная система',
      icon: 'monitor' as const,
      metrics: [
        { label: 'Лейкоциты', value: '6.2', unit: '×10⁹/л', status: 'normal' },
        { label: 'Антитела', value: 'Защита', status: 'normal' },
        { label: 'Воспаление', value: 'Контроль', status: 'normal' },
      ]
    },
  ];

  const recentLabs = [
    { date: '2025-02-10', type: 'Общий анализ крови', status: 'normal', icon: 'chart' },
    { date: '2025-01-15', type: 'Биохимия', status: 'normal', icon: 'chart' },
    { date: '2024-12-20', type: 'Гормоны', status: 'attention', icon: 'chart' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 md:ml-64">
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
              <SketchIcon icon="medicine" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Медицина</h1>
                <p className="text-foreground/60">Диагностика и профилактика</p>
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="labs">Анализы</TabsTrigger>
            <TabsTrigger value="diagnostics">Диагностика</TabsTrigger>
            <TabsTrigger value="prevention">Профилактика</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Анализов</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{recentLabs.length}</p>
                <p className="text-sm text-foreground/60 mt-1">За последние 3 месяца</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Тренд</h3>
                </div>
                <p className="text-3xl font-bold text-primary">+5%</p>
                <p className="text-sm text-foreground/60 mt-1">Улучшение показателей</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Внимание</h3>
                </div>
                <p className="text-3xl font-bold text-accent">1</p>
                <p className="text-sm text-foreground/60 mt-1">Требует внимания</p>
              </motion.div>
            </div>

            {/* Recent Labs */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Недавние анализы</h2>
                <Link href="/medicine/labs">
                  <Button variant="ghost" size="sm">
                    Все анализы →
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentLabs.map((lab, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <SketchIcon icon={lab.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{lab.type}</p>
                        <p className="text-sm text-foreground/60">{lab.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      lab.status === 'normal'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {lab.status === 'normal' ? 'Норма' : 'Внимание'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="labs" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Лабораторные анализы</h2>
                  <p className="text-foreground/60">Загрузите результаты анализов для анализа</p>
                </div>
                <Button className="btn-premium">
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить анализ
                </Button>
              </div>
              <div className="text-center py-12 text-foreground/60">
                <FileText className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                <p>Загрузите первый анализ для начала</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diagnosticAreas.map((area, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <SketchIcon icon={area.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{area.name}</h3>
                  </div>
                  <div className="space-y-3">
                    {area.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">{metric.label}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-foreground">{metric.value}</span>
                            {metric.unit && <span className="text-sm text-foreground/60">{metric.unit}</span>}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          metric.status === 'normal' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                        }`}>
                          {metric.status === 'normal' ? 'Норма' : 'Внимание'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Программы профилактики</h2>
              <p className="text-foreground/60">Раздел в разработке</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

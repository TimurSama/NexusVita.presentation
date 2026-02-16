import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Calendar, FileText, Pill, Activity, AlertCircle, TrendingUp, Edit, Wallet, Settings } from 'lucide-react';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WheelPicker } from '@/components/interactive/WheelPicker';
import { WeightSelector } from '@/components/interactive/WeightSelector';
import { MayanCalendar } from '@/components/interactive/MayanCalendar';
import { FeatureButton } from '@/components/FeatureButton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, profile: userProfile, refreshProfile } = useUser();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isEditingBiometrics, setIsEditingBiometrics] = useState(false);
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>('');
  const [bloodType, setBloodType] = useState<string>('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      if (userProfile) {
        setHeight(userProfile.height || null);
        setWeight(userProfile.weight || null);
        setGender(userProfile.gender || '');
        setBloodType(userProfile.blood_type || '');
        if (userProfile.date_of_birth) {
          setBirthDate(new Date(userProfile.date_of_birth));
        }
      }

      // Load tokens
      try {
        const tokensResponse = await fetch(`/api/users/${user.id}/account?action=tokens`);
        if (tokensResponse.ok) {
          const tokensData = await tokensResponse.json();
          setTokenBalance(tokensData.balance || 0);
        }
      } catch (error) {
        console.error('Error loading tokens:', error);
      }

      // Load documents
      try {
        const docsResponse = await fetch(`/api/users/${user.id}/documents`);
        if (docsResponse.ok) {
          const docsData = await docsResponse.json();
          setRecentDocuments(docsData.documents?.slice(0, 5) || []);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      }

      setLoading(false);
    };

    loadData();
  }, [userProfile, user?.id]);

  // Calculate health score from metrics
  const [healthScore, setHealthScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    const calculateHealthScore = async () => {
      if (!user?.id) return;

      try {
        const metricsResponse = await fetch(`/api/users/${user.id}/metrics?limit=50`);
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          const metrics = metricsData.metrics || [];
          
          // Simple health score calculation based on metrics
          let score = 50; // Base score
          
          // Check for various health indicators
          const hasRecentMetrics = metrics.length > 0;
          const hasMultipleTypes = new Set(metrics.map((m: any) => m.metric_type)).size > 2;
          const recentDate = metrics.length > 0 ? new Date(metrics[0].recorded_at || metrics[0].created_at) : null;
          const isRecent = recentDate && (Date.now() - recentDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
          
          if (hasRecentMetrics) score += 20;
          if (hasMultipleTypes) score += 15;
          if (isRecent) score += 15;
          
          // Check profile completeness
          if (userProfile?.height && userProfile?.weight && userProfile?.date_of_birth) {
            score += 10;
          }
          
          score = Math.min(100, Math.max(0, score));
          setHealthScore(score);
          
          // Determine risk level
          if (score >= 80) setRiskLevel('low');
          else if (score >= 50) setRiskLevel('medium');
          else setRiskLevel('high');
        }
      } catch (error) {
        console.error('Error calculating health score:', error);
      }
    };

    calculateHealthScore();
  }, [user?.id, userProfile]);

  const age = birthDate ? Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null;
  const bmi = height && weight ? (weight / ((height / 100) ** 2)).toFixed(1) : null;

  const biometrics = [
    { label: 'Возраст', value: age ? `${age} лет` : 'Не указан', isEmpty: !age },
    { label: 'Рост', value: height ? `${height} см` : 'Не указан', isEmpty: !height },
    { label: 'Вес', value: weight ? `${weight} кг` : 'Не указан', isEmpty: !weight },
    { label: 'ИМТ', value: bmi || 'Не рассчитан', isEmpty: !bmi },
  ];

  const recentAnalyses = recentDocuments.map((doc: any) => ({
    type: doc.title,
    date: new Date(doc.created_at).toLocaleDateString('ru-RU'),
    status: 'Загружено',
  }));

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-full px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Профиль здоровья</h1>
              <p className="text-foreground/60">
                Единая цифровая карта вашего здоровья
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation('/account')}
                className="engraved-button-outline text-xs"
              >
                <Wallet className="w-3 h-3 mr-1" />
                {tokenBalance.toFixed(0)} ETL
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation('/account')}
                className="engraved-button-outline text-xs"
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </div>
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
              riskLevel === 'low' ? 'bg-primary/10 text-primary' : 
              riskLevel === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
              'bg-red-500/10 text-red-600'
            }`}>
              <span className="text-sm font-semibold">
                Риск: {riskLevel === 'low' ? 'Низкий' : riskLevel === 'medium' ? 'Средний' : 'Высокий'}
              </span>
            </div>
            {healthScore > 0 && (
              <>
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground/60">
                  {healthScore >= 80 ? 'Отличное состояние' : healthScore >= 50 ? 'Хорошее состояние' : 'Требует внимания'}
                </span>
              </>
            )}
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
                  className={`premium-card p-4 ${bio.isEmpty ? 'opacity-60' : ''}`}
                >
                  <p className="text-sm text-foreground/60 mb-1">{bio.label}</p>
                  <p className={`text-2xl font-bold ${bio.isEmpty ? 'text-foreground/40' : 'text-foreground'}`}>
                    {bio.isEmpty ? (
                      <span className="text-sm font-normal italic">Введите данные</span>
                    ) : (
                      bio.value
                    )}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Недавняя активность</h3>
              {recentAnalyses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-foreground/40 italic">Нет записей</p>
                  <p className="text-sm text-foreground/30 mt-2">Добавьте документы и анализы в разделе "Документы"</p>
                </div>
              ) : (
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
              )}
            </div>
          </TabsContent>

          <TabsContent value="biometrics" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Биометрические данные</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (isEditingBiometrics) {
                      // Save profile
                      try {
                        if (!user?.id) return;
                        
                        const response = await fetch(`/api/users/${user.id}/profile`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            height,
                            weight,
                            date_of_birth: birthDate?.toISOString(),
                            gender: gender || undefined,
                            blood_type: bloodType || undefined,
                          }),
                        });
                        
                        if (response.ok) {
                          await refreshProfile();
                          toast.success('Профиль сохранен');
                        } else {
                          toast.error('Ошибка при сохранении профиля');
                        }
                      } catch (error) {
                        console.error('Error saving profile:', error);
                        toast.error('Ошибка при сохранении профиля');
                      }
                    }
                    setIsEditingBiometrics(!isEditingBiometrics);
                  }}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  {isEditingBiometrics ? 'Сохранить' : 'Редактировать'}
                </Button>
              </div>
              
              {!isEditingBiometrics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {biometrics.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl bg-muted/30 ${item.isEmpty ? 'opacity-60' : ''}`}>
                      <p className="text-sm text-foreground/60 mb-1">{item.label}</p>
                      <p className={`text-3xl font-bold ${item.isEmpty ? 'text-foreground/40 italic text-lg' : 'text-foreground'}`}>
                        {item.isEmpty ? 'Введите данные' : item.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <WheelPicker
                      value={height || 175}
                      onChange={(v) => setHeight(v)}
                      label="Рост"
                      min={100}
                      max={220}
                      unit="см"
                    />
                    <WeightSelector
                      value={weight || 70}
                      onChange={(v) => setWeight(v)}
                      label="Вес"
                      min={30}
                      max={200}
                      unit="кг"
                    />
                    <MayanCalendar
                      value={birthDate || new Date(1990, 0, 1)}
                      onChange={(v) => setBirthDate(v)}
                      label="Дата рождения"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пол</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-border bg-background"
                      >
                        <option value="">Не указан</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Группа крови</label>
                      <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-border bg-background"
                      >
                        <option value="">Не указана</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Медицинская история</h3>
                <FeatureButton
                  label="Добавить запись"
                  featureName="Медицинская история"
                  description="Ведите полную историю ваших заболеваний, операций, травм и других медицинских событий. Система поможет отслеживать динамику и предоставит аналитику."
                />
              </div>
              <p className="text-foreground/60">Используйте кнопку выше для добавления медицинских записей</p>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Документы и анализы</h3>
                <FeatureButton
                  label="Загрузить документ"
                  featureName="Загрузка медицинских документов"
                  description="Загружайте результаты анализов, выписки, рецепты и другие медицинские документы. Система автоматически распознает данные с помощью OCR технологии."
                />
              </div>
              <p className="text-foreground/60">Используйте кнопку выше для загрузки документов</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

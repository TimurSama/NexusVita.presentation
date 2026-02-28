import { useState } from 'react';
import { ChevronLeft, Upload, FileText, TrendingUp, AlertCircle, Settings, ClipboardList, CheckCircle2 } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import SketchIcon from '@/components/SketchIcon';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuestionnaireComponent } from '@/components/Questionnaire';
import { SettingsPanel, Setting } from '@/components/SettingsPanel';
import { medicalQuestionnaire } from '@/data/questionnaires/medicine';
import { medicineSettings } from '@/data/settings/medicine';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FeatureButton } from '@/components/FeatureButton';
import { Upload } from 'lucide-react';

export default function Medicine() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const diagnosticAreas = [
    {
      name: 'Cardiovascular System',
      icon: 'heart' as const,
      metrics: [
        { label: 'Blood Pressure', value: '120/80', status: 'normal' },
        { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' },
        { label: 'Cholesterol', value: '4.8', unit: 'mmol/L', status: 'normal' },
      ]
    },
    {
      name: 'Respiratory System',
      icon: 'chart' as const,
      metrics: [
        { label: 'Lung Function', value: 'FEV1', status: 'normal' },
        { label: 'Blood Oxygen', value: '98', unit: '%', status: 'normal' },
        { label: 'Breathing Index', value: 'Optimal', status: 'normal' },
      ]
    },
    {
      name: 'Metabolism',
      icon: 'scale' as const,
      metrics: [
        { label: 'Blood Glucose', value: '5.2', unit: 'mmol/L', status: 'normal' },
        { label: 'BMI', value: '23.5', status: 'normal' },
        { label: 'Metabolic Age', value: '28', unit: 'years', status: 'normal' },
      ]
    },
    {
      name: 'Immune System',
      icon: 'monitor' as const,
      metrics: [
        { label: 'White Blood Cells', value: '6.2', unit: '×10⁹/L', status: 'normal' },
        { label: 'Antibodies', value: 'Protected', status: 'normal' },
        { label: 'Inflammation', value: 'Controlled', status: 'normal' },
      ]
    },
  ];

  const recentLabs = [
    { date: '2025-02-10', type: 'Complete Blood Count', status: 'normal', icon: 'chart' },
    { date: '2025-01-15', type: 'Biochemistry', status: 'normal', icon: 'chart' },
    { date: '2024-12-20', type: 'Hormones', status: 'attention', icon: 'chart' },
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
              <SketchIcon icon="medicine" size={32} className="text-primary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Medicine</h1>
                <p className="text-foreground/60">Diagnostics and Prevention</p>
              </div>
            </div>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Medicine Module Settings</DialogTitle>
                </DialogHeader>
                <SettingsPanel
                  title="Settings"
                  settings={medicineSettings}
                  onSave={(settings) => {
                    console.log('Settings saved:', settings);
                    setIsSettingsOpen(false);
                  }}
                  categories={['General', 'Notifications', 'Integrations']}
                />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="labs">Lab Tests</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="questionnaire">
              <ClipboardList className="w-4 h-4 mr-2" />
              Questionnaire
            </TabsTrigger>
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
                  <h3 className="font-semibold text-foreground">Lab Tests</h3>
                </div>
                <p className="text-3xl font-bold text-foreground">{recentLabs.length}</p>
                <p className="text-sm text-foreground/60 mt-1">Last 3 months</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Trend</h3>
                </div>
                <p className="text-3xl font-bold text-primary">+5%</p>
                <p className="text-sm text-foreground/60 mt-1">Improvement in indicators</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="premium-card p-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Attention</h3>
                </div>
                <p className="text-3xl font-bold text-accent">1</p>
                <p className="text-sm text-foreground/60 mt-1">Requires attention</p>
              </motion.div>
            </div>

            {/* Recent Labs */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Recent Lab Tests</h2>
                <Link href="/medicine/labs">
                  <Button variant="ghost" size="sm">
                    All Tests →
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
                      {lab.status === 'normal' ? 'Normal' : 'Attention'}
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
                  <h2 className="text-2xl font-bold text-foreground mb-2">Laboratory Tests</h2>
                  <p className="text-foreground/60">Upload test results for analysis</p>
                </div>
                <Button className="btn-premium">
                  <FeatureButton
                    label="Upload Test"
                    featureName="Test Upload"
                    description="Upload test results in PDF or image format. The system will automatically recognize data using OCR technology and add it to your health profile."
                    icon={<Upload className="h-4 w-4" />}
                    size="sm"
                  />
                </Button>
              </div>
              <div className="text-center py-12 text-foreground/60">
                <FileText className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                <p>Upload your first test to get started</p>
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
                          {metric.status === 'normal' ? 'Normal' : 'Attention'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questionnaire" className="space-y-6">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Medical Questionnaire</h2>
                  <p className="text-foreground/60">
                    Complete the questionnaire to create a comprehensive health profile
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
                questionnaire={medicalQuestionnaire}
                onComplete={(answers) => {
                  console.log('Medical questionnaire answers:', answers);
                  setQuestionnaireCompleted(true);
                  // Will be saved to API
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Prevention Programs</h2>
              <p className="text-foreground/60">Section under development</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

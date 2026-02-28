import { useState } from 'react';
import { ChevronLeft, Activity, TrendingUp } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PhysicalHealth() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Physical Health</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border pb-4">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('assessment')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'assessment'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Assessment
            </button>
            <button
              onClick={() => setSelectedTab('research')}
              className={`px-4 py-2 font-semibold transition-colors ${
                selectedTab === 'research'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              Research
            </button>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Foundation of Systemic Body Stability</h2>
                <p className="text-foreground/70 mb-6">
                  Physical health is the foundation on which the entire human well-being system is built. It includes comprehensive analysis of metabolism, hormonal balance, sleep quality, physical activity level, and recovery.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Anthropometry', desc: 'Height, weight, body type' },
                    { title: 'Metabolism', desc: 'Basal metabolic rate' },
                    { title: 'Sleep', desc: 'Quality and duration of sleep' },
                    { title: 'Activity', desc: 'Types and intensity of workouts' },
                    { title: 'Recovery', desc: 'Recovery time and adaptation' },
                    { title: 'Nutrition', desc: 'Caloric intake and macronutrients' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Systemic Interconnections</h3>
                <p className="text-foreground/70 mb-4">
                  All physical health indicators influence each other through the neuroendocrine system:
                </p>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Sleep quality directly affects hormonal balance and metabolism</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Physical activity improves sleep quality and recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Nutrition provides energy for workouts and recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">→</span>
                    <span>Stress reduces recovery efficiency and hormonal balance</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Assessment Tab */}
          {selectedTab === 'assessment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Interactive Assessment</h2>
                
                <div className="space-y-8">
                  {/* Age */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Age</h3>
                    <p className="text-sm text-foreground/70 mb-4">Select year of birth</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="number" placeholder="Year of birth" className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" />
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Height (cm)</h3>
                    <p className="text-sm text-foreground/70 mb-4">Drag to adjust</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="range" min="140" max="220" defaultValue="175" className="w-full" />
                      <p className="text-center mt-4 text-lg font-bold text-primary">175 cm</p>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Weight (kg)</h3>
                    <p className="text-sm text-foreground/70 mb-4">Drag to adjust</p>
                    <div className="sketch-panel p-6 bg-background">
                      <input type="range" min="40" max="150" defaultValue="75" className="w-full" />
                      <p className="text-center mt-4 text-lg font-bold text-primary">75 kg</p>
                    </div>
                  </div>

                  {/* Body Type */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Body Type</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Ectomorph', 'Mesomorph', 'Endomorph'].map((type, idx) => (
                        <button key={idx} className="sketch-panel p-4 hover:ring-2 hover:ring-primary transition-all">
                          <p className="font-semibold text-foreground">{type}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activity */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Current Physical Activity</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-foreground/70 mb-2">Activity types (select multiple)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {['Strength', 'Cardio', 'Yoga', 'HIIT', 'Swimming', 'Walking', 'Sports', 'Stretching'].map((activity, idx) => (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm text-foreground/70">{activity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-foreground/70 mb-2">Frequency (times per week)</label>
                        <input type="range" min="0" max="7" defaultValue="3" className="w-full" />
                      </div>
                    </div>
                  </div>

                  <button className="btn-sketch bg-primary text-white w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Complete Assessment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Research Tab */}
          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest Research</h2>
              {[
                { title: 'New Recovery Protocols', date: '2026-02-10' },
                { title: 'Neurophysiology of High-Intensity Training', date: '2026-02-08' },
                { title: 'Metabolism and Circadian Rhythms', date: '2026-02-05' },
                { title: 'Innovations in Sleep Monitoring', date: '2026-02-01' },
              ].map((research, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="font-bold text-foreground mb-2">{research.title}</h3>
                  <p className="text-sm text-foreground/60">{research.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

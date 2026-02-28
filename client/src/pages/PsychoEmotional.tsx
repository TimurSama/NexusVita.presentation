import { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PsychoEmotional() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [activePopup, setActivePopup] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Psycho-Emotional Health</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'assessment', 'therapy', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'assessment' && 'Assessment'}
                {tab === 'therapy' && 'Therapy'}
                {tab === 'research' && 'Research'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Psycho-Emotional Health</h2>
                <p className="text-foreground/70 mb-6">
                  Psycho-emotional health is the body's ability to adapt to stressors, regulate emotions, and maintain psychological well-being. It includes stress management, anxiety, motivation, and emotional resilience.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Stress Reactions', icon: '⚡', desc: 'Cortisol and adrenaline levels' },
                    { title: 'Anxiety', icon: '😰', desc: 'Anxiety and phobia index' },
                    { title: 'Motivation', icon: '🎯', desc: 'Dopamine and goal orientation levels' },
                    { title: 'Emotional Resilience', icon: '💪', desc: 'Resilience and adaptability' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'assessment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Interactive Psycho-Emotional Assessment</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Stress Level (scale 1-10)</h3>
                    <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
                    <p className="text-center mt-2 text-primary font-bold">5 / 10</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-4">Stress Sources</h3>
                    <div className="sketch-panel p-6 bg-background space-y-3">
                      {['Work', 'Relationships', 'Finances', 'Health', 'Other'].map((source, idx) => (
                        <label key={idx} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" />
                          <span className="text-foreground/70">{source}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-4">Current Emotional State</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['😊 Joy', '😐 Neutral', '😢 Sadness', '😡 Anger', '😰 Anxiety', '😴 Fatigue'].map((emotion, idx) => (
                        <button key={idx} className="sketch-panel p-3 hover:ring-2 hover:ring-primary transition-all text-sm">
                          {emotion}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="btn-sketch bg-primary text-white w-full py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    Complete Assessment
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'therapy' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Therapeutic Programs</h2>
              {[
                { title: 'Meditation and Mindfulness', count: '120+ programs' },
                { title: 'Cognitive Behavioral Therapy', count: '45+ courses' },
                { title: 'Breathing Techniques', count: '30+ exercises' },
                { title: 'Psychologist Consultations', count: '500+ specialists' },
              ].map((program, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-primary font-semibold">{program.count}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest Research</h2>
              {[
                { title: 'Neuroplasticity and Meditation', date: '2026-02-10' },
                { title: 'Stress and Immune System', date: '2026-02-08' },
                { title: 'Emotional Intelligence and Health', date: '2026-02-05' },
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

      {activePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="sketch-panel bg-background rounded-2xl max-w-2xl w-full">
            <div className="bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">{activePopup.title}</h3>
              <button onClick={() => setActivePopup(null)} className="text-foreground/60 hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-foreground/70">{activePopup.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

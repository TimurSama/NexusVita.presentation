import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SleepRecovery() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Sleep and Recovery</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'tracking', 'recovery', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'tracking' && 'Tracking'}
                {tab === 'recovery' && 'Recovery'}
                {tab === 'research' && 'Research'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Sleep and Recovery</h2>
                <p className="text-foreground/70 mb-6">
                  Sleep is a critical component of health, affecting metabolism, immune system, cognitive functions, and emotional well-being. Recovery includes active rest, stretching, and regenerative practices.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Sleep Quality', icon: '😴', desc: 'Depth and continuity' },
                    { title: 'Duration', icon: '⏱️', desc: 'Hours of sleep per night' },
                    { title: 'Circadian Rhythms', icon: '🌙', desc: 'Synchronization with nature' },
                    { title: 'Recovery', icon: '💪', desc: 'Active rest and regeneration' },
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

          {selectedTab === 'tracking' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Sleep Monitoring</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Wearable Integration</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Apple Watch', 'Fitbit', 'Garmin', 'Oura Ring', 'Whoop', 'Samsung Galaxy'].map((device, idx) => (
                        <button key={idx} className="sketch-panel p-4 hover:ring-2 hover:ring-primary transition-all text-sm font-semibold">
                          {device}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sketch-panel p-6 bg-gradient-to-br from-primary/5 to-primary/2">
                    <h4 className="font-bold text-foreground mb-4">Your Sleep Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Average Sleep Time</span>
                        <span className="text-2xl font-bold text-primary">7.2 h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Sleep Quality</span>
                        <span className="text-2xl font-bold text-primary">82%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground/70">Deep Sleep</span>
                        <span className="text-2xl font-bold text-primary">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'recovery' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Recovery Programs</h2>
              {[
                { title: 'Recovery Yoga', count: '50+ programs' },
                { title: 'Pre-Sleep Meditation', count: '100+ sessions' },
                { title: 'Breathing Techniques', count: '30+ exercises' },
                { title: 'Massage and Stretching', count: '40+ videos' },
              ].map((program, idx) => (
                <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                  <h3 className="font-bold text-foreground mb-2">{program.title}</h3>
                  <p className="text-sm text-primary font-semibold">{program.count}</p>
                </button>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest Research</h2>
              {[
                { title: 'Sleep and Metabolism', date: '2026-02-10' },
                { title: 'Circadian Rhythms and Health', date: '2026-02-08' },
                { title: 'Recovery and Performance', date: '2026-02-05' },
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

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Prevention() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Prevention and Environment</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'environment', 'prevention', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'environment' && 'Environment'}
                {tab === 'prevention' && 'Prevention'}
                {tab === 'research' && 'Research'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Prevention and Environment</h2>
                <p className="text-foreground/70 mb-6">
                  The environment has a direct impact on health. Air quality, water, temperature, pollution, and environmental factors are integrated into the system for personalized recommendations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Air Quality', icon: '💨', desc: 'PM2.5, ozone, CO2' },
                    { title: 'Water Quality', icon: '💧', desc: 'Purity and mineralization' },
                    { title: 'Temperature', icon: '🌡️', desc: 'Comfortable range' },
                    { title: 'Pollution', icon: '⚠️', desc: 'Toxin levels' },
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

          {selectedTab === 'environment' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Environment Monitoring</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { metric: 'Air Quality (AQI)', value: '45', status: 'Good' },
                      { metric: 'Humidity Level', value: '55%', status: 'Optimal' },
                      { metric: 'Temperature', value: '22°C', status: 'Comfortable' },
                      { metric: 'Noise Level', value: '55 dB', status: 'Acceptable' },
                    ].map((item, idx) => (
                      <div key={idx} className="sketch-panel p-4">
                        <p className="text-sm text-foreground/70 mb-2">{item.metric}</p>
                        <p className="text-2xl font-bold text-primary mb-1">{item.value}</p>
                        <p className="text-xs text-foreground/60">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'prevention' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Prevention Programs</h2>
              {[
                { title: 'Vaccination', count: '20+ recommendations' },
                { title: 'Preventive Check-ups', count: '15 types' },
                { title: 'Disease Screening', count: '30+ tests' },
                { title: 'Dispensarization', count: '12 programs' },
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
                { title: 'Air Pollution and Health', date: '2026-02-10' },
                { title: 'Environmental Factors and Longevity', date: '2026-02-08' },
                { title: 'Water Quality and Immunity', date: '2026-02-05' },
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

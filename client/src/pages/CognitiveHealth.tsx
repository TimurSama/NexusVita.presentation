import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function CognitiveHealth() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Cognitive Health</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'assessment', 'training', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'assessment' && 'Assessment'}
                {tab === 'training' && 'Training'}
                {tab === 'research' && 'Research'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Cognitive Health</h2>
                <p className="text-foreground/70 mb-6">
                  Cognitive health includes attention concentration, memory, information processing speed, and strategic thinking. It is a key component of productivity and quality of life.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Concentration', icon: '🎯', desc: 'Ability to focus' },
                    { title: 'Memory', icon: '🧠', desc: 'Short-term and long-term' },
                    { title: 'Processing Speed', icon: '⚡', desc: 'Reaction and analysis' },
                    { title: 'Strategic Thinking', icon: '♟️', desc: 'Planning and analysis' },
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
                <h2 className="text-2xl font-bold text-foreground mb-8">Cognitive Assessment</h2>
                
                <div className="space-y-6">
                  {[
                    { title: 'Attention Test', desc: 'Assess your ability to concentrate' },
                    { title: 'Memory Test', desc: 'Check your short-term and long-term memory' },
                    { title: 'Reaction Speed Test', desc: 'Measure your reaction time' },
                    { title: 'Logical Thinking Test', desc: 'Solve logic puzzles' },
                  ].map((test, idx) => (
                    <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                      <h3 className="font-bold text-foreground mb-2">{test.title}</h3>
                      <p className="text-sm text-foreground/70">{test.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'training' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Training Programs</h2>
              {[
                { title: 'Brain Training', count: '200+ exercises' },
                { title: 'Speed Reading', count: '15 courses' },
                { title: 'Mnemonics', count: '20 techniques' },
                { title: 'Strategy Games', count: '50+ games' },
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
                { title: 'Neuroplasticity and Learning', date: '2026-02-10' },
                { title: 'Sleep Impact on Memory', date: '2026-02-08' },
                { title: 'Cognitive Reserve and Longevity', date: '2026-02-05' },
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

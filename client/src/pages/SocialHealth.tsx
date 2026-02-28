import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function SocialHealth() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center gap-4">
          <button onClick={() => setLocation('/')} className="flex items-center gap-2 text-foreground/70 hover:text-foreground">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-foreground">Social Health</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'community', 'challenges', 'research'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'community' && 'Community'}
                {tab === 'challenges' && 'Challenges'}
                {tab === 'research' && 'Research'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Social Health</h2>
                <p className="text-foreground/70 mb-6">
                  Social health is the quality of relationships, level of support, community involvement, and sense of belonging. It is a critical factor in mental and physical well-being.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Social Connections', icon: '👥', desc: 'Quality of relationships' },
                    { title: 'Support', icon: '🤝', desc: 'Level of social support' },
                    { title: 'Involvement', icon: '🎯', desc: 'Activity in community' },
                    { title: 'Belonging', icon: '❤️', desc: 'Sense of belonging' },
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

          {selectedTab === 'community' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">EthosLife Community</h2>
              {[
                { title: 'Active Members', count: '50,000+' },
                { title: 'Interest Groups', count: '500+' },
                { title: 'Daily Activities', count: '10,000+' },
                { title: 'Monthly Events', count: '200+' },
              ].map((stat, idx) => (
                <div key={idx} className="sketch-panel p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-foreground mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-primary">{stat.count}</p>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'challenges' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Active Challenges</h2>
              {[
                { title: '30-Day Health Challenge', participants: '5,000+' },
                { title: 'Physical Activity Challenge', participants: '3,200+' },
                { title: 'Meditation Challenge', participants: '2,100+' },
                { title: 'Social Interaction Challenge', participants: '1,800+' },
              ].map((challenge, idx) => (
                <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                  <h3 className="font-bold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-primary font-semibold">{challenge.participants} participants</p>
                </button>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest Research</h2>
              {[
                { title: 'Social Connections and Longevity', date: '2026-02-10' },
                { title: 'Loneliness and Health', date: '2026-02-08' },
                { title: 'Community and Mental Well-being', date: '2026-02-05' },
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

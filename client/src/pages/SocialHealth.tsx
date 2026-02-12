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
            <ChevronLeft className="w-5 h-5" /> Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Социальное здоровье</h1>
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
                {tab === 'overview' && 'Обзор'}
                {tab === 'community' && 'Сообщество'}
                {tab === 'challenges' && 'Челленджи'}
                {tab === 'research' && 'Исследования'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-2xl font-bold text-foreground mb-4">Социальное здоровье</h2>
                <p className="text-foreground/70 mb-6">
                  Социальное здоровье — это качество взаимоотношений, уровень поддержки, участие в сообществе и чувство принадлежности. Это критический фактор психического и физического благополучия.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Социальные связи', icon: '👥', desc: 'Качество отношений' },
                    { title: 'Поддержка', icon: '🤝', desc: 'Уровень социальной поддержки' },
                    { title: 'Участие', icon: '🎯', desc: 'Активность в сообществе' },
                    { title: 'Принадлежность', icon: '❤️', desc: 'Чувство принадлежности' },
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
              <h2 className="text-2xl font-bold text-foreground mb-8">Сообщество NexusVita</h2>
              {[
                { title: 'Активные участники', count: '50,000+' },
                { title: 'Группы по интересам', count: '500+' },
                { title: 'Ежедневные активности', count: '10,000+' },
                { title: 'Мероприятия в месяц', count: '200+' },
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
              <h2 className="text-2xl font-bold text-foreground mb-8">Активные челленджи</h2>
              {[
                { title: '30-дневный челленж здоровья', participants: '5,000+' },
                { title: 'Челленж физической активности', participants: '3,200+' },
                { title: 'Челленж медитации', participants: '2,100+' },
                { title: 'Челленж социального взаимодействия', participants: '1,800+' },
              ].map((challenge, idx) => (
                <button key={idx} className="sketch-panel p-6 w-full text-left hover:shadow-lg hover:ring-2 hover:ring-primary transition-all">
                  <h3 className="font-bold text-foreground mb-2">{challenge.title}</h3>
                  <p className="text-sm text-primary font-semibold">{challenge.participants} участников</p>
                </button>
              ))}
            </div>
          )}

          {selectedTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">Последние исследования</h2>
              {[
                { title: 'Социальные связи и долголетие', date: '2026-02-10' },
                { title: 'Одиночество и здоровье', date: '2026-02-08' },
                { title: 'Сообщество и психическое благополучие', date: '2026-02-05' },
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

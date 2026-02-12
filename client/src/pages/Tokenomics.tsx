import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Tokenomics() {
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
            Назад
          </button>
          <h1 className="text-2xl font-bold text-foreground">Токеномика и DAO</h1>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto">
            {['overview', 'token', 'distribution', 'governance'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                  selectedTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab === 'overview' && 'Обзор'}
                {tab === 'token' && 'Токен'}
                {tab === 'distribution' && 'Распределение'}
                {tab === 'governance' && 'Управление'}
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div className="space-y-8">
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h2 className="text-3xl font-bold text-foreground mb-4">Токеномика NexusVita</h2>
                <p className="text-foreground/70 mb-6">
                  NVT (NexusVita Token) — это утилитарный токен, который управляет экосистемой и вознаграждает участников за вклад в развитие платформы.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">1B</h3>
                    <p className="text-foreground/70">Максимальное предложение</p>
                  </div>
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">$0.50</h3>
                    <p className="text-foreground/70">Начальная цена</p>
                  </div>
                  <div className="sketch-panel p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">$500M</h3>
                    <p className="text-foreground/70">Начальная капитализация</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'token' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Характеристики токена</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Стандарт', value: 'ERC-20 (Ethereum)' },
                  { title: 'Максимальное предложение', value: '1,000,000,000 NVT' },
                  { title: 'Начальное предложение', value: '500,000,000 NVT' },
                  { title: 'Период эмиссии', value: '10 лет' },
                  { title: 'Механизм консенсуса', value: 'Proof of Stake' },
                  { title: 'Награда за стейкинг', value: '8-12% годовых' },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-lg font-bold text-primary">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Утилиты токена</h3>
                <div className="space-y-4">
                  {[
                    'Оплата подписок и услуг на платформе',
                    'Стейкинг для получения вознаграждений',
                    'Голосование в DAO за развитие платформы',
                    'Доступ к премиум-функциям',
                    'Вознаграждение за рефералов',
                    'Участие в распределении доходов платформы',
                  ].map((utility, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-foreground/70">{utility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'distribution' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Распределение токенов</h2>
              
              <div className="space-y-4">
                {[
                  { category: 'Команда', percentage: '20%', amount: '200M NVT', vesting: '4 года' },
                  { category: 'Инвесторы', percentage: '25%', amount: '250M NVT', vesting: '2 года' },
                  { category: 'Сообщество', percentage: '30%', amount: '300M NVT', vesting: 'Текущее' },
                  { category: 'Резерв', percentage: '15%', amount: '150M NVT', vesting: 'По мере необходимости' },
                  { category: 'Партнёры', percentage: '10%', amount: '100M NVT', vesting: '1 год' },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-foreground">{item.category}</h3>
                        <p className="text-sm text-foreground/70">{item.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{item.percentage}</p>
                        <p className="text-xs text-foreground/60">{item.vesting}</p>
                      </div>
                    </div>
                    <div className="w-full bg-background rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'governance' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">DAO и управление</h2>
              
              <div className="sketch-panel p-8 bg-gradient-to-br from-primary/5 to-primary/2">
                <h3 className="text-xl font-bold text-foreground mb-4">Структура DAO</h3>
                <p className="text-foreground/70 mb-6">
                  NexusVita DAO управляет развитием платформы через децентрализованное голосование. Держатели NVT получают право голоса пропорционально своим владениям.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Стратегические решения',
                    desc: 'Выбор направлений развития платформы'
                  },
                  {
                    title: 'Бюджетирование',
                    desc: 'Распределение средств на развитие'
                  },
                  {
                    title: 'Партнёрства',
                    desc: 'Одобрение новых партнёров и интеграций'
                  },
                  {
                    title: 'Параметры системы',
                    desc: 'Изменение комиссий и параметров алгоритмов'
                  },
                  {
                    title: 'Управление резервом',
                    desc: 'Использование резервных токенов'
                  },
                  {
                    title: 'Вознаграждения',
                    desc: 'Установка размеров вознаграждений за стейкинг'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="sketch-panel p-6">
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="sketch-panel p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Процесс голосования</h3>
                <div className="space-y-4">
                  {[
                    { step: '1. Предложение', desc: 'Любой держатель NVT может создать предложение' },
                    { step: '2. Обсуждение', desc: '7 дней для обсуждения в сообществе' },
                    { step: '3. Голосование', desc: '14 дней голосования с кворумом 50%' },
                    { step: '4. Реализация', desc: 'Одобренные предложения реализуются командой' },
                  ].map((item, idx) => (
                    <div key={idx} className="sketch-panel p-4">
                      <h4 className="font-bold text-foreground mb-1">{item.step}</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

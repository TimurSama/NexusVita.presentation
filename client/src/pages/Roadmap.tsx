import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Coins, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  Clock,
  Wallet,
  Code2,
  Megaphone,
  Globe,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/i18n';

interface RoadmapPhase {
  id: string;
  period: string;
  title: string;
  status: 'completed' | 'active' | 'upcoming';
  icon: React.ElementType;
  color: string;
  budget?: string;
  description: string;
  milestones: {
    title: string;
    completed: boolean;
    value?: string;
    details?: string;
  }[];
  tokenomics?: {
    label: string;
    value: string;
    change?: string;
  }[];
}

const roadmapData: RoadmapPhase[] = [
  {
    id: 'foundation',
    period: 'Q1 2024 - Q4 2025',
    title: 'Foundation & Development',
    status: 'completed',
    icon: Code2,
    color: 'from-emerald-500 to-teal-600',
    budget: '$141,000',
    description: 'Core platform development, database architecture, and MVP launch',
    milestones: [
      { 
        title: 'Development Hours', 
        completed: true, 
        value: '2,450 hrs',
        details: 'Architecture, backend, frontend, mobile optimization'
      },
      { 
        title: 'Database Tables', 
        completed: true, 
        value: '47 tables',
        details: 'Profiles, health modules, payments, tokenomics, social features'
      },
      { 
        title: 'Health Modules', 
        completed: true, 
        value: '7 modules',
        details: 'Medicine, Movement, Nutrition, Psychology, Sleep, Relationships, Habits'
      },
      { 
        title: 'AI Integration', 
        completed: true, 
        value: '3 providers',
        details: 'Groq, Gemini, Qwen with unified interface'
      },
      { 
        title: 'Payment Systems', 
        completed: true, 
        value: 'Multi-currency',
        details: 'Crypto (NOWPayments), UNITY tokens, Stripe ready'
      },
    ],
    tokenomics: [
      { label: 'Token Standard', value: 'ERC-20 (Planned)' },
      { label: 'Exchange Rate', value: '1 USD = 8.5 UNITY' },
      { label: 'Token Bonus', value: '15% on payments' },
    ]
  },
  {
    id: 'presale',
    period: 'Q1 2026',
    title: 'Pre-Seed & Token Launch',
    status: 'active',
    icon: Rocket,
    color: 'from-blue-500 to-indigo-600',
    budget: 'Target: $500K - $1M',
    description: 'Initial funding round, token smart contract deployment, community building',
    milestones: [
      { 
        title: 'Valuation', 
        completed: true, 
        value: '$2.5-3M',
        details: 'Based on 2,450 dev hours at $60-120/hr market rate'
      },
      { 
        title: 'Smart Contract', 
        completed: false, 
        value: 'In Progress',
        details: 'UNITY token ERC-20, vesting, staking mechanics'
      },
      { 
        title: 'Whitepaper', 
        completed: true, 
        value: 'Published',
        details: 'Complete tokenomics, use cases, technical specs'
      },
      { 
        title: 'Community', 
        completed: false, 
        value: '0 → 10K',
        details: 'Telegram, Discord, Twitter growth campaign'
      },
      { 
        title: 'Beta Users', 
        completed: false, 
        value: 'Target: 1,000',
        details: 'Onboarding with referral rewards in UNITY'
      },
    ],
    tokenomics: [
      { label: 'Pre-seed Price', value: '$0.02 / UNITY', change: '80% discount' },
      { label: 'Allocation', value: '15% of supply' },
      { label: 'Vesting', value: '12 months cliff + 24 mo' },
    ]
  },
  {
    id: 'growth',
    period: 'Q2-Q3 2026',
    title: 'Growth & Marketing',
    status: 'upcoming',
    icon: Megaphone,
    color: 'from-orange-500 to-amber-600',
    budget: '$800K allocated',
    description: 'Marketing campaigns, partnerships, specialist onboarding',
    milestones: [
      { 
        title: 'Marketing Campaign', 
        completed: false, 
        value: '$400K',
        details: 'Influencers, health bloggers, paid ads (Google, Meta)'
      },
      { 
        title: 'Specialist Network', 
        completed: false, 
        value: '500+',
        details: 'Doctors, trainers, nutritionists onboarded'
      },
      { 
        title: 'Health Centers', 
        completed: false, 
        value: '50+',
        details: 'Partner clinics and wellness centers'
      },
      { 
        title: 'Mobile Apps', 
        completed: false, 
        value: 'iOS & Android',
        details: 'React Native apps with full feature parity'
      },
      { 
        title: 'Wearables', 
        completed: false, 
        value: '10+ devices',
        details: 'Apple Watch, Fitbit, Garmin integration'
      },
    ],
    tokenomics: [
      { label: 'Rewards Pool', value: '25% of supply', change: 'For users & referrals' },
      { label: 'Burn Mechanism', value: '5% of revenue', change: 'Deflationary' },
      { label: 'Staking APY', value: '15-25%', change: 'Based on lock period' },
    ]
  },
  {
    id: 'scale',
    period: 'Q4 2026 - 2027',
    title: 'Scale & Global Expansion',
    status: 'upcoming',
    icon: Globe,
    color: 'from-purple-500 to-violet-600',
    budget: 'Seed Round: $5-10M',
    description: 'Series A preparation, international markets, enterprise solutions',
    milestones: [
      { 
        title: 'Active Users', 
        completed: false, 
        value: '100,000+',
        details: 'Global user base across 20+ countries'
      },
      { 
        title: 'Enterprise', 
        completed: false, 
        value: 'B2B Launch',
        details: 'Corporate wellness programs, insurance integration'
      },
      { 
        title: 'Telemedicine', 
        completed: false, 
        value: 'Full Platform',
        details: 'Video consultations, prescriptions, insurance claims'
      },
      { 
        title: 'Market Cap', 
        completed: false, 
        value: '$50M+',
        details: 'UNITY token fully liquid on DEXs and CEXs'
      },
      { 
        title: 'Series A', 
        completed: false, 
        value: '$20-30M',
        details: 'VC funding for global scaling'
      },
    ],
    tokenomics: [
      { label: 'Public Sale', value: '$0.10 / UNITY', change: 'From $0.02' },
      { label: 'Market Cap', value: '$50M+ target' },
      { label: 'Daily Volume', value: '$1M+ target' },
    ]
  },
];

const investmentBreakdown = [
  { category: 'Development', amount: 85000, percent: 60, icon: Code2, details: '2,450 hours @ avg $35/hr' },
  { category: 'Design & UX', amount: 15000, percent: 11, icon: Target, details: 'UI/UX, prototyping, branding' },
  { category: 'Infrastructure', amount: 12000, percent: 8, icon: Zap, details: 'Servers, DB, APIs, domains' },
  { category: 'Legal & Compliance', amount: 8000, percent: 6, icon: Wallet, details: 'GDPR, HIPAA consultation' },
  { category: 'Marketing Prep', amount: 6000, percent: 4, icon: Megaphone, details: 'Whitepaper, website, content' },
  { category: 'Reserve', amount: 15000, percent: 11, icon: Coins, details: 'Operations, unexpected costs' },
];

const tokenDistribution = [
  { label: 'Community Rewards', value: 25, color: 'bg-emerald-500' },
  { label: 'Pre-seed / Seed', value: 20, color: 'bg-blue-500' },
  { label: 'Team & Advisors', value: 20, color: 'bg-purple-500' },
  { label: 'Marketing', value: 15, color: 'bg-orange-500' },
  { label: 'Liquidity Pool', value: 15, color: 'bg-cyan-500' },
  { label: 'Reserve', value: 5, color: 'bg-gray-500' },
];

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('presale');
  const [activeTab, setActiveTab] = useState<'roadmap' | 'financials' | 'tokenomics'>('roadmap');
  const { t } = useI18n();

  const totalInvested = investmentBreakdown.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-white/20 text-white mb-4">Live Tracking</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">EthosLife Roadmap</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From concept to global health ecosystem. Track our journey, investments, and tokenomics.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">$141K</div>
                <div className="text-sm text-white/80">Invested</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">2,450</div>
                <div className="text-sm text-white/80">Dev Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">$2.5-3M</div>
                <div className="text-sm text-white/80">Valuation</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-3xl font-bold">47</div>
                <div className="text-sm text-white/80">DB Tables</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'roadmap', label: 'Roadmap', icon: Rocket },
              { id: 'financials', label: 'Financials', icon: Wallet },
              { id: 'tokenomics', label: 'Tokenomics', icon: Coins },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ROADMAP TAB */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2" />
              
              {roadmapData.map((phase, index) => {
                const Icon = phase.icon;
                const isExpanded = expandedPhase === phase.id;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start gap-4 md:gap-8 mb-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                        phase.status === 'completed' ? 'bg-emerald-500' :
                        phase.status === 'active' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300'
                      }`} />
                    </div>

                    {/* Content Card */}
                    <div className={`ml-16 md:ml-0 md:w-5/12 ${
                      isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                    }`}>
                      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${
                        phase.status === 'active' ? 'ring-2 ring-blue-500' : ''
                      }`}>
                        <CardHeader className={`bg-gradient-to-r ${phase.color} text-white`}>
                          <div className={`flex items-center gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className={isEven ? 'md:text-right' : ''}>
                              <Badge className="bg-white/20 text-white mb-1">
                                {phase.period}
                              </Badge>
                              <CardTitle className="text-lg">{phase.title}</CardTitle>
                            </div>
                          </div>
                          
                          {phase.budget && (
                            <div className={`mt-3 flex items-center gap-2 text-sm ${isEven ? 'md:justify-end' : ''}`}>
                              <Wallet className="w-4 h-4" />
                              <span className="font-semibold">{phase.budget}</span>
                            </div>
                          )}
                        </CardHeader>
                        
                        <CardContent className="p-4">
                          <p className="text-gray-600 text-sm mb-4">{phase.description}</p>
                          
                          {/* Status Badge */}
                          <div className={`flex items-center gap-2 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                            {phase.status === 'completed' && (
                              <Badge className="bg-emerald-100 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                              </Badge>
                            )}
                            {phase.status === 'active' && (
                              <Badge className="bg-blue-100 text-blue-700">
                                <Clock className="w-3 h-3 mr-1" /> In Progress
                              </Badge>
                            )}
                            {phase.status === 'upcoming' && (
                              <Badge className="bg-gray-100 text-gray-700">
                                <Circle className="w-3 h-3 mr-1" /> Planned
                              </Badge>
                            )}
                          </div>

                          {/* Expandable Milestones */}
                          <button
                            onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {isExpanded ? 'Hide' : 'Show'} Milestones ({phase.milestones.length})
                          </button>
                          
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="mt-4 space-y-3"
                            >
                              {phase.milestones.map((milestone, mIdx) => (
                                <div key={mIdx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className={`mt-0.5 ${milestone.completed ? 'text-emerald-500' : 'text-gray-400'}`}>
                                    {milestone.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-sm">{milestone.title}</span>
                                      {milestone.value && (
                                        <Badge variant="outline" className="text-xs">
                                          {milestone.value}
                                        </Badge>
                                      )}
                                    </div>
                                    {milestone.details && (
                                      <p className="text-xs text-gray-500 mt-1">{milestone.details}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* FINANCIALS TAB */}
        {activeTab === 'financials' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-500" />
                  Investment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">${totalInvested.toLocaleString()}</div>
                  <div className="text-gray-500">Total invested in development</div>
                </div>
                
                <div className="space-y-4">
                  {investmentBreakdown.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{item.percent}%</div>
                        </div>
                      </div>
                      <Progress value={item.percent} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{item.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Development ROI */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Development ROI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-sm text-emerald-700 mb-1">Current Valuation</div>
                  <div className="text-3xl font-bold text-emerald-900">$2.5 - 3.0 Million</div>
                  <div className="text-sm text-emerald-600 mt-2">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    {Math.round((2500000 / totalInvested - 1) * 100)}% ROI from invested capital
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold">2,450</div>
                    <div className="text-sm text-gray-600">Development Hours</div>
                    <div className="text-xs text-gray-400 mt-1">~$58/hr avg cost</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm text-gray-600">Database Tables</div>
                    <div className="text-xs text-gray-400 mt-1">Enterprise scale</div>
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h4 className="font-semibold mb-3">Market Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Similar health apps valuation</span>
                      <span className="font-medium">$2-5M seed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dev cost market rate</span>
                      <span className="font-medium">$80-150/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Our effective rate</span>
                      <span className="font-medium text-emerald-600">~$58/hr</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Funding */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Future Funding Rounds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <Badge className="bg-blue-100 text-blue-700 mb-2">Q1 2026</Badge>
                    <h4 className="font-bold text-lg">Pre-Seed</h4>
                    <div className="text-2xl font-bold text-blue-900">$500K - $1M</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Token smart contract</li>
                      <li>• Marketing campaign</li>
                      <li>• 10K community members</li>
                    </ul>
                    <div className="mt-3 text-xs text-blue-600">
                      Valuation: $2.5-3M
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl">
                    <Badge className="bg-purple-100 text-purple-700 mb-2">Q3-Q4 2026</Badge>
                    <h4 className="font-bold text-lg">Seed Round</h4>
                    <div className="text-2xl font-bold text-purple-900">$5M - $10M</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Global expansion</li>
                      <li>• Mobile apps launch</li>
                      <li>• 100K+ active users</li>
                    </ul>
                    <div className="mt-3 text-xs text-purple-600">
                      Target valuation: $25-40M
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <Badge className="bg-emerald-100 text-emerald-700 mb-2">2027</Badge>
                    <h4 className="font-bold text-lg">Series A</h4>
                    <div className="text-2xl font-bold text-emerald-900">$20M - $30M</div>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Enterprise solutions</li>
                      <li>• Insurance integrations</li>
                      <li>• 1M+ users target</li>
                    </ul>
                    <div className="mt-3 text-xs text-emerald-600">
                      Target valuation: $100M+
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TOKENOMICS TAB */}
        {activeTab === 'tokenomics' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Token Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  UNITY Token Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tokenDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm">{item.label}</span>
                          <span className="font-bold">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                  <h4 className="font-semibold text-amber-900 mb-2">Token Utility</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• 15% discount on subscription payments</li>
                    <li>• Staking rewards: 15-25% APY</li>
                    <li>• Rewards for health achievements</li>
                    <li>• Referral program payouts</li>
                    <li>• Specialist service payments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Token Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Token Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Current Rate</div>
                    <div className="text-lg font-bold">1 USD = 8.5 UNITY</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Payment Bonus</div>
                    <div className="text-lg font-bold text-emerald-600">+15%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Pre-seed Price</div>
                    <div className="text-lg font-bold">$0.02</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Public Sale Target</div>
                    <div className="text-lg font-bold">$0.10</div>
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <h4 className="font-semibold mb-3">Deflationary Mechanisms</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>5% of platform revenue used for buyback & burn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>50% of specialist fees burned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Quarterly token burns based on growth</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900">Earning Opportunities</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-emerald-800">
                    <div>• Daily health goals: 5-50 UNITY</div>
                    <div>• Referrals: 100 UNITY</div>
                    <div>• Achievements: 10-500 UNITY</div>
                    <div>• Content creation: 50-200 UNITY</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token Vesting Schedule */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Vesting Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-xl">
                    <div className="font-semibold text-blue-600 mb-2">Pre-seed</div>
                    <div className="text-sm text-gray-600 mb-2">15% allocation</div>
                    <div className="text-xs space-y-1">
                      <div>• 12 months cliff</div>
                      <div>• 24 months vesting</div>
                      <div>• Price: $0.02</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <div className="font-semibold text-purple-600 mb-2">Seed</div>
                    <div className="text-sm text-gray-600 mb-2">5% allocation</div>
                    <div className="text-xs space-y-1">
                      <div>• 6 months cliff</div>
                      <div>• 18 months vesting</div>
                      <div>• Price: $0.05</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <div className="font-semibold text-emerald-600 mb-2">Team</div>
                    <div className="text-sm text-gray-600 mb-2">20% allocation</div>
                    <div className="text-xs space-y-1">
                      <div>• 18 months cliff</div>
                      <div>• 36 months vesting</div>
                      <div>• Long-term alignment</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <div className="font-semibold text-orange-600 mb-2">Community</div>
                    <div className="text-sm text-gray-600 mb-2">25% allocation</div>
                    <div className="text-xs space-y-1">
                      <div>• No cliff</div>
                      <div>• Linear release over 48 months</div>
                      <div>• Rewards & incentives</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to join the journey?</h3>
                <p className="text-white/90">Invest in the future of health technology. Pre-seed round open now.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Pitch Deck
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

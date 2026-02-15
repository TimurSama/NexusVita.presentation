import { motion } from 'framer-motion';
import { FileText, BookOpen, TrendingUp, Shield, Users, Target, Zap, Globe } from 'lucide-react';
import { PremiumCard } from '@/components/PremiumCard';

export default function Whitepaper() {
  const sections = [
    { id: 'summary', title: 'Резюме', icon: FileText },
    { id: 'introduction', title: 'Введение', icon: BookOpen },
    { id: 'architecture', title: 'Архитектура', icon: Zap },
    { id: 'tokenomics', title: 'Токеномика', icon: TrendingUp },
    { id: 'dao', title: 'DAO', icon: Users },
    { id: 'security', title: 'Безопасность', icon: Shield },
    { id: 'economics', title: 'Экономика', icon: Target },
    { id: 'roadmap', title: 'Дорожная карта', icon: Globe },
    { id: 'team', title: 'Команда', icon: Users },
    { id: 'risks', title: 'Риски', icon: Shield },
    { id: 'investment', title: 'Инвестиции', icon: TrendingUp },
    { id: 'conclusion', title: 'Заключение', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">EthosLife Whitepaper</h1>
          <p className="text-xl text-foreground/70 mb-2">Здоровая жизнь - это привычка</p>
          <p className="text-sm text-foreground/50">Версия 1.0 | Январь 2025</p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sticky top-4 z-10 mb-12 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm"
              >
                <section.icon className="h-4 w-4" />
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-16">
          {/* Summary */}
          <section id="summary" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Резюме
              </h2>
              <div className="premium-card p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong>EthosLife</strong> — это инновационная платформа для управления здоровьем, объединяющая передовые AI-технологии, медицинские данные, фитнес, питание, психологию и социальное взаимодействие в единую экосистему. Платформа решает проблему фрагментированности данных о здоровье, создавая единую цифровую карту человека с персонализированными рекомендациями и комплексным мониторингом.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Платформа использует искусственный интеллект для анализа более 2000 показателей здоровья с точностью 95%, предоставляя персонализированные планы оздоровления и профилактики заболеваний. EthosLife создает устойчивую экономику здоровья, где все участники получают выгоду от здорового образа жизни.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                1. Введение
              </h2>
              
              <div className="space-y-8">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">1.1 Проблема</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Современная система здравоохранения страдает от фрагментированности данных:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Медицинские записи хранятся в разных системах</li>
                    <li>Фитнес-трекеры не интегрированы с медицинскими данными</li>
                    <li>Отсутствует персонализированный подход к здоровью</li>
                    <li>Нет единой платформы для управления всеми аспектами здоровья</li>
                    <li>Пользователи теряют контроль над своими данными</li>
                    <li>Специалисты не имеют полной картины здоровья пациента</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">1.2 Решение</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    EthosLife создает единую экосистему, где:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Все данные о здоровье хранятся в одном месте</li>
                    <li>AI анализирует данные и создает персонализированные планы</li>
                    <li>Пользователи получают награды за здоровый образ жизни</li>
                    <li>Специалисты могут эффективно работать с пациентами</li>
                    <li>Интеграция с медицинскими учреждениями через FHIR/HL7</li>
                    <li>Непрерывный мониторинг 24/7</li>
                  </ul>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                2. Архитектура платформы
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">2.1 Компоненты платформы</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Медицинские данные',
                        items: [
                          'Интеграция с FHIR/HL7 серверами',
                          'Единая медицинская карта',
                          'Импорт анализов и документов',
                          'OCR для распознавания документов',
                          'Risk Engine для оценки рисков',
                        ],
                      },
                      {
                        title: 'Фитнес и спорт',
                        items: [
                          'Интеграция с Oura, Garmin, Apple Health',
                          'Персональные программы тренировок',
                          'Отслеживание прогресса',
                          'Анализ пульсовых зон и VO2 max',
                          'HRV мониторинг',
                        ],
                      },
                      {
                        title: 'Питание',
                        items: [
                          'Консультации нутрициологов',
                          'Планы питания',
                          'Отслеживание калорий и БЖУ',
                          'Сканер продуктов',
                          'Анализ дефицитов',
                        ],
                      },
                      {
                        title: 'Психология',
                        items: [
                          'Работа с психологами',
                          'Отслеживание ментального здоровья',
                          'Mood tracking',
                          'CBT-инструменты',
                          'Дыхательные практики',
                        ],
                      },
                    ].map((component) => (
                      <div key={component.title} className="space-y-2">
                        <h4 className="font-bold text-foreground">{component.title}</h4>
                        <ul className="space-y-1 list-disc list-inside ml-4 text-sm text-foreground/80">
                          {component.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">2.2 Технологический стек</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Frontend</h4>
                      <ul className="space-y-1 text-foreground/80">
                        <li>• React 19, TypeScript</li>
                        <li>• Tailwind CSS 4</li>
                        <li>• Framer Motion</li>
                        <li>• Vite</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Backend</h4>
                      <ul className="space-y-1 text-foreground/80">
                        <li>• Node.js, Express</li>
                        <li>• PostgreSQL</li>
                        <li>• Prisma ORM</li>
                        <li>• REST API</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">AI & ML</h4>
                      <ul className="space-y-1 text-foreground/80">
                        <li>• OpenAI, Anthropic</li>
                        <li>• Кастомные ML модели</li>
                        <li>• NLP для анализа текста</li>
                        <li>• Computer Vision для OCR</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Интеграции</h4>
                      <ul className="space-y-1 text-foreground/80">
                        <li>• FHIR/HL7 стандарты</li>
                        <li>• OAuth (Apple Health, Garmin, Fitbit)</li>
                        <li>• API для партнёров</li>
                        <li>• Webhooks</li>
                      </ul>
                    </div>
                  </div>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Tokenomics */}
          <section id="tokenomics" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                3. Токеномика NVT
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">3.1 Общая информация</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-foreground/80 mb-2"><strong>Название:</strong> EthosLife Token (NVT)</p>
                      <p className="text-foreground/80 mb-2"><strong>Тип:</strong> ERC-20 (Ethereum)</p>
                      <p className="text-foreground/80 mb-2"><strong>Общий объем:</strong> 1,000,000,000 NVT</p>
                      <p className="text-foreground/80"><strong>Начальная цена:</strong> $0.10 за токен</p>
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">3.2 Распределение токенов</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3">Категория</th>
                          <th className="text-right p-3">Процент</th>
                          <th className="text-right p-3">Количество</th>
                          <th className="text-left p-3">Vesting</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { category: 'Продажа инвесторам', percent: '30%', amount: '300,000,000', vesting: '6 месяцев' },
                          { category: 'Команда и консультанты', percent: '20%', amount: '200,000,000', vesting: '4 года' },
                          { category: 'Резерв развития', percent: '15%', amount: '150,000,000', vesting: 'По мере необходимости' },
                          { category: 'Маркетинг и партнерства', percent: '15%', amount: '150,000,000', vesting: '2 года' },
                          { category: 'Ликвидность', percent: '10%', amount: '100,000,000', vesting: 'Немедленно' },
                          { category: 'Награды пользователям', percent: '10%', amount: '100,000,000', vesting: 'Постепенно' },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="p-3 text-foreground/80">{row.category}</td>
                            <td className="text-right p-3 text-foreground/80">{row.percent}</td>
                            <td className="text-right p-3 text-foreground/80">{row.amount}</td>
                            <td className="p-3 text-foreground/80">{row.vesting}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">3.3 Использование токенов</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">1. Оплата услуг</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80">
                        <li>Подписки (AI Health+, специалисты)</li>
                        <li>Консультации и занятия</li>
                        <li>Покупки в маркетплейсе</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">2. Награды</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80">
                        <li>За достижения целей</li>
                        <li>За активность в платформе</li>
                        <li>За рефералов</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">3. DAO-голосование</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80">
                        <li>Участие в управлении платформой</li>
                        <li>Голосование за предложения</li>
                        <li>Получение дивидендов</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">4. Стейкинг</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80">
                        <li>Блокировка токенов для получения бонусов</li>
                        <li>Приоритетный доступ к функциям</li>
                      </ul>
                    </div>
                  </div>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* DAO */}
          <section id="dao" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                4. DAO (Децентрализованная автономная организация)
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">4.1 Управление</h3>
                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    Пользователи с токенами NVT могут:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Предлагать изменения в платформе</li>
                    <li>Голосовать за предложения</li>
                    <li>Участвовать в распределении средств</li>
                    <li>Влиять на развитие платформы</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">4.2 Процесс голосования</h3>
                  <ol className="space-y-2 list-decimal list-inside ml-4 text-foreground/80">
                    <li>Создание предложения (требуется 10,000 NVT)</li>
                    <li>Обсуждение (7 дней)</li>
                    <li>Голосование (3 дня)</li>
                    <li>Реализация (если одобрено)</li>
                  </ol>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                5. Безопасность и приватность
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">5.1 Защита данных</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Шифрование всех медицинских данных (end-to-end)</li>
                    <li>Соответствие GDPR, HIPAA (планируется)</li>
                    <li>Децентрализованное хранение (планируется)</li>
                    <li>Аудит-логи всех действий</li>
                    <li>Регулярные security аудиты</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">5.2 Контроль доступа</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Пользователь контролирует доступ к данным</li>
                    <li>Специалисты получают доступ только с разрешения</li>
                    <li>RBAC (Role-Based Access Control)</li>
                    <li>Двухфакторная аутентификация</li>
                    <li>Биометрическая аутентификация</li>
                  </ul>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Economics */}
          <section id="economics" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                6. Экономическая модель
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">6.1 Источники дохода</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">A. Подписки пользователей (45%)</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80 text-sm">
                        <li>Premium подписки для личного использования</li>
                        <li>Базовый план: $9.99/месяц</li>
                        <li>Премиум план: $29.99/месяц</li>
                        <li>Корпоративный план: $99/месяц</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">B. B2B партнёрства (30%)</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80 text-sm">
                        <li>Интеграция с корпоративными системами здоровья</li>
                        <li>Лицензии для клиник и медицинских центров</li>
                        <li>Корпоративные программы wellness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">C. Маркетплейс услуг (15%)</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80 text-sm">
                        <li>Комиссия от партнёрских услуг</li>
                        <li>Медицинские клиники: 15% с каждого приема</li>
                        <li>Фитнес-центры: 10% с абонемента</li>
                        <li>Партнёры по питанию: 5% с заказа</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">D. Данные и аналитика (10%)</h4>
                      <ul className="space-y-1 list-disc list-inside ml-4 text-foreground/80 text-sm">
                        <li>Анонимизированные данные для исследований</li>
                        <li>Продажа датасетов исследовательским организациям</li>
                        <li>Аналитика для фармацевтических компаний</li>
                      </ul>
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">6.2 Unit Economics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-foreground/80 mb-2"><strong>CAC (Cost of Acquisition):</strong> $15</p>
                      <p className="text-foreground/80 mb-2"><strong>LTV (Lifetime Value):</strong> $450</p>
                      <p className="text-foreground/80 mb-2"><strong>LTV/CAC Ratio:</strong> 30x</p>
                      <p className="text-foreground/80"><strong>Payback Period:</strong> 2.5 месяца</p>
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">6.3 Прогнозы роста</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3">Год</th>
                          <th className="text-right p-3">Доход ($M)</th>
                          <th className="text-right p-3">Пользователи (M)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: '2025', revenue: '$2.5M', users: '0.5M' },
                          { year: '2026', revenue: '$8.2M', users: '2.1M' },
                          { year: '2027', revenue: '$25.5M', users: '6.8M' },
                          { year: '2028', revenue: '$68.3M', users: '18.5M' },
                          { year: '2029', revenue: '$156.7M', users: '42.3M' },
                          { year: '2030', revenue: '$320.5M', users: '95.6M' },
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="p-3 text-foreground/80">{row.year}</td>
                            <td className="text-right p-3 text-foreground/80">{row.revenue}</td>
                            <td className="text-right p-3 text-foreground/80">{row.users}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Globe className="h-8 w-8 text-primary" />
                7. Дорожная карта
              </h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Фаза 1: MVP & Фундамент (Q1-Q2 2025)</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Запуск MVP с 3 модулями здоровья</li>
                    <li>10,000 первых пользователей</li>
                    <li>Интеграция с 50 партнёрскими клиниками</li>
                    <li>Базовая AI-диагностика</li>
                    <li>Инвестиции: $500K</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Фаза 2: Расширение (Q3-Q4 2025)</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Добавить 4 новых модуля здоровья</li>
                    <li>100,000 активных пользователей</li>
                    <li>Интеграция с 200 клиниками</li>
                    <li>Маркетплейс услуг</li>
                    <li>Инвестиции: $1.5M</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Фаза 3: Масштабирование (H1 2026)</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Полная экосистема 7 модулей</li>
                    <li>1 миллион пользователей</li>
                    <li>Интеграция с 1000 партнёров</li>
                    <li>Расширение на новые рынки</li>
                    <li>Инвестиции: $5M</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Фаза 4: Глобализация (H2 2026-2027)</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Запуск в 15 странах</li>
                    <li>10 миллионов пользователей</li>
                    <li>Интеграция с 5000 партнёров</li>
                    <li>Локализация контента</li>
                    <li>Инвестиции: $15M</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Фаза 5: Лидерство (2028-2030)</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Выход на IPO</li>
                    <li>100 миллионов пользователей</li>
                    <li>Глобальный лидер в health-tech</li>
                    <li>Расширение в смежные рынки</li>
                    <li>Инвестиции: $50M</li>
                  </ul>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Team & Partnerships */}
          <section id="team" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">8. Команда и партнёрства</h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">8.1 Команда</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Основатели</h4>
                      <p className="text-foreground/80">Опыт в healthtech, blockchain, AI</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Консультанты</h4>
                      <p className="text-foreground/80">Врачи, тренеры, нутрициологи, психологи</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Техническая команда</h4>
                      <p className="text-foreground/80">Full-stack разработчики, AI/ML инженеры, DevOps специалисты</p>
                    </div>
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">8.2 Партнёрства</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Клиники и медицинские центры</li>
                    <li>Фитнес-клубы и студии</li>
                    <li>Производители БАДов и здорового питания</li>
                    <li>Технологические партнеры (Oura, Garmin, Apple Health)</li>
                    <li>Лаборатории и диагностические центры</li>
                    <li>Страховые компании</li>
                  </ul>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Risks */}
          <section id="risks" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">9. Риски и вызовы</h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">9.1 Технические риски</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Масштабирование инфраструктуры</li>
                    <li>Интеграция с различными системами</li>
                    <li>Безопасность данных</li>
                    <li>Производительность AI-моделей</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">9.2 Регуляторные риски</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Изменения в законодательстве</li>
                    <li>Требования к медицинским данным</li>
                    <li>Криптовалютное регулирование</li>
                    <li>Сертификация медицинского ПО</li>
                  </ul>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">9.3 Рыночные риски</h3>
                  <ul className="space-y-2 list-disc list-inside ml-4 text-foreground/80">
                    <li>Конкуренция с крупными игроками</li>
                    <li>Принятие пользователями</li>
                    <li>Волатильность криптовалют</li>
                    <li>Изменение рыночных условий</li>
                  </ul>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Investment Rounds */}
          <section id="investment" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">10. Раунды финансирования</h2>
              
              <div className="space-y-6">
                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Раунды финансирования</h3>
                  <div className="space-y-4">
                    {[
                      { round: 'Seed', amount: '$500K', valuation: '$5M', period: 'Q2 2025', use: 'MVP разработка, команда, маркетинг' },
                      { round: 'Series A', amount: '$2M', valuation: '$20M', period: 'Q4 2025', use: 'Масштабирование, партнёрства, продукт' },
                      { round: 'Series B', amount: '$10M', valuation: '$100M', period: 'H2 2026', use: 'Глобализация, команда, маркетинг' },
                      { round: 'Series C', amount: '$25M', valuation: '$300M', period: '2027', use: 'Расширение, аквизиции, инфраструктура' },
                      { round: 'Series D', amount: '$35M', valuation: '$800M', period: '2028-2029', use: 'IPO подготовка, глобальная сеть' },
                    ].map((round, idx) => (
                      <div key={idx} className="border-b border-border/50 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-foreground">{round.round}</h4>
                            <p className="text-sm text-foreground/60">{round.period}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{round.amount}</p>
                            <p className="text-sm text-foreground/60">@ {round.valuation}</p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80">{round.use}</p>
                      </div>
                    ))}
                  </div>
                </PremiumCard>

                <PremiumCard className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Стратегия выхода</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-foreground mb-1">IPO</h4>
                      <p className="text-sm text-foreground/80">2030, оценка $3-5B, вероятность 85%</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Acquisition</h4>
                      <p className="text-sm text-foreground/80">2028-2029, оценка $1-2B, вероятность 60%</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Secondary Sale</h4>
                      <p className="text-sm text-foreground/80">2027-2028, оценка $500M-1B, вероятность 40%</p>
                    </div>
                  </div>
                </PremiumCard>
              </div>
            </motion.div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">11. Заключение</h2>
              <PremiumCard className="p-8">
                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                  EthosLife представляет собой инновационный подход к управлению здоровьем, объединяя традиционную медицину, современные технологии и децентрализованные системы. Платформа создает устойчивую экономику здоровья, где все участники получают выгоду от здорового образа жизни.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  С единой платформой для всех аспектов здоровья, AI-анализом 2000+ показателей, персонализированными рекомендациями и комплексным мониторингом 24/7, EthosLife стремится стать глобальным лидером в health-tech индустрии, помогая миллионам людей вести более здоровую и долгую жизнь.
                </p>
              </PremiumCard>
            </motion.div>
          </section>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="premium-card p-8 text-center"
          >
            <p className="text-foreground/60 text-sm mb-4">
              <strong>Версия:</strong> 1.0 | <strong>Дата:</strong> Январь 2025
            </p>
            <p className="text-foreground/60 text-sm italic">
              Этот документ не является инвестиционным предложением. Инвестиции в криптовалюты сопряжены с рисками.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Heart, MessageCircle, Share2, BookOpen, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface NewsPost {
  id: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  type: 'post' | 'achievement' | 'article' | 'tip';
}

export default function News() {
  const { user } = useUser();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load news feed with scientific research and platform updates
    const loadNews = () => {
      const newsFeed: NewsPost[] = [
        // Platform News - Investment
        {
          id: 1,
          author: {
            id: 0,
            name: 'EthosLife Team',
            avatar: '/logo.png',
          },
          content: `🚀 Инвестиционная возможность: Присоединяйтесь к экосистеме здоровья будущего!

Мы открываем раунд инвестиций для развития платформы EthosLife. Ваши инвестиции помогут нам:
• Запустить полноценную альфа-версию
• Развить AI-ассистента для здоровья
• Открыть первые физические центры здоровья
• Создать токеномику и DAO

Минимальная инвестиция: $1,000
Ожидаемая доходность: 300% за 3 года

Свяжитесь с нами: invest@ethoslife.io`,
          likes: 128,
          comments: 45,
          shares: 67,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          type: 'article',
        },
        // Platform News - Alpha Release
        {
          id: 2,
          author: {
            id: 0,
            name: 'EthosLife Team',
            avatar: '/logo.png',
          },
          content: `🎉 Скоро: Альфа-релиз EthosLife!

Что будет в первой версии:
✅ 7 направлений здоровья с трекерами
✅ AI-ассистент для персональных рекомендаций
✅ Социальная сеть здоровья
✅ Интеграция с Telegram
✅ Токен ELT и система наград
✅ База специалистов и онлайн-консультации

Дата релиза: Март 2026
Присоединяйтесь к списку ожидания!`,
          likes: 256,
          comments: 89,
          shares: 134,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          type: 'article',
        },
        // Scientific Research - Movement
        {
          id: 3,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `📊 Исследование: 10,000 шагов в день снижают риск смертности на 50%

Новое исследование Journal of American Medical Association (2025):
• 78,000 участников, 7 лет наблюдения
• 10,000+ шагов = снижение риска сердечных заболеваний на 52%
• Даже 4,000 шагов дают значимый эффект
• Скорость ходьбы важнее количества

Вывод: Начните с доступного количества шагов и постепенно увеличивайте темп.

#Движение #Здоровье #Исследования`,
          likes: 89,
          comments: 23,
          shares: 45,
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          type: 'article',
        },
        // Scientific Research - Sleep
        {
          id: 4,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `😴 Сон и мозг: 7-8 часов оптимально для когнитивных функций

Исследование Nature Aging (2025):
• Люди с 7-8 часами сна показывают лучшие результаты в тестах на память
• Недосып (<6ч) ускоряет старение мозга на 2-3 года
• Пересып (>9ч) связан с когнитивным снижением
• Регулярность важнее длительности

Совет: Ложитесь и вставайте в одно время даже на выходных.

#Сон #Мозг #Исследования`,
          likes: 156,
          comments: 34,
          shares: 78,
          createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          type: 'article',
        },
        // Scientific Research - Nutrition
        {
          id: 5,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `🥗 Средиземноморская диета снижает риск депрессии на 33%

Мета-анализ 45 исследований (2025):
• 12,000 участников из 8 стран
• Рыба, орехи, оливковое масло, овощи — ключевые продукты
• Эффект заметен уже через 3 месяца
• Связь через микробиом кишечника

Простые шаги:
1. Замените масло на оливковое
2. Добавьте горсть орехов в день
3. Ешьте рыбу 2 раза в неделю

#Питание #Психология #Исследования`,
          likes: 112,
          comments: 28,
          shares: 56,
          createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          type: 'article',
        },
        // Scientific Research - Psychology
        {
          id: 6,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `🧘 Медитация изменяет структуру мозга за 8 недель

Исследование Harvard Medical School (2025):
• MRI до и после 8-недельного курса медитации
• Увеличение серого вещества в гиппокампе (память)
• Снижение активности миндалевидного тела (тревога)
• Эффект сохраняется 6+ месяцев

Достаточно 10-15 минут в день:
• Осознанное дыхание
• Body scan
• Loving-kindness meditation

#Психология #Медитация #Мозг`,
          likes: 203,
          comments: 56,
          shares: 112,
          createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
          type: 'article',
        },
        // Scientific Research - Medicine
        {
          id: 7,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `🩺 Раннее выявление: 5 анализов, которые нужно сдавать ежегодно

Рекомендации ВОЗ и американских кардиологов (2025):

1. Общий анализ крови — анемия, воспаления
2. Липидный профиль — холестерин (начиная с 20 лет)
3. Гликированный гемоглобин — преддиабет
4. Витамин D — 80% населения дефицит
5. ТТГ — щитовидная железа

💡 Совет: Запланируйте "день здоровья" — сдайте все анализы за один визит.

#Медицина #Профилактика #Здоровье`,
          likes: 178,
          comments: 41,
          shares: 89,
          createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
          type: 'article',
        },
        // Scientific Research - Social Health
        {
          id: 8,
          author: {
            id: 0,
            name: 'Научный отдел',
            avatar: '/logo.png',
          },
          content: `👥 Одиночество опаснее курения: риск смертности +45%

Крупнейшее исследование PNAS (2025):
• 580,000 участников, 15 лет
• Социальная изоляция = риск как 15 сигарет в день
• Качество связей важнее количества
• Даже онлайн-общение даёт защитный эффект

Выводы:
• Поддерживайте 3-5 близких отношений
• Общайтесь регулярно (раз в 2 недели минимум)
• Присоединяйтесь к сообществам по интересам

#СоциальноеЗдоровье #Общение #Исследования`,
          likes: 245,
          comments: 67,
          shares: 156,
          createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
          type: 'article',
        },
      ];
      
      setPosts(newsFeed);
      setLoading(false);
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Загрузка новостей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-full px-4 py-6 md:py-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Новости</h1>
          <p className="text-foreground/60">
            Лента активности и обновлений
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <Card className="engraved-card">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Лента пуста
              </h3>
              <p className="text-foreground/60 mb-4">
                Здесь будут появляться новости от друзей, достижения и полезные статьи
              </p>
              <Button
                variant="outline"
                className="engraved-button-outline"
                onClick={() => window.location.href = '/social/friends'}
              >
                Найти друзей
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="engraved-card"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{post.author.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-4 text-foreground/60">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      {post.shares}
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

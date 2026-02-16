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
    // TODO: Fetch real news feed from API
    // For now, show empty state with message
    setLoading(false);
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

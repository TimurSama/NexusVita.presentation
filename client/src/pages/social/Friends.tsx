import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Users, MessageCircle, Heart, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    {
      id: '1',
      name: 'Анна Петрова',
      avatar: '',
      status: 'online',
      mutualFriends: 12,
      healthScore: 85,
      activities: ['Бег', 'Йога'],
      lastActive: '2 минуты назад',
    },
    {
      id: '2',
      name: 'Михаил Соколов',
      avatar: '',
      status: 'offline',
      mutualFriends: 8,
      healthScore: 92,
      activities: ['Тренировки', 'Плавание'],
      lastActive: '1 час назад',
    },
    {
      id: '3',
      name: 'Елена Иванова',
      avatar: '',
      status: 'online',
      mutualFriends: 15,
      healthScore: 78,
      activities: ['Медитация', 'Питание'],
      lastActive: '5 минут назад',
    },
  ];

  const friendRequests = [
    {
      id: '1',
      name: 'Дмитрий Козлов',
      avatar: '',
      mutualFriends: 5,
      healthScore: 88,
    },
    {
      id: '2',
      name: 'Ольга Сидорова',
      avatar: '',
      mutualFriends: 3,
      healthScore: 75,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Друзья</h1>
          <p className="text-foreground/60">
            Ваша социальная сеть здоровья
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <Input
              placeholder="Поиск друзей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 engraved-input"
            />
          </div>
        </motion.div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList>
            <TabsTrigger value="friends">
              <Users className="w-4 h-4 mr-2" />
              Друзья ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              <UserPlus className="w-4 h-4 mr-2" />
              Запросы ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Heart className="w-4 h-4 mr-2" />
              Рекомендации
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {friends.map((friend, idx) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <Card className="engraved-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg engraved-text">{friend.name}</h3>
                            <p className="text-sm text-foreground/60">{friend.lastActive}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="outline" className="engraved-badge">
                            <Activity className="w-3 h-3 mr-1" />
                            Здоровье: {friend.healthScore}%
                          </Badge>
                          <span className="text-sm text-foreground/60">
                            {friend.mutualFriends} общих друзей
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {friend.activities.map((activity, aIdx) => (
                            <Badge key={aIdx} variant="secondary" className="engraved-badge">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {friendRequests.map((request, idx) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <Card className="engraved-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 engraved-text">{request.name}</h3>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="outline" className="engraved-badge">
                            Здоровье: {request.healthScore}%
                          </Badge>
                          <span className="text-sm text-foreground/60">
                            {request.mutualFriends} общих друзей
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="engraved-button">
                            Принять
                          </Button>
                          <Button size="sm" variant="outline" className="engraved-button-outline">
                            Отклонить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="suggestions">
            <Card className="engraved-card">
              <CardContent className="p-6 text-center">
                <p className="text-foreground/60">
                  Рекомендации друзей на основе ваших интересов и целей здоровья
                </p>
                <Button className="mt-4 engraved-button">
                  Найти друзей
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

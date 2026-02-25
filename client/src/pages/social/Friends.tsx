import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Search, UserPlus, Users, MessageCircle, UserCheck, Heart, Activity, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar_url?: string;
  status: 'online' | 'offline';
  health_score?: number;
  activities?: string[];
  last_active?: string;
  is_following?: boolean;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar_url?: string;
  request_date: string;
}

export default function Friends() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('friends');

  useEffect(() => {
    if (token) {
      loadFriends();
      loadRequests();
      loadSuggestions();
    }
  }, [token]);

  const loadFriends = async () => {
    try {
      const res = await fetch('/api/social/friends', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    try {
      const res = await fetch('/api/social/friends/requests', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const loadSuggestions = async () => {
    try {
      const res = await fetch('/api/social/friends/suggestions', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const res = await fetch(`/api/social/follow/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        toast({ title: 'Подписка оформлена', description: 'Вы успешно подписались' });
        loadFriends();
        loadSuggestions();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось подписаться', variant: 'destructive' });
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      const res = await fetch(`/api/social/unfollow/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        toast({ title: 'Отписка', description: 'Вы отписались от пользователя' });
        loadFriends();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отписаться', variant: 'destructive' });
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const res = await fetch(`/api/social/friends/requests/${requestId}/accept`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        toast({ title: 'Запрос принят', description: 'Теперь вы друзья' });
        loadRequests();
        loadFriends();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось принять запрос', variant: 'destructive' });
    }
  };

  const filteredFriends = friends.filter(f => 
    f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocation('/dashboard')}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Друзья</h1>
              <p className="text-sm text-slate-500">Ваша социальная сеть здоровья</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск друзей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="friends">
              <Users className="w-4 h-4 mr-2" />
              Друзья ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              <UserPlus className="w-4 h-4 mr-2" />
              Запросы ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Heart className="w-4 h-4 mr-2" />
              Рекомендации
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : filteredFriends.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">У вас пока нет друзей</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab('suggestions')}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Найти друзей
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={friend.avatar_url} />
                            <AvatarFallback>{friend.name?.[0]}</AvatarFallback>
                          </Avatar>
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            friend.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 
                              className="font-semibold cursor-pointer hover:text-cyan-600"
                              onClick={() => setLocation(`/u/${friend.username}`)}
                            >
                              {friend.name}
                            </h3>
                            {friend.health_score && (
                              <Badge variant="secondary" className="text-xs">
                                <Activity className="w-3 h-3 mr-1" />
                                {friend.health_score}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">@{friend.username}</p>
                          {friend.activities && (
                            <div className="flex gap-1 mt-1">
                              {friend.activities.slice(0, 3).map((activity, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setLocation(`/social/messages?user=${friend.id}`)}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUnfollow(friend.id)}
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {requests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Нет новых запросов</p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar_url} />
                          <AvatarFallback>{request.name?.[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-slate-500">@{request.username}</p>
                          <p className="text-xs text-slate-400">
                            {new Date(request.request_date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Принять
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Пока нет рекомендаций</p>
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={suggestion.avatar_url} />
                          <AvatarFallback>{suggestion.name?.[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{suggestion.name}</h3>
                          <p className="text-sm text-slate-500">@{suggestion.username}</p>
                          {suggestion.health_score && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              <Activity className="w-3 h-3 mr-1" />
                              {suggestion.health_score} Health Score
                            </Badge>
                          )}
                        </div>

                        <Button 
                          size="sm"
                          onClick={() => handleFollow(suggestion.id)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Подписаться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Users, Share2 } from 'lucide-react';
import { isTelegramWebApp, initializeTelegramWebApp, authenticateWithTelegram, getTelegramUser, shareInviteLink } from '@/utils/telegram';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: number;
  name: string;
  email?: string;
  telegram_connected: boolean;
  telegram_username?: string;
}

interface Profile {
  date_of_birth?: string;
  height?: number;
  weight?: number;
  gender?: string;
}

export function TelegramAuth() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [friends, setFriends] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      // Wait for Telegram Web App to load
      let attempts = 0;
      const maxAttempts = 10;
      
      const waitForTelegram = () => {
        return new Promise<void>((resolve, reject) => {
          const checkTelegram = () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
              resolve();
            } else if (attempts < maxAttempts) {
              attempts++;
              setTimeout(checkTelegram, 100);
            } else {
              reject(new Error('Telegram Web App не загрузился'));
            }
          };
          checkTelegram();
        });
      };

      try {
        // Wait for Telegram Web App to be available
        await waitForTelegram();
        
        // Initialize Telegram Web App
        if (isTelegramWebApp()) {
          initializeTelegramWebApp();
        }

        // Check if we're in Telegram Web App
        if (!isTelegramWebApp()) {
          setLoading(false);
          setError('Это приложение работает только в Telegram');
          return;
        }

        // Wait a bit more for user data to be available
        let tgUser = getTelegramUser();
        if (!tgUser) {
          // Try a few more times with delays
          for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            tgUser = getTelegramUser();
            if (tgUser) break;
          }
        }

        if (!tgUser) {
          // Log debug info
          console.error('Telegram Web App debug:', {
            hasTelegram: !!window.Telegram,
            hasWebApp: !!window.Telegram?.WebApp,
            initDataUnsafe: window.Telegram?.WebApp?.initDataUnsafe,
            initData: window.Telegram?.WebApp?.initData,
          });
          setLoading(false);
          setError('Не удалось получить данные пользователя Telegram. Убедитесь, что вы открыли приложение через Telegram бота.');
          return;
        }

        // Authenticate with backend
        try {
          const authResult = await authenticateWithTelegram();
          
          if (authResult.success && authResult.user) {
            setUser(authResult.user);
            setAuthenticated(true);

            // Fetch user profile
            try {
              const profileResponse = await fetch(`/api/users/${authResult.user.id}/profile`);
              const profileData = await profileResponse.json();
              if (profileData.profile) {
                setProfile(profileData.profile);
              }
            } catch (err) {
              console.error('Error fetching profile:', err);
            }

            // TODO: Fetch friends list
            // For now, using mock data
            setFriends([]);
          } else {
            setError(authResult.error || 'Ошибка аутентификации');
          }
        } catch (err) {
          console.error('Auth error:', err);
          setError('Ошибка при подключении к серверу');
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.error('Init error:', err);
        setLoading(false);
        setError(err instanceof Error ? err.message : 'Ошибка инициализации');
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Подключение к Telegram...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="engraved-card max-w-md">
          <CardHeader>
            <CardTitle className="engraved-text">Ошибка</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!authenticated || !user) {
    return null;
  }

  const tgUser = getTelegramUser();
  const displayName = user.name || (tgUser ? `${tgUser.first_name}${tgUser.last_name ? ` ${tgUser.last_name}` : ''}` : 'Пользователь');
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 engraved-avatar">
              <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground engraved-text">{displayName}</h1>
              {user.telegram_username && (
                <p className="text-foreground/60">@{user.telegram_username}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Успешно авторизован через Telegram</span>
          </div>
        </motion.div>

        {/* Profile Info */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Профиль</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {profile.height && (
                    <div>
                      <p className="text-sm text-foreground/60">Рост</p>
                      <p className="text-lg font-semibold">{profile.height} см</p>
                    </div>
                  )}
                  {profile.weight && (
                    <div>
                      <p className="text-sm text-foreground/60">Вес</p>
                      <p className="text-lg font-semibold">{profile.weight} кг</p>
                    </div>
                  )}
                  {profile.date_of_birth && (
                    <div>
                      <p className="text-sm text-foreground/60">Дата рождения</p>
                      <p className="text-lg font-semibold">
                        {new Date(profile.date_of_birth).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  )}
                  {profile.gender && (
                    <div>
                      <p className="text-sm text-foreground/60">Пол</p>
                      <p className="text-lg font-semibold">
                        {profile.gender === 'male' ? 'Мужской' : profile.gender === 'female' ? 'Женский' : profile.gender}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Friends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="engraved-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="engraved-text flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Друзья
                  </CardTitle>
                  <CardDescription>{friends.length} друзей</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation('/social/friends')}
                  className="engraved-button-outline"
                >
                  Все друзья
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {friends.length === 0 ? (
                <p className="text-foreground/60 text-center py-4">
                  У вас пока нет друзей. Пригласите друзей, чтобы начать!
                </p>
              ) : (
                <div className="space-y-2">
                  {friends.slice(0, 5).map((friend) => (
                    <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{friend.name}</p>
                        {friend.telegram_username && (
                          <p className="text-sm text-foreground/60">@{friend.telegram_username}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Invite Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="engraved-card">
            <CardHeader>
              <CardTitle className="engraved-text flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Пригласить друзей
              </CardTitle>
              <CardDescription>
                Поделитесь ссылкой и получите бонусы за каждого приглашенного друга
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full engraved-button"
                onClick={() => shareInviteLink(user.id)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться ссылкой
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <Button
            variant="outline"
            className="engraved-button-outline"
            onClick={() => setLocation('/dashboard')}
          >
            Дашборд
          </Button>
          <Button
            variant="outline"
            className="engraved-button-outline"
            onClick={() => setLocation('/profile')}
          >
            Профиль
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

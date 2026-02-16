import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { 
  Wallet, Settings, Globe, User, Shield, Bell, CreditCard, 
  Building2, Store, Handshake, Edit, Save, Copy, CheckCircle2,
  TrendingUp, History, Gift, Send, QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface TokenTransaction {
  id: number;
  amount: number;
  source: string;
  description: string;
  transaction_type: 'credit' | 'debit';
  created_at: string;
}

export default function Account() {
  const [, setLocation] = useLocation();
  const { user, profile, refreshUser } = useUser();
  const [selectedTab, setSelectedTab] = useState('wallet');
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenHistory, setTokenHistory] = useState<TokenTransaction[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Public profile settings
  const [publicProfile, setPublicProfile] = useState({
    show_name: true,
    show_metrics: false,
    show_goals: false,
    show_achievements: true,
    allow_messages: true,
    public_url: '',
  });

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    notifications_enabled: true,
    email_notifications: false,
    telegram_notifications: true,
    language: 'ru',
    timezone: 'Europe/Moscow',
  });

  // Business/Partner settings
  const [businessType, setBusinessType] = useState<'none' | 'specialist' | 'shop' | 'center' | 'partner'>('none');
  const [businessSettings, setBusinessSettings] = useState({
    name: '',
    description: '',
    category: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    website: '',
    verified: false,
  });

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Load tokens
        const tokensResponse = await fetch(`/api/users/${user.id}/account?action=tokens`);
        if (tokensResponse.ok) {
          const tokensData = await tokensResponse.json();
          setTokenBalance(tokensData.balance || 0);
          setTokenHistory(tokensData.history || []);
        }

        // Generate public URL
        const publicUrl = `${window.location.origin}/public/${user.id}`;
        setPublicProfile(prev => ({ ...prev, public_url: publicUrl }));

        setLoading(false);
      } catch (error) {
        console.error('Error loading account data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleSavePublicProfile = async () => {
    // TODO: Save to API when endpoint is ready
    toast.success('Настройки публичного профиля сохранены');
    setIsEditing(false);
  };

  const handleSaveAccountSettings = async () => {
    // TODO: Save to API when endpoint is ready
    toast.success('Настройки аккаунта сохранены');
  };

  const handleSaveBusinessSettings = async () => {
    if (!businessSettings.name) {
      toast.error('Укажите название');
      return;
    }
    // TODO: Save to API when endpoint is ready
    toast.success('Настройки бизнеса сохранены');
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicProfile.public_url);
    toast.success('Ссылка скопирована');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="engraved-card max-w-md">
          <CardHeader>
            <CardTitle>Ошибка</CardTitle>
            <CardDescription>Пользователь не найден</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Аккаунт</h1>
              <p className="text-foreground/60">
                Управление профилем, настройками и токенами
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setLocation('/profile')}
              className="engraved-button-outline"
            >
              Профиль здоровья
            </Button>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wallet">
              <Wallet className="w-4 h-4 mr-2" />
              Кошелек
            </TabsTrigger>
            <TabsTrigger value="public">
              <Globe className="w-4 h-4 mr-2" />
              Публичная страница
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="business">
              <Building2 className="w-4 h-4 mr-2" />
              Бизнес
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            {/* Balance Card */}
            <Card className="engraved-card bg-gradient-to-br from-primary/10 to-background">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-primary" />
                  Баланс токенов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-bold text-primary mb-2">{tokenBalance.toFixed(2)}</p>
                    <p className="text-foreground/60">EthosLife Tokens (ETL)</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="engraved-button-outline">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR код
                    </Button>
                    <Button variant="outline" size="sm" className="engraved-button-outline">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="engraved-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Заработать</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    Выполняйте задания и получайте токены
                  </p>
                  <Button className="w-full engraved-button" size="sm">
                    Задания
                  </Button>
                </CardContent>
              </Card>

              <Card className="engraved-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Потратить</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    Используйте токены для покупок
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full engraved-button-outline" 
                    size="sm"
                    onClick={() => setLocation('/shop')}
                  >
                    Магазин
                  </Button>
                </CardContent>
              </Card>

              <Card className="engraved-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <History className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">История</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    Все транзакции токенов
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full engraved-button-outline" 
                    size="sm"
                    onClick={() => {
                      const historyElement = document.getElementById('token-history');
                      historyElement?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Показать
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card id="token-history" className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">История транзакций</CardTitle>
              </CardHeader>
              <CardContent>
                {tokenHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-foreground/60">Нет транзакций</p>
                    <p className="text-sm text-foreground/40 mt-2">
                      Транзакции появятся здесь после использования токенов
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tokenHistory.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                      >
                        <div className="flex items-center gap-3">
                          {tx.transaction_type === 'credit' ? (
                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                              <Send className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{tx.description || tx.source}</p>
                            <p className="text-sm text-foreground/60">
                              {new Date(tx.created_at).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${tx.transaction_type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                            {tx.transaction_type === 'credit' ? '+' : '-'}{tx.amount.toFixed(2)} ETL
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Public Profile Tab */}
          <TabsContent value="public" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="engraved-text">Публичная страница</CardTitle>
                    <CardDescription>
                      Настройте, какая информация будет видна другим пользователям
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="engraved-button-outline"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Сохранить
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Public URL */}
                <div>
                  <Label>Публичная ссылка</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={publicProfile.public_url}
                      readOnly
                      className="engraved-input"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyPublicUrl}
                      className="engraved-button-outline"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(publicProfile.public_url, '_blank')}
                      className="engraved-button-outline"
                    >
                      Открыть
                    </Button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Показывать имя</Label>
                      <p className="text-sm text-foreground/60">
                        Ваше имя будет видно на публичной странице
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile.show_name}
                      onCheckedChange={(checked) =>
                        setPublicProfile(prev => ({ ...prev, show_name: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Показывать метрики</Label>
                      <p className="text-sm text-foreground/60">
                        Показывать данные о здоровье (анонимно)
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile.show_metrics}
                      onCheckedChange={(checked) =>
                        setPublicProfile(prev => ({ ...prev, show_metrics: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Показывать цели</Label>
                      <p className="text-sm text-foreground/60">
                        Отображать ваши цели и прогресс
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile.show_goals}
                      onCheckedChange={(checked) =>
                        setPublicProfile(prev => ({ ...prev, show_goals: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Показывать достижения</Label>
                      <p className="text-sm text-foreground/60">
                        Отображать ваши достижения и награды
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile.show_achievements}
                      onCheckedChange={(checked) =>
                        setPublicProfile(prev => ({ ...prev, show_achievements: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Разрешить сообщения</Label>
                      <p className="text-sm text-foreground/60">
                        Другие пользователи смогут отправлять вам сообщения
                      </p>
                    </div>
                    <Switch
                      checked={publicProfile.allow_messages}
                      onCheckedChange={(checked) =>
                        setPublicProfile(prev => ({ ...prev, allow_messages: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button
                    className="w-full engraved-button"
                    onClick={handleSavePublicProfile}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить настройки
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Личные настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Язык</Label>
                    <Select
                      value={accountSettings.language}
                      onValueChange={(value) =>
                        setAccountSettings(prev => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger className="engraved-input mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Часовой пояс</Label>
                    <Select
                      value={accountSettings.timezone}
                      onValueChange={(value) =>
                        setAccountSettings(prev => ({ ...prev, timezone: value }))
                      }
                    >
                      <SelectTrigger className="engraved-input mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                        <SelectItem value="Europe/Kiev">Киев (UTC+2)</SelectItem>
                        <SelectItem value="Europe/Minsk">Минск (UTC+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Уведомления
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Уведомления включены</Label>
                        <p className="text-sm text-foreground/60">
                          Общие настройки уведомлений
                        </p>
                      </div>
                      <Switch
                        checked={accountSettings.notifications_enabled}
                        onCheckedChange={(checked) =>
                          setAccountSettings(prev => ({ ...prev, notifications_enabled: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email уведомления</Label>
                        <p className="text-sm text-foreground/60">
                          Получать уведомления на email
                        </p>
                      </div>
                      <Switch
                        checked={accountSettings.email_notifications}
                        onCheckedChange={(checked) =>
                          setAccountSettings(prev => ({ ...prev, email_notifications: checked }))
                        }
                        disabled={!accountSettings.notifications_enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Telegram уведомления</Label>
                        <p className="text-sm text-foreground/60">
                          Получать уведомления в Telegram
                        </p>
                      </div>
                      <Switch
                        checked={accountSettings.telegram_notifications}
                        onCheckedChange={(checked) =>
                          setAccountSettings(prev => ({ ...prev, telegram_notifications: checked }))
                        }
                        disabled={!accountSettings.notifications_enabled}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full engraved-button"
                  onClick={handleSaveAccountSettings}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Бизнес-аккаунт
                </CardTitle>
                <CardDescription>
                  Настройки для специалистов, магазинов, центров и партнеров
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Тип бизнеса</Label>
                  <Select
                    value={businessType}
                    onValueChange={(value: any) => setBusinessType(value)}
                  >
                    <SelectTrigger className="engraved-input mt-2">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Не выбран</SelectItem>
                      <SelectItem value="specialist">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Специалист (врач, тренер, консультант)
                        </div>
                      </SelectItem>
                      <SelectItem value="shop">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          Магазин
                        </div>
                      </SelectItem>
                      <SelectItem value="center">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Центр здоровья / Клиника
                        </div>
                      </SelectItem>
                      <SelectItem value="partner">
                        <div className="flex items-center gap-2">
                          <Handshake className="w-4 h-4" />
                          Партнер
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {businessType !== 'none' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label>Название *</Label>
                      <Input
                        value={businessSettings.name}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Название вашего бизнеса"
                        className="engraved-input mt-2"
                      />
                    </div>

                    <div>
                      <Label>Описание</Label>
                      <textarea
                        value={businessSettings.description}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Краткое описание вашего бизнеса"
                        className="engraved-input mt-2 min-h-24 w-full"
                      />
                    </div>

                    {businessType === 'specialist' && (
                      <div>
                        <Label>Специализация</Label>
                        <Select
                          value={businessSettings.category}
                          onValueChange={(value) =>
                            setBusinessSettings(prev => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="engraved-input mt-2">
                            <SelectValue placeholder="Выберите специализацию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Врач</SelectItem>
                            <SelectItem value="trainer">Тренер</SelectItem>
                            <SelectItem value="nutritionist">Нутрициолог</SelectItem>
                            <SelectItem value="psychologist">Психолог</SelectItem>
                            <SelectItem value="coach">Коуч</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {businessType === 'shop' && (
                      <div>
                        <Label>Категория магазина</Label>
                        <Select
                          value={businessSettings.category}
                          onValueChange={(value) =>
                            setBusinessSettings(prev => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="engraved-input mt-2">
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nutrition">Питание</SelectItem>
                            <SelectItem value="supplements">БАДы</SelectItem>
                            <SelectItem value="equipment">Оборудование</SelectItem>
                            <SelectItem value="clothing">Одежда</SelectItem>
                            <SelectItem value="other">Другое</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Email для связи</Label>
                        <Input
                          type="email"
                          value={businessSettings.contact_email}
                          onChange={(e) =>
                            setBusinessSettings(prev => ({ ...prev, contact_email: e.target.value }))
                          }
                          placeholder="contact@example.com"
                          className="engraved-input mt-2"
                        />
                      </div>

                      <div>
                        <Label>Телефон</Label>
                        <Input
                          type="tel"
                          value={businessSettings.contact_phone}
                          onChange={(e) =>
                            setBusinessSettings(prev => ({ ...prev, contact_phone: e.target.value }))
                          }
                          placeholder="+7 (999) 123-45-67"
                          className="engraved-input mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Адрес</Label>
                      <Input
                        value={businessSettings.address}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, address: e.target.value }))
                        }
                        placeholder="Город, улица, дом"
                        className="engraved-input mt-2"
                      />
                    </div>

                    <div>
                      <Label>Веб-сайт</Label>
                      <Input
                        type="url"
                        value={businessSettings.website}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, website: e.target.value }))
                        }
                        placeholder="https://example.com"
                        className="engraved-input mt-2"
                      />
                    </div>

                    {businessSettings.verified && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Аккаунт верифицирован</span>
                      </div>
                    )}

                    <Button
                      className="w-full engraved-button"
                      onClick={handleSaveBusinessSettings}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить настройки бизнеса
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

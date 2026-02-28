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
    language: 'en',
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
    toast.success('Public profile settings saved');
    setIsEditing(false);
  };

  const handleSaveAccountSettings = async () => {
    // TODO: Save to API when endpoint is ready
    toast.success('Account settings saved');
  };

  const handleSaveBusinessSettings = async () => {
    if (!businessSettings.name) {
      toast.error('Please specify a name');
      return;
    }
    // TODO: Save to API when endpoint is ready
    toast.success('Business settings saved');
  };

  const copyPublicUrl = () => {
    navigator.clipboard.writeText(publicProfile.public_url);
    toast.success('Link copied');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="engraved-card max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>User not found</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container max-w-full px-4 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Account</h1>
              <p className="text-foreground/60">
                Manage profile, settings, and tokens
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setLocation('/profile')}
              className="engraved-button-outline"
            >
              Health Profile
            </Button>
          </div>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wallet">
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="public">
              <Globe className="w-4 h-4 mr-2" />
              Public Page
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="business">
              <Building2 className="w-4 h-4 mr-2" />
              Business
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            {/* Balance Card */}
            <Card className="engraved-card bg-gradient-to-br from-primary/10 to-background">
              <CardHeader>
                <CardTitle className="engraved-text flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-primary" />
                  Token Balance
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
                      QR Code
                    </Button>
                    <Button variant="outline" size="sm" className="engraved-button-outline">
                      <Send className="w-4 h-4 mr-2" />
                      Send
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
                    <h3 className="font-semibold">Earn</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    Complete tasks and earn tokens
                  </p>
                  <Button className="w-full engraved-button" size="sm">
                    Tasks
                  </Button>
                </CardContent>
              </Card>

              <Card className="engraved-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Spend</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    Use tokens for purchases
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full engraved-button-outline" 
                    size="sm"
                    onClick={() => setLocation('/shop')}
                  >
                    Shop
                  </Button>
                </CardContent>
              </Card>

              <Card className="engraved-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <History className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">History</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mb-4">
                    All token transactions
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
                    Show
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Transaction History */}
            <Card id="token-history" className="engraved-card">
              <CardHeader>
                <CardTitle className="engraved-text">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {tokenHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-foreground/60">No transactions</p>
                    <p className="text-sm text-foreground/40 mt-2">
                      Transactions will appear here after using tokens
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
                              {new Date(tx.created_at).toLocaleDateString('en-US')}
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
                    <CardTitle className="engraved-text">Public Page</CardTitle>
                    <CardDescription>
                      Configure what information is visible to other users
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
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Public URL */}
                <div>
                  <Label>Public Link</Label>
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
                      Open
                    </Button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Name</Label>
                      <p className="text-sm text-foreground/60">
                        Your name will be visible on the public page
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
                      <Label>Show Metrics</Label>
                      <p className="text-sm text-foreground/60">
                        Display health data (anonymously)
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
                      <Label>Show Goals</Label>
                      <p className="text-sm text-foreground/60">
                        Display your goals and progress
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
                      <Label>Show Achievements</Label>
                      <p className="text-sm text-foreground/60">
                        Display your achievements and rewards
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
                      <Label>Allow Messages</Label>
                      <p className="text-sm text-foreground/60">
                        Other users will be able to send you messages
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
                    Save Settings
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
                  Personal Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Language</Label>
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
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ru">Russian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Time Zone</Label>
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
                        <SelectItem value="Europe/Moscow">Moscow (UTC+3)</SelectItem>
                        <SelectItem value="Europe/Kiev">Kyiv (UTC+2)</SelectItem>
                        <SelectItem value="Europe/Minsk">Minsk (UTC+3)</SelectItem>
                        <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notifications Enabled</Label>
                        <p className="text-sm text-foreground/60">
                          General notification settings
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
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-foreground/60">
                          Receive notifications via email
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
                        <Label>Telegram Notifications</Label>
                        <p className="text-sm text-foreground/60">
                          Receive notifications in Telegram
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
                  Save Settings
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
                  Business Account
                </CardTitle>
                <CardDescription>
                  Settings for specialists, shops, centers, and partners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Business Type</Label>
                  <Select
                    value={businessType}
                    onValueChange={(value: any) => setBusinessType(value)}
                  >
                    <SelectTrigger className="engraved-input mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Selected</SelectItem>
                      <SelectItem value="specialist">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Specialist (Doctor, Trainer, Consultant)
                        </div>
                      </SelectItem>
                      <SelectItem value="shop">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          Shop
                        </div>
                      </SelectItem>
                      <SelectItem value="center">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Health Center / Clinic
                        </div>
                      </SelectItem>
                      <SelectItem value="partner">
                        <div className="flex items-center gap-2">
                          <Handshake className="w-4 h-4" />
                          Partner
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {businessType !== 'none' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={businessSettings.name}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Your business name"
                        className="engraved-input mt-2"
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <textarea
                        value={businessSettings.description}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Brief description of your business"
                        className="engraved-input mt-2 min-h-24 w-full"
                      />
                    </div>

                    {businessType === 'specialist' && (
                      <div>
                        <Label>Specialization</Label>
                        <Select
                          value={businessSettings.category}
                          onValueChange={(value) =>
                            setBusinessSettings(prev => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="engraved-input mt-2">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="trainer">Trainer</SelectItem>
                            <SelectItem value="nutritionist">Nutritionist</SelectItem>
                            <SelectItem value="psychologist">Psychologist</SelectItem>
                            <SelectItem value="coach">Coach</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {businessType === 'shop' && (
                      <div>
                        <Label>Shop Category</Label>
                        <Select
                          value={businessSettings.category}
                          onValueChange={(value) =>
                            setBusinessSettings(prev => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="engraved-input mt-2">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                            <SelectItem value="supplements">Supplements</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Contact Email</Label>
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
                        <Label>Phone</Label>
                        <Input
                          type="tel"
                          value={businessSettings.contact_phone}
                          onChange={(e) =>
                            setBusinessSettings(prev => ({ ...prev, contact_phone: e.target.value }))
                          }
                          placeholder="+1 (999) 123-4567"
                          className="engraved-input mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Address</Label>
                      <Input
                        value={businessSettings.address}
                        onChange={(e) =>
                          setBusinessSettings(prev => ({ ...prev, address: e.target.value }))
                        }
                        placeholder="City, Street, Building"
                        className="engraved-input mt-2"
                      />
                    </div>

                    <div>
                      <Label>Website</Label>
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
                        <span className="font-semibold">Account Verified</span>
                      </div>
                    )}

                    <Button
                      className="w-full engraved-button"
                      onClick={handleSaveBusinessSettings}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Business Settings
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

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, Sparkles, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIChat as AIChatComponent } from '@/components/AIChat';
import { AIMessage, AISettings, ChatHistory } from '@/types/ai-chat';
import SketchIcon from '@/components/SketchIcon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function AIChatPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [settings, setSettings] = useState<AISettings>({
    detailLevel: 'normal',
    communicationStyle: 'friendly',
    focusModules: [],
    recommendationFrequency: 'medium',
    privacyLevel: 'full',
  });

  // Load chat history
  useEffect(() => {
    if (user?.token) {
      loadChatHistory();
    }
  }, [user?.token]);

  const loadChatHistory = async () => {
    try {
      const res = await fetch('/api/ai/chat/history', {
        headers: { 'Authorization': `Bearer ${user?.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setChatHistory(data.conversations || []);
      }
    } catch (error) {
      console.error('Load history error:', error);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/ai/chat/history/${id}`, {
        headers: { 'Authorization': `Bearer ${user?.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setConversationId(id);
      }
    } catch (error) {
      console.error('Load conversation error:', error);
    }
  };

  const handleSendMessage = useCallback(async (userMessage: string) => {
    // Add user message
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user?.token ? `Bearer ${user.token}` : '',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          toast({
            title: 'Лимит сообщений',
            description: 'Вы достигли дневного лимита сообщений. Обновите тариф для большего количества.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        throw new Error('Failed to get AI response');
      }

      const data = await res.json();

      const aiResponse: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        metadata: {
          recommendations: data.recommendations,
          links: data.links,
        },
      };

      setMessages((prev) => [...prev, aiResponse]);
      
      // Refresh history
      loadChatHistory();
    } catch (error) {
      console.error('AI chat error:', error);
      
      // Fallback response
      const fallbackResponse: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже или задайте другой вопрос.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
      
      toast({
        title: 'Ошибка',
        description: 'Не удалось получить ответ от ИИ',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.token, conversationId, toast]);

  const startNewChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-12 h-[calc(100vh-5rem)] md:h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
                <SketchIcon icon="ai" size={32} className="text-primary" />
                ИИ+ Чат
              </h1>
              <p className="text-foreground/60 text-lg">
                Персональный помощник для анализа здоровья и рекомендаций
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={startNewChat}>
                Новый чат
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <History className="h-4 w-4" />
                    История
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>История чатов</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {chatHistory.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        История чатов пуста
                      </p>
                    ) : (
                      chatHistory.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => loadConversation(chat.id)}
                          className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <p className="font-medium truncate">{chat.title || 'Новый чат'}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(chat.updated_at).toLocaleDateString('ru-RU')}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Настройки
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Настройки ИИ</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div>
                      <Label>Уровень детализации</Label>
                      <Select
                        value={settings.detailLevel}
                        onValueChange={(value: any) =>
                          setSettings({ ...settings, detailLevel: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brief">Краткий</SelectItem>
                          <SelectItem value="normal">Обычный</SelectItem>
                          <SelectItem value="detailed">Подробный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Стиль общения</Label>
                      <Select
                        value={settings.communicationStyle}
                        onValueChange={(value: any) =>
                          setSettings({ ...settings, communicationStyle: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Формальный</SelectItem>
                          <SelectItem value="friendly">Дружелюбный</SelectItem>
                          <SelectItem value="casual">Неформальный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 premium-card overflow-hidden flex flex-col"
        >
          <AIChatComponent
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            showQuickQuestions={messages.length === 0}
          />
        </motion.div>
      </main>
    </div>
  );
}

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
            title: 'Message Limit',
            description: 'You have reached your daily message limit. Upgrade your plan for more.',
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
      loadChatHistory();
    } catch (error) {
      console.error('AI chat error:', error);
      
      const fallbackResponse: AIMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: 'Sorry, an error occurred while processing your request. Please try again later or ask a different question.',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
      
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
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
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-14">
      <main className="container py-4 h-[calc(100vh-3.5rem)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <SketchIcon icon="ai" size={24} className="text-primary" />
                AI Chat
              </h1>
              <p className="text-foreground/60 text-sm">
                Personal assistant for health analysis and recommendations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={startNewChat}>
                New Chat
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <History className="h-4 w-4" />
                    History
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Chat History</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {chatHistory.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No chat history
                      </p>
                    ) : (
                      chatHistory.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => loadConversation(chat.id)}
                          className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <p className="font-medium truncate">{chat.title || 'New Chat'}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(chat.updated_at).toLocaleDateString()}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>AI Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Detail Level</Label>
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
                          <SelectItem value="brief">Brief</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Communication Style</Label>
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
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        <AIChatComponent
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

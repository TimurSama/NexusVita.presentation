import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, Paperclip, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Анна Петрова',
      avatar: '',
      lastMessage: 'Отлично! Встретимся завтра?',
      time: '10:30',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Михаил Соколов',
      avatar: '',
      lastMessage: 'Спасибо за рекомендацию!',
      time: 'Вчера',
      unread: 0,
      online: false,
    },
    {
      id: '3',
      name: 'Группа "Бегуны"',
      avatar: '',
      lastMessage: 'Елена: Кто на пробежку?',
      time: '2 часа назад',
      unread: 5,
      online: false,
    },
  ];

  const messages = selectedChat ? [
    { id: '1', sender: 'other', text: 'Привет! Как дела с тренировками?', time: '10:15' },
    { id: '2', sender: 'me', text: 'Отлично! Вчера пробежал 5км', time: '10:16' },
    { id: '3', sender: 'other', text: 'Супер! Можешь поделиться программой?', time: '10:20' },
    { id: '4', sender: 'me', text: 'Конечно, отправлю сейчас', time: '10:22' },
    { id: '5', sender: 'other', text: 'Отлично! Встретимся завтра?', time: '10:30' },
  ] : [];

  const handleSend = () => {
    if (message.trim()) {
      // Send message logic
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Сообщения</h1>
          <p className="text-foreground/60">
            Общайтесь с друзьями и специалистами
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chats List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="engraved-card h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <Input
                      placeholder="Поиск..."
                      className="pl-9 engraved-input"
                    />
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="space-y-1 p-2">
                    {chats.map((chat) => (
                      <motion.div
                        key={chat.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === chat.id
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={chat.avatar} />
                              <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                              <span className="text-xs text-foreground/60">{chat.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-foreground/60 truncate">{chat.lastMessage}</p>
                              {chat.unread > 0 && (
                                <Badge className="engraved-badge bg-primary text-primary-foreground">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="engraved-card h-full flex flex-col">
              {selectedChat ? (
                <>
                  <CardContent className="p-4 border-b border-border flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={chats.find(c => c.id === selectedChat)?.avatar} />
                      <AvatarFallback>
                        {chats.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{chats.find(c => c.id === selectedChat)?.name}</h3>
                      <p className="text-xs text-foreground/60">В сети</p>
                    </div>
                  </CardContent>
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.sender === 'me'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                  <CardContent className="p-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="engraved-button-outline">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Написать сообщение..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 engraved-input"
                      />
                      <Button variant="ghost" size="icon" className="engraved-button-outline">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button onClick={handleSend} className="engraved-button">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-foreground/60">Выберите чат для начала общения</p>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

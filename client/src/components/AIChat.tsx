import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AIMessage as AIMessageType } from '@/types/ai-chat';
import { AIMessage } from './AIMessage';
import { AIChatInput } from './AIChatInput';
import { AIQuickQuestions } from './AIQuickQuestions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

interface AIChatProps {
  messages: AIMessageType[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  showQuickQuestions?: boolean;
}

export function AIChat({ messages, onSendMessage, isLoading = false, showQuickQuestions = true }: AIChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showQuickQuestionsState, setShowQuickQuestionsState] = useState(showQuickQuestions && messages.length === 0);

  useEffect(() => {
    // Auto-scroll to bottom when new message arrives
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setShowQuickQuestionsState(false);
    onSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden" ref={scrollRef}>
        <ScrollArea className="h-full p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 && showQuickQuestionsState && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Добро пожаловать в ИИ+ Чат
                </h3>
                <p className="text-foreground/60">
                  Задайте вопрос о вашем здоровье, получите персональные рекомендации и анализ данных
                </p>
              </div>
              <AIQuickQuestions 
                questions={[
                  'Как мое общее состояние здоровья?',
                  'Какие рекомендации по питанию?',
                  'Как улучшить качество сна?',
                  'Какие тренировки мне подходят?',
                  'Оцените риски для здоровья',
                  'Создайте план на неделю',
                ]} 
                onSelect={handleQuickQuestion} 
              />
            </motion.div>
          )}

          {messages.map((message) => (
            <AIMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-foreground/60"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>ИИ анализирует ваш вопрос...</span>
            </motion.div>
          )}
        </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <AIChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
}

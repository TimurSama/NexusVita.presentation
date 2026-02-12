import { motion } from 'framer-motion';
import { User, Bot, Copy, Check } from 'lucide-react';
import { AIMessage as AIMessageType } from '@/types/ai-chat';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SketchIcon from './SketchIcon';
import { Link } from 'wouter';

interface AIMessageProps {
  message: AIMessageType;
}

export function AIMessage({ message }: AIMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 ${isUser ? 'order-2' : ''}`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/20 text-secondary'
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5" />
          ) : (
            <SketchIcon icon="ai" size={20} />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div
          className={`premium-card p-4 max-w-[85%] md:max-w-[70%] ${
            isUser
              ? 'bg-primary/10 border-primary/20'
              : 'bg-card border-border'
          }`}
        >
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Metadata - Recommendations, Links */}
          {message.metadata && (
            <div className="mt-4 space-y-3">
              {message.metadata.recommendations && message.metadata.recommendations.length > 0 && (
                <div className="border-t border-border pt-3">
                  <div className="text-sm font-semibold text-foreground mb-2">Рекомендации:</div>
                  <ul className="space-y-1">
                    {message.metadata.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-foreground/70 flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {message.metadata.links && message.metadata.links.length > 0 && (
                <div className="border-t border-border pt-3">
                  <div className="text-sm font-semibold text-foreground mb-2">Связанные разделы:</div>
                  <div className="flex flex-wrap gap-2">
                    {message.metadata.links.map((link, idx) => (
                      <Link key={idx} href={link.path}>
                        <Button variant="outline" size="sm" className="text-xs">
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center gap-2 text-xs text-foreground/50 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span>{formatTime(message.timestamp)}</span>
          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

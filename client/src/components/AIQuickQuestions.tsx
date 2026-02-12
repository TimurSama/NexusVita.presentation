import { motion } from 'framer-motion';
import { AIQuickQuestion } from '@/types/ai-chat';
import { Button } from '@/components/ui/button';
import SketchIcon from './SketchIcon';

interface AIQuickQuestionsProps {
  questions: AIQuickQuestion[];
  onSelect: (question: string) => void;
}

const defaultQuestions: AIQuickQuestion[] = [
  {
    id: '1',
    question: 'Как мое здоровье сегодня?',
    icon: 'heart',
    category: 'health',
  },
  {
    id: '2',
    question: 'Что улучшить в питании?',
    icon: 'nutrition',
    category: 'nutrition',
  },
  {
    id: '3',
    question: 'Рекомендации по тренировкам',
    icon: 'movement',
    category: 'fitness',
  },
  {
    id: '4',
    question: 'Анализ моего сна',
    icon: 'sleep',
    category: 'sleep',
  },
  {
    id: '5',
    question: 'Какие риски для здоровья?',
    icon: 'chart',
    category: 'analysis',
  },
  {
    id: '6',
    question: 'План на неделю',
    icon: 'trending',
    category: 'planning',
  },
];

export function AIQuickQuestions({ questions = defaultQuestions, onSelect }: AIQuickQuestionsProps) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-foreground/60 mb-2">Быстрые вопросы:</div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, index) => (
          <motion.button
            key={q.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(q.question)}
            className="premium-card p-3 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              {q.icon && (
                <SketchIcon icon={q.icon as any} size={16} className="text-primary group-hover:scale-110 transition-transform" />
              )}
              <span className="text-sm text-foreground">{q.question}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

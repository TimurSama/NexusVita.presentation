// Типы для системы опросников

export type QuestionType = 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'date' | 'rating' | 'scale';

export interface QuestionOption {
  label: string;
  value: string | number;
  description?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | null;
  };
  conditional?: {
    dependsOn: string;
    showWhen: (value: any) => boolean;
  };
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  category: string;
  questions: Question[];
  submitButtonText?: string;
  onComplete?: (answers: Record<string, any>) => void;
}

export interface QuestionnaireAnswer {
  questionId: string;
  value: any;
  timestamp: Date;
}

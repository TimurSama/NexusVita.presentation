// Типы для ИИ+ чата

export type AIMessageRole = 'user' | 'assistant' | 'system';

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: Date;
  metadata?: {
    analysis?: any;
    recommendations?: string[];
    charts?: any[];
    links?: { label: string; path: string }[];
  };
}

export interface AIQuickQuestion {
  id: string;
  question: string;
  icon?: string;
  category?: string;
}

export interface AISettings {
  detailLevel: 'brief' | 'normal' | 'detailed';
  communicationStyle: 'formal' | 'friendly' | 'casual';
  focusModules: string[];
  recommendationFrequency: 'low' | 'medium' | 'high';
  privacyLevel: 'full' | 'anonymized' | 'minimal';
}

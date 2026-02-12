// Типы для ежедневника

export type JournalEntryType = 'day' | 'health' | 'reflection' | 'goal' | 'gratitude';

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface JournalEntry {
  id: string;
  type: JournalEntryType;
  title: string;
  content: string;
  date: Date;
  mood?: MoodLevel;
  tags: string[];
  category?: string;
  attachments?: string[]; // URLs to files
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalFilters {
  search: string;
  type?: JournalEntryType;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  mood?: MoodLevel;
  category?: string;
}

export interface JournalStats {
  totalEntries: number;
  entriesThisMonth: number;
  averageMood: number;
  mostUsedTags: { tag: string; count: number }[];
  entriesByType: { type: JournalEntryType; count: number }[];
  moodTrend: { date: string; mood: number }[];
}

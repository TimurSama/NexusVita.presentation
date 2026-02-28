import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JournalEditor } from '@/components/JournalEditor';
import { JournalList } from '@/components/JournalList';
import { JournalFiltersComponent } from '@/components/JournalFilters';
import { JournalStatsComponent } from '@/components/JournalStats';
import { JournalEntry, JournalFilters, JournalStats } from '@/types/journal';
import SketchIcon from '@/components/SketchIcon';
import { exportToCSV, exportToPDF, exportStatsToText } from '@/utils/export';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Mock data - will be replaced with real data from API
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    type: 'day',
    title: 'Great Day',
    content: 'Today was very productive. Managed to complete an important project and spent time with family.',
    date: new Date(),
    mood: 9,
    tags: ['work', 'family', 'productivity'],
    category: 'Work',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    type: 'health',
    title: 'Workout',
    content: 'Ran 5 km, feeling great. Heart rate normal, recovery good.',
    date: new Date(Date.now() - 86400000),
    mood: 8,
    tags: ['sports', 'running', 'health'],
    category: 'Sports',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    type: 'reflection',
    title: 'Thoughts on the Future',
    content: 'Thinking about how important it is to set goals and move towards them gradually. Every day is a step forward.',
    date: new Date(Date.now() - 172800000),
    mood: 7,
    tags: ['reflections', 'goals'],
    category: 'Personal',
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [filters, setFilters] = useState<JournalFilters>({ search: '' });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  // Calculate stats
  const stats: JournalStats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const entriesThisMonth = entries.filter(
      (e) => new Date(e.date) >= startOfMonth
    ).length;

    const moods = entries.filter((e) => e.mood).map((e) => e.mood!);
    const averageMood = moods.length > 0
      ? moods.reduce((sum, m) => sum + m, 0) / moods.length
      : 0;

    // Count tags
    const tagCounts: Record<string, number> = {};
    entries.forEach((entry) => {
      entry.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const mostUsedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Count by type
    const entriesByType = entries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<JournalEntry['type'], number>);

    // Mood trend (last 7 days)
    const moodTrend = entries
      .filter((e) => e.mood && new Date(e.date) >= new Date(Date.now() - 7 * 86400000))
      .map((e) => ({
        date: new Date(e.date).toISOString().split('T')[0],
        mood: e.mood!,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalEntries: entries.length,
      entriesThisMonth,
      averageMood,
      mostUsedTags,
      entriesByType: Object.entries(entriesByType).map(([type, count]) => ({
        type: type as JournalEntry['type'],
        count,
      })),
      moodTrend,
    };
  }, [entries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !entry.title.toLowerCase().includes(searchLower) &&
          !entry.content.toLowerCase().includes(searchLower) &&
          !entry.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // Type filter
      if (filters.type && entry.type !== filters.type) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && new Date(entry.date) < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && new Date(entry.date) > filters.dateTo) {
        return false;
      }

      // Mood filter
      if (filters.mood && (!entry.mood || entry.mood < filters.mood)) {
        return false;
      }

      // Category filter
      if (filters.category && entry.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [entries, filters]);

  const handleNewEntry = () => {
    setEditingEntry(null);
    setIsEditorOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setIsEditorOpen(true);
  };

  const handleSaveEntry = (entry: JournalEntry) => {
    if (editingEntry) {
      // Update existing
      setEntries(entries.map((e) => (e.id === entry.id ? entry : e)));
    } else {
      // Add new
      setEntries([entry, ...entries]);
    }
    setIsEditorOpen(false);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <main className="container py-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
                <SketchIcon icon="chart" size={32} className="text-primary" />
                Journal
              </h1>
              <p className="text-foreground/60 text-lg">
                Record your thoughts, events and achievements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      const filename = `journal-export-${new Date().toISOString().split('T')[0]}.csv`;
                      exportToCSV(filteredEntries, filename);
                    }}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      exportToPDF(filteredEntries);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export to PDF
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      const filename = `journal-stats-${new Date().toISOString().split('T')[0]}.txt`;
                      exportStatsToText(stats, filename);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export Statistics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleNewEntry} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                New Entry
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <JournalStatsComponent stats={stats} />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <JournalFiltersComponent filters={filters} onFiltersChange={setFilters} />
        </motion.div>

        {/* Entries List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <JournalList
            entries={filteredEntries}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </motion.div>

        {/* Editor Modal */}
        <JournalEditor
          entry={editingEntry}
          onSave={handleSaveEntry}
          onCancel={() => {
            setIsEditorOpen(false);
            setEditingEntry(null);
          }}
          isOpen={isEditorOpen}
        />
      </main>
    </div>
  );
}

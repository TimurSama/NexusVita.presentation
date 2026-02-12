import { JournalEntry } from '@/types/journal';
import { JournalEntryCard } from './JournalEntry';
import { Empty } from '@/components/ui/empty';

interface JournalListProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

export function JournalList({ entries, onEdit, onDelete }: JournalListProps) {
  if (entries.length === 0) {
    return (
      <Empty
        title="Нет записей"
        description="Создайте первую запись в ежедневнике, чтобы начать отслеживать свои мысли и события."
      />
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <JournalEntryCard
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

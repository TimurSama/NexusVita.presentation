import { JournalEntry } from '@/types/journal';

/**
 * Экспорт записей в CSV формат
 */
export function exportToCSV(entries: JournalEntry[], filename: string = 'journal-export.csv') {
  // Заголовки CSV
  const headers = ['Дата', 'Тип', 'Заголовок', 'Содержание', 'Настроение', 'Теги', 'Категория'];
  
  // Конвертация записей в строки CSV
  const rows = entries.map(entry => {
    const date = new Date(entry.date).toLocaleDateString('ru-RU');
    const type = entry.type === 'day' ? 'День' : entry.type === 'health' ? 'Здоровье' : 'Размышления';
    const title = entry.title.replace(/"/g, '""'); // Экранирование кавычек
    const content = entry.content.replace(/"/g, '""').replace(/\n/g, ' '); // Удаление переносов строк
    const mood = entry.mood?.toString() || '';
    const tags = entry.tags.join('; ');
    const category = entry.category || '';
    
    return `"${date}","${type}","${title}","${content}","${mood}","${tags}","${category}"`;
  });
  
  // Объединение заголовков и строк
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  // Создание BOM для корректного отображения кириллицы в Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Создание ссылки для скачивания
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Экспорт записей в PDF формат (простой HTML-to-PDF)
 */
export function exportToPDF(entries: JournalEntry[], filename: string = 'journal-export.pdf') {
  // Создание HTML контента для PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px;
            color: #1a1a1a;
            line-height: 1.6;
          }
          h1 {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          .entry {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            page-break-inside: avoid;
          }
          .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          .entry-date {
            color: #6b7280;
            font-size: 14px;
          }
          .entry-type {
            background: #2563eb;
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          }
          .entry-title {
            font-size: 20px;
            font-weight: 600;
            margin: 10px 0;
            color: #1a1a1a;
          }
          .entry-content {
            color: #4b5563;
            margin: 10px 0;
            white-space: pre-wrap;
          }
          .entry-meta {
            display: flex;
            gap: 15px;
            margin-top: 15px;
            font-size: 14px;
            color: #6b7280;
          }
          .entry-tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .tag {
            background: #f3f4f6;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
          }
          .mood {
            font-weight: 600;
          }
          @media print {
            .entry {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <h1>Ежедневник - Экспорт данных</h1>
        <p style="color: #6b7280; margin-bottom: 30px;">
          Экспортировано: ${new Date().toLocaleString('ru-RU')}<br>
          Всего записей: ${entries.length}
        </p>
        ${entries.map(entry => {
          const date = new Date(entry.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const type = entry.type === 'day' ? 'День' : entry.type === 'health' ? 'Здоровье' : 'Размышления';
          const mood = entry.mood ? `Настроение: ${entry.mood}/10` : '';
          
          return `
            <div class="entry">
              <div class="entry-header">
                <span class="entry-date">${date}</span>
                <span class="entry-type">${type}</span>
              </div>
              <div class="entry-title">${entry.title}</div>
              <div class="entry-content">${entry.content}</div>
              <div class="entry-meta">
                ${mood ? `<span class="mood">${mood}</span>` : ''}
                ${entry.category ? `<span>Категория: ${entry.category}</span>` : ''}
                ${entry.tags.length > 0 ? `
                  <div class="entry-tags">
                    ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </body>
    </html>
  `;
  
  // Открытие в новом окне для печати/сохранения как PDF
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Ждем загрузки и затем вызываем печать
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}

/**
 * Экспорт статистики в текстовый формат
 */
export function exportStatsToText(stats: {
  totalEntries: number;
  entriesThisMonth: number;
  averageMood: number;
  mostUsedTags: { tag: string; count: number }[];
  entriesByType: { type: string; count: number }[];
}, filename: string = 'journal-stats.txt') {
  const content = `
СТАТИСТИКА ЕЖЕДНЕВНИКА
=====================

Общая статистика:
- Всего записей: ${stats.totalEntries}
- Записей в этом месяце: ${stats.entriesThisMonth}
- Среднее настроение: ${stats.averageMood.toFixed(1)}/10

Записи по типам:
${stats.entriesByType.map(e => `- ${e.type}: ${e.count}`).join('\n')}

Наиболее используемые теги:
${stats.mostUsedTags.map(t => `- ${t.tag}: ${t.count} раз`).join('\n')}

Экспортировано: ${new Date().toLocaleString('ru-RU')}
  `.trim();
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

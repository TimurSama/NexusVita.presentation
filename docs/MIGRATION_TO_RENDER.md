# Миграция с Vercel на Render

## Преимущества Render:

1. **Нет лимита на функции** - можно иметь сколько угодно endpoints
2. **Лучше для долгоживущих процессов** - идеально для Telegram бота
3. **Бесплатный уровень** - для начала работы
4. **Проще для Node.js приложений** - полный контроль над сервером

## Что нужно мигрировать:

### 1. Frontend (React приложение)
- Оставить на Vercel (отлично работает)
- Или перенести на Render Static Site

### 2. Backend API (Serverless Functions)
- Перенести на Render Web Service
- Объединить все endpoints в один Express сервер

### 3. Telegram Bot
- Уже на Render ✅
- Работает отлично

## План миграции:

### Вариант 1: Гибридный (РЕКОМЕНДУЕТСЯ)
- **Frontend**: Vercel (быстро, бесплатно)
- **API + Bot**: Render (нет лимитов)

### Вариант 2: Полная миграция
- **Все на Render**: Frontend + API + Bot

## Структура на Render:

```
api/
  server.ts          # Express сервер со всеми endpoints
  routes/
    users.ts         # /api/users/*
    ai.ts            # /api/ai/*
    telegram.ts      # /api/telegram/*
    admin.ts         # /api/admin/*
```

## Пример server.ts:

```typescript
import express from 'express';
import { userRoutes } from './routes/users';
import { aiRoutes } from './routes/ai';
import { telegramRoutes } from './routes/telegram';

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/telegram', telegramRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
```

## Переменные окружения на Render:

Те же самые:
- `DATABASE_URL`
- `TELEGRAM_BOT_TOKEN`
- `GROQ_API_KEY` (для ИИ)
- `NODE_ENV=production`

## Стоимость:

- **Free план**: Достаточно для начала
- **Starter план**: $7/месяц (если нужно больше ресурсов)

## Время миграции:

- Подготовка: 1-2 часа
- Тестирование: 1 час
- Деплой: 30 минут

**Итого**: ~3 часа работы

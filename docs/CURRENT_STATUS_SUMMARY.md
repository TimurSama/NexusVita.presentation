# Текущий статус системы базы данных

## Ответы на вопросы

### 1. Какая работает система базы данных на Vercel?

**Ответ: НИКАКАЯ ❌**

- На Vercel сейчас база данных **НЕ РАБОТАЕТ**
- Используется SQLite, который **не поддерживается** на Vercel serverless функциях
- При деплое на Vercel собирается только клиент (`build:vercel`)
- Серверная часть с БД не запускается

### 2. Как пользователи регистрируются и входят?

**Локально (работает ✅):**
- Регистрация: `POST /api/auth/register` (email + password)
- Вход: `POST /api/auth/login` (email + password)
- Telegram авторизация: `POST /api/auth/telegram-auth`
- Данные сохраняются в SQLite (`data/ethoslife.db`)

**На Vercel (НЕ работает ❌):**
- API endpoints не работают (нет сервера)
- Регистрация и вход невозможны
- Данные не сохраняются

### 3. Где хранятся данные Марии?

**Локально:**
- Файл: `data/ethoslife.db` (SQLite)
- Таблицы:
  - `users` - пользователь Мария (telegram_id: 403161451)
  - `user_profiles` - профиль (рост 172, вес 57, дата рождения 23.10.1997)
  - `documents` - документ "Комплексное исследование..."
  - `daily_plans` - месячный план упражнений
  - `telegram_bot_settings` - настройки бота

**На Vercel:**
- Данные **НЕ хранятся** (SQLite не работает)
- Нужна миграция на Postgres (Supabase/Vercel Postgres)

## Что нужно сделать для работы на Vercel

1. **Выбрать базу данных:**
   - Supabase (рекомендую) - бесплатно, просто
   - Vercel Postgres - встроенная интеграция
   - Neon/Railway - альтернативы

2. **Настроить подключение:**
   - Создать БД
   - Получить connection string
   - Добавить в Environment Variables Vercel

3. **Обновить код:**
   - Использовать `database-postgres.ts` вместо `database.ts`
   - Обновить все импорты
   - Создать миграцию данных Марии

4. **Настроить серверные функции:**
   - Vercel Functions для API endpoints
   - Или использовать отдельный сервер (Railway, Render)

## Текущая архитектура

```
Локально:
├── SQLite (data/ethoslife.db) ✅
├── Express сервер ✅
├── API endpoints ✅
└── Telegram бот ✅

Vercel (сейчас):
├── SQLite ❌ (не работает)
├── Express сервер ❌ (не запускается)
├── API endpoints ❌ (недоступны)
└── Только статический клиент ✅
```

## Рекомендуемое решение

**Вариант 1: Supabase + Vercel Functions**
- Supabase для БД
- Vercel Functions для API
- Простая настройка

**Вариант 2: Отдельный сервер**
- Railway/Render для сервера с SQLite
- Vercel только для клиента
- Проще для начала

**Вариант 3: Vercel Postgres + Vercel Functions**
- Встроенная интеграция
- Нужна миграция кода

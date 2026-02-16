# Полная миграция на Render

## ✅ Что сделано:

1. **Удалены ненужные функции:**
   - `api/telegram/test.ts` - тест БД (есть в debug)
   - `api/admin/init-maria.ts` - инициализация Марии (теперь через /start)

2. **Создан единый сервер для Render:**
   - `render/unified-server.ts` - объединяет API + Bot
   - `render/routes/` - все API endpoints как Express routes
   - `render.yaml` - обновленная конфигурация

3. **Экспортированы функции бота:**
   - `initializeBot()` и `setupBotHandlers()` из `api/telegram/webhook.ts`

## Структура на Render:

```
render/
  unified-server.ts    # Главный сервер (API + Bot)
  routes/
    auth.ts           # Telegram auth
    users.ts          # User endpoints
    telegram.ts       # Telegram webhook (опционально)
    admin.ts          # Admin endpoints
```

## Как деплоить:

### 1. Обновить package.json (уже сделано):
```json
"build:render": "vite build && esbuild render/unified-server.ts ...",
"start:render": "NODE_ENV=production node dist/unified-server.js"
```

### 2. Настроить Render:

1. **Создать новый Web Service:**
   - Repository: ваш GitHub репозиторий
   - Branch: `main`
   - Build Command: `pnpm install --frozen-lockfile && pnpm run build:render`
   - Start Command: `pnpm run start:render`

2. **Добавить Environment Variables:**
   - `NODE_ENV=production`
   - `TELEGRAM_BOT_TOKEN` (ваш токен)
   - `DATABASE_URL` (PostgreSQL)
   - `POSTGRES_URL` (если отличается)
   - `RENDER=true`

3. **Health Check:**
   - Path: `/health`

### 3. Отключить бота на Vercel:

1. Удалить webhook:
   ```bash
   curl https://api.telegram.org/bot<TOKEN>/deleteWebhook
   ```

2. Или через браузер:
   ```
   https://api.telegram.org/bot<TOKEN>/deleteWebhook
   ```

### 4. Настроить webhook на Render (опционально):

Если хотите использовать webhook вместо polling:
```
https://your-app.onrender.com/api/admin/setup-webhook
```

Или вручную:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-app.onrender.com/api/telegram/webhook
```

## Преимущества:

✅ **Нет лимита на функции** - можно иметь сколько угодно endpoints  
✅ **Лучше для долгоживущих процессов** - идеально для Telegram бота  
✅ **Единая платформа** - Frontend + API + Bot в одном месте  
✅ **Проще управление** - один деплой для всего  
✅ **Бесплатный уровень** - достаточно для начала  

## Важно:

- **Бот работает через polling** на Render (лучше для стабильности)
- **Webhook опционален** - можно включить через `/api/admin/setup-webhook`
- **Frontend остается на Vercel** - можно мигрировать позже
- **API endpoints** работают так же, как на Vercel

## Следующие шаги:

1. ✅ Код готов
2. ⏳ Создать Web Service на Render
3. ⏳ Настроить переменные окружения
4. ⏳ Деплой и тестирование
5. ⏳ Отключить бота на Vercel

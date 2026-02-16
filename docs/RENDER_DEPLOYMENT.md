# Деплой на Render - Пошаговая инструкция

## ✅ Подготовка завершена

Все файлы готовы для деплоя на Render:
- ✅ `render/unified-server.ts` - единый сервер (API + Bot)
- ✅ `render/routes/` - все API endpoints
- ✅ `render.yaml` - конфигурация
- ✅ `package.json` - обновленные скрипты

## 🚀 Шаги деплоя:

### 1. Создать Web Service на Render

1. Зайти на [render.com](https://render.com)
2. **New** → **Web Service**
3. Подключить GitHub репозиторий
4. Настроить:
   - **Name**: `ethoslife-unified-server`
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Root Directory**: (оставить пустым)
   - **Build Command**: `pnpm install --frozen-lockfile && pnpm run build:render`
   - **Start Command**: `pnpm run start:render`

### 2. Добавить Environment Variables

В настройках сервиса → **Environment**:

```
NODE_ENV=production
TELEGRAM_BOT_TOKEN=<ваш токен>
DATABASE_URL=<ваш PostgreSQL URL>
POSTGRES_URL=<если отличается от DATABASE_URL>
RENDER=true
```

### 3. Настроить Health Check

- **Health Check Path**: `/health`
- **Auto-Deploy**: `Yes` (опционально)

### 4. Деплой

Нажать **Create Web Service** и дождаться деплоя.

## 🔧 После деплоя:

### Проверить работу:

1. **Health Check:**
   ```
   https://your-app.onrender.com/health
   ```

2. **API Debug:**
   ```
   https://your-app.onrender.com/api/telegram/debug
   ```

3. **Bot должен работать автоматически** (через polling)

### Опционально: Настроить Webhook

Если хотите использовать webhook вместо polling:
```
https://your-app.onrender.com/api/admin/setup-webhook
```

Или вручную:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-app.onrender.com/api/telegram/webhook
```

## 🔄 Отключить бота на Vercel:

1. Удалить webhook:
   ```
   https://api.telegram.org/bot<TOKEN>/deleteWebhook
   ```

2. Или через браузер:
   ```
   https://api.telegram.org/bot<TOKEN>/deleteWebhook
   ```

## 📝 Важно:

- **Бот работает через polling** на Render (лучше для стабильности)
- **Webhook опционален** - можно включить через `/api/admin/setup-webhook`
- **Frontend остается на Vercel** - можно мигрировать позже
- **API endpoints** работают так же, как на Vercel

## 🐛 Troubleshooting:

### Бот не отвечает:
1. Проверить логи в Render Dashboard
2. Проверить `TELEGRAM_BOT_TOKEN` в Environment Variables
3. Проверить `/api/telegram/debug`

### Ошибки сборки:
1. Проверить `pnpm-lock.yaml` в репозитории
2. Проверить Node.js версию (должна быть 18+)

### База данных не подключается:
1. Проверить `DATABASE_URL` в Environment Variables
2. Проверить доступность PostgreSQL из Render

# Исправление ошибок Vercel

## Проблема: ERR_MODULE_NOT_FOUND

Ошибка возникала из-за того, что Vercel использует ESM (ES Modules), и при импорте TypeScript файлов нужно указывать расширение `.js` (не `.ts`), потому что после компиляции TypeScript файлы становятся `.js`.

## Что исправлено:

1. ✅ Все импорты в `api/` обновлены с `.ts` на `.js`:
   - `from '../lib/database'` → `from '../lib/database.js'`
   - `from '../../lib/database'` → `from '../../lib/database.js'`

2. ✅ Создан `api/tsconfig.json` для правильной конфигурации TypeScript

3. ✅ Все файлы в `api/` используют правильные импорты

## Файлы, которые были исправлены:

- `api/auth/telegram-auth.ts`
- `api/telegram/webhook.ts`
- `api/telegram/test.ts`
- `api/users/[userId]/profile.ts`
- `api/users/[userId]/documents.ts`
- `api/users/[userId]/plans.ts`
- `api/admin/init-maria.ts`

## Проверка после деплоя:

1. Проверьте тестовый endpoint:
   ```
   https://your-project.vercel.app/api/telegram/test
   ```
   Должен вернуть JSON без ошибок.

2. Проверьте webhook:
   - Откройте [@BotFather](https://t.me/BotFather)
   - Отправьте: `/getwebhookinfo`
   - Должен быть URL: `https://your-project.vercel.app/api/telegram/webhook`

3. Проверьте бота:
   - Отправьте `/start` боту
   - Бот должен ответить

4. Проверьте аутентификацию:
   - Откройте приложение через Telegram бота
   - Аутентификация должна работать

## Если ошибка все еще есть:

1. Проверьте логи в Vercel Dashboard → Deployments → Functions → Logs
2. Убедитесь, что `DATABASE_URL` настроен в Environment Variables
3. Убедитесь, что `TELEGRAM_BOT_TOKEN` настроен в Environment Variables
4. Попробуйте пересобрать проект в Vercel

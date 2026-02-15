# Настройка переменных окружения в Vercel

## Критически важно!

Бот **НЕ БУДЕТ РАБОТАТЬ** без правильной настройки переменных окружения!

## Обязательные переменные:

### 1. TELEGRAM_BOT_TOKEN

**Как получить:**
1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/mybots`
3. Выберите вашего бота
4. Перейдите в "API Token"
5. Скопируйте токен (выглядит как `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

**Как добавить в Vercel:**
1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `etholife`
3. Перейдите в **Settings** → **Environment Variables**
4. Нажмите **Add New**
5. Введите:
   - **Name**: `TELEGRAM_BOT_TOKEN`
   - **Value**: вставьте токен из BotFather
   - **Environment**: выберите **Production**, **Preview**, **Development** (или все)
6. Нажмите **Save**

### 2. DATABASE_URL

**Как получить:**
- Если используете Vercel Postgres: Settings → Storage → Postgres → Connection String
- Если используете Supabase: Project Settings → Database → Connection String

**Как добавить:**
1. В Vercel Dashboard → Settings → Environment Variables
2. Добавьте:
   - **Name**: `DATABASE_URL`
   - **Value**: строка подключения к базе данных
   - **Environment**: все окружения

## Проверка настройки:

После добавления переменных:

1. **Пересоберите проект:**
   - Vercel Dashboard → Deployments
   - Нажмите "..." на последнем деплое → "Redeploy"

2. **Проверьте endpoint:**
   ```
   https://etholife.vercel.app/api/telegram/webhook-info
   ```
   Должен вернуть JSON с информацией о webhook и боте (не ошибку!)

3. **Проверьте webhook:**
   - Откройте [@BotFather](https://t.me/BotFather)
   - Отправьте: `/getwebhookinfo`
   - Должен быть показан URL: `https://etholife.vercel.app/api/telegram/webhook`

## Если бот все еще не работает:

1. ✅ Проверьте, что переменные добавлены в **все окружения** (Production, Preview, Development)
2. ✅ Убедитесь, что проект **пересобран** после добавления переменных
3. ✅ Проверьте, что токен правильный (скопирован полностью, без пробелов)
4. ✅ Проверьте логи в Vercel Dashboard → Functions → Logs

## Важно:

- Переменные окружения применяются только после **пересборки проекта**
- Если вы добавили переменную, но не пересобрали проект - она не будет доступна
- Всегда проверяйте endpoint `/api/telegram/webhook-info` после добавления переменных

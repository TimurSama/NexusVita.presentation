# Настройка Vercel и базы данных для EthosLife

## Развертывание на Vercel

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки из `vercel.json`
3. Установите переменные окружения в настройках проекта

## База данных

### Вариант 1: Vercel Postgres (рекомендуется)
1. В панели Vercel перейдите в раздел Storage
2. Создайте новую базу данных Postgres
3. Скопируйте строку подключения в переменные окружения:
   - `DATABASE_URL` - строка подключения к PostgreSQL

### Вариант 2: MongoDB Atlas
1. Создайте кластер на MongoDB Atlas
2. Получите строку подключения
3. Добавьте в переменные окружения:
   - `MONGODB_URI` - строка подключения к MongoDB

## Переменные окружения

Добавьте следующие переменные в настройках проекта Vercel:

```
DATABASE_URL=postgresql://...
# или
MONGODB_URI=mongodb+srv://...

NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

## API Routes

API routes будут созданы в папке `api/`:
- `api/auth/register.ts` - регистрация пользователя
- `api/auth/login.ts` - вход пользователя
- `api/user/profile.ts` - получение/обновление профиля
- `api/health/data.ts` - сохранение данных о здоровье

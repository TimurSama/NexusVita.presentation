# Текущие API функции (11 штук)

## Структура функций:

### Admin (1 функция)
- `api/admin/setup-webhook.ts` - Настройка webhook для Telegram бота

### Auth (1 функция)
- `api/auth/telegram-auth.ts` - Аутентификация через Telegram

### Telegram (3 функции)
- `api/telegram/webhook.ts` - Основной webhook для обработки сообщений бота
- `api/telegram/webhook-info.ts` - Информация о webhook
- `api/telegram/debug.ts` - Отладочная информация

### Users (6 функций)
- `api/users/[userId]/account.ts` - **Объединенный endpoint** для:
  - Токены (GET/POST с `?action=tokens`)
  - Onboarding (GET/POST с `?action=onboarding`)
- `api/users/[userId]/profile.ts` - Профиль пользователя
- `api/users/[userId]/plans.ts` - Планы пользователя
- `api/users/[userId]/documents.ts` - Документы пользователя
- `api/users/[userId]/metrics.ts` - Метрики здоровья
- `api/users/[userId]/goals.ts` - Цели пользователя

## Итого: 11 функций (в пределах лимита 12)

## Важно:
- **Токены НЕ удалены** - они объединены в `account.ts` для экономии функций
- Использование: `GET /api/users/{userId}/account?action=tokens`
- Onboarding также в `account.ts`: `GET /api/users/{userId}/account?action=onboarding`

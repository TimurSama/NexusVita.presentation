# Настройка базы данных и Telegram бота

## База данных SQLite

База данных автоматически создается при первом запуске сервера в директории `data/ethoslife.db`.

### Схема базы данных

- **users** - Пользователи (email, password_hash, telegram_id)
- **user_profiles** - Профили пользователей (дата рождения, рост, вес)
- **documents** - Документы пользователей (медицинские документы, исследования)
- **daily_plans** - Ежедневные планы (упражнения, процедуры)
- **health_metrics** - Метрики здоровья (вес, шаги, сон, настроение)
- **goals** - Цели пользователей
- **telegram_bot_settings** - Настройки Telegram бота для каждого пользователя
- **telegram_bot_logs** - Логи действий в Telegram боте

## Telegram бот

### Настройка

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Получите токен бота
3. Создайте файл `.env` в корне проекта:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
PORT=3000
```

4. Запустите сервер - бот автоматически инициализируется

### Команды бота

- `/start` - Начать работу с ботом (создает аккаунт если его нет)
- `/help` - Список всех команд
- `/settings` - Настройки уведомлений
- `/today` - План на сегодня
- `/complete <номер>` - Отметить задачу выполненной
- `/metrics` - Показать команды для внесения метрик
- `/weight <кг>` - Записать вес
- `/steps <количество>` - Записать шаги
- `/sleep <часы>` - Записать сон
- `/mood <1-10>` - Записать настроение
- `/calories <ккал>` - Записать калории
- `/goals` - Мои цели
- `/note <текст>` - Добавить заметку

## API Endpoints

### Аутентификация

- `POST /api/auth/register` - Регистрация с email/password
- `POST /api/auth/login` - Вход с email/password
- `POST /api/auth/telegram-auth` - Регистрация/вход через Telegram
- `POST /api/auth/connect-telegram` - Подключить Telegram к существующему аккаунту

### Пользователи

- `GET /api/users/:userId/profile` - Получить профиль
- `PUT /api/users/:userId/profile` - Обновить профиль
- `GET /api/users/:userId/documents` - Получить документы
- `GET /api/users/:userId/documents/:documentId` - Получить документ
- `GET /api/users/:userId/plans` - Получить планы (можно указать date, startDate, endDate)
- `POST /api/users/:userId/plans` - Создать план
- `PATCH /api/users/:userId/plans/:planId` - Обновить план (completed)
- `GET /api/users/:userId/metrics` - Получить метрики (можно указать type, limit)
- `POST /api/users/:userId/metrics` - Создать метрику
- `GET /api/users/:userId/goals` - Получить цели
- `POST /api/users/:userId/goals` - Создать цель

## Профиль Марии

При первом запуске сервера автоматически создается профиль Марии:
- Telegram ID: 403161451
- Дата рождения: 23.10.1997
- Рост: 172 см
- Вес: 57 кг
- Документ "Комплексное исследование проблемы и план терапии при боли в спине" сохранен в БД
- Создан месячный план упражнений на основе документа

## Запуск

```bash
# Установка зависимостей
pnpm install

# Разработка (только клиент)
pnpm dev

# Сборка и запуск сервера
pnpm build
pnpm start
```

## Примечания

- База данных создается автоматически при первом запуске
- Telegram бот работает только если указан `TELEGRAM_BOT_TOKEN` в `.env`
- Профиль Марии создается автоматически при первом запуске сервера
- Все данные хранятся локально в SQLite базе данных

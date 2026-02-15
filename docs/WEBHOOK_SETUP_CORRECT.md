# Правильная настройка Webhook для Telegram бота

## Способ 1: Через BotFather (правильный путь)

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте: `/mybots`
3. Выберите вашего бота из списка
4. Нажмите на **"Bot Settings"** или **"API Token"**
5. Найдите раздел **"Webhook"** или **"Webhooks"**
6. Там должны быть опции для настройки webhook

**Или используйте прямые команды:**
- После выбора бота через `/mybots`, в меню бота должна быть опция для webhook

## Способ 2: Через Telegram Bot API (прямой вызов)

Если в BotFather нет прямых команд, можно установить webhook через API:

### Используя curl:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://etholife.vercel.app/api/telegram/webhook"}'
```

Замените `<YOUR_BOT_TOKEN>` на ваш токен бота.

### Проверка webhook:

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

## Способ 3: Через браузер (самый простой)

1. Откройте в браузере (замените `YOUR_BOT_TOKEN` на ваш токен):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://etholife.vercel.app/api/telegram/webhook
   ```

2. Должен вернуться JSON:
   ```json
   {"ok":true,"result":true,"description":"Webhook was set"}
   ```

3. Проверьте webhook:
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo
   ```

## Способ 4: Через код (автоматическая настройка)

Создайте endpoint для автоматической настройки webhook (см. `api/admin/setup-webhook.ts`)

## Важно:

- URL webhook должен быть **HTTPS** (не HTTP)
- URL должен быть доступен из интернета
- После установки webhook, бот перестанет получать обновления через long polling

## Проверка работы:

1. Установите webhook одним из способов выше
2. Откройте: `https://etholife.vercel.app/api/telegram/webhook-info`
3. Должен показать информацию о webhook
4. Отправьте `/start` боту
5. Проверьте логи в Vercel - должны быть записи о получении обновления

## Если webhook не работает:

1. Проверьте, что URL правильный и доступен
2. Проверьте, что используется HTTPS
3. Проверьте логи в Vercel на ошибки
4. Убедитесь, что `TELEGRAM_BOT_TOKEN` правильный

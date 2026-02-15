# Отключение Telegram бота от Vercel

После переноса бота на Render, нужно отключить webhook от Vercel.

## Шаг 1: Удалите webhook

Откройте в браузере (замените `YOUR_BOT_TOKEN` на ваш токен):

```
https://api.telegram.org/botYOUR_BOT_TOKEN/deleteWebhook
```

Или установите пустой webhook:

```
https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=
```

## Шаг 2: Проверьте, что webhook удален

```
https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo
```

Должен вернуть:
```json
{
  "ok": true,
  "result": {
    "url": "",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## Шаг 3: (Опционально) Удалите файлы бота из Vercel

Если хотите полностью удалить бота из Vercel, можно удалить:
- `api/telegram/webhook.ts`
- `api/telegram/webhook-info.ts`
- `api/telegram/debug.ts`
- `api/telegram/test.ts`
- `api/admin/setup-webhook.ts`

**Но это не обязательно** - эти файлы просто не будут использоваться, если webhook удален.

## Готово!

Теперь бот работает на Render и не использует Vercel.

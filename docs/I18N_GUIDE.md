# 🌍 Internationalization (i18n) Guide

## Структура

```
client/src/i18n/
├── index.ts           # Контекст и провайдер
└── locales/
    ├── en.json        # Английский (по умолчанию)
    └── ru.json        # Русский
```

## Как использовать

### 1. В компоненте:

```tsx
import { useI18n } from '@/i18n';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t('app.name')}</h1>
      <p>{t('app.tagline')}</p>
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('ru')}>Русский</button>
    </div>
  );
}
```

### 2. Добавить новый перевод:

**en.json:**
```json
{
  "myKey": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**ru.json:**
```json
{
  "myKey": {
    "title": "Мой заголовок",
    "description": "Мое описание"
  }
}
```

**Использование:**
```tsx
t('myKey.title') // "My Title" или "Мой заголовок"
```

### 3. Переключатель языка уже добавлен в Header!

Кнопка с флагом 🇬🇧/🇷🇺 в правом верхнем углу.

## Доступные ключи

### app
- `app.name` - "EthosLife"
- `app.tagline` - "Health is a lifestyle habit"

### nav
- `nav.home`, `nav.dashboard`, `nav.health`, `nav.modules`
- `nav.specialists`, `nav.centers`, `nav.pricing`
- `nav.login`, `nav.register`, `nav.logout`

### auth
- `auth.loginTitle`, `auth.registerTitle`
- `auth.email`, `auth.password`
- `auth.googleLogin`, `auth.telegramLogin`

### health.modules
- `health.modules.medicine`, `health.modules.movement`
- `health.modules.nutrition`, `health.modules.psychology`
- `health.modules.sleep`, `health.modules.relationships`
- `health.modules.habits`

### dashboard
- `dashboard.welcome`, `dashboard.dailyPlan`
- `dashboard.metrics`, `dashboard.aiAssistant`

### pricing
- `pricing.title`, `pricing.free`, `pricing.basic`, `pricing.premium`
- `pricing.features.allModules`, `pricing.features.unlimitedAI`

### common
- `common.save`, `common.cancel`, `common.delete`
- `common.loading`, `common.error`, `common.success`

## English is PRIMARY

По умолчанию приложение использует **английский язык**.
Пользователь может переключиться на русский через кнопку в хедере.

## Добавить новый язык

1. Создать файл `client/src/i18n/locales/xx.json`
2. Добавить язык в `client/src/i18n/index.ts`:

```ts
const locales: Record<Locale, Record<string, any>> = {
  en,
  ru,
  xx, // новый язык
};
```

3. Добавить в LanguageSwitcher:

```ts
const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'xx', label: 'Language', flag: '🇽🇽' },
];
```

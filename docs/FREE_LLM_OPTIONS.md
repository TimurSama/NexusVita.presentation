# Бесплатные LLM для ИИ-ассистента

## Рекомендуемые варианты для начала работы:

### 1. **Groq API** (РЕКОМЕНДУЕТСЯ) ⭐
- **Бесплатно**: 14,400 запросов/день
- **Скорость**: Очень быстрый (до 500 токенов/сек)
- **Модели**: Llama 3.1 70B, Mixtral 8x7B, Gemma 7B
- **API**: Простой REST API
- **Регистрация**: https://console.groq.com
- **Идеально для**: Быстрых ответов, чат-ботов

### 2. **Together AI**
- **Бесплатно**: $25 кредитов при регистрации
- **Модели**: Llama 2, Mistral, Mixtral, CodeLlama
- **API**: OpenAI-совместимый
- **Регистрация**: https://together.ai
- **Идеально для**: Разработки и тестирования

### 3. **Hugging Face Inference API**
- **Бесплатно**: Ограниченное количество запросов
- **Модели**: Множество открытых моделей
- **API**: REST API
- **Регистрация**: https://huggingface.co
- **Идеально для**: Экспериментов с разными моделями

### 4. **OpenAI API** (с бесплатным кредитом)
- **Бесплатно**: $5 кредитов при регистрации (ограничено)
- **Модели**: GPT-3.5-turbo, GPT-4 (платно)
- **API**: Стандартный OpenAI API
- **Регистрация**: https://platform.openai.com
- **Идеально для**: Прототипирования

### 5. **Ollama** (локальный)
- **Бесплатно**: Полностью бесплатный
- **Установка**: На вашем сервере
- **Модели**: Llama 2, Mistral, CodeLlama и др.
- **API**: Локальный API
- **Идеально для**: Полного контроля, приватности

## Рекомендация для EthosLife:

**Начать с Groq API** - самый быстрый и бесплатный вариант для начала.

### Пример интеграции:

```typescript
// api/ai/chat.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, userId } = req.body;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'Ты - персональный ассистент здоровья EthosLife. Помогай пользователям с вопросами о здоровье, анализируй их данные и давай персональные рекомендации.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    return res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Groq API error:', error);
    return res.status(500).json({ error: 'AI service error' });
  }
}
```

## Переменные окружения:

Добавьте в Vercel/Render:
```
GROQ_API_KEY=your_groq_api_key_here
```

## Следующие шаги:

1. Зарегистрируйтесь на Groq: https://console.groq.com
2. Получите API ключ
3. Добавьте переменную окружения
4. Создайте endpoint `/api/ai/chat.ts`
5. Интегрируйте в `AIChat.tsx`

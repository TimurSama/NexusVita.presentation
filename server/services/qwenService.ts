import { supabase } from '../supabase/client';

// Qwen LLM configuration
const QWEN_API_URL = process.env.QWEN_API_URL || 'https://api-inference.modelscope.cn/v1';
const QWEN_API_KEY = process.env.QWEN_API_KEY || '';

// System prompt for health assistant
const HEALTH_SYSTEM_PROMPT = `You are a helpful health and wellness AI assistant for EthosLife, a comprehensive health ecosystem app. 

Your role is to:
1. Provide general health and wellness advice
2. Help users understand their health data
3. Suggest healthy habits and routines
4. Answer questions about the app's features
5. Provide motivational support

Important guidelines:
- You are NOT a medical doctor. Never diagnose conditions or prescribe treatments.
- Always recommend consulting healthcare professionals for medical concerns.
- Be encouraging and positive about healthy lifestyle changes.
- Use evidence-based general wellness information.
- Keep responses concise but informative.
- If you don't know something, be honest about it.

The app has 7 health modules: Medicine, Movement, Nutrition, Psychology, Sleep, Relationships, and Habits.
Users can track metrics, set goals, connect with specialists, and earn Unity tokens for healthy activities.

Respond in the same language the user is using.`;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionOptions {
  userId: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
}

// Simple in-memory cache for free tier optimization
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function generateCacheKey(messages: ChatMessage[]): string {
  return messages.map(m => `${m.role}:${m.content}`).join('|');
}

export async function generateChatCompletion(options: ChatCompletionOptions): Promise<string> {
  const { userId, messages, maxTokens = 1000, temperature = 0.7 } = options;
  
  // Check cache for common questions
  const cacheKey = generateCacheKey(messages);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }

  try {
    // Try primary API (Hugging Face or custom endpoint)
    const response = await fetch(`${QWEN_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QWEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen2.5-7b-instruct',
        messages: [
          { role: 'system', content: HEALTH_SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: maxTokens,
        temperature: temperature,
        stream: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      
      // Cache successful response
      responseCache.set(cacheKey, { response: content, timestamp: Date.now() });
      
      // Save to chat history
      await saveChatMessage(userId, 'assistant', content);
      
      return content;
    }

    // Fallback to local/basic response if API fails
    return generateFallbackResponse(messages);
  } catch (error) {
    console.error('Qwen API error:', error);
    return generateFallbackResponse(messages);
  }
}

// Fallback responses for when API is unavailable
function generateFallbackResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  
  // Simple pattern matching for common questions
  if (lastMessage.includes('привет') || lastMessage.includes('здравствуй')) {
    return 'Привет! Я ваш AI-ассистент по здоровью. Чем могу помочь сегодня?';
  }
  
  if (lastMessage.includes('сон') || lastMessage.includes('спать')) {
    return 'Здоровый сон очень важен! Рекомендую 7-9 часов сна, регулярное время отхода ко сну и ограничение экранов перед сном. Хотите узнать больше о трекинге сна в приложении?';
  }
  
  if (lastMessage.includes('питание') || lastMessage.includes('еда') || lastMessage.includes('диет')) {
    return 'Сбалансированное питание - основа здоровья! Рекомендую разнообразные продукты, достаточно овощей и фруктов, контроль порций. В приложении есть дневник питания для отслеживания.';
  }
  
  if (lastMessage.includes('тренировк') || lastMessage.includes('спорт') || lastMessage.includes('упражнен')) {
    return 'Физическая активность улучшает здоровье и настроение! Рекомендую 150 минут умеренной активности в неделю. В приложении можно отслеживать тренировки и шаги.';
  }
  
  if (lastMessage.includes('стресс') || lastMessage.includes('тревог') || lastMessage.includes('настроен')) {
    return 'Управление стрессом важно для психического здоровья. Попробуйте дыхательные упражнения, медитацию или прогулки. В приложении есть трекер настроения и CBT-инструменты.';
  }
  
  if (lastMessage.includes('вода') || lastMessage.includes('воду')) {
    return 'Гидратация важна! Рекомендую пить около 2 литров воды в день. В приложении можно отслеживать потребление воды.';
  }
  
  if (lastMessage.includes('токен') || lastMessage.includes('unity')) {
    return 'UNITY токены - это внутренняя валюта EthosLife. Зарабатывайте их за здоровые привычки и тратьте на подписки с выгодой 15%!';
  }
  
  if (lastMessage.includes('специалист') || lastMessage.includes('врач') || lastMessage.includes('тренер')) {
    return 'В EthosLife вы можете подключить специалистов (врачей, тренеров, нутрициологов) к своему дашборду. Они увидят ваши данные и дадут персональные рекомендации.';
  }
  
  // Default response
  return 'Спасибо за вопрос! Я здесь, чтобы помочь с вашим здоровьем и wellness. Можете уточнить, что именно вас интересует? Я могу рассказать о модулях приложения, дать советы по здоровью или помочь с мотивацией.';
}

async function saveChatMessage(userId: string, role: string, content: string) {
  try {
    await supabase.from('ai_chat_history').insert([{
      user_id: userId,
      role,
      content,
    }]);
  } catch (error) {
    console.error('Failed to save chat message:', error);
  }
}

export async function getChatHistory(userId: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('ai_chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data?.reverse() || [];
  } catch (error) {
    console.error('Failed to get chat history:', error);
    return [];
  }
}

// Quick health tips
export const QUICK_HEALTH_TIPS = [
  '💧 Выпейте стакан воды сразу после пробуждения',
  '🚶‍♂️ Делайте 5-минутные перерывы на растяжку каждый час',
  '😴 Ложитесь спать в одно и то же время для лучшего качества сна',
  '🥗 Добавьте еще один овощ к каждому приему пищи',
  '🧘‍♀️ Практикуйте глубокое дыхание в течение 2 минут',
  '📱 Ограничьте время перед экраном за час до сна',
  '🤝 Позвоните другу или родственнику для социального здоровья',
  '📝 Запишите 3 вещи, за которые вы благодарны',
  '🏃‍♂️ Сделайте 10-минутную прогулку после обеда',
  '🌿 Проветрите комнату перед сном',
];

export function getRandomTip(): string {
  return QUICK_HEALTH_TIPS[Math.floor(Math.random() * QUICK_HEALTH_TIPS.length)];
}

import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

const QWEN_API_KEY = process.env.QWEN_API_KEY;
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

// System prompt for health assistant
const HEALTH_SYSTEM_PROMPT = `You are NexusVita AI, a supportive health and wellness assistant. 
You help users with:
- Health and wellness questions
- Nutrition and diet advice
- Exercise and movement guidance
- Sleep improvement tips
- Mental health support (non-clinical)
- General lifestyle recommendations

Important guidelines:
- Always clarify you are an AI assistant, not a medical professional
- For serious medical concerns, recommend consulting healthcare providers
- Be encouraging and supportive
- Provide evidence-based general information
- Do not diagnose conditions or prescribe treatments`;

// Chat completion endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversation_id } = req.body;
    const authHeader = req.headers.authorization;

    let userId: string | null = null;
    let subscriptionTier = 'free';

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        userId = decoded.userId;

        // Check subscription tier
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('subscription_tier')
          .eq('id', userId)
          .single();
        subscriptionTier = profile?.subscription_tier || 'free';
      } catch {}
    }

    // Rate limiting based on subscription
    const rateLimits: Record<string, number> = {
      'free': 10,
      'basic': 50,
      'premium': 200,
    };
    const dailyLimit = rateLimits[subscriptionTier] || 10;

    if (userId) {
      const today = new Date().toISOString().split('T')[0];
      const { data: usage } = await supabase
        .from('ai_usage')
        .select('count')
        .eq('user_id', userId)
        .eq('date', today)
        .single();

      if (usage && usage.count >= dailyLimit) {
        return res.status(429).json({
          error: 'Daily limit reached',
          message: `You have reached your daily limit of ${dailyLimit} messages. Upgrade your plan for more.`,
        });
      }
    }

    // Load conversation history
    let history: any[] = [];
    if (conversation_id && userId) {
      const { data: conversation } = await supabase
        .from('chat_history')
        .select('messages')
        .eq('id', conversation_id)
        .eq('user_id', userId)
        .single();
      if (conversation) {
        history = conversation.messages || [];
      }
    }

    // Try Qwen API first
    let aiResponse: string;
    let modelUsed = 'qwen';

    try {
      if (QWEN_API_KEY) {
        const response = await fetch(QWEN_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${QWEN_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'qwen-max',
            input: {
              messages: [
                { role: 'system', content: HEALTH_SYSTEM_PROMPT },
                ...history.slice(-10),
                { role: 'user', content: message },
              ],
            },
            parameters: {
              result_format: 'message',
              max_tokens: 1500,
              temperature: 0.7,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          aiResponse = data.output?.choices?.[0]?.message?.content || getLocalResponse(message);
        } else {
          throw new Error('Qwen API error');
        }
      } else {
        throw new Error('No API key');
      }
    } catch (error) {
      // Fallback to local response
      aiResponse = getLocalResponse(message);
      modelUsed = 'local';
    }

    // Save conversation
    if (userId) {
      const newMessages = [
        ...history,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse },
      ];

      if (conversation_id) {
        await supabase
          .from('chat_history')
          .update({ messages: newMessages, updated_at: new Date().toISOString() })
          .eq('id', conversation_id);
      } else {
        await supabase.from('chat_history').insert({
          user_id: userId,
          messages: newMessages,
        });
      }

      // Update usage
      const today = new Date().toISOString().split('T')[0];
      await supabase.rpc('increment_ai_usage', {
        p_user_id: userId,
        p_date: today,
      });
    }

    res.json({
      response: aiResponse,
      model: modelUsed,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversation history
router.get('/chat/history', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data: conversations } = await supabase
      .from('chat_history')
      .select('id, title, created_at, updated_at')
      .eq('user_id', decoded.userId)
      .order('updated_at', { ascending: false });

    res.json({ conversations: conversations || [] });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific conversation
router.get('/chat/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data: conversation } = await supabase
      .from('chat_history')
      .select('*')
      .eq('id', id)
      .eq('user_id', decoded.userId)
      .single();

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate health recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { category, context } = req.body;
    const authHeader = req.headers.authorization;

    let userId: string | null = null;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        userId = decoded.userId;
      } catch {}
    }

    // Generate recommendations based on category
    let recommendations: string[] = [];

    switch (category) {
      case 'nutrition':
        recommendations = [
          'Eat a variety of colorful vegetables and fruits daily',
          'Stay hydrated - aim for 8 glasses of water per day',
          'Include lean proteins in every meal',
          'Limit processed foods and added sugars',
          'Practice mindful eating and chew thoroughly',
        ];
        break;
      case 'movement':
        recommendations = [
          'Aim for at least 30 minutes of moderate activity daily',
          'Include both cardio and strength training in your routine',
          'Take breaks from sitting every hour',
          'Find activities you enjoy to stay consistent',
          'Gradually increase intensity to avoid injury',
        ];
        break;
      case 'sleep':
        recommendations = [
          'Maintain a consistent sleep schedule',
          'Create a relaxing bedtime routine',
          'Keep your bedroom cool, dark, and quiet',
          'Avoid screens 1 hour before bed',
          'Limit caffeine after 2 PM',
        ];
        break;
      case 'mental':
        recommendations = [
          'Practice daily mindfulness or meditation',
          'Maintain social connections with friends and family',
          'Take regular breaks and prioritize self-care',
          'Consider journaling to process emotions',
          'Seek professional help when needed',
        ];
        break;
      default:
        recommendations = [
          'Focus on one small habit at a time',
          'Track your progress to stay motivated',
          'Celebrate small wins along the way',
          'Be patient with yourself',
          'Consistency is more important than perfection',
        ];
    }

    res.json({ recommendations });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Local response generator (fallback)
function getLocalResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('привет') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Привет! 👋 Я NexusVita AI, ваш помощник по здоровью и wellness. Чем могу помочь сегодня?';
  }

  if (lowerMsg.includes('сон') || lowerMsg.includes('sleep')) {
    return 'Сон - основа здоровья! 🌙 Рекомендую:\n\n• Ложиться и вставать в одно время\n• 7-9 часов для взрослых\n• Темная, прохладная комната\n• Без гаджетов за час до сна\n\nХотите узнать больше о гигиене сна?';
  }

  if (lowerMsg.includes('питание') || lowerMsg.includes('еда') || lowerMsg.includes('nutrition') || lowerMsg.includes('diet')) {
    return 'Правильное питание - ключ к энергии! 🥗 Вот базовые принципы:\n\n• Разнообразные овощи и фрукты\n• Достаточно белка\n• Полезные жиры (авокадо, орехи)\n• Меньше переработанных продуктов\n• Пить достаточно воды\n\nХотите конкретный план питания?';
  }

  if (lowerMsg.includes('спорт') || lowerMsg.includes('тренировк') || lowerMsg.includes('exercise') || lowerMsg.includes('workout')) {
    return 'Движение - жизнь! 💪 Рекомендации ВОЗ:\n\n• 150 минут умеренной активности в неделю\n• Или 75 минут интенсивной\n• 2 силовые тренировки\n• Растяжка каждый день\n\nНачните с того, что вам нравится - танцы, плавание, йога!';
  }

  if (lowerMsg.includes('стресс') || lowerMsg.includes('тревог') || lowerMsg.includes('stress') || lowerMsg.includes('anxiety')) {
    return 'Управление стрессом важно для здоровья. 🧘 Попробуйте:\n\n• Глубокое дыхание (4-7-8)\n• Медитация 10 минут в день\n• Прогулки на природе\n• Общение с близкими\n• Ограничение новостей\n\nЕсли стресс мешает жить - обратитесь к специалисту.';
  }

  if (lowerMsg.includes('вода') || lowerMsg.includes('water') || lowerMsg.includes('hydration')) {
    return 'Гидратация критически важна! 💧\n\n• Около 2-3 литров в день для взрослых\n• Больше при жаре и тренировках\n• Начинайте день со стакана воды\n• Слушайте свою жажду\n\nПризнаки обезвоживания: головная боль, усталость, темная моча.';
  }

  if (lowerMsg.includes('вес') || lowerMsg.includes('похуд') || lowerMsg.includes('weight') || lowerMsg.includes('loss')) {
    return 'Здоровый вес - это не только цифры на весах. ⚖️\n\n• Создайте умеренный дефицит калорий\n• Фокус на питательные продукты\n• Регулярная активность\n• 7-9 часов сна\n• Управление стрессом\n\nЦель - 0.5-1 кг в неделю для устойчивого результата.';
  }

  return 'Интересный вопрос! 🤔\n\nЯ рекомендую обсудить это с вашим специалистом NexusVita для персонализированных рекомендаций.\n\nА пока могу предложить:\n• Улучшение сна и восстановления\n• План питания\n• Программу тренировок\n• Техники управления стрессом\n\nЧто вам интересно?';
}

export default router;

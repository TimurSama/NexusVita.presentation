import { Router } from 'express';
import { authMiddleware, AuthRequest, requireSubscription } from '../middleware/auth';
import { generateChatCompletion, getChatHistory, getRandomTip, generatePersonalizedRecommendations } from '../services/qwenService';
import { supabase } from '../supabase/client';

const router = Router();

// Get chat history
router.get('/chat/history', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const history = await getChatHistory(req.user!.id, limit);
    res.json({ messages: history });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

// Send message to AI
router.post('/chat', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user!.id;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check user's AI message limit based on subscription
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('plan:subscription_plans(features)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    const aiMessageLimit = subscription?.plan?.features?.ai_messages || 5;
    
    // Count today's messages
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('ai_chat_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('role', 'user')
      .gte('created_at', today);

    if (aiMessageLimit !== -1 && (count || 0) >= aiMessageLimit) {
      return res.status(429).json({
        error: 'Daily AI message limit reached',
        limit: aiMessageLimit,
        upgrade_url: '/pricing',
      });
    }

    // Get recent chat history for context
    const history = await getChatHistory(userId, 10);
    const messages = history.map(h => ({ role: h.role as any, content: h.content }));
    
    // Add user message
    messages.push({ role: 'user', content: message });
    
    // Save user message
    await supabase.from('ai_chat_history').insert([{
      user_id: userId,
      role: 'user',
      content: message,
    }]);

    // Generate response
    const response = await generateChatCompletion({
      userId,
      messages,
      maxTokens: 1000,
    });

    res.json({
      message: response,
      remaining_messages: aiMessageLimit === -1 ? 'unlimited' : aiMessageLimit - (count || 0) - 1,
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Get quick tip
router.get('/tip', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const tip = getRandomTip();
    res.json({ tip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tip' });
  }
});

// Get personalized recommendations
router.get('/recommendations', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const recommendations = await generatePersonalizedRecommendations(req.user!.id);
    res.json({ recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Clear chat history
router.delete('/chat/history', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await supabase
      .from('ai_chat_history')
      .delete()
      .eq('user_id', req.user!.id);
    
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    console.error('Clear history error:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Get AI insights based on health data
router.get('/insights', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    
    // Get recent health data
    const [sleepData, activityData, moodData, nutritionData] = await Promise.all([
      supabase.from('sleep_sessions').select('*').eq('user_id', userId).order('bed_time', { ascending: false }).limit(7),
      supabase.from('movement_daily_activity').select('*').eq('user_id', userId).order('date', { ascending: false }).limit(7),
      supabase.from('psychology_mood').select('*').eq('user_id', userId).order('logged_at', { ascending: false }).limit(7),
      supabase.from('nutrition_meals').select('*').eq('user_id', userId).order('meal_date', { ascending: false }).limit(7),
    ]);

    // Calculate averages and trends
    const avgSleep = sleepData.data?.reduce((acc, s) => acc + (s.duration_minutes || 0), 0) / (sleepData.data?.length || 1) / 60;
    const avgSteps = activityData.data?.reduce((acc, a) => acc + (a.steps || 0), 0) / (activityData.data?.length || 1);
    const avgMood = moodData.data?.reduce((acc, m) => acc + (m.mood_rating || 0), 0) / (moodData.data?.length || 1);

    const insights: string[] = [];

    // Generate insights
    if (avgSleep < 6) {
      insights.push('💤 У вас наблюдается недостаток сна. Попробуйте установить режим сна и ограничить экраны перед сном.');
    } else if (avgSleep > 8) {
      insights.push('💤 Отличный показатель сна! Вы получаете достаточно отдыха.');
    }

    if (avgSteps < 5000) {
      insights.push('🚶‍♂️ Активность ниже рекомендуемой. Попробуйте добавить 10-минутные прогулки в течение дня.');
    } else if (avgSteps > 10000) {
      insights.push('🚶‍♂️ Прекрасная активность! Вы превышаете рекомендуемую норму шагов.');
    }

    if (avgMood < 5) {
      insights.push('🧠 Настроение ниже среднего. Попробуйте практики осознанности или обратитесь к специалисту через приложение.');
    }

    if (insights.length === 0) {
      insights.push('🌟 Ваши показатели в норме! Продолжайте следить за своим здоровьем.');
    }

    res.json({
      insights,
      stats: {
        avg_sleep_hours: avgSleep.toFixed(1),
        avg_steps: Math.round(avgSteps),
        avg_mood: avgMood.toFixed(1),
      },
    });
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({ error: 'Failed to get insights' });
  }
});

export default router;

import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

// Get dashboard data
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const userId = decoded.userId;
    const { period = 'week' } = req.query;

    // Calculate date range
    const now = new Date();
    const daysBack = period === 'day' ? 1 : period === 'week' ? 7 : 30;
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    // Get today's stats from different modules
    const today = new Date().toISOString().split('T')[0];
    
    // Movement data
    const { data: movementData } = await supabase
      .from('workouts')
      .select('duration, calories_burned')
      .eq('user_id', userId)
      .gte('created_at', today)
      .single();

    // Sleep data
    const { data: sleepData } = await supabase
      .from('sleep_logs')
      .select('duration_hours, quality_score')
      .eq('user_id', userId)
      .gte('created_at', today)
      .single();

    // Nutrition data
    const { data: nutritionData } = await supabase
      .from('food_diary')
      .select('calories')
      .eq('user_id', userId)
      .gte('created_at', today);

    // Habits data for streaks
    const { data: habitsData } = await supabase
      .from('habit_logs')
      .select('completed, date')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30);

    // Calculate streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    if (habitsData) {
      const today = new Date();
      for (let i = 0; i < habitsData.length; i++) {
        if (habitsData[i].completed) {
          tempStreak++;
          if (i === currentStreak) currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 0;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Get weekly data for charts
    const { data: weeklyMovement } = await supabase
      .from('workouts')
      .select('created_at, duration, calories_burned, steps')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    const { data: weeklySleep } = await supabase
      .from('sleep_logs')
      .select('created_at, duration_hours, quality_score')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    // Process weekly data
    const weeklyData: Record<string, any> = {};
    
    for (let i = 0; i < daysBack; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      weeklyData[dateStr] = {
        date: dateStr,
        steps: 0,
        calories: 0,
        sleep: 0,
        activity: 0,
      };
    }

    weeklyMovement?.forEach((entry: any) => {
      const dateStr = new Date(entry.created_at).toISOString().split('T')[0];
      if (weeklyData[dateStr]) {
        weeklyData[dateStr].steps += entry.steps || 0;
        weeklyData[dateStr].calories += entry.calories_burned || 0;
        weeklyData[dateStr].activity += entry.duration || 0;
      }
    });

    weeklySleep?.forEach((entry: any) => {
      const dateStr = new Date(entry.created_at).toISOString().split('T')[0];
      if (weeklyData[dateStr]) {
        weeklyData[dateStr].sleep = entry.duration_hours || 0;
      }
    });

    // Calculate health score
    const nutritionCalories = nutritionData?.reduce((sum: number, item: any) => sum + (item.calories || 0), 0) || 0;
    
    const healthScore = Math.min(100, Math.round(
      (sleepData?.quality_score || 70) * 0.3 +
      (movementData?.duration ? Math.min(100, (movementData.duration / 30) * 100) : 50) * 0.3 +
      (nutritionCalories > 0 ? 80 : 60) * 0.2 +
      (currentStreak > 0 ? Math.min(100, currentStreak * 10) : 50) * 0.2
    ));

    // Get active modules
    const activeModules: string[] = [];
    if (weeklyMovement && weeklyMovement.length > 0) activeModules.push('movement');
    if (weeklySleep && weeklySleep.length > 0) activeModules.push('sleep');
    if (nutritionData && nutritionData.length > 0) activeModules.push('nutrition');

    // Get recent entries
    const { data: recentEntries } = await supabase
      .from('posts')
      .select('id, content, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    res.json({
      healthScore,
      activeModules,
      todayStats: {
        steps: weeklyData[today]?.steps || 0,
        water: 0, // Would need water tracking table
        sleep: sleepData?.duration_hours || 0,
        calories: nutritionCalories,
      },
      weeklyData: Object.values(weeklyData).reverse(),
      recentEntries: recentEntries || [],
      streaks: {
        current: currentStreak,
        longest: longestStreak,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get module stats
router.get('/module/:moduleId', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { moduleId } = req.params;
    const userId = decoded.userId;

    const tableMap: Record<string, string> = {
      'movement': 'workouts',
      'nutrition': 'food_diary',
      'sleep': 'sleep_logs',
      'psychology': 'mood_entries',
      'medicine': 'medical_documents',
      'habits': 'habit_logs',
    };

    const table = tableMap[moduleId];
    if (!table) {
      return res.status(400).json({ error: 'Invalid module' });
    }

    // Get stats for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Calculate module-specific stats
    let stats: any = {
      total: data?.length || 0,
      thisWeek: data?.filter((d: any) => 
        new Date(d.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length || 0,
    };

    if (moduleId === 'movement' && data) {
      stats.totalDuration = data.reduce((sum: number, d: any) => sum + (d.duration || 0), 0);
      stats.totalCalories = data.reduce((sum: number, d: any) => sum + (d.calories_burned || 0), 0);
    }

    if (moduleId === 'sleep' && data) {
      stats.avgDuration = data.length > 0 
        ? data.reduce((sum: number, d: any) => sum + (d.duration_hours || 0), 0) / data.length 
        : 0;
      stats.avgQuality = data.length > 0
        ? data.reduce((sum: number, d: any) => sum + (d.quality_score || 0), 0) / data.length
        : 0;
    }

    res.json({
      entries: data || [],
      stats,
    });
  } catch (error) {
    console.error('Module stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

// Get user profile
router.get('/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/:userId/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const userId = req.params.userId;
    if (decoded.userId !== userId && decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updates = req.body;

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, profile: data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get health modules data
router.get('/:userId/health/:module', async (req, res) => {
  try {
    const { userId, module } = req.params;
    const { limit = '10' } = req.query;

    const tableMap: Record<string, string> = {
      'medicine': 'medical_documents',
      'movement': 'workouts',
      'nutrition': 'food_diary',
      'psychology': 'mood_entries',
      'sleep': 'sleep_logs',
      'relationships': 'social_activities',
      'habits': 'habits',
    };

    const table = tableMap[module];
    if (!table) {
      return res.status(400).json({ error: 'Invalid module' });
    }

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit as string));

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ data: data || [] });
  } catch (error) {
    console.error('Get health data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create health module entry
router.post('/:userId/health/:module', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { userId, module } = req.params;
    if (decoded.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const tableMap: Record<string, string> = {
      'medicine': 'medical_documents',
      'movement': 'workouts',
      'nutrition': 'food_diary',
      'psychology': 'mood_entries',
      'sleep': 'sleep_logs',
      'relationships': 'social_activities',
      'habits': 'habits',
    };

    const table = tableMap[module];
    if (!table) {
      return res.status(400).json({ error: 'Invalid module' });
    }

    const { data, error } = await supabase
      .from(table)
      .insert({ user_id: userId, ...req.body })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Create health entry error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

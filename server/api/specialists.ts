import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

// Get specialists list
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'rating' } = req.query;

    let query = supabase
      .from('specialists')
      .select(`
        *,
        user:user_profiles!user_id(id, username, full_name, avatar_url, bio, location)
      `)
      .eq('is_verified', true);

    if (category && category !== 'all') {
      query = query.contains('specialization', [category]);
    }

    // Sort
    switch (sort) {
      case 'price_low':
        query = query.order('hourly_rate', { ascending: true });
        break;
      case 'price_high':
        query = query.order('hourly_rate', { ascending: false });
        break;
      case 'experience':
        query = query.order('experience_years', { ascending: false });
        break;
      default:
        query = query.order('rating', { ascending: false });
    }

    const { data: specialists, error } = await query.limit(50);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Format response
    const formattedSpecialists = specialists?.map((s: any) => ({
      id: s.id,
      user_id: s.user_id,
      username: s.user?.username,
      full_name: s.user?.full_name,
      avatar_url: s.user?.avatar_url,
      bio: s.user?.bio,
      specialization: s.specialization || [],
      hourly_rate: s.hourly_rate || 50,
      rating: s.rating || 5.0,
      review_count: s.review_count || 0,
      location: s.user?.location,
      experience_years: s.experience_years || 0,
      is_verified: s.is_verified,
      is_online: s.is_online || false,
    }));

    // Filter by search query
    let filtered = formattedSpecialists || [];
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter((s: any) =>
        s.full_name?.toLowerCase().includes(searchLower) ||
        s.bio?.toLowerCase().includes(searchLower) ||
        s.specialization?.some((spec: string) => spec.toLowerCase().includes(searchLower))
      );
    }

    res.json({ specialists: filtered });
  } catch (error) {
    console.error('Get specialists error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specialist by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const { data: user } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (!user) {
      return res.status(404).json({ error: 'Specialist not found' });
    }

    const { data: specialist, error } = await supabase
      .from('specialists')
      .select(`
        *,
        user:user_profiles!user_id(id, username, full_name, avatar_url, bio, location)
      `)
      .eq('user_id', user.id)
      .single();

    if (error || !specialist) {
      return res.status(404).json({ error: 'Specialist not found' });
    }

    // Get reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select(`
        *,
        user:user_profiles!user_id(full_name, avatar_url)
      `)
      .eq('specialist_id', specialist.id)
      .order('created_at', { ascending: false });

    res.json({
      specialist: {
        id: specialist.id,
        user_id: specialist.user_id,
        username: specialist.user?.username,
        full_name: specialist.user?.full_name,
        avatar_url: specialist.user?.avatar_url,
        bio: specialist.user?.bio,
        specialization: specialist.specialization || [],
        hourly_rate: specialist.hourly_rate || 50,
        rating: specialist.rating || 5.0,
        review_count: specialist.review_count || 0,
        location: specialist.user?.location || 'Онлайн',
        experience_years: specialist.experience_years || 0,
        is_verified: specialist.is_verified,
        education: specialist.education || [],
        certifications: specialist.certifications || [],
        languages: specialist.languages || ['Русский'],
        availability: specialist.availability || [],
      },
      reviews: reviews || [],
    });
  } catch (error) {
    console.error('Get specialist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle favorite
router.post('/:id/favorite', async (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('favorite_specialists')
      .insert({
        user_id: decoded.userId,
        specialist_id: id,
      });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id/favorite', async (req, res) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('favorite_specialists')
      .delete()
      .eq('user_id', decoded.userId)
      .eq('specialist_id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Unfavorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apply to become specialist
router.post('/apply', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const {
      specialization,
      hourly_rate,
      experience_years,
      education,
      certifications,
      bio,
    } = req.body;

    // Create specialist profile
    const { data, error } = await supabase
      .from('specialists')
      .insert({
        user_id: decoded.userId,
        specialization,
        hourly_rate,
        experience_years,
        education,
        certifications,
        is_verified: false,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Update user role
    await supabase
      .from('user_profiles')
      .update({ role: 'specialist' })
      .eq('id', decoded.userId);

    res.status(201).json({ success: true, specialist: data });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

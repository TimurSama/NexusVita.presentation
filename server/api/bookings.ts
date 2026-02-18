import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const {
      specialist_id,
      date,
      time,
      session_type,
      notes,
    } = req.body;

    // Get specialist info
    const { data: specialist } = await supabase
      .from('specialists')
      .select('user_id, hourly_rate')
      .eq('id', specialist_id)
      .single();

    if (!specialist) {
      return res.status(404).json({ error: 'Specialist not found' });
    }

    // Calculate commission (5% platform fee)
    const total_amount = specialist.hourly_rate;
    const platform_fee = total_amount * 0.05;
    const specialist_amount = total_amount - platform_fee;

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        client_id: decoded.userId,
        specialist_id,
        date,
        time,
        session_type,
        notes,
        total_amount,
        platform_fee,
        specialist_amount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create notification for specialist
    await supabase.from('notifications').insert({
      user_id: specialist.user_id,
      type: 'new_booking',
      title: 'Новая запись',
      message: `У вас новая запись на ${date} ${time}`,
      data: { booking_id: booking.id },
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookings
router.get('/my', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        specialist:specialists(
          user:user_profiles!user_id(full_name, avatar_url)
        )
      `)
      .eq('client_id', decoded.userId)
      .order('date', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ bookings: bookings || [] });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specialist bookings
router.get('/specialist', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get specialist ID
    const { data: specialist } = await supabase
      .from('specialists')
      .select('id')
      .eq('user_id', decoded.userId)
      .single();

    if (!specialist) {
      return res.status(404).json({ error: 'Specialist profile not found' });
    }

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        client:user_profiles!client_id(full_name, avatar_url, email)
      `)
      .eq('specialist_id', specialist.id)
      .order('date', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ bookings: bookings || [] });
  } catch (error) {
    console.error('Get specialist bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { id } = req.params;
    const { status } = req.body;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Notify client
    await supabase.from('notifications').insert({
      user_id: booking.client_id,
      type: 'booking_status',
      title: 'Статус записи изменен',
      message: `Ваша запись теперь ${status}`,
      data: { booking_id: id },
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel booking
router.post('/:id/cancel', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { id } = req.params;
    const { reason } = req.body;

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ 
        status: 'cancelled',
        cancellation_reason: reason,
        cancelled_at: new Date().toISOString(),
        cancelled_by: decoded.userId,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Notify other party
    const notifyUserId = decoded.userId === booking.client_id 
      ? booking.specialist_id 
      : booking.client_id;

    await supabase.from('notifications').insert({
      user_id: notifyUserId,
      type: 'booking_cancelled',
      title: 'Запись отменена',
      message: `Запись на ${booking.date} была отменена`,
      data: { booking_id: id },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

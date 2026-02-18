import { Router } from 'express';
import { supabase } from '../supabase/client';

const router = Router();

// Middleware to check if user is center admin
const requireCenterAdmin = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Check if user has center
    const { data: center } = await supabase
      .from('centers')
      .select('id')
      .eq('admin_id', decoded.userId)
      .single();

    if (!center) {
      return res.status(403).json({ error: 'Not a center admin' });
    }

    req.centerId = center.id;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get center dashboard data
router.get('/dashboard', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;

    // Get employee count
    const { count: employeeCount } = await supabase
      .from('center_employees')
      .select('*', { count: 'exact', head: true })
      .eq('center_id', centerId);

    // Get client count
    const { count: clientCount } = await supabase
      .from('center_clients')
      .select('*', { count: 'exact', head: true })
      .eq('center_id', centerId);

    // Get today's appointments
    const today = new Date().toISOString().split('T')[0];
    const { data: todayAppointments } = await supabase
      .from('center_appointments')
      .select('*')
      .eq('center_id', centerId)
      .eq('date', today);

    // Get weekly revenue
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data: weeklyAppointments } = await supabase
      .from('center_appointments')
      .select('price')
      .eq('center_id', centerId)
      .eq('status', 'completed')
      .gte('date', weekAgo.toISOString().split('T')[0]);

    const weeklyRevenue = weeklyAppointments?.reduce((sum, a) => sum + (a.price || 0), 0) || 0;

    res.json({
      stats: {
        totalEmployees: employeeCount || 0,
        totalClients: clientCount || 0,
        todayAppointments: todayAppointments?.length || 0,
        weeklyRevenue,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get center employees
router.get('/employees', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;

    const { data: employees, error } = await supabase
      .from('center_employees')
      .select(`
        *,
        user:user_profiles!user_id(full_name, email, phone, avatar_url)
      `)
      .eq('center_id', centerId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formattedEmployees = employees?.map((e: any) => ({
      id: e.id,
      user_id: e.user_id,
      full_name: e.user?.full_name,
      email: e.user?.email,
      phone: e.user?.phone,
      avatar_url: e.user?.avatar_url,
      specialization: e.specialization || [],
      status: e.status,
      clients_count: e.clients_count || 0,
      rating: e.rating || 5.0,
      join_date: e.created_at,
    }));

    res.json({ employees: formattedEmployees || [] });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add employee
router.post('/employees', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;
    const { email, full_name, specialization, phone } = req.body;

    // Create user if doesn't exist
    let userId: string;
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8),
      });

      if (createError || !newUser.user) {
        return res.status(400).json({ error: 'Failed to create user' });
      }

      userId = newUser.user.id;

      await supabase.from('user_profiles').insert({
        id: userId,
        email,
        full_name,
        phone,
        role: 'specialist',
      });
    }

    // Add to center employees
    const { data, error } = await supabase
      .from('center_employees')
      .insert({
        center_id: centerId,
        user_id: userId,
        specialization: specialization ? [specialization] : [],
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ success: true, employee: data });
  } catch (error) {
    console.error('Add employee error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get center clients
router.get('/clients', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;

    const { data: clients, error } = await supabase
      .from('center_clients')
      .select(`
        *,
        user:user_profiles!user_id(full_name, email, phone, avatar_url)
      `)
      .eq('center_id', centerId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formattedClients = clients?.map((c: any) => ({
      id: c.id,
      full_name: c.user?.full_name,
      email: c.user?.email,
      phone: c.user?.phone,
      avatar_url: c.user?.avatar_url,
      status: c.status,
      last_visit: c.last_visit,
      total_visits: c.total_visits || 0,
      total_spent: c.total_spent || 0,
      assigned_employee: c.assigned_employee_id,
    }));

    res.json({ clients: formattedClients || [] });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add client
router.post('/clients', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;
    const { full_name, email, phone, assigned_employee } = req.body;

    // Create or find user
    let userId: string;
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: newUser, error: createError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8),
      });

      if (createError || !newUser.user) {
        return res.status(400).json({ error: 'Failed to create user' });
      }

      userId = newUser.user.id;

      await supabase.from('user_profiles').insert({
        id: userId,
        email,
        full_name,
        phone,
        role: 'user',
      });
    }

    // Add to center clients
    const { data, error } = await supabase
      .from('center_clients')
      .insert({
        center_id: centerId,
        user_id: userId,
        assigned_employee_id: assigned_employee || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ success: true, client: data });
  } catch (error) {
    console.error('Add client error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get center appointments
router.get('/appointments', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;

    const { data: appointments, error } = await supabase
      .from('center_appointments')
      .select(`
        *,
        client:user_profiles!client_id(full_name),
        employee:center_employees!employee_id(
          user:user_profiles!user_id(full_name)
        )
      `)
      .eq('center_id', centerId)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const formattedAppointments = appointments?.map((a: any) => ({
      id: a.id,
      client_name: a.client?.full_name,
      employee_name: a.employee?.user?.full_name,
      service: a.service,
      date: a.date,
      time: a.time,
      status: a.status,
      price: a.price,
    }));

    res.json({ appointments: formattedAppointments || [] });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create appointment
router.post('/appointments', requireCenterAdmin, async (req: any, res) => {
  try {
    const centerId = req.centerId;
    const { client_id, employee_id, service, date, time, price } = req.body;

    const { data, error } = await supabase
      .from('center_appointments')
      .insert({
        center_id: centerId,
        client_id,
        employee_id,
        service,
        date,
        time,
        price,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ success: true, appointment: data });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

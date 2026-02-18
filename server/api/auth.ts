import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../supabase/client';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
const generateToken = (userId: string, email: string, role: string) => {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register with email/password
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, full_name, ref_code } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password and username are required' });
    }

    // Check if username exists
    const { data: existingUsername } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUsername) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return res.status(400).json({ error: authError?.message || 'Registration failed' });
    }

    const userId = authData.user.id;

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        username,
        full_name: full_name || username,
        email,
        role: 'user',
        subscription_tier: 'free',
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    // Create Unity token balance
    const { error: tokenError } = await supabase
      .from('user_tokens')
      .insert({
        user_id: userId,
        balance: 100, // Welcome bonus
        total_earned: 100,
        total_spent: 0,
      });

    if (tokenError) {
      console.error('Token creation error:', tokenError);
    }

    // Handle referral
    if (ref_code) {
      const { data: referrer } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('referral_code', ref_code)
        .single();

      if (referrer) {
        await supabase.from('referrals').insert({
          referrer_id: referrer.id,
          referred_id: userId,
          status: 'pending',
        });
      }
    }

    // Generate token
    const token = generateToken(userId, email, 'user');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        email,
        username,
        full_name: full_name || username,
        role: 'user',
        subscription_tier: 'free',
        unity_tokens: 100,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userId = authData.user.id;

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Get token balance
    const { data: tokenData } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const token = generateToken(userId, email, profile?.role || 'user');

    res.json({
      success: true,
      token,
      user: {
        id: userId,
        email,
        username: profile?.username,
        full_name: profile?.full_name,
        avatar_url: profile?.avatar_url,
        role: profile?.role || 'user',
        subscription_tier: profile?.subscription_tier || 'free',
        unity_tokens: tokenData?.balance || 0,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
    }

    // Get user info from Google
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!googleRes.ok) {
      return res.status(400).json({ error: 'Invalid Google token' });
    }

    const googleData = await googleRes.json();
    const { email, name, picture, id: googleId } = googleData;

    // Check if user exists
    let { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    let userId: string;

    if (!profile) {
      // Create new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: crypto.randomUUID(), // Random password for OAuth users
      });

      if (authError || !authData.user) {
        return res.status(400).json({ error: 'Failed to create user' });
      }

      userId = authData.user.id;

      // Create profile
      await supabase.from('user_profiles').insert({
        id: userId,
        username: email.split('@')[0],
        full_name: name,
        email,
        avatar_url: picture,
        role: 'user',
        subscription_tier: 'free',
      });

      // Create token balance
      await supabase.from('user_tokens').insert({
        user_id: userId,
        balance: 100,
        total_earned: 100,
        total_spent: 0,
      });
    } else {
      userId = profile.id;
    }

    const token = generateToken(userId, email, profile?.role || 'user');

    res.json({
      success: true,
      token,
      user: {
        id: userId,
        email,
        username: profile?.username,
        full_name: profile?.full_name || name,
        avatar_url: profile?.avatar_url || picture,
        role: profile?.role || 'user',
        subscription_tier: profile?.subscription_tier || 'free',
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', decoded.userId)
      .single();

    const { data: tokenData } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', decoded.userId)
      .single();

    res.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
        ...profile,
        unity_tokens: tokenData?.balance || 0,
      },
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const updates = req.body;

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', decoded.userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, profile: data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;

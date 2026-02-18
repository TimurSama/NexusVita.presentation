import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { supabase, createUserProfile, getUserByEmail } from '../supabase/client';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, first_name, last_name, username, referral_code } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
    // Check if email exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Check username uniqueness
    if (username) {
      const { data: existingUsername } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
      
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Generate referral code for new user
    const userReferralCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    // Handle referral
    let referredBy = null;
    if (referral_code) {
      const { data: referrer } = await supabase
        .from('profiles')
        .select('id')
        .eq('referral_code', referral_code)
        .single();
      
      if (referrer) {
        referredBy = referrer.id;
      }
    }
    
    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError || !authUser.user) {
      return res.status(400).json({ error: authError?.message || 'Failed to create user' });
    }
    
    // Create profile
    await createUserProfile({
      id: authUser.user.id,
      email,
      first_name,
      last_name,
      username: username || email.split('@')[0],
      referral_code: userReferralCode,
      referred_by: referredBy,
    });
    
    // Generate token
    const token = generateToken({
      id: authUser.user.id,
      email,
      role: 'user',
      subscription_tier: 'free',
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: authUser.user.id,
        email,
        first_name,
        last_name,
        username: username || email.split('@')[0],
        role: 'user',
        subscription_tier: 'free',
        referral_code: userReferralCode,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
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
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
    
    if (profileError || !profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    // Update last login
    await supabase
      .from('profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', authData.user.id);
    
    // Generate token
    const token = generateToken({
      id: profile.id,
      email: profile.email,
      role: profile.role,
      subscription_tier: profile.subscription_tier,
    });
    
    res.json({
      token,
      user: {
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        username: profile.username,
        role: profile.role,
        subscription_tier: profile.subscription_tier,
        subscription_status: profile.subscription_status,
        avatar_url: profile.avatar_url,
        referral_code: profile.referral_code,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        wallet:user_wallets(*),
        settings:user_settings(*)
      `)
      .eq('id', req.user!.id)
      .single();
    
    if (error || !profile) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: profile });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Update profile
router.patch('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['first_name', 'last_name', 'username', 'bio', 'avatar_url', 'date_of_birth', 'gender', 'is_profile_public'];
    
    // Filter only allowed fields
    const filteredUpdates: Record<string, any> = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }
    
    // Check username uniqueness if changing
    if (filteredUpdates.username) {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', filteredUpdates.username)
        .neq('id', req.user!.id)
        .single();
      
      if (existing) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(filteredUpdates)
      .eq('id', req.user!.id)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ user: data });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.post('/change-password', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { current_password, new_password } = req.body;
    
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }
    
    if (new_password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }
    
    // Update password in Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Logout
router.post('/logout', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await supabase.auth.signOut();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Google OAuth callback
router.post('/google', async (req, res) => {
  try {
    const { access_token } = req.body;
    
    // Sign in with Google
    const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: access_token,
    });
    
    if (authError || !authData.user) {
      return res.status(400).json({ error: authError?.message || 'Google auth failed' });
    }
    
    // Check if profile exists
    let { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
    
    // Create profile if new user
    if (!profile) {
      const userReferralCode = crypto.randomBytes(4).toString('hex').toUpperCase();
      
      await createUserProfile({
        id: authData.user.id,
        email: authData.user.email!,
        first_name: authData.user.user_metadata?.full_name?.split(' ')[0],
        last_name: authData.user.user_metadata?.full_name?.split(' ').slice(1).join(' '),
        username: authData.user.email!.split('@')[0],
        avatar_url: authData.user.user_metadata?.avatar_url,
        referral_code: userReferralCode,
      });
      
      profile = await getUserByEmail(authData.user.email!);
    }
    
    // Generate token
    const token = generateToken({
      id: profile!.id,
      email: profile!.email,
      role: profile!.role,
      subscription_tier: profile!.subscription_tier,
    });
    
    res.json({
      token,
      user: profile,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

export default router;

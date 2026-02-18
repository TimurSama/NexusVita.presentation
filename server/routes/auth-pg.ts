import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../database-postgres';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    // Check if email exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await query(
      `INSERT INTO users (email, password_hash, name, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING id, email, name`,
      [email, passwordHash, name]
    );
    
    const user = result[0];
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: 'user',
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
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
    
    // Find user
    const users = await query(
      'SELECT id, email, name, password_hash FROM users WHERE email = $1',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    await query(
      'UPDATE users SET last_login_at = NOW() WHERE id = $1',
      [user.id]
    );
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: 'user',
    });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
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
    const users = await query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.user!.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Telegram auth (create or get user)
router.post('/telegram', async (req, res) => {
  try {
    const { telegram_id, telegram_username, first_name, last_name } = req.body;
    
    // Check if user exists by telegram_id
    let users = await query(
      'SELECT id, email, name FROM users WHERE telegram_id = $1',
      [telegram_id]
    );
    
    let user;
    
    if (users.length === 0) {
      // Create new user
      const name = `${first_name || ''} ${last_name || ''}`.trim() || telegram_username || 'User';
      const email = `tg_${telegram_id}@ethoslife.local`;
      const passwordHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
      
      const result = await query(
        `INSERT INTO users (email, password_hash, name, telegram_id, telegram_username, created_at) 
         VALUES ($1, $2, $3, $4, $5, NOW()) 
         RETURNING id, email, name`,
        [email, passwordHash, name, telegram_id, telegram_username]
      );
      
      user = result[0];
    } else {
      user = users[0];
    }
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: 'user',
    });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Telegram auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;

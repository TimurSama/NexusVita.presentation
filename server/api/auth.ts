import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { userDb, profileDb } from './database';

const router = Router();

// Register with email/password
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }

    // Check if user exists
    const existing = userDb.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const result = userDb.create({
      email,
      password_hash,
      name,
    });

    const user = userDb.findById(Number(result.lastInsertRowid));

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        telegram_connected: !!user.telegram_id,
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

    const user = userDb.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        telegram_connected: !!user.telegram_id,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register/Login with Telegram
router.post('/telegram-auth', async (req, res) => {
  try {
    const { telegram_id, telegram_username, first_name, last_name } = req.body;

    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID is required' });
    }

    // Check if user exists
    let user = userDb.findByTelegramId(telegram_id.toString());

    if (!user) {
      // Create new user
      const result = userDb.create({
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        telegram_id: telegram_id.toString(),
        telegram_username: telegram_username || undefined,
      });
      user = userDb.findById(Number(result.lastInsertRowid));
    } else {
      // Update Telegram connection if needed
      if (!user.telegram_id) {
        userDb.connectTelegram(user.id, telegram_id.toString(), telegram_username);
        user = userDb.findById(user.id);
      }
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        telegram_connected: !!user.telegram_id,
      },
    });
  } catch (error) {
    console.error('Telegram auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect Telegram to existing account
router.post('/connect-telegram', async (req, res) => {
  try {
    const { user_id, telegram_id, telegram_username } = req.body;

    if (!user_id || !telegram_id) {
      return res.status(400).json({ error: 'User ID and Telegram ID are required' });
    }

    // Check if Telegram ID is already used
    const existing = userDb.findByTelegramId(telegram_id.toString());
    if (existing && existing.id !== user_id) {
      return res.status(400).json({ error: 'This Telegram account is already connected to another user' });
    }

    userDb.connectTelegram(user_id, telegram_id.toString(), telegram_username);

    res.json({ success: true });
  } catch (error) {
    console.error('Connect Telegram error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

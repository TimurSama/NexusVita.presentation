import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userDb, initDatabase } from '../lib/database.js';
import { verifyTelegramInitData } from '../lib/telegram-verification.js';

// Initialize database on first import
let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Telegram auth called:', {
    method: req.method,
    body: req.body,
  });

  // Initialize database
  try {
    await ensureDatabase();
    console.log('Database initialized for auth');
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ error: 'Database initialization failed', details: String(error) });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { telegram_id, telegram_username, first_name, last_name, init_data } = req.body;
    console.log('Auth request:', { telegram_id, telegram_username, first_name, last_name });

    // Верификация init_data (если предоставлен)
    if (init_data) {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      if (!botToken) {
        console.warn('TELEGRAM_BOT_TOKEN not set, skipping verification');
      } else {
        const verification = verifyTelegramInitData(init_data, botToken);
        if (!verification.valid) {
          console.error('Telegram verification failed:', verification.error);
          return res.status(401).json({ 
            error: 'Telegram verification failed', 
            details: verification.error 
          });
        }
        // Используем проверенные данные пользователя
        if (verification.user) {
          console.log('Verified user:', verification.user);
        }
      }
    }

    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID is required' });
    }

    // Check if user exists
    let user = await userDb.findByTelegramId(telegram_id.toString());

    if (!user) {
      // Create new user
      const result = await userDb.create({
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        telegram_id: telegram_id.toString(),
        telegram_username: telegram_username || undefined,
      });
      user = await userDb.findById(Number(result.lastInsertRowid || result.id));
    } else {
      // Update Telegram connection if needed
      if (!user.telegram_id) {
        await userDb.connectTelegram(user.id, telegram_id.toString(), telegram_username);
        user = await userDb.findById(user.id);
      }
    }

    console.log('Auth successful:', { userId: user.id, name: user.name });
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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    res.status(500).json({ 
      error: 'Internal server error',
      details: String(error),
    });
  }
}

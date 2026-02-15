import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userDb } from '../../server/database-adapter';
import { initDatabase } from '../../server/database-adapter';

// Initialize database on first import
let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize database
  await ensureDatabase();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { telegram_id, telegram_username, first_name, last_name } = req.body;

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
}

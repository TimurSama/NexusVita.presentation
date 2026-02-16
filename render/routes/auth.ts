import type { Request, Response } from 'express';
import { userDb, profileDb, initDatabase } from '../../api/lib/database.js';

export async function telegramAuthHandler(req: Request, res: Response) {
  try {
    const { telegram_id, telegram_username, first_name, last_name, init_data } = req.body;

    if (!telegram_id) {
      return res.status(400).json({ error: 'telegram_id is required' });
    }

    // Find or create user
    let user = await userDb.findByTelegramId(telegram_id.toString());

    if (!user) {
      const result = await userDb.create({
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        telegram_id: telegram_id.toString(),
        telegram_username: telegram_username || undefined,
      });
      user = await userDb.findById(Number(result.lastInsertRowid || result.id));
    } else {
      // Update connection time
      await userDb.connectTelegram(user.id, telegram_id.toString(), telegram_username);
    }

    // Get or create profile
    let profile = await profileDb.findByUserId(user.id);
    if (!profile) {
      await profileDb.createOrUpdate(user.id, {});
      profile = await profileDb.findByUserId(user.id);
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        telegram_connected: true,
        telegram_username: user.telegram_username,
      },
      profile: profile || null,
    });
  } catch (error) {
    console.error('Telegram auth error:', error);
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initDatabase } from '../lib/database';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test database connection
    await initDatabase();
    
    res.json({
      success: true,
      message: 'Telegram bot webhook is working',
      timestamp: new Date().toISOString(),
      env: {
        hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
        hasDatabase: !!process.env.DATABASE_URL,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}

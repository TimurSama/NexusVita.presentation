import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initDatabase } from '../lib/database.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test database connection if requested
    const testDb = req.query.test === 'true';
    let dbStatus = 'not tested';
    
    if (testDb) {
      try {
        await initDatabase();
        dbStatus = 'connected';
      } catch (error) {
        dbStatus = `error: ${String(error)}`;
      }
    }

    const info = {
      success: true,
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_URL: process.env.VERCEL_URL,
        VERCEL_ENV: process.env.VERCEL_ENV,
      },
      bot: {
        tokenSet: !!process.env.TELEGRAM_BOT_TOKEN,
        tokenLength: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
        tokenPreview: process.env.TELEGRAM_BOT_TOKEN ? 
          `${process.env.TELEGRAM_BOT_TOKEN.substring(0, 10)}...${process.env.TELEGRAM_BOT_TOKEN.substring(process.env.TELEGRAM_BOT_TOKEN.length - 5)}` : 
          'NOT SET',
      },
      database: {
        urlSet: !!process.env.DATABASE_URL,
        postgresUrlSet: !!process.env.POSTGRES_URL,
        status: dbStatus,
      },
      endpoints: {
        webhook: 'https://etholife.vercel.app/api/telegram/webhook',
        webhookInfo: 'https://etholife.vercel.app/api/telegram/webhook-info',
        debug: 'https://etholife.vercel.app/api/telegram/debug',
        debugWithDbTest: 'https://etholife.vercel.app/api/telegram/debug?test=true',
      },
    };

    res.json(info);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}

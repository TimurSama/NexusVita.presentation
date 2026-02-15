import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const info = {
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
    },
    endpoints: {
      webhook: 'https://etholife.vercel.app/api/telegram/webhook',
      webhookInfo: 'https://etholife.vercel.app/api/telegram/webhook-info',
      test: 'https://etholife.vercel.app/api/telegram/test',
    },
  };

  res.json(info);
}

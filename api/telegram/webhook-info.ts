import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not set' });
  }

  try {
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    const webhookInfo = await bot.telegram.getWebhookInfo();
    
    res.json({
      success: true,
      webhookInfo,
      botInfo: await bot.telegram.getMe(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get webhook info',
      details: String(error),
    });
  }
}

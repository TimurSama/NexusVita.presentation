import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ 
      error: 'TELEGRAM_BOT_TOKEN not set',
      hint: 'Please add TELEGRAM_BOT_TOKEN to Vercel Environment Variables'
    });
  }

  try {
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    const webhookInfo = await bot.telegram.getWebhookInfo();
    const botInfo = await bot.telegram.getMe();
    
    res.json({
      success: true,
      webhookInfo: {
        url: webhookInfo.url,
        has_custom_certificate: webhookInfo.has_custom_certificate,
        pending_update_count: webhookInfo.pending_update_count,
        last_error_date: webhookInfo.last_error_date,
        last_error_message: webhookInfo.last_error_message,
        max_connections: webhookInfo.max_connections,
        allowed_updates: webhookInfo.allowed_updates,
      },
      botInfo: {
        id: botInfo.id,
        is_bot: botInfo.is_bot,
        first_name: botInfo.first_name,
        username: botInfo.username,
      },
      tokenSet: !!TELEGRAM_BOT_TOKEN,
      expectedWebhookUrl: `https://etholife.vercel.app/api/telegram/webhook`,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get webhook info',
      details: String(error),
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

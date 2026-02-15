import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8261481826:AAH_M6WXWkRwoskYmCpbLupSi7o_bB8VsJQ';
const WEBHOOK_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/telegram/webhook`
  : 'https://etholife.vercel.app/api/telegram/webhook';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ 
      error: 'TELEGRAM_BOT_TOKEN not set',
      hint: 'Please add TELEGRAM_BOT_TOKEN to Vercel Environment Variables'
    });
  }

  try {
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    
    // Set webhook
    const setWebhookResult = await bot.telegram.setWebhook(WEBHOOK_URL);
    
    // Get webhook info to verify
    const webhookInfo = await bot.telegram.getWebhookInfo();
    const botInfo = await bot.telegram.getMe();
    
    res.json({
      success: true,
      message: 'Webhook set successfully',
      webhookUrl: WEBHOOK_URL,
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
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
    res.status(500).json({
      error: 'Failed to set webhook',
      details: String(error),
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

import type { Request, Response } from 'express';
import { Telegraf } from 'telegraf';
import { initDatabase } from '../../api/lib/database.js';
import { setupBotHandlers, initializeBot } from '../../api/telegram/webhook.js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Bot instance (shared across requests)
// Note: On Render, bot runs via polling in server/telegram-bot.ts
// This webhook handler is for optional webhook mode
let bot: Telegraf | null = null;

// Initialize bot once for webhook mode
function getBot(): Telegraf | null {
  if (!TELEGRAM_BOT_TOKEN) {
    return null;
  }
  
  if (!bot) {
    bot = initializeBot();
    if (bot) {
      setupBotHandlers(bot);
    }
  }
  
  return bot;
}

export async function telegramWebhookHandler(req: Request, res: Response) {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`=== WEBHOOK CALLED [${requestId}] ===`, new Date().toISOString());
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    
    if (!update) {
      return res.status(400).json({ error: 'No update in body' });
    }

    console.log(`[${requestId}] 📨 Processing update:`, {
      update_id: update?.update_id,
      message: update?.message ? {
        message_id: update.message.message_id,
        text: update.message.text,
        from_id: update.message.from?.id,
      } : null,
    });
    
    // Get bot instance
    const botInstance = getBot();
    if (!botInstance) {
      console.error(`[${requestId}] ❌ Bot not initialized`);
      return res.status(500).json({ error: 'Bot not initialized' });
    }
    
    // CRITICAL: Telegram requires response within 200ms
    // Send response immediately, then process update asynchronously
    res.status(200).json({ ok: true });
    
    // Process update asynchronously
    const processStartTime = Date.now();
    console.log(`[${requestId}] 🚀 Starting async update processing...`);
    
    try {
      await botInstance.handleUpdate(update);
      const processTime = Date.now() - processStartTime;
      console.log(`[${requestId}] ✅ Update processed successfully in ${processTime}ms`);
    } catch (error) {
      const processTime = Date.now() - processStartTime;
      console.error(`[${requestId}] ❌ Error processing update after ${processTime}ms:`, error);
      
      // Try to send error message to user
      if (update?.message?.from?.id && botInstance) {
        try {
          await botInstance.telegram.sendMessage(
            update.message.from.id,
            'Произошла ошибка при обработке вашего сообщения. Пожалуйста, попробуйте позже.'
          );
        } catch (sendError) {
          console.error(`[${requestId}] ❌ Failed to send error message:`, sendError);
        }
      }
    }
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(200).json({ ok: false, error: String(error) });
  }
}

export async function telegramWebhookInfoHandler(req: Request, res: Response) {
  if (!TELEGRAM_BOT_TOKEN) {
    return res.status(500).json({ 
      error: 'TELEGRAM_BOT_TOKEN not set',
      hint: 'Please add TELEGRAM_BOT_TOKEN to Environment Variables'
    });
  }

  try {
    const botInstance = new Telegraf(TELEGRAM_BOT_TOKEN);
    const webhookInfo = await botInstance.telegram.getWebhookInfo();
    const botInfo = await botInstance.telegram.getMe();
    
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
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get webhook info',
      details: String(error),
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function telegramDebugHandler(req: Request, res: Response) {
  try {
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
        RENDER: process.env.RENDER,
        PORT: process.env.PORT,
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

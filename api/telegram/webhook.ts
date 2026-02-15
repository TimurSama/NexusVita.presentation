import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf, Context } from 'telegraf';
import { userDb, profileDb, dailyPlanDb, healthMetricsDb, goalsDb, telegramBotSettingsDb, telegramBotLogsDb, initDatabase } from '../lib/database.js';

// Initialize database on first import
let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN not set! Bot will not work.');
  console.error('Please add TELEGRAM_BOT_TOKEN to Vercel Environment Variables');
}

let bot: Telegraf | null = null;

// Function to initialize bot
function initializeBot(): Telegraf | null {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('❌ Cannot initialize bot - no token');
    return null;
  }

  if (bot) {
    return bot; // Reuse existing bot instance
  }

  console.log('✅ Initializing bot with token:', TELEGRAM_BOT_TOKEN.substring(0, 10) + '...');
  try {
    bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    console.log('✅ Bot initialized successfully');
    setupBotHandlers(bot);
    return bot;
  } catch (error) {
    console.error('❌ Failed to initialize bot:', error);
    return null;
  }
}

// Setup bot handlers (extracted to separate function for re-initialization)
function setupBotHandlers(bot: Telegraf) {
  console.log('🔧 Setting up bot handlers...');

  // Start command
  bot.start(async (ctx: Context) => {
    const telegramId = ctx.from?.id.toString();
    console.log('🚀 /start command handler called for:', telegramId);
    console.log('Context:', {
      from: ctx.from,
      chat: ctx.chat,
      message: ctx.message?.text,
    });
    
    if (!telegramId) {
      console.error('❌ No telegram ID in context');
      await ctx.reply('Ошибка: не удалось определить ваш Telegram ID');
      return;
    }

    try {
      console.log('📝 Processing /start for user:', telegramId);
      // Check if user exists
      let user = await userDb.findByTelegramId(telegramId);
      const isNewUser = !user;

      if (!user) {
        // Create new user
        const result = await userDb.create({
          name: ctx.from.first_name + (ctx.from.last_name ? ` ${ctx.from.last_name}` : ''),
          telegram_id: telegramId,
          telegram_username: ctx.from.username || undefined,
        });
        user = await userDb.findById(Number(result.lastInsertRowid || result.id));
        
        // Initialize bot settings
        await telegramBotSettingsDb.createOrUpdate(Number(result.lastInsertRowid || result.id), {
          notifications_enabled: true,
          reminders_enabled: true,
          metric_tracking_enabled: true,
        });

        // If this is Maria, try to initialize her full profile (async, non-blocking)
        if (telegramId === '403161451') {
          // Initialize Maria profile in background (don't wait)
          import('../admin/init-maria').then(({ default: initMaria }) => {
            const initReq = { method: 'POST', body: {} } as any;
            const initRes = {
              json: (data: any) => console.log('Maria init result:', data),
              status: (code: number) => ({ json: (data: any) => console.log('Maria init status:', code, data) }),
            } as any;
            return initMaria(initReq, initRes);
          }).catch((error) => {
            console.error('Error initializing Maria profile:', error);
          });
        }
      }

      console.log('👤 User found/created:', { userId: user.id, isNewUser, telegramId });

      // Special greetings for specific users
      if (telegramId === '403161451' && isNewUser) {
        console.log('💚 Sending Maria first-time greeting');
        // Maria's first time greeting
        await ctx.reply(
          `Привет Марьяша! 👋\n\n` +
          `Это твой личный центр здоровья и ежедневных привычек 💚\n\n` +
          `И, кстати, Тимур тебя очень сильно любит и поздравляет с 14 февраля! 💕\n` +
          `(Хоть и с опозданием, не держи на него зла 😅)\n\n` +
          `Здесь ты сможешь:\n` +
          `• Получать напоминания о разминках\n` +
          `• Отмечать выполненные упражнения\n` +
          `• Вносить метрики здоровья\n` +
          `• Следить за планом на день\n` +
          `• Получать персональные рекомендации\n\n` +
          `Используйте /menu для быстрого доступа к функциям.`
        );
      } else if (telegramId === '403161451') {
        console.log('💚 Sending Maria returning greeting');
        // Maria's returning greeting
        await ctx.reply(
          `С возвращением, Марьяша! 👋\n\n` +
          `Твой центр здоровья готов помочь тебе сегодня.\n\n` +
          `Используйте /menu для быстрого доступа.`
        );
      } else if (telegramId === '8530599793' && isNewUser) {
        // Personal greeting for backup account
        await ctx.reply(
          `Привет! 👋\n\n` +
          `Добро пожаловать в твой личный центр здоровья и ежедневных привычек 💚\n\n` +
          `Это твой персональный аккаунт для тестирования всех возможностей платформы!\n\n` +
          `Здесь ты сможешь:\n` +
          `• Получать напоминания о разминках\n` +
          `• Отмечать выполненные упражнения\n` +
          `• Вносить метрики здоровья\n` +
          `• Следить за планом на день\n` +
          `• Получать персональные рекомендации\n` +
          `• Тестировать все функции платформы\n\n` +
          `Используйте /menu для быстрого доступа к функциям.`
        );
      } else if (telegramId === '8530599793') {
        // Backup account returning greeting
        await ctx.reply(
          `С возвращением! 👋\n\n` +
          `Твой центр здоровья готов помочь тебе сегодня.\n\n` +
          `Используйте /menu для быстрого доступа.`
        );
      } else if (telegramId === '7694835964' && isNewUser) {
        // Tixy's first time greeting
        await ctx.reply(
          `Привет, Tixy! 👋\n\n` +
          `Добро пожаловать в EthosLife! 💚\n\n` +
          `Это твой персональный центр здоровья и ежедневных привычек.\n\n` +
          `Здесь ты сможешь:\n` +
          `• Получать напоминания о планах\n` +
          `• Отмечать выполненные задачи\n` +
          `• Вносить метрики здоровья\n` +
          `• Получать рекомендации\n\n` +
          `Используйте /menu для быстрого доступа к функциям.`
        );
      } else if (telegramId === '7694835964') {
        // Tixy's returning greeting
        await ctx.reply(
          `С возвращением, Tixy! 👋\n\n` +
          `Твой центр здоровья готов помочь тебе сегодня.\n\n` +
          `Используйте /menu для быстрого доступа.`
        );
      } else if (isNewUser) {
        await ctx.reply(
          `Добро пожаловать в EthosLife, ${ctx.from.first_name}! 👋\n\n` +
          `Это твой центр здоровья, как экосистемной привычки и детальной аналитики 💚\n\n` +
          `Ваш аккаунт создан. Теперь вы можете:\n` +
          `• Получать напоминания о планах\n` +
          `• Отмечать выполненные задачи\n` +
          `• Вносить метрики здоровья\n` +
          `• Получать рекомендации\n\n` +
          `Используйте /menu для быстрого доступа к функциям.`
        );
      } else {
        await ctx.reply(
          `С возвращением, ${ctx.from.first_name}! 👋\n\n` +
          `Используйте /menu для быстрого доступа.`
        );
      }
    } catch (error) {
      console.error('❌ Error in /start command:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      try {
        await ctx.reply('Произошла ошибка при обработке команды. Пожалуйста, попробуйте позже.');
      } catch (replyError) {
        console.error('Failed to send error reply:', replyError);
      }
    }
  });

  // Handle unknown commands - use hears for text messages
  bot.hears(/^\//, async (ctx: Context) => {
    const text = ctx.message?.text;
    if (!text) return;
    
    // Skip if it's a known command (they're handled by bot.command handlers)
    if (text.startsWith('/start') || 
        text.startsWith('/menu') || 
        text.startsWith('/help') || 
        text.startsWith('/today') ||
        text.startsWith('/settings') ||
        text.startsWith('/metrics') ||
        text.startsWith('/goals')) {
      return; // Let command handlers process it
    }
    
    console.log('❓ Unknown command:', text);
    await ctx.reply(
      `Неизвестная команда. Используйте /menu для просмотра доступных команд или /help для справки.`
    );
  });

  // Menu command
  bot.command('menu', async (ctx: Context) => {
    try {
      await ctx.reply(
        `📋 Меню быстрого доступа:\n\n` +
        `• /start - Начать работу\n` +
        `• /today - План на сегодня\n` +
        `• /metrics - Внести метрики\n` +
        `• /goals - Мои цели\n` +
        `• /settings - Настройки\n` +
        `• /help - Справка\n\n` +
        `💡 Используйте команды для быстрого доступа к функциям.`
      );
    } catch (error) {
      console.error('Error in /menu command:', error);
      await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
  });

  // Help command
  bot.help(async (ctx: Context) => {
    await ctx.reply(
      `📋 Доступные команды:\n\n` +
      `• /start - Начать работу с ботом\n` +
      `• /menu - Меню быстрого доступа\n` +
      `• /help - Показать эту справку\n` +
      `• /settings - Настройки уведомлений\n` +
      `• /today - План на сегодня\n` +
      `• /metrics - Внести метрики\n` +
      `• /goals - Мои цели\n` +
      `• /complete <номер> - Отметить задачу выполненной\n` +
      `• /note <текст> - Добавить заметку\n\n` +
      `💡 Вы также можете использовать кнопки меню для быстрого доступа.`
    );
  });

  // Today command
  bot.command('today', async (ctx: Context) => {
    try {
      const telegramId = ctx.from?.id.toString();
      if (!telegramId) return;

      const user = await userDb.findByTelegramId(telegramId);
      if (!user) {
        await ctx.reply('Сначала используйте /start для создания аккаунта.');
        return;
      }

      const today = new Date();
      const plans = await dailyPlanDb.findByUserIdAndDate(user.id, today);

      if (plans.length === 0) {
        await ctx.reply('На сегодня планов нет. Используйте /start для начала работы.');
        return;
      }

      let message = `📅 План на сегодня (${today.toLocaleDateString('ru-RU')}):\n\n`;
      plans.forEach((plan, index) => {
        const status = plan.completed ? '✅' : '⏳';
        message += `${status} ${plan.time || ''} - ${plan.title}\n`;
        if (plan.description) {
          message += `   ${plan.description}\n`;
        }
        message += '\n';
      });

      await ctx.reply(message);
    } catch (error) {
      console.error('Error in /today command:', error);
      await ctx.reply('Произошла ошибка при получении плана. Пожалуйста, попробуйте позже.');
    }
  });

  // Error handling
  bot.catch((err, ctx) => {
    console.error('Telegram bot error:', err);
    console.error('Error context:', {
      update_id: ctx.update?.update_id,
      message_id: ctx.message?.message_id,
      from_id: ctx.from?.id,
    });
    try {
      ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.').catch((replyError) => {
        console.error('Failed to send error reply:', replyError);
      });
    } catch (replyError) {
      console.error('Error in catch handler:', replyError);
    }
  });
  
  console.log('✅ Bot handlers setup complete');
}

// Initialize bot on module load
if (TELEGRAM_BOT_TOKEN) {
  initializeBot();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log immediately to see if webhook is called at all
  const requestId = Math.random().toString(36).substring(7);
  console.log(`=== WEBHOOK CALLED [${requestId}] ===`, new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Bot initialized:', !!bot);
  console.log('Token set:', !!TELEGRAM_BOT_TOKEN);
  console.log('Token length:', TELEGRAM_BOT_TOKEN?.length || 0);
  
  // Log body (but truncate for security)
  const bodyStr = JSON.stringify(req.body);
  console.log('Body preview:', bodyStr.substring(0, 200));

  // Initialize database
  try {
    await ensureDatabase();
    console.log(`[${requestId}] Database initialized`);
  } catch (error) {
    console.error(`[${requestId}] Database initialization error:`, error);
    return res.status(500).json({ error: 'Database initialization failed', details: String(error) });
  }

  // Ensure bot is initialized (re-initialize if needed)
  if (!bot) {
    console.log(`[${requestId}] Bot not initialized, initializing now...`);
    bot = initializeBot();
  }

  if (!bot) {
    console.error(`[${requestId}] ❌ Bot not initialized after attempt!`);
    console.error('Token exists:', !!TELEGRAM_BOT_TOKEN);
    return res.status(500).json({ error: 'Bot not initialized' });
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    
    if (!update) {
      console.error('❌ No update in body');
      return res.status(400).json({ error: 'No update in body' });
    }

    console.log(`[${requestId}] 📨 Processing update:`, {
      update_id: update?.update_id,
      message: update?.message ? {
        message_id: update.message.message_id,
        text: update.message.text,
        from_id: update.message.from?.id,
        from_username: update.message.from?.username,
        chat_id: update.message.chat?.id,
      } : null,
      callback_query: update?.callback_query ? {
        data: update.callback_query.data,
        from_id: update.callback_query.from?.id,
      } : null,
    });
    
    // CRITICAL: Telegram requires response within 200ms
    // Send response immediately, then process update asynchronously
    res.status(200).json({ ok: true });
    
    // Ensure bot is still valid before processing
    if (!bot) {
      console.error(`[${requestId}] ❌ Bot became null, re-initializing...`);
      bot = initializeBot();
      if (!bot) {
        console.error(`[${requestId}] ❌ Failed to re-initialize bot!`);
        return; // Already sent response, just log error
      }
    }
    
    // Process update asynchronously (don't await - Telegram already got response)
    const processStartTime = Date.now();
    console.log(`[${requestId}] 🚀 Starting async update processing...`);
    console.log(`[${requestId}] Bot instance:`, {
      has_handleUpdate: typeof bot.handleUpdate === 'function',
      bot_constructor: bot.constructor.name,
    });
    
    // Wrap in try-catch to catch any synchronous errors
    try {
      const handlePromise = bot.handleUpdate(update);
      console.log(`[${requestId}] handleUpdate called, promise created`);
      
      handlePromise.then(() => {
        const processTime = Date.now() - processStartTime;
        console.log(`[${requestId}] ✅ Update processed successfully in ${processTime}ms`);
      }).catch((error) => {
      const processTime = Date.now() - processStartTime;
      console.error(`[${requestId}] ❌ Error processing update after ${processTime}ms:`, error);
      console.error(`[${requestId}] Error details:`, {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        update_id: update?.update_id,
        error_name: error?.constructor?.name,
      });
      
      // Try to re-initialize bot if error suggests it's broken
      if (error instanceof Error && (
        error.message.includes('ECONNRESET') ||
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('socket hang up') ||
        error.message.includes('Bot token') ||
        error.message.includes('Unauthorized')
      )) {
        console.log(`[${requestId}] 🔄 Connection/auth error detected, re-initializing bot...`);
        bot = null; // Force re-initialization
        bot = initializeBot();
      }
      
      // Try to send error message to user
      if (update?.message?.from?.id) {
        const userId = update.message.from.id;
        console.log(`[${requestId}] 📤 Attempting to send error message to user ${userId}...`);
        if (bot) {
          bot.telegram.sendMessage(
            userId,
            'Произошла ошибка при обработке вашего сообщения. Пожалуйста, попробуйте позже.'
          ).then(() => {
            console.log(`[${requestId}] ✅ Error message sent to user ${userId}`);
          }).catch((sendError) => {
            console.error(`[${requestId}] ❌ Failed to send error message to user ${userId}:`, sendError);
          });
        } else {
          console.error(`[${requestId}] ❌ Cannot send error message - bot is null`);
        }
      }
    });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Always return 200 to Telegram to avoid retries
    res.status(200).json({ ok: false, error: String(error) });
  }
}

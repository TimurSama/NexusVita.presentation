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

if (TELEGRAM_BOT_TOKEN) {
  console.log('✅ Initializing bot with token:', TELEGRAM_BOT_TOKEN.substring(0, 10) + '...');
  try {
    bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    console.log('✅ Bot initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize bot:', error);
  }
} else {
  console.error('❌ Cannot initialize bot - no token');
}

  // Start command
  bot.start(async (ctx: Context) => {
    const telegramId = ctx.from?.id.toString();
    console.log('🚀 /start command received from:', telegramId);
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

  // Handle unknown commands
  bot.on('text', async (ctx: Context) => {
    const text = ctx.message?.text;
    if (!text) return;
    
    console.log('📩 Text message received:', {
      text,
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    
    // Handle unknown commands (only if not handled by other handlers)
    if (text.startsWith('/') && 
        !text.startsWith('/start') && 
        !text.startsWith('/menu') && 
        !text.startsWith('/help') && 
        !text.startsWith('/today') &&
        !text.startsWith('/settings') &&
        !text.startsWith('/metrics') &&
        !text.startsWith('/goals')) {
      console.log('❓ Unknown command:', text);
      await ctx.reply(
        `Неизвестная команда. Используйте /menu для просмотра доступных команд или /help для справки.`
      );
    }
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
    ctx.reply('Произошла ошибка. Пожалуйста, попробуйте позже.');
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log immediately to see if webhook is called at all
  console.log('=== WEBHOOK CALLED ===', new Date().toISOString());
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
    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ error: 'Database initialization failed', details: String(error) });
  }

  if (!bot) {
    console.error('❌ Bot not initialized!');
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

    console.log('📨 Processing update:', {
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
    
    // Handle update with timeout
    const updatePromise = bot.handleUpdate(update);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Update handling timeout')), 25000)
    );
    
    await Promise.race([updatePromise, timeoutPromise]);
    console.log('✅ Update processed successfully');
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Try to send error response to user if possible
    try {
      if (req.body?.message?.from?.id && bot) {
        await bot.telegram.sendMessage(
          req.body.message.from.id,
          'Произошла ошибка при обработке вашего сообщения. Пожалуйста, попробуйте позже.'
        );
      }
    } catch (sendError) {
      console.error('Failed to send error message to user:', sendError);
    }
    
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}

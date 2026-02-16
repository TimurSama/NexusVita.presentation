import { userDb, telegramBotSettingsDb, dailyPlanDb } from './database-adapter';

// Note: This system is optimized for Render free tier:
// - Checks every 30 minutes instead of every minute
// - Sends reminders to all users with Telegram connected
// - Works better on serverless/limited resources
// Render free tier allows long-running processes, unlike Vercel

// Import bot after it's initialized
let bot: any = null;

export function setBot(telegramBot: any) {
  bot = telegramBot;
}

// Different exercise descriptions for reminders
const exerciseReminders = [
  {
    title: 'Разминка для спины',
    description: 'Встаньте, положите руки на пояс. Медленно наклоняйтесь влево и вправо по 5 раз в каждую сторону. Это поможет снять напряжение с боковых мышц спины.',
  },
  {
    title: 'Растяжка поясницы',
    description: 'Сядьте на стул, выпрямите спину. Наклонитесь вперед, стараясь достать руками до пола. Задержитесь на 10 секунд, медленно вернитесь. Повторите 3 раза.',
  },
  {
    title: 'Вращения тазом',
    description: 'Встаньте, руки на пояс. Медленно вращайте тазом по кругу: 5 раз по часовой стрелке, затем 5 раз против. Это улучшит подвижность поясничного отдела.',
  },
  {
    title: 'Растяжка ягодиц',
    description: 'Сядьте на стул, положите одну ногу на колено другой. Наклонитесь вперед, чувствуя растяжение в ягодице. Держите 15 секунд, поменяйте ногу.',
  },
  {
    title: 'Сведение лопаток',
    description: 'Сядьте прямо, сведите лопатки вместе, как будто пытаетесь зажать между ними карандаш. Держите 5 секунд, расслабьтесь. Повторите 10 раз.',
  },
  {
    title: 'Наклоны головы',
    description: 'Медленно наклоните голову вправо, задержитесь на 5 секунд. Вернитесь в центр. Наклоните влево, задержитесь. Повторите по 3 раза в каждую сторону.',
  },
  {
    title: 'Вытяжение позвоночника',
    description: 'Встаньте, поднимите руки вверх, потянитесь как можно выше. Задержитесь на 5 секунд. Опустите руки, расслабьтесь. Повторите 5 раз.',
  },
  {
    title: 'Повороты корпуса',
    description: 'Сядьте прямо, руки на коленях. Медленно поверните корпус вправо, задержитесь на 5 секунд. Вернитесь, поверните влево. По 5 раз в каждую сторону.',
  },
  {
    title: 'Массаж поясницы',
    description: 'Встаньте, положите ладони на поясницу. Круговыми движениями массируйте поясницу 30 секунд. Это улучшит кровообращение и снимет напряжение.',
  },
  {
    title: 'Растяжка подколенных сухожилий',
    description: 'Сядьте на край стула, выпрямите одну ногу вперед. Наклонитесь к ноге, чувствуя растяжение. Держите 15 секунд, поменяйте ногу.',
  },
  {
    title: 'Дыхательная гимнастика',
    description: 'Сядьте прямо, сделайте глубокий вдох через нос (4 секунды), задержите дыхание (4 секунды), выдохните через рот (4 секунды). Повторите 5 раз.',
  },
  {
    title: 'Круговые движения плечами',
    description: 'Встаньте или сядьте прямо. Медленно вращайте плечами назад: 10 раз, затем вперед 10 раз. Это снимет напряжение в плечевом поясе.',
  },
  {
    title: 'Растяжка грудных мышц',
    description: 'Встаньте в дверном проеме, положите предплечья на косяки. Медленно наклонитесь вперед, чувствуя растяжение в груди. Держите 20 секунд.',
  },
  {
    title: 'Массаж шеи',
    description: 'Сядьте, положите пальцы на заднюю часть шеи. Мягкими круговыми движениями массируйте мышцы шеи 30 секунд. Это снимет напряжение.',
  },
  {
    title: 'Упражнение "кошка-корова"',
    description: 'Встаньте на четвереньки. На вдохе прогните спину вниз (поза "корова"), на выдохе выгните спину вверх (поза "кошка"). Повторите 5 раз.',
  },
  {
    title: 'Растяжка сгибателей бедра',
    description: 'Встаньте в выпад, передняя нога согнута, задняя прямая. Наклонитесь вперед, чувствуя растяжение в передней части бедра задней ноги. Держите 20 секунд.',
  },
  {
    title: 'Скручивание сидя',
    description: 'Сядьте, положите одну руку на колено противоположной ноги. Медленно поверните корпус, усиливая скручивание. Держите 10 секунд, поменяйте сторону.',
  },
  {
    title: 'Массаж точек напряжения',
    description: 'Найдите болезненные точки в пояснице. Мягко надавливайте на них большими пальцами 10 секунд, затем расслабьтесь. Повторите 3 раза для каждой точки.',
  },
  {
    title: 'Растяжка боковых мышц',
    description: 'Встаньте, поднимите одну руку вверх. Наклонитесь в противоположную сторону, чувствуя растяжение. Держите 15 секунд, поменяйте сторону.',
  },
  {
    title: 'Укрепление мышц кора',
    description: 'Сядьте прямо, напрягите мышцы живота, как будто готовитесь к удару. Держите 10 секунд, расслабьтесь. Повторите 5 раз.',
  },
];

// Get random exercise reminder
function getRandomExerciseReminder() {
  const randomIndex = Math.floor(Math.random() * exerciseReminders.length);
  return exerciseReminders[randomIndex];
}

// Send reminder to user
export async function sendWorkReminder(userId: number, telegramId: string) {
  try {
    const settings = await telegramBotSettingsDb.findByUserId(userId);
    
    // Check if reminders are enabled
    if (!settings || !settings.reminders_enabled) {
      return;
    }

    const exercise = getRandomExerciseReminder();
    
    const message = `⏰ Напоминание о разминке\n\n` +
      `💪 ${exercise.title}\n\n` +
      `${exercise.description}\n\n` +
      `💡 Это займет всего 1-2 минуты, но поможет сохранить здоровье спины!`;

    if (bot) {
      await bot.telegram.sendMessage(telegramId, message);
    }
  } catch (error) {
    console.error(`Error sending reminder to user ${userId}:`, error);
  }
}

// Send plan reminder to user
export async function sendPlanReminder(userId: number, telegramId: string, plan: any) {
  try {
    const settings = await telegramBotSettingsDb.findByUserId(userId);
    
    // Check if reminders are enabled
    if (!settings || !settings.reminders_enabled) {
      return;
    }

    const timeStr = plan.time ? ` в ${plan.time}` : '';
    const message = `⏰ Напоминание о плане\n\n` +
      `📅 ${plan.title}${timeStr}\n\n` +
      `${plan.description || 'Не забудьте выполнить это задание!'}\n\n` +
      `💡 Используйте /today чтобы увидеть все планы на сегодня.`;

    if (bot) {
      await bot.telegram.sendMessage(telegramId, message);
    }
  } catch (error) {
    console.error(`Error sending plan reminder to user ${userId}:`, error);
  }
}

// Start reminders system - optimized for Render (checks every 30 minutes)
export function startHourlyReminders() {
  if (!bot) {
    console.warn('Bot not initialized, reminders will not start');
    return;
  }

  console.log('🔄 Starting reminder system (checks every 30 minutes)...');

  // Check every 30 minutes (1800000 ms) - optimized for Render free tier
  // This reduces database load and works better on serverless/limited resources
  setInterval(async () => {
    try {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Only check at :00 and :30 minutes
      if (minute !== 0 && minute !== 30) {
        return;
      }

      console.log(`⏰ Checking reminders at ${hour}:${minute.toString().padStart(2, '0')}`);

      // Get all users with Telegram connected
      const allUsers = await userDb.findAllWithTelegram();
      console.log(`👥 Found ${allUsers.length} users with Telegram connected`);

      // Working hours: 9:00 - 18:00
      // Send work reminders at :00 of each hour
      if (hour >= 9 && hour < 18 && minute === 0) {
        console.log(`💪 Sending work reminders to all users...`);
        
        for (const user of allUsers) {
          if (user.telegram_id) {
            try {
              await sendWorkReminder(user.id, user.telegram_id);
            } catch (error) {
              console.error(`Error sending work reminder to user ${user.id}:`, error);
            }
          }
        }
      }

      // Check for plan reminders (15 minutes before scheduled time)
      // We check at :00 and :30, so we need to look for plans at :15 and :45
      const reminderMinutes = minute === 0 ? 15 : 45;
      const reminderHour = minute === 0 ? hour : (minute === 30 ? hour : hour + 1);
      
      console.log(`📅 Checking plan reminders for ${reminderHour}:${reminderMinutes.toString().padStart(2, '0')}...`);

      for (const user of allUsers) {
        if (!user.telegram_id) continue;

        try {
          const settings = await telegramBotSettingsDb.findByUserId(user.id);
          if (!settings || !settings.reminders_enabled) {
            continue;
          }

          // Get today's plans
          const today = new Date();
          const plans = await dailyPlanDb.findByUserIdAndDate(user.id, today);
          
          // Find plans scheduled for the reminder time
          const reminderTimeStr = `${String(reminderHour).padStart(2, '0')}:${String(reminderMinutes).padStart(2, '0')}`;
          
          const upcomingPlans = plans.filter(p => 
            !p.completed && 
            p.time && 
            p.time === reminderTimeStr
          );
          
          for (const plan of upcomingPlans) {
            await sendPlanReminder(user.id, user.telegram_id, plan);
          }
        } catch (error) {
          console.error(`Error processing reminders for user ${user.id}:`, error);
        }
      }

      console.log(`✅ Reminder check completed`);
    } catch (error) {
      console.error('❌ Error in reminder interval:', error);
    }
  }, 30 * 60 * 1000); // Check every 30 minutes (optimized for Render)

  console.log('✅ Reminder system started (30-minute intervals)');
}

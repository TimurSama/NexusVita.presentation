import { dailyPlanDb, documentDb, userDb, profileDb, telegramBotSettingsDb } from '../database';
import fs from 'fs';

// Parse Maria's document and create monthly plan
export function createMariaPlan(userId: number) {
  // Read document content
  const documentContent = fs.readFileSync('maria_content.txt', 'utf-8');

  // Save document to database
  documentDb.create(userId, {
    title: 'Комплексное исследование проблемы и план терапии при боли в спине',
    content: documentContent,
    file_path: 'Мария.docx',
    document_type: 'medical',
  });

  // Generate monthly plan based on weekly plan from document
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(1); // First day of current month
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0); // Last day of current month

  const weeklyPlan = {
    monday: [
      { time: '07:00', title: 'Лёгкая ходьба', description: '5-минутная лёгкая ходьба', category: 'movement' },
      { time: '07:10', title: 'Утренний комплекс упражнений', description: 'Колено к груди (по 2 раза на ногу), мостик (3–5 раз), кошка-корова (3 раза)', category: 'movement' },
      { time: '12:00', title: 'Перерыв на работе', description: 'Каждые 30 мин: 1–2 минуты простых наклонов и вращений тазом', category: 'movement' },
      { time: '20:00', title: 'Вечерняя растяжка', description: 'Сидя на полу, тянемся руками вперёд к вытянутым ногам (наклон вперед) 20–30 секунд', category: 'movement' },
      { time: '22:00', title: 'Лёгкий массаж поясницы', description: 'Несильные круговые поглаживания', category: 'movement' },
    ],
    tuesday: [
      { time: '07:00', title: 'Утренние упражнения', description: 'Повороты туловища лёжа (по 5 повторений в каждую сторону), ягодичная растяжка', category: 'movement' },
      { time: '12:00', title: 'Рабочие упражнения', description: 'Несколько раз подтягивайте колени к груди сидя (по 10 повторений)', category: 'movement' },
      { time: '19:00', title: 'Укрепляющие упражнения', description: 'Планка на локтях (2–3 подхода по 10–20 сек) и подъём корпуса лёжа (15 повторов)', category: 'movement' },
      { time: '21:00', title: 'Самомассаж', description: 'Лёгкий самомассаж бёдер (спина и ягодицы) с маслом', category: 'movement' },
    ],
    wednesday: [
      { time: '07:00', title: 'Растяжка тазобедренных сгибателей', description: 'Стойка в выпаде вперед, держать по 20 сек на каждую ногу', category: 'movement' },
      { time: '07:15', title: 'Упражнение "лодочка"', description: 'Лежа на животе поднимаем грудь и ноги (5 раз)', category: 'movement' },
      { time: '12:00', title: 'Плечевые своды', description: 'Сгибайте лопатки друг к другу сидя (10 раз по 5 сек)', category: 'movement' },
      { time: '20:00', title: 'Вытяжение боков', description: 'Стоя широко, кисти на бёдрах, наклоны влево-вправо (по 10 раз, держать 5 сек внизу)', category: 'movement' },
      { time: '22:00', title: 'Валик под поясницу', description: 'Поваляйтесь на спине пару минут', category: 'movement' },
    ],
    thursday: [
      { time: '07:00', title: 'Утренний комплекс', description: 'Повторить комплекс понедельника, увеличив подходы (мостик 5–7 раз)', category: 'movement' },
      { time: '12:00', title: 'Рабочие перерывы', description: 'Каждые 45 мин: вытягиваться вверх, ладони сцеплены над головой 5–10 сек', category: 'movement' },
      { time: '20:00', title: 'Растяжка "бабочка"', description: 'Сидя, соедините подошвы ног и руками тянитесь к ступням (20 секунд)', category: 'movement' },
      { time: '21:00', title: 'Массаж стенки таза', description: 'Лежа на спине массируйте мягко бока таза круговыми движениями', category: 'movement' },
    ],
    friday: [
      { time: '07:00', title: 'Скручивания сидя', description: 'На полу (колени согнуты): оборачивайте корпус влево-вправо по 5 раз на каждую сторону', category: 'movement' },
      { time: '07:15', title: 'Мостик и активация ягодиц', description: 'Мостик (3–5 раз) и перевод тяжести тела с ноги на ногу в полуприседе', category: 'movement' },
      { time: '12:00', title: 'Пеший марш', description: 'Ходьба на месте или в коридоре 2–3 мин', category: 'movement' },
      { time: '20:00', title: 'Лёгкая йога', description: 'Поза "ребёнка" (сесть на пятки, наклониться грудью на пол, руки вперед) 30 сек', category: 'movement' },
      { time: '20:30', title: 'Растяжка ног', description: 'Выпрямленные ноги лежа – наклон вверх корпусом к ногам', category: 'movement' },
    ],
    saturday: [
      { time: '08:00', title: 'Прогулка или зарядка', description: '10-минутная прогулка или лёгкая зарядка (наклоны вперёд/назад, круги плечами)', category: 'movement' },
      { time: '08:15', title: 'Утренний комплекс', description: 'Комплекс понедельника в уменьшенном объёме', category: 'movement' },
      { time: '14:00', title: 'Активный отдых', description: 'Плавание или прогулка', category: 'movement' },
      { time: '21:00', title: 'Теплая ванна', description: 'С ЭМ-маслами (лаванда, пихта)', category: 'movement' },
      { time: '21:30', title: 'Самомассаж спины', description: 'Мягкий самомассаж спины', category: 'movement' },
    ],
    sunday: [
      { time: '08:00', title: 'Медленные вращения', description: 'Круговые вращения тазом и плечами, глубокое дыхание', category: 'movement' },
      { time: '12:00', title: 'Периодические растяжки', description: 'Запястья к потолку, скручивания стоя', category: 'movement' },
      { time: '20:00', title: 'Полный комплекс растяжек', description: 'Все упражнения по 1 подходу', category: 'movement' },
      { time: '21:00', title: 'Лёгкий массаж', description: 'Массаж болезненных мест', category: 'movement' },
    ],
  };

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Generate plans for the entire month
  const currentDate = new Date(startDate);
  let planCount = 0;

  while (currentDate <= endDate) {
    const dayName = dayNames[currentDate.getDay()];
    const dayPlans = weeklyPlan[dayName as keyof typeof weeklyPlan];

    for (const plan of dayPlans) {
      dailyPlanDb.create(userId, {
        date: new Date(currentDate),
        title: plan.title,
        description: plan.description,
        category: plan.category,
        time: plan.time,
      });
      planCount++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(`Created ${planCount} daily plans for Maria`);
  return planCount;
}

// Create Maria's profile
export function createMariaProfile() {
  // Check if Maria already exists
  let maria = userDb.findByTelegramId('403161451');

  if (!maria) {
    // Create Maria user
    const result = userDb.create({
      name: 'Мария',
      telegram_id: '403161451',
    });
    maria = userDb.findById(Number(result.lastInsertRowid));
  }

  const userId = maria.id;

  // Create/update profile
  profileDb.createOrUpdate(userId, {
    date_of_birth: new Date('1997-10-23'),
    height: 172,
    weight: 57,
    gender: 'female',
  });

  // Initialize Telegram bot settings
  telegramBotSettingsDb.createOrUpdate(userId, {
    notifications_enabled: true,
    reminders_enabled: true,
    metric_tracking_enabled: true,
    reminder_times: ['08:00', '12:00', '18:00', '21:00'],
  });

  // Create monthly plan
  createMariaPlan(userId);

  console.log(`Maria's profile created/updated with ID: ${userId}`);
  return userId;
}

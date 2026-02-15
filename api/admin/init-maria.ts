import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userDb, profileDb, dailyPlanDb, documentDb, telegramBotSettingsDb, initDatabase } from '../lib/database.js';

// Maria's document content (embedded)
const MARIA_DOCUMENT_CONTENT = `Комплексное исследование проблемы и план терапии при боли в спине
Боль в пояснично-крестцовой области слева часто связана с длительным сидением в неудобной позе и перенапряжением мышц. Например, Mayo Clinic отмечает, что боль в спине – очень частая проблема, и регулярные упражнения могут облегчить её и предотвратить дальнейший дискомфорт [1] . При неактивном образе жизни и длительном сгибании корпуса вперёд нарушается естественный изгиб позвоночника, «растягиваются» связки и повышается нагрузка на межпозвоночные диски [2] . В свою очередь Healthline указывает, что плохая осанка (наклон вперёд за компьютером, сутулость) создаёт дополнительную нагрузку на мышцы, связки и позвонки, вызывая среднеспинную или поясничную боль [3] [2] . При этом длительное сидение может ослаблять мышцы кора и спины и, наоборот, укорачивать сгибатели бедра – формируя мышечный дисбаланс и хроническую скованность [4] [5] . С другой стороны, защемление или раздражение нервов (ишиас) также даёт боль и усиление при растирании. Особенно подозрителен резкий болевой ответ при надавливании на седалищный нерв: это может указывать на компрессию нерва в области поясницы или таза. Для облегчения таких симптомов врачи рекомендуют аккуратные «неконфронтационные» растяжки: мягкие упражнения на растяжение ягодиц и подколенных сухожилий помогают снять давление с нерва [6] .   Harvard Health   подчёркивает: «растяжка – один из самых эффективных способов облегчить боль при ишиасе и способствовать заживлению» [6] . При этом важна осторожность: резкие наклоны или глубокие растяжки могут усилить боль, поэтому любые упражнения следует выполнять плавно, не доводя до усиления симптомов [7] .
Кроме того, хроническое напряжение мышц спины может привести к формированию триггерных точек (миофасциальный болевой синдром). Healthline описывает, что «миофасциальный болевой синдром» – это хроническая боль в мышцах, связанная с давлением на триггеры; она часто возникает из‑за повторяющихся нагрузок или постоянного стресса на мышцы [8] . Например, длительное напряжение левой половины спины при «косой» посадке могло вызвать уплотнения и болезненность в мышцах, отдающую тянущей болью. Также Coury & Buehler Phys. Therapy указывает: нарушение осанки даже может раздражать места прикрепления ребер к позвоночнику – так называемую реберную или «costovertebral» дисфункцию. При этом «боль в рёбрах может возникать от травмы, падения или даже плохой осанки, приводя к раздражению суставов, через которые они прикрепляются к позвоночнику» [9] . Это как раз похоже на ощущение «помехи» при наклоне влево, когда ребро задевает – возможно, из-за уплотненных тканей или малой подвижности в том сегменте.
Таким образом, наиболее вероятная причина – мышечно‑фасциальный спазм и дисбаланс мышц слева на фоне неправильной позы при сидении. При этом важно исключить «красные флаги» (инфекции, опухоли и пр.). Врачебные источники рекомендуют приём истории болезни, включающий вопросы о точном местоположении боли, её характере, иррадиации (например, в ногу), триггерах и облегчениях [10] [11] . Вопрос «где болит сильнее всего?» – ключевой при первичной оценке болей в спине [10] . Следует уточнить, усиливается ли боль при сгибании влево или вправо, лежании или активности, есть ли онемение/покалывание ног (что указало бы на ущемление нерва [11] ). Необходимо выяснить, как долго беспокоит боль, были ли подобные эпизоды ранее, чем она снимается (отдых, тепло, растяжки), есть ли отёки, лихорадка или другие системные симптомы – на наличие «красных флагов» (включая, например, потерю контроля за мочеиспусканием) [12] [13] . Healthline предостерегает, что при появлении   сильной острой боли   или сопутствующих опасных симптомов (боли в груди, слабости, онемения, высокой температуры) нужна неотложная помощь [12] . Если же боль «умеренная» и без тревожной клиники, можно провести домашний тест: при минимальном улучшении в течение 1–2 недель обычно можно обойтись без врачебной помощи [14] . Однако отсутствие улучшения более нескольких дней уже требует консультации [13] .`;

// Weekly plan for Maria
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

async function createMariaPlan(userId: number) {
  // Save document to database
  await documentDb.create(userId, {
    title: 'Комплексное исследование проблемы и план терапии при боли в спине',
    content: MARIA_DOCUMENT_CONTENT,
    file_path: 'Мария.docx',
    document_type: 'medical',
  });

  // Generate monthly plan
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(1);
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDate = new Date(startDate);
  let planCount = 0;

  while (currentDate <= endDate) {
    const dayName = dayNames[currentDate.getDay()];
    const dayPlans = weeklyPlan[dayName as keyof typeof weeklyPlan];

    for (const plan of dayPlans) {
      try {
        await dailyPlanDb.create(userId, {
          date: new Date(currentDate),
          title: plan.title,
          description: plan.description,
          category: plan.category,
          time: plan.time,
        });
        planCount++;
        } catch (error: any) {
          // Ignore duplicate key errors (UNIQUE constraint)
          if (!error.message?.includes('duplicate key') && error.code !== '23505') {
            console.error('Error creating plan:', error);
          }
        }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(`Created ${planCount} daily plans for Maria`);
  return planCount;
}

async function createMariaProfile() {
  // Check if Maria already exists
  let maria = await userDb.findByTelegramId('403161451');

  if (!maria) {
    // Create Maria user
    const result = await userDb.create({
      name: 'Мария',
      telegram_id: '403161451',
    });
    maria = await userDb.findById(Number(result.lastInsertRowid || result.id));
  }

  const userId = maria.id;

  // Create/update profile
  await profileDb.createOrUpdate(userId, {
    date_of_birth: new Date('1997-10-23'),
    height: 172,
    weight: 57,
    gender: 'female',
  });

  // Initialize Telegram bot settings
  await telegramBotSettingsDb.createOrUpdate(userId, {
    notifications_enabled: true,
    reminders_enabled: true,
    metric_tracking_enabled: true,
    reminder_times: ['08:00', '12:00', '18:00', '21:00'],
  });

  // Create monthly plan
  await createMariaPlan(userId);

  console.log(`Maria's profile created/updated with ID: ${userId}`);
  return userId;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize database
  await initDatabase();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = await createMariaProfile();
    
    res.json({
      success: true,
      message: 'Maria profile initialized successfully',
      userId,
    });
  } catch (error) {
    console.error('Error initializing Maria profile:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: String(error),
    });
  }
}

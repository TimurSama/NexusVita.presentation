import { PopupContent } from '@/components/DetailPopup';
import React from 'react';

// Helper function to create list items
const createList = (items: string[]) => {
  return React.createElement('ul', { className: 'space-y-2 list-disc list-inside' },
    ...items.map(item => 
      React.createElement('li', { key: item }, item)
    )
  );
};

// Helper function to create list with strong items
const createListWithStrong = (items: Array<{ label: string; value: string }>) => {
  return React.createElement('ul', { className: 'space-y-2 list-disc list-inside' },
    ...items.map((item, idx) => 
      React.createElement('li', { key: idx },
        React.createElement('strong', null, `${item.label}:`), ` ${item.value}`
      )
    )
  );
};

export const whitepaperContent: Record<string, PopupContent> = {
  // Hero Section
  'platform-overview': {
    id: 'platform-overview',
    title: 'О платформе EthosLife',
    subtitle: 'Здоровая жизнь - это привычка',
    description: `EthosLife — это инновационная платформа для управления здоровьем, объединяющая передовые AI-технологии, медицинские данные, фитнес, питание, психологию и социальное взаимодействие в единую экосистему. Платформа решает проблему фрагментированности данных о здоровье, создавая единую цифровую карту человека с персонализированными рекомендациями и комплексным мониторингом.`,
    sections: [
      {
        title: 'Миссия',
        content: `Наша миссия — сделать управление здоровьем простым, доступным и эффективным для каждого. Мы верим, что каждый человек заслуживает персонализированного подхода к здоровью, основанного на данных и передовых технологиях.`,
      },
      {
        title: 'Технологический стек',
        content: createListWithStrong([
          { label: 'Frontend', value: 'React 19, TypeScript, Tailwind CSS 4' },
          { label: 'Backend', value: 'Node.js, PostgreSQL, Prisma ORM' },
          { label: 'AI', value: 'OpenAI, Anthropic, кастомные ML модели' },
          { label: 'Интеграции', value: 'FHIR/HL7, OAuth (Apple Health, Garmin, Fitbit)' },
          { label: 'Безопасность', value: 'End-to-end шифрование, GDPR/HIPAA compliance' },
        ]),
      },
      {
        title: 'Ключевые преимущества',
        content: createList([
          'Единая платформа для всех аспектов здоровья',
          'AI-анализ 2000+ показателей с точностью 95%',
          'Персонализированные планы и рекомендации',
          'Интеграция с медицинскими учреждениями и устройствами',
          'Непрерывный мониторинг 24/7',
          'Полный контроль пользователя над данными',
        ]),
      },
    ],
    relatedLinks: [
      { label: 'Модули здоровья', path: '#health-modules' },
      { label: 'Экосистема', path: '#ecosystem' },
    ],
  },

  // Health Modules
  'medicine-module': {
    id: 'medicine-module',
    title: 'Медицинские обследования',
    subtitle: 'Комплексная диагностика, профилактика и мониторинг здоровья',
    description: `Модуль медицины — это центральный компонент платформы EthosLife, предоставляющий комплексную систему диагностики, мониторинга и профилактики заболеваний. Он объединяет медицинские данные из различных источников (лаборатории, клиники, врачи, устройства), обеспечивая единую, целостную картину здоровья пациента с возможностью глубокого анализа и персонализированных рекомендаций.`,
    sections: [
      {
        title: 'Diagnostics & Lab Hub — Центр диагностики и анализов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Централизованная система управления всеми медицинскими анализами и диагностическими данными. Пользователь может загружать результаты анализов вручную или автоматически получать их через интеграции с лабораториями.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Автоматическая загрузка:'), ' Интеграция с лабораториями через FHIR/HL7 стандарты для автоматического получения результатов'),
            React.createElement('li', null, React.createElement('strong', null, 'OCR распознавание:'), ' Автоматическое распознавание текста с фотографий анализов и медицинских документов'),
            React.createElement('li', null, React.createElement('strong', null, 'Нормативные диапазоны:'), ' Автоматическое сравнение показателей с возрастными и гендерными нормами'),
            React.createElement('li', null, React.createElement('strong', null, 'Динамика показателей:'), ' Визуализация изменений показателей во времени с выявлением трендов'),
            React.createElement('li', null, React.createElement('strong', null, 'AI-интерпретация:'), ' Автоматический анализ результатов с выявлением отклонений и рисков'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляционный анализ:'), ' Выявление связей между различными показателями и симптомами'),
            React.createElement('li', null, React.createElement('strong', null, 'Экспорт и шаринг:'), ' Возможность экспорта данных врачу в различных форматах (PDF, FHIR)')
          )
        ),
      },
      {
        title: 'Unified Health Profile — Единый биопрофиль',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Единая цифровая карта человека, объединяющая все медицинские данные в одном месте. Профиль включает полную медицинскую историю, текущие диагнозы, аллергии, лекарства, операции, семейный анамнез и генетические данные.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Медицинская история:'), ' Хронология всех заболеваний, операций, госпитализаций'),
            React.createElement('li', null, React.createElement('strong', null, 'Текущие диагнозы:'), ' Активные и хронические заболевания с динамикой'),
            React.createElement('li', null, React.createElement('strong', null, 'Лекарства:'), ' Список принимаемых препаратов с дозировками и графиком приема'),
            React.createElement('li', null, React.createElement('strong', null, 'Аллергии и противопоказания:'), ' Полный список аллергенов и ограничений'),
            React.createElement('li', null, React.createElement('strong', null, 'Генетические данные:'), ' Результаты генетических тестов и предрасположенности'),
            React.createElement('li', null, React.createElement('strong', null, 'Семейный анамнез:'), ' История заболеваний в семье для оценки рисков'),
            React.createElement('li', null, React.createElement('strong', null, 'Вакцинация:'), ' Календарь прививок и напоминания')
          )
        ),
      },
      {
        title: 'Risk Engine — Двигатель оценки рисков',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Предиктивная система на основе машинного обучения для выявления рисков развития заболеваний. Анализирует комбинации факторов риска, генетические предрасположенности, образ жизни и медицинскую историю для прогнозирования вероятности различных заболеваний.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Оценка рисков:'), ' Расчет вероятности развития сердечно-сосудистых, онкологических, метаболических заболеваний'),
            React.createElement('li', null, React.createElement('strong', null, 'Раннее предупреждение:'), ' Выявление ранних признаков заболеваний до появления симптомов'),
            React.createElement('li', null, React.createElement('strong', null, 'Персонализированные скрининги:'), ' Рекомендации по необходимым обследованиям на основе рисков'),
            React.createElement('li', null, React.createElement('strong', null, 'Профилактические планы:'), ' Индивидуальные программы снижения рисков'),
            React.createElement('li', null, React.createElement('strong', null, 'Мониторинг эффективности:'), ' Отслеживание изменений рисков при следовании рекомендациям')
          )
        ),
      },
      {
        title: 'Injury & Recovery Module — Модуль травм и восстановления',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Специализированный модуль для управления травмами, послеоперационным восстановлением и реабилитацией. Включает протоколы восстановления, отслеживание прогресса и контроль боли.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Протоколы восстановления:'), ' Персонализированные программы реабилитации на основе типа травмы'),
            React.createElement('li', null, React.createElement('strong', null, 'Контроль боли:'), ' Отслеживание уровня боли и эффективности обезболивающих'),
            React.createElement('li', null, React.createElement('strong', null, 'Прогресс реабилитации:'), ' Визуализация восстановления с метриками и фото'),
            React.createElement('li', null, React.createElement('strong', null, 'Упражнения:'), ' Библиотека упражнений для реабилитации с видео-инструкциями'),
            React.createElement('li', null, React.createElement('strong', null, 'Напоминания:'), ' Уведомления о приеме лекарств и выполнении упражнений'),
            React.createElement('li', null, React.createElement('strong', null, 'Связь с врачами:'), ' Возможность делиться прогрессом с лечащим врачом')
          )
        ),
      },
      {
        title: 'Интеграции и партнёрства',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Модуль интегрируется с широкой сетью медицинских учреждений и специалистов через стандартизированные протоколы обмена данными.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Медицинские учреждения:'), ' Интеграция с клиниками и больницами через FHIR/HL7'),
            React.createElement('li', null, React.createElement('strong', null, 'Лаборатории:'), ' Автоматическое получение результатов анализов из партнёрских лабораторий'),
            React.createElement('li', null, React.createElement('strong', null, 'Врачи и специалисты:'), ' Прямая связь с лечащими врачами, возможность консультаций'),
            React.createElement('li', null, React.createElement('strong', null, 'Аптеки:'), ' Интеграция для заказа и доставки лекарств'),
            React.createElement('li', null, React.createElement('strong', null, 'Страховые компании:'), ' Обмен данными для оптимизации страховых программ')
          )
        ),
      },
      {
        title: 'Примеры использования',
        content: createList([
          'Загрузка и автоматический анализ результатов лабораторных исследований с выявлением отклонений',
          'Отслеживание динамики хронических заболеваний (диабет, гипертония) с визуализацией трендов',
          'Профилактические программы и персонализированные скрининги на основе рисков',
          'Управление лекарствами с напоминаниями и отслеживанием эффективности',
          'Экспорт полного медицинского профиля врачу в один клик перед приемом',
          'Мониторинг восстановления после операций и травм с протоколами реабилитации',
          'Раннее выявление рисков заболеваний и профилактические рекомендации',
        ]),
      },
    ],
  },

  'nutrition-module': {
    id: 'nutrition-module',
    title: 'Питание',
    subtitle: 'Сбалансированный рацион и персонализированные рекомендации',
    description: `Модуль питания обеспечивает комплексный подход к управлению рационом, анализируя потребление макро- и микронутриентов, выявляя дефициты и предоставляя персонализированные рекомендации на основе ваших целей, образа жизни, медицинских показателей и генетических особенностей. Модуль интегрируется с медицинскими данными для отслеживания влияния питания на здоровье.`,
    sections: [
      {
        title: 'Дневник питания — Учет всех приемов пищи',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Интуитивный интерфейс для ведения полного дневника питания с возможностью быстрого добавления продуктов, блюд и рецептов. Система запоминает ваши предпочтения и часто используемые продукты.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Быстрый ввод:'), ' Добавление продуктов за секунды через поиск или сканер'),
            React.createElement('li', null, React.createElement('strong', null, 'Рецепты:'), ' Создание и сохранение собственных рецептов с расчетом калорийности'),
            React.createElement('li', null, React.createElement('strong', null, 'Фото-дневник:'), ' Ведение дневника через фотографии блюд с AI-распознаванием'),
            React.createElement('li', null, React.createElement('strong', null, 'Планирование:'), ' Составление планов питания на день, неделю, месяц'),
            React.createElement('li', null, React.createElement('strong', null, 'История:'), ' Полная история питания с возможностью анализа паттернов')
          )
        ),
      },
      {
        title: 'Сканер продуктов — Распознавание и анализ',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Умный сканер продуктов использует технологии компьютерного зрения и базу данных из 500,000+ продуктов для мгновенного распознавания и анализа.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Штрих-код:'), ' Сканирование штрих-кода для мгновенного получения данных о продукте'),
            React.createElement('li', null, React.createElement('strong', null, 'Фото-распознавание:'), ' AI распознает продукты по фотографии и определяет порцию'),
            React.createElement('li', null, React.createElement('strong', null, 'Голосовой ввод:'), ' Добавление продуктов голосовыми командами'),
            React.createElement('li', null, React.createElement('strong', null, 'База данных:'), ' Обширная база с точными данными о калориях, БЖУ, витаминах, минералах'),
            React.createElement('li', null, React.createElement('strong', null, 'Персонализация:'), ' Учет ваших аллергий, предпочтений и диетических ограничений')
          )
        ),
      },
      {
        title: 'Анализ макро- и микронутриентов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Глубокий анализ потребления всех питательных веществ с визуализацией и выявлением дефицитов. Система сравнивает ваше питание с рекомендуемыми нормами на основе возраста, пола, активности и целей.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Макронутриенты:'), ' Детальный анализ белков, жиров, углеводов с разбивкой по типам'),
            React.createElement('li', null, React.createElement('strong', null, 'Микронутриенты:'), ' Отслеживание всех витаминов (A, B-группа, C, D, E, K) и минералов'),
            React.createElement('li', null, React.createElement('strong', null, 'Клетчатка:'), ' Мониторинг потребления растворимой и нерастворимой клетчатки'),
            React.createElement('li', null, React.createElement('strong', null, 'Вода:'), ' Отслеживание гидратации с напоминаниями'),
            React.createElement('li', null, React.createElement('strong', null, 'Антиоксиданты:'), ' Анализ потребления антиоксидантов и фитонутриентов'),
            React.createElement('li', null, React.createElement('strong', null, 'Визуализация:'), ' Интерактивные графики и диаграммы потребления')
          )
        ),
      },
      {
        title: 'Дефицитные зоны — Выявление недостатков',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Автоматическое выявление дефицитов питательных веществ на основе анализа вашего рациона и медицинских показателей. Система связывает дефициты с симптомами и результатами анализов.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'AI-анализ:'), ' Автоматическое выявление недостающих элементов'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляция с анализами:'), ' Связь дефицитов с результатами лабораторных исследований'),
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации:'), ' Персонализированные советы по восполнению дефицитов'),
            React.createElement('li', null, React.createElement('strong', null, 'Продукты-источники:'), ' Список продуктов, богатых недостающими веществами'),
            React.createElement('li', null, React.createElement('strong', null, 'Мониторинг прогресса:'), ' Отслеживание улучшений при следовании рекомендациям')
          )
        ),
      },
      {
        title: 'Планы питания — Персонализированные меню',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `AI-генерация персонализированных планов питания на основе ваших целей (похудение, набор массы, поддержание веса, улучшение здоровья), предпочтений, аллергий и медицинских показаний.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Целеориентированные планы:'), ' Планы для похудения, набора массы, набора мышечной массы, детокса'),
            React.createElement('li', null, React.createElement('strong', null, 'Диетические протоколы:'), ' Кето, палео, веган, средиземноморская, интервальное голодание'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицинские диеты:'), ' Планы для диабета, гипертонии, аутоиммунных заболеваний'),
            React.createElement('li', null, React.createElement('strong', null, 'Рецепты и списки покупок:'), ' Автоматическая генерация списков покупок для планов'),
            React.createElement('li', null, React.createElement('strong', null, 'Адаптация:'), ' Планы адаптируются на основе вашего прогресса и предпочтений')
          )
        ),
      },
      {
        title: 'Продвинутые функции',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Anti-inflammatory Score:'), ' Оценка противовоспалительного потенциала рациона'),
            React.createElement('li', null, React.createElement('strong', null, 'Gut Health Tracking:'), ' Отслеживание продуктов для здоровья кишечника и микробиома'),
            React.createElement('li', null, React.createElement('strong', null, 'Метаболический профиль:'), ' Анализ влияния питания на метаболизм и энергетический баланс'),
            React.createElement('li', null, React.createElement('strong', null, 'Гликемический индекс:'), ' Отслеживание гликемической нагрузки для контроля сахара'),
            React.createElement('li', null, React.createElement('strong', null, 'Интеграция с движением:'), ' Связь питания с тренировками для оптимизации результатов'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляция с анализами:'), ' Отслеживание влияния питания на медицинские показатели')
          )
        ),
      },
    ],
  },

  'movement-module': {
    id: 'movement-module',
    title: 'Спорт и фитнес',
    subtitle: 'Комплексная система отслеживания физической активности и тренировок',
    description: `Модуль движения предоставляет полный набор инструментов для отслеживания физической активности, планирования тренировок, анализа прогресса и оптимизации результатов. Модуль интегрируется с широким спектром носимых устройств и фитнес-платформ, создавая единую картину вашей активности.`,
    sections: [
      {
        title: 'Интеграции с устройствами',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Модуль поддерживает все основные носимые устройства и фитнес-платформы для автоматической синхронизации данных.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Умные часы:'), ' Apple Watch, Garmin, Samsung Galaxy Watch, Polar'),
            React.createElement('li', null, React.createElement('strong', null, 'Фитнес-трекеры:'), ' Fitbit, Xiaomi Mi Band, Huawei Band'),
            React.createElement('li', null, React.createElement('strong', null, 'Кольца:'), ' Oura Ring, Motiv Ring'),
            React.createElement('li', null, React.createElement('strong', null, 'Специализированные устройства:'), ' Whoop, Polar H10, Garmin HRM'),
            React.createElement('li', null, React.createElement('strong', null, 'Платформы:'), ' Strava, TrainingPeaks, MyFitnessPal, Google Fit, Apple HealthKit'),
            React.createElement('li', null, React.createElement('strong', null, 'Автосинхронизация:'), ' Данные обновляются автоматически в реальном времени')
          )
        ),
      },
      {
        title: 'Трекинг активности',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Комплексное отслеживание всех видов физической активности с детальной аналитикой.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Шаги и расстояние:'), ' Ежедневные шаги, пройденное расстояние, активные минуты'),
            React.createElement('li', null, React.createElement('strong', null, 'Калории:'), ' Расход калорий (BMR, активные калории, общий расход)'),
            React.createElement('li', null, React.createElement('strong', null, 'Тренировки:'), ' Запись всех видов тренировок с детальными метриками'),
            React.createElement('li', null, React.createElement('strong', null, 'Активность:'), ' Время активности, сидячий образ жизни, интенсивность'),
            React.createElement('li', null, React.createElement('strong', null, 'Высота:'), ' Подъемы и спуски, этажи')
          )
        ),
      },
      {
        title: 'Планирование тренировок',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `AI-генерация персонализированных программ тренировок на основе ваших целей, уровня подготовки и доступности.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Типы программ:'), ' Силовые, кардио, функциональные, йога, пилатес, интервальные'),
            React.createElement('li', null, React.createElement('strong', null, 'Уровни сложности:'), ' Программы для начинающих, среднего и продвинутого уровня'),
            React.createElement('li', null, React.createElement('strong', null, 'Целеориентированные:'), ' Похудение, набор массы, выносливость, сила, гибкость'),
            React.createElement('li', null, React.createElement('strong', null, 'Видео-инструкции:'), ' Пошаговые видео для каждого упражнения'),
            React.createElement('li', null, React.createElement('strong', null, 'Адаптация:'), ' Программы адаптируются на основе вашего прогресса')
          )
        ),
      },
      {
        title: 'Продвинутая аналитика',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Глубокий анализ тренировок и физических показателей для оптимизации результатов.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Пульсовые зоны:'), ' Анализ времени в различных пульсовых зонах для оптимизации тренировок'),
            React.createElement('li', null, React.createElement('strong', null, 'VO2 max:'), ' Расчет и мониторинг максимального потребления кислорода'),
            React.createElement('li', null, React.createElement('strong', null, 'HRV (HRV):'), ' Анализ вариабельности сердечного ритма для оценки восстановления'),
            React.createElement('li', null, React.createElement('strong', null, 'Периодизация:'), ' Планирование циклов нагрузки для предотвращения перетренированности'),
            React.createElement('li', null, React.createElement('strong', null, 'Травмо-предотвращение:'), ' Выявление признаков перегрузки и рисков травм'),
            React.createElement('li', null, React.createElement('strong', null, 'Прогресс:'), ' Визуализация улучшений силы, выносливости, гибкости')
          )
        ),
      },
      {
        title: 'Интеграция с другими модулями',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Модуль движения тесно интегрирован с другими модулями для комплексного подхода к здоровью.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Рекомендации по питанию до и после тренировок'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Анализ влияния тренировок на качество сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицина:'), ' Мониторинг влияния активности на медицинские показатели'),
            React.createElement('li', null, React.createElement('strong', null, 'Психология:'), ' Отслеживание влияния тренировок на настроение и стресс')
          )
        ),
      },
    ],
  },

  'psychology-module': {
    id: 'psychology-module',
    title: 'Модуль психологии',
    subtitle: 'Психическое здоровье и управление стрессом',
    description: `Модуль психологии помогает отслеживать ментальное здоровье, управлять стрессом и улучшать эмоциональное благополучие через различные инструменты и практики.`,
    sections: [
      {
        title: 'Инструменты',
        content: createListWithStrong([
          { label: 'Mood tracking', value: 'Ежедневное отслеживание настроения и эмоций' },
          { label: 'Стресс-индекс', value: 'Мониторинг уровня стресса и его источников' },
          { label: 'Дневник мыслей', value: 'Рефлексия и анализ эмоциональных паттернов' },
          { label: 'CBT-инструменты', value: 'Когнитивно-поведенческая терапия' },
          { label: 'Breathwork модуль', value: 'Дыхательные практики для снижения стресса' },
        ]),
      },
      {
        title: 'AI-анализ',
        content: `AI анализирует эмоциональные триггеры, коррелирует данные с сном и нагрузкой, предсказывает выгорание и предоставляет персонализированные рекомендации по улучшению ментального здоровья.`,
      },
    ],
  },

  'sleep-module': {
    id: 'sleep-module',
    title: 'Модуль сна',
    subtitle: 'Качество сна и оптимизация циркадных ритмов',
    description: `Модуль сна помогает отслеживать качество и продолжительность сна, анализировать циркадные ритмы и предоставляет рекомендации по оптимизации режима.`,
    sections: [
      {
        title: 'Функциональность',
        content: createList([
          'Трекинг длительности и качества сна',
          'Анализ фаз сна (REM, Deep, Light)',
          'Отслеживание циркадных ритмов',
          'Рекомендации по оптимизации режима',
          'Интеграция с трекерами сна',
        ]),
      },
    ],
  },

  'relationships-module': {
    id: 'relationships-module',
    title: 'Модуль отношений',
    subtitle: 'Социальные связи и здоровые отношения',
    description: `Модуль отношений помогает отслеживать качество социальных связей, управлять отношениями и улучшать социальное благополучие.`,
    sections: [
      {
        title: 'Функциональность',
        content: createList([
          'Оценка качества отношений',
          'Социальная активность',
          'Группы поддержки',
          'Совместные челленджи',
        ]),
      },
    ],
  },

  'spirituality-module': {
    id: 'spirituality-module',
    title: 'Модуль духовности',
    subtitle: 'Личностный рост и смысл жизни',
    description: `Модуль духовности поддерживает личностный рост, рефлексию и поиск смысла жизни через различные практики и инструменты.`,
    sections: [
      {
        title: 'Функциональность',
        content: createList([
          'Медитация и осознанность',
          'Дневник рефлексии',
          'Практики благодарности',
          'Поиск смысла и целей',
        ]),
      },
    ],
  },

  // Key Features
  'ai-diagnostics': {
    id: 'ai-diagnostics',
    title: 'AI-диагностика',
    subtitle: 'Анализ 2000+ показателей с точностью 95%',
    description: `Наша система AI-диагностики использует передовые алгоритмы машинного обучения для анализа более 2000 показателей здоровья, обеспечивая точность диагностики на уровне 95%.`,
    sections: [
      {
        title: 'Технологии',
        content: createListWithStrong([
          { label: 'Machine Learning', value: 'Обученные модели на миллионах медицинских записей' },
          { label: 'NLP', value: 'Обработка естественного языка для анализа текстовых данных' },
          { label: 'Computer Vision', value: 'OCR для распознавания анализов и документов' },
          { label: 'Предиктивная аналитика', value: 'Прогнозирование рисков и трендов' },
        ]),
      },
      {
        title: 'Методология',
        content: `Система собирает данные из всех модулей, обрабатывает их через многоуровневую архитектуру AI, сравнивает с базой знаний и генерирует персонализированные рекомендации. Модели постоянно обучаются на новых данных, улучшая точность.`,
      },
      {
        title: 'Примеры применения',
        content: createList([
          'Автоматический анализ результатов лабораторных исследований',
          'Интерпретация симптомов и рекомендации по действиям',
          'Прогноз рисков развития заболеваний',
          'Персонализированные планы лечения и профилактики',
        ]),
      },
    ],
  },

  'personalization': {
    id: 'personalization',
    title: 'Персонализация',
    subtitle: 'Индивидуальные планы на основе ваших данных',
    description: `Каждый человек уникален, и наш AI создает полностью персонализированные планы, учитывая ваши генетику, образ жизни, цели и текущее состояние здоровья.`,
    sections: [
      {
        title: 'Как это работает',
        content: React.createElement('ol', { className: 'space-y-2 list-decimal list-inside' },
          React.createElement('li', null, 'Сбор данных из всех модулей и интеграций'),
          React.createElement('li', null, 'Анализ паттернов и корреляций'),
          React.createElement('li', null, 'Сравнение с базой знаний и лучшими практиками'),
          React.createElement('li', null, 'Генерация персонализированного плана'),
          React.createElement('li', null, 'Адаптация в реальном времени на основе результатов')
        ),
      },
      {
        title: 'Области применения',
        content: `Персонализация применяется во всех аспектах: питание (индивидуальные диеты), тренировки (программы под ваши цели), сон (оптимизация режима), ментальное здоровье (персональные практики) и медицина (индивидуальные протоколы).`,
      },
    ],
  },

  'integrations': {
    id: 'integrations',
    title: 'Интеграции',
    subtitle: 'Подключение к учреждениям и устройствам',
    description: `EthosLife интегрируется с широким спектром медицинских учреждений, устройств и платформ, создавая единую экосистему данных о здоровье.`,
    sections: [
      {
        title: 'Типы интеграций',
        content: createListWithStrong([
          { label: 'Медицинские учреждения', value: 'FHIR/HL7 серверы, клиники, лаборатории' },
          { label: 'Wearables', value: 'Apple Watch, Garmin, Fitbit, Oura Ring, Whoop' },
          { label: 'Специалисты', value: 'Врачи, психологи, нутрициологи, тренеры' },
          { label: 'Платформы', value: 'Google Fit, Apple HealthKit, MyFitnessPal' },
        ]),
      },
      {
        title: 'Безопасность',
        content: `Все интеграции используют OAuth 2.0 и соответствуют стандартам безопасности. Данные шифруются end-to-end, пользователь полностью контролирует доступ к своим данным.`,
      },
    ],
  },

  'monitoring': {
    id: 'monitoring',
    title: 'Мониторинг 24/7',
    subtitle: 'Непрерывное отслеживание показателей',
    description: `Система непрерывного мониторинга отслеживает все ключевые показатели здоровья в режиме реального времени, обеспечивая раннее выявление проблем и своевременные рекомендации.`,
    sections: [
      {
        title: 'Что отслеживается',
        content: createList([
          'Биометрические показатели (пульс, давление, температура)',
          'Активность (шаги, калории, тренировки)',
          'Сон (длительность, качество, фазы)',
          'Настроение и стресс',
          'Питание и гидратация',
        ]),
      },
      {
        title: 'Алерты и уведомления',
        content: `Система автоматически отправляет уведомления при критических отклонениях, предоставляет рекомендации по улучшению показателей, напоминает о важных действиях и отмечает достижения.`,
      },
    ],
  },

  // Ecosystem Sections
  'systematization': {
    id: 'systematization',
    title: 'Систематизация',
    subtitle: '5 интегрированных комплексов здоровья',
    description: `EthosLife объединяет все аспекты здоровья в 5 интегрированных комплексов, создавая холистический подход к управлению здоровьем. Каждый комплекс включает несколько модулей, работающих в синергии.`,
    sections: [
      {
        title: '5 комплексов здоровья',
        content: createListWithStrong([
          { label: 'Физический комплекс', value: 'Медицина, Питание, Движение - $2.1T рынок, 28% доля' },
          { label: 'Психоэмоциональный комплекс', value: 'Психология, Сон, Отношения - $1.8T рынок, 24% доля' },
          { label: 'Социальный комплекс', value: 'Отношения, Сообщество, Сотрудничество - $1.5T рынок, 20% доля' },
          { label: 'Духовный комплекс', value: 'Духовность, Смысл, Развитие - $1.2T рынок, 16% доля' },
          { label: 'Экосистемный комплекс', value: 'Интеграция всех компонентов - $2.7T рынок, 36% доля' },
        ]),
      },
      {
        title: 'Синергия данных',
        content: `Интеграция 2000+ показателей здоровья позволяет проводить холистический анализ, выявляя корреляции между различными аспектами здоровья, которые невозможно обнаружить при изолированном рассмотрении.`,
      },
      {
        title: 'Синергия рекомендаций',
        content: `Персональные протоколы учитывают все 7 направлений здоровья одновременно, обеспечивая комплексный подход к улучшению качества жизни. Рекомендации в одном модуле усиливают результаты в других.`,
      },
      {
        title: 'Синергия партнёров',
        content: `Экосистема 5000+ партнёров (клиники, лаборатории, специалисты, устройства) обеспечивает комплексное обслуживание пользователей на всех уровнях здоровья.`,
      },
    ],
    relatedLinks: [
      { label: 'Страница систематизации', path: '/systematization' },
    ],
  },

  'economic-model': {
    id: 'economic-model',
    title: 'Экономическая модель',
    subtitle: 'Устойчивые источники дохода',
    description: `EthosLife использует диверсифицированную модель доходов с несколькими устойчивыми источниками, обеспечивая прогнозируемый рост до $320.5M к 2030 году.`,
    sections: [
      {
        title: 'Источники дохода',
        content: createListWithStrong([
          { label: 'Подписки пользователей', value: '45% - Premium подписки для личного использования' },
          { label: 'B2B партнёрства', value: '30% - Интеграция с корпоративными системами здоровья' },
          { label: 'Маркетплейс услуг', value: '15% - Комиссия от партнёрских услуг' },
          { label: 'Данные и аналитика', value: '10% - Анонимизированные данные для исследований' },
        ]),
      },
      {
        title: 'Unit Economics',
        content: createListWithStrong([
          { label: 'CAC (Cost of Acquisition)', value: '$15' },
          { label: 'LTV (Lifetime Value)', value: '$450' },
          { label: 'LTV/CAC Ratio', value: '30x' },
          { label: 'Payback Period', value: '2.5 месяца' },
        ]),
      },
      {
        title: 'Прогнозы роста',
        content: `Прогнозируемый рост доходов: $2.5M (2025) → $8.2M (2026) → $25.5M (2027) → $68.3M (2028) → $156.7M (2029) → $320.5M (2030). Рост пользователей: 0.5M → 2.1M → 6.8M → 18.5M → 42.3M → 95.6M.`,
      },
      {
        title: 'Маржинальность',
        content: `Gross Margin: 78%, Operating Margin: 35%, Net Margin: 22%. Высокая маржинальность обеспечивается масштабируемостью платформы и низкими переменными затратами.`,
      },
    ],
    relatedLinks: [
      { label: 'Страница экономической модели', path: '/economic-model' },
    ],
  },

  'roadmap': {
    id: 'roadmap',
    title: 'Дорожная карта',
    subtitle: '5-летний план развития',
    description: `Дорожная карта EthosLife включает 5 основных фаз развития от MVP до глобального лидера в health-tech индустрии с выходом на IPO к 2030 году.`,
    sections: [
      {
        title: 'Фаза 1: MVP & Фундамент (Q1-Q2 2025)',
        content: createList([
          'Запуск MVP с 3 модулями здоровья',
          '10,000 первых пользователей',
          'Интеграция с 50 партнёрскими клиниками',
          'Базовая AI-диагностика',
          'Инвестиции: $500K',
        ]),
      },
      {
        title: 'Фаза 2: Расширение (Q3-Q4 2025)',
        content: createList([
          'Добавить 4 новых модуля здоровья',
          '100,000 активных пользователей',
          'Интеграция с 200 клиниками',
          'Маркетплейс услуг',
          'Инвестиции: $1.5M',
        ]),
      },
      {
        title: 'Фаза 3: Масштабирование (H1 2026)',
        content: createList([
          'Полная экосистема 7 модулей',
          '1 миллион пользователей',
          'Интеграция с 1000 партнёров',
          'Расширение на новые рынки',
          'Инвестиции: $5M',
        ]),
      },
      {
        title: 'Фаза 4: Глобализация (H2 2026-2027)',
        content: createList([
          'Запуск в 15 странах',
          '10 миллионов пользователей',
          'Интеграция с 5000 партнёров',
          'Локализация контента',
          'Инвестиции: $15M',
        ]),
      },
      {
        title: 'Фаза 5: Лидерство (2028-2030)',
        content: createList([
          'Выход на IPO',
          '100 миллионов пользователей',
          'Глобальный лидер в health-tech',
          'Расширение в смежные рынки',
          'Инвестиции: $50M',
        ]),
      },
    ],
    relatedLinks: [
      { label: 'Страница дорожной карты', path: '/roadmap' },
    ],
  },

  'investment': {
    id: 'investment',
    title: 'Инвестиции',
    subtitle: 'Раунды финансирования и стратегия выхода',
    description: `EthosLife планирует серию раундов финансирования для масштабирования платформы, с четкой стратегией выхода через IPO к 2030 году с оценкой $3-5B.`,
    sections: [
      {
        title: 'Раунды финансирования',
        content: createListWithStrong([
          { label: 'Seed', value: '$500K @ $5M valuation (Q2 2025) - MVP разработка, команда, маркетинг' },
          { label: 'Series A', value: '$2M @ $20M valuation (Q4 2025) - Масштабирование, партнёрства, продукт' },
          { label: 'Series B', value: '$10M @ $100M valuation (H2 2026) - Глобализация, команда, маркетинг' },
          { label: 'Series C', value: '$25M @ $300M valuation (2027) - Расширение, аквизиции, инфраструктура' },
          { label: 'Series D', value: '$35M @ $800M valuation (2028-2029) - IPO подготовка, глобальная сеть' },
        ]),
      },
      {
        title: 'Стратегия выхода',
        content: createListWithStrong([
          { label: 'IPO', value: '2030, оценка $3-5B, вероятность 85%' },
          { label: 'Acquisition', value: '2028-2029, оценка $1-2B, вероятность 60%' },
          { label: 'Secondary Sale', value: '2027-2028, оценка $500M-1B, вероятность 40%' },
        ]),
      },
      {
        title: 'Использование средств',
        content: `Средства направляются на разработку продукта (40%), маркетинг и привлечение пользователей (30%), команду и операции (20%), инфраструктуру и технологии (10%).`,
      },
      {
        title: 'Риски и митигация',
        content: `Основные риски: конкуренция (65%), регуляция (45%), технология (30%), рынок (25%), команда (15%). Для каждого риска разработаны стратегии митигации.`,
      },
    ],
    relatedLinks: [
      { label: 'Страница инвестиций', path: '/investment' },
    ],
  },

  // How It Works Features
  'unified-bio-profile': {
    id: 'unified-bio-profile',
    title: 'Единый биопрофиль',
    subtitle: 'Централизованная система управления всеми данными о здоровье',
    description: `Единый биопрофиль — это сердце платформы EthosLife, объединяющее все данные о здоровье пользователя в одном месте. Профиль включает биометрические показатели, медицинскую историю, результаты анализов, данные с устройств, цели и прогресс по всем аспектам здоровья.`,
    sections: [
      {
        title: 'Основные метрики',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Биопрофиль содержит все ключевые показатели здоровья, которые обновляются в реальном времени из различных источников.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Биометрические данные:'), ' Возраст, рост, вес, ИМТ, процент жира, мышечная масса'),
            React.createElement('li', null, React.createElement('strong', null, 'Витальные показатели:'), ' Артериальное давление, пульс, температура, сатурация кислорода'),
            React.createElement('li', null, React.createElement('strong', null, 'Лабораторные анализы:'), ' Все результаты анализов с динамикой и нормативными диапазонами'),
            React.createElement('li', null, React.createElement('strong', null, 'Активность:'), ' Шаги, калории, тренировки, VO2 max, HRV'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Длительность, качество, фазы сна, циркадные ритмы'),
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Калории, БЖУ, витамины, минералы, дефициты'),
            React.createElement('li', null, React.createElement('strong', null, 'Ментальное здоровье:'), ' Настроение, стресс, эмоциональное состояние')
          )
        ),
      },
      {
        title: 'Источники данных',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Данные в биопрофиль поступают из множества источников, создавая полную картину здоровья.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Носимые устройства:'), ' Apple Watch, Garmin, Fitbit, Oura Ring, Whoop'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицинские учреждения:'), ' Клиники, лаборатории через FHIR/HL7'),
            React.createElement('li', null, React.createElement('strong', null, 'Ручной ввод:'), ' Пользователь может добавлять данные вручную'),
            React.createElement('li', null, React.createElement('strong', null, 'Модули платформы:'), ' Данные из всех модулей здоровья автоматически синхронизируются'),
            React.createElement('li', null, React.createElement('strong', null, 'Интеграции:'), ' Google Fit, Apple HealthKit, MyFitnessPal и другие')
          )
        ),
      },
      {
        title: 'Визуализация и аналитика',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Биопрофиль предоставляет интуитивные инструменты для визуализации и анализа данных.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Интерактивные графики:'), ' Динамика показателей во времени с возможностью фильтрации'),
            React.createElement('li', null, React.createElement('strong', null, 'Дашборды:'), ' Персонализированные дашборды с ключевыми метриками'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляционный анализ:'), ' Выявление связей между различными показателями'),
            React.createElement('li', null, React.createElement('strong', null, 'Тренды и прогнозы:'), ' AI-анализ трендов и прогнозирование изменений'),
            React.createElement('li', null, React.createElement('strong', null, 'Экспорт данных:'), ' Возможность экспорта профиля в различных форматах')
          )
        ),
      },
    ],
  },

  'flexible-analysis': {
    id: 'flexible-analysis',
    title: 'Гибкий анализ и планирование',
    subtitle: 'AI-генерация персонализированных планов оздоровления',
    description: `Система гибкого анализа использует передовые алгоритмы искусственного интеллекта для создания оптимальных персональных планов оздоровления на основе ваших данных, целей, ограничений и медицинских показаний. Планы адаптируются в реальном времени на основе вашего прогресса.`,
    sections: [
      {
        title: 'Процесс создания плана',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `AI-система проходит многоэтапный процесс для создания максимально персонализированного плана.`),
          React.createElement('ol', { className: 'space-y-2 list-decimal list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Сбор данных:'), ' Анализ всех данных из биопрофиля, модулей здоровья и интеграций'),
            React.createElement('li', null, React.createElement('strong', null, 'Определение целей:'), ' Выявление ваших целей (похудение, набор массы, улучшение здоровья)'),
            React.createElement('li', null, React.createElement('strong', null, 'Оценка ограничений:'), ' Учет медицинских противопоказаний, аллергий, временных ограничений'),
            React.createElement('li', null, React.createElement('strong', null, 'Анализ паттернов:'), ' Выявление корреляций и паттернов в ваших данных'),
            React.createElement('li', null, React.createElement('strong', null, 'Генерация плана:'), ' Создание комплексного плана с рекомендациями по всем аспектам'),
            React.createElement('li', null, React.createElement('strong', null, 'Адаптация:'), ' Постоянная корректировка плана на основе прогресса')
          )
        ),
      },
      {
        title: 'Компоненты плана',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Персонализированный план включает рекомендации по всем аспектам здоровья.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Персонализированные планы питания с рецептами и списками покупок'),
            React.createElement('li', null, React.createElement('strong', null, 'Тренировки:'), ' Программы тренировок с учетом уровня подготовки и целей'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Рекомендации по оптимизации режима сна и циркадных ритмов'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицина:'), ' Планы профилактики, скрининги, управление хроническими заболеваниями'),
            React.createElement('li', null, React.createElement('strong', null, 'Психология:'), ' Практики для улучшения ментального здоровья и управления стрессом'),
            React.createElement('li', null, React.createElement('strong', null, 'Отношения:'), ' Рекомендации по улучшению социальных связей')
          )
        ),
      },
    ],
  },
};

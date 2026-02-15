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
    title: 'Психоэмоциональное здоровье',
    subtitle: 'Комплексная система управления ментальным здоровьем и стрессом',
    description: `Модуль психологии помогает отслеживать ментальное здоровье, управлять стрессом и улучшать эмоциональное благополучие через различные инструменты и практики. Модуль использует AI для анализа эмоциональных паттернов и предоставления персонализированных рекомендаций.`,
    sections: [
      {
        title: 'Mood Tracking — Отслеживание настроения',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Ежедневное отслеживание настроения и эмоций с детальным анализом паттернов и триггеров.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Ежедневные записи:'), ' Быстрая оценка настроения по шкале и выбор эмоций'),
            React.createElement('li', null, React.createElement('strong', null, 'Эмоциональный календарь:'), ' Визуализация настроения во времени'),
            React.createElement('li', null, React.createElement('strong', null, 'Триггеры:'), ' Выявление факторов, влияющих на настроение'),
            React.createElement('li', null, React.createElement('strong', null, 'Паттерны:'), ' Анализ циклов и закономерностей в эмоциональном состоянии'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляции:'), ' Связь настроения с сном, активностью, питанием')
          )
        ),
      },
      {
        title: 'Стресс-индекс — Мониторинг стресса',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Комплексная система оценки и управления стрессом с выявлением источников и рекомендациями по снижению.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Оценка уровня:'), ' Ежедневная оценка уровня стресса по шкале'),
            React.createElement('li', null, React.createElement('strong', null, 'Источники стресса:'), ' Идентификация основных триггеров и источников'),
            React.createElement('li', null, React.createElement('strong', null, 'Физиологические показатели:'), ' Корреляция с HRV, пульсом, качеством сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации:'), ' Персонализированные советы по управлению стрессом'),
            React.createElement('li', null, React.createElement('strong', null, 'Предупреждение выгорания:'), ' Раннее выявление признаков выгорания')
          )
        ),
      },
      {
        title: 'Дневник мыслей — Рефлексия и анализ',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Инструмент для рефлексии, анализа эмоциональных паттернов и работы с негативными мыслями.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Свободное ведение:'), ' Запись мыслей и переживаний в свободной форме'),
            React.createElement('li', null, React.createElement('strong', null, 'Структурированные вопросы:'), ' Направляющие вопросы для глубокой рефлексии'),
            React.createElement('li', null, React.createElement('strong', null, 'Анализ паттернов:'), ' AI-анализ записей для выявления повторяющихся тем'),
            React.createElement('li', null, React.createElement('strong', null, 'Эмоциональные триггеры:'), ' Выявление ситуаций и мыслей, вызывающих негативные эмоции')
          )
        ),
      },
      {
        title: 'CBT-инструменты — Когнитивно-поведенческая терапия',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Научно обоснованные инструменты когнитивно-поведенческой терапии для работы с негативными мыслями и поведением.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Когнитивная реструктуризация:'), ' Работа с иррациональными убеждениями и мыслями'),
            React.createElement('li', null, React.createElement('strong', null, 'Поведенческие эксперименты:'), ' Проверка негативных убеждений через действия'),
            React.createElement('li', null, React.createElement('strong', null, 'Дневник мыслей:'), ' Структурированный анализ ситуаций, мыслей, эмоций и поведения'),
            React.createElement('li', null, React.createElement('strong', null, 'Техники релаксации:'), ' Прогрессивная мышечная релаксация, визуализация')
          )
        ),
      },
      {
        title: 'Breathwork модуль — Дыхательные практики',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Гайдированные дыхательные практики для снижения стресса, улучшения концентрации и расслабления.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Техники дыхания:'), ' Боксовое дыхание, 4-7-8, диафрагмальное дыхание'),
            React.createElement('li', null, React.createElement('strong', null, 'Аудио-гайды:'), ' Голосовые инструкции для правильного выполнения'),
            React.createElement('li', null, React.createElement('strong', null, 'Таймеры:'), ' Настраиваемые таймеры для различных практик'),
            React.createElement('li', null, React.createElement('strong', null, 'Эффективность:'), ' Отслеживание влияния практик на уровень стресса')
          )
        ),
      },
      {
        title: 'AI-анализ и персонализация',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Искусственный интеллект анализирует все данные модуля для выявления паттернов и предоставления персонализированных рекомендаций.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Эмоциональные триггеры:'), ' Выявление ситуаций и факторов, влияющих на настроение'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляции:'), ' Анализ связи между сном, активностью, питанием и ментальным здоровьем'),
            React.createElement('li', null, React.createElement('strong', null, 'Предсказание выгорания:'), ' Раннее выявление признаков выгорания и депрессии'),
            React.createElement('li', null, React.createElement('strong', null, 'Персонализированные рекомендации:'), ' Индивидуальные советы на основе ваших данных'),
            React.createElement('li', null, React.createElement('strong', null, 'Оптимизация практик:'), ' Рекомендации по наиболее эффективным для вас техникам')
          )
        ),
      },
    ],
  },

  'sleep-module': {
    id: 'sleep-module',
    title: 'Сон',
    subtitle: 'Комплексная система оптимизации качества сна и циркадных ритмов',
    description: `Модуль сна помогает отслеживать качество и продолжительность сна, анализировать циркадные ритмы и предоставляет персонализированные рекомендации по оптимизации режима. Качественный сон — основа здоровья, и модуль помогает достичь оптимального восстановления.`,
    sections: [
      {
        title: 'Трекинг сна — Отслеживание качества и длительности',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Комплексное отслеживание всех аспектов сна с детальной аналитикой.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Длительность:'), ' Общее время сна, время в постели, эффективность сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Качество:'), ' Оценка качества сна на основе различных метрик'),
            React.createElement('li', null, React.createElement('strong', null, 'Фазы сна:'), ' REM, Deep, Light сон с процентным соотношением'),
            React.createElement('li', null, React.createElement('strong', null, 'Пробуждения:'), ' Количество и длительность ночных пробуждений'),
            React.createElement('li', null, React.createElement('strong', null, 'Время засыпания:'), ' Время, необходимое для засыпания'),
            React.createElement('li', null, React.createElement('strong', null, 'Время подъема:'), ' Оптимальное время пробуждения в фазе легкого сна')
          )
        ),
      },
      {
        title: 'Анализ циркадных ритмов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Отслеживание и оптимизация циркадных ритмов для синхронизации с естественными биологическими часами.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Хронотип:'), ' Определение вашего типа (жаворонок, сова, голубь)'),
            React.createElement('li', null, React.createElement('strong', null, 'Циркадный профиль:'), ' Анализ ваших естественных ритмов бодрствования и сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Оптимальное время сна:'), ' Рекомендации по времени отхода ко сну и пробуждения'),
            React.createElement('li', null, React.createElement('strong', null, 'Световая терапия:'), ' Рекомендации по воздействию света для синхронизации ритмов'),
            React.createElement('li', null, React.createElement('strong', null, 'Джетлаг:'), ' Помощь в адаптации при смене часовых поясов')
          )
        ),
      },
      {
        title: 'Гигиена сна — Рекомендации по оптимизации',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Персонализированные рекомендации по улучшению качества сна на основе ваших данных и образа жизни.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Режим:'), ' Рекомендации по установлению регулярного режима сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Окружение:'), ' Советы по оптимизации спальни (температура, свет, шум)'),
            React.createElement('li', null, React.createElement('strong', null, 'Ритуалы:'), ' Персонализированные вечерние ритуалы для подготовки ко сну'),
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Рекомендации по времени и составу последнего приема пищи'),
            React.createElement('li', null, React.createElement('strong', null, 'Активность:'), ' Оптимальное время тренировок для улучшения сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Экранное время:'), ' Рекомендации по ограничению синего света перед сном')
          )
        ),
      },
      {
        title: 'Интеграция с трекерами сна',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Автоматическая синхронизация данных с различными трекерами сна для точного анализа.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Носимые устройства:'), ' Apple Watch, Oura Ring, Whoop, Fitbit'),
            React.createElement('li', null, React.createElement('strong', null, 'Матрасы и подушки:'), ' Умные матрасы с датчиками движения и дыхания'),
            React.createElement('li', null, React.createElement('strong', null, 'Приложения:'), ' Sleep Cycle, Pillow, AutoSleep'),
            React.createElement('li', null, React.createElement('strong', null, 'Ручной ввод:'), ' Возможность добавления данных вручную')
          )
        ),
      },
      {
        title: 'Корреляционный анализ',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Анализ влияния различных факторов на качество сна для выявления паттернов и оптимизации.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Активность:'), ' Влияние тренировок на качество сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Связь между рационом и сном'),
            React.createElement('li', null, React.createElement('strong', null, 'Стресс:'), ' Корреляция между уровнем стресса и качеством сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицина:'), ' Влияние лекарств и медицинских показателей на сон')
          )
        ),
      },
    ],
  },

  'relationships-module': {
    id: 'relationships-module',
    title: 'Социальное здоровье и отношения',
    subtitle: 'Комплексная система управления социальными связями и отношениями',
    description: `Модуль отношений помогает отслеживать качество социальных связей, управлять отношениями и улучшать социальное благополучие. Крепкие социальные связи продлевают жизнь и улучшают психологическое благополучие, и модуль помогает их развивать и поддерживать.`,
    sections: [
      {
        title: 'Оценка качества отношений',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Система оценки и мониторинга качества различных типов отношений в вашей жизни.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Типы отношений:'), ' Семья, друзья, романтические, коллеги, сообщество'),
            React.createElement('li', null, React.createElement('strong', null, 'Метрики качества:'), ' Уровень поддержки, близости, конфликтов, удовлетворенности'),
            React.createElement('li', null, React.createElement('strong', null, 'Временная динамика:'), ' Отслеживание изменений в отношениях во времени'),
            React.createElement('li', null, React.createElement('strong', null, 'Триггеры:'), ' Выявление факторов, влияющих на качество отношений')
          )
        ),
      },
      {
        title: 'Социальная активность',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Отслеживание и мотивация к социальной активности для поддержания связей.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Встречи:'), ' Календарь встреч с друзьями и семьей'),
            React.createElement('li', null, React.createElement('strong', null, 'Социальные события:'), ' Участие в мероприятиях и активностях'),
            React.createElement('li', null, React.createElement('strong', null, 'Коммуникация:'), ' Отслеживание частоты и качества общения'),
            React.createElement('li', null, React.createElement('strong', null, 'Напоминания:'), ' Уведомления о необходимости поддержать связь')
          )
        ),
      },
      {
        title: 'Группы поддержки и сообщества',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Подключение к тематическим сообществам и группам поддержки для обмена опытом и мотивации.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Тематические сообщества:'), ' Группы по интересам, целям, заболеваниям'),
            React.createElement('li', null, React.createElement('strong', null, 'Группы поддержки:'), ' Сообщества для взаимной поддержки и обмена опытом'),
            React.createElement('li', null, React.createElement('strong', null, 'Модерация:'), ' Профессиональная модерация для безопасной среды'),
            React.createElement('li', null, React.createElement('strong', null, 'Анонимность:'), ' Возможность участия анонимно при необходимости')
          )
        ),
      },
      {
        title: 'Совместные челленджи',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Мотивация через совместные челленджи с друзьями и сообществом.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Групповые цели:'), ' Совместные цели с друзьями и семьей'),
            React.createElement('li', null, React.createElement('strong', null, 'Соревнования:'), ' Дружеские соревнования для мотивации'),
            React.createElement('li', null, React.createElement('strong', null, 'Поддержка:'), ' Взаимная поддержка и поощрение'),
            React.createElement('li', null, React.createElement('strong', null, 'Награды:'), ' Совместные награды за достижение целей')
          )
        ),
      },
      {
        title: 'Семейные и романтические отношения',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Специализированные инструменты для улучшения семейных и романтических отношений.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Тесты совместимости:'), ' Оценка совместимости в отношениях'),
            React.createElement('li', null, React.createElement('strong', null, 'Упражнения на доверие:'), ' Практики для укрепления доверия'),
            React.createElement('li', null, React.createElement('strong', null, 'Советы психолога:'), ' Рекомендации от специалистов по отношениям'),
            React.createElement('li', null, React.createElement('strong', null, 'Календарь важных дат:'), ' Напоминания о важных событиях в отношениях')
          )
        ),
      },
    ],
  },

  'spirituality-module': {
    id: 'spirituality-module',
    title: 'Привычки, хобби и жизненная философия',
    subtitle: 'Личностный рост, смысл жизни и формирование здоровых привычек',
    description: `Модуль духовности поддерживает личностный рост, рефлексию и поиск смысла жизни через различные практики и инструменты. Наличие четких целей и увлечений замедляет старение мозга и продлевает жизнь.`,
    sections: [
      {
        title: 'Медитация и осознанность',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Гайдированные практики медитации и осознанности для развития внимательности и внутреннего покоя.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Типы медитации:'), ' Mindfulness, трансцендентальная, любящей доброты, сканирование тела'),
            React.createElement('li', null, React.createElement('strong', null, 'Аудио-гайды:'), ' Голосовые инструкции для различных практик'),
            React.createElement('li', null, React.createElement('strong', null, 'Таймеры:'), ' Настраиваемые таймеры для сессий медитации'),
            React.createElement('li', null, React.createElement('strong', null, 'Прогресс:'), ' Отслеживание регулярности и длительности практик'),
            React.createElement('li', null, React.createElement('strong', null, 'Эффекты:'), ' Анализ влияния медитации на настроение и стресс')
          )
        ),
      },
      {
        title: 'Дневник рефлексии',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Инструмент для глубокой рефлексии, самоанализа и личностного роста.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Ежедневная рефлексия:'), ' Вопросы для ежедневного самоанализа'),
            React.createElement('li', null, React.createElement('strong', null, 'Недельные обзоры:'), ' Подведение итогов недели и планирование'),
            React.createElement('li', null, React.createElement('strong', null, 'Годовые рефлексии:'), ' Глубокий анализ года и постановка целей'),
            React.createElement('li', null, React.createElement('strong', null, 'Темы для размышлений:'), ' Направляющие вопросы о смысле, ценностях, целях')
          )
        ),
      },
      {
        title: 'Практики благодарности',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Систематические практики благодарности для улучшения психологического благополучия.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Дневник благодарности:'), ' Ежедневная запись того, за что вы благодарны'),
            React.createElement('li', null, React.createElement('strong', null, 'Напоминания:'), ' Уведомления для регулярной практики'),
            React.createElement('li', null, React.createElement('strong', null, 'Темы:'), ' Направляющие темы для размышлений о благодарности'),
            React.createElement('li', null, React.createElement('strong', null, 'Эффекты:'), ' Отслеживание влияния практики на настроение')
          )
        ),
      },
      {
        title: 'Поиск смысла и целей',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Инструменты для определения жизненных ценностей, смысла и постановки долгосрочных целей.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Ценности:'), ' Определение и ранжирование личных ценностей'),
            React.createElement('li', null, React.createElement('strong', null, 'Миссия:'), ' Формулирование личной миссии и видения'),
            React.createElement('li', null, React.createElement('strong', null, 'Долгосрочные цели:'), ' Постановка и планирование жизненных целей'),
            React.createElement('li', null, React.createElement('strong', null, 'Видение будущего:'), ' Визуализация желаемого будущего')
          )
        ),
      },
      {
        title: 'Ежедневник привычек',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Система формирования и отслеживания здоровых привычек с наградами за соблюдение.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Трекинг привычек:'), ' Ежедневное отслеживание выполнения привычек'),
            React.createElement('li', null, React.createElement('strong', null, 'Стрики:'), ' Отслеживание последовательных дней выполнения'),
            React.createElement('li', null, React.createElement('strong', null, 'Награды:'), ' Система наград за соблюдение привычек'),
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации:'), ' Персонализированные советы по формированию привычек'),
            React.createElement('li', null, React.createElement('strong', null, 'Группы привычек:'), ' Объединение связанных привычек для комплексного подхода')
          )
        ),
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

  'goal-tracking': {
    id: 'goal-tracking',
    title: 'Отслеживание целей и прогресса',
    subtitle: 'Система управления целями с метриками и критериями успеха',
    description: `Платформа помогает ставить, отслеживать и достигать целей в области здоровья, разбивая большие цели на управляемые задачи с четкими метриками и критериями успеха. Система мотивирует и поддерживает на пути к достижению целей.`,
    sections: [
      {
        title: 'Типы целей',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Платформа поддерживает различные типы целей во всех аспектах здоровья.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Физические цели:'), ' Похудение, набор массы, улучшение выносливости, сила'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицинские цели:'), ' Снижение давления, нормализация сахара, улучшение анализов'),
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Изменение рациона, восполнение дефицитов, соблюдение диеты'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Улучшение качества сна, нормализация режима'),
            React.createElement('li', null, React.createElement('strong', null, 'Ментальное здоровье:'), ' Снижение стресса, улучшение настроения, управление тревогой'),
            React.createElement('li', null, React.createElement('strong', null, 'Привычки:'), ' Формирование здоровых привычек, отказ от вредных')
          )
        ),
      },
      {
        title: 'SMART-цели',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Система помогает формулировать цели по методологии SMART (Specific, Measurable, Achievable, Relevant, Time-bound).`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Конкретность:'), ' Четкое определение того, что вы хотите достичь'),
            React.createElement('li', null, React.createElement('strong', null, 'Измеримость:'), ' Метрики для отслеживания прогресса'),
            React.createElement('li', null, React.createElement('strong', null, 'Достижимость:'), ' Реалистичные цели с учетом ваших возможностей'),
            React.createElement('li', null, React.createElement('strong', null, 'Релевантность:'), ' Цели, важные для вашего здоровья и благополучия'),
            React.createElement('li', null, React.createElement('strong', null, 'Временные рамки:'), ' Четкие дедлайны для достижения целей')
          )
        ),
      },
      {
        title: 'Разбиение на задачи',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Большие цели автоматически разбиваются на небольшие управляемые задачи с промежуточными вехами.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Микро-цели:'), ' Ежедневные и еженедельные задачи для достижения цели'),
            React.createElement('li', null, React.createElement('strong', null, 'Вехи:'), ' Промежуточные этапы с наградами за достижение'),
            React.createElement('li', null, React.createElement('strong', null, 'Чеклисты:'), ' Списки действий для выполнения задач'),
            React.createElement('li', null, React.createElement('strong', null, 'Напоминания:'), ' Уведомления о необходимости выполнить задачи'),
            React.createElement('li', null, React.createElement('strong', null, 'Прогресс-бары:'), ' Визуализация прогресса к цели')
          )
        ),
      },
      {
        title: 'Мотивация и награды',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Система мотивирует через геймификацию и социальные элементы.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Бейджи и достижения:'), ' Награды за выполнение целей и задач'),
            React.createElement('li', null, React.createElement('strong', null, 'Токены:'), ' Внутренняя валюта за достижения, которую можно потратить на услуги'),
            React.createElement('li', null, React.createElement('strong', null, 'Стрики:'), ' Отслеживание последовательных дней выполнения'),
            React.createElement('li', null, React.createElement('strong', null, 'Социальная поддержка:'), ' Возможность делиться достижениями и получать поддержку'),
            React.createElement('li', null, React.createElement('strong', null, 'Лидерборды:'), ' Соревновательные элементы для мотивации')
          )
        ),
      },
    ],
  },

  'specialist-search': {
    id: 'specialist-search',
    title: 'Персональный поиск специалистов',
    subtitle: 'Умная система поиска врачей, тренеров и специалистов',
    description: `Умная система поиска врачей, тренеров, диетологов, психологов и других специалистов с фильтрами по методикам, специализации, рейтингам и отзывам. Система учитывает ваши потребности и предпочтения для подбора оптимального специалиста.`,
    sections: [
      {
        title: 'Типы специалистов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Платформа объединяет широкую сеть специалистов в различных областях здоровья.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Врачи:'), ' Терапевты, кардиологи, эндокринологи, неврологи и другие специалисты'),
            React.createElement('li', null, React.createElement('strong', null, 'Психологи:'), ' Различные направления психологии (CBT, гештальт, психоанализ)'),
            React.createElement('li', null, React.createElement('strong', null, 'Тренеры:'), ' Фитнес-тренеры, персональные тренеры, инструкторы'),
            React.createElement('li', null, React.createElement('strong', null, 'Нутрициологи:'), ' Диетологи, нутрициологи, специалисты по питанию'),
            React.createElement('li', null, React.createElement('strong', null, 'Wellness-специалисты:'), ' Массажисты, остеопаты, физиотерапевты')
          )
        ),
      },
      {
        title: 'Умные фильтры',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Мощная система фильтрации для точного подбора специалиста под ваши потребности.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Специализация:'), ' Фильтр по области специализации и методикам'),
            React.createElement('li', null, React.createElement('strong', null, 'Локация:'), ' Поиск по местоположению (онлайн/офлайн)'),
            React.createElement('li', null, React.createElement('strong', null, 'Рейтинг:'), ' Фильтр по рейтингу и количеству отзывов'),
            React.createElement('li', null, React.createElement('strong', null, 'Цена:'), ' Диапазон цен и форматы работы'),
            React.createElement('li', null, React.createElement('strong', null, 'Доступность:'), ' Расписание и доступные слоты'),
            React.createElement('li', null, React.createElement('strong', null, 'Языки:'), ' Языки общения специалиста')
          )
        ),
      },
      {
        title: 'Профили специалистов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Детальные профили специалистов с полной информацией для принятия решения.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Образование:'), ' Дипломы, сертификаты, дополнительное образование'),
            React.createElement('li', null, React.createElement('strong', null, 'Опыт:'), ' Годы практики, количество клиентов, специализация'),
            React.createElement('li', null, React.createElement('strong', null, 'Методики:'), ' Используемые подходы и техники'),
            React.createElement('li', null, React.createElement('strong', null, 'Отзывы:'), ' Реальные отзывы от пациентов и клиентов'),
            React.createElement('li', null, React.createElement('strong', null, 'Портфолио:'), ' Примеры работ и результатов')
          )
        ),
      },
      {
        title: 'AI-рекомендации',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Искусственный интеллект анализирует ваши потребности и рекомендует наиболее подходящих специалистов.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Анализ потребностей:'), ' Определение ваших потребностей на основе данных профиля'),
            React.createElement('li', null, React.createElement('strong', null, 'Персонализация:'), ' Учет ваших предпочтений и истории взаимодействий'),
            React.createElement('li', null, React.createElement('strong', null, 'Совместимость:'), ' Оценка совместимости со специалистом'),
            React.createElement('li', null, React.createElement('strong', null, 'Прогноз эффективности:'), ' Прогнозирование результатов работы со специалистом')
          )
        ),
      },
    ],
  },

  'subscription-services': {
    id: 'subscription-services',
    title: 'Система подписок на услуги',
    subtitle: 'Персонализированные программы подписки на оздоровительные услуги',
    description: `Персонализированные программы подписки на оздоровительные услуги: тренировки, массажи, физиопроцедуры, консультации. Система предлагает гибкие планы подписки с возможностью персонализации под ваши потребности и бюджет.`,
    sections: [
      {
        title: 'Типы подписок',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Различные форматы подписок для различных потребностей и бюджетов.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Тренировки:'), ' Онлайн и офлайн тренировки, персональные программы'),
            React.createElement('li', null, React.createElement('strong', null, 'Массажи:'), ' Различные виды массажа с гибким расписанием'),
            React.createElement('li', null, React.createElement('strong', null, 'Физиопроцедуры:'), ' Физиотерапия, остеопатия, мануальная терапия'),
            React.createElement('li', null, React.createElement('strong', null, 'Консультации:'), ' Регулярные консультации со специалистами'),
            React.createElement('li', null, React.createElement('strong', null, 'Комплексные программы:'), ' Комбинации различных услуг')
          )
        ),
      },
      {
        title: 'Персонализация',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Подписки адаптируются под ваши потребности, цели и прогресс.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'AI-подбор:'), ' Автоматический подбор оптимальных услуг на основе ваших данных'),
            React.createElement('li', null, React.createElement('strong', null, 'Адаптация:'), ' Изменение программы подписки на основе прогресса'),
            React.createElement('li', null, React.createElement('strong', null, 'Гибкость:'), ' Возможность изменения частоты и типа услуг'),
            React.createElement('li', null, React.createElement('strong', null, 'Приоритизация:'), ' Фокус на наиболее важных для вас услугах')
          )
        ),
      },
      {
        title: 'Управление подпиской',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Удобное управление подпиской с полным контролем над услугами и расписанием.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Календарь:'), ' Управление расписанием сессий и процедур'),
            React.createElement('li', null, React.createElement('strong', null, 'Отмена и перенос:'), ' Гибкая система отмены и переноса'),
            React.createElement('li', null, React.createElement('strong', null, 'История:'), ' Полная история использованных услуг'),
            React.createElement('li', null, React.createElement('strong', null, 'Оплата:'), ' Прозрачная система оплаты с различными методами')
          )
        ),
      },
    ],
  },

  'partnerships': {
    id: 'partnerships',
    title: 'Коллаборации и партнёрства',
    subtitle: 'Интеграция с сетью фитнес-клубов, клиник и wellness-центров',
    description: `Интеграция с широкой сетью фитнес-клубов, клиник, wellness-центров и других партнёров. Пользователи получают эксклюзивные скидки, бонусы и привилегии, а партнёры получают доступ к целевой аудитории.`,
    sections: [
      {
        title: 'Типы партнёрств',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Разнообразная сеть партнёров во всех сферах здоровья и wellness.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Фитнес-клубы:'), ' Скидки на абонементы, персональные тренировки'),
            React.createElement('li', null, React.createElement('strong', null, 'Клиники:'), ' Приоритетная запись, скидки на услуги'),
            React.createElement('li', null, React.createElement('strong', null, 'Wellness-центры:'), ' Спа, массажи, релаксация'),
            React.createElement('li', null, React.createElement('strong', null, 'Лаборатории:'), ' Скидки на анализы, приоритетная обработка'),
            React.createElement('li', null, React.createElement('strong', null, 'Аптеки:'), ' Скидки на лекарства и БАДы'),
            React.createElement('li', null, React.createElement('strong', null, 'Магазины здорового питания:'), ' Скидки на продукты и добавки')
          )
        ),
      },
      {
        title: 'Преимущества для пользователей',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Эксклюзивные преимущества и привилегии для пользователей платформы.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Скидки:'), ' Эксклюзивные скидки до 20-30% на услуги партнёров'),
            React.createElement('li', null, React.createElement('strong', null, 'Бонусы:'), ' Дополнительные бонусы и привилегии'),
            React.createElement('li', null, React.createElement('strong', null, 'Приоритет:'), ' Приоритетная запись и обслуживание'),
            React.createElement('li', null, React.createElement('strong', null, 'Токены:'), ' Возможность оплаты токенами платформы'),
            React.createElement('li', null, React.createElement('strong', null, 'Персонализация:'), ' Рекомендации партнёров на основе ваших потребностей')
          )
        ),
      },
      {
        title: 'Преимущества для партнёров',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Партнёры получают доступ к целевой аудитории и инструментам для роста бизнеса.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Целевая аудитория:'), ' Доступ к пользователям с конкретными потребностями'),
            React.createElement('li', null, React.createElement('strong', null, 'Маркетинг:'), ' Продвижение в приложении и рекомендации AI'),
            React.createElement('li', null, React.createElement('strong', null, 'Аналитика:'), ' Данные о предпочтениях и поведении клиентов'),
            React.createElement('li', null, React.createElement('strong', null, 'Управление:'), ' Инструменты для управления бронированиями и клиентами')
          )
        ),
      },
    ],
  },

  'device-integration': {
    id: 'device-integration',
    title: 'Интеграция с гаджетами',
    subtitle: 'Синхронизация с умными устройствами для сбора объективных данных',
    description: `Синхронизация с умными браслетами, часами, трекерами сна и медицинскими девайсами для автоматического сбора объективных данных о здоровье. Все данные автоматически интегрируются в единый биопрофиль.`,
    sections: [
      {
        title: 'Поддерживаемые устройства',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Широкая поддержка всех основных типов устройств для отслеживания здоровья.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Умные часы:'), ' Apple Watch, Garmin, Samsung Galaxy Watch, Polar, Fitbit'),
            React.createElement('li', null, React.createElement('strong', null, 'Фитнес-трекеры:'), ' Fitbit, Xiaomi Mi Band, Huawei Band, Honor Band'),
            React.createElement('li', null, React.createElement('strong', null, 'Кольца:'), ' Oura Ring, Motiv Ring, Circular'),
            React.createElement('li', null, React.createElement('strong', null, 'Трекеры сна:'), ' Sleep Cycle, Withings Sleep, Tempur'),
            React.createElement('li', null, React.createElement('strong', null, 'Медицинские устройства:'), ' Глюкометры, тонометры, весы, термометры'),
            React.createElement('li', null, React.createElement('strong', null, 'Специализированные:'), ' Whoop, Polar H10, Garmin HRM')
          )
        ),
      },
      {
        title: 'Типы данных',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Автоматический сбор широкого спектра данных о здоровье.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Активность:'), ' Шаги, расстояние, калории, активные минуты'),
            React.createElement('li', null, React.createElement('strong', null, 'Сердце:'), ' Пульс, HRV, пульсовые зоны, ЭКГ'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Длительность, фазы, качество, циркадные ритмы'),
            React.createElement('li', null, React.createElement('strong', null, 'Дыхание:'), ' Частота дыхания, сатурация кислорода'),
            React.createElement('li', null, React.createElement('strong', null, 'Температура:'), ' Температура тела, кожи'),
            React.createElement('li', null, React.createElement('strong', null, 'Вес и состав тела:'), ' Вес, процент жира, мышечная масса')
          )
        ),
      },
      {
        title: 'Автоматическая синхронизация',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Беспроблемная автоматическая синхронизация данных в реальном времени.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'OAuth интеграция:'), ' Безопасное подключение через OAuth 2.0'),
            React.createElement('li', null, React.createElement('strong', null, 'Реальное время:'), ' Данные обновляются автоматически при появлении'),
            React.createElement('li', null, React.createElement('strong', null, 'История:'), ' Полная история данных с возможностью экспорта'),
            React.createElement('li', null, React.createElement('strong', null, 'Приватность:'), ' Полный контроль пользователя над данными')
          )
        ),
      },
    ],
  },

  'knowledge-library': {
    id: 'knowledge-library',
    title: 'Библиотека знаний',
    subtitle: 'Обширная библиотека статей, исследований и рекомендаций экспертов',
    description: `Обширный раздел с актуальной библиотекой статей, исследований, рекомендаций экспертов и образовательных материалов по всем аспектам здоровья. Контент регулярно обновляется и проверяется специалистами.`,
    sections: [
      {
        title: 'Типы контента',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Разнообразный образовательный контент для всех уровней знаний.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Статьи:'), ' Научно-популярные статьи по различным темам здоровья'),
            React.createElement('li', null, React.createElement('strong', null, 'Исследования:'), ' Обзоры актуальных научных исследований'),
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации экспертов:'), ' Советы от ведущих специалистов'),
            React.createElement('li', null, React.createElement('strong', null, 'Видео:'), ' Образовательные видео и вебинары'),
            React.createElement('li', null, React.createElement('strong', null, 'Инфографика:'), ' Визуализация сложных концепций'),
            React.createElement('li', null, React.createElement('strong', null, 'Курсы:'), ' Структурированные образовательные курсы')
          )
        ),
      },
      {
        title: 'Темы и категории',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Контент охватывает все аспекты здоровья и wellness.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Медицина:'), ' Заболевания, профилактика, лечение, анализы'),
            React.createElement('li', null, React.createElement('strong', null, 'Питание:'), ' Диеты, нутриенты, рецепты, пищевые добавки'),
            React.createElement('li', null, React.createElement('strong', null, 'Фитнес:'), ' Тренировки, упражнения, восстановление'),
            React.createElement('li', null, React.createElement('strong', null, 'Психология:'), ' Ментальное здоровье, стресс, отношения'),
            React.createElement('li', null, React.createElement('strong', null, 'Сон:'), ' Гигиена сна, циркадные ритмы, расстройства сна'),
            React.createElement('li', null, React.createElement('strong', null, 'Долголетие:'), ' Антиэйдж, биохак, оптимизация здоровья')
          )
        ),
      },
      {
        title: 'Персонализация',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `AI рекомендует контент на основе ваших интересов, целей и текущих потребностей.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации:'), ' Персонализированные рекомендации статей и материалов'),
            React.createElement('li', null, React.createElement('strong', null, 'Актуальность:'), ' Контент, релевантный вашим текущим целям'),
            React.createElement('li', null, React.createElement('strong', null, 'Уровень сложности:'), ' Материалы под ваш уровень знаний'),
            React.createElement('li', null, React.createElement('strong', null, 'История:'), ' Отслеживание прочитанного и сохранение избранного')
          )
        ),
      },
    ],
  },

  'ai-personalization': {
    id: 'ai-personalization',
    title: 'ИИ-система и персонализация',
    subtitle: 'Искусственный интеллект для глубокого анализа и персонализации',
    description: `Искусственный интеллект анализирует медицинскую историю, генетические особенности, психологический профиль и все данные о здоровье для создания полностью персонализированного опыта. AI обеспечивает точность анализа на уровне 95% и постоянно обучается на новых данных.`,
    sections: [
      {
        title: 'Анализ данных',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Глубокий анализ всех данных о здоровье для выявления паттернов и корреляций.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Медицинская история:'), ' Анализ всех медицинских данных, анализов, диагнозов'),
            React.createElement('li', null, React.createElement('strong', null, 'Генетика:'), ' Учет генетических предрасположенностей и особенностей'),
            React.createElement('li', null, React.createElement('strong', null, 'Образ жизни:'), ' Анализ активности, питания, сна, стресса'),
            React.createElement('li', null, React.createElement('strong', null, 'Психологический профиль:'), ' Учет ментального здоровья и эмоциональных паттернов'),
            React.createElement('li', null, React.createElement('strong', null, 'Корреляции:'), ' Выявление связей между различными факторами')
          )
        ),
      },
      {
        title: 'Персонализация',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Полностью персонализированный опыт на основе ваших уникальных данных.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Планы:'), ' Индивидуальные планы питания, тренировок, восстановления'),
            React.createElement('li', null, React.createElement('strong', null, 'Рекомендации:'), ' Персонализированные рекомендации по всем аспектам'),
            React.createElement('li', null, React.createElement('strong', null, 'Контент:'), ' Подбор релевантного контента и материалов'),
            React.createElement('li', null, React.createElement('strong', null, 'Специалисты:'), ' Рекомендации наиболее подходящих специалистов'),
            React.createElement('li', null, React.createElement('strong', null, 'Адаптация:'), ' Постоянная адаптация на основе вашего прогресса')
          )
        ),
      },
      {
        title: 'Предиктивная аналитика',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Прогнозирование рисков и трендов для раннего вмешательства.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Риски заболеваний:'), ' Прогнозирование вероятности развития заболеваний'),
            React.createElement('li', null, React.createElement('strong', null, 'Выгорание:'), ' Предсказание выгорания и депрессии'),
            React.createElement('li', null, React.createElement('strong', null, 'Травмы:'), ' Выявление рисков травм и перетренированности'),
            React.createElement('li', null, React.createElement('strong', null, 'Тренды:'), ' Прогнозирование изменений в показателях здоровья')
          )
        ),
      },
    ],
  },

  'tokenomics': {
    id: 'tokenomics',
    title: 'Токеномика',
    subtitle: 'Внутренняя виртуальная валюта для упрощения расчётов в экосистеме',
    description: `Внутренняя виртуальная валюта — токены EthosLife (ETL), которые упрощают расчёты внутри экосистемы. Токены можно зарабатывать за активность и достижения, а также использовать для оплаты услуг партнёров и подписок.`,
    sections: [
      {
        title: 'Заработок токенов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Множество способов заработать токены за активность и достижения.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Ежедневная активность:'), ' Токены за ежедневное использование приложения'),
            React.createElement('li', null, React.createElement('strong', null, 'Достижения:'), ' Награды за выполнение целей и задач'),
            React.createElement('li', null, React.createElement('strong', null, 'Стрики:'), ' Бонусы за последовательные дни активности'),
            React.createElement('li', null, React.createElement('strong', null, 'Социальная активность:'), ' Токены за участие в сообществах и челленджах'),
            React.createElement('li', null, React.createElement('strong', null, 'Реферальная программа:'), ' Бонусы за приглашение друзей'),
            React.createElement('li', null, React.createElement('strong', null, 'Контент:'), ' Токены за создание и оценку контента')
          )
        ),
      },
      {
        title: 'Использование токенов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Токены можно использовать для оплаты различных услуг в экосистеме.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Услуги партнёров:'), ' Оплата услуг фитнес-клубов, клиник, wellness-центров'),
            React.createElement('li', null, React.createElement('strong', null, 'Подписки:'), ' Оплата подписок на услуги и контент'),
            React.createElement('li', null, React.createElement('strong', null, 'Консультации:'), ' Оплата консультаций со специалистами'),
            React.createElement('li', null, React.createElement('strong', null, 'Премиум функции:'), ' Доступ к расширенным функциям платформы'),
            React.createElement('li', null, React.createElement('strong', null, 'Товары:'), ' Покупка товаров в партнёрских магазинах')
          )
        ),
      },
      {
        title: 'Экономика токенов',
        content: React.createElement('div', { className: 'space-y-3' },
          React.createElement('p', null, `Сбалансированная экономика токенов для устойчивого развития экосистемы.`),
          React.createElement('ul', { className: 'space-y-2 list-disc list-inside ml-4' },
            React.createElement('li', null, React.createElement('strong', null, 'Ограниченная эмиссия:'), ' Контролируемая эмиссия для поддержания ценности'),
            React.createElement('li', null, React.createElement('strong', null, 'Сжигание:'), ' Часть токенов сжигается при использовании'),
            React.createElement('li', null, React.createElement('strong', null, 'Стейкинг:'), ' Возможность стейкинга для дополнительных наград'),
            React.createElement('li', null, React.createElement('strong', null, 'Дефляционная модель:'), ' Модель, способствующая росту ценности токена')
          )
        ),
      },
    ],
  },
};

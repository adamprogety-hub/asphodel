// Структурированные данные Schema.org для V.R. Asphodel
// Типы: ProfessionalService + WebSite + FAQPage + Person

const BASE_URL = 'https://vr-asphodel.ru'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#organization`,
  name: 'V.R. Asphodel',
  description: 'Разработка продающих сайтов на Next.js и настройка контекстной рекламы в Яндекс Директ под ключ для предпринимателей.',
  url: BASE_URL,
  telephone: '+79999910313',
  email: 'a.gerasimov.marketing@yandex.ru',
  priceRange: 'от 115 000 ₽',
  currenciesAccepted: 'RUB',
  paymentAccepted: 'Перевод, Расчётный счёт',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+79999910313',
    contactType: 'customer service',
    availableLanguage: 'Russian',
  },
  founder: [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#ilya`,
      name: 'Илья Хаймин',
      jobTitle: 'Бренд-менеджер',
      worksFor: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#alexander`,
      name: 'Александр Герасимов',
      jobTitle: 'Маркетолог',
      worksFor: { '@id': `${BASE_URL}/#organization` },
    },
  ],
  sameAs: [
    'https://t.me/AGerasimov_Marketing',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '7',
    reviewCount: '7',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Марина К.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Обратились в апреле — нужно было успеть к началу дачного сезона. Сделали промо-сайт и запустили рекламу за 12 дней. Звонки пошли буквально на следующий день после запуска, причём клиенты именно те, кто нам нужен — с большими участками.',
      name: 'Служба дезинфекции участков',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Алексей Н.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'У нас специфический B2B-продукт — другие агентства либо не понимали технику, либо писали какую-то воду. Эти ребята сами разобрались в спецификациях. За три месяца пришло несколько крупных промышленных заказчиков.',
      name: 'Производство шкафов автоматики',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Ольга В.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Нам нужна была реклама на уборку помещений после ЧП. Ребята правильно настроили объявления под этот сценарий. Звонки пошли в первые же дни. Бюджет уходит напрямую в Яндекс — расходы полностью прозрачны.',
      name: 'Аварийная клининговая служба',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Дмитрий Р.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Старый сайт на WordPress взломали. Сделали новый на Next.js, объяснили почему он защищён. Заодно перенастроили Директ. Сейчас заявок раза в два больше, чем было до взлома.',
      name: 'Натяжные потолки',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Светлана Г.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Взяли лендинг под услугу имплантации и контекст. Первые записи пошли в конце первой недели. Мне показывали отчёт и объясняли каждую цифру — я впервые понимала за что плачу.',
      name: 'Частная стоматология',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Игорь М.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Пришли на аудит — ребята за час нашли три серьёзные ошибки в кампаниях и объяснили почему бюджет сливался. Переделали всё с нуля. Через месяц заявки стали приходить регулярно.',
      name: 'Грузоперевозки по региону',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Анна Ф.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Делали лендинг под набор на курсы английского. Думали вместе над текстами, объясняли что важно для конверсии. Запустили рекламу перед сентябрём, группы закрыли за три недели.',
      name: 'Школа иностранных языков',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги по разработке сайтов и рекламе',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Дизайн сайта',
          description: 'UI/UX-дизайн, прототип и визуальная концепция под задачу бизнеса.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Разработка сайта под ключ',
          description: 'Полный цикл: дизайн, вёрстка на Next.js, запуск и передача клиенту.',
        },
        price: '175000',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Лендинг',
          description: 'Одностраничный продающий сайт под конкретный продукт или услугу.',
        },
        price: '115000',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Настройка рекламы Яндекс Директ',
          description: 'Настройка и ведение контекстных кампаний для потока целевых заявок.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO-продвижение',
          description: 'Органический рост трафика: структура, тексты, техническая оптимизация.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Аудит и стратегия',
          description: 'Анализ конкурентов, формирование УТП и позиционирования.',
        },
      },
    ],
  },
}

const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'V.R. Asphodel',
  url: BASE_URL,
  description: 'Разработка сайтов на Next.js и настройка рекламы в Яндекс Директ под ключ',
  publisher: { '@id': `${BASE_URL}/#organization` },
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Сколько стоит сайт?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Лендинг — от 115 000 ₽, мультистраничный — от 175 000 ₽. Точную стоимость обсуждаем на созвоне — она зависит от объёма и задачи.',
      },
    },
    {
      '@type': 'Question',
      name: 'Рекламный бюджет входит в стоимость?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Нет, всегда отдельно. Рекламный бюджет вы оплачиваете напрямую в Яндекс или VK — не через нас. Мы берём только за настройку и ведение.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько занимает разработка сайта?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Лендинг — 7–14 рабочих дней. Мультистраничный — от 3 недель. Дедлайн фиксируем в договоре.',
      },
    },
    {
      '@type': 'Question',
      name: 'Вы работаете по договору?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, всегда. Прописываем что делаем, сроки, стоимость и количество итераций правок. Без устных договорённостей.',
      },
    },
    {
      '@type': 'Question',
      name: 'Что от меня нужно?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Рассказать о бизнесе, предоставить материалы (фото, лого если есть), давать обратную связь в течение 1–2 дней.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько проектов вы ведете одновременно?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мы берем в работу максимум 1 проект по разработке сайтов и до 10 по рекламе одновременно. Это позволяет полностью погрузиться в нюансы вашего бизнеса и гарантировать качество.',
      },
    },
    {
      '@type': 'Question',
      name: 'Вы работаете с юридическими лицами?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Да, работаем как с физическими, так и с юридическими лицами (ИП, ООО). Оформляем официальный договор, предоставляем закрывающие документы и принимаем оплату на расчетный счет.',
      },
    },
    {
      '@type': 'Question',
      name: 'Вы гарантируете продажи?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Нет, и любой честный маркетолог скажет то же самое. Мы гарантируем стабильный поток качественных целевых обращений по согласованной цене и высокую конверсию сайта. Конечная продажа зависит от вашего продукта и отдела продаж.',
      },
    },
    {
      '@type': 'Question',
      name: 'На какой CMS вы делаете сайты и смогу ли я сам менять тексты?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мы не используем старые CMS вроде WordPress или Joomla. Мы пишем сайты на современном фреймворке Next.js без баз данных на сервере — их физически невозможно взломать. Все тексты, цены и контакты выносим в простой конфигурационный файл, который вы сможете отредактировать за 1 минуту по нашей видеоинструкции.',
      },
    },
    {
      '@type': 'Question',
      name: 'Используете ли вы серые методы привлечения клиентов?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Нет, и принципиально. Под серыми методами мы понимаем: спам-рассылки по купленным базам, холодный обзвон без согласия, накрутку отзывов и поведенческих факторов, парсинг контактов и агрессивные pop-up воронки. Наша работа строится на том, чтобы к вам приходили люди, которым действительно нужен ваш продукт — через рекламу, SEO и сильный сайт.',
      },
    },
  ],
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}

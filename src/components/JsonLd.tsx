// Структурированные данные Schema.org для V.R. Asphodel
// Три типа: LocalBusiness + WebSite + FAQPage

const BASE_URL = 'https://vr-asphodel.ru'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#organization`,
  name: 'V.R. Asphodel',
  description: 'Разработка продающих сайтов и настройка рекламы под ключ для предпринимателей и фрилансеров.',
  url: BASE_URL,
  telephone: '+79999910313',
  email: 'a.gerasimov.marketing@yandex.ru',
  priceRange: 'от 65 000 ₽',
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
  sameAs: [
    'https://t.me/AGerasimov_Marketing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги по разработке сайтов и рекламе',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Разработка лендинга',
          description: 'Создание продающего одностраничного сайта под ключ',
        },
        price: '65000',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Мультистраничный сайт',
          description: 'Разработка полноценного сайта компании',
        },
        price: '175000',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Настройка рекламы',
          description: 'Настройка и ведение рекламы в Яндекс Директ и VK',
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
  description: 'Разработка сайтов и настройка рекламы под ключ',
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
        text: 'Лендинг — от 65 000 ₽, мультистраничный — от 175 000 ₽. Точную стоимость обсуждаем на созвоне — она зависит от объёма и задачи.',
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
        text: 'Да, всегда. Прописываем что делаем, сроки, стоимость и количество итераций правок.',
      },
    },
    {
      '@type': 'Question',
      name: 'Вы гарантируете продажи?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Мы гарантируем стабильный поток качественных целевых обращений по согласованной цене и высокую конверсию сайта. Конечная продажа зависит от вашего продукта и отдела продаж.',
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

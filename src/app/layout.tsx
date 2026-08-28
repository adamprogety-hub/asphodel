import type { Metadata } from 'next'
import './globals.css'
import Preloader from '@/components/Preloader'
import ContactModalProvider from '@/components/ContactModal'
import PrivacyModal from '@/components/PrivacyModal'
import AIChatWidget from '@/components/AIChatWidget'
import GooeyFilter from '@/components/GooeyFilter'
import CookieConsent from '@/components/CookieConsent'
import PageTracker from '@/components/PageTracker'
import JsonLd from '@/components/JsonLd'

const BASE_URL = 'https://vr-asphodel.ru'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Разработка сайтов и настройка рекламы — V.R. Asphodel',
    template: '%s | V.R. Asphodel',
  },
  description: 'Создаём продающие сайты и запускаем рекламу под ключ. Лендинг от 65 000 ₽. Первые заявки за 30 дней. Работаем по договору. Бесплатная консультация.',
  keywords: [
    'разработка сайтов под ключ',
    'создание продающего сайта',
    'настройка рекламы Яндекс Директ',
    'лендинг под ключ',
    'сайт для малого бизнеса',
    'реклама для фрилансера',
    'V.R. Asphodel',
  ],
  authors: [{ name: 'V.R. Asphodel', url: BASE_URL }],
  creator: 'V.R. Asphodel',
  publisher: 'V.R. Asphodel',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: BASE_URL,
    siteName: 'V.R. Asphodel',
    title: 'Разработка сайтов и настройка рекламы — V.R. Asphodel',
    description: 'Создаём продающие сайты и запускаем рекламу под ключ. Лендинг от 65 000 ₽. Работаем по договору.',
    images: [
      {
        url: '/og-image.png',
        width: 1536,
        height: 1024,
        alt: 'V.R. Asphodel — Разработка сайтов и реклама под ключ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Разработка сайтов и настройка рекламы — V.R. Asphodel',
    description: 'Создаём продающие сайты и запускаем рекламу под ключ. Лендинг от 65 000 ₽.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // Добавь свои ключи после верификации в Яндекс.Вебмастер и Google Search Console:
  // verification: {
  //   google: 'ВАШ_GOOGLE_VERIFICATION_CODE',
  //   yandex: 'ВАШ_YANDEX_VERIFICATION_CODE',
  // },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <JsonLd />
        <Preloader />
        <PageTracker />
        <ContactModalProvider>
          <div className="page-blur-wrapper">
            {children}
          </div>
          <CookieConsent />
          <PrivacyModal />
          <AIChatWidget />
          <GooeyFilter />
        </ContactModalProvider>
      </body>
    </html>
  )
}



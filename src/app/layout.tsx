import type { Metadata } from 'next'
import './globals.css'
import Preloader from '@/components/Preloader'
import ContactModalProvider from '@/components/ContactModal'
import PrivacyModal from '@/components/PrivacyModal'
import AIChatWidget from '@/components/AIChatWidget'
import GooeyFilter from '@/components/GooeyFilter'
import CookieConsent from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: 'V.R. Asphodel — Сайты и реклама под ключ',
  description: 'Помогаем предпринимателям и фрилансерам получить первых клиентов из интернета. Разработка сайтов и настройка рекламы.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Preloader />
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



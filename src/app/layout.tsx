import type { Metadata } from 'next'
import './globals.css'
import Preloader from '@/components/Preloader'
import ContactModalProvider from '@/components/ContactModal'
import PrivacyModal from '@/components/PrivacyModal'
import AIChatWidget from '@/components/AIChatWidget'

export const metadata: Metadata = {
  title: 'V.R. Asphodel — Сайты и реклама под ключ',
  description: 'Помогаем предпринимателям и фрилансерам получить первых клиентов из интернета. Разработка сайтов и настройка рекламы.',
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
          <PrivacyModal />
          <AIChatWidget />
        </ContactModalProvider>
      </body>
    </html>
  )
}

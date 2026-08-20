'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small timeout to show banner after initial render
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    // Redirect to Yandex as requested
    window.location.href = 'https://yandex.ru'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            maxWidth: '380px',
            background: 'var(--dark-2)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '20px', color: 'var(--green)' }}>🍪</span>
            <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '-0.01em' }}>
              Мы используем файлы cookie
            </p>
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: '20px' }}>
            Оставаясь на сайте, вы соглашаетесь на сбор аналитических данных для улучшения работы нашего сервиса.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleAccept}
              style={{
                flex: 1, fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px',
                color: '#000', background: 'var(--green)', border: 'none',
                padding: '10px 16px', borderRadius: '10px', cursor: 'pointer',
                transition: 'opacity 0.2s', textAlign: 'center',
              }}
              className="hover:opacity-85"
            >
              Принять
            </button>
            <button
              onClick={handleDecline}
              style={{
                flex: 1, fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '13px',
                color: 'rgba(255,255,255,0.7)', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '10px 16px', borderRadius: '10px', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s', textAlign: 'center',
              }}
              className="hover:border-white hover:text-white"
            >
              Отклонить
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

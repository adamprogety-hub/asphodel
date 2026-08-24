'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [attentionActive, setAttentionActive] = useState(false)

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner shortly after render
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleAttention = () => {
      // Make sure the banner is visible if it was somehow dismissed or not loaded yet
      setVisible(true)
      setAttentionActive(true)
      setTimeout(() => setAttentionActive(false), 800)
    }
    window.addEventListener('trigger-cookie-attention', handleAttention)
    return () => window.removeEventListener('trigger-cookie-attention', handleAttention)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    // Redirect to fallback page
    window.location.href = 'https://yandex.ru'
  }

  const bannerVariants = {
    idle: { opacity: 1, y: 0, x: '-50%', scale: 1 },
    attention: {
      y: -12,
      scale: 1.05,
      x: ['-50%', '-52%', '-48%', '-51%', '-49%', '-50%'], // Shake
      transition: {
        x: { duration: 0.4, ease: 'easeInOut' },
        y: { type: 'spring', stiffness: 350, damping: 15 },
        scale: { type: 'spring', stiffness: 350, damping: 15 },
      }
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={bannerVariants as any}

          animate={attentionActive ? 'attention' : 'idle'}
          initial={{ opacity: 0, y: 40, x: '-50%', scale: 0.95 }}
          exit={{ opacity: 0, y: 30, x: '-50%', scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            zIndex: 50000,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(20, 20, 27, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: attentionActive ? '1px solid var(--green)' : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            padding: '6px 6px 6px 14px',
            boxShadow: attentionActive
              ? '0 20px 45px rgba(108,255,155,0.45), 0 0 35px rgba(108,255,155,0.3)'
              : '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(124, 58, 237, 0.03)',
            maxWidth: 'calc(100% - 32px)',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          {/* Vector Cookie Icon + Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 16v.01" />
              <path d="M7 13v.01" />
            </svg>
            <p style={{
              fontFamily: 'var(--ff-b)',
              fontWeight: 500,
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>
              <span className="hidden sm:inline">Мы используем файлы cookie для аналитики</span>
              <span className="inline sm:hidden">Используем cookie</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={handleDecline}
              style={{
                fontFamily: 'var(--ff-b)',
                fontWeight: 500,
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.45)',
                background: 'none',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              className="hover:text-white"
            >
              Отклонить
            </button>
            <button
              onClick={handleAccept}
              style={{
                fontFamily: 'var(--ff-b)',
                fontWeight: 600,
                fontSize: '11px',
                color: '#000',
                background: 'var(--green)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-85"
            >
              Принять
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

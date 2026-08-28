'use client'
import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

export default function PrivacyModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-privacy-policy', handleOpen)
    return () => window.removeEventListener('open-privacy-policy', handleOpen)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Modal Content */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', zIndex: 1,
              width: '100%', maxWidth: '640px', maxHeight: '80vh',
              background: '#fff', borderRadius: '20px', padding: '36px',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: '#111' }}>
                Политика конфиденциальности
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: '#888',
                  width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'opacity 0.2s', padding: 0
                }}
                className="hover:opacity-70"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '8px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--ff-b)', fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '14px' }}>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей сайта V. R. Asphodel.
              </p>
              <h4 style={{ fontFamily: 'var(--ff-d)', fontWeight: 700, fontSize: '14px', color: '#111', marginTop: '16px', marginBottom: '8px' }}>
                1. Сбор персональных данных
              </h4>
              <p style={{ fontFamily: 'var(--ff-b)', fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '14px' }}>
                Мы собираем только те персональные данные, которые вы добровольно предоставляете нам через формы на сайте (имя, контактные данные в Telegram, номер телефона, адрес электронной почты) для связи и отправки бесплатных материалов.
              </p>
              <h4 style={{ fontFamily: 'var(--ff-d)', fontWeight: 700, fontSize: '14px', color: '#111', marginTop: '16px', marginBottom: '8px' }}>
                2. Цели обработки данных
              </h4>
              <p style={{ fontFamily: 'var(--ff-b)', fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '14px' }}>
                Персональные данные используются исключительно для:
                <br />— Связи с вами по вашему запросу.
                <br />— Предоставления запрашиваемых лид-магнитов и чек-листов.
                <br />— Анализа посещаемости сайта без передачи данных третьим лицам.
              </p>
              <h4 style={{ fontFamily: 'var(--ff-d)', fontWeight: 700, fontSize: '14px', color: '#111', marginTop: '16px', marginBottom: '8px' }}>
                3. Безопасность данных
              </h4>
              <p style={{ fontFamily: 'var(--ff-b)', fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '14px' }}>
                Мы принимаем все необходимые технические меры для защиты ваших данных от несанкционированного доступа. Мы не продаём, не передаём и не разглашаем ваши данные третьим сторонам.
              </p>
            </div>

            {/* Footer */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px',
                color: '#fff', background: '#111', border: 'none',
                padding: '12px 24px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
                transition: 'opacity 0.2s', width: 'fit-content', alignSelf: 'flex-end',
              }}
              className="hover:opacity-85"
            >
              Понятно
            </button>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

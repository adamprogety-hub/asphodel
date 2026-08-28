'use client'
import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { track } from '@/lib/track'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('mousedown', clickOutside)
    return () => window.removeEventListener('mousedown', clickOutside)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Common button styles
  const btnStyle = (isAccent = false): React.CSSProperties => ({
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    // Scroll-to-top button is now dark with green border for perfect contrast on white
    background: 'var(--dark)',
    border: isAccent ? '2px solid var(--green)' : '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    textDecoration: 'none',
    color: isAccent ? 'var(--green)' : '#fff',
    fontSize: '14px',
    transition: 'transform 0.2s, border-color 0.2s',
  })

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Blur Overlay: covers content + AIChatWidget when messenger menu is open ── */}
          <AnimatePresence>
            {menuOpen && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  // z:1000 — above AIChatWidget (z:800) and content, below FloatingActions itself (z:1300) and header (z:2000)
                  zIndex: 1000,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  background: 'rgba(10, 10, 18, 0.45)',
                  pointerEvents: 'auto',
                }}
              />
            )}
          </AnimatePresence>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            ref={menuRef}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              // z:1300 when messenger open (above blur overlay at z:1000); z:800 otherwise (below AI blur overlay at z:1000)
              zIndex: menuOpen ? 1300 : 800,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'flex-end',
              transition: 'z-index 0s',
            }}
          >
            {/* Call button */}
            <a
              href="tel:+79999910313"
              title="Позвонить"
              style={btnStyle()}
              className="hover:scale-105 hover:border-white"
              onClick={() => track('click_phone', { location: 'floating-actions' })}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>

            {/* Unified Messenger button with flyout menu */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {/* Flyout Menu (slides to the left) */}
              <AnimatePresence>
                {menuOpen && (
                  <m.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      right: '56px',
                      display: 'flex',
                      gap: '8px',
                      background: 'var(--dark-2)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 'var(--r-pill)',
                      padding: '6px 12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {/* Telegram */}
                    <a
                      href="https://t.me/AGerasimov_Marketing"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '12px',
                        color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '4px 10px', borderRadius: '10px', transition: 'color 0.2s'
                      }}
                      className="hover:text-[var(--green)]"
                      onClick={() => track('click_telegram', { location: 'floating-actions' })}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Telegram
                    </a>

                    <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)' }} />

                    {/* MAX */}
                    <a
                      href="https://max.ru/u/f9LHodD0cOLTxRWGcihjRFIvagzlrSIYl4z8DCBHpDk6lhEZ0v08Rt4jorc"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '11px',
                        color: '#fff', textDecoration: 'none', padding: '4px 10px',
                        borderRadius: '10px', transition: 'color 0.2s', letterSpacing: '-0.2px'
                      }}
                      className="hover:text-[var(--green)]"
                    >
                      MAX
                    </a>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Main Toggle Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                title="Написать нам"
                style={btnStyle(menuOpen)}
                className="hover:scale-105"
              >
                {menuOpen ? (
                  /* Close icon */
                  <span style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1 }}>×</span>
                ) : (
                  /* Chat icon */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Scroll to Top button */}
            <button
              onClick={scrollToTop}
              title="Наверх"
              style={btnStyle(true)}
              className="hover:scale-105"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}

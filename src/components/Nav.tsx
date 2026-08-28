'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { useContactModal } from '@/components/ContactModal'


const links = [
  { label: 'Услуги',    href: '#services' },
  { label: 'Кейсы',    href: '#portfolio' },
  { label: 'Процесс',  href: '#process' },
  { label: 'Цены',     href: '#calculator' },
  { label: 'Контакты', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openModal } = useContactModal()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive: true })
    fn() // run once on mount
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll + add body class when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('burger-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('burger-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('burger-open')
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        id="main-nav"
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,

          /* Scroll state & mobile menu state transitions */
          top:          (scrolled || mobileMenuOpen) ? '14px' : '0px',
          width:        (scrolled || mobileMenuOpen) ? 'min(920px, calc(100% - 48px))' : '100%',
          
          // Harmonize border radius: when menu is open, use 24px rounded card; when scrolled, use pill (50px); otherwise 0px
          borderRadius: mobileMenuOpen ? '24px' : (scrolled ? 'var(--r-pill)' : '0px'),
          
          // Ensure menu is readable even if header is not scrolled yet
          background:   (scrolled || mobileMenuOpen) ? 'rgba(20,20,20,0.94)' : 'transparent',
          backdropFilter: (scrolled || mobileMenuOpen) ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: (scrolled || mobileMenuOpen) ? 'blur(24px)' : 'none',
          border:       (scrolled || mobileMenuOpen) ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
          boxShadow:    (scrolled || mobileMenuOpen) ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
          
          transition: 'top 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), border-radius 0.4s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '24px',
          padding: (scrolled || mobileMenuOpen) ? '10px 24px' : '0 48px',
          height: (scrolled && !mobileMenuOpen) ? 'auto' : '64px',
          transition: 'padding 0.35s ease, height 0.35s ease',
        }} className="nav-grid-container">

          {/* Logo */}
          <Link href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', justifySelf: 'start' }}>
            <div style={{ width: '44px', height: '40px', flexShrink: 0 }} className="nav-logo-wrapper">
              <svg viewBox="20 20 60 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <mask id="nav-cutout-mask">
                    <rect x="20" y="20" width="60" height="55" fill="white" />
                    <circle cx="70" cy="45" r="4.2" fill="black">
                      <animate 
                        attributeName="opacity" 
                        values="1;0;1" 
                        dur="1.8s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  </mask>
                </defs>

                {/* V-Left */}
                <polygon points="20,20 45,75 35,75" fill="#ffffff"/>
                
                {/* V-Right / R stem */}
                <polygon points="45,75 55,75 70,35 60,35" fill="#ffffff" mask="url(#nav-cutout-mask)"/>
                
                {/* R-Loop */}
                <polygon points="60,35 80,35 80,55 60,55" fill="#ffffff" mask="url(#nav-cutout-mask)"/>
                
                {/* R-Leg */}
                <polygon points="60,55 70,55 80,75 70,75" fill="#ffffff"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
              <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '18px', color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                V.R. Asphodel
              </span>
              <span style={{ fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '8px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1.5px' }}>
                Креатив и Маркетинг
              </span>
            </div>
          </Link>

          {/* Center links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '24px' : '36px', transition: 'gap 0.3s ease' }} className="nav-links">
            {links.map(l => (
              <Link
                key={l.href} href={l.href}
                style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                className="hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: О нас + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifySelf: 'end' }} className="nav-actions">
            <Link href="#about" style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">
              О нас
            </Link>
            <button
              onClick={() => openModal({
                title: 'Написать нам',
                description: 'Расскажите о задаче в двух словах — ответим быстро и по существу.',
              })}
              style={{ fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px', color: '#000', background: '#ffffff', padding: '9px 20px', borderRadius: 'var(--r-pill)', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
              className="hover:opacity-85"
            >
              Задать вопрос
            </button>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '32px',
              height: '32px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 110,
            }}
          >
            <span style={{ width: '18px', height: '2px', background: '#fff', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.25s' }} />
            <span style={{ width: '18px', height: '2px', background: '#fff', opacity: mobileMenuOpen ? 0 : 1, transition: 'all 0.25s' }} />
            <span style={{ width: '18px', height: '2px', background: '#fff', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.25s' }} />
          </button>
        </div>

        {/* Mobile Drawer (Transparent background — blends with header) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                overflow: 'hidden',
                background: 'transparent', // removed inner dark card background
              }}
              className="mobile-menu-drawer"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 24px 24px' }}>
                {links.map(l => (
                  <Link
                    key={l.href} href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '15px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                  >
                    {l.label}
                  </Link>
                ))}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <Link
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '15px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                >
                  О нас
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openModal({
                      title: 'Написать нам',
                      description: 'Расскажите о задаче в двух словах — ответим быстро и по существу.',
                    })
                  }}
                  style={{
                    fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '14px',
                    color: '#000', background: '#ffffff', padding: '12px',
                    borderRadius: 'var(--r-pill)', border: 'none', cursor: 'pointer',
                    textAlign: 'center', display: 'block', width: '100%', marginTop: '6px'
                  }}
                >
                  Задать вопрос
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full screen backdrop blur & darken overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(10, 10, 12, 0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              // z:1900 — under header (2000) but above FloatingActions (800) and AIChatWidget (800)
              zIndex: 1900,
              pointerEvents: 'auto',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

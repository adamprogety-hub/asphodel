'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive: true })
    fn() // run once on mount
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
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
          zIndex: 100,

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
          <Link href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '1px', justifySelf: 'start' }}>
            <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.04em' }}>V.R.</span>
            <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>ASPHODEL</span>
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
            <Link href="#contact" style={{ fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px', color: '#000', background: '#ffffff', padding: '9px 20px', borderRadius: 'var(--r-pill)', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }} className="hover:opacity-85">
              Задать вопрос
            </Link>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
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
            <motion.div
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
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '14px',
                    color: '#000', background: '#ffffff', padding: '12px',
                    borderRadius: 'var(--r-pill)', textDecoration: 'none', textAlign: 'center',
                    display: 'block', marginTop: '6px'
                  }}
                >
                  Задать вопрос
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full screen backdrop blur & darken overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
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
              zIndex: 90,
              pointerEvents: 'auto',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

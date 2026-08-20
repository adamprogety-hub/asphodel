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

  return (
    <header
      id="main-nav"
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        top:          scrolled ? '14px'                    : '0px',
        width:        scrolled ? 'min(920px, calc(100% - 48px))' : '100%',
        borderRadius: scrolled ? 'var(--r-pill)'           : '0px',
        background:   scrolled ? 'rgba(20,20,20,0.88)'     : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)'            : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)'      : 'none',
        border:       scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
        boxShadow:    scrolled ? '0 8px 32px rgba(0,0,0,0.25)' : 'none',
        transition: 'top 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), border-radius 0.4s cubic-bezier(0.22,1,0.36,1), background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '24px',
        padding: scrolled ? '10px 24px' : '0 48px',
        height: scrolled ? 'auto' : '64px',
        transition: 'padding 0.35s ease, height 0.35s ease',
      }} className="nav-grid-container">

        {/* Logo */}
        <Link href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '1px', justifySelf: 'start' }}>
          <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.04em' }}>.</span>
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
            Оставить заявку
          </Link>
        </div>

        {/* Mobile Hamburger toggle (styled hidden in CSS by default) */}
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

      {/* Mobile Drawer (styled hidden in CSS by default) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background: 'var(--dark)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
            className="mobile-menu-drawer"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 8px' }}>
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
                  borderRadius: '12px', textDecoration: 'none', textAlign: 'center',
                  display: 'block', marginTop: '6px'
                }}
              >
                Оставить заявку
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Услуги',    href: '#services' },
  { label: 'Кейсы',    href: '#portfolio' },
  { label: 'Процесс',  href: '#process' },
  { label: 'Цены',     href: '#calculator' },
  { label: 'Контакты', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive: true })
    fn() // run once on mount
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        /* Always centered via left:50% + translateX */
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,

        /* Scroll state transitions */
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
      }}>

        {/* Logo */}
        <Link href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '1px', justifySelf: 'start' }}>
          <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.04em' }}>.</span>
          <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '20px', color: '#ffffff', lineHeight: 1, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>ASPHODEL</span>
        </Link>

        {/* Center links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '24px' : '36px', transition: 'gap 0.3s ease' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifySelf: 'end' }}>
          <Link href="#about" style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">
            О нас
          </Link>
          <Link href="#contact" style={{ fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px', color: '#000', background: '#ffffff', padding: '9px 20px', borderRadius: 'var(--r-pill)', textDecoration: 'none', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }} className="hover:opacity-85">
            Оставить заявку
          </Link>
        </div>
      </div>
    </header>
  )
}

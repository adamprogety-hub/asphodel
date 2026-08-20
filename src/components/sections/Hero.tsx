'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        /* Pure dark — no canvas, no images, no distractions */
        background: 'var(--dark)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '64px', /* space for fixed nav */
      }}
    >

      {/* ── Main heading — Titan stacked style ─────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(52px,7vw,88px) 40px 0',
      }} className="hero-top-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* "Be healthier. / Be stronger. / Be confident." — adapted */}
          <h1 style={{
            fontFamily: 'var(--ff-d)',
            fontWeight: 800,
            fontSize: 'clamp(52px, 7vw, 96px)',
            color: '#ffffff',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            marginBottom: '40px',
          }}>
            Запустим сайт.<br />
            Настроим рекламу.<br />
            Приведём клиентов.
          </h1>

          {/* Dual CTA — green primary + outlined secondary */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="#contact"
              style={{
                fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '14px',
                color: 'var(--dark)', background: 'var(--green)',
                padding: '13px 28px', borderRadius: 'var(--r-pill)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-85"
            >
              Оставить заявку
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link
              href="#about"
              style={{
                fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '14px',
                color: 'rgba(255,255,255,0.7)', background: 'transparent',
                padding: '13px 24px',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 'var(--r-pill)', textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              className="hover:border-white hover:text-white"
            >
              О нас и кейсах
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Three bottom cards — exact Titan layout ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
          padding: '0 40px 36px',
        }}
        className="hero-bottom-grid"
      >
        {/* Card 1: WHITE — social proof (Titan: 10,000+ clients) */}
        <div style={{
          background: '#ffffff', borderRadius: 'var(--r-md)', padding: '22px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            {/* Avatar stack */}
            <div style={{ display: 'flex', flexShrink: 0 }}>
              {['#555', '#777', '#999'].map((c, i) => (
                <div key={i} style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: c, border: '2px solid #fff',
                  marginLeft: i === 0 ? 0 : '-10px',
                }} />
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '22px', color: '#111', lineHeight: 1 }}>4+</p>
              <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: '#888' }}>кейса с результатом</p>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px', color: '#888', lineHeight: 1.7 }}>
            Предприниматели приходят с разными задачами — мы помогаем каждому выйти онлайн и получить первых клиентов.
          </p>
        </div>

        {/* Card 2: DARK — scrollable tip (Titan: testimonial with arrows) */}
        <div style={{
          background: '#1E1E1E', borderRadius: 'var(--r-md)', padding: '22px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {['←', '→'].map((a, i) => (
              <button key={i} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
                color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {a}
              </button>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.72, flex: 1 }}>
            Рекламный бюджет уходит напрямую в Яндекс — не через нас. Мы берём только за работу.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>V. R. Asphodel</p>
            <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>О прозрачности</p>
          </div>
        </div>

        {/* Card 3: GREEN — "Get X days for free" (Titan: free trial) */}
        <div style={{
          background: 'var(--green)', borderRadius: 'var(--r-md)', padding: '22px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Arrow top-right — Titan icon */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#CDFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '19px', color: '#000', lineHeight: 1.25, marginBottom: '8px' }}>
              Бесплатная<br />консультация
            </p>
            <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.65 }}>
              Просто напишите нам — расскажите о задаче.
            </p>
          </div>
          <Link
            href="#contact"
            style={{
              marginTop: '16px', fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '12px',
              color: '#000', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
          >
            Написать →
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

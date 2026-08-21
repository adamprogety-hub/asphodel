'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ShimmeringGrid from '@/components/ShimmeringGrid'



const workSlides = [
  { text: 'Рекламный бюджет уходит напрямую в Яндекс — не через нас. Мы берём только за работу.', category: 'О прозрачности' },
  { text: 'На связи каждый день. Составляем еженедельные понятные отчёты о стоимости лида и продажах.', category: 'О коммуникации' },
  { text: 'Не бросаем проекты после сдачи. Сопровождаем, делаем доработки и помогаем расти.', category: 'О поддержке' },
  { text: 'Фиксируем в договоре сроки, финальную стоимость и финансовые гарантии.', category: 'О договоре' },
]

export default function Hero() {
  const [slideIdx, setSlideIdx] = useState(0)

  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % workSlides.length)
  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + workSlides.length) % workSlides.length)

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

      {/* ── Decorative Background Pattern (Top-Right Grid & Volumetric Light Rays) ── */}
      <ShimmeringGrid position="right" id="hero" />

      {/* ── Main heading — Titan stacked style ─────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(52px,7vw,88px) 40px 0',
        position: 'relative',
        zIndex: 2,
      }} className="hero-top-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Titan-style: each line is its own statement ending with a period */}
          <h1 style={{
            fontFamily: 'var(--ff-d)',
            fontWeight: 800,
            fontSize: 'clamp(52px, 7vw, 96px)',
            color: '#ffffff',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            marginBottom: '40px',
          }} className="hero-title">
            Создаем сайт<br />
            Запускаем рекламу<br />
            Приводим клиентов
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
              Нужен сайт
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
        {/* Card 1: WHITE — social proof */}
        <div className="hero-card-white" style={{
          borderRadius: 'var(--r-md)', padding: '22px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            {/* Avatar stack */}
            <div style={{ display: 'flex', flexShrink: 0 }}>
              {['/avatars/avatar1.jpg', '/avatars/avatar2.jpg', '/avatars/avatar3.jpg'].map((src, i) => (
                <img key={i} src={src} alt="Клиент" style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  objectFit: 'cover', border: '2px solid #fff',
                  marginLeft: i === 0 ? 0 : '-10px',
                }} />
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '22px', color: '#111', lineHeight: 1 }}>4+</p>
              <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: '#888' }}>совместных кейса с результатом</p>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px', color: '#888', lineHeight: 1.7 }}>
            Предприниматели приходят с разными задачами — мы помогаем каждому выйти онлайн и получить первых клиентов.
          </p>
        </div>

        {/* Card 2: DARK — scrollable tip */}
        <div className="hero-card-dark" style={{
          borderRadius: 'var(--r-md)', padding: '22px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: '160px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={prevSlide} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
              }} className="hover:border-white">
                ←
              </button>
              <button onClick={nextSlide} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)', background: 'transparent',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
              }} className="hover:border-white">
                →
              </button>
            </div>
            <span style={{ fontFamily: 'var(--ff-b)', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              {slideIdx + 1} / {workSlides.length}
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={slideIdx}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.72 }}
              >
                {workSlides[slideIdx].text}
              </motion.p>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <p style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>V. R. Asphodel</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={slideIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}
              >
                {workSlides[slideIdx].category}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="hero-card-purple" style={{
          borderRadius: 'var(--r-md)', padding: '22px 24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: '160px',
        }}>
          {/* Header at the top */}
          <h4 style={{
            fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '16px',
            color: '#000', lineHeight: 1.25, margin: 0, textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Бесплатная<br />консультация
          </h4>

          {/* Bottom row: Description left, Button + Circle right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: '12px' }}>
            <p style={{
              fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '11px',
              color: 'rgba(0,0,0,0.55)', lineHeight: 1.6, margin: 0, maxWidth: '160px'
            }}>
              Просто напишите нам — расскажите о задаче.
            </p>
            <Link
              href="#contact"
              style={{
                fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '12px',
                color: '#000', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                flexShrink: 0
              }}
              className="group"
            >
              <span>Написать</span>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }} className="group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4M12 2v8" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

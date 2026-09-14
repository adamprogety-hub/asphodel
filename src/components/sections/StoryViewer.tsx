'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { m, AnimatePresence, PanInfo } from 'framer-motion'
import { createPortal } from 'react-dom'

const STORY_DURATION = 5000 // ms per story

const STORIES_DATA = [
  { id: 1, label: 'Процесс' },
  { id: 2, label: 'Кейс' },
  { id: 3, label: 'Команда' },
  { id: 4, label: 'Реклама' },
  { id: 5, label: 'Сайт' },
  { id: 6, label: 'Результат' },
]

const BG_GRADIENTS = [
  'linear-gradient(135deg, hsl(270,60%,12%), hsl(240,60%,8%))',
  'linear-gradient(135deg, hsl(200,60%,12%), hsl(230,60%,8%))',
  'linear-gradient(135deg, hsl(160,60%,10%), hsl(200,60%,8%))',
  'linear-gradient(135deg, hsl(300,60%,12%), hsl(330,60%,8%))',
  'linear-gradient(135deg, hsl(240,50%,12%), hsl(270,60%,8%))',
  'linear-gradient(135deg, hsl(30,60%,12%),  hsl(270,60%,8%))',
]

interface Props {
  initialIndex: number
  onClose: () => void
}

export default function StoryViewer({ initialIndex, onClose }: Props) {
  const [current, setCurrent]   = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused]     = useState(false)
  const rafRef   = useRef<number>(0)
  const startRef = useRef<number>(0)
  const savedRef = useRef<number>(0)   // elapsed ms saved on pause

  // ── Progress ticker ────────────────────────────────────────────
  const tick = useCallback(() => {
    const elapsed = savedRef.current + (performance.now() - startRef.current)
    const p = Math.min(elapsed / STORY_DURATION, 1)
    setProgress(p)
    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      savedRef.current = 0
      setCurrent(c => {
        const next = c + 1
        if (next >= STORIES_DATA.length) { onClose(); return c }
        setProgress(0)
        return next
      })
    }
  }, [onClose])

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current)
      savedRef.current += performance.now() - startRef.current
      return
    }
    startRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [current, paused, tick])

  // ── Navigation ─────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (current >= STORIES_DATA.length - 1) { onClose(); return }
    savedRef.current = 0; setProgress(0); setCurrent(c => c + 1)
  }, [current, onClose])

  const goPrev = useCallback(() => {
    savedRef.current = 0; setProgress(0)
    setCurrent(c => Math.max(0, c - 1))
  }, [])

  // ── Keyboard ───────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'Escape')     onClose()
    }
    addEventListener('keydown', h)
    return () => removeEventListener('keydown', h)
  }, [goNext, goPrev, onClose])

  // ── Lock body scroll ───────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // ── Swipe-down to close ────────────────────────────────────────
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 80 && Math.abs(info.velocity.y) > Math.abs(info.velocity.x)) {
      onClose()
    }
  }

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <m.div
        key="sv-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          background: 'rgba(0,0,0,0.72)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Card — 9:16, always fits with 24px gap all around */}
        <m.div
          key="sv-card"
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{ scale: 0.88,    opacity: 0, y: 60 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.05, bottom: 0.45 }}
          onDragEnd={onDragEnd}
          onClick={e => e.stopPropagation()}
          style={{
            // 9:16 fills to viewport - 48px, but max-width also caps it
            aspectRatio: '9 / 16',
            height: 'calc(100dvh - 48px)',
            maxWidth: 'calc(100vw - 48px)',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'grab',
            background: BG_GRADIENTS[current % BG_GRADIENTS.length],
            userSelect: 'none',
          }}
        >
          {/* ── Progress bar ── */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
            display: 'flex', gap: '4px', padding: '14px 14px 0',
          }}>
            {STORIES_DATA.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: '2px', borderRadius: '2px',
                background: 'rgba(255,255,255,0.22)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', background: '#fff', borderRadius: '2px',
                  width: i < current ? '100%' : i === current ? `${progress * 100}%` : '0%',
                }} />
              </div>
            ))}
          </div>

          {/* ── Header ── */}
          <div style={{
            position: 'absolute', top: '24px', left: 0, right: 0, zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '13px',
                color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                letterSpacing: '-0.01em',
              }}>
                VR. Asphodel
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0,0,0,0.35)', border: 'none',
                borderRadius: '50%', width: '30px', height: '30px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(8px)',
                WebkitTapHighlightColor: 'transparent',
              } as React.CSSProperties}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* ── Tap zones (hold to pause) ── */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 10 }}>
            <div
              style={{ flex: 1 }}
              onPointerDown={() => setPaused(true)}
              onPointerUp={() => { setPaused(false); goPrev() }}
              onPointerLeave={() => setPaused(false)}
            />
            <div
              style={{ flex: 1 }}
              onPointerDown={() => setPaused(true)}
              onPointerUp={() => { setPaused(false); goNext() }}
              onPointerLeave={() => setPaused(false)}
            />
          </div>

          {/* ── Story content placeholder ── */}
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <span style={{
              fontFamily: 'var(--ff-b)', fontSize: '22px', fontWeight: 700,
              color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.03em',
            }}>
              {STORIES_DATA[current]?.label}
            </span>
            <span style={{
              fontFamily: 'var(--ff-b)', fontSize: '13px',
              color: 'rgba(255,255,255,0.2)',
            }}>
              видео будет здесь
            </span>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>,
    document.body,
  )
}

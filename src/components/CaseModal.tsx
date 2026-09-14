'use client'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

export type CaseStar = {
  situation: string
  task: string
  action: string
  result: string
}

export type CaseData = {
  niche: string
  tag: string
  result: string
  siteUrl: string
  screenshots: string[]
  star: CaseStar
}

type Props = {
  caseData: CaseData | null
  onClose: () => void
}

const STAR_ITEMS: { key: keyof CaseStar; label: string; accent?: boolean }[] = [
  { key: 'situation', label: 'Ситуация' },
  { key: 'task',      label: 'Задача' },
  { key: 'action',    label: 'Что сделали' },
  { key: 'result',    label: 'Результат', accent: true },
]

export default function CaseModal({ caseData, onClose }: Props) {
  const [slideIdx, setSlideIdx]     = useState(0)
  const [bentoIdx, setBentoIdx]     = useState(0)   // mobile bento slider
  const [visible, setVisible]       = useState(false)
  const [touchStartImg, setTouchStartImg]     = useState<number | null>(null)
  const [touchStartBento, setTouchStartBento] = useState<number | null>(null)

  useEffect(() => {
    if (caseData) {
      setSlideIdx(0)
      setBentoIdx(0)
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [caseData])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  useEffect(() => {
    document.body.style.overflow = caseData ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [caseData])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 280)
  }, [onClose])

  const nextSlide = () => caseData && setSlideIdx(i => (i + 1) % caseData.screenshots.length)
  const prevSlide = () => caseData && setSlideIdx(i => (i - 1 + caseData.screenshots.length) % caseData.screenshots.length)
  const nextBento = () => setBentoIdx(i => (i + 1) % STAR_ITEMS.length)
  const prevBento = () => setBentoIdx(i => (i - 1 + STAR_ITEMS.length) % STAR_ITEMS.length)

  if (!caseData) return null
  const shots = caseData.screenshots

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: visible ? 'all' : 'none',
        }}
      />

      {/* ── Centering shell ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2001,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 28px)',
        pointerEvents: visible ? 'all' : 'none',
      }}>

        {/* ══ Modal card ══ */}
        <div
          onClick={e => e.stopPropagation()}
          className="cm-card"
          style={{
            width: '100%',
            maxWidth: '1060px',
            height: '90vh',
            maxHeight: '820px',
            background: '#fff',
            borderRadius: '28px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transform: visible ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(14px)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
            boxShadow: '0 40px 120px rgba(0,0,0,0.35)',
          }}
        >

          {/* ─── 1. Header ─── */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            flexShrink: 0,
          }}>
            {/* Site link */}
            {caseData.siteUrl && caseData.siteUrl !== '#' ? (
              <a
                href={caseData.siteUrl} target="_blank" rel="noopener noreferrer"
                className="cm-site-link"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 'var(--r-pill)',
                  padding: '6px 14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                Открыть сайт
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H2M9 1v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </a>
            ) : (
              <div />
            )}

            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Закрыть"
              className="cm-close"
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.06)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9.5 2.5l-7 7M2.5 2.5l7 7" stroke="rgba(0,0,0,0.55)" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* ─── 2. Image slider ─── */}
          <div
            style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#f0f0f0', minHeight: 0 }}
            onTouchStart={e => setTouchStartImg(e.touches[0].clientX)}
            onTouchEnd={e => {
              if (touchStartImg === null) return
              const d = touchStartImg - e.changedTouches[0].clientX
              if (d > 40) nextSlide()
              else if (d < -40) prevSlide()
              setTouchStartImg(null)
            }}
          >
            {shots.map((src, i) => (
              <div key={src} style={{
                position: 'absolute', inset: 0,
                opacity: i === slideIdx ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}>
                <Image src={src} alt={`Скриншот ${i + 1}`} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="1060px" />
              </div>
            ))}

            {/* Dots + arrows (only if multiple screenshots) */}
            {shots.length > 1 && (
              <div style={{
                position: 'absolute', bottom: '16px', left: 0, right: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              }}>
                {/* Prev arrow */}
                <button onClick={prevSlide} className="cm-img-arrow" aria-label="Предыдущий скриншот" style={imgArrowStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                {/* Dots */}
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {shots.map((_, i) => (
                    <button key={i} onClick={() => setSlideIdx(i)} aria-label={`Скриншот ${i + 1}`} style={{
                      width: i === slideIdx ? '18px' : '5px',
                      height: '5px', borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
                      background: i === slideIdx ? '#fff' : 'rgba(255,255,255,0.45)',
                      transition: 'all 0.25s ease',
                    }}/>
                  ))}
                </div>

                {/* Next arrow */}
                <button onClick={nextSlide} className="cm-img-arrow" aria-label="Следующий скриншот" style={imgArrowStyle}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 10l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>

          {/* ─── 3. Middle strip: tag + title ─── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 24px',
            borderTop: '1px solid rgba(0,0,0,0.07)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            background: 'rgba(0,0,0,0.02)',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '10px',
              color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1px solid currentColor', borderRadius: 'var(--r-pill)',
              padding: '3px 10px', opacity: 0.85, whiteSpace: 'nowrap',
            }}>
              {caseData.tag}
            </span>
            <h3 style={{
              fontFamily: 'var(--ff-d)', fontWeight: 800,
              fontSize: 'clamp(16px,1.6vw,20px)',
              color: '#111',
              letterSpacing: '-0.02em', lineHeight: 1.2,
              margin: 0,
            }}>
              {caseData.niche}
            </h3>
          </div>

          {/* ─── 4. Bento STAR grid (desktop) / Slider (mobile) ─── */}
          {/* Desktop: 4-column grid */}
          <div className="cm-bento-desktop" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            padding: '12px',
            flexShrink: 0,
          }}>
            {STAR_ITEMS.map(({ key, label, accent }) => (
              <div key={key} style={{
                background: accent ? 'rgba(141,90,255,0.06)' : 'rgba(0,0,0,0.035)',
                borderRadius: '16px',
                padding: '16px',
                border: accent ? '1px solid rgba(141,90,255,0.15)' : '1px solid transparent',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '10px',
                  color: accent ? 'var(--green)' : 'rgba(0,0,0,0.3)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {label}
                </span>
                <p style={{
                  fontFamily: 'var(--ff-b)', fontWeight: 400,
                  fontSize: '12.5px',
                  color: accent ? '#111' : 'rgba(0,0,0,0.6)',
                  lineHeight: 1.65,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {caseData.star[key]}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: swipeable bento slider */}
          <div
            className="cm-bento-mobile"
            style={{ display: 'none', flexDirection: 'column', flexShrink: 0 }}
            onTouchStart={e => setTouchStartBento(e.touches[0].clientX)}
            onTouchEnd={e => {
              if (touchStartBento === null) return
              const d = touchStartBento - e.changedTouches[0].clientX
              if (d > 40) nextBento()
              else if (d < -40) prevBento()
              setTouchStartBento(null)
            }}
          >
            {/* Slide */}
            <div style={{ padding: '12px 16px 8px' }}>
              {STAR_ITEMS.map(({ key, label, accent }, i) => (
                <div key={key} style={{
                  display: i === bentoIdx ? 'flex' : 'none',
                  flexDirection: 'column', gap: '8px',
                  background: accent ? 'rgba(141,90,255,0.06)' : 'rgba(0,0,0,0.035)',
                  borderRadius: '16px', padding: '16px',
                  border: accent ? '1px solid rgba(141,90,255,0.15)' : '1px solid transparent',
                }}>
                  <span style={{
                    fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '10px',
                    color: accent ? 'var(--green)' : 'rgba(0,0,0,0.3)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {label}
                  </span>
                  <p style={{
                    fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px',
                    color: accent ? '#111' : 'rgba(0,0,0,0.6)',
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {caseData.star[key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Bento dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', paddingBottom: '14px' }}>
              {STAR_ITEMS.map((_, i) => (
                <button key={i} onClick={() => setBentoIdx(i)} aria-label={`Слайд ${i + 1}`} style={{
                  width: i === bentoIdx ? '18px' : '5px', height: '5px',
                  borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
                  background: i === bentoIdx ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)',
                  transition: 'all 0.25s ease',
                }}/>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .cm-close:hover { background: rgba(0,0,0,0.1) !important; }
        .cm-site-link:hover { color: rgba(0,0,0,0.8) !important; border-color: rgba(0,0,0,0.3) !important; }
        .cm-img-arrow:hover { background: rgba(255,255,255,0.25) !important; }

        @media (max-width: 640px) {
          .cm-card { border-radius: 20px !important; height: 92vh !important; max-height: 92vh !important; }
          .cm-bento-desktop { display: none !important; }
          .cm-bento-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

const imgArrowStyle: React.CSSProperties = {
  width: '28px', height: '28px', borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.25)',
  color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
}

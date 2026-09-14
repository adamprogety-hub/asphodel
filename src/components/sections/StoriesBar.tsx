'use client'
import { useState } from 'react'
import StoryViewer from './StoryViewer'

const STORIES = [
  { id: 1 }, { id: 2 }, { id: 3 },
  { id: 4 }, { id: 5 }, { id: 6 },
]

const RING_GRADIENTS = [
  'linear-gradient(135deg, #a855f7, #6366f1)',
  'linear-gradient(135deg, #6366f1, #3b82f6)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #a855f7, #ec4899)',
  'linear-gradient(135deg, #10b981, #6366f1)',
  'linear-gradient(135deg, #f59e0b, #a855f7)',
]

const PILL_LEFT = 20   // px — left offset matching label pill
const RIGHT_FADE = 48  // px — right fade width

const LabelPill = () => (
  <div style={{
    display: 'inline-flex',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '9999px',
    padding: '10px 20px',
    fontFamily: 'var(--ff-b)',
    fontWeight: 500,
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
  }}>
    Погружаем вас в контекст
  </div>
)

const Circle = ({ i, onClick }: { i: number; onClick: () => void }) => (
  <button
    aria-label={`Видео ${i + 1}`}
    onClick={onClick}
    style={{
      flexShrink: 0,
      width: '58px', height: '58px',
      borderRadius: '50%', padding: '2px',
      background: RING_GRADIENTS[i % RING_GRADIENTS.length],
      border: 'none', cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      scrollSnapAlign: 'start',
      WebkitTapHighlightColor: 'transparent',
      outline: 'none',
    } as React.CSSProperties}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.15)' }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
  >
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%',
      background: '#1E1E1E', border: '2px solid #141414',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 4l5 3-5 3V4z" fill="rgba(255,255,255,0.35)"/>
      </svg>
    </div>
  </button>
)

export default function StoriesBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
    {openIndex !== null && (
      <StoryViewer initialIndex={openIndex} onClose={() => setOpenIndex(null)} />
    )}
    <section id="stories" style={{ background: '#fff', padding: '0 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(60px,7vw,96px) 0 0 0' }}>

        {/* ── DESKTOP: pill — circles left, label right ── */}
        <div className="sb-desktop" style={{
          background: '#141414', borderRadius: '9999px', padding: '14px',
          alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {STORIES.map((s, i) => <Circle key={s.id} i={i} onClick={() => setOpenIndex(i)} />)}
          </div>
          <div style={{ marginRight: '14px' }}><LabelPill /></div>
        </div>

        {/* ── MOBILE: card — label top, circles with mask fades ── */}
        <div className="sb-mobile" style={{
          background: '#141414', borderRadius: '24px',
          padding: '20px 0 24px',
          flexDirection: 'column', gap: '20px',
          overflow: 'hidden',
        }}>
          {/* Label pill */}
          <div style={{ paddingLeft: `${PILL_LEFT}px` }}>
            <LabelPill />
          </div>

          {/* Circles — paddingLeft on scroll container itself for initial position */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            overflowX: 'scroll', scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: `${PILL_LEFT}px`,
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: `${PILL_LEFT}px`,
            paddingRight: `${RIGHT_FADE}px`,
            WebkitMaskImage: `linear-gradient(to right, transparent 0px, black ${PILL_LEFT}px, black calc(100% - ${RIGHT_FADE}px), transparent 100%)`,
            maskImage: `linear-gradient(to right, transparent 0px, black ${PILL_LEFT}px, black calc(100% - ${RIGHT_FADE}px), transparent 100%)`,
          } as React.CSSProperties}>
            {STORIES.map((s, i) => <Circle key={s.id} i={i} onClick={() => setOpenIndex(i)} />)}
          </div>
        </div>

      </div>

      <style>{`
        .sb-desktop { display: flex; }
        .sb-mobile  { display: none; }
        @media (max-width: 767px) {
          .sb-desktop { display: none; }
          .sb-mobile  { display: flex; }
          #stories    { padding: 0 16px; }
        }
      `}</style>
    </section>
    </>
  )
}

'use client'
import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Stories Data ──────────────────────────────────────────────────────────────
const stories = [
  { id: 1, src: '/reels/reel1.mp4', poster: '/reels/poster1.jpg', label: 'Процесс', emoji: '🎨' },
  { id: 2, src: '/reels/reel2.mp4', poster: '/reels/poster2.jpg', label: 'Реклама',  emoji: '📡' },
  { id: 3, src: '/reels/reel3.mp4', poster: '/reels/poster3.jpg', label: 'Разбор',   emoji: '🔍' },
  { id: 4, src: '/reels/reel4.mp4', poster: '/reels/poster4.jpg', label: 'Лайфхак',  emoji: '💡' },
  { id: 5, src: '/reels/reel5.mp4', poster: '/reels/poster5.jpg', label: 'Команда',  emoji: '👥' },
  { id: 6, src: '/reels/reel6.mp4', poster: '/reels/poster6.jpg', label: 'Кейс',     emoji: '🏆' },
]

// ─── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ story, onClose }: { story: typeof stories[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(5,5,10,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(360px, 88vw)',
          aspectRatio: '9 / 16',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#0e0d13',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        <video
          src={story.src}
          poster={story.poster}
          autoPlay
          playsInline
          muted={false}
          controls={false}
          loop
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* gradient + label */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,10,0.85) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', bottom: '28px', left: '20px', right: '20px' }}>
          <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '22px', color: '#fff', margin: 0, lineHeight: 1.2 }}>
            {story.emoji} {story.label}
          </p>
          <p style={{ fontFamily: 'var(--ff-b)', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '6px 0 0' }}>
            V. R. Asphodel
          </p>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

// ─── Single Story Circle ───────────────────────────────────────────────────────
function StoryCircle({ story, onClick }: { story: typeof stories[0]; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', background: 'none', border: 'none', cursor: 'pointer',
        padding: '4px 2px', flexShrink: 0,
      }}
    >
      {/* Gradient ring + circle */}
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        padding: '3px',
        background: 'linear-gradient(135deg, var(--green) 0%, #7C3AED 100%)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 2px 12px rgba(108,255,155,0.2)',
      }}
      className="story-ring"
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #fff',  /* white gap between ring and image */
          background: '#f0f0f0',
        }}>
          {/* Poster image (or emoji fallback) */}
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px',
          }}>
            {story.emoji}
          </div>
        </div>
      </div>
      {/* Label */}
      <span style={{
        fontFamily: 'var(--ff-b)', fontWeight: 500, fontSize: '11px',
        color: '#444', letterSpacing: '-0.01em',
        maxWidth: '72px', textAlign: 'center', lineHeight: 1.2,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {story.label}
      </span>
    </motion.button>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Reels() {
  const [active, setActive] = useState<typeof stories[0] | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ── Compact Stories strip (white background, no section title) ── */}
      <div
        style={{
          background: '#fff',
          padding: '20px 0 24px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '4px',
            padding: '0 clamp(16px, 5vw, 40px)',
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none' as const,
            maxWidth: '1280px',
            margin: '0 auto',
          }}
          className="stories-track"
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <StoryCircle story={story} onClick={() => setActive(story)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen video modal ── */}
      <AnimatePresence>
        {active && (
          <VideoModal story={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>

      <style>{`
        .stories-track::-webkit-scrollbar { display: none; }
        .story-ring:hover {
          transform: scale(1.06);
          box-shadow: 0 4px 20px rgba(108,255,155,0.35);
        }
      `}</style>
    </>
  )
}

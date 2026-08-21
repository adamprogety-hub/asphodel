'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ShimmeringGrid({ 
  position = 'right', 
  height = '650px', 
  id = 'default',
  width = 'min(750px, 100%)',
  cols = 18,
  rows,
  maskCircle = false,
  showRays = true
}: { 
  position?: 'left' | 'right'
  height?: string
  id?: string
  width?: string
  cols?: number
  rows?: number
  maskCircle?: boolean
  showRays?: boolean
}) {
  const finalCols = cols
  const isTall = height.includes('%') || parseInt(height) > 700
  const finalRows = rows ?? (isTall ? 36 : 16)
  const totalCells = finalCols * finalRows

  // State mapping cell index to its glowing status
  const [glowingCells, setGlowingCells] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // Initialize a few glowing cells at start
    const initial: Record<number, boolean> = {}
    const initialCount = isTall ? 16 : 8
    for (let i = 0; i < initialCount; i++) {
      const idx = Math.floor(Math.random() * totalCells)
      initial[idx] = true
    }
    setGlowingCells(initial)

    const interval = setInterval(() => {
      setGlowingCells((prev) => {
        const next = { ...prev }
        // Slowly remove some glows (60% chance to fade out)
        Object.keys(next).forEach((key) => {
          if (Math.random() > 0.4) {
            delete next[Number(key)]
          }
        })
        // Slowly introduce new glows (add new random cells)
        const countToAdd = (isTall ? 8 : 4) + Math.floor(Math.random() * 3)
        for (let i = 0; i < countToAdd; i++) {
          const randomIdx = Math.floor(Math.random() * totalCells)
          next[randomIdx] = true
        }
        return next
      })
    }, 2800) // Shimmers slowly every 2.8s

    return () => clearInterval(interval)
  }, [totalCells, isTall])

  const isLeft = position === 'left'
  const gradId = `volumetric-ray-grad-${id}`

  // Radial mask styling
  const mask = maskCircle
    ? 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)'
    : `radial-gradient(ellipse at top ${position}, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)`

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: isLeft ? 0 : 'auto',
        right: isLeft ? 'auto' : 0,
        width: width,
        height: height,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      {/* ── Grid pattern ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${finalCols}, 40px)`,
          gridTemplateRows: `repeat(${finalRows}, 40px)`,
          width: `${finalCols * 40}px`,
          height: `${finalRows * 40}px`,
          position: 'absolute',
          top: 0,
          left: isLeft ? 0 : 'auto',
          right: isLeft ? 'auto' : 0,
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
      >
        {Array.from({ length: totalCells }).map((_, idx) => {
          const isGlowing = glowingCells[idx]
          return (
            <div
              key={idx}
              style={{
                width: '40px',
                height: '40px',
                borderBottom: '1px solid rgba(205, 255, 0, 0.05)',
                borderRight: '1px solid rgba(205, 255, 0, 0.05)',
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              {/* Shimmering glass block overlay */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isGlowing ? 1 : 0,
                  backgroundColor: isGlowing ? 'rgba(205, 255, 0, 0.04)' : 'rgba(255, 255, 255, 0)',
                  boxShadow: isGlowing 
                    ? 'inset 0 0 10px rgba(205, 255, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.08)' 
                    : 'none',
                }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: '1px',
                  borderRadius: '3px',
                  backdropFilter: isGlowing ? 'blur(4px)' : 'none',
                  WebkitBackdropFilter: isGlowing ? 'blur(4px)' : 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* ── Volumetric Rays (SVG) ── */}
      {showRays && (
        <svg 
          width="100%" 
          height="100%" 
          viewBox={isTall ? "0 0 700 1300" : "0 0 700 650"}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.38,
            mixBlendMode: 'screen',
            filter: 'blur(20px)',
            transform: isLeft ? 'scaleX(-1)' : 'none', // Flip rays to fan from top-left if isLeft
            transformOrigin: 'center',
          }}
        >
          <defs>
            <linearGradient id={gradId} x1="700" y1="0" x2="200" y2={isTall ? 1100 : 550} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CDFF00" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#CDFF00" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#CDFF00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={isTall ? "M700 0 L550 1300 L380 1300 Z" : "M700 0 L550 650 L380 650 Z"} fill={`url(#${gradId})`} />
          <path d={isTall ? "M700 0 L380 1300 L220 1300 Z" : "M700 0 L380 650 L220 650 Z"} fill={`url(#${gradId})`} opacity="0.6" />
          <path d={isTall ? "M700 0 L220 1000 L80 800 Z"   : "M700 0 L220 500  L80 400 Z"} fill={`url(#${gradId})`} opacity="0.3" />
          <path d={isTall ? "M700 0 L680 1300 L580 1300 Z" : "M700 0 L680 650  L580 650 Z"} fill={`url(#${gradId})`} opacity="0.7" />
        </svg>
      )}
    </div>
  )
}

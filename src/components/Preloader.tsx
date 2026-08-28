'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0 = active, 1 = exit-active, 2 = unmounted

  useEffect(() => {
    // Disable body scroll when preloader is active
    document.body.style.overflow = 'hidden'

    // Fast preloader: 600ms animation for good LCP score
    const duration = 600
    const startTime = Date.now()
    let bentoInterval: any = null

    // Bento grid cell flash helper
    const cells = document.querySelectorAll('.bento-cell')
    if (cells.length > 0) {
      bentoInterval = setInterval(() => {
        cells.forEach(c => c.classList.remove('flash'))
        const r = Math.floor(Math.random() * cells.length)
        if (cells[r]) cells[r].classList.add('flash')
      }, 150)
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const current = Math.min(100, Math.floor((elapsed / duration) * 100))
      
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        if (bentoInterval) clearInterval(bentoInterval)
        
        // Exit immediately, then unmount after transition (400ms)
        setTimeout(() => {
          setPhase(1)
          document.body.style.overflow = ''
          setTimeout(() => {
            setPhase(2)
          }, 400)
        }, 0)
      }
    }, 30)

    return () => {
      clearInterval(interval)
      if (bentoInterval) clearInterval(bentoInterval)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 2) return null

  let overlayClass = 'preloader-overlay'
  if (phase === 1) overlayClass += ' exit-active'

  return (
    <div className={overlayClass}>
      {/* Ambient Purple Aura Portal Backdrop */}
      <div className="aura-blob"></div>

      {/* Bento Cell Grid overlay */}
      <div className="bento-grid-overlay">
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
        <div className="bento-cell"></div>
      </div>

      {/* Static Parent Positioner for scale-down (avoids keyframe transform conflicts) */}
      <div className="preloader-logo-positioner">
        {/* Wrapper for entrance scaleDownBento keyframes */}
        <div className="preloader-logo-wrapper">
          <svg viewBox="20 20 60 55" fill="none" className="preloader-svg">
            <g className="logo-parts">
              {/* V-Left segment */}
              <polygon className="p-vl" points="20,20 45,75 35,75" />
              {/* V-Right segment */}
              <polygon className="p-vr" points="45,75 55,75 70,35 60,35" />
              {/* R-Loop segment */}
              <polygon className="p-rl" points="60,35 80,35 80,55 60,55" />
              {/* R-Leg segment */}
              <polygon className="p-rg" points="60,55 70,55 80,75 70,75" />
              {/* Center dot segment (cutout simulated with bg fill to avoid WebKit mask bugs) */}
              <circle className="p-dot" cx="70" cy="45" r="4.2" fill="var(--preloader-bg)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Minimal Bottom Progress Bar & Percentage */}
      <div className="preloader-bottom-bar">
        <div className="p-counter-value">{progress.toString().padStart(2, '0')}%</div>
        <div className="p-progress-track">
          <div className="p-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

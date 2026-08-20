'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Load canvas twice — seeded random guarantees identical geometry on both halves
const Canvas = dynamic(() => import('./BreezeCanvas'), { ssr: false })

export default function BreezeTearEffect() {
  const [tx, setTx] = useState(0) // translateX in vw units

  useEffect(() => {
    const update = () => {
      const vh   = window.innerHeight
      // progress 0→1 over the first 70% of viewport height scrolled
      const raw  = Math.min(window.scrollY / (vh * 0.7), 1)
      // ease-out-cubic: fast start, settles at edges
      const eased = 1 - Math.pow(1 - raw, 3)
      setTx(eased * 42) // each piece travels up to 42vw from center
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const vignette = `radial-gradient(ellipse 70% 65% at 50% 50%,
    transparent 20%,
    rgba(0,0,0,0.55) 55%,
    rgba(0,0,0,0.88) 75%,
    rgba(0,0,0,0.98) 90%,
    #000 100%
  )`

  return (
    <>
      {/* ── Left half — clips to 0→50vw, translates left on scroll ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          clipPath: 'inset(0 50% 0 0)',
          transform: `translateX(-${tx}vw)`,
          willChange: 'transform',
        }}
      >
        <Canvas />
      </div>

      {/* ── Right half — clips to 50vw→100vw, translates right ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          clipPath: 'inset(0 0 0 50%)',
          transform: `translateX(${tx}vw)`,
          willChange: 'transform',
        }}
      >
        <Canvas />
      </div>

      {/* ── Vignette — fixed above canvas, below content sections ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 5, background: vignette }}
      />
    </>
  )
}

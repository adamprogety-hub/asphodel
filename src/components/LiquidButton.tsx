'use client'
import React, { useState, useRef } from 'react'
import { m, useSpring, useMotionValue } from 'framer-motion'

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'green' | 'dark'
}

export default function LiquidButton({
  children,
  variant = 'green',
  style,
  className,
  onClick,
  type = 'button',
  disabled,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  // Cached rect — обновляем один раз при mouseenter, не на каждый mousemove
  const cachedRect = useRef<DOMRect | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Magnetic Pull using Framer Motion
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Читаем геометрию один раз при входе мыши — не на каждый mousemove
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      cachedRect.current = buttonRef.current.getBoundingClientRect()
    }
    setIsHovered(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = cachedRect.current
    if (!rect) return
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    setMousePosition({ x: mouseX, y: mouseY })

    // Magnetic pull distance
    const pullX = (mouseX - rect.width / 2) * 0.15
    const pullY = (mouseY - rect.height / 2) * 0.25
    x.set(pullX)
    y.set(pullY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseDown = () => {
    setIsClicked(true)
  }

  const handleMouseUp = () => {
    setIsClicked(false)
  }

  const isGreen = variant === 'green'

  return (
    <m.button
      ref={buttonRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        border: isGreen ? 'none' : '1px solid rgba(255,255,255,0.08)',
        background: isGreen ? '#10B981' : 'rgba(20,20,25,0.6)',
        color: isGreen ? '#000' : '#fff',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        x: springX,
        y: springY,
        ...style,
      }}
      className={`liquid-button ${className || ''}`}

    >
      {/* ── Background Plasma Glow (Gooey Filter) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        filter: 'url(#gooey-btn)',
        borderRadius: '9999px',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Blob 1: Follows Cursor */}
        <m.div
          style={{
            position: 'absolute',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: isGreen ? '#7C3AED' : '#10B981', // Purple on green, green on dark
            left: mousePosition.x - 45,
            top: mousePosition.y - 45,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
          animate={{
            scale: isClicked ? 5 : isHovered ? 1.6 : 0,
            opacity: isHovered ? 0.9 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: isClicked ? 180 : 100,
            damping: 12,
          }}
        />

        {/* Blob 2: Static / Floating Left */}
        <m.div
          style={{
            position: 'absolute',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: isGreen ? '#0F766E' : '#7C3AED', // Deep teal on green, purple on dark
            left: '20%',
            top: '50%',
            y: '-50%',
            pointerEvents: 'none',
          }}
          animate={{
            scale: isClicked ? 5 : isHovered ? 1.4 : 0.6,
            x: isHovered ? (mousePosition.x - 50) * 0.1 : 0,
            y: isHovered ? (mousePosition.y - 30) * 0.1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 10 }}
        />

        {/* Blob 3: Static / Floating Right */}
        <m.div
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: isGreen ? '#1D4ED8' : '#00E5FF', // Blue on green, Cyan on dark
            right: '20%',
            top: '50%',
            y: '-50%',
            pointerEvents: 'none',
          }}
          animate={{
            scale: isClicked ? 5 : isHovered ? 1.5 : 0.5,
            x: isHovered ? (mousePosition.x - 250) * 0.08 : 0,
            y: isHovered ? (mousePosition.y - 30) * 0.08 : 0,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 10 }}
        />
      </div>

      {/* ── Content (stays 100% crisp) ── */}
      <span style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
        transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}>
        {children}
      </span>
    </m.button>
  )
}

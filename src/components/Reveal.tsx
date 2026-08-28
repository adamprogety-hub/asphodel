'use client'
import { useReveal } from '@/hooks/useReveal'

type RevealType = 'up' | 'left' | 'right' | 'fade'

interface RevealProps {
  type?: RevealType
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Тонкая клиентская обёртка — только IntersectionObserver + CSS класс.
 * Родительский компонент может оставаться Server Component.
 *
 * Использование:
 *   <Reveal type="up" delay={1}>
 *     <p>Static server content</p>
 *   </Reveal>
 */
export function Reveal({ type = 'up', delay, children, className, style }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-rv={type}
      data-rv-d={delay != null ? String(delay) : undefined}
      className={className}
      style={style}
    >
      {children}
    </div>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import { track } from '@/lib/track'

interface Props {
  id: string
  children: React.ReactNode
}

/**
 * Обёртка вокруг секции — измеряет время пребывания пользователя
 * в зоне видимости через IntersectionObserver.
 */
export default function SectionTracker({ id, children }: Props) {
  const ref       = useRef<HTMLDivElement>(null)
  const enterTime = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enterTime.current = Date.now()
        } else if (enterTime.current !== null) {
          const seconds = Math.round((Date.now() - enterTime.current) / 1000)
          enterTime.current = null
          if (seconds >= 2) {
            track('section_time', { section: id, seconds })
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => {
      // Финальный flush при размонтировании
      if (enterTime.current !== null) {
        const seconds = Math.round((Date.now() - enterTime.current) / 1000)
        if (seconds >= 2) track('section_time', { section: id, seconds })
      }
      observer.disconnect()
    }
  }, [id])

  return <div ref={ref}>{children}</div>
}

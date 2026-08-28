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
 *
 * Flush через visibilitychange + sendBeacon — надёжно работает
 * даже при закрытии вкладки.
 */
export default function SectionTracker({ id, children }: Props) {
  const ref       = useRef<HTMLDivElement>(null)
  const enterTime = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    // ── Flush: отправляет накопленное время ──────────────────────────
    const flush = (useBeacon = false) => {
      if (enterTime.current === null) return
      const seconds = Math.round((Date.now() - enterTime.current) / 1000)
      enterTime.current = null
      if (seconds < 2) return

      if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
        // sendBeacon гарантированно отправляется даже при закрытии страницы
        const data = JSON.stringify({
          user_id:    localStorage.getItem('_uid') || 'anon',
          session_id: sessionStorage.getItem('_sid') || '',
          event:      'section_time',
          page:       window.location.pathname,
          referrer:   document.referrer || '',
          payload:    { section: id, seconds },
        })
        navigator.sendBeacon('/api/track', new Blob([data], { type: 'application/json' }))
      } else {
        track('section_time', { section: id, seconds })
      }
    }

    // ── IntersectionObserver ─────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enterTime.current = Date.now()
        } else if (enterTime.current !== null) {
          flush()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    // ── visibilitychange: закрытие вкладки / переключение ────────────
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flush(true) // sendBeacon — надёжнее fetch при unload
      } else {
        // Страница снова видима — перезапускаем таймер
        if (el.getBoundingClientRect().top < window.innerHeight * 0.7) {
          enterTime.current = Date.now()
        }
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      flush() // финальный flush при размонтировании в SPA
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [id])

  return <div ref={ref}>{children}</div>
}

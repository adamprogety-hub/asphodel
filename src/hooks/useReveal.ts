'use client'
import { useEffect, useRef } from 'react'

/**
 * Tiny IntersectionObserver hook — добавляет класс 'rv' когда элемент
 * входит в viewport. Используется вместо Framer Motion whileInView.
 *
 * Использование:
 *   const ref = useReveal<HTMLDivElement>()
 *   <div ref={ref} data-rv="up"> ... </div>
 */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      // Fallback: просто показываем элемент
      if (el) el.style.opacity = '1'
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('rv')
          io.disconnect()
        }
      },
      { threshold },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}

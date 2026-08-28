'use client'
import { useEffect, useRef } from 'react'
import { track } from '@/lib/track'

/**
 * Трекает время которое пользователь провёл на секции.
 * Фиксирует момент входа в viewport и момент выхода.
 * Отправляет section_time только если секция была видна >= 2 секунд.
 *
 * @param sectionId  — уникальное имя секции (hero, about, services, etc.)
 * @param threshold  — какая доля секции должна быть видна (0.3 = 30%)
 */
export function useSectionTime(sectionId: string, threshold = 0.3) {
  const ref       = useRef<HTMLElement | null>(null)
  const enterTime = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Секция вошла в viewport
          enterTime.current = Date.now()
        } else if (enterTime.current !== null) {
          // Секция вышла — считаем время
          const seconds = Math.round((Date.now() - enterTime.current) / 1000)
          enterTime.current = null

          // Отправляем только если >= 2 секунд (игнорируем случайные проскролы)
          if (seconds >= 2) {
            track('section_time', { section: sectionId, seconds })
          }
        }
      },
      { threshold },
    )

    observer.observe(el)

    return () => {
      // При размонтировании — фиксируем оставшееся время
      if (enterTime.current !== null) {
        const seconds = Math.round((Date.now() - enterTime.current) / 1000)
        if (seconds >= 2) {
          track('section_time', { section: sectionId, seconds })
        }
        enterTime.current = null
      }
      observer.disconnect()
    }
  }, [sectionId, threshold])

  return ref
}

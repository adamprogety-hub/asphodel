'use client'
import { useEffect } from 'react'
import { track } from '@/lib/track'

// Один раз при монтировании — фиксируем визит
export default function PageTracker() {
  useEffect(() => {
    track('page_view', {
      referrer: document.referrer || 'direct',
    })
  }, [])

  return null
}

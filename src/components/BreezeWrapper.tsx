'use client'

import dynamic from 'next/dynamic'

// Three.js is client-only — dynamic import with ssr:false must live in a Client Component
const BreezeCanvas = dynamic(() => import('./BreezeCanvas'), { ssr: false })

export default function BreezeWrapper() {
  return <BreezeCanvas />
}

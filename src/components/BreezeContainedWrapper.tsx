'use client'
import dynamic from 'next/dynamic'

const BreezeCanvasContained = dynamic(
  () => import('./BreezeCanvasContained'),
  { ssr: false }
)

export default function BreezeContainedWrapper() {
  return <BreezeCanvasContained />
}

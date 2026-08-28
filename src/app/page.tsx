import Nav            from '@/components/Nav'
import Hero           from '@/components/sections/Hero'
import About          from '@/components/sections/About'
import VideoSection   from '@/components/sections/VideoSection'
import ShimmeringGrid from '@/components/ShimmeringGrid'
import Services       from '@/components/sections/Services'
import Responsibility from '@/components/sections/Responsibility'
import LeadMagnets    from '@/components/sections/LeadMagnets'
import Process        from '@/components/sections/Process'
import Portfolio      from '@/components/sections/Portfolio'
import Calculator     from '@/components/sections/Calculator'
import Reviews        from '@/components/sections/Reviews'
import FAQ            from '@/components/sections/FAQ'
import FinalCTA       from '@/components/sections/FinalCTA'
import Footer         from '@/components/sections/Footer'
import FloatingActions from '@/components/FloatingActions'
import SectionTracker from '@/components/SectionTracker'
// import Reels from '@/components/sections/Reels' // временно скрыто


const R = '28px'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* ═══ PLAQUE 1: Hero ═══ */}
        <div style={{ borderRadius: `0 0 ${R} ${R}`, overflow: 'hidden' }}>
          <SectionTracker id="hero"><Hero /></SectionTracker>
        </div>

        {/* ─── White sections ─── */}
        <SectionTracker id="about"><About /></SectionTracker>
        <SectionTracker id="video"><VideoSection /></SectionTracker>

        {/* ═══ PLAQUE 2: Services + Marquee + Lead Magnets ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0' }}>
          <SectionTracker id="services"><Services /></SectionTracker>
          <SectionTracker id="responsibility"><Responsibility /></SectionTracker>
          <SectionTracker id="lead-magnets"><LeadMagnets /></SectionTracker>
        </div>

        {/* ─── White section ─── */}
        <SectionTracker id="process"><Process /></SectionTracker>

        {/* ═══ PLAQUE 3: Portfolio + Calculator (Seamless Unified Background) ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0', position: 'relative', background: 'var(--dark)' }}>
          <ShimmeringGrid position="right" height="100%" id="portfolio" />
          <SectionTracker id="portfolio"><Portfolio /></SectionTracker>
          <SectionTracker id="calculator"><Calculator /></SectionTracker>
        </div>

        {/* ─── White section ─── */}
        <SectionTracker id="reviews"><Reviews /></SectionTracker>

        {/* ═══ PLAQUE 4: FAQ ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0' }}>
          <SectionTracker id="faq"><FAQ /></SectionTracker>
        </div>

        {/* ─── White section ─── */}
        <SectionTracker id="final-cta"><FinalCTA /></SectionTracker>

        {/* ═══ PLAQUE 5: Footer ═══ */}
        <div style={{ borderRadius: `${R} ${R} 0 0`, overflow: 'hidden' }}>
          <Footer />
        </div>
      </main>

      {/* Floating action buttons stack (Calls, Messengers, Scroll-to-top) */}
      <FloatingActions />
    </>
  )
}

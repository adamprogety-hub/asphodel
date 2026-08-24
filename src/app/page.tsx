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


const R = '28px'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* ═══ PLAQUE 1: Hero ═══ */}
        <div style={{ borderRadius: `0 0 ${R} ${R}`, overflow: 'hidden' }}>
          <Hero />
        </div>

        {/* ─── White sections ─── */}
        <About />
        <VideoSection />

        {/* ═══ PLAQUE 2: Services + Marquee + Lead Magnets ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0' }}>
          <Services />
          <Responsibility />
          <LeadMagnets />
        </div>

        {/* ─── White section ─── */}
        <Process />

        {/* ═══ PLAQUE 3: Portfolio + Calculator (Seamless Unified Background) ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0', position: 'relative', background: 'var(--dark)' }}>
          <ShimmeringGrid position="right" height="100%" id="portfolio" />
          <Portfolio />
          <Calculator />
        </div>

        {/* ─── White section ─── */}
        <Reviews />

        {/* ═══ PLAQUE 4: FAQ ═══ */}
        <div style={{ borderRadius: R, overflow: 'hidden', margin: '12px 0' }}>
          <FAQ />
        </div>

        {/* ─── White section ─── */}
        <FinalCTA />

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


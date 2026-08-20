'use client'
import { motion } from 'framer-motion'

// Titan bottom grid section: dark bento-style grid of features
// Icons: ✦ ✚ and numbers, like "Professional coaches * | Medical office + | 4 zones | center image | WiFi | Tanning | etc."

const tiles = [
  // col 1
  { icon:'✦', title:'Работаем только по договору', sub:'', span:'', wide: false },
  { icon:'+', title:'Полная прозрачность расходов', sub:'', span:'', wide: false },
  { icon:'5', sup:'+', title:'Лет в профессии', sub:'', span:'', wide: false },
  // col 2 — center tall (brand letter)
  // col 3
  { icon:'📡', title:'Яндекс Директ', sub:'', wide: false },
  { icon:'📱', title:'VK и Telegram Ads', sub:'', wide: false },
  { icon:'⚡', title:'Аналитика и отчёты', sub:'', wide: false },
  { icon:'', title:'100%', sub:'работа с договором и отчётами', wide: true },
]

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--dark)', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Bento grid — 3 col × 3 row, center = large brand cell */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(3, auto)',
            gap: '10px',
          }}
          className="services-grid"
        >
          {/* Row 1, Col 1: asterisk + Professional */}
          <Cell icon="✦" text="Работаем только по договору — без устных обещаний" />
          {/* Row 1, Col 2: CENTER — big brand visual, rowSpan 3 */}
          <div style={{
            gridRow: '1 / 4', background: '#1E1E1E', borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
            minHeight: '340px',
          }} className="services-brand-cell">
            {/* Large brand letter like Titan's "T" */}
            <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(100px,14vw,200px)', color: 'var(--green)', lineHeight:1, letterSpacing:'-0.06em', userSelect:'none' }}>
              VR
            </span>
            <div style={{ position:'absolute', bottom:'20px', left:'20px' }}>
              <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                V. R. Asphodel
              </span>
            </div>
          </div>
          {/* Row 1, Col 3 */}
          <Cell icon="📡" text="Яндекс Директ" />

          {/* Row 2, Col 1 */}
          <Cell icon="+" text="Полная прозрачность рекламных расходов" />
          {/* Row 2, Col 3 */}
          <Cell icon="📱" text="VK Реклама и Telegram Ads" />

          {/* Row 3, Col 1: number */}
          <Cell icon="5+" text="лет в профессии" />
          {/* Row 3, Col 3: wide with text */}
          <Cell icon="100%" text="работа по договору с отчётами" />
        </motion.div>
      </div>
    </section>
  )
}

function Cell({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{
      background: '#1A1A1A', borderRadius: '18px', padding: '28px 24px',
      display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '108px',
    }}>
      <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(22px,2.5vw,32px)', color:'#fff', lineHeight:1, letterSpacing:'-0.02em' }}>
        {icon}
      </span>
      <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'clamp(13px,1.1vw,15px)', color:'rgba(255,255,255,0.55)', lineHeight:1.65 }}>
        {text}
      </p>
    </div>
  )
}

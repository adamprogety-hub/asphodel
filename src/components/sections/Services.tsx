'use client'
import { motion } from 'framer-motion'
import ShimmeringGrid from '@/components/ShimmeringGrid'

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
    <section id="services" style={{ background: 'var(--dark)', padding: 'clamp(60px,7vw,96px) 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration: alternating top-left grid */}
      <ShimmeringGrid position="left" id="services" />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

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
          <Cell spriteClass="bento-sprite-sheet2 sprite-s2-browser" title="Уникальный дизайн" text="Никаких шаблонов — проектируем уникальный интерфейс под ваш продукт" />
          {/* Row 1, Col 2: CENTER — big brand visual, rowSpan 3 */}
          <div style={{
            gridRow: '1 / 4', borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
            minHeight: '340px',
          }} className="services-brand-cell services-card">
            {/* Ambient purple backlight glow */}
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(208, 123, 255, 0.35) 0%, transparent 70%)',
              filter: 'blur(28px)',
              pointerEvents: 'none',
              zIndex: 0,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
            <img 
              src="/services_brand_image.png" 
              alt="VR Brand Visual" 
              style={{ 
                width: '105%', 
                height: 'auto', 
                maxHeight: '310px',
                objectFit: 'contain',
                transform: 'rotate(-15deg)',
                userSelect: 'none',
                pointerEvents: 'none',
                position: 'relative',
                zIndex: 1
              }} 
            />
            <div style={{ position:'absolute', bottom:'20px', left:'20px', zIndex: 2 }}>
              <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                V. R. Asphodel
              </span>
            </div>
          </div>
          {/* Row 1, Col 3 */}
          <Cell spriteClass="bento-sprite-sheet1 sprite-s1-yandex" title="Яндекс Директ" text="Жестко чистим мусорный трафик и боремся за конверсии" />

          {/* Row 2, Col 1 */}
          <Cell spriteClass="bento-sprite-sheet1 sprite-s1-safe" title="Честные медиапланы" text="Рассчитываем окупаемость рекламы до её запуска" />
          {/* Row 2, Col 3 */}
          <Cell spriteClass="bento-sprite-sheet2 sprite-s2-chat" title="Трафик-системы" text="От точечного парсинга аудиторий до умных чат-ботов" />

          {/* Row 3, Col 1: number */}
          <Cell spriteClass="bento-sprite-sheet1 sprite-s1-calendar" title="5+ лет опыта" text="Создаем сайты, которые вызывают доверие с первой секунды" />
          {/* Row 3, Col 3: wide with text */}
          <Cell spriteClass="bento-sprite-sheet2 sprite-s2-graph" title="100% прозрачность" text="Еженедельные отчеты о цене лида простым языком" />
        </motion.div>
      </div>
    </section>
  )
}

function Cell({ spriteClass, title, text }: { spriteClass: string; title: string; text: string }) {
  return (
    <div style={{
      borderRadius: '18px', padding: '20px 24px',
      display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between',
      minHeight: '130px',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden',
    }} className="services-card">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
        <h4 style={{
          fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: 'clamp(14px, 1.2vw, 16px)',
          color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {title}
        </h4>
        <p style={{
          fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: 'clamp(12px, 1vw, 13px)',
          color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.5,
          margin: 0,
        }}>
          {text}
        </p>
      </div>
      <div className="bento-icon">
        <div className={`bento-sprite ${spriteClass}`} />
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ShimmeringGrid from '@/components/ShimmeringGrid'
import { useContactModal } from '@/components/ContactModal'
import LiquidButton from '@/components/LiquidButton'




// Pill tag component — Titan "Sport center" label
const Tag = ({ label }: { label: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '13px', color: '#111',
    border: '1px solid #ddd', borderRadius: 'var(--r-pill)',
    padding: '6px 18px', marginBottom: '24px',
  }}>
    {label}
  </span>
)

export default function About() {
  const { openModal } = useContactModal()
  return (
    <section id="about" style={{ background: '#fff', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '380px 1fr', gap: '60px', alignItems: 'start' }} className="about-grid">

        {/* Left: tag + heading + text + button */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
          <Tag label="О нас" />
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(26px,2.8vw,40px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.12, marginBottom:'20px' }}>
            Помогаем предпринимателям получать заявки из интернета
          </h2>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.78, marginBottom:'28px' }}>
            Нас двое — Илья Хаймин (бренд-менеджер, 5+ лет) и Александр Герасимов (маркетолог, 6 лет). Делаем сайты и настраиваем рекламу — так, чтобы вы могли заниматься делом, а не разбираться в инструментах.
          </p>
          <LiquidButton
            variant="dark"
            onClick={() => openModal({
              title: 'Обсудить проект',
              description: 'Расскажите о задаче — пришлём предложение в течение рабочего дня.',
            })}
            style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'13px', padding:'10px 22px' }}
          >
            Обсудить проект
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ marginLeft: '4px' }}>
              <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </LiquidButton>
        </motion.div>


        {/* Right: 2 dark zone cards — Titan "Power zone / Cardio zone" */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '12px', height: '420px' }} className="about-zones-grid">
          {/* Card 1 — Сайты */}
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }}
            style={{ background:'#141414', borderRadius:'18px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'20px' }}
            className="about-zone-card"
          >
            {/* Zone label top-left */}
            <div style={{ display:'flex', flexDirection:'column', gap:'8px', width:'fit-content', zIndex:3, alignItems:'flex-start' }}>
              <div style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.1)', borderRadius:'var(--r-pill)', padding:'5px 14px' }}>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color:'#fff' }}>Разработка сайтов</span>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.1)', borderRadius:'var(--r-pill)', padding:'5px 14px' }}>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color:'#fff' }}>Илья</span>
              </div>
            </div>

            {/* Spotlight shimmer grid behind Ilya */}
            <div style={{ position: 'absolute', right: 0, bottom: 0, width: '280px', height: '100%', overflow: 'hidden', zIndex: 1 }}>
              <ShimmeringGrid 
                position="right" 
                height="100%" 
                width="100%" 
                cols={7} 
                rows={11} 
                id="about-ilya" 
                maskCircle={true} 
                showRays={false} 
              />
            </div>

            {/* Photo background overlay */}
            <img 
              src="/avatars/ilya.webp" loading="lazy" decoding="async"
              width={500} height={500}
              alt="Илья Хаймин" 
              style={{
                position: 'absolute',
                right: '-10px',
                bottom: '0',
                height: '85%',
                width: 'auto',
                objectFit: 'contain',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.85
              }}
            />

            {/* Bottom: label + arrow */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', zIndex: 2 }}>
              <div style={{ maxWidth: '70%' }}>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(16px,1.6vw,22px)', color:'#fff', lineHeight:1.25, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  Лендинги, корпоративные сайты, мультистраничные
                </p>
              </div>
              <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'12px', cursor:'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Реклама */}
          <motion.div
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.18 }}
            style={{ background:'#1E1E1E', borderRadius:'18px', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'20px' }}
            className="about-zone-card"
          >
            <div style={{ display:'flex', flexDirection:'column', gap:'8px', width:'fit-content', zIndex:3, alignItems:'flex-start' }}>
              <div style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.08)', borderRadius:'var(--r-pill)', padding:'5px 14px' }}>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color:'#fff' }}>Реклама и продвижение</span>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.08)', borderRadius:'var(--r-pill)', padding:'5px 14px' }}>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color:'#fff' }}>Александр</span>
              </div>
            </div>

            {/* Spotlight shimmer grid behind Alexander */}
            <div style={{ position: 'absolute', right: 0, bottom: 0, width: '280px', height: '100%', overflow: 'hidden', zIndex: 1 }}>
              <ShimmeringGrid 
                position="right" 
                height="100%" 
                width="100%" 
                cols={7} 
                rows={11} 
                id="about-alex" 
                maskCircle={true} 
                showRays={false} 
              />
            </div>

            {/* Photo background overlay */}
            <img 
              src="/avatars/alexander.webp" loading="lazy" decoding="async"
              width={500} height={500}
              alt="Александр Герасимов" 
              className="about-photo-alexander"
              style={{
                position: 'absolute',
                right: '-40px',
                bottom: '0',
                height: '85%',
                width: 'auto',
                objectFit: 'contain',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.85
              }}
            />

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', zIndex: 2 }}>
              <div style={{ maxWidth: '70%' }}>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(15px,1.4vw,20px)', color:'#fff', lineHeight:1.3, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  Яндекс Директ, VK, Telegram Ads
                </p>
              </div>
              <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'12px', cursor:'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

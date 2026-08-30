'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const reviews = [
  { name:'Марина К.',   role:'Служба дезинфекции участков',  text:'Разработали промо-сайт и запустили рекламу точно к началу сезона. Поток звонков пошел сразу, причем клиенты целевые — с большими участками. Очень довольны подходом.', avatar: '/avatars/avatar2.webp' },
  { name:'Алексей Н.',  role:'Производство шкафов автоматики',        text:'У нас сложный B2B-продукт, другие агентства не могли вникнуть в техническую часть. Здесь ребята сами разобрались в спецификациях, написали грамотные тексты и привели крупных промышленных заказчиков.', avatar: '/avatars/avatar1.webp' },
  { name:'Ольга В.',    role:'Аварийная клининговая служба',            text:'Запустили контекстную рекламу на уборку помещений после ЧП. Звонки пошли в первые же дни. Отдельное спасибо за честность с бюджетами — платим Яндексу напрямую, расходы полностью прозрачны.', avatar: '/avatars/avatar3.webp' },
]

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 0.96
  },
  center: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0.96
  }
}

export default function Reviews() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" style={{ background: '#fff', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'36px' }} className="reviews-header">
          <div>
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>Отзывы</span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              Что говорят клиенты
            </h2>
          </div>
          {/* Arrows container - visible only on mobile when slider is active */}
          <div style={{ display: mounted && isMobile ? 'flex' : 'none', gap: '8px' }}>
            <m.button 
              aria-label="Предыдущий отзыв"
              whileHover="hover"
              whileTap="hover"
              onClick={prevSlide}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #ddd', background:'#fff', cursor:'pointer', fontSize:'15px', color:'#666', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', position: 'relative' }}
              className="hover:border-black hover:text-black"
            >
              <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <m.svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  variants={{
                    normal: { opacity: 1, scale: 1, rotate: 0 },
                    hover: { opacity: 0, scale: 0.3, rotate: -45 }
                  }}
                  initial="normal"
                  animate="normal"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ position: 'absolute' }}
                >
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </m.svg>
                <m.div
                  variants={{
                    normal: { opacity: 0, scale: 0 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  initial="normal"
                  animate="normal"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor'
                  }}
                />
              </div>
            </m.button>
            <m.button 
              aria-label="Следующий отзыв"
              whileHover="hover"
              whileTap="hover"
              onClick={nextSlide}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #111', background:'#111', cursor:'pointer', fontSize:'15px', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', position: 'relative' }}
              className="hover:opacity-90"
            >
              <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <m.svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  variants={{
                    normal: { opacity: 1, scale: 1, rotate: 0 },
                    hover: { opacity: 0, scale: 0.3, rotate: 45 }
                  }}
                  initial="normal"
                  animate="normal"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ position: 'absolute' }}
                >
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </m.svg>
                <m.div
                  variants={{
                    normal: { opacity: 0, scale: 0 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  initial="normal"
                  animate="normal"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'currentColor'
                  }}
                />
              </div>
            </m.button>
          </div>
        </div>

        {/* Reviews cards container */}
        {mounted && isMobile ? (
          /* Mobile Slider with Framer Motion */
          <div style={{ position: 'relative', minHeight: '260px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <AnimatePresence initial={false} mode="wait">
              <m.div
                key={activeIdx}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) {
                    nextSlide()
                  } else if (info.offset.x > 50) {
                    prevSlide()
                  }
                }}
                transition={{ duration: 0.24, ease: 'easeInOut' }}
                style={{ 
                  background:'#141414', borderRadius:'18px', padding:'28px', display:'flex', flexDirection:'column', 
                  justifyContent:'space-between', minHeight:'240px', width: '100%',
                  touchAction: 'pan-y'
                }}
              >
                <div>
                  <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'var(--green)', lineHeight:1, display:'block', marginBottom:'16px', opacity:0.6 }}>"</span>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'24px' }}>{reviews[activeIdx].text}</p>
                </div>
                <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2A2A2A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
                    {reviews[activeIdx].avatar ? (
                      <Image src={reviews[activeIdx].avatar!} alt={reviews[activeIdx].name} fill style={{ objectFit:'cover' }} sizes="36px" />
                    ) : (
                      <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'var(--green)' }}>{reviews[activeIdx].name[0]}</span>
                    )}
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#fff' }}>{reviews[activeIdx].name}</p>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{reviews[activeIdx].role}</p>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop 3-column Grid */
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }} className="reviews-cards-grid">
            {reviews.map((r, idx) => (
              <m.div key={idx}
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.6, delay:idx*0.1 }}
                style={{ background:'#141414', borderRadius:'18px', padding:'28px' }}
              >
                <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'var(--green)', lineHeight:1, display:'block', marginBottom:'16px', opacity:0.6 }}>"</span>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'24px' }}>{r.text}</p>
                <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2A2A2A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
                    {r.avatar ? (
                      <Image src={r.avatar!} alt={r.name} fill style={{ objectFit:'cover' }} sizes="36px" />
                    ) : (
                      <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'var(--green)' }}>{r.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#fff' }}>{r.name}</p>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{r.role}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

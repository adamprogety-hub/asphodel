'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cases = [
  { niche:'Шкафы автоматики',    tag:'Под ключ',  result:'Сайт-каталог продукции и запуск рекламы в Яндекс Директ для B2B-продаж.',    price:'Стоимость сайта: от 175 000 ₽', img: '/projects/project1.webp' },
  { niche:'Обработка участков',   tag:'Сайт',      result:'Промо-сайт услуг дезинфекции и сезонная рекламная кампания в регионе.', price:'Стоимость сайта: от 175 000 ₽', img: '/projects/project2.webp' },
  { niche:'Аварийный клининг',    tag:'Реклама',   result:'Настройка контекстной рекламы Яндекс Директ для привлечения срочных заказов.', price:'Стоимость сайта: от 175 000 ₽', img: '/projects/project3.webp' },
  { niche:'Диспетчеризация вентиляции', tag:'Лендинг', result:'Презентационный лендинг для сложного инженерного решения по автоматизации.', price:'Стоимость сайта: от 65 000 ₽', img: '/projects/project4.webp' },
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

export default function Portfolio() {
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
    setActiveIdx((prev) => (prev + 1) % cases.length)
  }

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + cases.length) % cases.length)
  }

  return (
    <section id="portfolio" style={{ background: 'transparent', padding: 'clamp(60px,7vw,96px) 40px', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'36px' }} className="portfolio-header">
          <div>
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>
              Кейсы
            </span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              Наши проекты
            </h2>
          </div>
          {/* Arrows container - visible only on mobile when slider is active */}
          <div style={{ display: mounted && isMobile ? 'flex' : 'none', gap: '8px' }}>
            <motion.button 
              aria-label="Предыдущий проект"
              whileHover="hover"
              whileTap="hover"
              onClick={prevSlide}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.15)', background:'transparent', cursor:'pointer', fontSize:'15px', color:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', position: 'relative' }}
              className="hover:border-white hover:text-white"
            >
              <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.svg
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
                </motion.svg>
                <motion.div
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
            </motion.button>
            <motion.button 
              aria-label="Следующий проект"
              whileHover="hover"
              whileTap="hover"
              onClick={nextSlide}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #fff', background:'#fff', cursor:'pointer', fontSize:'15px', color:'#111', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', position: 'relative' }}
              className="hover:opacity-90"
            >
              <div style={{ position: 'relative', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.svg
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
                </motion.svg>
                <motion.div
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
            </motion.button>
          </div>
        </div>

        {/* Portfolio cards container */}
        {mounted && isMobile ? (
          /* Mobile Slider with Framer Motion */
          <div style={{ position: 'relative', minHeight: '390px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
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
                className="portfolio-card group"
                style={{ 
                  borderRadius:'18px', padding:'24px', display:'flex', flexDirection:'column', 
                  justifyContent:'space-between', minHeight:'390px', cursor:'pointer', width: '100%',
                  touchAction: 'pan-y'
                }}
              >
                <div>
                  {/* Screenshot Container */}
                  <div style={{ width:'100%', height:'154px', borderRadius:'12px', overflow:'hidden', position:'relative', border:'1px solid rgba(255, 255, 255, 0.08)', marginBottom:'18px', background:'#1c1c1e' }}>
                    <img src={cases[activeIdx].img} alt={cases[activeIdx].niche} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                  </div>

                  <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'var(--green)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{cases[activeIdx].tag}</span>
                  <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(18px,1.6vw,22px)', color:'#fff', marginTop:'10px', marginBottom:'12px', letterSpacing:'-0.015em', lineHeight:1.2 }}>{cases[activeIdx].niche}</h3>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>{cases[activeIdx].result}</p>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'15px', color:'rgba(255,255,255,0.7)' }}>{cases[activeIdx].price}</span>
                  <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-[rgba(255,255,255,0.5)]" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Desktop 4-column Grid */
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px' }} className="portfolio-cards-grid">
            {cases.map((c, idx) => (
              <motion.div key={idx}
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.6, delay:idx*0.07 }}
                className="portfolio-card group"
                style={{ borderRadius:'18px', padding:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'390px', cursor:'pointer' }}
              >
                <div>
                  {/* Screenshot Container */}
                  <div style={{ width:'100%', height:'154px', borderRadius:'12px', overflow:'hidden', position:'relative', border:'1px solid rgba(255, 255, 255, 0.08)', marginBottom:'18px', background:'#1c1c1e' }}>
                    <img src={c.img} alt={c.niche} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.4s ease' }} className="group-hover:scale-[1.04]" />
                  </div>

                  <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'var(--green)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{c.tag}</span>
                  <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(18px,1.6vw,22px)', color:'#fff', marginTop:'10px', marginBottom:'12px', letterSpacing:'-0.015em', lineHeight:1.2 }}>{c.niche}</h3>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>{c.result}</p>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'15px', color:'rgba(255,255,255,0.7)' }}>{c.price}</span>
                  <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }} className="group-hover:bg-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transition:'color 0.2s' }} className="text-[rgba(255,255,255,0.5)] group-hover:text-black" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

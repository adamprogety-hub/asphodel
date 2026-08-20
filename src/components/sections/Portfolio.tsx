'use client'
import { motion } from 'framer-motion'

const cases = [
  { niche:'Юридические услуги',  tag:'Под ключ',  result:'23 заявки за первый месяц',    price:'от 280 000 ₽' },
  { niche:'Репетитор',           tag:'Сайт',      result:'Запись на 3 месяца вперёд',     price:'от 175 000 ₽' },
  { niche:'Студия маникюра',     tag:'Реклама',   result:'ROAS 380% · 40+ новых клиентов', price:'от 42 000 ₽/мес' },
  { niche:'Фотограф',            tag:'Лендинг',   result:'Заказ на 5-й день после запуска', price:'от 65 000 ₽' },
]

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ background: 'var(--dark)', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'36px' }}>
          <div>
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>
              Кейсы
            </span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              Наши проекты.
            </h2>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {['←','→'].map((a,i) => (
              <button key={i} style={{ width:'40px', height:'40px', borderRadius:'50%', border:`1px solid ${i===1?'#fff':'rgba(255,255,255,0.15)'}`, background:i===1?'#fff':'transparent', cursor:'pointer', fontSize:'15px', color:i===1?'#111':'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio cards — dark zone card style */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px' }}>
          {cases.map((c, idx) => (
            <motion.div key={idx}
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:idx*0.07 }}
              style={{ background:'#1A1A1A', borderRadius:'18px', padding:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'240px', border:'1px solid rgba(255,255,255,0.05)', transition:'border-color 0.25s', cursor:'pointer' }}
              whileHover={{ borderColor:'rgba(255,255,255,0.18)' }}
            >
              <div>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'var(--green)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{c.tag}</span>
                <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(18px,1.6vw,22px)', color:'#fff', marginTop:'10px', marginBottom:'12px', letterSpacing:'-0.015em', lineHeight:1.2 }}>{c.niche}</h3>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.65 }}>{c.result}</p>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px', paddingTop:'16px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'15px', color:'rgba(255,255,255,0.7)' }}>{c.price}</span>
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1v8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

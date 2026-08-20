'use client'
import { motion } from 'framer-motion'

// Dark stats bar — matching Creatix "2000+ | 10+ | 800+ | 150M+"
const stats = [
  { num:'4+',   label:'Кейса' },
  { num:'5+',   label:'Лет опыта' },
  { num:'100+', label:'Часов в рекламе' },
  { num:'95%',  label:'Довольных клиентов' },
]

export default function Pains() {
  return (
    <section id="pains" style={{ background:'var(--dark)', padding:'32px 48px', position:'relative' }}>
      <motion.div
        initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0' }}
      >
        {stats.map((s, idx) => (
          <div key={idx} style={{
            paddingLeft: idx === 0 ? 0 : '40px',
            borderLeft: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
          }}>
            <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,42px)', color:'#fff', lineHeight:1, marginBottom:'4px', letterSpacing:'-0.02em' }}>
              {s.num}
            </p>
            <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)' }}>{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

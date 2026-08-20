'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Process — Titan "How we work" style: white bg, pill tag, list of steps with numbered circles
const steps = [
  { n:'01', title:'Созвон-знакомство',         desc:'20–30 минут. Рассказываете о задаче, мы задаём вопросы. Бесплатно, без обязательств.' },
  { n:'02', title:'Предложение и смета',        desc:'В течение 1–2 дней: что делаем, сколько стоит, когда готово. Всё фиксируем в договоре.' },
  { n:'03', title:'Работа по этапам',           desc:'Каждый этап — согласование. Правки включены, никаких сюрпризов в конце.' },
  { n:'04', title:'Сдача и обучение',           desc:'Передаём с инструкцией. Первые 2 недели на связи — объясняем всё что нужно.' },
]

export default function Process() {
  return (
    <section id="process" style={{ background: '#fff', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="process-grid">
          {/* Left: sticky heading */}
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} style={{ position:'sticky', top:'80px' }} className="process-left-sticky">
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
              Как работаем
            </span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.12, marginBottom:'24px' }}>
              Четыре шага до первой заявки.
            </h2>
            <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.75, marginBottom:'28px', maxWidth:'340px' }}>
              Сделали процесс простым и прозрачным — вы понимаете что происходит на каждом шаге.
            </p>
            <Link href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'13px', color:'#fff', background:'#111', padding:'10px 22px', borderRadius:'var(--r-pill)', textDecoration:'none', transition:'opacity 0.2s' }} className="hover:opacity-75">
              Начать →
            </Link>
          </motion.div>

          {/* Right: steps */}
          <div style={{ borderTop:'1px solid #eee' }}>
            {steps.map((s, idx) => (
              <motion.div key={idx}
                initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ duration:0.6, delay:idx*0.08 }}
                style={{ display:'flex', gap:'20px', padding:'28px 0', borderBottom:'1px solid #eee', alignItems:'flex-start' }}
              >
                <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'#eee', lineHeight:1, flexShrink:0, width:'52px' }}>{s.n}</span>
                <div>
                  <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(16px,1.5vw,20px)', color:'#111', marginBottom:'8px', letterSpacing:'-0.01em' }}>{s.title}</h3>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.7 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

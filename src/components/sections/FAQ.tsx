'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const faqs = [
  { q:'Сколько стоит сайт?', a:'Лендинг — от 65 000 ₽, мультистраничный — от 175 000 ₽. Точную стоимость обсуждаем на созвоне — она зависит от объёма и задачи.' },
  { q:'Рекламный бюджет входит в стоимость?', a:'Нет, всегда отдельно. Рекламный бюджет вы оплачиваете напрямую в Яндекс или VK — не через нас. Мы берём только за настройку и ведение.' },
  { q:'Сколько занимает разработка сайта?', a:'Лендинг — 7–14 рабочих дней. Мультистраничный — от 3 недель. Дедлайн фиксируем в договоре.' },
  { q:'Вы работаете по договору?', a:'Да, всегда. Прописываем что делаем, сроки, стоимость и количество итераций правок. Без устных договорённостей.' },
  { q:'Что от меня нужно?', a:'Рассказать о бизнесе, предоставить материалы (фото, лого если есть), давать обратную связь в течение 1–2 дней.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section id="faq" style={{ background: 'var(--dark)', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '80px' }}>
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
            Вопросы
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:'24px' }}>
            Часто спрашивают.
          </h2>
          <Link href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'13px', color:'#000', background:'var(--green)', padding:'10px 22px', borderRadius:'var(--r-pill)', textDecoration:'none', transition:'opacity 0.2s' }} className="hover:opacity-85">
            Задать вопрос →
          </Link>
        </motion.div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 0', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:'20px' }}>
                <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(15px,1.4vw,18px)', color:'#fff', lineHeight:1.3 }}>{f.q}</span>
                <motion.span animate={{ rotate: open===i ? 45 : 0 }} transition={{ duration:0.2 }} style={{ fontFamily:'var(--ff-b)', fontWeight:300, fontSize:'24px', color:'var(--green)', flexShrink:0, lineHeight:1 }}>+</motion.span>
              </button>
              <motion.div initial={false} animate={{ height: open===i ? 'auto' : 0, opacity: open===i ? 1 : 0 }} transition={{ duration:0.28 }} style={{ overflow:'hidden' }}>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.5)', lineHeight:1.75, paddingBottom:'22px', maxWidth:'540px' }}>{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

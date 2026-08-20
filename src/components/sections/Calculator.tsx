'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ── Pricing plans ─────────────────────────────────────────────
const plans = [
  {
    tag:   'Старт',
    title: 'Лендинг',
    price: 'от 65 000 ₽',
    desc:  'Один экран с продажей одного продукта/услуги. Идеально для первого выхода в интернет.',
    items: ['Структура и дизайн', 'Верстка (адаптив)', 'Форма заявки', 'Подключение Яндекс.Метрики', 'Инструкция по редактированию'],
    dark: false,
    green: false,
  },
  {
    tag:   'Популярное',
    title: 'Сайт + реклама',
    price: 'от 280 000 ₽',
    desc:  'Готовая система под ключ: сайт, настройка рекламы и первый месяц ведения включены.',
    items: ['Многостраничный сайт (3–5 стр.)', 'Тексты от нас', 'Настройка рекламы (Яндекс/VK)', 'Ведение первого месяца', 'Еженедельные отчёты'],
    dark: true,
    green: false,
  },
  {
    tag:   'Реклама',
    title: 'Настройка + ведение',
    price: 'от 35 000 ₽/мес',
    desc:  'Запуск и оптимизация рекламных кампаний. Без посредников — бюджет напрямую в платформу.',
    items: ['Яндекс Директ, VK или Telegram', 'Настройка аналитики', 'Еженедельный отчёт', 'Оптимизация кампаний', 'Связь в мессенджере'],
    dark: false,
    green: false,
  },
]

// ── Calculator ────────────────────────────────────────────────
type SK = 'site' | 'adsSetup' | 'adsManage' | 'audit'
type ST = 'landing' | 'multi' | 'large'
type PL = 'yandex' | 'vk' | 'telegram'
const P = { site:{ landing:65000, multi:175000, large:225000 }, texts:25000, setup:{ base:62500, extra:22000 }, manage:35000, audit:20000 }
const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

function Check({ on }: { on: boolean }) {
  return (
    <div style={{ width:'18px', height:'18px', borderRadius:'4px', flexShrink:0, border:`1.5px solid ${on?'var(--green)':'rgba(255,255,255,0.15)'}`, background:on?'var(--green)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
      {on && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5L8.5 2" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  )
}

function Dot({ on }: { on: boolean }) {
  return <div style={{ width:'16px', height:'16px', borderRadius:'50%', flexShrink:0, border:`1.5px solid ${on?'var(--green)':'rgba(255,255,255,0.15)'}`, background:on?'var(--green)':'transparent', transition:'all 0.2s' }} />
}

const calcBtn = (active: boolean): React.CSSProperties => ({
  fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px',
  color: active ? '#000' : 'rgba(255,255,255,0.6)',
  background: active ? 'var(--green)' : '#1E1E1E',
  border: `1px solid ${active ? 'var(--green)' : 'rgba(255,255,255,0.08)'}`,
  padding:'12px 16px', cursor:'pointer', transition:'all 0.2s',
  textAlign:'left', width:'100%', display:'flex', alignItems:'center', gap:'10px',
  borderRadius:'10px',
})

export default function Calculator() {
  const [sv, setSv] = useState<Record<SK,boolean>>({ site:false, adsSetup:false, adsManage:false, audit:false })
  const [st, setSt] = useState<ST|null>(null)
  const [tx, setTx] = useState<boolean|null>(null)
  const [pl, setPl] = useState<Set<PL>>(new Set())

  const tog  = (k: SK) => setSv(s => ({ ...s, [k]: !s[k] }))
  const togP = (p: PL) => setPl(prev => { const s = new Set(prev); s.has(p) ? s.delete(p) : s.add(p); return s })

  let min = 0; const parts: string[] = []
  if (sv.site && st)             { const b = P.site[st] + (tx ? P.texts : 0); min += b; parts.push(`Сайт: от ${fmt(b)}`) }
  if (sv.adsSetup && pl.size > 0) { const b = P.setup.base + (pl.size - 1) * P.setup.extra; min += b; parts.push(`Настройка рекламы: от ${fmt(b)}`) }
  if (sv.adsManage)               { min += P.manage; parts.push(`Ведение: от ${fmt(P.manage)}/мес`) }
  if (sv.audit)                   { min += P.audit; parts.push(`Аудит: от ${fmt(P.audit)}`) }

  return (
    <section id="calculator" style={{ background:'var(--dark)', padding:'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ marginBottom:'40px' }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>
            Тарифы и цены
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1 }}>
            Форматы работы.
          </h2>
        </motion.div>

        {/* ── Pricing cards ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'16px' }} className="calculator-plans-grid">
          {plans.map((p, idx) => (
            <motion.div key={idx}
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:idx*0.08 }}
              style={{ background: p.dark ? '#1E1E1E' : '#1A1A1A', borderRadius:'18px', padding:'32px 28px', border:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', gap:'20px', position:'relative' }}
            >
              {/* Popular badge */}
              {p.dark && (
                <div style={{ position:'absolute', top:'-12px', left:'28px', background:'var(--green)', borderRadius:'var(--r-pill)', padding:'4px 14px' }}>
                  <span style={{ fontFamily:'var(--ff-b)', fontWeight:700, fontSize:'11px', color:'#000', letterSpacing:'0.04em' }}>Популярное</span>
                </div>
              )}
              <div>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'11px', color:'var(--green)', letterSpacing:'0.08em', textTransform:'uppercase', display:'block', marginBottom:'10px' }}>{p.tag}</span>
                <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(20px,2vw,26px)', color:'#fff', letterSpacing:'-0.015em', marginBottom:'10px' }}>{p.title}</h3>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>{p.desc}</p>
              </div>

              {/* Price */}
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'16px 0' }}>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(22px,2.2vw,30px)', color:p.dark?'var(--green)':'#fff', letterSpacing:'-0.02em' }}>{p.price}</p>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:'rgba(255,255,255,0.25)' }}>* рекл. бюджет — отдельно</p>
              </div>

              {/* Items */}
              <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
                {p.items.map((item, i) => (
                  <li key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, marginTop:'1px' }}>
                      <circle cx="8" cy="8" r="7.5" stroke={p.dark?'var(--green)':'rgba(255,255,255,0.2)'}/>
                      <path d="M5 8l2 2 4-4" stroke={p.dark?'var(--green)':'rgba(255,255,255,0.4)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.55)', lineHeight:1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="#contact" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'13px', color: p.dark?'#000':'#fff', background: p.dark?'var(--green)':'rgba(255,255,255,0.08)', padding:'12px', borderRadius:'10px', textDecoration:'none', transition:'opacity 0.2s' }} className="hover:opacity-80">
                Обсудить →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Calculator ── */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }}
          style={{ background:'#1A1A1A', borderRadius:'18px', padding:'40px', border:'1px solid rgba(255,255,255,0.06)', marginTop:'10px' }}
        >
          <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(20px,2vw,28px)', color:'#fff', marginBottom:'6px', letterSpacing:'-0.015em' }}>
            Калькулятор стоимости
          </p>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.4)', marginBottom:'32px' }}>
            Выберите нужное — получите предварительную стоимость прямо здесь.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }} className="calculator-inner-grid">
            {/* Left: options */}
            <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

              {/* Step 1 */}
              <div>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Что нужно?</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                  {([{k:'site' as SK,l:'Сайт'},{k:'adsSetup' as SK,l:'Настройка рекламы'},{k:'adsManage' as SK,l:'Ведение рекламы /мес'},{k:'audit' as SK,l:'Аудит + консультация'}]).map(({k,l})=>(
                    <button key={k} onClick={()=>tog(k)} style={calcBtn(sv[k])}>
                      <Check on={sv[k]} />{l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — site type */}
              <AnimatePresence>
                {sv.site && (
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{overflow:'hidden'}}>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Какой сайт?</p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginBottom:'16px' }}>
                      {([{v:'landing' as ST,l:'Лендинг (1 стр.)',p:'от 65 000 ₽'},{v:'multi' as ST,l:'Сайт (3–5 стр.)',p:'от 175 000 ₽'},{v:'large' as ST,l:'Сайт (5+ стр.)',p:'от 225 000 ₽'}]).map(({v,l,p})=>(
                        <button key={v} onClick={()=>setSt(v)} style={{...calcBtn(st===v), justifyContent:'space-between'}}>
                          <span style={{display:'flex',alignItems:'center',gap:'10px'}}><Dot on={st===v}/>{l}</span>
                          <span style={{fontSize:'12px',opacity:0.5}}>{p}</span>
                        </button>
                      ))}
                    </div>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Тексты от нас?</p>
                    <div style={{ display:'flex', gap:'6px' }}>
                      {([{v:true,l:'Да (+25 000 ₽)'},{v:false,l:'Нет, свои'}]).map(({v,l})=>(
                        <button key={String(v)} onClick={()=>setTx(v)} style={{...calcBtn(tx===v), flex:1}}><Dot on={tx===v}/>{l}</button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3 — platforms */}
              <AnimatePresence>
                {(sv.adsSetup||sv.adsManage) && (
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} style={{overflow:'hidden'}}>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Площадки?</p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                      {([{v:'yandex' as PL,l:'Яндекс Директ'},{v:'vk' as PL,l:'VK Реклама'},{v:'telegram' as PL,l:'Telegram Ads'}]).map(({v,l})=>(
                        <button key={v} onClick={()=>togP(v)} style={calcBtn(pl.has(v))}><Check on={pl.has(v)}/>{l}</button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: result */}
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <AnimatePresence mode="wait">
                {min > 0 ? (
                  <motion.div key="result" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--green)', marginBottom:'10px' }}>Ориентировочная стоимость</p>
                    <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(36px,4vw,56px)', color:'#fff', letterSpacing:'-0.03em', lineHeight:1, marginBottom:'20px' }}>
                      от {fmt(min)}
                    </p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginBottom:'24px' }}>
                      {parts.map((p,i) => (
                        <p key={i} style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.45)', display:'flex', alignItems:'center', gap:'8px' }}>
                          <span style={{ color:'var(--green)' }}>✦</span>{p}
                        </p>
                      ))}
                    </div>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.2)', marginBottom:'20px', fontStyle:'italic' }}>
                      * Предварительно. Рекламный бюджет идёт напрямую в платформу, не нам.
                    </p>
                    <Link href="#contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'14px', color:'#000', background:'var(--green)', padding:'13px 28px', borderRadius:'var(--r-pill)', textDecoration:'none', transition:'opacity 0.2s' }} className="hover:opacity-85">
                      Обсудить и уточнить →
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ textAlign:'center', padding:'40px 20px' }}>
                    <div style={{ width:'56px', height:'56px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                      <span style={{ color:'rgba(255,255,255,0.2)', fontSize:'22px' }}>₽</span>
                    </div>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.2)', lineHeight:1.65 }}>
                      Выберите что нужно слева —<br />увидите стоимость здесь.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

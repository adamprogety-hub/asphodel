'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  const [form, setForm] = useState({ name:'', contact:'', message:'' })
  const [sent, setSent] = useState(false)

  const inp: React.CSSProperties = {
    width:'100%', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px',
    color:'#111', background:'#F5F5F5', border:'1px solid transparent',
    padding:'14px 18px', outline:'none', transition:'border-color 0.2s',
    boxSizing:'border-box', borderRadius:'12px',
  }

  return (
    <section id="contact" style={{ background:'#fff', padding:'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'420px 1fr', gap:'80px', alignItems:'start' }}>
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
            Контакт
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(32px,4vw,58px)', color:'#111', letterSpacing:'-0.03em', lineHeight:1.08, marginBottom:'18px' }}>
            Готовы начать?
          </h2>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.75 }}>
            Напишите — расскажите о задаче. Ответим в течение рабочего дня. Без обязательств.
          </p>
        </motion.div>

        {!sent ? (
          <motion.form
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
            onSubmit={e=>{ e.preventDefault(); setSent(true) }}
            style={{ display:'flex', flexDirection:'column', gap:'10px' }}
          >
            <input placeholder="Ваше имя" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inp} className="focus:border-[#111] placeholder:text-[#bbb]" />
            <input placeholder="Telegram или телефон" required value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} style={inp} className="focus:border-[#111] placeholder:text-[#bbb]" />
            <textarea placeholder="Коротко о задаче" rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{...inp,resize:'vertical'}} className="focus:border-[#111] placeholder:text-[#bbb]" />
            
            {/* Privacy Policy Checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '6px 0 12px' }}>
              <input
                type="checkbox" required defaultChecked id="privacy-cta"
                style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--green)' }}
              />
              <label htmlFor="privacy-cta" style={{ fontFamily: 'var(--ff-b)', fontSize: '12px', color: '#777', lineHeight: 1.5, cursor: 'pointer' }}>
                Я согласен с{' '}
                <span
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-privacy-policy')) }}
                  style={{ textDecoration: 'underline', color: '#111', cursor: 'pointer', fontWeight: 500 }}
                >
                  политикой конфиденциальности
                </span>
              </label>
            </div>

            <button type="submit" style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'14px', color:'#000', background:'var(--green)', padding:'14px 32px', borderRadius:'var(--r-pill)', border:'none', cursor:'pointer', transition:'opacity 0.2s', textAlign:'left', width:'fit-content', display:'flex', alignItems:'center', gap:'8px' }} className="hover:opacity-85">
              Отправить заявку
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.form>
        ) : (
          <div style={{ background:'var(--dark)', borderRadius:'18px', padding:'48px', textAlign:'center' }}>
            <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'32px', color:'#fff', marginBottom:'12px' }}>Получили! ✦</p>
            <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.5)' }}>Ответим в течение рабочего дня.</p>
          </div>
        )}
      </div>
    </section>
  )
}

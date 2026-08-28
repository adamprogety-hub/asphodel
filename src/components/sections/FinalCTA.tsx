'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import LiquidButton from '@/components/LiquidButton'
import ContactInput from '@/components/ContactInput'
import { track } from '@/lib/track'

export default function FinalCTA() {
  const [form, setForm] = useState({ name:'', contact:'', message:'', website:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    if (localStorage.getItem('cookie-consent') !== 'accepted') {
      window.dispatchEvent(new Event('trigger-cookie-attention'))
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-form' }),
      })
      if (res.ok) {
        setSent(true)
        track('contact_form_submit', {
          contact_type: form.contact?.startsWith('@') ? 'telegram' : form.contact?.startsWith('+') ? 'phone' : 'other',
          source: 'final-cta',
        })
      } else {
        setError('Не удалось отправить. Напишите нам напрямую: @AGerasimov_Marketing')
      }
    } catch {
      setError('Нет связи с сервером. Напишите нам напрямую: @AGerasimov_Marketing')
    } finally {
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = {
    width:'100%', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px',
    color:'#111', background:'#F5F5F5', border:'1px solid transparent',
    padding:'14px 18px', outline:'none', transition:'border-color 0.2s',
    boxSizing:'border-box', borderRadius:'12px',
  }



  return (
    <section id="contact" style={{ background:'#fff', padding:'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'420px 1fr', gap:'80px', alignItems:'start' }} className="contact-grid">
        <div ref={useReveal<HTMLDivElement>()} data-rv="up">
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
            Контакт
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:'18px' }}>
            Расскажите о задаче
          </h2>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.75 }}>
            Напишите несколько слов о том, что хотите сделать. Ответим в течение рабочего дня и предложим варианты решения.
          </p>
        </div>

        {!sent ? (
          <motion.form
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
            onSubmit={handleSubmit}

            style={{ display:'flex', flexDirection:'column', gap:'10px' }}
          >
            <input placeholder="Ваше имя" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inp} className="focus:border-[#111] placeholder:text-[#bbb]" />
            <ContactInput
              required
              value={form.contact}
              onChange={val => setForm(f => ({ ...f, contact: val }))}
              style={inp}
              className="focus:border-[#111] placeholder:text-[#bbb]"
            />
            <textarea placeholder="О чём задача (можно в двух словах)" rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{...inp,resize:'vertical'}} className="focus:border-[#111] placeholder:text-[#bbb]" />
            {/* Honeypot — скрыто от людей, видно ботам */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />
            
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

            <LiquidButton
              variant="green"
              type="submit"
              style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'14px', padding:'14px 32px', width:'fit-content', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Отправляем...' : 'Написать нам'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </LiquidButton>

            {error && (
              <p style={{ fontFamily:'var(--ff-b)', fontSize:'13px', color:'#c0392b', lineHeight:1.5, marginTop:'4px' }}>
                {error}
              </p>
            )}

          </motion.form>
        ) : (
          <div style={{
            background:'var(--dark)', borderRadius:'18px', padding:'48px',
            textAlign:'center',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            alignSelf:'stretch',
            position:'relative', overflow:'hidden',
          }}>
            {/* Смартфон слева — отзеркален по горизонтали */}
            <img
              src="/smart.webp"
              alt=""
              aria-hidden
              className="success-smart"
              style={{
                position:'absolute', left:'10px', bottom:'-70px',
                height:'115%', width:'auto', objectFit:'contain',
                transform:'scaleX(-1)',
                pointerEvents:'none', userSelect:'none',
                opacity:0.9,
              }}
            />
            {/* Письмо справа */}
            <img
              src="/letter.webp"
              alt=""
              aria-hidden
              className="success-letter"
              style={{
                position:'absolute', right:'-20px', bottom:'-10px',
                height:'80%', width:'auto', objectFit:'contain',
                pointerEvents:'none', userSelect:'none',
                opacity:0.9,
              }}
            />
            {/* Текст поверх */}
            <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'32px', color:'#fff', marginBottom:'12px', position:'relative', zIndex:1 }}>Получили! ✦</p>
            <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.5)', position:'relative', zIndex:1 }}>Ответим в течение рабочего дня.</p>
          </div>
        )}
      </div>
    </section>
  )
}

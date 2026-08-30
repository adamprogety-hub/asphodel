'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import ContactInput from '@/components/ContactInput'
import { track } from '@/lib/track'

// ── Types ──────────────────────────────────────────────────────────
export interface ModalConfig {
  title: string
  description: string
}

interface ContactModalContextType {
  openModal: (config: ModalConfig) => void
  closeModal: () => void
}

// ── Context + Hook ─────────────────────────────────────────────────
const ContactModalContext = createContext<ContactModalContextType>({
  openModal: () => {},
  closeModal: () => {},
})

export const useContactModal = () => useContext(ContactModalContext)

// ── Provider + Modal ──────────────────────────────────────────────
export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ModalConfig | null>(null)
  const [form, setForm]     = useState({ name: '', contact: '', message: '', website: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const isOpen = config !== null

  const openModal = useCallback((c: ModalConfig) => {
    setConfig(c)
    setSent(false)
    setLoading(false)
    setError('')
    setForm({ name: '', contact: '', message: '', website: '' })
    document.body.classList.add('modal-open')
  }, [])

  const closeModal = useCallback(() => {
    setConfig(null)
    document.body.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeModal() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [isOpen, closeModal])

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
        body: JSON.stringify({ ...form, source: 'contact-modal' }),
      })
      if (res.ok) {
        setSent(true)
        track('contact_form_submit', {
          contact_type: form.contact?.startsWith('@') ? 'telegram' : form.contact?.startsWith('+') ? 'phone' : 'other',
          source: 'contact-modal',
        })
      } else {
        setError('Не удалось отправить. Напишите напрямую: @AGerasimov_Marketing')
      }
    } catch {
      setError('Нет связи. Напишите напрямую: @AGerasimov_Marketing')
    } finally {
      setLoading(false)
    }
  }


  const CARD = '#F1EFEA' // light theme warm off-white background

  const inpStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '14px',
    color: '#0f0f0f', background: 'rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.1)',
    padding: '13px 16px', borderRadius: '10px',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <ContactModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <AnimatePresence>
        {isOpen && config && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 50000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}>
            {/* ── Backdrop ── */}
            <m.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={closeModal}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)', /* slightly lighter backdrop for light theme */
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            />

            {/* ── Outer wrapper: overflow VISIBLE so people escape the card ── */}
            <m.div
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 28 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative', zIndex: 1,
                width: '100%', maxWidth: '900px',
                height: '560px',
                overflow: 'visible',
              }}
              className="contact-modal-outer"
            >
              {/* ── LAYER 1: Visual light card background (own clip) ── */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '24px',
                background: CARD,
                boxShadow: '0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }} />

              {/* ── LAYER 2: Photo — sits ABOVE card bg, extends left ── */}
              {/* Purple aura glow behind the team photo */}
              <div
                className="contact-photo-glow"
                style={{
                  position: 'absolute',
                  left: '-80px',
                  bottom: '10px',
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              />

              <img
                src="/modal_team.webp" loading="lazy" decoding="async"
                alt="Команда V.R. Asphodel"
                className="contact-modal-photo"
                style={{
                  position: 'absolute',
                  left: '-75px',         /* shifted left to give text breathing room */
                  bottom: '15px',        /* feet inside the modal border */
                  height: '106%',        /* slightly reduced scale */
                  width: 'auto',
                  zIndex: 5,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  display: 'block',
                }}
              />


              {/* ── LAYER 4: Close button ── */}
              <button
                onClick={closeModal}
                aria-label="Закрыть"
                style={{
                  position: 'absolute', top: '22px', right: '22px', zIndex: 20,
                  background: 'none',
                  border: 'none',
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(0,0,0,0.4)',
                  transition: 'color 0.2s, transform 0.2s',
                  padding: 0,
                }}
                className="hover:text-black hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* ── LAYER 5: Form panel (right side, above photo z-index) ── */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0,
                width: '55%',
                padding: '48px 44px 40px',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'hidden',
              }} className="contact-modal-form-panel">

                <AnimatePresence mode="wait">
                  {!sent ? (
                    <m.div
                      key="form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                    >
                      {/* Header */}
                      <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                          fontFamily: 'var(--ff-d)', fontWeight: 800,
                          fontSize: 'clamp(22px, 2.2vw, 28px)',
                          color: '#0f0f0f',
                          letterSpacing: '-0.025em', lineHeight: 1.15,
                          marginBottom: '8px',
                        }}>
                          {config.title}
                        </h2>
                        <p style={{
                          fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '14px',
                          color: '#555', lineHeight: 1.7,
                        }}>
                          {config.description}
                        </p>
                      </div>

                      <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', marginBottom: '20px' }} />

                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                        <input
                          type="text" placeholder="Ваше имя" required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          style={inpStyle}
                          className="focus:border-black/25 placeholder:text-black/30"
                        />
                        <ContactInput
                          required
                          value={form.contact}
                          onChange={val => setForm(f => ({ ...f, contact: val }))}
                          style={inpStyle}
                          className="focus:border-black/25 placeholder:text-black/30"
                        />
                        <textarea
                          placeholder="Коротко о задаче — что хотите сделать?"
                          rows={3}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={{ ...inpStyle, resize: 'none' as const }}
                          className="focus:border-black/25 placeholder:text-black/30"
                        />
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

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '2px 0 6px' }}>
                          <input
                            type="checkbox" required defaultChecked id="modal-privacy"
                            style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--green)' }}
                          />
                          <label htmlFor="modal-privacy" style={{
                            fontFamily: 'var(--ff-b)', fontSize: '12px',
                            color: 'rgba(0,0,0,0.5)', lineHeight: 1.5, cursor: 'pointer',
                          }}>
                            Я согласен с{' '}
                            <span
                              onClick={e => { e.preventDefault(); window.dispatchEvent(new Event('open-privacy-policy')) }}
                              style={{ textDecoration: 'underline', color: 'rgba(0,0,0,0.7)', cursor: 'pointer', fontWeight: 500 }}
                            >
                              политикой конфиденциальности
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            fontFamily: 'var(--ff-b)', fontWeight: 700, fontSize: '14px',
                            color: '#000', background: 'var(--green)',
                            padding: '14px 28px',
                            borderRadius: 'var(--r-pill)', border: 'none',
                            cursor: loading ? 'default' : 'pointer',
                            opacity: loading ? 0.6 : 1,
                            transition: 'opacity 0.2s',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            width: 'fit-content', marginTop: '2px',
                          }}
                          className="hover:opacity-85"
                        >
                          {loading ? 'Отправляем...' : 'Написать нам'}
                          {!loading && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                              <path d="M2 12L12 2M12 2H4M12 2v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </button>

                        {error && (
                          <p style={{ fontFamily: 'var(--ff-b)', fontSize: '12px', color: '#c0392b', lineHeight: 1.5, marginTop: '4px' }}>
                            {error}
                          </p>
                        )}

                        <p style={{ fontFamily: 'var(--ff-b)', fontSize: '11px', color: 'rgba(0,0,0,0.4)', marginTop: '4px', lineHeight: 1.5 }}>
                          Мы НЕ занимаемся рекламными рассылками. Данные нужны исключительно для связи с вами по вашему проекту.
                        </p>


                      </form>
                    </m.div>
                  ) : (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        height: '100%', textAlign: 'center', gap: '20px',
                      }}
                    >
                      <div style={{
                        width: '68px', height: '68px', borderRadius: '50%',
                        background: 'var(--green)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(108,255,155,0.3)',
                      }}>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                          <path d="M4 13l7 7L22 6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '28px', color: '#0f0f0f', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                          Получили! ✦
                        </p>
                        <p style={{ fontFamily: 'var(--ff-b)', fontSize: '14px', color: '#555', lineHeight: 1.75 }}>
                          Ответим в течение рабочего дня.<br />Ждите — будет интересно.
                        </p>
                        </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </ContactModalContext.Provider>
  )
}

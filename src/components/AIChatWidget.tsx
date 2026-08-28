'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContactModal } from '@/components/ContactModal'

// ── Message Interface ──────────────────────────────────────────────
interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
}

// ── Quick Questions ────────────────────────────────────────────────
const suggestions = [
  { label: 'Сколько стоит сайт? 💳', query: 'Сколько стоит разработка сайта?' },
  { label: 'Сроки разработки 📅', query: 'Каковы сроки создания сайта?' },
  { label: 'Как настраиваете рекламу? 📡', query: 'Как вы настраиваете Яндекс Директ?' },
  { label: 'Хочу консультацию 💬', query: 'Хочу бесплатную консультацию' },
]

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: 'Привет! Я Ася, виртуальный ассистент V.R. Asphodel. Помогу рассчитать цену сайта, подобрать тариф под ваш бюджет или сориентировать по рекламе. Задайте мне любой вопрос!',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const feedRef = useRef<HTMLDivElement>(null)
  const { openModal } = useContactModal()

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Dispatch custom window event when open state changes + manage body class
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('ai-chat-toggle', { detail: { open: isOpen } }))
    if (isOpen) {
      document.body.classList.add('ai-chat-open')
    } else {
      document.body.classList.remove('ai-chat-open')
    }
    return () => document.body.classList.remove('ai-chat-open')
  }, [isOpen])

  // simulated AI reply generator
  const getAIReply = (query: string): string => {
    const q = query.toLowerCase().trim()

    if (q.includes('консультац') || q.includes('созвон') || q.includes('заявк') || q.includes('номер') || q.includes('телефон') || q.includes('заказать')) {
      // Trigger global contact modal inside the simulated reply
      setTimeout(() => {
        openModal({
          title: 'Консультация из чата',
          description: 'Заполните форму, и мы свяжемся с вами в течение рабочего дня.',
        })
      }, 1500)
      return 'Отличная идея! Я прямо сейчас открываю форму для заявки. Заполните имя и контакты, созвонимся и всё детально обсудим.'
    }

    if (q.includes('сайт') || q.includes('лендинг') || q.includes('цена') || q.includes('стоимость') || q.includes('прайс') || q.includes('сколько стоит')) {
      return 'У нас 3 основных пакета:\n1. Лендинг (одностраничник) — от 65 000 ₽. Идеально для старта.\n2. Многостраничный сайт — от 175 000 ₽.\n3. Рекламная связка (сайт + запуск рекламы) — от 95 000 ₽.\n\nТочную смету можем рассчитать на калькуляторе на сайте или обсудить на бесплатной консультации!'
    }

    if (q.includes('срок') || q.includes('время') || q.includes('долго')) {
      return 'Сроки зависят от масштаба задачи:\n— Лендинг делаем за 7-14 рабочих дней.\n— Сложные многостраничники — от 20 до 40 дней.\nМы работаем поэтапно и всегда на связи.'
    }

    if (q.includes('реклам') || q.includes('директ') || q.includes('трафик') || q.includes('яндекс') || q.includes('настрой')) {
      return 'Настройкой рекламы занимается наш маркетолог Александр (опыт 6+ лет). Настраиваем Яндекс.Директ под ключ:\n1. Анализируем конкурентов и аудиторию.\n2. Убираем нецелевые запросы — бюджет идёт на тех, кто ищет ваш продукт.\n3. Пишем объявления под вашу задачу.\nСтоимость настройки — от 35 000 ₽.'
    }

    if (q.includes('привет') || q.includes('здравствуй') || q.includes('ку') || q.includes('hello')) {
      return 'Привет! Рад пообщаться. Задавай вопросы о разработке сайтов, рекламе или о нашей команде!'
    }

    // Fallback disclaimer when user asks something else (assistant in development)
    setTimeout(() => {
      openModal({
        title: 'Уточнить у команды',
        description: 'Оставьте контакты — мы перезвоним, ответим на ваш вопрос и проконсультируем.',
      })
    }, 3500)

    return 'Я пока только учусь и ещё не знаю точного ответа на этот вопрос (моя бета-версия сейчас в активной разработке 🛠️).\n\nНапишите напрямую в Telegram @AGerasimov_Marketing — Александр ответит на любой вопрос.'
  }

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return

    // User message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Bot Typing simulated delay
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getAIReply(textToSend),
      }
      setMessages(prev => [...prev, botMsg])
    }, 1200)
  }

  return (
    <>
      {/* ── Blur Overlay: covers content + FloatingActions when chat is open ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              // z:1000 — above FloatingActions (z:800) and content, below chat window (z:1300) and header (z:2000)
              zIndex: 1000,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'rgba(10, 10, 18, 0.5)',
              pointerEvents: 'auto',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Chat Widget Bubble (Bottom-Left) ── */}
      <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: isOpen ? 1300 : 800 }} className="ai-chat-bubble">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="ИИ-Ассистент Ася"
          style={{
            width: '54px', height: '54px', borderRadius: '50%',
            border: '2px solid var(--green)',
            boxShadow: '0 8px 30px rgba(124,58,237,0.35), 0 0 12px rgba(108,255,155,0.2)',
            cursor: 'pointer', padding: 0, overflow: 'hidden',
            transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
            outline: 'none', background: '#10101A',
            position: 'relative',
          }}
          className="hover:scale-105"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: '#10101A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--green)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="asya"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(/asya-avatar.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                }}
              />
            )}
          </AnimatePresence>
        </button>

        {/* Pulse Glow Effect */}
        {!isOpen && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            boxShadow: '0 0 0 4px rgba(108,255,155,0.15)',
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            pointerEvents: 'none', zIndex: -1
          }} />
        )}
      </div>

      {/* ── Chat Window Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '90px',
              left: '24px',
              width: '360px',
              height: '490px',
              zIndex: 1300,
              borderRadius: '24px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.05)',
              overflow: 'hidden',
              padding: '1px', /* reveals the 1px neon gradient border */
              background: 'rgba(255, 255, 255, 0.04)', /* backup border color */
            }}
            className="ai-chat-window"
          >
            {/* Rotating Neon Gradient Border */}
            <div style={{
              position: 'absolute',
              inset: '-150%',
              background: 'conic-gradient(from 0deg, transparent 35%, #7C3AED 60%, #10B981 85%, transparent 100%)',
              animation: 'rotate-glow 6s linear infinite',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            {/* Inner Content Area (masks the center of the card) */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              background: '#14141B',
              borderRadius: '23px',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* AI Avatar */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    overflow: 'hidden', flexShrink: 0,
                    border: '1.5px solid rgba(108,255,155,0.3)',
                    position: 'relative',
                  }}>
                    <img
                      src="/asya-avatar.png"
                      alt="Ася"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute', bottom: '0px', right: '0px',
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--green)', border: '2px solid #14141B',
                    }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1.2 }}>
                      Ася
                    </span>
                    <span style={{ fontFamily: 'var(--ff-b)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                      ИИ-Консультант V.R. Asphodel
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', transition: 'color 0.2s', display: 'flex', padding: 0
                  }}
                  className="hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Messages Feed */}
              <div
                ref={feedRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
                className="chat-feed"
              >
                {messages.map(m => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      display: 'flex',
                      gap: '8px',
                      flexDirection: m.sender === 'user' ? 'row-reverse' : 'row',
                    }}
                  >
                    {/* Bot message Avatar */}
                    {m.sender === 'bot' && (
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        overflow: 'hidden', flexShrink: 0, marginTop: '2px',
                        border: '1px solid rgba(108,255,155,0.2)',
                      }}>
                        <img src="/asya-avatar.png" alt="Ася" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{
                      background: m.sender === 'user' ? '#7C3AED' : 'rgba(255,255,255,0.06)',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '2px 16px 16px 16px',
                      fontSize: '13px',
                      fontFamily: 'var(--ff-b)',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line',
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', maxWidth: '85%' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      overflow: 'hidden', flexShrink: 0,
                      border: '1px solid rgba(108,255,155,0.2)',
                    }}>
                      <img src="/asya-avatar.png" alt="Ася" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 18px', borderRadius: '2px 16px 16px 16px', display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '10px' }}>
                        <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 0.6s 0.1s infinite alternate' }} />
                        <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 0.6s 0.2s infinite alternate' }} />
                        <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 0.6s 0.3s infinite alternate' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {messages.length === 1 && !isTyping && (
                <div style={{
                  padding: '0 20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}>
                  <span style={{ fontFamily: 'var(--ff-b)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Популярные вопросы:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(s.query)}
                        style={{
                          fontFamily: 'var(--ff-b)', fontSize: '11px', color: 'rgba(255,255,255,0.7)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '6px 12px', borderRadius: 'var(--r-pill)',
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}
                        className="hover:bg-white/10 hover:border-white/15"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input form */}
              <form
                onSubmit={e => { e.preventDefault(); handleSend(input) }}
                style={{
                  padding: '16px 20px 20px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.01)',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Спросить ассистента..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontFamily: 'var(--ff-b)',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  className="focus:border-white/15"
                />
                <button
                  type="submit"
                  aria-label="Отправить"
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: 'var(--green)',
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#000',
                    transition: 'opacity 0.2s',
                  }}
                  className="hover:opacity-85"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .chat-feed::-webkit-scrollbar {
          width: 4px;
        }
        .chat-feed::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-feed::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
      `}</style>
    </>
  )
}

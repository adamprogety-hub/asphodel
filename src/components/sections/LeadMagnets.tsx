'use client'
import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { track } from '@/lib/track'
import ContactInput from '@/components/ContactInput'

// ── Types ────────────────────────────────────────────────────────
interface MagnetProps {
  id:      string
  tag:     string
  title:   string
  desc:    string
  items:   string[]
  cta:     string
  bg:      'white' | 'dark' | 'green'
  fileName: string
}

// ── Lead magnet data ─────────────────────────────────────────────
const magnets: MagnetProps[] = [
  {
    id:       'ads-checklist',
    tag:      'Чек-лист · Бесплатно',
    title:    'Запуск рекламы без слитых бюджетов',
    desc:     '15 шагов которые нужно сделать ДО того как потратить первый рубль на рекламу. Забирайте — применяйте сами или приходите к нам.',
    items: [
      'Как определить целевую аудиторию за 20 минут',
      '7 ошибок которые сливают весь бюджет в первую неделю',
      'Минимальный бюджет для каждой платформы',
      'Как читать отчёт по рекламе без знания маркетинга',
      'Когда пора менять стратегию и как это понять',
    ],
    cta:      'Получить чек-лист',
    bg:       'dark',
    fileName: 'checklist-ads.pdf',
  },
  {
    id:       'site-checklist',
    tag:      'Чек-лист · Бесплатно',
    title:    '20 элементов продающего сайта',
    desc:     'Проверьте ваш сайт по этому чек-листу — узнаете почему клиенты уходят не оставив заявку. Применимо к любой нише.',
    items: [
      'Что должно быть на первом экране (и чего не должно)',
      'Как написать оффер который цепляет',
      'Обязательные блоки и их правильный порядок',
      'Почему форма обратной связи не работает',
      'Технические требования для приёма трафика',
    ],
    cta:      'Скачать чек-лист',
    bg:       'white',
    fileName: 'checklist-site.pdf',
  },
  {
    id:       'brief-template',
    tag:      'Шаблон · Бесплатно',
    title:    'Бриф для расчёта сайта или рекламы',
    desc:     'Заполните за 10 минут — получите точную смету за 24 часа. Тот же шаблон который мы используем для всех клиентов.',
    items: [
      'Блок про бизнес и целевую аудиторию',
      'Технические требования и интеграции',
      'Примеры сайтов и рекламы которые вам нравятся',
      'Раздел про конкурентов и отличия',
      'Пожелания по срокам и бюджету',
    ],
    cta:      'Получить шаблон',
    bg:       'dark',
    fileName: 'brief-template.pdf',
  },
]

// ── Single magnet block ──────────────────────────────────────────
function MagnetBlock({ mag }: { mag: MagnetProps }) {
  const [form, setForm] = useState({ name:'', email:'', website:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const isDark  = m.bg === 'dark'
  const isGreen = m.bg === 'green'
  const bg      = isDark ? '#141414' : isGreen ? 'var(--green)' : '#fff'
  const textC   = isDark ? '#fff' : '#111'
  const sub     = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.55)'
  const brd     = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'
  const inputBg = isDark ? '#1E1E1E' : isGreen ? 'rgba(255,255,255,0.45)' : '#F5F5F5'
  const inputBrd= isDark ? 'rgba(255,255,255,0.12)' : 'transparent'

  const inp: React.CSSProperties = {
    width:'100%', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px',
    color: isDark ? '#fff' : '#111',
    background: inputBg, border:`1px solid ${inputBrd}`,
    padding:'13px 16px', outline:'none', transition:'border-color 0.2s',
    boxSizing:'border-box', borderRadius:'10px',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    if (localStorage.getItem('cookie-consent') !== 'accepted') {
      window.dispatchEvent(new Event('trigger-cookie-attention'))
      return
    }
    // source: lead-ads / lead-site / lead-brief
    const sourceMap: Record<string, string> = {
      'ads-checklist':  'lead-ads',
      'site-checklist': 'lead-site',
      'brief-template': 'lead-brief',
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          contact: form.email,
          message: `Запрос материала: ${mag.title}`,
          website: form.website,
          source:  sourceMap[mag.id] || 'lead-other',
        }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setSent(true)
        if (data.downloadUrl) setDownloadUrl(data.downloadUrl)
        track('lead_form_submit', {
          magnet_id:    mag.id,
          magnet_title: mag.title,
          contact_type: form.email.startsWith('@') ? 'telegram' : form.email.startsWith('+') ? 'phone' : 'other',
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


  return (
    <m.div
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
      style={{ background:bg, borderRadius:'24px', overflow:'hidden' }}
    >
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }} className="magnet-block-grid">
        {/* Left: description */}
        <div style={{ padding:'48px 40px', borderRight:`1px solid ${brd}` }} className="magnet-left">
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color: isDark ? 'var(--green)' : isGreen ? '#000' : '#111', border:`1px solid ${brd}`, borderRadius:'var(--r-pill)', padding:'5px 16px', marginBottom:'22px', letterSpacing:'0.02em' }}>
            {m.tag}
          </span>
          <h3 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(20px,2.2vw,30px)', color:textC, letterSpacing:'-0.02em', lineHeight:1.15, marginBottom:'16px' }}>
            {mag.title}
          </h3>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:sub, lineHeight:1.75, marginBottom:'28px' }}>
            {mag.desc}
          </p>

          {/* Checklist items */}
          <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'10px' }}>
            {m.items.map((item,i) => (
              <li key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                <span style={{ width:'18px', height:'18px', borderRadius:'50%', background: isDark ? 'rgba(208, 123, 255, 0.15)' : 'rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 4.5l2.5 2.5L8 1.5" stroke={ isDark ? 'var(--green)' : '#111' } strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:sub, lineHeight:1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div style={{ padding:'48px 40px', display:'flex', flexDirection:'column', justifyContent:'center' }} className="magnet-right">
          <AnimatePresence mode="wait">
            {!sent ? (
              <m.form key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'clamp(16px,1.5vw,20px)', color:textC, marginBottom:'8px', lineHeight:1.3 }}>
                  Оставьте контакт — пришлём {m.fileName.includes('brief') ? 'шаблон' : 'чек-лист'} сразу:
                </p>
                <input
                  type="text" placeholder="Ваше имя" required
                  value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  style={inp}
                />
                <ContactInput
                  required
                  value={form.email}
                  onChange={val => setForm(f => ({ ...f, email: val }))}
                  style={inp}
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
                
                {/* Privacy Policy Checkbox */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '4px 0 8px' }}>
                  <input
                    type="checkbox" required defaultChecked id={`privacy-${mag.id}`}
                    style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--green)' }}
                  />
                  <label htmlFor={`privacy-${mag.id}`} style={{ fontFamily: 'var(--ff-b)', fontSize: '12px', color: sub, lineHeight: 1.45, cursor: 'pointer' }}>
                    Я согласен с{' '}
                    <span
                      onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-privacy-policy')) }}
                      style={{ textDecoration: 'underline', color: isDark ? '#fff' : '#111', cursor: 'pointer', fontWeight: 500 }}
                    >
                      политикой конфиденциальности
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={loading} style={{
                  fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'14px',
                  color: isDark ? '#000' : '#fff',
                  background: isDark ? 'var(--green)' : '#111',
                  padding:'13px 28px', borderRadius:'var(--r-pill)', border:'none',
                  cursor: loading ? 'default' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition:'opacity 0.2s',
                  display:'flex', alignItems:'center', gap:'8px', width:'fit-content', marginTop:'4px',
                }} className="hover:opacity-85">
                  {loading ? 'Отправляем...' : m.cta}
                  {!loading && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                {error && (
                  <p style={{ fontFamily:'var(--ff-b)', fontSize:'12px', color: isDark ? '#ff8080' : '#c0392b', lineHeight:1.5, marginTop:'4px' }}>
                    {error}
                  </p>
                )}
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'11px', color:sub, marginTop:'4px', opacity: 0.7 }}>
                  Мы НЕ занимаемся рекламными рассылками. Данные нужны исключительно для отправки вам этого материала.
                </p>


              </m.form>
            ) : (
              <m.div key="success" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }} style={{ textAlign:'center', padding:'40px 20px' }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:isDark?'var(--green)':'#111', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5L18 6" stroke={isDark?'#000':'var(--green)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'20px', color:textC, marginBottom:'10px' }}>Готово!</p>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:sub, lineHeight:1.65, marginBottom: downloadUrl ? '24px' : '0' }}>
                  {downloadUrl ? 'Нажмите кнопку ниже — файл загрузится сразу.' : 'Проверьте Telegram или email. Если что-то не пришло — напишите нам напрямую.'}
                </p>
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: isDark ? 'var(--green)' : '#111',
                      color: isDark ? '#000' : '#fff',
                      fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '14px',
                      padding: '12px 24px', borderRadius: 'var(--r-pill)',
                      textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8m0 0l-3-3m3 3l3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Скачать {m.fileName.includes('brief') ? 'шаблон' : 'чек-лист'}
                  </a>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </m.div>
  )
}

// ── Section ──────────────────────────────────────────────────────
export default function LeadMagnets() {
  return (
    <section id="lead-magnets" style={{ background:'var(--dark)', padding:'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
        {/* Header */}
        <m.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} style={{ marginBottom:'40px' }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>
            Полезные материалы
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.2 }}>
            Материалы, с которыми вы<br />
            <span style={{ color: 'var(--green)' }}>ВСЕ</span> поймете
          </h2>
        </m.div>

        {/* 3 magnets stacked */}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {magnets.map(item => <MagnetBlock key={item.id} mag={item} />)}
        </div>
      </div>
    </section>
  )
}

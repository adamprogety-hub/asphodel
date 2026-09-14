'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const reviews = [
  { id:0, name:'Марина К.',   role:'Служба дезинфекции участков',      avatar:'/avatars/avatar2.webp', text:'Обратились в апреле — нужно было успеть к началу дачного сезона. Сделали промо-сайт и запустили рекламу за 12 дней. Звонки пошли буквально на следующий день после запуска, причём клиенты именно те, кто нам нужен — с большими участками. Работать приятно: объясняют что делают и почему.' },
  { id:1, name:'Алексей Н.',  role:'Производство шкафов автоматики',   avatar:'/avatars/avatar1.webp', text:'У нас специфический B2B-продукт — другие агентства либо не понимали технику, либо писали какую-то воду. Эти ребята сами разобрались в спецификациях, правильно расставили акценты в текстах. За три месяца пришло несколько крупных промышленных заказчиков — для нас это очень серьёзный результат.' },
  { id:2, name:'Ольга В.',    role:'Аварийная клининговая служба',      avatar:'/avatars/avatar3.webp', text:'Нам нужна была реклама на уборку помещений после ЧП — ниша срочная, люди ищут в панике. Ребята правильно настроили объявления под этот сценарий. Звонки пошли в первые же дни, заявки горячие. Ещё важно: бюджет уходит напрямую в Яндекс, никаких серых схем — это для меня принципиально.' },
  { id:3, name:'Дмитрий Р.',  role:'Натяжные потолки',                  avatar:'/avatars/avatar1.webp', text:'Старый сайт был на WordPress, его взломали и залили спам. Потеряли позиции, нервы и время. Обратились сюда — сделали новый на Next.js, объяснили почему он защищён и как это работает. Заодно перенастроили Директ. Сейчас заявок раза в два больше, чем было до взлома.' },
  { id:4, name:'Светлана Г.', role:'Частная стоматология',              avatar:'/avatars/avatar2.webp', text:'Долго не решалась на рекламу — казалось, это дорого и непонятно. Взяли лендинг под услугу имплантации и контекст под неё же. Первые записи через сайт пошли в конце первой недели. Самое ценное — мне показывали отчёт и объясняли каждую цифру. Я впервые понимала за что плачу.' },
  { id:5, name:'Игорь М.',    role:'Грузоперевозки по региону',         avatar:'/avatars/avatar1.webp', text:'Работали с другим агентством два года — сайт был, реклама крутилась, а заявок не было. Пришли сюда на аудит. Ребята за час нашли три серьёзные ошибки в кампаниях и объяснили почему бюджет сливался. Переделали всё с нуля. Через месяц заявки стали приходить регулярно.' },
  { id:6, name:'Анна Ф.',     role:'Школа иностранных языков',          avatar:'/avatars/avatar3.webp', text:'Делали лендинг под набор на курсы английского. Понравилось что не просто сделали красиво — думали вместе над текстами, объясняли что важно для конверсии и почему. Запустили рекламу перед сентябрём, группы закрыли за три недели. В следующем сезоне точно снова к ним.' },
]

const VISIBLE = 3
const MAX_IDX = reviews.length - VISIBLE

export default function Reviews() {
  const [idx, setIdx]   = useState(0)
  const [mIdx, setMIdx] = useState(0)
  const dirRef = useRef<1 | -1>(1) // track direction for enter animation

  const go = (next: number) => {
    dirRef.current = next > idx ? 1 : -1
    setIdx(next)
  }

  const visible = reviews.slice(idx, idx + VISIBLE)

  return (
    <section id="reviews" style={{ background:'#fff', padding:'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'36px' }} className="reviews-header">
          <div>
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>Отзывы</span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              Что говорят клиенты
            </h2>
          </div>
          {/* Desktop arrows + counter */}
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }} className="reviews-arrows-desktop">
            <span style={{ fontFamily:'var(--ff-b)', fontSize:'12px', color:'#bbb', letterSpacing:'0.05em' }}>
              {String(idx + 1).padStart(2,'0')} / {String(reviews.length).padStart(2,'0')}
            </span>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={() => go(Math.max(0, idx - 1))} disabled={idx === 0} aria-label="Предыдущий отзыв"
                style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #ddd', background:'transparent', cursor: idx===0 ? 'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity: idx===0 ? 0.3:1, transition:'opacity 0.2s' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => go(Math.min(MAX_IDX, idx + 1))} disabled={idx >= MAX_IDX} aria-label="Следующий отзыв"
                style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #111', background:'#111', cursor: idx>=MAX_IDX ? 'default':'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity: idx>=MAX_IDX ? 0.3:1, transition:'opacity 0.2s' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          {/* Mobile arrows */}
          <div style={{ display:'none', gap:'8px' }} className="reviews-arrows-mobile">
            <button onClick={() => setMIdx(i => (i-1+reviews.length)%reviews.length)} aria-label="Предыдущий"
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #ddd', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => setMIdx(i => (i+1)%reviews.length)} aria-label="Следующий"
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid #111', background:'#111', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Desktop — stable keys: only entering/exiting card animates, shared 2 are static */}
        <div className="reviews-desktop" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((r) => (
              <m.div
                key={r.id}
                layout
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration:0.3, ease:'easeInOut' }}
                style={{ background:'#141414', borderRadius:'18px', padding:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}
              >
                <div>
                  <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'var(--green)', lineHeight:1, display:'block', marginBottom:'16px', opacity:0.6 }}>"</span>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'24px' }}>{r.text}</p>
                </div>
                <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2A2A2A', flexShrink:0, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
                    <Image src={r.avatar} alt={r.name} width={36} height={36} style={{ objectFit:'cover', width:'36px', height:'36px' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#fff' }}>{r.name}</p>
                    <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{r.role}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile — single card crossfade + swipe */}
        <div className="reviews-mobile">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={mIdx}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.3 }}
              drag="x" dragConstraints={{ left:0, right:0 }} dragElastic={0.2}
              onDragEnd={(_,info) => {
                if (info.offset.x < -50) setMIdx(i => (i+1)%reviews.length)
                else if (info.offset.x > 50) setMIdx(i => (i-1+reviews.length)%reviews.length)
              }}
              style={{ background:'#141414', borderRadius:'18px', padding:'28px', touchAction:'pan-y' }}
            >
              <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'var(--green)', lineHeight:1, display:'block', marginBottom:'16px', opacity:0.6 }}>"</span>
              <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'24px' }}>{reviews[mIdx].text}</p>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', flexShrink:0 }}>
                  <Image src={reviews[mIdx].avatar} alt={reviews[mIdx].name} width={36} height={36} style={{ objectFit:'cover' }} />
                </div>
                <div>
                  <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#fff' }}>{reviews[mIdx].name}</p>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{reviews[mIdx].role}</p>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

      </div>
      <style>{`
        .reviews-desktop { display: grid; }
        .reviews-mobile  { display: none; }
        .reviews-arrows-desktop { display: flex !important; }
        .reviews-arrows-mobile  { display: none !important; }
        @media (max-width: 991px) {
          .reviews-desktop { display: none !important; }
          .reviews-mobile  { display: block; }
          .reviews-arrows-desktop { display: none !important; }
          .reviews-arrows-mobile  { display: flex !important; }
          .reviews-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}

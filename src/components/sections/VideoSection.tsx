'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'


export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const refLeft = useReveal<HTMLDivElement>()
  const refRight = useReveal<HTMLDivElement>()

  return (
    <section id="video" style={{ background: '#fff', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', gap: '64px', alignItems: 'center' }} className="video-grid">

        {/* Left: text block */}
        <div ref={refLeft} data-rv="left">
          {/* LIVE badge */}
          <div style={{ display:'inline-flex', alignItems:'center', background:'#fff', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
            <span style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111' }}>Приветственное видео</span>
          </div>

          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.12, marginBottom:'18px' }}>
            Познакомьтесь с командой лично
          </h2>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'#777', lineHeight:1.78, marginBottom:'28px' }}>
          Когда вы готовы — мы познакомимся лично: расскажем про себя, покажем кейсы и объясним почему нам доверяют клиенты.
          </p>

          {/* Team */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {[
              { name:'Илья Хаймин', role:'Бренд-менеджер · 5+ лет', avatar: '/avatars/ilya.webp' },
              { name:'Александр Герасимов', role:'Маркетолог · 6 лет', avatar: '/avatars/alexander.webp' },
            ].map((p,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#f0f0f0', overflow: 'hidden', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border: '1px solid #e2e2e2' }}>
                  <Image
                    src={p.avatar}
                    alt={p.name}
                    width={72} height={72}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(2.0) translateY(3px)',
                      transformOrigin: 'top center'
                    }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#111' }}>{p.name}</p>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'#aaa' }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: video player */}
        <div
          ref={refRight} data-rv="right"
          style={{ borderRadius:'20px', overflow:'hidden', position:'relative', background:'var(--dark)', aspectRatio:'16/9' }}
        >
          {/* Заглушка — видео в процессе съёмки */}
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', minHeight:'320px' }}>
            {/* Фоновая сетка */}
            <div style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'repeat(8,1fr)', gridTemplateRows:'repeat(5,1fr)', gap:'2px', padding:'20px', opacity:0.06 }}>
              {Array.from({length:40}).map((_,i)=><div key={i} style={{ background:'#fff', borderRadius:'1px' }} />)}
            </div>

            {/* Лейбл */}
            <div style={{ position:'absolute', top:'20px', left:'20px', background:'rgba(255,255,255,0.08)', borderRadius:'var(--r-pill)', padding:'5px 14px' }}>
              <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>V. R. Asphodel · Команда</span>
            </div>

            {/* Центральное сообщение */}
            <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', textAlign:'center', padding:'0 24px' }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M10 8l6 4-6 4V8z" fill="rgba(255,255,255,0.4)" stroke="none"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'16px', color:'rgba(255,255,255,0.85)', marginBottom:'6px' }}>Видео скоро будет</p>
                <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.35)', lineHeight:1.6 }}>Мы готовим приветственное видео для вас</p>
              </div>
            </div>

            {/* Бейдж снизу */}
            <div style={{ position:'absolute', bottom:'20px', right:'20px', background:'rgba(0,0,0,0.5)', borderRadius:'6px', padding:'4px 10px' }}>
              <span style={{ fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'11px', color:'rgba(255,255,255,0.4)' }}>Скоро</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}

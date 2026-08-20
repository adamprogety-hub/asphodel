'use client'
import { motion } from 'framer-motion'

const reviews = [
  { name:'Марина К.',   role:'Репетитор по математике',  text:'Сайт за 12 дней, первая заявка на третий день после запуска рекламы. Сами разложили по полочкам — я просто отвечала на вопросы.' },
  { name:'Алексей Н.',  role:'Юридические услуги',        text:'До этого потратил деньги на другое агентство — результата ноль. Здесь всё прозрачно, по шагам. 23 заявки за первый месяц.' },
  { name:'Ольга В.',    role:'Студия маникюра',            text:'Честно объяснили про рекламный бюджет — он идёт напрямую в VK, не через них. Клиентов стало значительно больше.' },
]

export default function Reviews() {
  return (
    <section id="reviews" style={{ background: '#fff', padding: 'clamp(60px,7vw,96px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'36px' }}>
          <div>
            <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'#111', border:'1px solid #ddd', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>Отзывы</span>
            <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#111', letterSpacing:'-0.025em', lineHeight:1.1 }}>
              Что говорят клиенты.
            </h2>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {['←','→'].map((a,i)=>(
              <button key={i} style={{ width:'40px', height:'40px', borderRadius:'50%', border:`1px solid ${i===1?'#111':'#ddd'}`, background:i===1?'#111':'#fff', cursor:'pointer', fontSize:'15px', color:i===1?'#fff':'#666', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
          {reviews.map((r, idx) => (
            <motion.div key={idx}
              initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:idx*0.1 }}
              style={{ background:'#141414', borderRadius:'18px', padding:'28px' }}
            >
              <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'36px', color:'var(--green)', lineHeight:1, display:'block', marginBottom:'16px', opacity:0.6 }}>"</span>
              <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75, marginBottom:'24px' }}>{r.text}</p>
              <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'18px', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'#2A2A2A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'var(--green)' }}>{r.name[0]}</span>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--ff-d)', fontWeight:700, fontSize:'14px', color:'#fff' }}>{r.name}</p>
                  <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.35)' }}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import ShimmeringGrid from '@/components/ShimmeringGrid'
import { useContactModal } from '@/components/ContactModal'
import LiquidButton from '@/components/LiquidButton'


const faqs = [
  { q:'Сколько стоит сайт?', a:'Лендинг — от 65 000 ₽, мультистраничный — от 175 000 ₽. Точную стоимость обсуждаем на созвоне — она зависит от объёма и задачи.' },
  { q:'Рекламный бюджет входит в стоимость?', a:'Нет, всегда отдельно. Рекламный бюджет вы оплачиваете напрямую в Яндекс или VK — не через нас. Мы берём только за настройку и ведение.' },
  { q:'Сколько занимает разработка сайта?', a:'Лендинг — 7–14 рабочих дней. Мультистраничный — от 3 недель. Дедлайн фиксируем в договоре.' },
  { q:'Вы работаете по договору?', a:'Да, всегда. Прописываем что делаем, сроки, стоимость и количество итераций правок. Без устных договорённостей.' },
  { q:'Что от меня нужно?', a:'Рассказать о бизнесе, предоставить материалы (фото, лого если есть), давать обратную связь в течение 1–2 дней.' },
  { q:'Сколько проектов вы ведете одновременно?', a:'Мы берем в работу максимум 1 проект по разработке сайтов и до 10 по рекламе одновременно. Это позволяет нам полностью погрузиться в нюансы вашего бизнеса и гарантировать качество, а не работать на поток.' },
  { q:'Вы работаете с юридическими лицами?', a:'Да, мы работаем как с физическими, так и с юридическими лицами (ИП, ООО). Оформляем официальный договор, предоставляем закрывающие документы и принимаем оплату на расчетный счет.' },
  { q:'Вы гарантируете продажи?', a:'Нет, и любой честный маркетолог скажет то же самое. Мы гарантируем стабильный поток качественных целевых обращений (лидов) по согласованной цене и высокую конверсию сайта. Но конечная продажа зависит от вашего продукта, цен и скорости работы отдела продаж. Мы даем вам целевые лиды — вы превращаете их в прибыль.' },
  { q:'На какой CMS вы делаете сайты и смогу ли я сам менять тексты?', a:'Мы не используем старые CMS вроде WordPress или Joomla. Из-за баз данных и уязвимых плагинов такие сайты часто взламывают, если постоянно не платить за их поддержку. Мы пишем сайты на современном фреймворке Next.js без баз данных на сервере — их физически невозможно взломать. Все тексты, цены и контакты мы выносим в простой конфигурационный файл, который вы сможете отредактировать за 1 минуту по нашей видеоинструкции. Также мы предоставляем бесплатную контентную поддержку после сдачи проекта: 6 месяцев для юридических лиц и 3 месяца для физических лиц.' },
]




export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const { openModal } = useContactModal()

  return (
    <section id="faq" style={{ background: 'var(--dark)', padding: 'clamp(60px,7vw,96px) 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration: alternating top-left grid */}
      <ShimmeringGrid position="left" id="faq" />

      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '80px', position: 'relative', zIndex: 2 }} className="faq-grid">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'24px' }}>
            Вопросы
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:'24px' }}>
            Часто спрашивают
          </h2>
          <LiquidButton
            variant="green"
            onClick={() => openModal({
              title: 'Задать вопрос',
              description: 'Если не нашли ответ — напишите нам, ответим быстро и по существу.',
            })}
            style={{ fontFamily:'var(--ff-b)', fontWeight:600, fontSize:'13px', padding:'10px 22px' }}
          >
            Задать вопрос →
          </LiquidButton>
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

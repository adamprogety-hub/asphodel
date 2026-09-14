'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { m, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useContactModal } from '@/components/ContactModal'

const CaseDualDeviceScene = dynamic(() => import('@/components/3d/CaseDualDeviceScene'), {
  ssr: false,
})

const CATEGORIES = [
  {
    title: 'Дизайн сайта',
    desc: 'UI/UX-дизайн, прототип, визуальная концепция под задачу бизнеса.',
    image: '/renders/01_design.png',
  },
  {
    title: 'Разработка под ключ',
    desc: 'Полный цикл: дизайн, вёрстка, запуск и передача клиенту.',
    image: '/renders/02_turnkey.png',
  },
  {
    title: 'Лендинг',
    desc: 'Одностраничник под конкретный продукт или услугу — быстро и чётко.',
    image: '/renders/03_landing.png',
  },
  {
    title: 'Реклама Яндекс Директ',
    desc: 'Настройка и ведение контекстных кампаний для потока заявок.',
    image: '/renders/04_direct.png',
  },
  {
    title: 'SEO-продвижение',
    desc: 'Органический рост трафика: структура, тексты, техническая оптимизация.',
    image: '/renders/05_seo.png',
  },
  {
    title: 'Аудит и стратегия',
    desc: 'Анализ конкурентов, формирование УТП и позиционирования.',
    image: '/renders/06_strategy.png',
  },
]

const ROWS = [CATEGORIES.slice(0, 3), CATEGORIES.slice(3, 6)]

interface MetricItem {
  val: string
  label: string
}

interface CaseItem {
  id: string
  title: string
  tag: string
  subtitle: string
  desc: string
  initialLikes: number
  metrics: MetricItem[]
  image: string
}

const CASES_DATA: Record<string, CaseItem[]> = {
  'Разработка под ключ': [
    {
      id: 'meta-engineering',
      title: 'МЭТА Инжиниринг',
      tag: 'B2B Корпоративный сайт · Инжиниринг',
      subtitle: 'Модернизация и сборка шкафов автоматики для бизнес-центров',
      desc: 'Разработка корпоративного сайта на Next.js под ключ: структурированный каталог инженерных решений, блок расчета ТЗ для главных инженеров и бесшовная интеграция с CRM.',
      initialLikes: 48,
      metrics: [
        { val: '12 дней', label: 'Срок сдачи' },
        { val: '0.7 сек', label: 'Скорость LCP' },
        { val: '100%', label: 'Mobile Ready' },
      ],
      image: '/projects/project1.webp',
    },
    {
      id: 'green-square',
      title: 'Зелёный Квадрат',
      tag: 'Сервисный портал · Загородные услуги',
      subtitle: 'Комплексная дезинсекция и противоклещевая обработка территорий',
      desc: 'Многостраничный конверсионный сервис с динамическим калькулятором цен, расчетом стоимости в 2 клика и интеграцией с системой распределения выездных бригад.',
      initialLikes: 94,
      metrics: [
        { val: '10 дней', label: 'Срок запуска' },
        { val: '8.4%', label: 'Конверсия экрана' },
        { val: '82%', label: 'Мобильный трафик' },
      ],
      image: '/projects/project2.webp',
    },
    {
      id: 'aura-clean',
      title: 'Аура Чистоты',
      tag: 'Сервисный портал · Спецклининг',
      subtitle: 'Профессиональная уборка и ликвидация последствий ЧП 24/7',
      desc: 'Высокотехнологичный темный интерфейс с функцией экстренного вызова бригады за 40 минут, фильтрацией типов объектов, сертификатами СЭС и гарантией по договору.',
      initialLikes: 67,
      metrics: [
        { val: '14 дней', label: 'Срок сдачи' },
        { val: '-35%', label: 'Стоимость лида' },
        { val: '40 мин', label: 'Выезд бригады' },
      ],
      image: '/projects/project3.webp',
    },
    {
      id: 'ac-engine',
      title: 'AC Engine',
      tag: 'B2B Платформа · Промышленная автоматизация',
      subtitle: 'Диспетчеризация вентиляции и SCADA в едином веб-интерфейсе',
      desc: 'Сложный B2B-продукт, упакованный в интуитивно понятный для топ-менеджмента интерфейс. Оцифровка преимуществ, интерактивная схема шкафов и демо-стенд.',
      initialLikes: 41,
      metrics: [
        { val: '16 дней', label: 'Срок сдачи' },
        { val: 'Next.js', label: 'Архитектура' },
        { val: '100%', label: 'Uptime надежность' },
      ],
      image: '/projects/project4.webp',
    },
  ],
  'Дизайн сайта': [
    {
      id: 'english-excellence',
      title: 'English Excellence',
      tag: 'UI/UX Концепция · EdTech платформа',
      subtitle: 'Премиальная онлайн-школа английского языка с экспертом',
      desc: 'Проектирование авторской темной дизайн-системы, типографики и персонального кабинета ученика. Интуитивный онбординг, интерактивное расписание и карточки курсов.',
      initialLikes: 83,
      metrics: [
        { val: '40+', label: 'UI Компонентов' },
        { val: 'Figma', label: 'Прототип' },
        { val: '100%', label: 'Ready for Dev' },
      ],
      image: '/hero_img.webp',
    },
  ],
}

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<'categories' | 'cases'>('categories')
  const [activeCategory, setActiveCategory] = useState<string>('Разработка под ключ')
  const [expanded, setExpanded] = useState<boolean>(false)
  const { openModal } = useContactModal()

  // Interactive likes state with localStorage persistence
  const [likes, setLikes] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {}
    Object.values(CASES_DATA).flat().forEach((c) => {
      initial[c.id] = { count: c.initialLikes, liked: false }
    })
    return initial
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('asphodel_portfolio_likes')
      if (saved) {
        const parsed = JSON.parse(saved)
        setLikes(prev => ({
          ...prev,
          ...parsed,
        }))
      }
    } catch {}
  }, [])

  const handleToggleLike = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikes(prev => {
      const current = prev[caseId] || { count: 0, liked: false }
      const nextLiked = !current.liked
      const nextCount = nextLiked ? current.count + 1 : Math.max(0, current.count - 1)
      const updated = {
        ...prev,
        [caseId]: { count: nextCount, liked: nextLiked },
      }
      try {
        localStorage.setItem('asphodel_portfolio_likes', JSON.stringify(updated))
      } catch {}
      return updated
    })
  }

  const currentCases = CASES_DATA[activeCategory] || []

  const handleOpenCases = (catTitle?: string) => {
    if (catTitle) {
      setActiveCategory(catTitle)
    }
    setViewMode('cases')
    setExpanded(true)
  }

  const handleBackToCategories = () => {
    setViewMode('categories')
  }

  return (
    <section id="portfolio" style={{ background: 'transparent', padding: 'clamp(60px,7vw,96px) 40px', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <span style={{ display:'inline-flex', fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'var(--r-pill)', padding:'6px 18px', marginBottom:'18px' }}>
            Кейсы
          </span>
          <h2 style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'clamp(28px,3vw,44px)', color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1 }}>
            Наши проекты
          </h2>
        </div>

        {/* White container */}
        <div style={{ width:'100%', borderRadius:'18px', background:'#ffffff', padding:'20px 24px 24px' }}>

          {/* Top bar */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', gap:'12px' }}>
            {viewMode === 'categories' ? (
              <button
                key="btn-view-cases"
                className="pf-nav-btn"
                onClick={() => handleOpenCases('Разработка под ключ')}
              >
                <span>Смотреть все кейсы</span>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H3M10 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            ) : (
              <button
                key="btn-back-categories"
                className="pf-nav-btn pf-nav-btn-back"
                onClick={handleBackToCategories}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M11 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Назад</span>
              </button>
            )}

            <button
              className="pf-expand-btn"
              onClick={() => setExpanded(prev => !prev)}
              aria-label={expanded ? 'Свернуть секцию' : 'Развернуть секцию'}
            >
              <span>{expanded ? 'Свернуть' : 'Развернуть'}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Horizontal categories navigation tabs (Visible in Cases mode under the top bar) */}
          <AnimatePresence>
            {viewMode === 'cases' && (
              <m.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="pf-cat-tabs-wrap"
                style={{
                  position: 'relative',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  marginBottom: '24px',
                }}
              >
                <div
                  className="pf-cat-tabs"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '28px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    padding: '0 4px',
                  }}
                >
                  {CATEGORIES.map(cat => {
                    const isActive = activeCategory === cat.title
                    const count = cat.title === 'Разработка под ключ' ? 4 : cat.title === 'Дизайн сайта' ? 1 : 0

                    return (
                      <button
                        key={cat.title}
                        className={`pf-tab-btn ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                          setActiveCategory(cat.title)
                          e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                        }}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--ff-b)',
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#111111' : 'rgba(0,0,0,0.45)',
                          background: 'transparent',
                          border: 'none',
                          padding: '10px 0 14px 0',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          transition: 'color 0.2s ease',
                          outline: 'none',
                        }}
                      >
                        <span>{cat.title}</span>
                        {count > 0 && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: isActive ? 600 : 500,
                              borderRadius: '6px',
                              padding: '1px 6px',
                              background: isActive ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
                              color: isActive ? '#111111' : 'rgba(0,0,0,0.4)',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {count}
                          </span>
                        )}

                        {isActive && (
                          <m.div
                            layoutId="activeTabUnderline"
                            style={{
                              position: 'absolute',
                              bottom: -1,
                              left: 0,
                              right: 0,
                              height: '2px',
                              background: '#111111',
                              borderRadius: '2px 2px 0 0',
                              zIndex: 2,
                            }}
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Dynamic Content: Categories Grid VS Cases Horizontal Cards */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div className={`portfolio-clip ${expanded ? 'expanded' : 'collapsed'}`}>

              <AnimatePresence mode="wait">
                {viewMode === 'categories' ? (
                  /* ── MODE 1: 6 Categories Grid ── */
                  <m.div
                    key="view-categories"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    style={{ display:'flex', flexDirection:'column', gap:'10px' }}
                  >
                    {ROWS.map((row, ri) => (
                      <div key={ri} className="portfolio-row">
                        {row.map((cat, ci) => (
                          <div key={ci} className="pf-card" style={{
                            position: 'relative',
                            borderRadius:'14px',
                            background:'#F5F5F5',
                            border:'1px solid rgba(0,0,0,0.05)',
                            padding:'24px',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'space-between',
                            overflow: 'hidden',
                          }}>
                            {/* Title top */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                              <span style={{
                                display: 'inline-block',
                                fontFamily:'var(--ff-d)', fontWeight:700,
                                fontSize:'clamp(16px,1.35vw,20px)', color:'#111',
                                lineHeight:1.25, letterSpacing:'-0.01em',
                              }}>
                                {cat.title}
                              </span>
                            </div>

                            {/* Centered 3D render */}
                            <div className="pf-render-wrapper" style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              minHeight: '140px',
                              margin: '8px 0',
                              zIndex: 1,
                            }}>
                              <div className="pf-render-box" style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                maxWidth: '195px',
                                maxHeight: '195px',
                                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                              }}>
                                <Image
                                  src={cat.image}
                                  alt={cat.title}
                                  fill
                                  priority={ri === 0}
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                  style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    filter: 'drop-shadow(0 14px 28px rgba(124, 58, 237, 0.12))',
                                  }}
                                />
                              </div>
                            </div>

                            {/* Bottom row */}
                            <div style={{ position: 'relative', zIndex: 2, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'12px' }}>
                              <p style={{
                                fontFamily:'var(--ff-b)', fontWeight:400,
                                fontSize:'12px', color:'rgba(0,0,0,0.5)',
                                lineHeight:1.55, flex:1, margin:0,
                              }}>
                                {cat.desc}
                              </p>
                              <button
                                onClick={() => handleOpenCases(cat.title)}
                                style={{
                                  flexShrink:0,
                                  display:'inline-flex', alignItems:'center',
                                  fontFamily:'var(--ff-b)', fontWeight:500, fontSize:'11px',
                                  color:'#fff', background:'#111',
                                  border:'none', borderRadius:'var(--r-pill)',
                                  padding:'8px 16px', cursor:'pointer',
                                  whiteSpace:'nowrap', transition:'background 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#111')}
                              >
                                Подробнее
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </m.div>
                ) : (
                  /* ── MODE 2: Wide Horizontal Case Cards ── */
                  <m.div
                    key={`view-cases-${activeCategory}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    {currentCases.length > 0 ? (
                      currentCases.map((item) => {
                        const likeData = likes[item.id] || { count: item.initialLikes, liked: false }
                        const isLiked = likeData.liked
                        const likeCount = likeData.count

                        return (
                          <div
                            key={item.id}
                            className="pf-case-card"
                            style={{
                              background: '#F3F4F6',
                              borderRadius: '16px',
                              border: '1px solid rgba(0,0,0,0.06)',
                              padding: '0 12px 0 0',
                              display: 'grid',
                              gridTemplateColumns: '1.14fr 1fr',
                              gap: '14px',
                              alignItems: 'stretch',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Left: 3D Dual Device Stage (seamlessly flush with card borders) */}
                            <div
                              className="pf-case-stage"
                              style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                minHeight: '440px',
                                borderTopLeftRadius: '16px',
                                borderBottomLeftRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <CaseDualDeviceScene
                                imageSrc={item.image}
                                title={item.title}
                              />

                              {/* Floating Pill Badge over 3D scene (top-left corner) */}
                              <div
                                className="pf-case-stage-pill"
                                style={{
                                  position: 'absolute',
                                  top: '20px',
                                  left: '22px',
                                  zIndex: 5,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: 'rgba(255, 255, 255, 0.94)',
                                  backdropFilter: 'blur(12px)',
                                  WebkitBackdropFilter: 'blur(12px)',
                                  border: '1px solid rgba(0, 0, 0, 0.08)',
                                  borderRadius: 'var(--r-pill)',
                                  padding: '6px 14px',
                                  boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.07)',
                                  userSelect: 'none',
                                  pointerEvents: 'none',
                                }}
                              >
                                <span style={{
                                  fontFamily: 'var(--ff-b)',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: '#111111',
                                  letterSpacing: '0.04em',
                                  textTransform: 'uppercase',
                                  lineHeight: 1.2,
                                }}>
                                  {item.tag}
                                </span>
                              </div>
                            </div>

                            {/* Right: Dedicated Elevated Content Plate (на своей плашке скругленной со всех сторон слоем выше) */}
                            <div
                              className="pf-case-content-plate"
                              style={{
                                background: '#ffffff',
                                borderRadius: '14px',
                                border: '1px solid rgba(0, 0, 0, 0.06)',
                                boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02)',
                                padding: 'clamp(22px, 2.4vw, 30px)',
                                margin: '12px 0 12px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '16px',
                                position: 'relative',
                                zIndex: 2,
                              }}
                            >
                              {/* 1. Title, Subtitle & Narrative Description */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                  <h3 style={{
                                    fontFamily: 'var(--ff-d)',
                                    fontWeight: 800,
                                    fontSize: 'clamp(22px, 2vw, 28px)',
                                    color: '#111111',
                                    lineHeight: 1.15,
                                    letterSpacing: '-0.025em',
                                    margin: 0,
                                  }}>
                                    {item.title}
                                  </h3>
                                  <p style={{
                                    fontFamily: 'var(--ff-b)',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    color: '#222222',
                                    lineHeight: 1.4,
                                    margin: 0,
                                  }}>
                                    {item.subtitle}
                                  </p>
                                </div>

                                <p style={{
                                  fontFamily: 'var(--ff-b)',
                                  fontWeight: 400,
                                  fontSize: '13px',
                                  color: 'rgba(0, 0, 0, 0.58)',
                                  lineHeight: 1.6,
                                  margin: 0,
                                }}>
                                  {item.desc}
                                </p>
                              </div>

                              {/* 3. Specifications Stats (Unified clean specs bar with vertical dividers) */}
                              <div
                                className="pf-case-metrics"
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(3, 1fr)',
                                  background: '#F8F9FA',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(0, 0, 0, 0.04)',
                                  padding: '10px 14px',
                                }}
                              >
                                {item.metrics.map((m, mi) => (
                                  <div
                                    key={mi}
                                    className="pf-case-metric-col"
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '2px',
                                      paddingLeft: mi > 0 ? '12px' : '0',
                                      borderLeft: mi > 0 ? '1px solid rgba(0, 0, 0, 0.07)' : 'none',
                                    }}
                                  >
                                    <span
                                      className="pf-case-metric-val"
                                      style={{
                                        fontFamily: 'var(--ff-d)',
                                        fontWeight: 800,
                                        fontSize: '15.5px',
                                        color: '#111111',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.15,
                                      }}
                                    >
                                      {m.val}
                                    </span>
                                    <span
                                      className="pf-case-metric-lbl"
                                      style={{
                                        fontFamily: 'var(--ff-b)',
                                        fontWeight: 500,
                                        fontSize: '10.5px',
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        lineHeight: 1.2,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      }}
                                    >
                                      {m.label}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* 4. Bottom Row: Shorter CTA Button + Like Button attached next to it */}
                              <div
                                className="pf-case-actions"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  marginTop: '2px',
                                }}
                              >
                                <button
                                  onClick={() => openModal({
                                    title: `Обсудить проект: ${item.title}`,
                                    description: `Расскажите о вашей задаче — разработаем подобное решение для вашего бизнеса.`,
                                  })}
                                  className="pf-case-cta"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontFamily: 'var(--ff-b)',
                                    fontWeight: 600,
                                    fontSize: '12.5px',
                                    color: '#ffffff',
                                    background: '#111111',
                                    border: 'none',
                                    borderRadius: 'var(--r-pill)',
                                    padding: '11px 22px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  <span>Обсудить похожий проект</span>
                                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="pf-cta-arrow" style={{ transition: 'transform 0.2s' }}>
                                    <path d="M1 10L10 1M10 1H3M10 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                  </svg>
                                </button>

                                {/* Like Button attached next to CTA */}
                                <m.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.92 }}
                                  onClick={(e) => handleToggleLike(item.id, e)}
                                  className={`pf-like-btn ${isLiked ? 'is-liked' : ''}`}
                                  aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк кейсу'}
                                  style={{
                                    height: '39px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '0 14px',
                                    borderRadius: 'var(--r-pill)',
                                    background: isLiked ? 'rgba(255, 241, 242, 0.96)' : 'rgba(0, 0, 0, 0.04)',
                                    border: isLiked ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(0, 0, 0, 0.06)',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0,
                                  }}
                                >
                                  <Heart
                                    size={13}
                                    strokeWidth={1.75}
                                    fill={isLiked ? '#e11d48' : 'none'}
                                    color={isLiked ? '#e11d48' : 'rgba(0, 0, 0, 0.6)'}
                                    style={{
                                      transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                      transform: isLiked ? 'scale(1.15)' : 'scale(1)',
                                    }}
                                  />
                                  <span
                                    style={{
                                      fontFamily: 'var(--ff-b)',
                                      fontSize: '11.5px',
                                      fontWeight: 600,
                                      color: isLiked ? '#e11d48' : '#222222',
                                      lineHeight: 1,
                                    }}
                                  >
                                    {likeCount}
                                  </span>
                                </m.button>
                              </div>
                            </div>
                          </div>
                        )
                    })
                  ) : (
                      /* ── Empty State: «Здесь пусто, но мы уже работаем над этим» ── */
                      <div
                        style={{
                          background: '#F5F5F5',
                          borderRadius: '16px',
                          border: '1px solid rgba(0,0,0,0.05)',
                          padding: 'clamp(40px, 6vw, 72px) 24px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          minHeight: '340px',
                        }}
                      >
                        {/* 3D Category Icon */}
                        <div
                          style={{
                            position: 'relative',
                            width: '130px',
                            height: '130px',
                            marginBottom: '20px',
                            filter: 'drop-shadow(0 12px 24px rgba(124, 58, 237, 0.14))',
                          }}
                        >
                          <Image
                            src={CATEGORIES.find(c => c.title === activeCategory)?.image || '/renders/01_design.png'}
                            alt={activeCategory}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>

                        <h3
                          style={{
                            fontFamily: 'var(--ff-d)',
                            fontWeight: 800,
                            fontSize: 'clamp(22px, 2.4vw, 32px)',
                            color: '#111111',
                            letterSpacing: '-0.02em',
                            marginBottom: '12px',
                          }}
                        >
                          Здесь пусто, но мы уже работаем над этим
                        </h3>

                        <p
                          style={{
                            fontFamily: 'var(--ff-b)',
                            fontWeight: 400,
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.55)',
                            maxWidth: '540px',
                            lineHeight: 1.65,
                            marginBottom: '28px',
                          }}
                        >
                          Кейсы по направлению «{activeCategory}» прямо сейчас проходят финальное оформление и скоро появятся в открытом доступе. Свяжитесь с нами — мы покажем релевантные примеры и цифры из нашей практики под вашу нишу.
                        </p>

                        <button
                          onClick={() => openModal({
                            title: `Запросить кейсы: ${activeCategory}`,
                            description: `Расскажите о вашей задаче — пришлем актуальные примеры работ и расчет стоимости.`,
                          })}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'var(--ff-b)',
                            fontWeight: 600,
                            fontSize: '13px',
                            color: '#ffffff',
                            background: '#111111',
                            border: 'none',
                            borderRadius: 'var(--r-pill)',
                            padding: '12px 28px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#333333'}
                          onMouseLeave={e => e.currentTarget.style.background = '#111111'}
                        >
                          Запросить примеры работ
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1 10L10 1M10 1H3M10 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </m.div>
                )}
              </AnimatePresence>

            </div>

            {/* Gradient curtain with smooth fade & slide */}
            <div
              className={`portfolio-curtain ${(!expanded && (viewMode === 'categories' || currentCases.length > 1)) ? 'curtain-visible' : 'curtain-hidden'}`}
              onClick={() => setExpanded(true)}
            />
          </div>

        </div>
      </div>

      <style>{`
        .portfolio-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .pf-card {
          aspect-ratio: 1 / 1;
          transition: background-color 0.25s ease, border-color 0.25s ease;
        }
        .pf-card:hover .pf-render-box {
          transform: translateY(-6px) scale(1.04);
        }
        .pf-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ff-b);
          font-weight: 500;
          font-size: 13px;
          color: #111111;
          background: transparent;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: var(--r-pill);
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .pf-nav-btn:hover {
          border-color: #111111;
          background: rgba(0,0,0,0.04);
        }
        .pf-nav-btn-back {
          font-weight: 600;
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.12);
        }
        .pf-nav-btn-back:hover {
          background: #111111;
          color: #ffffff;
          border-color: #111111;
        }
        .pf-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--ff-b);
          font-weight: 400;
          font-size: 12px;
          color: rgba(0,0,0,0.45);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          transition: color 0.2s ease;
          user-select: none;
        }
        .pf-expand-btn:hover {
          color: #111111;
        }
        .pf-tab-btn:hover {
          color: #111111 !important;
        }
        .pf-cat-tabs::-webkit-scrollbar {
          display: none;
        }
        .pf-case-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .pf-case-card:hover {
          border-color: rgba(0, 0, 0, 0.09) !important;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06);
        }
        .pf-case-card:hover .pf-case-content-plate {
          box-shadow: 0 20px 44px -10px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03) !important;
        }
        .pf-case-card:hover .pf-case-img {
          transform: scale(1.02);
        }
        .pf-case-card:hover .pf-cta-arrow {
          transform: translate(2px, -2px);
        }
        .pf-case-cta:hover {
          background: #2a2a2a !important;
        }
        .pf-like-btn:hover {
          background: #ffffff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
        }
        .pf-like-btn.is-liked {
          background: rgba(255, 241, 242, 0.98) !important;
          border-color: rgba(244, 63, 94, 0.35) !important;
        }
        .pf-case-stage-pill {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pf-case-card:hover .pf-case-stage-pill {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px -2px rgba(0, 0, 0, 0.12) !important;
        }
        .portfolio-clip {
          overflow: hidden;
          transition: max-height 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-clip.collapsed {
          max-height: 590px;
        }
        .portfolio-clip.expanded {
          max-height: 4500px;
        }
        .portfolio-curtain {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          z-index: 20;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.96) 80%, #ffffff 100%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
          cursor: pointer;
        }
        .portfolio-curtain.curtain-visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .portfolio-curtain.curtain-hidden {
          transform: translateY(100%);
          opacity: 0;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .portfolio-row {
            grid-template-columns: 1fr;
          }
          .pf-card {
            aspect-ratio: unset !important;
            min-height: 280px;
          }
          .pf-render-box {
            max-width: 155px !important;
            max-height: 155px !important;
          }
          .portfolio-clip.collapsed {
            max-height: 400px;
          }
          .pf-case-card {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 8px !important;
          }
          .pf-case-stage {
            min-height: 330px !important;
          }
          .pf-case-stage-pill {
            top: 12px !important;
            left: 14px !important;
            right: auto !important;
            bottom: auto !important;
            max-width: calc(100% - 28px) !important;
            padding: 5px 12px !important;
          }
          .pf-case-stage-pill span {
            font-size: 9.5px !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .pf-case-tag {
            font-size: 10px !important;
            letter-spacing: 0.05em !important;
            line-height: 1.3 !important;
            word-break: break-word !important;
          }
          .pf-case-metrics {
            padding: 9px 12px !important;
          }
          .pf-case-metric-col {
            padding-left: 8px !important;
          }
          .pf-case-metric-val {
            font-size: 14px !important;
          }
          .pf-case-metric-lbl {
            font-size: 9.5px !important;
          }
          .pf-case-actions {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .pf-case-cta {
            padding: 10px 16px !important;
            font-size: 12px !important;
            flex: 1 !important;
            justify-content: center !important;
            min-width: 0 !important;
          }
          .pf-like-btn {
            padding: 0 12px !important;
            height: 38px !important;
            flex-shrink: 0 !important;
          }
          .pf-hero-divider {
            display: none !important;
          }
          .pf-cat-tabs {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}

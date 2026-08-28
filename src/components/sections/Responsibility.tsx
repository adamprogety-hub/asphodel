// Marquee banner — Titan-style scrolling dark bar
export default function Responsibility() {
  const items = [
    'Салоны красоты', 'Барбершопы', 'Репетиторы', 'Стоматологии',
    'Фотографы', 'Психологи', 'Ремонт квартир', 'Юристы',
    'Маникюрные студии', 'Автосервисы', 'Детские центры',
    'Фитнес-тренеры', 'Кондитеры', 'Ветеринарные клиники',
    'Клининговые компании', 'Массажные кабинеты', 'Риелторы',
    'Студии йоги', 'Логопеды', 'Свадебные фотографы',
  ]

  // Render 2x for seamless scroll (saves DOM nodes vs 3x)
  const repeated = [...items, ...items]

  return (
    <section style={{ background: '#111', padding: '20px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '0', animation: 'marquee 60s linear infinite', width: 'max-content', alignItems: 'center' }}>

        {repeated.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0' }}>
            <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: 'clamp(20px,2.5vw,32px)', color: '#fff', whiteSpace: 'nowrap', padding: '0 28px', letterSpacing: '-0.01em' }}>
              {t}
            </span>
            <span style={{ color: 'var(--green)', fontSize: '10px', opacity: 0.7 }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}

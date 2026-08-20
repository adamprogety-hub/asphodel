// Marquee banner — Titan-style scrolling dark bar
export default function Responsibility() {
  const items = ['Маркетинг', 'Сайты', 'Реклама', 'Результат', 'Честно', 'Прозрачно', 'Под договором']
  // Render 3x for seamless scroll
  const repeated = [...items, ...items, ...items]

  return (
    <section style={{ background: '#111', padding: '20px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '0', animation: 'marquee 20s linear infinite', width: 'max-content', alignItems: 'center' }}>
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

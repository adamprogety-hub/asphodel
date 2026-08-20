import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 40px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'32px', marginBottom:'48px' }} className="footer-top">
          {/* Logo */}
          <div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'1px', marginBottom:'12px' }}>
              <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'20px', color:'var(--green)', lineHeight:1, letterSpacing:'-0.04em' }}>.</span>
              <span style={{ fontFamily:'var(--ff-d)', fontWeight:800, fontSize:'20px', color:'#fff', lineHeight:1, letterSpacing:'-0.04em', textTransform:'uppercase' }}>ASPHODEL</span>
            </div>
            <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.3)', lineHeight:1.65, maxWidth:'220px' }}>
              Сайты и реклама под ключ для малого бизнеса.
            </p>
          </div>

          {/* Links */}
          <div style={{ display:'flex', gap:'48px', flexWrap:'wrap' }}>
            {[['Услуги','#services'],['О нас','#about'],['Кейсы','#portfolio'],['Процесс','#process'],['Контакт','#contact']].map(([l,h])=>(
              <Link key={h} href={h} style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'13px', color:'rgba(255,255,255,0.35)', textDecoration:'none', transition:'color 0.2s' }} className="hover:text-white">{l}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'24px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.2)' }}>© 2025 V. R. Asphodel</p>
          <p style={{ fontFamily:'var(--ff-b)', fontWeight:400, fontSize:'12px', color:'rgba(255,255,255,0.2)' }}>Илья Хаймин · Александр Герасимов</p>
        </div>
      </div>
    </footer>
  )
}

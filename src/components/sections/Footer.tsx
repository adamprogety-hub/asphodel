import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 40px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'32px', marginBottom:'48px' }} className="footer-top">
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '40px', flexShrink: 0 }} className="footer-logo-wrapper">
                <svg viewBox="20 20 60 55" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <mask id="footer-cutout-mask">
                      <rect x="20" y="20" width="60" height="55" fill="white" />
                      <circle cx="70" cy="45" r="4.2" fill="black">
                        <animate 
                          attributeName="opacity" 
                          values="1;0;1" 
                          dur="1.8s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                    </mask>
                  </defs>

                  {/* V-Left */}
                  <polygon points="20,20 45,75 35,75" fill="#ffffff"/>
                  
                  {/* V-Right / R stem */}
                  <polygon points="45,75 55,75 70,35 60,35" fill="#ffffff" mask="url(#footer-cutout-mask)"/>
                  
                  {/* R-Loop */}
                  <polygon points="60,35 80,35 80,55 60,55" fill="#ffffff" mask="url(#footer-cutout-mask)"/>
                  
                  {/* R-Leg */}
                  <polygon points="60,55 70,55 80,75 70,75" fill="#ffffff"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                <span style={{ fontFamily: 'var(--ff-d)', fontWeight: 800, fontSize: '18px', color: '#ffffff', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  V.R. Asphodel
                </span>
                <span style={{ fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '8px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '1.5px' }}>
                  Креатив и Маркетинг
                </span>
              </div>
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
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { label: '+7 999 991-03-13', href: 'tel:+79999910313' },
              { label: 'a.gerasimov.marketing@yandex.ru', href: 'mailto:a.gerasimov.marketing@yandex.ru' },
              { label: 'Telegram', href: 'https://t.me/AGerasimov_Marketing' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'var(--ff-b)', fontWeight: 400, fontSize: '12px',
                  color: 'rgba(255,255,255,0.25)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                className="hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

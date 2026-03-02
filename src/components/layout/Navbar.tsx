import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

/* Logo: immagine se disponibile, altrimenti testo corsivo */
function LogoImage({ heroMode }: { heroMode: boolean }) {
  const [imgOk, setImgOk] = useState(true)
  const color = heroMode ? '#ffffff' : 'var(--color-text)'

  return imgOk ? (
    <img
      src="/content/logos/Maatilayla.png"
      alt="Maatilayla"
      style={{
        height: '58px',
        width: 'auto',
        objectFit: 'contain',
        filter: heroMode ? 'brightness(0) invert(1)' : 'none',
        transition: 'filter 0.3s ease',
      }}
      onError={() => setImgOk(false)}
    />
  ) : (
    <span style={{
      fontFamily: 'var(--font-logo)',
      fontSize: '2.2rem',
      color,
      lineHeight: 1,
      transition: 'color 0.3s ease',
    }}>
      Maatilayla
    </span>
  )
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi Siamo' },
  { to: '/blog', label: 'Blog' },
  { to: '/galleria', label: 'Galleria' },
  { to: '/faq', label: 'F.A.Q.' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'
  /* heroMode = trasparente con testo bianco solo sulla home in cima */
  const heroMode = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 }
    )
  }, [])

  const linkColor = heroMode ? 'rgba(255,255,255,0.85)' : 'var(--color-text-muted)'
  const linkActiveColor = heroMode ? '#ffffff' : 'var(--color-primary)'
  const linkActiveBg = heroMode ? 'rgba(255,255,255,0.18)' : 'rgba(200,97,74,0.08)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        /* 20px = stesso margine dell'hero → navbar appare dentro l'hero */
        padding: '20px 20px 0',
        pointerEvents: 'none',
      }}
    >
      {/* ─── Pill navbar ─── */}
      <nav
        ref={navRef}
        className={`nav-pill ${heroMode ? 'hero-mode' : 'scrolled-mode'}`}
        style={{
          width: '100%',
          maxWidth: '100%',
          padding: '0.5rem 0.8rem 0.5rem 1.2rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          pointerEvents: 'all',
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <LogoImage heroMode={heroMode} />
        </NavLink>

        {/* Links desktop — al centro */}
        <ul style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }} className="hidden md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'inline-block',
                  padding: '0.38rem 0.85rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  color: isActive ? linkActiveColor : linkColor,
                  background: isActive ? linkActiveBg : 'transparent',
                  whiteSpace: 'nowrap',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA destra — con badge dot sopra */}
        <div style={{ position: 'relative', flexShrink: 0 }} className="hidden md:block">
          {/* Dot badge — verde, allineato al bordo destro del bottone */}
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '4px',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#22C55E',
            border: `2px solid ${heroMode ? 'rgba(255,255,255,0.3)' : 'rgba(253,246,238,0.95)'}`,
            zIndex: 2,
            animation: 'pulse-dot 2.4s ease-in-out infinite',
          }} />
          <NavLink
            to="/contatti"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              borderRadius: '100px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              textDecoration: 'none',
              background: heroMode ? 'rgba(255,255,255,0.18)' : 'var(--color-primary)',
              color: '#fff',
              border: heroMode ? '1px solid rgba(255,255,255,0.4)' : 'none',
              boxShadow: heroMode ? 'none' : '0 2px 12px rgba(200,97,74,0.35)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Richiedi Informazioni
          </NavLink>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            pointerEvents: 'all',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 22,
              height: 2,
              borderRadius: 2,
              background: heroMode ? '#fff' : 'var(--color-text)',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            marginTop: '0.5rem',
            borderRadius: '1.5rem',
            padding: '0.75rem',
            background: 'rgba(253, 246, 238, 0.95)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(200,150,100,0.2)',
            boxShadow: '0 20px 40px rgba(60,30,10,0.15)',
            pointerEvents: 'all',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.65rem 1rem',
                borderRadius: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                background: isActive ? 'rgba(200,97,74,0.08)' : 'transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
          <div style={{ padding: '0.5rem 1rem 0.25rem' }}>
            <NavLink
              to="/contatti"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.65rem 1rem',
                borderRadius: '100px',
                textAlign: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                background: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              Richiedi Informazioni
            </NavLink>
          </div>
        </div>
      )}

      {/* Pulse animation per il dot badge */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.75; }
        }
      `}</style>
    </header>
  )
}

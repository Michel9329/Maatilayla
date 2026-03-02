import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'

/* Logo: mostra immagine se disponibile, altrimenti testo corsivo */
function LogoImage({ scrolled }: { scrolled: boolean }) {
  const [imgOk, setImgOk] = useState(true)
  const color = scrolled ? 'var(--color-text)' : '#fff'
  return imgOk ? (
    <img
      src="/content/logos/Maatilayla.png"
      alt="Maatilayla"
      style={{ height: '38px', width: 'auto', objectFit: 'contain',
        filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
      onError={() => setImgOk(false)}
    />
  ) : (
    <span style={{
      fontFamily: 'var(--font-logo)',
      fontSize: '1.7rem',
      color,
      lineHeight: 1,
      transition: 'color 0.35s ease',
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

  /* Scroll listener — aggiunge ombra/blur più marcato dopo lo scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Entrata GSAP */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ padding: '1rem 1.5rem 0' }}
    >
      <nav
        ref={navRef}
        style={{
          width: '100%',
          maxWidth: '900px',
          padding: '0.6rem 1.5rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          /* Liquid glass pill */
          background: scrolled
            ? 'rgba(253, 246, 238, 0.75)'
            : 'rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: scrolled
            ? '1px solid rgba(200, 150, 100, 0.25)'
            : '1px solid rgba(255, 255, 255, 0.28)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(60,30,10,0.12), 0 1px 0 rgba(255,255,255,0.6) inset'
            : '0 4px 24px rgba(20,10,0,0.10), 0 1px 0 rgba(255,255,255,0.4) inset',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <LogoImage scrolled={scrolled} />
        </NavLink>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'inline-block',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  color: isActive
                    ? (scrolled ? 'var(--color-primary)' : '#fff')
                    : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.8)'),
                  background: isActive
                    ? (scrolled ? 'rgba(200,97,74,0.1)' : 'rgba(255,255,255,0.18)')
                    : 'transparent',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <NavLink
          to="/contatti"
          className="hidden md:inline-block"
          style={{
            padding: '0.45rem 1.2rem',
            borderRadius: '100px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            letterSpacing: '0.04em',
            background: 'var(--color-primary)',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(200,97,74,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          Cuccioli
        </NavLink>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                borderRadius: 2,
                background: scrolled ? 'var(--color-text)' : '#fff',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '1.5rem',
            right: '1.5rem',
            borderRadius: '1.5rem',
            padding: '1rem',
            background: 'rgba(253, 246, 238, 0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(200,150,100,0.2)',
            boxShadow: '0 20px 40px rgba(60,30,10,0.15)',
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
                padding: '0.7rem 1rem',
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
        </div>
      )}
    </header>
  )
}

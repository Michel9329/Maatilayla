import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/* Logo: immagine PNG, fallback testo corsivo */
function LogoImage({ heroMode }: { heroMode: boolean }) {
  const [imgOk, setImgOk] = useState(true)
  const color = heroMode ? '#ffffff' : 'var(--color-text)'

  return imgOk ? (
    <img
      src="/content/logos/Maatilayla-trimmed.png"
      alt="Maatilayla"
      style={{
        height: '34px',
        width: 'auto',
        display: 'block',
        filter: heroMode ? 'brightness(0) invert(1)' : 'none',
        transition: 'filter 0.3s ease',
      }}
      onError={() => setImgOk(false)}
    />
  ) : (
    <span
      style={{
        fontFamily: 'var(--font-logo)',
        fontSize: '2.2rem',
        color,
        lineHeight: 1,
        display: 'block',
        transition: 'color 0.3s ease',
      }}
    >
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
  const drawerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 1023px)')

  const isHome = location.pathname === '/'
  /* heroMode = trasparente con testo bianco solo sulla home in cima */
  const heroMode = isHome && !scrolled && !menuOpen

  /* Chiudi drawer su back/forward browser + tasto Escape */
  useEffect(() => {
    if (!menuOpen) return
    const onPopState = () => setMenuOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('popstate', onPopState)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Entry animation */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 },
    )
  }, [])

  /* Drawer animation */
  useEffect(() => {
    if (!isMobile || !drawerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      if (!prefersReduced) {
        gsap.fromTo(
          drawerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        )
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, isMobile])

  const linkColor = heroMode ? 'rgba(255,255,255,0.95)' : 'var(--color-text-muted)'
  const linkActiveColor = heroMode ? '#ffffff' : 'var(--color-primary)'
  const linkActiveBg = heroMode ? 'rgba(255,255,255,0.22)' : 'rgba(200,97,74,0.08)'
  const linkShadow = heroMode ? '0 1px 4px rgba(0,0,0,0.45)' : 'none'

  return (
    <header className="fixed top-3 left-3 right-3 md:top-6 md:left-6 md:right-6 lg:top-10 lg:left-10 lg:right-10 z-50 flex flex-col pointer-events-none">
      {/* ─── Pill navbar ─── */}
      <nav
        ref={navRef}
        className={`nav-pill ${heroMode ? 'hero-mode' : 'scrolled-mode'}`}
        style={{
          position: 'relative',
          zIndex: 50,
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
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

        {/* ─── Desktop: links + CTA ─── */}
        {!isMobile && (
          <>
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.15rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
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
                      fontWeight: isActive ? 600 : 500,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      color: isActive ? linkActiveColor : linkColor,
                      background: isActive ? linkActiveBg : 'transparent',
                      textShadow: linkShadow,
                      whiteSpace: 'nowrap',
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA destra — con badge dot */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '4px',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--color-online)',
                  border: `2px solid ${heroMode ? 'rgba(255,255,255,0.3)' : 'rgba(253,246,238,0.95)'}`,
                  zIndex: 2,
                  animation: 'pulse-dot 2.4s ease-in-out infinite',
                }}
              />
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
          </>
        )}

        {/* ─── Mobile: hamburger button ─── */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: heroMode ? 'rgba(255,255,255,0.15)' : 'rgba(200,97,74,0.08)',
              color: heroMode ? '#fff' : 'var(--color-text)',
              cursor: 'pointer',
              pointerEvents: 'all',
              transition: 'all 0.2s ease',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </nav>

      {/* ─── Mobile drawer overlay ─── */}
      {isMobile && menuOpen && (
        <div
          ref={drawerRef}
          className="mobile-drawer"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '5rem 2rem 2rem',
            background: 'rgba(253, 246, 238, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
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
                padding: '0.9rem 2rem',
                borderRadius: '16px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                textAlign: 'center',
                width: '100%',
                maxWidth: '320px',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                background: isActive ? 'rgba(200,97,74,0.08)' : 'transparent',
                transition: 'all 0.15s ease',
              })}
            >
              {label}
            </NavLink>
          ))}

          {/* CTA in drawer */}
          <NavLink
            to="/contatti"
            onClick={() => setMenuOpen(false)}
            className="btn-hero-primary"
            style={{
              marginTop: '1rem',
              width: '100%',
              maxWidth: '320px',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Richiedi Informazioni
          </NavLink>
        </div>
      )}
    </header>
  )
}

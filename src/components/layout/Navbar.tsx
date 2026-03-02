import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi Siamo' },
  { to: '/blog', label: 'Blog' },
  { to: '/galleria', label: 'Galleria' },
  { to: '/faq', label: 'F.A.Q.' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/90 backdrop-blur-sm border-b border-[var(--color-primary-pale)]">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-heading text-xl font-bold text-[var(--color-primary)]">
          Maatilayla
        </NavLink>
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

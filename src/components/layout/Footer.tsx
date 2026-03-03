import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi Siamo' },
  { to: '/blog', label: 'Blog' },
  { to: '/galleria', label: 'Galleria' },
  { to: '/faq', label: 'F.A.Q.' },
  { to: '/contatti', label: 'Contatti' },
]

const legalLinks = [
  { href: '#privacy', label: 'Privacy Policy' },
  { href: '#cookie', label: 'Cookie Policy' },
  { href: '#preferenze', label: 'Preferenze Cookie' },
  { href: '#termini', label: 'Termini e Condizioni' },
]

const MAPS_URL = 'https://maps.google.com/?q=Strada+Vicinale+Pianamola+6+01030+Bassano+Romano+VT'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* ── Fascia superiore: logo sx | loghi enti dx ── */}
      <div className="footer-brand">
        <img
          src="/content/logos/Maatilayla-trimmed.png"
          alt="Logo Maatilayla — Allevamento Barboncini Toy Fulvi"
          style={{ height: 32, width: 'auto', display: 'block', flexShrink: 0 }}
        />
        <div className="footer-brand-certs">
          <a
            href="https://www.enci.it"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ENCI — Ente Nazionale della Cinofilia Italiana (apre in una nuova scheda)"
          >
            <img
              src="/content/logos/enci-logo.png"
              alt="Logo ENCI — Ente Nazionale della Cinofilia Italiana"
              className="footer-cert-logo"
            />
          </a>
          <a
            href="https://www.fci.be"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FCI — Fédération Cynologique Internationale (apre in una nuova scheda)"
          >
            <img
              src="/content/logos/fci-logo.png"
              alt="Logo FCI — Fédération Cynologique Internationale"
              className="footer-cert-logo footer-cert-logo--fci"
            />
          </a>
        </div>
      </div>

      {/* ── Corpo: 2 colonne ── */}
      <div className="footer-body">
        {/* Colonna sinistra: testo brand + Naviga + Legale */}
        <div className="footer-left">
          {/* Testo brand */}
          <div className="footer-brand-text">
            <p className="footer-brand-tagline">
              Nasce da noi, <em>cresce con te.</em>
            </p>
            <p className="footer-brand-seo">
              Allevamento amatoriale riconosciuto ENCI e FCI con affisso Maatilayla
              <wbr /> per la selezione del Barbone Toy Fulvo.
            </p>
          </div>

          <div className="footer-group">
            <p className="footer-group-title" id="footer-nav-label">
              Naviga
            </p>
            <nav aria-labelledby="footer-nav-label">
              <ul className="footer-link-list">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="footer-link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer-group">
            <p className="footer-group-title" id="footer-legal-label">
              Legale
            </p>
            <nav aria-labelledby="footer-legal-label">
              <ul className="footer-link-list">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="footer-link">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Lingua — stub visivo, funzionale in Phase 8 */}
          <div className="footer-group">
            <p className="footer-group-title" id="footer-lang-label">
              Lingua
            </p>
            <div className="footer-lang-list" role="group" aria-labelledby="footer-lang-label">
              <button
                type="button"
                className="footer-lang-btn footer-lang-btn--active"
                aria-current="true"
              >
                IT
              </button>
              <button
                type="button"
                className="footer-lang-btn"
                disabled
                aria-label="English — disponibile prossimamente"
              >
                EN
              </button>
              <button
                type="button"
                className="footer-lang-btn"
                disabled
                aria-label="Français — disponibile prossimamente"
              >
                FR
              </button>
              <button
                type="button"
                className="footer-lang-btn"
                disabled
                aria-label="Español — disponibile prossimamente"
              >
                ES
              </button>
            </div>
          </div>
        </div>

        {/* Colonna destra: Contatti + note */}
        <div className="footer-right">
          <div className="footer-group">
            <p className="footer-group-title">Contatti</p>

            <ul className="footer-contact-list">
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  aria-label="Strada Vicinale Pianamola 6, 01030 Bassano Romano VT — apri in Google Maps"
                >
                  <MapPin size={14} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <span>Strada Vicinale Pianamola 6, 01030 Bassano Romano (VT)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+390761790344"
                  className="footer-contact-link"
                  aria-label="Chiama 07 61 179 0344"
                >
                  <Phone size={14} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <span>07 61 179 0344</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+393387617628"
                  className="footer-contact-link"
                  aria-label="Chiama 338 761 7628"
                >
                  <Phone size={14} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <span>338 761 7628</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:maatilayla.org@gmail.com"
                  className="footer-contact-link"
                  aria-label="Invia email a maatilayla.org@gmail.com"
                >
                  <Mail size={14} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <span>maatilayla.org@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-notes-wrapper">
            <div className="footer-notes">
              <p className="footer-note">
                La sede dell&apos;allevamento è anche il posto in cui viviamo. Al fine di tutelare
                la nostra privacy, non potremo ricevere chi non avrà preventivamente fissato un
                appuntamento.
              </p>

              <p className="footer-copyright-note">
                Tutti i contenuti, le immagini e i testi presenti su questo sito sono di proprietà
                esclusiva di Maatilayla. Ne è vietata qualsiasi riproduzione o utilizzo non
                autorizzato, anche parziale, ai sensi della normativa sul diritto d&apos;autore.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter — stub visivo, funzionale in Phase 3 ── */}
      <div className="footer-newsletter">
        <p className="footer-newsletter-label">Rimani aggiornato</p>
        <div className="footer-newsletter-form">
          <input
            type="email"
            placeholder="La tua email"
            className="footer-newsletter-input"
            aria-label="Indirizzo email per la newsletter"
            disabled
          />
          <button type="button" className="footer-newsletter-btn" disabled>
            Iscriviti
          </button>
        </div>
      </div>

      {/* ── Barra inferiore ── */}
      <div className="footer-bottom">
        <span className="footer-bottom-copy">© {year} Maatilayla · Tutti i diritti riservati</span>
        <span className="footer-bottom-refs">
          <a
            href="https://www.enci.it"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-link"
          >
            ENCI
          </a>
          ·
          <a
            href="https://www.fci.be"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-link"
          >
            FCI
          </a>
          · Albo Allevatori ·{' '}
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-link"
          >
            Sitemap
          </a>
        </span>
        <span className="footer-bottom-dev">
          Sviluppato da{' '}
          <a
            href="https://sharkcode.it"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-bottom-link footer-bottom-link--brand"
          >
            SHARKCODE
          </a>
        </span>
      </div>
    </footer>
  )
}

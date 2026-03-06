import { useEffect, useRef } from 'react'
import { Instagram } from 'lucide-react'

const photos = [
  {
    src: '/content/images/maatilayla-barboncino-toy-coppia-prato.webp',
    alt: 'Coppia di barboncini toy fulvi nel prato di Maatilayla',
  },
  {
    src: '/content/images/maatilayla-cucciolo-barboncino-toy-corre-prato.webp',
    alt: "Cucciolo di barboncino toy rosso che corre nel prato dell'allevamento Maatilayla",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-sorridente-sedia.webp',
    alt: 'Barboncino toy di Maatilayla sorridente su una sedia',
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-gioca-erba.webp',
    alt: "Barboncino toy di Maatilayla che gioca nell'erba",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-rilassato-sedia.webp',
    alt: 'Barboncino toy di Maatilayla rilassato su una sedia',
  },
  {
    src: '/content/images/maatilayla-cucciolo-barboncino-toy-rosso-prato.webp',
    alt: "Cucciolo di barboncino toy rosso nel prato dell'allevamento Maatilayla",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-prato-manto-lungo.webp',
    alt: "Barboncino toy fulvo con manto lungo nel prato dell'allevamento Maatilayla",
  },
  {
    src: '/content/images/maatilayla-barboncino-toy-sdraiato-erba.webp',
    alt: "Barboncino toy di Maatilayla sdraiato nell'erba al sole",
  },
]

const INSTAGRAM_URL = 'https://www.instagram.com/maatilayla/'

export default function InstagramFeedSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── CSS entrance via IntersectionObserver ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('ig-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('ig-entered')
          })
        } else {
          section.classList.remove('ig-entered')
        }
      },
      { threshold: 0, rootMargin: '-12% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Duplichiamo le foto per il loop seamless
  const duped = [...photos, ...photos]

  return (
    <section className="ig-section" ref={sectionRef} aria-label="Instagram">
      <div className="ig-header">
        <span className="ig-badge">Instagram</span>
        <h2 className="ig-title">
          La nostra vita <em className="ig-title-accent">quotidiana.</em>
        </h2>
        <p className="ig-subtitle">
          Momenti dal nostro allevamento. Seguici per restare aggiornato.
        </p>
        <div className="ig-cta">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ig-cta-link">
            <Instagram size={18} strokeWidth={1.8} />
            Seguici su Instagram
          </a>
        </div>
      </div>

      <div className="ig-marquee">
        <div className="ig-track">
          {duped.map((photo, i) => (
            <a
              key={`${photo.src}-${i}`}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-card"
              aria-label={`${photo.alt} — apri su Instagram`}
            >
              <img src={photo.src} alt="" loading="lazy" decoding="async" className="ig-img" />
              <div className="ig-overlay" aria-hidden="true">
                <Instagram size={24} strokeWidth={1.6} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

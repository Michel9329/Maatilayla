import { useEffect, useRef } from 'react'

export default function FaqIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('fi-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('fi-entered')
          })
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="fi-section">
      <span className="fi-badge">
        <span className="fi-badge-dot" />
        Una scelta consapevole
      </span>

      <h2 className="fi-title">
        Informarsi è il <span className="fi-accent">primo passo.</span>
      </h2>

      <p className="fi-body">
        Allevare un cucciolo con passione e serietà richiede esperienza e conoscenza della razza.
        Oggi, grazie a Internet, è più facile informarsi sulle attitudini, le caratteristiche e le
        esigenze del barboncino toy. Eppure, ancora molte persone partono alla ricerca del cucciolo
        al miglior prezzo, senza avere chiari i fattori che fanno davvero la differenza.
      </p>

      <p className="fi-body">
        Un cucciolo diventerà il vostro compagno di vita per molti anni. Contattate più allevatori,
        prendete appuntamento per vedere i genitori e verificare le condizioni igieniche
        dell'allevamento e come vengono cresciuti i cuccioli. Non acquistate mai a scatola chiusa.
      </p>
    </section>
  )
}

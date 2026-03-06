import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import HeroSection from '@/components/sections/HeroSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'
import InstagramFeedSection from '@/components/sections/InstagramFeedSection'

export default function Galleria() {
  const ctaSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ctaSectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('gc-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('gc-entered')
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Helmet>
        <title>Galleria — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Galleria fotografica dell'allevamento Maatilayla: filtra per cuccioli, adulti, struttura e famiglia. Scatti autentici dei nostri barboncini toy fulvi."
        />
        <link rel="canonical" href="https://allevamentobarboncinimaatilayla.it/galleria" />
        <meta property="og:title" content="Galleria — Maatilayla" />
        <meta
          property="og:description"
          content="Foto e video dei nostri barboncini toy fulvi, cuccioli e la struttura dell'allevamento."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/galleria" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>

      <HeroSection
        key="galleria"
        image="/content/images/maatilayla-header-contatti.webp"
        alt="Cucciolo di barboncino toy fulvo nel prato — galleria Maatilayla"
        lightText
        badge="Galleria"
        title={
          <>
            Momenti che raccontano
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
              chi siamo davvero.
            </em>
          </>
        }
        description={{
          short: 'Scatti autentici dalla vita quotidiana con i nostri barboncini toy.',
          full: 'Scatti autentici dalla vita quotidiana con i nostri barboncini toy. Cuccioli, adulti, giornate al sole e momenti di famiglia.',
        }}
        cta={[
          { label: 'Sfoglia la galleria', to: '#galleria', variant: 'primary' },
          { label: 'Contattaci', to: '/contatti', variant: 'outline' },
        ]}
      />

      <GallerySection />

      {/* CTA Galleria */}
      <div className="gc-wrap">
        <section className="gc-section" ref={ctaSectionRef} aria-label="Contattaci">
          <span className="gc-badge">Ti piace quello che vedi?</span>
          <h2 className="gc-title">Dietro ogni scatto c'è una storia.</h2>
          <p className="gc-body">
            Ogni cucciolo ha un carattere unico e una personalità tutta sua. Scrivici per saperne di
            più sui nostri barboncini e sulla nostra filosofia di allevamento.
          </p>
          <div className="gc-cta">
            <Link to="/contatti" className="gc-cta-btn">
              Contattaci
            </Link>
          </div>
        </section>
      </div>

      <ContactSection />
      <InstagramFeedSection />
    </>
  )
}

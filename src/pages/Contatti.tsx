import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import ContactSection from '@/components/sections/ContactSection'
import ContactCallout from '@/components/sections/ContactCallout'
import DirectionsSection from '@/components/sections/DirectionsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

const ContactMapSection = lazy(() => import('@/components/sections/ContactMapSection'))

export default function Contatti() {
  return (
    <>
      <Helmet>
        <title>Contatti — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Contatta l'allevamento Maatilayla per informazioni sui cuccioli di barboncino toy fulvo. Telefono, email, orari e mappa a Bassano Romano (VT)."
        />
        <link rel="canonical" href="https://allevamentobarboncinimaatilayla.it/contatti" />
        <meta property="og:title" content="Contatti — Maatilayla" />
        <meta
          property="og:description"
          content="Contatta l'allevamento Maatilayla per informazioni sui cuccioli di barboncino toy fulvo. Telefono, email, orari e mappa a Bassano Romano (VT)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/contatti" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-galleria.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="contatti"
        image="/content/images/maatilayla-header-galleria.webp"
        alt="Barboncino toy fulvo dell'allevamento Maatilayla — contatti"
        lightText
        cardClassName="hero-card--lighter"
        badge="Contatti"
        title={
          <>
            Siamo qui per
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>ascoltarti.</em>
          </>
        }
        description={{
          short:
            'Hai domande sui nostri cuccioli, sulla razza o vuoi semplicemente conoscerci meglio? Scrivici, rispondiamo sempre con piacere.',
          full: 'Hai domande sui nostri cuccioli, sulla razza o vuoi semplicemente conoscerci meglio? Scrivici o chiamaci, rispondiamo sempre con piacere. Ogni conversazione per noi è importante.',
        }}
        cta={[
          { label: 'Scrivici', to: '#contatti', variant: 'primary' },
          { label: 'Chi Siamo', to: '/chi-siamo', variant: 'outline' },
        ]}
      />
      <ContactSection
        alignLeft
        badge="Scrivici"
        title={
          <>
            Ogni conversazione parte da
            <br />
            <em className="ct-title-accent">una semplice domanda.</em>
          </>
        }
        subtitle={
          <>
            Curiosità, domande sui cuccioli o semplicemente voglia
            <br />
            di conoscerci: rispondiamo sempre, senza impegno.
          </>
        }
      />
      <ContactCallout />
      <Suspense fallback={null}>
        <ContactMapSection />
      </Suspense>
      <DirectionsSection />
      <TestimonialsSection transparent />
    </>
  )
}

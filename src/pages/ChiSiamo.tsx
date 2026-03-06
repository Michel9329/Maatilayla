import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import StoriaLaylaSection from '@/components/sections/StoriaLaylaSection'
import CaniVitaSection from '@/components/sections/CaniVitaSection'
import CredenzialiSection from '@/components/sections/CredenzialiSection'
import ValoriSection from '@/components/sections/ValoriSection'
import StrutturaDSection from '@/components/sections/StrutturaDSection'
import ChiSiamoCta from '@/components/sections/ChiSiamoCta'
import TimelineSection from '@/components/sections/TimelineSection'
import WorldMapSection from '@/components/sections/WorldMapSection'
import ContactSection from '@/components/sections/ContactSection'
import InstagramFeedSection from '@/components/sections/InstagramFeedSection'

export default function ChiSiamo() {
  return (
    <>
      <Helmet>
        <title>Chi Siamo — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Scopri la storia dell'allevamento Maatilayla: la nostra passione per i barboncini toy fulvi, la struttura e i nostri obiettivi per cuccioli sani, belli ed equilibrati."
        />
        <meta property="og:title" content="Chi Siamo — Maatilayla" />
        <meta
          property="og:description"
          content="Scopri la storia dell'allevamento Maatilayla: la nostra passione per i barboncini toy fulvi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/chi-siamo" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-chi-siamo.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>

      <HeroSection
        key="chi-siamo"
        lightText
        image="/content/images/maatilayla-header-chi-siamo.webp"
        alt="Cuccioli neonati di barboncino toy fulvo su copertina maculata"
        badge="La Nostra Filosofia"
        title={
          <>
            Un concetto del tutto{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>naturale.</em>
          </>
        }
        description={{
          short:
            'Una struttura immersa nel verde, dove ogni barboncino cresce in libertà. Tre obiettivi guidano ogni scelta: cuccioli sani, belli ed equilibrati.',
          full: "Una struttura immersa nel verde della natura, in piena sintonia con l'aspetto wild dei nostri barboni. Salute, selezione ed equilibrio caratteriale: ogni decisione segue un criterio preciso, dalla scelta dei riproduttori ai primi tre mesi di vita del cucciolo.",
        }}
        cta={[
          { label: 'Struttura', to: '#struttura', variant: 'primary' },
          { label: 'Filosofia', to: '#filosofia', variant: 'outline' },
        ]}
      />

      <StoriaLaylaSection />
      <ValoriSection />
      <CredenzialiSection />
      <CaniVitaSection />
      <StrutturaDSection />
      <TimelineSection />
      <WorldMapSection />
      <ChiSiamoCta />
      <ContactSection />
      <InstagramFeedSection />
    </>
  )
}

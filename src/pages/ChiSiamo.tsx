import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

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
          full: 'Una struttura immersa nel verde della natura, in piena sintonia con lo spirito libero dei nostri barboni. Ogni scelta è guidata da tre obiettivi: cuccioli sani grazie a controlli sanitari rigorosi, belli attraverso una selezione attenta, ed equilibrati con il programma Biosensor e tre mesi di socializzazione in famiglia.',
        }}
        cta={[
          { label: 'La Struttura', to: '/chi-siamo#struttura', variant: 'primary' },
          { label: 'Storia', to: '/chi-siamo#storia', variant: 'outline' },
        ]}
      />
    </>
  )
}

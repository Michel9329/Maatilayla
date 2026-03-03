import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import BentoSection from '@/components/sections/BentoSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI</title>
        <meta
          name="description"
          content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici. Nasce da noi, cresce con te."
        />
        <meta
          property="og:title"
          content="Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI"
        />
        <meta
          property="og:description"
          content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="home"
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Cucciolo di barboncino toy fulvo nell'allevamento Maatilayla"
        badge="Allevamento Amatoriale ENCI · FCI"
        title={
          <>
            Nasce da noi,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>cresce con te.</em>
          </>
        }
        description={{
          short:
            'Ogni barboncino toy fulvo di Maatilayla viene allevato in casa, con test genetici e stimolazione neurologica. Un cucciolo sano non è fortuna\u00a0— è scelta.',
          full: 'Ogni barboncino toy fulvo di Maatilayla viene allevato in casa, a contatto con la famiglia, con protocolli scientifici di stimolazione neurologica e test genetici sui riproduttori. Perché un cucciolo sano e equilibrato non è fortuna\u00a0— è scelta.',
        }}
        cta={[
          { label: 'Chi Siamo', to: '/chi-siamo', variant: 'primary' },
          { label: 'Contatti', to: '/contatti', variant: 'outline' },
        ]}
      />
      <StatsSection />
      <BentoSection />
    </>
  )
}

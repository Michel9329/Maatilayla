import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI</title>
        <meta name="description" content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici. Nasce da noi, cresce con te." />
      </Helmet>

      {/* Hero — padding top per navbar floating */}
      <div style={{ padding: '0 1.5rem', paddingTop: '5.5rem' }}>
        <HeroSection />
      </div>

      {/* Prossime sezioni della homepage */}
    </>
  )
}

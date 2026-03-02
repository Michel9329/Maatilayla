import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI</title>
        <meta name="description" content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici. Nasce da noi, cresce con te." />
      </Helmet>

      {/* Hero a tutta larghezza dal top — navbar floating ci flotta sopra */}
      <HeroSection />

      {/* Prossime sezioni della homepage */}
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Contatti() {
  return (
    <>
      <Helmet>
        <title>Contatti — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Contatta l'allevamento Maatilayla per informazioni sui cuccioli di barboncino toy fulvo. Telefono, email e indirizzo a Bassano Romano (VT)."
        />
        <meta property="og:title" content="Contatti — Maatilayla" />
        <meta
          property="og:description"
          content="Contatta l'allevamento Maatilayla per informazioni sui cuccioli di barboncino toy fulvo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/contatti" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="contatti"
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Cucciolo di barboncino toy fulvo dell'allevamento Maatilayla"
        title="Contattaci"
        subtitle="Saremo lieti di chiarire ogni tuo dubbio"
      />
    </>
  )
}

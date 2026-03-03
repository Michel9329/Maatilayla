import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Galleria() {
  return (
    <>
      <Helmet>
        <title>Galleria — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Photogallery dell'allevamento Maatilayla: scatti e video dei nostri barboncini toy fulvi, i cuccioli, la struttura e i loro amici."
        />
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
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Barboncini toy fulvi dell'allevamento Maatilayla"
        title="Galleria"
        subtitle="I nostri barboncini toy fulvi"
      />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Faq() {
  return (
    <>
      <Helmet>
        <title>F.A.Q. — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Domande frequenti sull'acquisto di un cucciolo di barboncino toy: cessione, vaccinazioni, alimentazione, toelettatura e programma Biosensor."
        />
        <meta property="og:title" content="F.A.Q. — Maatilayla" />
        <meta
          property="og:description"
          content="Domande frequenti sull'acquisto di un cucciolo di barboncino toy: cessione, vaccinazioni, alimentazione."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/faq" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="faq"
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Cucciolo di barboncino toy fulvo dell'allevamento Maatilayla"
        title="Domande Frequenti"
        subtitle="Tutto quello che devi sapere"
      />
    </>
  )
}

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
        image="/content/images/maatilayla-header-contatti.webp"
        alt="Cucciolo di barboncino toy fulvo nel prato dell'allevamento Maatilayla"
        opaqueCard
        badge="Contatti"
        title={
          <>
            Siamo qui per{' '}
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
    </>
  )
}

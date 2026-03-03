import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function IlBarbone() {
  return (
    <>
      <Helmet>
        <title>Il Barbone — Razza, Carattere e Standard ENCI | Maatilayla</title>
        <meta
          name="description"
          content="Scopri il Barboncino Toy: storia, standard ENCI, carattere, motivazione affiliativa e tutto quello che devi sapere prima di scegliere questa razza straordinaria."
        />
        <meta property="og:title" content="Il Barbone — Maatilayla" />
        <meta
          property="og:description"
          content="Scopri il Barboncino Toy: storia, standard ENCI, carattere e tutto quello che devi sapere su questa razza."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/il-barbone" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="il-barbone"
        compact
        lightText
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Cucciolo di barboncino toy fulvo"
        badge="La Razza"
        title={
          <>
            Il Barboncino{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Toy</em>
          </>
        }
        subtitle="Standard ENCI, storia e carattere di una razza straordinaria"
      />
    </>
  )
}

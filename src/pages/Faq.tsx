import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import FaqIntroSection from '@/components/sections/FaqIntroSection'
import FaqAccordionSection from '@/components/sections/FaqAccordionSection'
import FaqPageCta from '@/components/sections/FaqPageCta'
import InstagramFeedSection from '@/components/sections/InstagramFeedSection'

export default function Faq() {
  return (
    <>
      <Helmet>
        <title>F.A.Q. — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Domande frequenti sull'acquisto di un cucciolo di barboncino toy: cessione, salute, alimentazione, toelettatura, test genetici e programma Biosensor."
        />
        <link rel="canonical" href="https://allevamentobarboncinimaatilayla.it/faq" />
        <meta property="og:title" content="F.A.Q. — Maatilayla" />
        <meta
          property="og:description"
          content="Domande frequenti sull'acquisto di un cucciolo di barboncino toy: cessione, salute, alimentazione, toelettatura, test genetici e programma Biosensor."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/faq" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-faq.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="faq"
        image="/content/images/maatilayla-header-faq-bosco.webp"
        alt="Barboncino toy sul ramo nel bosco — domande frequenti, allevamento Maatilayla"
        lightText
        cardClassName="hero-card--lighter"
        sectionClassName="hero-blur-right"
        badge="F.A.Q."
        title={
          <>
            Ogni dubbio merita una
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>
              risposta sincera.
            </em>
          </>
        }
        description={{
          short:
            'Cessione, salute, alimentazione, toelettatura: le risposte alle domande più frequenti.',
          full: 'Cessione, salute, alimentazione, toelettatura e socializzazione: le risposte alle domande più frequenti prima di accogliere un\nbarboncino toy nella tua famiglia.',
        }}
        cta={[
          { label: 'Leggi le F.A.Q.', to: '#faq', variant: 'primary' },
          { label: 'Contattaci', to: '/contatti', variant: 'outline' },
        ]}
      />
      <FaqIntroSection />
      <FaqAccordionSection />
      <FaqPageCta />
      <InstagramFeedSection />
    </>
  )
}

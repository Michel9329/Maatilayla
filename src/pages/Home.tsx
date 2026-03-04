import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import BentoSection from '@/components/sections/BentoSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import AllevamentoSection from '@/components/sections/AllevamentoSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import FuturiPadroniSection from '@/components/sections/FuturiPadroniSection'
import ParallaxCtaSection from '@/components/sections/ParallaxCtaSection'
import PedigreeSection from '@/components/sections/PedigreeSection'
import FaqCtaSection from '@/components/sections/FaqCtaSection'
import ContactSection from '@/components/sections/ContactSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import InstagramFeedSection from '@/components/sections/InstagramFeedSection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI</title>
        <meta
          name="description"
          content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici. Nasce da noi, cresce con te."
        />
        <link rel="canonical" href="https://allevamentobarboncinimaatilayla.it/" />
        <link
          rel="preload"
          as="image"
          href="/content/images/maatilayla-header-cucciolo-allevamento.webp"
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Maatilayla — Allevamento Barboncini Toy Fulvi ENCI·FCI"
        />
        <meta
          name="twitter:description"
          content="Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici."
        />
        <meta
          name="twitter:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Maatilayla — Allevamento Barboncini Toy',
            description:
              'Allevamento amatoriale di barboncini toy fulvi riconosciuto ENCI-FCI. Cuccioli allevati in casa con protocolli scientifici.',
            url: 'https://allevamentobarboncinimaatilayla.it/',
            telephone: '+390761790344',
            email: 'maatilayla.org@gmail.com',
            image:
              'https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Strada Vicinale Pianamola 6',
              addressLocality: 'Bassano Romano',
              postalCode: '01030',
              addressRegion: 'VT',
              addressCountry: 'IT',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '13:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '15:30',
                closes: '19:00',
              },
            ],
            sameAs: ['https://www.instagram.com/maatilayla/'],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '10',
              bestRating: '5',
            },
          })}
        </script>
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
      <TestimonialsSection />
      <AllevamentoSection />
      <BlogPreviewSection />
      <PedigreeSection />
      <ParallaxCtaSection />
      <FuturiPadroniSection />
      <FaqCtaSection />
      <ContactSection />
      <NewsletterSection />
      <InstagramFeedSection />
    </>
  )
}

import { Helmet } from 'react-helmet-async'
import HeroSection from '@/components/sections/HeroSection'

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog — Maatilayla Allevamento Barboncini Toy</title>
        <meta
          name="description"
          content="Articoli e approfondimenti dal mondo dei barboncini toy: consigli di allevamento, esperienze personali e cultura cinofila dal blog di Maatilayla."
        />
        <meta property="og:title" content="Blog — Maatilayla" />
        <meta
          property="og:description"
          content="Articoli e approfondimenti dal mondo dei barboncini toy: consigli, esperienze e cultura cinofila."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allevamentobarboncinimaatilayla.it/blog" />
        <meta
          property="og:image"
          content="https://allevamentobarboncinimaatilayla.it/content/images/maatilayla-header-cucciolo-allevamento.webp"
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Maatilayla" />
      </Helmet>
      <HeroSection
        key="blog"
        image="/content/images/maatilayla-header-cucciolo-allevamento.webp"
        alt="Cucciolo di barboncino toy fulvo dell'allevamento Maatilayla"
        title="Blog"
        subtitle="Articoli e approfondimenti dal mondo cinofilo"
      />
    </>
  )
}

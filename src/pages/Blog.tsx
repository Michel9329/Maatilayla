import { Helmet } from 'react-helmet-async'

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog — Maatilayla Allevamento Barboncini Toy</title>
        <meta name="description" content="Articoli e approfondimenti dal mondo dei barboncini toy: consigli di allevamento, esperienze personali e cultura cinofila dal blog di Maatilayla." />
      </Helmet>
      <div className="pt-16">Blog</div>
    </>
  )
}

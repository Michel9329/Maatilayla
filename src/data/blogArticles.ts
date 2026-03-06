// Data layer centralizzato per il blog — single source of truth
// Import statici di tutti i 15 articoli via Vite ?raw

import chiAllevaRaw from '../../content/testi-sito-attuale/blog/chi-alleva-alleva-tutto.md?raw'
import controlliRaw from '../../content/testi-sito-attuale/blog/controlli-si-grazie.md?raw'
import caneAlCaneRaw from '../../content/testi-sito-attuale/blog/facciamo-fare-il-cane-al-cane.md?raw'
import ilBarboneRaw from '../../content/testi-sito-attuale/blog/il-barbone.md?raw'
import coraggioRaw from '../../content/testi-sito-attuale/blog/il-coraggio-di-lasciarli-andare.md?raw'
import origineNomeRaw from '../../content/testi-sito-attuale/blog/lorigine-del-nome.md?raw'
import maltipooRaw from '../../content/testi-sito-attuale/blog/maltipoo-cockapoo-o-goldendoodle.md?raw'
import maschioFemminaRaw from '../../content/testi-sito-attuale/blog/maschio-o-femmina.md?raw'
import pandemiaRaw from '../../content/testi-sito-attuale/blog/pandemia-sei-tutta-mia.md?raw'
import zampatFangoRaw from '../../content/testi-sito-attuale/blog/per-una-zampata-di-fango.md?raw'
import quandoTornanoRaw from '../../content/testi-sito-attuale/blog/quando-a-volte-tornano.md?raw'
import scaldaCuoreRaw from '../../content/testi-sito-attuale/blog/quando-cerchiamo-qualcuno-che-ci-scalda-il-cuore.md?raw'
import siamoTuttiRaw from '../../content/testi-sito-attuale/blog/siamo-tutti-allevatori.md?raw'
import cuccioloNataleRaw from '../../content/testi-sito-attuale/blog/un-cucciolo-per-natale.md?raw'
import vaDoveTiPortaRaw from '../../content/testi-sito-attuale/blog/va-dove-ti-porta-il-cane.md?raw'

export interface BlogArticle {
  slug: string
  title: string
  date: string // ISO format YYYY-MM-DD
  category: string
  excerpt: string
  image?: string // path in /content/images/
  imageAlt?: string
  imagePosition?: string // CSS object-position
  content: string // raw markdown
  readingTime: number // minuti stimati
}

/** Calcolo tempo di lettura (~200 parole/minuto) */
function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'controlli-si-grazie',
    title: 'Controlli? Si, grazie!',
    date: '2023-05-24',
    category: 'Allevamento',
    excerpt:
      'Perche sottoporsi ai controlli sanitari e genetici e un atto di responsabilita verso i cuccioli e le famiglie che li accoglieranno.',
    image: '/content/images/maatilayla-blog-controlli-si-grazie.webp',
    imageAlt: "Casetta dei barboncini toy nell'allevamento Maatilayla",
    content: controlliRaw,
    readingTime: calcReadingTime(controlliRaw),
  },
  {
    slug: 'quando-a-volte-tornano',
    title: 'Quando a volte tornano',
    date: '2022-11-09',
    category: 'Storie',
    excerpt:
      'Capita che un cucciolo torni in allevamento. Non e un fallimento, e un atto di amore — e noi siamo sempre pronti ad accoglierli.',
    image: '/content/images/maatilayla-blog-quando-tornano.webp',
    imageAlt: "Aeroporto di Fiumicino, il ritorno di un barboncino toy all'allevamento Maatilayla",
    content: quandoTornanoRaw,
    readingTime: calcReadingTime(quandoTornanoRaw),
  },
  {
    slug: 'chi-alleva-alleva-tutto',
    title: 'Chi alleva, alleva tutto',
    date: '2021-11-23',
    category: 'Riflessioni',
    excerpt:
      'Allevare non significa solo far nascere cuccioli. Significa prendersi cura di ogni aspetto: salute, socializzazione, benessere emotivo.',
    image: '/content/images/maatilayla-blog-chi-alleva.webp',
    imageAlt: "Barboncino toy dell'allevamento Maatilayla, chi alleva alleva tutto",
    content: chiAllevaRaw,
    readingTime: calcReadingTime(chiAllevaRaw),
  },
  {
    slug: 'facciamo-fare-il-cane-al-cane',
    title: 'Facciamo fare il cane al cane',
    date: '2021-08-27',
    category: 'Educazione',
    excerpt:
      "Lasciamo che i nostri barboncini vivano come cani: correre, annusare, sporcarsi. La liberta di essere se stessi e il primo passo verso l'equilibrio.",
    image: '/content/images/maatilayla-cucciolo-barboncino-toy-corre-prato.webp',
    imageAlt: "Cucciolo di barboncino toy che corre libero nel prato dell'allevamento Maatilayla",
    imagePosition: 'center 0%',
    content: caneAlCaneRaw,
    readingTime: calcReadingTime(caneAlCaneRaw),
  },
  {
    slug: 'per-una-zampata-di-fango',
    title: 'Per una zampata di fango',
    date: '2021-04-23',
    category: 'Vita quotidiana',
    excerpt:
      "Un barboncino che gioca nel fango e un barboncino felice. Dietro ogni zampa sporca c'e un momento di pura gioia.",
    image: '/content/images/maatilayla-blog-zampata-fango.webp',
    imageAlt: 'Barboncino toy Tato con zampata di fango, allevamento Maatilayla',
    content: zampatFangoRaw,
    readingTime: calcReadingTime(zampatFangoRaw),
  },
  {
    slug: 'pandemia-sei-tutta-mia',
    title: 'Pandemia sei tutta mia',
    date: '2021-01-22',
    category: 'Riflessioni',
    excerpt:
      'La pandemia ha cambiato il rapporto con i nostri animali. Piu tempo insieme, piu consapevolezza — ma anche nuove sfide da affrontare.',
    image: '/content/images/maatilayla-blog-pandemia.webp',
    imageAlt: 'Barboncini toy di Maatilayla in camera da letto durante la pandemia',
    content: pandemiaRaw,
    readingTime: calcReadingTime(pandemiaRaw),
  },
  {
    slug: 'maltipoo-cockapoo-o-goldendoodle',
    title: 'Maltipoo, Cockapoo o Goldendoodle?',
    date: '2021-01-01',
    category: 'Educazione',
    excerpt:
      'La moda dei "design dogs" e i rischi genetici degli incroci tra razze. Perche scegliere un barboncino toy con pedigree ENCI fa la differenza.',
    content: maltipooRaw,
    readingTime: calcReadingTime(maltipooRaw),
  },
  {
    slug: 'il-coraggio-di-lasciarli-andare',
    title: 'Il coraggio di lasciarli andare',
    date: '2020-10-01',
    category: 'Storie',
    excerpt:
      'La storia di una cucciola nata con una grave complicazione e la difficile scelta tra lottare per salvarla e lasciarla andare in pace.',
    content: coraggioRaw,
    readingTime: calcReadingTime(coraggioRaw),
  },
  {
    slug: 'maschio-o-femmina',
    title: 'Maschio o Femmina?',
    date: '2020-09-03',
    category: 'Educazione',
    excerpt:
      'Le differenze comportamentali tra maschi e femmine nel barboncino toy: cosa aspettarsi e come orientare la scelta del cucciolo.',
    content: maschioFemminaRaw,
    readingTime: calcReadingTime(maschioFemminaRaw),
  },
  {
    slug: 'quando-cerchiamo-qualcuno-che-ci-scalda-il-cuore',
    title: 'Quando cerchiamo qualcuno che ci scalda il cuore',
    date: '2020-07-12',
    category: 'Riflessioni',
    excerpt:
      'Spesso chi cerca un barboncino toy e mosso dal desiderio di ricevere affetto. Il legame unico che nasce tra un cane e il suo riferimento umano.',
    content: scaldaCuoreRaw,
    readingTime: calcReadingTime(scaldaCuoreRaw),
  },
  {
    slug: 'va-dove-ti-porta-il-cane',
    title: 'Va dove ti porta il cane',
    date: '2020-03-13',
    category: 'Vita quotidiana',
    excerpt:
      "Come un cane cambia le nostre abitudini quotidiane: dalle sveglie all'alba alle vacanze al Bau Beach, un racconto tra ironia e verita.",
    content: vaDoveTiPortaRaw,
    readingTime: calcReadingTime(vaDoveTiPortaRaw),
  },
  {
    slug: 'un-cucciolo-per-natale',
    title: 'Un cucciolo per Natale?',
    date: '2020-02-10',
    category: 'Educazione',
    excerpt:
      'Un cane non e un regalo: le responsabilita che comporta accogliere un cucciolo in famiglia e perche la scelta va ponderata con attenzione.',
    content: cuccioloNataleRaw,
    readingTime: calcReadingTime(cuccioloNataleRaw),
  },
  {
    slug: 'il-barbone',
    title: 'Il Barbone',
    date: '2020-01-22',
    category: 'Razza',
    excerpt:
      'Una straordinaria descrizione del Barbone tratta dal libro di Elena Garoni: dalla storia della razza alla motivazione collaborativa che lo rende unico.',
    content: ilBarboneRaw,
    readingTime: calcReadingTime(ilBarboneRaw),
  },
  {
    slug: 'lorigine-del-nome',
    title: "L'origine del nome",
    date: '2020-01-02',
    category: 'Storie',
    excerpt:
      'Come nasce il nome Maatilayla: dalla passione per gli animali da cortile al sogno di una fattoria, fuso con il nome della fondatrice.',
    content: origineNomeRaw,
    readingTime: calcReadingTime(origineNomeRaw),
  },
  {
    slug: 'siamo-tutti-allevatori',
    title: 'Siamo tutti "allevatori"',
    date: '2019-12-31',
    category: 'Riflessioni',
    excerpt:
      'Il problema degli allevatori improvvisati che mettono a rischio la salute dei cani per facili guadagni, ignorando selezione e standard di razza.',
    content: siamoTuttiRaw,
    readingTime: calcReadingTime(siamoTuttiRaw),
  },
]

/** Articoli ordinati per data decrescente (piu recente prima) */
export const blogArticlesSorted = [...blogArticles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

/** Lookup articolo per slug */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug)
}

/** Primi 6 articoli per la preview homepage */
export const blogPreviewArticles = blogArticlesSorted.slice(0, 6)

/** Categorie uniche */
export const blogCategories: string[] = [...new Set(blogArticles.map((a) => a.category))]

// Dati galleria fotografica — tipi e placeholder

export type GalleryCategory = 'cuccioli' | 'madri' | 'struttura' | 'agility'

export interface GalleryPhoto {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  width: number
  height: number
}

export const galleryCategories: {
  key: GalleryCategory | 'tutti'
  label: string
}[] = [
  { key: 'tutti', label: 'Tutti' },
  { key: 'cuccioli', label: 'Cuccioli' },
  { key: 'madri', label: 'Le mamme' },
  { key: 'struttura', label: 'Struttura' },
  { key: 'agility', label: 'Agility' },
]

export const galleryPhotos: GalleryPhoto[] = [
  // Cuccioli (3)
  {
    id: 'cucciolo-prato-01',
    src: '/content/images/gallery/maatilayla-placeholder-01.webp',
    alt: "Cucciolo di barboncino toy rosso che gioca nel prato dell'allevamento Maatilayla",
    category: 'cuccioli',
    width: 800,
    height: 1067,
  },
  {
    id: 'cucciolo-cesta-02',
    src: '/content/images/gallery/maatilayla-placeholder-02.webp',
    alt: 'Cucciolo di barboncino toy fulvo nella cesta imbottita Maatilayla',
    category: 'cuccioli',
    width: 800,
    height: 600,
  },
  {
    id: 'cucciolo-gioco-03',
    src: '/content/images/gallery/maatilayla-placeholder-03.webp',
    alt: "Cucciolo di barboncino toy che gioca con un peluche nell'allevamento Maatilayla",
    category: 'cuccioli',
    width: 800,
    height: 800,
  },

  // Madri (3)
  {
    id: 'mamma-ritratto-04',
    src: '/content/images/gallery/maatilayla-placeholder-04.webp',
    alt: "Barboncina toy mamma in posa elegante all'allevamento Maatilayla",
    category: 'madri',
    width: 800,
    height: 1067,
  },
  {
    id: 'mamma-cuccioli-05',
    src: '/content/images/gallery/maatilayla-placeholder-05.webp',
    alt: "Barboncina toy con i suoi cuccioli nell'allevamento Maatilayla",
    category: 'madri',
    width: 800,
    height: 600,
  },
  {
    id: 'mamma-giardino-06',
    src: '/content/images/gallery/maatilayla-placeholder-06.webp',
    alt: "Barboncina toy fulva nel giardino dell'allevamento Maatilayla",
    category: 'madri',
    width: 800,
    height: 800,
  },

  // Struttura (3)
  {
    id: 'struttura-esterno-07',
    src: '/content/images/gallery/maatilayla-placeholder-07.webp',
    alt: "Vista esterna della struttura dell'allevamento barboncini Maatilayla",
    category: 'struttura',
    width: 800,
    height: 600,
  },
  {
    id: 'struttura-interno-08',
    src: '/content/images/gallery/maatilayla-placeholder-08.webp',
    alt: "Area interna dedicata ai barboncini toy dell'allevamento Maatilayla",
    category: 'struttura',
    width: 800,
    height: 1067,
  },
  {
    id: 'struttura-giardino-09',
    src: '/content/images/gallery/maatilayla-placeholder-09.webp',
    alt: "Giardino recintato per i barboncini toy dell'allevamento Maatilayla",
    category: 'struttura',
    width: 800,
    height: 800,
  },

  // Agility (3)
  {
    id: 'agility-percorso-10',
    src: '/content/images/gallery/maatilayla-placeholder-10.webp',
    alt: "Barboncino toy sul percorso agility dell'allevamento Maatilayla",
    category: 'agility',
    width: 800,
    height: 600,
  },
  {
    id: 'agility-salto-11',
    src: '/content/images/gallery/maatilayla-placeholder-11.webp',
    alt: 'Barboncino toy che supera un ostacolo agility Maatilayla',
    category: 'agility',
    width: 800,
    height: 1067,
  },
  {
    id: 'agility-tunnel-12',
    src: '/content/images/gallery/maatilayla-placeholder-12.webp',
    alt: "Barboncino toy nel tunnel agility dell'allevamento Maatilayla",
    category: 'agility',
    width: 800,
    height: 800,
  },
]

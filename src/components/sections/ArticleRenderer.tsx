import type { ReactNode } from 'react'
import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'

interface ArticleRendererProps {
  content: string
}

/** Estrae testo ricorsivamente da nodi React (react-markdown puo' passare array) */
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

/** Converte testo in id URL-safe per anchor links */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // rimuove accenti
    .replace(/[^a-z0-9\s-]/g, '') // rimuove caratteri speciali
    .replace(/\s+/g, '-') // spazi -> trattini
    .replace(/-+/g, '-') // trattini multipli -> singolo
    .replace(/^-|-$/g, '') // rimuove trattini iniziali/finali
}

/** Custom components per tipografia articolo */
const markdownComponents: Components = {
  h2: ({ children }) => {
    const text = extractText(children)
    return (
      <h2 id={slugify(text)} className="article-h2">
        {children}
      </h2>
    )
  },
  h3: ({ children }) => {
    const text = extractText(children)
    return (
      <h3 id={slugify(text)} className="article-h3">
        {children}
      </h3>
    )
  },
  p: ({ children }) => <p className="article-p">{children}</p>,
  strong: ({ children }) => <strong className="article-strong">{children}</strong>,
  em: ({ children }) => <em className="article-em">{children}</em>,
  a: ({ href, children }) => (
    <a className="article-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="article-ul">{children}</ul>,
  li: ({ children }) => <li className="article-li">{children}</li>,
}

/**
 * Renderizza contenuto markdown con tipografia articolo.
 * Rimuove titolo H1 e riga data (gia mostrati nell'header pagina).
 */
export default function ArticleRenderer({ content }: ArticleRendererProps) {
  // Rimuovere prima riga # Titolo e seconda riga *data*
  const cleaned = content.replace(/^#\s+.+\n/, '').replace(/^\*.+\*\n/, '')

  return (
    <div className="article-body">
      <Markdown components={markdownComponents}>{cleaned}</Markdown>
    </div>
  )
}

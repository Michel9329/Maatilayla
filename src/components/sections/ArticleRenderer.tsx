import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'

interface ArticleRendererProps {
  content: string
}

/** Custom components per tipografia articolo */
const markdownComponents: Components = {
  h2: ({ children }) => <h2 className="article-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="article-h3">{children}</h3>,
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

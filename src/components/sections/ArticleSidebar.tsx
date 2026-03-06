import type { BlogArticle } from '@/data/blogArticles'

interface ArticleSidebarProps {
  article: BlogArticle
  headings: Array<{ id: string; text: string; level: number }>
}

/** Sidebar articolo — placeholder, implementazione completa in Task 2 */
export default function ArticleSidebar({ article, headings }: ArticleSidebarProps) {
  return (
    <div className="as-sidebar">
      {headings.length > 0 && <p>TOC: {headings.length} heading</p>}
      <p>{article.category}</p>
    </div>
  )
}

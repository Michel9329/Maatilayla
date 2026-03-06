import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqCategories } from '@/data/faqData'

export default function FaqAccordionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('fa-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('fa-entered')
          })
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" ref={sectionRef} className="fa-section">
      {faqCategories.map((category) => (
        <div key={category.id} className="fa-category">
          <h3 className="fa-category-title">{category.title}</h3>

          {category.items.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className="fa-item" data-open={isOpen}>
                <button
                  className="fa-question"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${item.id}`}
                  id={`faq-q-${item.id}`}
                >
                  <span>{item.question}</span>
                  <ChevronDown className="fa-chevron" size={20} />
                </button>

                <div
                  className="fa-answer"
                  id={`faq-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-q-${item.id}`}
                >
                  <div
                    className="fa-answer-inner"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </section>
  )
}

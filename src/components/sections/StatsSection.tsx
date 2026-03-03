import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { end: 8, suffix: '', label: 'Anni di esperienza' },
  { end: 1, suffix: '', label: 'Ettaro di natura' },
  { end: 100, suffix: '%', label: 'Pedigree ufficiale' },
  { end: 0, suffix: '', label: 'Cuccioli in gabbia' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean) as HTMLElement[]
      const values = valueRefs.current.filter(Boolean) as HTMLElement[]

      // Entrata: fade-in + slide-up scalato
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )

      // CountUp per ogni numero
      stats.forEach((stat, i) => {
        const el = values[i]
        if (!el) return

        // 0 gabbie: scala dal grande al numero — più drammatico
        if (stat.end === 0) {
          gsap.fromTo(
            el,
            { scale: 1.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: 'back.out(1.4)',
              delay: 0.3,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 82%',
                once: true,
              },
            },
          )
          return
        }

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.end,
          duration: 1.6,
          ease: 'power2.out',
          snap: { val: 1 },
          delay: i * 0.1,
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats-section" ref={sectionRef} aria-label="I nostri numeri">
      <ul className="stats-grid">
        {stats.map(({ end, suffix, label }, i) => (
          <li
            key={label}
            className="stat-item"
            ref={(el) => {
              itemRefs.current[i] = el
            }}
          >
            <span
              className="stat-value"
              ref={(el) => {
                valueRefs.current[i] = el
              }}
            >
              {end}
              {suffix}
            </span>
            <span className="stat-label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

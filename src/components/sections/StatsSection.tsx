import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { end: 8, start: 0, suffix: '', label: 'Anni di attività', duration: 2.4 },
  { end: 10000, start: 0, suffix: 'm²', label: 'Di natura', duration: 2.8 },
  { end: 0, start: 16, suffix: '', label: 'Cani in gabbia', duration: 4.5 },
  { end: 100, start: 0, suffix: '%', label: 'Passione', duration: 2.4 },
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

      // Entrata: fade-in + slide-up staggerato
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      )

      // CountUp / CountDown per ogni numero
      stats.forEach((stat, i) => {
        const el = valueRefs.current[i]
        if (!el) return

        const obj = { val: stat.start }
        const isCountdown = stat.end < stat.start
        gsap.to(obj, {
          val: stat.end,
          duration: stat.duration,
          ease: isCountdown ? 'power2.in' : 'power2.out',
          snap: { val: 1 },
          delay: i * 0.12,
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString('it-IT') + stat.suffix
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
        {stats.map(({ start, suffix, label }, i) => (
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
              {start.toLocaleString('it-IT')}
              {suffix}
            </span>
            <span className="stat-label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

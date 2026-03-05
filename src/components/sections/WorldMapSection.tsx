import { useEffect, useRef } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  type Coordinates,
} from '@vnedyalk0v/react19-simple-maps'
import destinations from '@/data/wm-destinations.json'

const GEO_URL = '/content/data/countries-110m.json'

interface Destination {
  id: string
  name: string
  coordinates: [number, number]
  count: number
}

const data = destinations as Destination[]

export default function WorldMapSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      containerRef.current?.classList.add('wm-entered')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            containerRef.current?.classList.add('wm-entered')
          } else {
            containerRef.current?.classList.remove('wm-entered')
          }
        })
      },
      { threshold: 0, rootMargin: '-10% 0px' },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="wm-section" ref={sectionRef} aria-label="Cuccioli Maatilayla nel mondo">
      <div className="wm-container" ref={containerRef}>
        <div className="wm-header">
          <span className="wm-badge">Nel Mondo</span>
          <h2 className="wm-title">
            I cuccioli Maatilayla, <em className="wm-accent">ovunque nel mondo.</em>
          </h2>
          <p className="wm-intro">
            Ogni punto sulla mappa è una famiglia che ha scelto di portare un barboncino toy
            Maatilayla nella propria vita. Una storia di passione che va oltre i confini.
          </p>
        </div>

        <div className="wm-map-wrap">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 147 }}
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--color-accent)"
                    stroke="var(--color-cream)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none', fill: 'var(--color-secondary)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {data.map((dest) => (
              <Marker key={dest.id} coordinates={dest.coordinates as unknown as Coordinates}>
                <circle
                  r={6}
                  fill="var(--color-primary)"
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{ cursor: 'default' }}
                />
                <title>
                  {dest.name} — {dest.count} {dest.count === 1 ? 'cucciolo' : 'cuccioli'}
                </title>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        <p className="wm-caption">I dati sono in aggiornamento continuo con ogni nuova adozione.</p>
      </div>
    </section>
  )
}

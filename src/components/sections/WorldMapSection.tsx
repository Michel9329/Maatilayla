import { useEffect, useRef } from 'react'
import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps'
import geoData from '@/data/countries-110m.json'

const HIGHLIGHTED_ORDER = [
  'Italy',
  'Switzerland',
  'France',
  'Germany',
  'Greece',
  'Spain',
  'Netherlands',
  'Ukraine',
  'United States of America',
]

const COUNTRY_PILLS = [
  { code: 'it', name: 'Italia' },
  { code: 'ch', name: 'Svizzera' },
  { code: 'fr', name: 'Francia' },
  { code: 'de', name: 'Germania' },
  { code: 'gr', name: 'Grecia' },
  { code: 'es', name: 'Spagna' },
  { code: 'nl', name: 'Olanda' },
  { code: 'ua', name: 'Ucraina' },
  { code: 'us', name: 'USA' },
]

const HIGHLIGHTED_INDEX = new Map(HIGHLIGHTED_ORDER.map((name, i) => [name, i]))

const GEO_STYLE = {
  default: { outline: 'none' },
  hover: { outline: 'none' },
  pressed: { outline: 'none' },
}

export default function WorldMapSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const container = containerRef.current

    // Observer 1: entrata sezione → animazione header (opacity/translate)
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          container?.classList.toggle('wm-entered', entry.isIntersecting)
        })
      },
      { threshold: 0.1, rootMargin: '-18% 0px' },
    )
    if (container) sectionObserver.observe(container)

    if (prefersReduced) {
      container?.classList.add('wm-entered', 'wm-map-entered')
      return () => sectionObserver.disconnect()
    }

    // Observer 2: mappa visibile → illumina paesi
    const mapObserver = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          container?.classList.toggle('wm-map-entered', entry.isIntersecting)
        })
      },
      { threshold: 0.6 },
    )
    if (mapRef.current) mapObserver.observe(mapRef.current)

    return () => {
      sectionObserver.disconnect()
      mapObserver.disconnect()
    }
  }, [])

  return (
    <section className="wm-section" ref={sectionRef} aria-label="Cuccioli Maatilayla nel mondo">
      <div className="wm-container" ref={containerRef}>
        <div className="wm-header">
          <span className="wm-badge">Nel Mondo</span>
          <h2 className="wm-title">
            I cuccioli Maatilayla, <em className="wm-accent">ovunque</em>
            <br />
            <em className="wm-accent">nel mondo.</em>
          </h2>
          <p className="wm-intro">
            Ogni paese evidenziato è una famiglia che ha scelto Maatilayla — dall'Italia alle
            Hawaii, dalla Grecia all'Olanda. La distanza non ha mai cambiato il modo in cui ogni
            cucciolo viene seguito, prima e dopo l'adozione.
          </p>
        </div>

        <div className="wm-map-wrap" ref={mapRef}>
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 148, center: [0 as never, 0 as never] }}
            width={980}
            height={510}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name !== 'Antarctica')
                  .map((geo) => {
                    const idx = HIGHLIGHTED_INDEX.get(geo.properties.name)
                    const highlighted = idx !== undefined

                    if (highlighted) {
                      const isItaly = idx === 0
                      return (
                        <g
                          key={geo.rsmKey}
                          style={
                            { '--wm-delay': `${(idx * 0.25).toFixed(2)}s` } as React.CSSProperties
                          }
                        >
                          <Geography
                            geography={geo}
                            className={isItaly ? 'wm-geo-hl wm-geo-italy' : 'wm-geo-hl'}
                            stroke="#EDE5DC"
                            strokeWidth={0.4}
                            shapeRendering="geometricPrecision"
                            style={GEO_STYLE}
                          />
                        </g>
                      )
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="wm-geo-base"
                        stroke="#EDE5DC"
                        strokeWidth={0.4}
                        shapeRendering="geometricPrecision"
                        style={GEO_STYLE}
                      />
                    )
                  })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className="wm-pills">
          {COUNTRY_PILLS.map((c, i) => (
            <span
              key={c.name}
              className="wm-pill"
              style={{ '--wm-pill-delay': `${i * 0.05}s` } as React.CSSProperties}
            >
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${c.code}.svg`}
                alt={c.name}
                className="wm-flag"
                width={20}
                height={20}
              />
              {c.name}
            </span>
          ))}
        </div>

        <p className="wm-caption">I dati sono in aggiornamento continuo con ogni nuova adozione.</p>
      </div>
    </section>
  )
}

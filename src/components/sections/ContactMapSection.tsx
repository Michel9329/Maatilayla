import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined
const CENTER: [number, number] = [12.2102, 42.2005] // Str. Vicinale Pianamola 6, Bassano Romano
const ZOOM = 13
const GOOGLE_MAPS_URL =
  'https://maps.google.com/?q=Strada+Vicinale+Pianamola+6+01030+Bassano+Romano+VT'

/** Paint overrides per toni caldi pastello */
function applyPastelStyle(map: mapboxgl.Map) {
  const overrides: Array<{ layer: string; property: string; value: string }> = [
    { layer: 'water', property: 'fill-color', value: '#E0D8CC' },
    { layer: 'land', property: 'background-color', value: '#F5EDE3' },
    { layer: 'landuse', property: 'fill-color', value: '#EDE5D8' },
    { layer: 'national-park', property: 'fill-color', value: '#E5DDD0' },
    { layer: 'road-primary', property: 'line-color', value: '#D4B896' },
    { layer: 'road-secondary-tertiary', property: 'line-color', value: '#E8DDD0' },
    { layer: 'road-street', property: 'line-color', value: '#EDE5D8' },
    { layer: 'road-minor', property: 'line-color', value: '#EDE5D8' },
    { layer: 'road-motorway-trunk', property: 'line-color', value: '#D4B896' },
    { layer: 'building', property: 'fill-color', value: '#DDD4C8' },
    { layer: 'road-label', property: 'text-color', value: '#6B5040' },
    { layer: 'poi-label', property: 'text-color', value: '#8B7560' },
    { layer: 'settlement-label', property: 'text-color', value: '#4A3520' },
    { layer: 'settlement-subdivision-label', property: 'text-color', value: '#6B5040' },
  ]
  for (const { layer, property, value } of overrides) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (map.getLayer(layer)) map.setPaintProperty(layer, property as any, value)
    } catch {
      /* layer potrebbe non esistere */
    }
  }
}

function MapPlaceholder() {
  return (
    <div className="cm-placeholder" role="img" aria-label="Posizione dell'allevamento Maatilayla">
      <MapPin size={48} strokeWidth={1.4} className="cm-placeholder-icon" aria-hidden="true" />
      <p className="cm-placeholder-address">
        Strada Vicinale Pianamola 6
        <br />
        01030 Bassano Romano (VT)
      </p>
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cm-placeholder-link"
      >
        Apri in Google Maps
      </a>
    </div>
  )
}

export default function ContactMapSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Lazy load: osserva quando la sezione diventa visibile
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '200px' },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Inizializza la mappa quando visibile
  useEffect(() => {
    if (!isVisible || !MAPBOX_TOKEN || mapRef.current) return

    let cancelled = false

    async function initMap() {
      try {
        const mapboxgl = (await import('mapbox-gl')).default
        await import('mapbox-gl/dist/mapbox-gl.css')

        if (cancelled || !containerRef.current) return

        mapboxgl.accessToken = MAPBOX_TOKEN!

        const map = new mapboxgl.Map({
          container: containerRef.current,
          style: 'mapbox://styles/michelmaaty/cmmffpkvp002501s8fp0g74dg',
          center: CENTER,
          zoom: ZOOM,
          attributionControl: true,
          scrollZoom: false,
        })

        map.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // Marker primary
        const markerEl = document.createElement('div')
        markerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48" fill="none">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="#C8614A"/>
          <circle cx="18" cy="17" r="7" fill="white"/>
        </svg>`
        markerEl.style.cursor = 'pointer'

        const marker = new mapboxgl.Marker({ element: markerEl }).setLngLat(CENTER).addTo(map)

        // Popup
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
          `<div style="font-family:var(--font-body);font-size:0.85rem;line-height:1.5;color:#1a1008;padding:4px 2px">
            <strong>Allevamento Maatilayla</strong><br/>
            Bassano Romano (VT)<br/>
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer"
               style="color:#C8614A;text-decoration:none;font-weight:500">
              Indicazioni stradali &rarr;
            </a>
          </div>`,
        )
        marker.setPopup(popup).togglePopup()

        map.on('load', () => {
          if (!cancelled) applyPastelStyle(map)
        })

        mapRef.current = map
      } catch {
        if (!cancelled) setHasError(true)
      }
    }

    initMap()

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [isVisible])

  if (!MAPBOX_TOKEN || hasError) {
    return (
      <div className="cm-section">
        <MapPlaceholder />
      </div>
    )
  }

  return (
    <div className="cm-section">
      <div ref={containerRef} className="cm-map-container" />
    </div>
  )
}

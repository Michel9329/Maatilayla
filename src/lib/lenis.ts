import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let _lenis: Lenis | null = null

export function initLenis(): void {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (_lenis) return

  _lenis = new Lenis({
    autoRaf: false,
    syncTouch: false,
  })

  // Sincronizza ScrollTrigger con la posizione scroll di Lenis
  _lenis.on('scroll', ScrollTrigger.update)

  // Alimenta Lenis con il ticker GSAP invece di requestAnimationFrame nativo
  gsap.ticker.add((time) => {
    _lenis!.raf(time * 1000)
  })

  // Disabilita il lag smoothing per evitare salti nel refresh di ScrollTrigger
  gsap.ticker.lagSmoothing(0)
}

export function getLenis(): Lenis | null {
  return _lenis
}

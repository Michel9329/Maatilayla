import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getLenis } from '@/lib/lenis'

// Lazy load pagine interne
const ChiSiamo = lazy(() => import('@/pages/ChiSiamo'))
const Blog = lazy(() => import('@/pages/Blog'))
const Galleria = lazy(() => import('@/pages/Galleria'))
const Faq = lazy(() => import('@/pages/Faq'))
const Contatti = lazy(() => import('@/pages/Contatti'))
const IlBarbone = lazy(() => import('@/pages/IlBarbone'))
const BlogArticle = lazy(() => import('@/pages/BlogArticle'))

/* Scrolla in cima ad ogni cambio pagina, compatibile con Lenis */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const { trackPageView, isAnalyticsEnabled } = useAnalytics()

  useEffect(() => {
    if (isAnalyticsEnabled || import.meta.env.VITE_ANALYTICS_DEBUG) {
      trackPageView(location.pathname)
    }
  }, [location.pathname, isAnalyticsEnabled, trackPageView])

  return (
    <Suspense>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/il-barbone" element={<IlBarbone />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

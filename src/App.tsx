import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import { useAnalytics } from '@/hooks/useAnalytics'

// Lazy load pagine interne (Home caricata subito per performance)
const ChiSiamo = lazy(() => import('@/pages/ChiSiamo'))
const Blog = lazy(() => import('@/pages/Blog'))
const Galleria = lazy(() => import('@/pages/Galleria'))
const Faq = lazy(() => import('@/pages/Faq'))
const Contatti = lazy(() => import('@/pages/Contatti'))

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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contatti" element={<Contatti />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

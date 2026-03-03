import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ChiSiamo from '@/pages/ChiSiamo'
import Blog from '@/pages/Blog'
import Galleria from '@/pages/Galleria'
import Faq from '@/pages/Faq'
import Contatti from '@/pages/Contatti'
import { useAnalytics } from '@/hooks/useAnalytics'

function App() {
  const location = useLocation()
  const { trackPageView, isAnalyticsEnabled } = useAnalytics()

  // Traccia il page view quando la rotta cambia
  useEffect(() => {
    if (isAnalyticsEnabled || import.meta.env.VITE_ANALYTICS_DEBUG) {
      trackPageView(location.pathname)
    }
  }, [location.pathname, isAnalyticsEnabled, trackPageView])

  return (
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
  )
}

export default App

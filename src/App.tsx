import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ChiSiamo from '@/pages/ChiSiamo'
import Blog from '@/pages/Blog'
import Galleria from '@/pages/Galleria'
import Faq from '@/pages/Faq'
import Contatti from '@/pages/Contatti'

function App() {
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

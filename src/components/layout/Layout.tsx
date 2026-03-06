import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  useEffect(() => {
    /* Blocca menu contestuale (tasto destro) */
    const onContext = (e: MouseEvent) => e.preventDefault()

    /* Blocca scorciatoie copia/salva/stampa */
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', onContext)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('contextmenu', onContext)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Salta al contenuto
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

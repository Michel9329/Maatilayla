export default function Footer() {
  return (
    <footer className="bg-[var(--color-cream)] border-t border-[var(--color-primary-pale)] py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[var(--color-text-muted)]">
        <p className="font-heading text-[var(--color-primary)] text-lg mb-2">Maatilayla</p>
        <p>Allevamento Barboncini Toy — Riconosciuto ENCI-FCI</p>
        <p className="mt-2">© {new Date().getFullYear()} Maatilayla. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}

const stats = [
  { value: '8', label: 'Anni di esperienza' },
  { value: '1', label: 'Ettaro di natura' },
  { value: '100%', label: 'Riproduttori testati' },
  { value: '0', label: 'Cuccioli in gabbia' },
]

export default function StatsSection() {
  return (
    <section className="stats-section" aria-label="I nostri numeri">
      <ul className="stats-grid">
        {stats.map(({ value, label }) => (
          <li key={label} className="stat-item">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

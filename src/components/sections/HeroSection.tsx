import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface HeroProps {
  image: string
  alt: string
  title: ReactNode
  subtitle?: string
  badge?: string
  description?: {
    short: string
    full: string
  }
  cta?: Array<{
    label: string
    to: string
    variant: 'primary' | 'outline'
  }>
  compact?: boolean
  lightText?: boolean
  bgPosition?: string
  opaqueCard?: boolean
  cardClassName?: string
  sectionClassName?: string
}

export default function HeroSection({
  image,
  alt,
  title,
  subtitle,
  badge,
  description,
  cta,
  compact,
  lightText,
  bgPosition,
  opaqueCard,
  cardClassName,
  sectionClassName,
}: HeroProps) {
  const colorText = lightText ? 'rgba(255,255,255,0.95)' : 'var(--color-text)'
  const colorMuted = lightText ? 'rgba(255,255,255,0.72)' : 'var(--color-text-muted)'

  const descStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.82rem, 1vw, 0.88rem)',
    fontWeight: 400 as const,
    lineHeight: 1.75,
    color: colorText,
    margin: 0,
  }

  const sectionClass = `${compact ? 'hero-section hero-section--compact' : 'hero-section'}${sectionClassName ? ` ${sectionClassName}` : ''}`

  return (
    <section className={sectionClass} aria-label="Sezione principale">
      {/* Background image */}
      <div
        className="hero-bg"
        role="img"
        aria-label={alt}
        style={{
          backgroundImage: `url(${image})`,
          ...(bgPosition && { backgroundPosition: bgPosition }),
        }}
      />

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Glass Card — animazione via CSS @keyframes */}
      <div
        className={`hero-card${opaqueCard ? ' hero-card--opaque' : ''}${lightText ? ' hero-card--light' : ''}${cardClassName ? ` ${cardClassName}` : ''}`}
      >
        {/* Badge */}
        {badge && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: colorMuted,
              lineHeight: 1,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--color-primary)',
                flexShrink: 0,
                animation: 'pulse-dot 2.4s ease-in-out infinite',
              }}
            />
            {badge}
          </span>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: compact ? 'clamp(1.5rem, 2.4vw, 2.2rem)' : 'clamp(1.65rem, 2.6vw, 2.4rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: colorText,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: colorMuted,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Description — CSS toggles short/full */}
        {description && (
          <div>
            <p className="hero-desc-short" style={descStyle}>
              {description.short}
            </p>
            <p className="hero-desc-full" style={descStyle}>
              {description.full}
            </p>
          </div>
        )}

        {/* CTA */}
        {cta && cta.length > 0 && (
          <div className="hero-cta">
            {cta.map((btn) =>
              btn.to.startsWith('#') ? (
                <a
                  key={btn.to}
                  href={btn.to}
                  className={btn.variant === 'primary' ? 'btn-hero-primary' : 'btn-hero-outline'}
                  onClick={(e) => {
                    e.preventDefault()
                    import('../../lib/lenis').then(({ scrollToHash }) => scrollToHash(btn.to))
                  }}
                >
                  {btn.label}
                </a>
              ) : (
                <Link
                  key={btn.to}
                  to={btn.to}
                  className={btn.variant === 'primary' ? 'btn-hero-primary' : 'btn-hero-outline'}
                >
                  {btn.label}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}

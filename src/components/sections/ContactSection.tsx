import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useRecaptcha } from '@/hooks/useRecaptcha'

const RATE_LIMIT_MS = 30_000

const schema = z.object({
  name: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  message: z.string().min(10, 'Il messaggio deve avere almeno 10 caratteri'),
  consent: z.literal(true, {
    error: 'Devi acconsentire al trattamento dei dati',
  }),
})

type FormData = z.infer<typeof schema>

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Indirizzo',
    content: 'Strada Vicinale Pianamola 6, 01030 Bassano Romano (VT)',
    href: 'https://maps.google.com/?q=Strada+Vicinale+Pianamola+6+01030+Bassano+Romano+VT',
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefono',
    lines: [
      { text: '07 61 179 0344', href: 'tel:+390761790344', note: 'fisso' },
      { text: '338 761 7628', href: 'tel:+393387617628', note: 'cell / WhatsApp' },
    ],
  },
  {
    icon: Mail,
    label: 'Email',
    content: 'maatilayla.org@gmail.com',
    href: 'mailto:maatilayla.org@gmail.com',
  },
  {
    icon: Clock,
    label: 'Orari',
    content: 'Lun - Sab: 9.00 - 13.00 | 15.30 - 19.00',
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [honeypot, setHoneypot] = useState('')
  const lastSubmitRef = useRef(0)
  const { getToken } = useRecaptcha()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '', consent: false as unknown as true },
  })

  // ── CSS entrance via IntersectionObserver ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('ct-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('ct-entered')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-20% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const onSubmit = async (data: FormData) => {
    // Honeypot — bot compilano campi nascosti
    if (honeypot) return

    // Rate limiting
    const now = Date.now()
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus('error')
      setErrorMsg('Attendi qualche secondo prima di riprovare.')
      return
    }
    lastSubmitRef.current = now

    setStatus('loading')
    setErrorMsg('')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error')
      setErrorMsg('Servizio non configurato. Scrivici direttamente a maatilayla.org@gmail.com')
      return
    }

    try {
      // reCAPTCHA v3 token (se configurato)
      const recaptchaToken = await getToken('contact')

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          'g-recaptcha-response': recaptchaToken ?? '',
        },
        publicKey,
      )

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
      setErrorMsg("Errore nell'invio. Riprova o scrivici a maatilayla.org@gmail.com")
    }
  }

  return (
    <section className="ct-section" ref={sectionRef} aria-label="Contatti">
      <div className="ct-header">
        <span className="ct-badge">Contatti</span>
        <h2 className="ct-title">
          Hai domande? <em className="ct-title-accent">Scrivici.</em>
        </h2>
        <p className="ct-subtitle">
          Siamo a disposizione per informazioni sui cuccioli, visite all&apos;allevamento o
          qualsiasi curiosità.
        </p>
      </div>

      <div className="ct-grid">
        {/* ── Form ── */}
        <div className="ct-form-wrap">
          {status === 'success' ? (
            <div className="ct-success" role="status">
              <CheckCircle2 size={28} strokeWidth={1.8} />
              <p>Messaggio inviato! Ti risponderemo il prima possibile.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="ct-form">
              {/* Honeypot anti-bot */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />
              <div className="ct-field">
                <input
                  type="text"
                  placeholder="Nome"
                  autoComplete="name"
                  aria-label="Nome"
                  aria-invalid={!!errors.name}
                  className={`ct-input${errors.name ? ' ct-input--error' : ''}`}
                  {...register('name')}
                />
                {errors.name && (
                  <span className="ct-error" role="alert">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="ct-field">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  className={`ct-input${errors.email ? ' ct-input--error' : ''}`}
                  {...register('email')}
                />
                {errors.email && (
                  <span className="ct-error" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="ct-field">
                <textarea
                  placeholder="Il tuo messaggio"
                  rows={5}
                  aria-label="Messaggio"
                  aria-invalid={!!errors.message}
                  className={`ct-textarea${errors.message ? ' ct-input--error' : ''}`}
                  {...register('message')}
                />
                {errors.message && (
                  <span className="ct-error" role="alert">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <label className="ct-consent">
                <input type="checkbox" {...register('consent')} className="ct-checkbox" />
                <span className="ct-consent-text">
                  Acconsento al trattamento dei dati personali ai sensi del GDPR
                </span>
              </label>
              {errors.consent && (
                <span className="ct-error" role="alert">
                  {errors.consent.message}
                </span>
              )}

              <button type="submit" disabled={status === 'loading'} className="ct-btn">
                {status === 'loading' ? (
                  <Loader2 size={18} className="ct-spinner" aria-hidden="true" />
                ) : null}
                {status === 'loading' ? 'Invio...' : 'Invia messaggio'}
              </button>

              {status === 'error' && (
                <div className="ct-error-msg" role="alert">
                  <AlertCircle size={16} strokeWidth={2} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* ── Info contatto ── */}
        <div className="ct-info">
          {contactInfo.map((item) => (
            <div key={item.label} className="ct-info-block">
              <div className="ct-info-icon">
                <item.icon size={20} strokeWidth={1.8} />
              </div>
              <div className="ct-info-content">
                <h3 className="ct-info-label">{item.label}</h3>
                {'lines' in item && item.lines ? (
                  item.lines.map((line) => (
                    <a key={line.text} href={line.href} className="ct-info-link ct-info-phone">
                      {line.text}
                      <span className="ct-info-note">({line.note})</span>
                    </a>
                  ))
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="ct-info-link"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="ct-info-value">{item.content}</p>
                )}
              </div>
            </div>
          ))}
          <p className="ct-info-note-text">
            La sede dell&apos;allevamento è anche il posto in cui viviamo. Al fine di tutelare la
            nostra privacy, non potremo ricevere chi non avrà preventivamente fissato un
            appuntamento.
          </p>
        </div>
      </div>
    </section>
  )
}

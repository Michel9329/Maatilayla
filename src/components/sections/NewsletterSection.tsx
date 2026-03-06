import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRecaptcha } from '@/hooks/useRecaptcha'

const RATE_LIMIT_MS = 30_000

const schema = z.object({
  email: z.string().email('Inserisci un indirizzo email valido'),
  consent: z.literal(true, {
    error: 'Devi acconsentire al trattamento dei dati',
  }),
})

type FormData = z.infer<typeof schema>

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [honeypot, setHoneypot] = useState('')
  const lastSubmitRef = useRef(0)
  const { getToken, enabled: recaptchaEnabled } = useRecaptcha()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', consent: false as unknown as true },
  })

  // ── CSS entrance via IntersectionObserver ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      section.classList.add('nl-entered')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            section.classList.add('nl-entered')
          })
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '-12% 0px' },
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

    const apiKey = import.meta.env.VITE_BREVO_API_KEY
    const listId = Number(import.meta.env.VITE_BREVO_LIST_ID)

    if (!apiKey || !listId) {
      setStatus('error')
      setErrorMsg('Configurazione newsletter non disponibile. Contattaci direttamente.')
      return
    }

    // reCAPTCHA v3 gate — se configurato, richiediamo il token
    if (recaptchaEnabled) {
      const token = await getToken('newsletter')
      if (!token) {
        setStatus('error')
        setErrorMsg('Verifica anti-spam fallita. Ricarica la pagina e riprova.')
        return
      }
    }

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          listIds: [listId],
          updateEnabled: true,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        // Brevo restituisce "Contact already exist" per duplicati — trattiamo come successo
        if (body?.code === 'duplicate_parameter') {
          setStatus('success')
          reset()
          return
        }
        throw new Error(body?.message || "Errore durante l'iscrizione")
      }

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
      setErrorMsg('Si è verificato un errore. Riprova o contattaci direttamente.')
    }
  }

  return (
    <div className="nl-wrap">
      <section className="nl-section" ref={sectionRef} aria-label="Newsletter">
        <div className="nl-content">
          <div className="nl-text">
            <span className="nl-badge">Newsletter</span>
            <h2 className="nl-title">
              Resta <em className="nl-title-accent">aggiornato</em>
              <span className="nl-title-accent">*</span>
            </h2>
            <p className="nl-subtitle">
              Novità dall&apos;allevamento, cuccioli disponibili e consigli direttamente nella tua
              casella di posta.
            </p>
          </div>

          <div className="nl-form-wrap">
            {status === 'success' ? (
              <div className="nl-success" role="status">
                <CheckCircle2 size={24} strokeWidth={1.8} />
                <p>Iscrizione completata! Controlla la tua email per confermare.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="nl-form">
                {/* Honeypot anti-bot */}
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                />
                <div className="nl-input-row">
                  <div className="nl-field">
                    <input
                      type="email"
                      placeholder="La tua email"
                      autoComplete="email"
                      aria-label="Indirizzo email"
                      aria-invalid={!!errors.email}
                      className={`nl-input${errors.email ? ' nl-input--error' : ''}`}
                      {...register('email')}
                    />
                  </div>
                  <button type="submit" disabled={status === 'loading'} className="nl-btn">
                    {status === 'loading' ? (
                      <Loader2 size={18} className="nl-spinner" aria-hidden="true" />
                    ) : null}
                    {status === 'loading' ? 'Iscrizione...' : 'Iscriviti'}
                  </button>
                </div>
                {errors.email && (
                  <span className="nl-error" role="alert">
                    {errors.email.message}
                  </span>
                )}

                <label className="nl-consent">
                  <input type="checkbox" {...register('consent')} className="nl-checkbox" />
                  <span className="nl-consent-text">
                    Acconsento al trattamento dei dati personali
                  </span>
                </label>
                {errors.consent && (
                  <span className="nl-error" role="alert">
                    {errors.consent.message}
                  </span>
                )}

                {status === 'error' && (
                  <div className="nl-error-msg" role="alert">
                    <AlertCircle size={16} strokeWidth={2} />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
        <p className="nl-privacy">*Nessuno spam. Puoi disiscriverti in qualsiasi momento.</p>
      </section>
    </div>
  )
}

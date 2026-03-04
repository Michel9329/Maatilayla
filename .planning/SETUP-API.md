# Setup API — Guida passo-passo

## 1. EmailJS (form contatti)

1. Vai su [emailjs.com](https://www.emailjs.com/) → **Sign Up** (gratis, 200 email/mese)
2. **Email Services** → Add New Service → scegli **Gmail** → collega `maatilayla.org@gmail.com`
   - Salva il **Service ID** (es. `service_xxxxx`)
3. **Email Templates** → Create New Template → configura:
   - **To Email:** `maatilayla.org@gmail.com`
   - **Subject:** `Nuovo messaggio da {{from_name}} — Maatilayla`
   - **Body:**

     ```text
     Nome: {{from_name}}
     Email: {{from_email}}

     Messaggio:
     {{message}}
     ```

   - Salva il **Template ID** (es. `template_xxxxx`)
4. **Account** → API Keys → copia la **Public Key**

---

## 2. Brevo (newsletter)

1. Vai su [brevo.com](https://www.brevo.com/) → **Sign Up** (gratis, 300 email/giorno)
2. **Contacts** → Lists → Create a list → nome "Newsletter Maatilayla"
   - Annota il **List ID** (numero visibile nell'URL o nelle impostazioni lista)
3. **Settings** → SMTP & API → API Keys → **Generate a new API key**
   - Salva la **API Key**
4. Consigliato: **Settings** → Senders → verifica `maatilayla.org@gmail.com` come mittente
5. Consigliato per GDPR: **Contacts** → Settings → attiva **Double Opt-in** (conferma email)

---

## 3. Google reCAPTCHA v3 (anti-spam)

Dalla [console Google reCAPTCHA](https://www.google.com/recaptcha/admin), copia la **site key** del sito.

Se devi creare un nuovo sito:

1. Vai su [recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. **Label:** Maatilayla
3. **reCAPTCHA type:** v3
4. **Domains:** `allevamentobarboncinimaatilayla.it` + `localhost`
5. Copia la **Site Key**

---

## 4. File `.env.local`

Crea il file `.env.local` nella **root del progetto** (stessa cartella di `package.json`):

```env
# EmailJS (form contatti)
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=la_tua_public_key

# Brevo (newsletter)
VITE_BREVO_API_KEY=xkeysib-xxxxx
VITE_BREVO_LIST_ID=3

# Google reCAPTCHA v3 (anti-spam)
VITE_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxxxxxxxxxxx
```

Dopo aver creato il file, riavvia il dev server con `npm run dev`.

---

## Test

1. **Form contatti** — compila e invia, verifica ricezione su `maatilayla.org@gmail.com`
2. **Newsletter (sezione)** — iscriviti con email di test, verifica su dashboard Brevo
3. **Newsletter (footer)** — stessa verifica
4. **reCAPTCHA** — apri DevTools → Network, cerca richieste a `google.com/recaptcha`

import { FormEvent, useRef, useState } from 'react'
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { buildGmailComposeUrl, buildWhatsAppUrl, contactDetails, createLeadMessage } from '../utils/contact'

const contactCards = [
  {
    label: 'Call',
    value: contactDetails.phoneDisplay,
    href: contactDetails.phoneHref,
    icon: Phone,
  },
  {
    label: 'WhatsApp',
    value: 'Chat with an expert',
    href: buildWhatsAppUrl('Hi Webaura, I want a free consultation for my business website.'),
    icon: MessageCircle,
  },
  {
    label: 'Email',
    value: contactDetails.emails[1],
    href: buildGmailComposeUrl('Website consultation request', 'Hi Webaura,\n\nI want to discuss a website project.'),
    icon: Mail,
  },
]

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState('')

  const getLeadDetails = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const business = String(formData.get('business') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const goal = String(formData.get('goal') || '').trim()

    return { business, goal, name, phone }
  }

  const handleLeadAction = (action: 'email' | 'whatsapp') => {
    const form = formRef.current
    if (!form) return

    if (!form.reportValidity()) {
      setStatus('Please fill all fields before sending.')
      return
    }

    const lead = getLeadDetails(form)
    const message = createLeadMessage(lead)

    if (action === 'whatsapp') {
      window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
      setStatus('Opening WhatsApp with your project details.')
    } else {
      window.open(buildGmailComposeUrl(`Website consultation request from ${lead.name}`, message), '_blank', 'noopener,noreferrer')
      setStatus('Opening Gmail with your project details.')
    }

    form.reset()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleLeadAction('whatsapp')
  }

  return (
    <section id="contact" className="px-container py-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.72fr_1fr] md:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-accent">Contact us</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-none">
              Start the conversation. We will handle the clarity.
            </h2>
          </div>
          <p className="max-w-[620px] text-body-md leading-7 text-muted">
            Based in {contactDetails.city}. Send your details on WhatsApp, call directly, or reach
            Webaura by email for a free website consultation.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon

              return (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="glow-card reveal flex items-center justify-between gap-5 rounded-[8px] border border-white/10 bg-surface p-[clamp(1rem,3vw,2rem)] transition hover:border-accent/40"
                >
                  <span>
                    <span className="font-mono text-xs uppercase text-muted">{card.label}</span>
                    <span className="mt-3 block font-display text-[clamp(1.4rem,3vw,2.5rem)] font-semibold leading-tight">
                      {card.value}
                    </span>
                  </span>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/[0.06] text-accent ring-1 ring-white/10">
                    <Icon className="size-5" />
                  </span>
                </a>
              )
            })}

            <div className="reveal rounded-[8px] border border-white/10 bg-surface p-[clamp(1rem,3vw,2rem)]">
              <div className="mb-6 flex items-center gap-3 text-muted">
                <MapPin className="size-5 text-accent" />
                <span className="font-mono text-xs uppercase">Service area</span>
              </div>
              <p className="font-display text-[clamp(1.4rem,3vw,2.5rem)] font-semibold">{contactDetails.city}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {contactDetails.instagram.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-muted transition hover:border-accent/50 hover:text-white"
                  >
                    <Instagram className="size-4 text-accent" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="reveal rounded-[8px] border border-white/10 bg-white/[0.055] p-[clamp(1rem,3vw,2rem)] backdrop-blur-xl"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-mono text-xs uppercase text-muted">Name</span>
                <input className="accent-input" name="name" type="text" placeholder="Your name" required />
              </label>
              <label className="grid gap-2">
                <span className="font-mono text-xs uppercase text-muted">Phone</span>
                <input className="accent-input" name="phone" type="tel" placeholder="+91" required />
              </label>
            </div>
            <label className="mt-4 grid gap-2">
              <span className="font-mono text-xs uppercase text-muted">Business</span>
              <input className="accent-input" name="business" type="text" placeholder="Restaurant, clinic, boutique..." required />
            </label>
            <label className="mt-4 grid gap-2">
              <span className="font-mono text-xs uppercase text-muted">What do you need?</span>
              <textarea
                className="accent-input min-h-[170px] resize-none"
                name="goal"
                placeholder="Website, landing page, WhatsApp leads, catalog, bookings..."
                required
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="btn-premium inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(45,91,255,0.38)]"
              >
                Send on WhatsApp
                <ArrowUpRight className="size-4" />
              </button>
              <a
                href={buildGmailComposeUrl('Website consultation request', 'Hi Webaura,\n\nI want to discuss a website project.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:border-accent/50"
                onClick={(event) => {
                  event.preventDefault()
                  handleLeadAction('email')
                }}
              >
                Email Webaura
                <Mail className="size-4" />
              </a>
            </div>

            <p className="mt-4 min-h-6 text-sm text-muted" aria-live="polite">
              {status || 'Your form opens WhatsApp with a ready-to-send message.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

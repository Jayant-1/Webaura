import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import { FormEvent, useRef } from 'react'
import { buildGmailComposeUrl, buildWhatsAppUrl, createLeadMessage } from '../utils/contact'

type ContactDrawerProps = {
  onClose: () => void
  open: boolean
}

export default function ContactDrawer({ onClose, open }: ContactDrawerProps) {
  const formRef = useRef<HTMLFormElement>(null)

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
    if (!form || !form.reportValidity()) return

    const lead = getLeadDetails(form)
    const message = createLeadMessage(lead)

    if (action === 'whatsapp') {
      window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    } else {
      window.open(buildGmailComposeUrl(`Website consultation request from ${lead.name}`, message), '_blank', 'noopener,noreferrer')
    }

    form.reset()
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleLeadAction('whatsapp')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close consultation drawer"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] h-[100dvh] max-h-[100dvh] w-full max-w-[520px] overflow-y-auto overscroll-contain border-l border-white/10 bg-primary shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <div className="flex min-h-full flex-col p-[clamp(1rem,4vw,2rem)] pb-[calc(clamp(1rem,4vw,2rem)+env(safe-area-inset-bottom))]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase text-accent">Start your build</p>
                  <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-none">
                    Tell us what you want to grow.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="sticky top-4 grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur"
                  aria-label="Close drawer"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:mt-10">
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase text-muted">Name</span>
                  <input className="accent-input" name="name" type="text" placeholder="Your name" required />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase text-muted">Business</span>
                  <input className="accent-input" name="business" type="text" placeholder="Restaurant, clinic, boutique..." required />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase text-muted">WhatsApp</span>
                  <input className="accent-input" name="phone" type="tel" placeholder="+91" required />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase text-muted">Goal</span>
                  <textarea
                    className="accent-input min-h-[120px] resize-none sm:min-h-[140px]"
                    name="goal"
                    placeholder="More bookings, more calls, catalog launch, online orders..."
                    required
                  />
                </label>

                <div className="mt-2 grid gap-3 sm:mt-4">
                  <button
                    type="submit"
                    className="btn-premium inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(45,91,255,0.38)]"
                  >
                    Send on WhatsApp
                    <ArrowUpRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLeadAction('email')}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:border-accent/50"
                  >
                    Email Webaura
                    <Mail className="size-4" />
                  </button>
                </div>
              </form>

              <p className="mt-auto pt-6 text-sm leading-6 text-muted sm:pt-8">
                Typical response time is under 24 hours. You can also use the WhatsApp button for a
                faster start.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

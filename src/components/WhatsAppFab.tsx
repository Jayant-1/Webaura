import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../utils/contact'

export default function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl('Hi Webaura, I want to speak with an expert about my business website.')}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-pulse fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#25D366] px-4 py-3 text-sm font-semibold text-primary shadow-[0_0_40px_rgba(37,211,102,0.35)]"
      aria-label="Chat with an Expert on WhatsApp"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat with an Expert</span>
    </a>
  )
}

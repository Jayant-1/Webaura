import {
  Clock3,
  IndianRupee,
  MessageCircle,
  MousePointerClick,
  SearchX,
  ShieldCheck,
} from 'lucide-react'

const cards = [
  {
    title: 'Missed WhatsApp Inquiries',
    eyebrow: 'The leak',
    metric: '42%',
    metricLabel: 'of local buyers expect instant chat access',
    copy: 'Interested buyers bounce when your business depends on screenshots, slow replies, or a buried phone number.',
    className: 'md:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[280px]',
    icon: MessageCircle,
    featured: true,
  },
  {
    title: 'Local Search Blind Spot',
    eyebrow: 'The gap',
    metric: 'Near me',
    metricLabel: 'intent needs a trusted landing point',
    copy: 'Customers are searching nearby, but your offer is scattered across directories instead of one trusted destination.',
    className: 'md:col-span-2 lg:col-span-3 lg:row-span-1 min-h-[280px]',
    icon: SearchX,
  },
  {
    title: 'Speed to Launch',
    eyebrow: 'Our edge',
    metric: 'Fast',
    metricLabel: 'launch-ready React builds',
    copy: 'Editorial design, clean React builds, and conversion copy shaped into a launch-ready site fast.',
    className: 'md:col-span-2 lg:col-span-3 lg:row-span-1 min-h-[280px]',
    icon: Clock3,
  },
  {
    title: 'Offer Clarity',
    eyebrow: 'Conversion',
    metric: '1 path',
    metricLabel: 'from attention to inquiry',
    copy: 'Menus, catalogs, prices, forms, testimonials, and WhatsApp prompts are arranged so action feels obvious.',
    className: 'md:col-span-2 lg:col-span-7 lg:row-span-1 min-h-[280px]',
    icon: MousePointerClick,
  },
  {
    title: 'Premium Trust Layer',
    eyebrow: 'Why Webaura',
    metric: 'Trust',
    metricLabel: 'before the first conversation',
    copy: 'Your business gets the polish of a luxury brand while keeping the buying path simple for real local customers.',
    className: 'md:col-span-2 lg:col-span-5 lg:row-span-1 min-h-[280px]',
    icon: ShieldCheck,
  },
  {
    title: 'Sales Without Bloat',
    eyebrow: 'ROI',
    metric: 'Lean',
    metricLabel: 'pages with visible CTAs',
    copy: 'Lean pages, visible CTAs, and measurable lead paths instead of a bloated brochure site.',
    className: 'md:col-span-2 lg:col-span-12 lg:row-span-1 min-h-[240px]',
    icon: IndianRupee,
  },
]

export default function BentoSection() {
  return (
    <section id="problems" className="px-container py-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-end">
          <p className="font-mono text-xs uppercase text-accent">Problem and why Webaura</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-none">
            Your customers are ready. Your online presence should be too.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className={`glow-card reveal rounded-lg border border-white/[0.08] bg-surface p-[clamp(1.2rem,2.5vw,2rem)] transition-all duration-300 hover:border-white/[0.16] ${card.featured ? 'bg-[radial-gradient(circle_at_20%_10%,rgba(45,91,255,0.22),transparent_34%),#111111]' : ''} ${card.className}`}
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{card.eyebrow}</p>
                        <div className="mt-3">
                          <p className="font-mono text-[clamp(1.4rem,2.8vw,2.8rem)] leading-none text-white">
                            {card.metric}
                          </p>
                          <p className="mt-1.5 text-xs leading-5 text-muted">
                            {card.metricLabel}
                          </p>
                        </div>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.05] text-accent ring-1 ring-white/[0.08] transition-all duration-300">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-semibold leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs leading-6 text-muted/90">{card.copy}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

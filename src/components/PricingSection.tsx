import { useState } from 'react'
import clsx from 'clsx'
import { ArrowUpRight, Check } from 'lucide-react'

type PricingSectionProps = {
  onOpenDrawer: () => void
}

const plans = [
  {
    name: 'Starter',
    price: '₹9,999',
    description: 'A polished one-page presence for shops and solo operators.',
    features: ['Premium landing page', 'WhatsApp CTA', 'Basic local SEO'],
  },
  {
    name: 'Business',
    price: '₹11,999',
    description: 'The high-conversion site for restaurants, clinics, boutiques, and service brands.',
    features: ['5-page website', 'Lead capture form', 'Portfolio or menu section', 'Analytics setup'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹14,999',
    description: 'A sharper system for brands that need campaigns, content, and ongoing iteration.',
    features: ['Conversion copy', 'Advanced SEO structure', 'Monthly CRO review', 'Priority support'],
  },
]

export default function PricingSection({ onOpenDrawer }: PricingSectionProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="pricing" className="px-container py-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 grid gap-5 md:grid-cols-[1fr_0.65fr] md:items-end">
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-none">
            Pricing built to make the first yes easy.
          </h2>
          <p className="text-body-md leading-7 text-muted">
            Transparent packages with premium execution, clean handoff, and a conversion path from
            the first click.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const dimmed = hovered !== null && hovered !== index

            return (
              <article
                key={plan.name}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={clsx(
                  'reveal relative rounded-[8px] border bg-white/[0.055] p-[clamp(1rem,3vw,2rem)] backdrop-blur-xl transition duration-300',
                  plan.featured
                    ? 'border-accent shadow-[0_0_70px_rgba(45,91,255,0.22)]'
                    : 'border-white/10',
                  dimmed && 'opacity-40',
                )}
              >
                {plan.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 font-mono text-[0.68rem] uppercase text-white shadow-[0_0_24px_rgba(45,91,255,0.55)] animate-pulse">
                    Most Popular
                  </div>
                )}

                <p className="font-mono text-xs uppercase text-muted">{plan.name}</p>
                <p className="mt-8 font-mono text-[clamp(2rem,5vw,4.2rem)] leading-none text-white">
                  {plan.price}
                </p>
                <p className="mt-6 min-h-[84px] text-body-md leading-7 text-muted">{plan.description}</p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/85">
                      <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
                        <Check className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onOpenDrawer}
                  className={clsx(
                    'btn-premium mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold transition',
                    plan.featured
                      ? 'bg-accent text-white shadow-[0_0_38px_rgba(45,91,255,0.35)]'
                      : 'border border-white/10 bg-white text-primary hover:text-accent',
                  )}
                >
                  Get Started
                  <ArrowUpRight className="size-4" />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

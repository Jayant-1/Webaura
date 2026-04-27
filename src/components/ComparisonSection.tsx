import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, XCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const withoutItems = [
  'Leads scattered across DMs',
  'Customers cannot compare services',
  'Trust depends on social posts',
  'No clear path from search to sale',
]

const withItems = [
  'WhatsApp and form leads captured',
  'Services, proof, and pricing organized',
  'Premium trust signal for new buyers',
  'Search-ready pages built for action',
]

export default function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const withoutRef = useRef<HTMLDivElement>(null)
  const withRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !withoutRef.current || !withRef.current) return

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
        .to(withRef.current, { flexBasis: '70%', ease: 'none' }, 0)
        .to(withoutRef.current, { flexBasis: '30%', ease: 'none' }, 0)
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="proof" ref={sectionRef} className="px-container py-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase text-accent">Before vs after</p>
          <h2 className="mt-4 max-w-[940px] font-display text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-none">
            The online side of your business should overpower the friction.
          </h2>
        </div>

        <div className="reveal flex min-h-[620px] flex-col overflow-hidden rounded-[8px] border border-white/10 lg:flex-row">
          <div
            ref={withoutRef}
            className="flex basis-1/2 flex-col justify-between bg-red-950/30 p-[clamp(1rem,4vw,3rem)]"
          >
            <div>
              <p className="font-mono text-xs uppercase text-red-300">Without Website</p>
              <h3 className="mt-5 font-display text-[clamp(2rem,4vw,4.8rem)] font-semibold leading-none">
                Invisible value. Lost intent.
              </h3>
            </div>
            <ul className="mt-10 space-y-5">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <XCircle className="size-5 shrink-0 text-red-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={withRef}
            className="flex basis-1/2 flex-col justify-between bg-accent/25 p-[clamp(1rem,4vw,3rem)]"
          >
            <div>
              <p className="font-mono text-xs uppercase text-blue-200">With Webaura</p>
              <h3 className="mt-5 font-display text-[clamp(2rem,4vw,4.8rem)] font-semibold leading-none">
                Clear path. Stronger trust.
              </h3>
            </div>
            <ul className="mt-10 space-y-5">
              {withItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="size-5 shrink-0 text-blue-200" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

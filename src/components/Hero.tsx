import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
  onOpenDrawer: () => void
}

export default function Hero({ onOpenDrawer }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const sphereRef = useRef<HTMLImageElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sphere = sphereRef.current
    if (!section || !sphere) return

    const context = gsap.context(() => {
      gsap.to(wordRef.current, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(foregroundRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('.hero-reveal', {
        y: 36,
        opacity: 0,
        duration: 1.15,
        ease: 'expo.out',
        stagger: 0.16,
        delay: 0.25,
      })
    }, section)

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      gsap.to(sphere, {
        rotateY: x * 14,
        rotateX: y * -12,
        x: x * 26,
        y: y * 18,
        duration: 0.65,
        ease: 'power3.out',
        transformPerspective: 900,
      })
    }

    const onLeave = () => {
      gsap.to(sphere, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      })
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)

    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      context.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[720px] overflow-hidden px-container" id="top">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(45,91,255,0.24),transparent_30%),linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_92%)]" />

      <div
        ref={wordRef}
        className="text-stroke pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 select-none font-display text-[clamp(6rem,23vw,22rem)] font-semibold leading-none opacity-70"
      >
        WEBAURA
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <img
          ref={sphereRef}
          src="/assets/hero-glass-growth-BGRemove.png"
          alt="Glass sphere growth visual"
          className="mt-16 h-[min(62vw,620px)] min-h-[310px] w-[min(62vw,620px)] min-w-[310px] object-contain drop-shadow-[0_40px_90px_rgba(45,91,255,0.35)] will-change-transform"
          loading="eager"
          decoding="async"
        />
      </div>

      <div
        ref={foregroundRef}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-[clamp(3rem,8vw,6rem)]"
      >
        <div className="max-w-[980px]">
          <p className="hero-reveal mb-5 font-mono text-xs uppercase text-accent">
            Local search. WhatsApp leads. Premium websites.
          </p>
          <h1 className="hero-reveal font-display text-[clamp(3.4rem,10vw,9.5rem)] font-semibold leading-[0.9]">
            Grow Your Local Business Online
          </h1>
          <div className="hero-reveal mt-8 flex max-w-[760px] flex-col gap-5 sm:flex-row sm:items-center">
            <p className="text-body-lg leading-8 text-muted">
              Webaura designs conversion-focused websites that turn nearby searches into calls,
              WhatsApp inquiries, bookings, and repeat customers.
            </p>
            <button
              type="button"
              onClick={onOpenDrawer}
              className="btn-premium inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(45,91,255,0.45)]"
            >
              Get Your Website
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

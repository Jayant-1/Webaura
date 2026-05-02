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
    <section
      ref={sectionRef}
      className="relative min-h-[720px] overflow-hidden px-container sm:h-screen sm:min-h-[760px]"
      id="top"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(45,91,255,0.24),transparent_32%),linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_92%)] sm:bg-[radial-gradient(circle_at_50%_38%,rgba(45,91,255,0.24),transparent_30%),linear-gradient(180deg,rgba(5,5,5,0)_0%,#050505_92%)]" />

      <div
        ref={wordRef}
        className="text-stroke pointer-events-none absolute left-1/2 top-[25%] -translate-x-1/2 select-none font-display text-[clamp(5.5rem,34vw,10rem)] font-semibold leading-none opacity-60 sm:top-[20%] sm:text-[clamp(8rem,24vw,22rem)] sm:opacity-70 lg:top-[18%]"
      >
        WEBAURA
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <img
          ref={sphereRef}
          src="/assets/hero-glass-growth-BGRemove.png"
          alt="Glass sphere growth visual"
          className="mt-8 h-[min(82vw,430px)] min-h-[270px] w-[min(82vw,430px)] min-w-[270px] object-contain drop-shadow-[0_40px_90px_rgba(45,91,255,0.35)] will-change-transform sm:mt-16 sm:h-[min(62vw,620px)] sm:min-h-[310px] sm:w-[min(62vw,620px)] sm:min-w-[310px]"
          loading="eager"
          decoding="async"
        />
      </div>

      <div
        ref={foregroundRef}
        className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] flex-col justify-center pb-12 pt-28 text-center sm:h-full sm:min-h-[760px] sm:justify-end sm:pb-[clamp(3rem,8vw,6rem)] sm:pt-0 sm:text-left"
      >
        <div className="mx-auto max-w-[980px] sm:mx-0">
          <p className="hero-reveal mb-4 font-mono text-xs uppercase text-accent sm:mb-5">
            Local search. WhatsApp leads. Premium websites.
          </p>
          <h1 className="hero-reveal font-display text-[clamp(3rem,15vw,5.2rem)] font-semibold leading-[0.92] sm:text-[clamp(3.8rem,10vw,9.5rem)] sm:leading-[0.9]">
            Grow Your Local Business Online
          </h1>
          <div className="hero-reveal mx-auto mt-7 flex max-w-[760px] flex-col items-center gap-5 sm:mx-0 sm:mt-8 sm:flex-row sm:items-center">
            <p className="text-body-lg leading-7 text-muted sm:leading-8">
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

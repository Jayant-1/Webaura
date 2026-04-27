import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, Sparkles, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type NavbarProps = {
  onOpenDrawer: () => void
}

const navLinks = ['Problems', 'Services', 'Pricing', 'Proof', 'Contact']

export default function Navbar({ onOpenDrawer }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const compact = () => {
      gsap.to(nav, {
        height: 64,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    const expanded = () => {
      gsap.to(nav, {
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    const trigger = ScrollTrigger.create({
      start: 50,
      end: 99999,
      onEnter: compact,
      onLeaveBack: expanded,
    })

    return () => trigger.kill()
  }, [])

  return (
    <header
      ref={navRef}
      className="fixed left-0 top-0 z-50 flex h-[100px] w-full items-center border-b border-transparent px-container"
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="Webaura home">
          <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <Sparkles className="size-4 text-accent" />
          </span>
          <span className="font-display text-xl font-semibold">Webaura</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-white">
              {link}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="btn-premium rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_0_32px_rgba(45,91,255,0.22)] transition hover:border-accent hover:text-accent"
          >
            Get Free Consultation
          </button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="absolute left-container right-container top-[76px] rounded-[8px] border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="rounded-[6px] px-3 py-3 text-sm text-muted hover:bg-white/[0.06] hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                onOpenDrawer()
              }}
              className="btn-premium mt-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

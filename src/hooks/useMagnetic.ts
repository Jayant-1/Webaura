import { useEffect } from 'react'
import gsap from 'gsap'

export function useMagnetic() {
  useEffect(() => {
    const cleanups = new Map<HTMLElement, () => void>()

    const attach = (button: HTMLElement) => {
      if (cleanups.has(button)) return

      const xTo = gsap.quickTo(button, 'x', {
        duration: 0.45,
        ease: 'power3.out',
      })
      const yTo = gsap.quickTo(button, 'y', {
        duration: 0.45,
        ease: 'power3.out',
      })

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        xTo(x * 0.24)
        yTo(y * 0.32)
      }

      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      button.addEventListener('mousemove', onMove)
      button.addEventListener('mouseleave', onLeave)

      cleanups.set(button, () => {
        button.removeEventListener('mousemove', onMove)
        button.removeEventListener('mouseleave', onLeave)
        gsap.set(button, { x: 0, y: 0 })
      })
    }

    const syncButtons = () => {
      document
        .querySelectorAll<HTMLElement>('.btn-premium')
        .forEach((button) => attach(button))
    }

    syncButtons()

    const observer = new MutationObserver(syncButtons)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      cleanups.forEach((cleanup) => cleanup())
      cleanups.clear()
    }
  }, [])
}

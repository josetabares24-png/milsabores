'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// Fade-in suave ao entrar no ecrã. O que já está visível ao carregar não se esconde
// (sem flash nem layout shift) e sem JavaScript tudo aparece normalmente.
// O estado vive num data-attribute (sem re-render do React).
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    el.dataset.reveal = 'hidden'
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.dataset.reveal = 'shown'
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out data-[reveal=hidden]:translate-y-4 data-[reveal=hidden]:opacity-0`}
    >
      {children}
    </div>
  )
}

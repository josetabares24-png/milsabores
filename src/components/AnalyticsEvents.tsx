'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

/**
 * Regista cliques em links de reserva, telefone e direções (Vercel Web Analytics).
 * Um único listener delegado: não exige alterar cada botão e não usa cookies.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute('href') || ''
      const from = window.location.pathname

      if (href.startsWith('tel:')) {
        track('call_click', { from })
      } else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps/.test(href)) {
        track('directions_click', { from })
      } else if (/^(\/[a-z]{2})?\/reservas$/.test(new URL(link.href, window.location.href).pathname)) {
        track('reserve_click', { from, target: href })
      }
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}

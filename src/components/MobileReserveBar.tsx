'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'

// Barra fina de reserva só em móvel (botões de 44px). Esconde-se quando o rodapé entra no ecrã. Aparece quando o botão principal da página
// ([data-primary-cta]) já saiu do ecrã ou, se não houver, depois de 400px de scroll.
// Não aparece em /reservas nem enquanto a faixa de cookies está aberta (globals.css).
export default function MobileReserveBar() {
  const t = useTranslations('fab')
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const hidden = pathname.startsWith('/reservas')

  useEffect(() => {
    if (hidden) return
    let pastCta = false
    let footerInView = false
    const update = () => setVisible(pastCta && !footerInView)
    const observers: IntersectionObserver[] = []
    let onScroll: (() => void) | null = null

    const cta = document.querySelector('[data-primary-cta]')
    if (cta) {
      const io = new IntersectionObserver(([e]) => {
        pastCta = !e.isIntersecting && e.boundingClientRect.top < 0
        update()
      })
      io.observe(cta)
      observers.push(io)
    } else {
      onScroll = () => {
        pastCta = window.scrollY > 400
        update()
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    // Esconde a barra quando o rodapé (que já tem o contacto) entra no ecrã.
    const footer = document.getElementById('site-footer')
    if (footer) {
      const fo = new IntersectionObserver(([e]) => {
        footerInView = e.isIntersecting
        update()
      })
      fo.observe(footer)
      observers.push(fo)
    }

    return () => {
      observers.forEach((o) => o.disconnect())
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [hidden, pathname])

  if (hidden) return null

  return (
    <div
      id="mobile-reserve-bar"
      data-visible={visible ? 'true' : 'false'}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate/10 bg-cream/95 px-3 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="flex gap-2">
        <Link
          href="/reservas"
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-pastel text-[15px] font-bold text-gray-900"
        >
          {t('reserve')}
        </Link>
        <a
          href="tel:+351213470214"
          className="flex h-11 items-center justify-center rounded-full border border-slate/20 bg-white px-4 text-[15px] font-semibold text-gray-900"
        >
          {t('call')}
        </a>
      </div>
    </div>
  )
}

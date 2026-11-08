'use client'

import { useTranslations } from 'next-intl'
import { RESTAURANT } from '@/config/restaurant'
import { Link } from '@/i18n/routing'

// Rodapé compacto: sem logo repetido, páginas em linha, contacto e horário num só bloco.
export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const pages = [
    { href: '/menu', label: tNav('menu') },
    { href: '/menu#gelados', label: tNav('gelados') },
    { href: '/galeria', label: tNav('gallery') },
    { href: '/#about', label: tNav('about') },
    { href: '/reservas', label: tNav('reservations') },
    { href: '/brunch-lisboa', label: t('brunch_link') },
  ] as const

  const linkCls = 'text-slate transition-colors hover:text-pastel-ink'

  return (
    <footer id="site-footer" className="border-t border-slate/10 bg-pastel-light/60">
      <div className="mx-auto max-w-6xl px-5 pb-5 pt-7 md:px-6 md:pt-9">
        <div className="grid gap-5 text-sm md:grid-cols-[1.1fr_1fr_1fr] md:gap-10">
          <div>
            <p className="font-script text-2xl text-pastel-ink">Mil Sabores</p>
            <p className="mt-1 leading-snug text-slate">{t('description')}</p>
            <p className="mt-2">
              <a href={RESTAURANT.social.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-pastel-ink">Instagram</a>
              <span className="text-slate"> · </span>
              <a href={RESTAURANT.social.facebook.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-pastel-ink">Facebook</a>
            </p>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">{t('links_title')}</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {pages.map((p) => (
                <li key={p.href} className={p.href === '/brunch-lisboa' ? 'col-span-2' : undefined}>
                  <Link href={p.href} className={linkCls}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-900">{t('contact_title')}</h2>
            <address className="not-italic leading-relaxed text-slate">
              Rua da Prata 152, 1100-619 Lisboa<br />
              {t('hours_weekday')}<br />
              <a href="tel:+351213470214" className="font-semibold text-gray-900 hover:text-pastel-ink">+351 21 347 0214</a>
              <span> · </span>
              <a href="mailto:milsaboreslx@gmail.com" className={`${linkCls} break-all`}>milsaboreslx@gmail.com</a>
            </address>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-1.5 border-t border-slate/10 pt-3 text-xs text-slate md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Mil Sabores Lisboa</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/privacidad" className={linkCls}>{t('legal_privacy')}</Link>
            <Link href="/cookies" className={linkCls}>{t('legal_cookies')}</Link>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className={linkCls}>{t('legal_reclamaciones')}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

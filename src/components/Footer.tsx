'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Instagram, Facebook } from 'lucide-react'
import { RESTAURANT } from '@/config/restaurant'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="border-t-2 border-gray-800 bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Logo size="lg" />
              <Image
                src="/images/Mil Sabores/sellobrunchgelados.png"
                alt="Brunch & Gelados"
                width={80}
                height={77}
                className="h-20 w-auto -rotate-6"
              />
            </div>
            <p className="text-slate text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/milsaboreslx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-800 text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href={RESTAURANT.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-800 text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="eyebrow mb-5">{t('links_title')}</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/brunch-lisboa" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {t('brunch_link')}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('menu')}
                </Link>
              </li>
              <li>
                <Link href="/menu#gelados" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('gelados')}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('reservations')}
                </Link>
              </li>
              <li>
                <Link href="/reservas#contacto" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="eyebrow mb-5">{t('contact_title')}</h2>
            <ul className="space-y-4">
              <li>
                <span className="text-slate text-sm">
                  Rua da Prata 152<br />
                  1100-619 Lisboa
                </span>
              </li>
              <li>
                <a href="tel:+351213470214" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium">
                  +351 21 347 0214
                </a>
              </li>
              <li>
                <a href="mailto:milsaboreslx@gmail.com" className="text-slate hover:text-pastel-ink transition-colors text-sm font-medium break-all">
                  milsaboreslx@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="eyebrow mb-5">{t('hours_title')}</h2>
            <ul className="space-y-3">
              <li className="text-slate text-sm">
                <span className="font-semibold text-slate block mb-1">{t('hours_weekday')}</span>
              </li>
              <li className="text-slate text-sm">
                <span className="font-semibold text-slate block mb-1">{t('hours_weekend')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dashed border-slate/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate text-sm">
              © {new Date().getFullYear()} Mil Sabores Lisboa. {t('rights')}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link href="/privacidad" className="text-slate hover:text-pastel-ink transition-colors text-sm">
                {t('legal_privacy')}
              </Link>
              <Link href="/cookies" className="text-slate hover:text-pastel-ink transition-colors text-sm">
                {t('legal_cookies')}
              </Link>
              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate hover:text-pastel-ink transition-colors text-sm"
              >
                {t('legal_reclamaciones')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

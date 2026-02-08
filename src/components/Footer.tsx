'use client'

import { useTranslations } from 'next-intl'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-slate/5 border-t border-slate/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo size="md" />
            </div>
            <p className="text-slate/60 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/milsaboreslx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-pastel/20 border-2 border-slate/10 hover:border-pastel rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-slate hover:text-pastel" />
              </a>
              <a
                href="https://www.facebook.com/MilSaboreslx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-pastel/20 border-2 border-slate/10 hover:border-pastel rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-slate hover:text-pastel" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate font-bold text-lg mb-6">{t('links_title')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/menu" className="text-slate/60 hover:text-pastel transition-colors text-sm font-medium">
                  {tNav('menu')}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate/60 hover:text-pastel transition-colors text-sm font-medium">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-slate/60 hover:text-pastel transition-colors text-sm font-medium">
                  {tNav('gallery')}
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="text-slate/60 hover:text-pastel transition-colors text-sm font-medium">
                  {tNav('reservations')}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-slate/60 hover:text-pastel transition-colors text-sm font-medium">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate font-bold text-lg mb-6">{t('contact_title')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-sage mt-0.5 flex-shrink-0" />
                <span className="text-slate/60 text-sm">
                  Rua da Prata 152<br />
                  1100-619 Lisboa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-steel flex-shrink-0" />
                <a href="tel:+351213470214" className="text-slate/60 hover:text-steel transition-colors text-sm font-medium">
                  +351 21 347 0214
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-rose-600 flex-shrink-0" />
                <a href="mailto:milsaboreslx@gmail.com" className="text-slate/60 hover:text-rose-600 transition-colors text-sm font-medium">
                  milsaboreslx@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-slate font-bold text-lg mb-6">{t('hours_title')}</h4>
            <ul className="space-y-3">
              <li className="text-slate/60 text-sm">
                <span className="font-semibold text-slate block mb-1">{t('hours_weekday')}</span>
              </li>
              <li className="text-slate/60 text-sm">
                <span className="font-semibold text-slate block mb-1">{t('hours_weekend')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate/60 text-sm">
              © {new Date().getFullYear()} Mil Sabores Lisboa. {t('rights')}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link href="/privacidad" className="text-slate/60 hover:text-pastel transition-colors text-sm">
                {t('legal_privacy')}
              </Link>
              <Link href="/cookies" className="text-slate/60 hover:text-pastel transition-colors text-sm">
                {t('legal_cookies')}
              </Link>
              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate/60 hover:text-pastel transition-colors text-sm"
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

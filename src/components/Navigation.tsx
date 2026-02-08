'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo size="lg" className="transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/menu" className="text-slate hover:text-pastel transition-colors font-medium">
              {t('menu')}
            </Link>
            <Link href="/gelados" className="text-slate hover:text-pastel transition-colors font-medium">
              {t('gelados')}
            </Link>
            <Link href="/promociones" className="relative text-slate hover:text-pastel transition-colors font-medium">
              {t('promotions')}
              <span className="absolute -top-2 -right-3 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                %
              </span>
            </Link>
            <Link href="/galeria" className="text-slate hover:text-pastel transition-colors font-medium">
              {t('gallery')}
            </Link>
            <Link href="/contacto" className="text-slate hover:text-pastel transition-colors font-medium">
              {t('contact')}
            </Link>
            <Link
              href="/reservas"
              className="px-6 py-2.5 bg-gradient-to-r from-pastel to-amber-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-pastel/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              {t('reservations')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate p-2 hover:bg-pastel/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-pastel/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/menu"
                className="text-slate hover:text-pastel transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('menu')}
              </Link>
              <Link
                href="/gelados"
                className="text-slate hover:text-pastel transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('gelados')}
              </Link>
              <Link
                href="/promociones"
                className="text-slate hover:text-pastel transition-colors font-medium py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('promotions')}
                <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                  %
                </span>
              </Link>
              <Link
                href="/galeria"
                className="text-slate hover:text-pastel transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('gallery')}
              </Link>
              <Link
                href="/contacto"
                className="text-slate hover:text-pastel transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link
                href="/reservas"
                className="mt-2 px-6 py-3 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('reservations')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

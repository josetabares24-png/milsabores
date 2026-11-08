'use client'

import { useTranslations } from 'next-intl'
import { Clock, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

// Propuesta visual (preview): paleta de brand/BRAND-MEMORY.md (azul pastel principal,
// fondo crema, mango solo como acento), titular grande en Quicksand y foto real.
export default function Hero() {
  const t = useTranslations('hero')
  const tIntent = useTranslations('intentPages')
  return (
    <section className="relative w-full min-h-[100svh] bg-cream text-gray-900 overflow-hidden pt-20 lg:grid lg:grid-cols-2">
      {/* Foto: fondo completo en móvil, columna derecha en escritorio */}
      <div className="relative h-[34svh] lg:order-2 lg:h-auto lg:min-h-[100svh]">
        <Image
          src="/images/Mil Sabores/Tosta de Agucate.webp"
          alt={tIntent('breakfast.imageAlt')}
          fill
          priority
          className="object-cover object-[50%_63%] lg:object-[50%_88%]"
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent lg:bg-gradient-to-r lg:from-cream lg:via-transparent lg:to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-start px-6 pb-12 pt-2 lg:min-h-[calc(100svh-5rem)] lg:order-1 lg:justify-center lg:px-16 lg:py-16 xl:pl-24">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="font-script text-3xl text-pastel-ink md:text-4xl">{t('tagline')}</span>
          <span className="rounded-full bg-mango px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">{t('badge')}</span>
        </div>
        <h1 className="max-w-2xl text-[2.9rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
          {t('title_short')}
        </h1>
        <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate md:text-2xl">
          {t('subtitle_short')}
        </p>

        <div data-primary-cta className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/reservas"
            className="inline-flex items-center justify-center rounded-full bg-pastel px-10 py-5 text-lg font-bold text-gray-900 transition hover:bg-pastel-dark"
          >
            {t('cta_reserve')}
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-2 py-3 text-lg font-bold text-gray-900 underline decoration-pastel-dark decoration-2 underline-offset-8 hover:text-pastel-ink"
          >
            {t('cta_menu')}
          </Link>
        </div>

        <ul className="mt-8 flex flex-col gap-3 text-base font-medium text-gray-800 lg:border-t lg:border-slate/15 lg:pt-6 sm:flex-row sm:flex-wrap sm:gap-6">
          <li className="flex items-center gap-2"><Clock className="text-pastel-ink" size={18} />{t('hours_label')}</li>
          <li className="flex items-center gap-2"><MapPin className="text-pastel-ink" size={18} />{t('location_label')}</li>
          <li className="flex items-center gap-2">
            <Phone className="text-pastel-ink" size={18} />
            <a href="tel:+351213470214" className="hover:text-pastel-ink">{t('phone_label')}</a>
          </li>
        </ul>
      </div>

    </section>
  )
}

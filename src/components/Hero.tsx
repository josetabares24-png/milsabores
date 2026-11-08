'use client'

import { useTranslations } from 'next-intl'
import { Clock, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative w-full min-h-[100svh] flex items-end overflow-hidden bg-slate-900">
      {/* Foto real a toda a largura: vertical no telemóvel, horizontal no ecrã grande */}
      <Image
        src="/images/Mil Sabores/Brunch Americano.webp"
        alt={t('image_alt')}
        fill
        priority
        sizes="100vw"
        quality={78}
        className="object-cover object-center md:hidden"
      />
      <Image
        src="/images/Mil Sabores/Tosta salmon 3.webp"
        alt={t('image_alt')}
        fill
        priority
        sizes="100vw"
        quality={78}
        className="hidden md:block object-cover object-center"
      />
      {/* Sombra só em baixo, para o texto se ler sem tapar a comida */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 md:bg-gradient-to-r md:from-black/85 md:via-black/55 md:to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12 pt-40 md:pb-20">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-mango">
            {t('tagline')} · {t('city')}
          </p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.02] md:text-7xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/reservas"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-mango px-8 text-lg font-bold text-gray-900 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('cta_reserve')}
            </Link>
            <Link
              href="/menu"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-white/80 px-8 text-lg font-bold text-white transition-colors duration-200 hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('cta_menu')}
            </Link>
          </div>

          <ul className="mt-8 flex flex-col gap-2 text-base text-white/90 md:flex-row md:flex-wrap md:gap-x-6">
            <li className="flex items-center gap-2"><Clock size={18} className="text-mango" />{t('hours_label')}</li>
            <li className="flex items-center gap-2"><MapPin size={18} className="text-mango" />{t('location_label')}</li>
            <li className="flex items-center gap-2"><Phone size={18} className="text-mango" />{t('phone_label')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

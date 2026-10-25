import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Home, Menu as MenuIcon, Phone } from 'lucide-react'
import { RESTAURANT } from '@/config/restaurant'

export default function NotFound() {
  const t = useTranslations('common.404')

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-6 pb-20 pt-36">
      {/* React 19 eleva <title>/<meta> para o <head> */}
      <title>{`${t('title')} | Mil Sabores Lisboa`}</title>
      <meta name="robots" content="noindex" />
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-pastel-ink">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-slate">{t('message')}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-pastel px-7 py-3 font-semibold text-gray-800 transition-colors hover:bg-pastel-dark"
          >
            <Home size={18} aria-hidden="true" />
            {t('home')}
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border-2 border-pastel bg-white px-7 py-3 font-semibold text-pastel-ink transition-colors hover:bg-pastel/10"
          >
            <MenuIcon size={18} aria-hidden="true" />
            {t('menu')}
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate">
          <a href={`tel:${RESTAURANT.phoneClean}`} className="inline-flex items-center gap-1.5 font-semibold text-pastel-ink hover:underline">
            <Phone size={14} aria-hidden="true" />
            {RESTAURANT.phone}
          </a>
          {' · '}
          {RESTAURANT.address.full}
        </p>
      </div>
    </div>
  )
}

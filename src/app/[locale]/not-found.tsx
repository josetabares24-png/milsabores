import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Scribble from '@/components/brand/Scribble'
import { RESTAURANT } from '@/config/restaurant'

export default function NotFound() {
  const t = useTranslations('common.404')

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-6 pb-20 pt-36">
      {/* React 19 eleva <title>/<meta> para o <head> */}
      <title>{`${t('title')} | Mil Sabores Lisboa`}</title>
      <meta name="robots" content="noindex" />
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">{t('title')}</h1>
        <Scribble className="mx-auto mt-2 h-3 w-28 text-mango" />
        <p className="mt-4 text-lg text-slate">{t('message')}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-primary"
          >
            {t('home')}
          </Link>
          <Link
            href="/menu"
            className="btn-secondary"
          >
            {t('menu')}
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate">
          <a href={`tel:${RESTAURANT.phoneClean}`} className="link-ink">
            {RESTAURANT.phone}
          </a>
          {' · '}
          {RESTAURANT.address.full}
        </p>
      </div>
    </div>
  )
}

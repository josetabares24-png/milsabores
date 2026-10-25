import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import MenuLine from './brand/MenuLine'

/**
 * Prato em destaque como uma entrada de carta (nome · · · preço), em papel com margem tracejada.
 * A foto do prato já está no hero, logo aqui não se repete.
 */
export default function FeaturedDish() {
  const t = useTranslations('featuredDish')

  return (
    <section className="bg-cream px-6 pb-20" aria-labelledby="featured-dish-title">
      <div className="mx-auto max-w-3xl border-2 border-dashed border-slate/25 bg-white px-6 py-8 md:px-12 md:py-10">
        <p className="eyebrow">{t('badge')}</p>
        <MenuLine
          as="h2"
          className="mt-3 text-2xl md:text-3xl"
          name={<span id="featured-dish-title">{t('title')}</span>}
          price={
            <span className="flex items-baseline gap-1.5">
              <span className="text-sm font-medium text-slate">{t('from')}</span>
              {t('price')}
            </span>
          }
        />
        <p className="mt-3 leading-relaxed text-slate">{t('description')}</p>
        <Link href="/menu" className="link-ink mt-5 inline-block">
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}

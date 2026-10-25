import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { RESTAURANT } from '@/config/restaurant'
import Scribble from './brand/Scribble'
import PhotoPrint from './brand/PhotoPrint'
import Logo from './Logo'

/**
 * Hero em papel creme: título a tinta com sublinhado à mão, foto real como prova impressa
 * sobre as formas recortadas da marca e o selo "colado" no canto. Sem véus, vidro nem animações
 * (o H1 é o elemento LCP e pinta de imediato).
 */
export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <p className="eyebrow">
            {t('tagline')} · {t('city')}
          </p>
          <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.08] text-gray-800 sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <Scribble className="mt-3 h-4 w-40 text-mango" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate md:text-xl">{t('subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="btn-primary text-lg">
              {t('cta_menu')}
            </Link>
            <Link href="/reservas" className="btn-secondary text-lg">
              {t('cta_reserve')}
            </Link>
          </div>

          <ul className="rule-dashed mt-10 grid gap-2 pt-5 text-sm text-slate sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-4">
            <li>{t('hours_label')}</li>
            <li>{t('location_label')}</li>
            <li>
              <a href={`tel:${RESTAURANT.phoneClean}`} className="inline-block py-0.5 hover:text-pastel-ink">
                {t('phone_label')}
              </a>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm md:max-w-none">
          <PhotoPrint
            src="/images/Mil Sabores/Brunch Americano.webp"
            alt={t('image_alt')}
            ratio="portrait"
            shapes="a"
            priority
            sizes="(max-width: 768px) 80vw, 40vw"
            className="rotate-[1.5deg]"
          />
          <div className="absolute -bottom-6 -left-6 rotate-[-10deg] rounded-full bg-white p-1.5 shadow-[0_1px_0_rgba(0,0,0,0.06)] md:-left-10">
            <Logo size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

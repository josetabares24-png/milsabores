import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { GELATO_SIZES } from '@/lib/menu'
import Reveal from '@/components/Reveal'

const FLAVORS = ['acai', 'mango', 'pistacho', 'fresa', 'oreo', 'vainilla', 'chocolate', 'pastel_de_nata'] as const

// Secção de gelados com acento peach/mango; tudo vem das mensagens já existentes (preços e sabores do menu).
export default function GelatoBand() {
  const t = useTranslations('gelados')
  const tIntent = useTranslations('intentPages')

  return (
    <section className="relative overflow-hidden bg-peach/60 px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <p className="font-script text-3xl text-[#B5651D]">{t('eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">{tIntent('gelato.title')}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-800">{tIntent('gelato.intro')}</p>

          <ul className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {GELATO_SIZES.map((size) => (
              <li key={size} className="rounded-2xl bg-white/80 px-3 py-4 text-center">
                <p className="text-sm font-semibold text-gray-700">{t(`sizes.${size}.name`)}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{t(`sizes.${size}.price`)}</p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-gray-800">
            <span className="font-bold">{t('flavors.title')}:</span>{' '}
            {FLAVORS.map((f) => t(`flavors.items.${f}.name`)).join(' · ')}
          </p>
          <p className="mt-1 text-xs text-gray-700">{t('flavors.note')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/gelados-lisboa" className="rounded-full bg-mango px-7 py-3 font-bold text-gray-900 transition-colors hover:bg-[#d9a404]">
              {t('cta.page')}
            </Link>
            <Link href="/menu#gelados" className="rounded-full border border-gray-900/20 bg-white px-7 py-3 font-bold text-gray-900 transition-colors hover:border-gray-900/50">
              {t('cta.view_menu')}
            </Link>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="grid grid-cols-5 gap-3">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src="/images/Mil Sabores/Copos Helado.webp" alt={tIntent('gelato.imageAlt')} fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-3 pt-10">
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/Mil Sabores/Copos Helado 2.webp" alt={tIntent('gelato.imageAlt')} fill sizes="(max-width: 1024px) 40vw, 20vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src="/images/Mil Sabores/Paleta.webp" alt={t('title')} fill sizes="(max-width: 1024px) 40vw, 20vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

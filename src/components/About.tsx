import { useTranslations } from 'next-intl'
import SectionHeading from './brand/SectionHeading'
import PhotoPrint from './brand/PhotoPrint'

/** Sobre nós em layout editorial: texto e foto real da esplanada, factos em colunas com régua. */
export default function About() {
  const t = useTranslations('about')
  const facts = [1, 2, 3] as const

  return (
    <section id="about" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 md:grid-cols-[1fr_0.9fr] md:gap-20">
          <div>
            <SectionHeading align="left" eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
              <p>
                {t('para1')} <strong className="font-semibold text-gray-800">{t('para1_bold1')}</strong> {t('para1_mid')}{' '}
                <strong className="font-semibold text-gray-800">{t('para1_bold2')}</strong>.
              </p>
              <p>
                {t('para2')} <strong className="font-semibold text-gray-800">{t('para2_bold')}</strong>, {t('para2_mid')}
              </p>
              <p>{t('para3')}</p>
            </div>
          </div>

          <PhotoPrint
            src="/images/Mil Sabores/IMG_3818.webp"
            alt={t('image_alt')}
            ratio="portrait"
            shapes="b"
            sizes="(max-width: 768px) 90vw, 40vw"
            className="mx-auto w-full max-w-sm -rotate-1 md:max-w-none"
            imgClassName="object-cover object-[35%_50%]"
          />
        </div>

        <dl className="mt-20 grid gap-8 border-t-2 border-gray-800 pt-8 md:grid-cols-3 md:gap-12">
          {facts.map((n) => (
            <div key={n}>
              <dt className="text-lg font-bold text-gray-800">{t(`feature${n}_title`)}</dt>
              <dd className="mt-2 leading-relaxed text-slate">{t(`feature${n}_desc`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

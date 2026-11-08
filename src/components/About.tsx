import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

export default function About() {
  const t = useTranslations('about')
  const tGallery = useTranslations('gallery')

  return (
    <section id="about" className="px-6 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate">
            <p>
              {t('para1')}{' '}
              <span className="font-semibold text-gray-900">{t('para1_bold1')}</span> {t('para1_mid')}{' '}
              <span className="font-semibold text-gray-900">{t('para1_bold2')}</span>.
            </p>
            <p>
              {t('para2')}{' '}
              <span className="font-semibold text-gray-900">{t('para2_bold')}</span>, {t('para2_mid')}
            </p>
            <p>{t('para3')}</p>
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-5 gap-3">
          <div className="relative col-span-3 h-[300px] md:h-[460px] overflow-hidden rounded-3xl">
            <Image src="/images/Mil Sabores/IMG_3818.webp" alt={t('image_alt')} fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
          </div>
          <div className="relative col-span-2 mt-12 h-[240px] md:h-[380px] overflow-hidden rounded-3xl">
            <Image src="/images/Mil Sabores/Cliente 5.webp" alt={tGallery('alts.24')} fill sizes="(max-width: 1024px) 40vw, 20vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

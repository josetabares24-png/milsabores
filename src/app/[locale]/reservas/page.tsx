'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import ResmioWidget, { RESMIO_BOOKING_URL } from '@/components/ResmioWidget'
import { isValidEmail } from '@/lib/validation'
import { RESTAURANT } from '@/config/restaurant'

export default function ReservationsPage() {
  const t = useTranslations('reservations')
  const tContact = useTranslations('contact')
  const tAbout = useTranslations('about')
  const tGallery = useTranslations('gallery')
  const locale = useLocale()

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [isContactSubmitted, setIsContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')


  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value })
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const website = String(new FormData(e.currentTarget).get('website') || '')
    setContactError('')

    if (!isValidEmail(contactData.email)) {
      setContactError(tContact('form.invalid_email'))
      return
    }

    setIsContactSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactData,
          subject: 'other',
          locale,
          website,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsContactSubmitted(true)
      setContactData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Error submitting contact message:', err)
      setContactError(err instanceof Error ? err.message : 'Failed to send message. Please try emailing us directly.')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const infoRows: { label: string; value: React.ReactNode }[] = [
    { label: tContact('info.address.title'), value: (
      <>
        {tContact('info.address.line1')}, {tContact('info.address.line2')}
        <br />
        <a href={RESTAURANT.social.google.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-pastel-ink underline underline-offset-2">
          {tContact('info.maps_cta')}
        </a>
      </>
    ) },
    { label: tContact('info.hours.title'), value: tContact('info.hours.weekday') },
    { label: t('form.phone'), value: (
      <a href={`tel:${RESTAURANT.phoneClean}`} className="hover:text-pastel-ink hover:underline">{RESTAURANT.phone}</a>
    ) },
    { label: tContact('form.email'), value: (
      <a href={`mailto:${RESTAURANT.email}`} className="hover:text-pastel-ink hover:underline">{RESTAURANT.email}</a>
    ) },
    { label: tContact('info.social.title'), value: (
      <>
        <a href={RESTAURANT.social.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-pastel-ink hover:underline">{RESTAURANT.social.instagram.handle}</a>
        {' · '}
        <a href={RESTAURANT.social.tripadvisor.url} target="_blank" rel="noopener noreferrer" className="hover:text-pastel-ink hover:underline">{tContact('info.social.tripadvisor')}</a>
      </>
    ) },
  ]

  return (
    <div className="min-h-screen bg-cream pt-28 md:pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-script text-3xl text-pastel-ink">Mil Sabores</p>
            <h1 className="mt-1 text-4xl md:text-6xl font-bold tracking-tight text-gray-900">{t('title')}</h1>
            <p className="mt-4 text-lg md:text-xl text-slate">{t('subtitle')}</p>
            <p className="mt-5 inline-flex flex-wrap gap-x-4 gap-y-1 rounded-2xl bg-white px-4 py-3 text-sm text-gray-800">
              <span>{tContact('info.hours.weekday')}</span>
              <span>{tContact('info.address.line1')}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-40 overflow-hidden rounded-3xl md:h-64">
              <Image src="/images/Mil Sabores/IMG_3818.webp" alt={tAbout('image_alt')} fill priority sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
            </div>
            <div className="relative mt-8 h-40 overflow-hidden rounded-3xl md:h-64">
              <Image src="/images/Mil Sabores/Brunch Americano.webp" alt={tGallery('alts.1')} fill priority sizes="(max-width: 1024px) 50vw, 22vw" className="object-cover" />
            </div>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-2xl bg-white p-4 sm:p-8 border border-slate/15" aria-labelledby="reserva-online-title">
            <h2 id="reserva-online-title" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              {t('widget.title')}
            </h2>
            <p className="text-gray-700 mb-6">{t('widget.note')}</p>
            <ResmioWidget iframeTitle={t('widget.iframe_title')} />
            <p className="mt-6 border-t border-slate/15 pt-4 text-sm text-gray-700 leading-relaxed">
              {t.rich('widget.fallback', {
                link: (chunks) => (
                  <a href={RESMIO_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-pastel-ink underline underline-offset-2 hover:text-gray-800">
                    {chunks}
                  </a>
                ),
                phone: (chunks) => (
                  <a href={`tel:${RESTAURANT.phoneClean}`} className="font-bold text-pastel-ink underline underline-offset-2 hover:text-gray-800">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </section>

          <aside className="space-y-8 text-sm">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{t('quick_actions.title')}</h2>
              <p className="mt-1 text-slate">{t('quick_actions.subtitle')}</p>
              <a href={`tel:${RESTAURANT.phoneClean}`} className="mt-4 inline-flex rounded-full bg-pastel px-6 py-3 font-bold text-gray-900 hover:bg-pastel-dark transition-colors">
                {t('quick_actions.call')}
              </a>
            </div>
            <div className="border-t border-slate/15 pt-6">
              <h2 className="text-lg font-bold text-gray-900">{t('info.title')}</h2>
              <h3 className="mt-3 font-bold text-gray-900">{t('info.punctuality.title')}</h3>
              <p className="mt-1 text-slate leading-relaxed">{t('info.punctuality.text')}</p>
              <h3 className="mt-3 font-bold text-gray-900">{t('info.seating.title')}</h3>
              <p className="mt-1 text-slate leading-relaxed">{t('info.seating.text')}</p>
            </div>
            <div className="border-t border-slate/15 pt-6">
              <h2 className="text-lg font-bold text-gray-900">{t('policy.title')}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate marker:text-pastel-dark">
                {[1, 2, 3, 4].map((num) => (
                  <li key={num}>{t(`policy.items.${num}`)}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section id="contacto" className="scroll-mt-32 mt-16 border-t border-slate/15 pt-12" aria-labelledby="contacto-title">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 id="contacto-title" className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {tContact('title')}
              </h2>
              <p className="mt-3 text-slate leading-relaxed">{tContact('subtitle')}</p>
              <dl className="mt-6 divide-y divide-slate/15 border-y border-slate/15">
                {infoRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm">
                    <dt className="font-bold text-gray-900">{row.label}</dt>
                    <dd className="text-slate">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate/15">
              {isContactSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto mb-4 text-sage" size={44} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{tContact('success.title')}</h3>
                  <p className="text-slate">{tContact('success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="relative space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-900 font-bold mb-1.5 text-sm">
                      {tContact('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      required
                      placeholder={tContact('form.name_placeholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate/25 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-gray-900 font-bold mb-1.5 text-sm">
                      {tContact('form.email')} *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      required
                      placeholder={tContact('form.email_placeholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate/25 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-gray-900 font-bold mb-1.5 text-sm">
                      {tContact('form.message')} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      required
                      rows={5}
                      placeholder={tContact('form.message_placeholder')}
                      className="w-full px-4 py-3 rounded-xl border border-slate/25 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40 resize-none"
                    />
                  </div>
                  {contactError && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                      <p className="text-red-700 text-sm">{contactError}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full px-8 py-3.5 bg-pastel text-gray-900 font-bold rounded-full hover:bg-pastel-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isContactSubmitting ? tContact('form.submitting') : tContact('form.submit')}
                  </button>
                  {/* Campo-armadilha anti-spam: invisível para pessoas e leitores de ecrã */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-t border-slate/15 pt-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t('faq.title')}</h2>
          <dl className="divide-y divide-slate/15 border-y border-slate/15">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="py-4">
                <dt className="font-bold text-gray-900">{t(`faq.items.${num}.q`)}</dt>
                <dd className="mt-1 text-slate leading-relaxed">{t(`faq.items.${num}.a`)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}

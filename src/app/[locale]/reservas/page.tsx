'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { CheckCircle2, AlertCircle, Minus, Plus } from 'lucide-react'
import SectionHeading from '@/components/brand/SectionHeading'
import Scribble from '@/components/brand/Scribble'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import { RESTAURANT } from '@/config/restaurant'
import { track } from '@vercel/analytics'

function generateTimeSlots(open: string, close: string, stepMinutes = 30): string[] {
  const toMinutes = (value: string) => {
    const [h, m] = value.split(':').map(Number)
    return h * 60 + m
  }
  const toTime = (mins: number) => {
    const h = Math.floor(mins / 60).toString().padStart(2, '0')
    const m = (mins % 60).toString().padStart(2, '0')
    return `${h}:${m}`
  }

  const slots: string[] = []
  for (let m = toMinutes(open); m <= toMinutes(close); m += stepMinutes) {
    slots.push(toTime(m))
  }
  return slots
}

function getCloseTimeForDate(date: string) {
  if (!date) return RESTAURANT.hours.weekdayCloseTime
  const day = new Date(`${date}T00:00:00`).getDay()
  return day === 5 || day === 6 || day === 0
    ? RESTAURANT.hours.weekendCloseTime
    : RESTAURANT.hours.weekdayCloseTime
}

export default function ReservationsPage() {
  const t = useTranslations('reservations')
  const tContact = useTranslations('contact')
  const locale = useLocale()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showSpecialRequests, setShowSpecialRequests] = useState(false)
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [isContactSubmitted, setIsContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const guestsCount = parseInt(formData.guests, 10) || 1
  const timeSlots = generateTimeSlots(RESTAURANT.hours.openTime, getCloseTimeForDate(formData.date))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, date, time: '' })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value })
  }

  const updateGuests = (delta: number) => {
    setFormData((prev) => {
      const next = Math.min(20, Math.max(1, (parseInt(prev.guests, 10) || 1) + delta))
      return { ...prev, guests: String(next) }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const website = String(new FormData(e.currentTarget).get('website') || '')
    setError('')

    if (!isValidEmail(formData.email)) {
      setError(t('form.invalid_email'))
      return
    }
    if (!isValidPhone(formData.phone)) {
      setError(t('form.invalid_phone'))
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, locale, website }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo procesar la reserva.')
      }

      track('reservation_submitted', { guests: formData.guests })
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting reservation:', err)
      setError(err instanceof Error ? err.message : 'No se pudo procesar la reserva. Llama al +351 21 347 0214.')
    } finally {
      setIsSubmitting(false)
    }
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-sage-ink" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t('success.title')}
          </h1>
          <p className="text-slate text-xl mb-12">
            {t('success.message')}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setShowSpecialRequests(false)
              setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', specialRequests: '' })
            }}
            className="btn-primary"
          >
            {t('success.back')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 px-6 md:pt-36">
      <div className="max-w-6xl mx-auto">
        <SectionHeading as="h1" eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')} className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative border-2 border-dashed border-slate/25 bg-white p-6 md:p-10">
              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('form.name_placeholder')}
                      className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
                      {t('form.email')} *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('form.email_placeholder')}
                        className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-800 font-bold mb-2">
                      {t('form.phone')} *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t('form.phone_placeholder')}
                        className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-gray-800 font-bold mb-2">
                      {t('form.date')} *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => handleDateChange(today)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                          formData.date === today
                            ? 'bg-gray-800 text-white'
                            : 'border border-gray-800/25 text-gray-800 hover:border-gray-800'
                        }`}
                      >
                        {t('form.today')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDateChange(tomorrow)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                          formData.date === tomorrow
                            ? 'bg-gray-800 text-white'
                            : 'border border-gray-800/25 text-gray-800 hover:border-gray-800'
                        }`}
                      >
                        {t('form.tomorrow')}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={(event) => handleDateChange(event.target.value)}
                        required
                        min={today}
                        className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-gray-800 font-bold mb-2">
                      {t('form.time')} *
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800"
                      >
                        <option value="" disabled>{t('form.time_placeholder')}</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-800 font-bold mb-2">
                      {t('form.guests')} *
                    </label>
                    <div className="flex items-center justify-between gap-4 rounded-md border border-gray-800/30 bg-white px-4 py-2.5">
                      <div className="flex items-center gap-3 text-gray-800">
                                                <span className="font-semibold">
                          {guestsCount} {guestsCount === 1 ? t('form.person') : t('form.people')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateGuests(-1)}
                          disabled={guestsCount <= 1}
                          aria-label="-"
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-800/40 text-gray-800 hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateGuests(1)}
                          disabled={guestsCount >= 20}
                          aria-label="+"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-pastel-ink text-white hover:bg-[#335C78] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="md:col-span-2">
                    {showSpecialRequests ? (
                      <>
                        <label htmlFor="specialRequests" className="block text-gray-800 font-bold mb-2">
                          {t('form.special_requests')}{' '}
                          <span className="text-slate font-normal">({t('form.optional')})</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleChange}
                            rows={3}
                            autoFocus
                            placeholder={t('form.special_requests_placeholder')}
                            className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70 resize-none"
                          />
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSpecialRequests(true)}
                        className="link-ink text-sm"
                      >
                        + {t('form.special_requests')} ({t('form.optional')})
                      </button>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-300 rounded-md">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>

                {/* Campo-armadilha anti-spam: invisível para pessoas e leitores de ecrã */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="reservation-website">Website</label>
                  <input id="reservation-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                </div>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Quick Actions */}
            <div className="border-t-2 border-gray-800 pt-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {t('quick_actions.title')}
              </h2>
              <p className="text-slate mb-6">
                {t('quick_actions.subtitle')}
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+351213470214"
                  className="btn-secondary w-full"
                >
                  {t('quick_actions.call')}
                </a>
              </div>
            </div>

            {/* Good to Know */}
            <div className="border-t-2 border-gray-800 pt-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {t('info.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{t('info.punctuality.title')}</h3>
                  <p className="text-slate text-sm leading-relaxed">{t('info.punctuality.text')}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{t('info.seating.title')}</h3>
                  <p className="text-slate text-sm leading-relaxed">{t('info.seating.text')}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="border-t-2 border-gray-800 pt-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {t('policy.title')}
              </h2>
              <ul className="list-disc space-y-2 pl-5 marker:text-mango">
                {[1, 2, 3, 4].map((num) => (
                  <li key={num}>
                    <span className="text-slate text-sm leading-relaxed">
                      {t(`policy.items.${num}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <section className="mt-24 border-t-2 border-gray-800 pt-10" aria-labelledby="visit-info-title">
          <h2 id="visit-info-title" className="text-3xl md:text-4xl font-bold text-gray-800">
            {tContact('title')}
          </h2>
          <Scribble className="mt-2 h-3 w-28 text-mango" />
          <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="eyebrow">{tContact('info.hours.title')}</dt>
              <dd className="mt-2 text-gray-800">
                <span className="block">{tContact('info.hours.weekday')}</span>
                <span className="block">{tContact('info.hours.weekend')}</span>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{tContact('info.address.title')}</dt>
              <dd className="mt-2 text-gray-800">
                {tContact('info.address.line1')}
                <br />
                {tContact('info.address.line2')}
                <a href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A" target="_blank" rel="noopener noreferrer" className="link-ink mt-2 block w-fit text-sm">
                  {tContact('info.maps_cta')}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{tContact('info.contact_info.title')}</dt>
              <dd className="mt-2 text-gray-800">
                <a href={`tel:${RESTAURANT.phoneClean}`} className="block py-1 hover:text-pastel-ink">
                  {RESTAURANT.phone}
                </a>
                <a href={`mailto:${RESTAURANT.email}`} className="block break-all py-1 hover:text-pastel-ink">
                  {RESTAURANT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{tContact('info.social.title')}</dt>
              <dd className="mt-2 text-gray-800">
                <a href={RESTAURANT.social.instagram.url} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-pastel-ink">
                  {tContact('info.social.instagram')}
                </a>
                <a href={RESTAURANT.social.tripadvisor.url} target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-pastel-ink">
                  {tContact('info.social.tripadvisor')}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section id="contacto" className="scroll-mt-32 mt-20" aria-labelledby="contacto-title">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
            <div>
              <h2 id="contacto-title" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {tContact('title')}
              </h2>
              <p className="text-slate leading-relaxed">
                {tContact('subtitle')}
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate">
                <a href={`tel:${RESTAURANT.phoneClean}`} className="block py-1 hover:text-pastel-ink">
                  {RESTAURANT.phone}
                </a>
                <a href={`mailto:${RESTAURANT.email}`} className="block py-1 hover:text-pastel-ink">
                  {RESTAURANT.email}
                </a>
              </div>
            </div>
            <div className="border-2 border-dashed border-slate/25 bg-white p-6 md:p-8">
              {isContactSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto mb-4 text-sage-ink" size={44} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{tContact('success.title')}</h3>
                  <p className="text-slate">{tContact('success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="relative space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-gray-800 font-bold mb-2">
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
                      className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-gray-800 font-bold mb-2">
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
                      className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-gray-800 font-bold mb-2">
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
                      className="w-full px-4 py-3.5 rounded-md border border-gray-800/30 bg-white focus:border-gray-800 focus:ring-2 focus:ring-pastel/50 outline-none transition-colors text-gray-800 placeholder:text-slate/70 resize-none"
                    />
                  </div>
                  {contactError && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-300 rounded-md">
                      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                      <p className="text-red-700 text-sm">{contactError}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* FAQ Section */}
        <section className="mt-24" aria-labelledby="reservas-faq-title">
          <SectionHeading id="reservas-faq-title" title={t('faq.title')} />
          <dl className="mt-10 grid grid-cols-1 gap-x-14 md:grid-cols-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border-t border-dashed border-slate/30 py-6">
                <dt className="text-lg font-bold text-gray-800">{t(`faq.items.${num}.q`)}</dt>
                <dd className="mt-2 leading-relaxed text-slate">{t(`faq.items.${num}.a`)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  )
}

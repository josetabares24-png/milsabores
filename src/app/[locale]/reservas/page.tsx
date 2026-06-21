'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Calendar, Users, Phone, CheckCircle2, Info, Mail, Clock, MessageSquare, AlertCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import { isValidEmail, isValidPhone } from '@/lib/validation'
import { RESTAURANT } from '@/config/restaurant'

function useRecentBookings() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    // More bookings during peak hours (10-14), fewer early/late
    const baseCount = hour >= 10 && hour <= 14 ? 8 : hour >= 8 && hour <= 17 ? 5 : 3
    const count = baseCount + Math.floor(Math.random() * 7)

    const messages = [
      `${count} personas reservaron en las ultimas 2 horas`,
      `${count} reservas confirmadas hoy`,
      `${count} mesas reservadas para hoy`,
      `${count} personas ya reservaron esta semana`,
    ]
    setMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  return message
}

export default function ReservationsPage() {
  const t = useTranslations('reservations')
  const locale = useLocale()
  const recentBookings = useRecentBookings()

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

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        body: JSON.stringify({ ...formData, locale }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo procesar la reserva.')
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting reservation:', err)
      setError(err instanceof Error ? err.message : 'No se pudo procesar la reserva. Llama al +351 21 347 0214.')
    } finally {
      setIsSubmitting(false)
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
          <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sage/40">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate mb-6">
            {t('success.title')}
          </h1>
          <p className="text-slate/60 text-xl mb-12">
            {t('success.message')}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', specialRequests: '' })
            }}
            className="inline-block px-10 py-4 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-lg shadow-pastel/30 hover:scale-105"
          >
            {t('success.back')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size="xl" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-6 py-3 rounded-full">
              <Calendar className="text-pastel" size={20} />
              <span className="text-pastel text-sm font-bold tracking-widest uppercase">
                {t('eyebrow')}
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate mb-6">
            {t('title')}
          </h1>
          <p className="text-slate/60 text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Urgency Notification */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-sage/20 via-sage/10 to-sage/20 border-2 border-sage/30 rounded-2xl p-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-sage rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-sage rounded-full animate-ping"></div>
              </div>
              <Users className="text-sage" size={20} />
            </div>
            <p className="text-sage font-semibold text-sm md:text-base">
              {recentBookings}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white via-white to-pastel/5 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-0 right-0 bg-pastel text-white px-6 py-2 rounded-bl-3xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold">{t('form.limited_availability')}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-slate font-bold mb-2">
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
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-slate font-bold mb-2">
                      {t('form.email')} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('form.email_placeholder')}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-slate font-bold mb-2">
                      {t('form.phone')} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t('form.phone_placeholder')}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-slate font-bold mb-2">
                      {t('form.date')} *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30" size={20} />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={today}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-slate font-bold mb-2">
                      {t('form.time')} *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30" size={20} />
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        min={RESTAURANT.hours.openTime}
                        max={RESTAURANT.hours.closeTime}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="md:col-span-2">
                    <label htmlFor="guests" className="block text-slate font-bold mb-2">
                      {t('form.guests')} *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30" size={20} />
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        min={1}
                        max={20}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="md:col-span-2">
                    <label htmlFor="specialRequests" className="block text-slate font-bold mb-2">
                      {t('form.special_requests')}{' '}
                      <span className="text-slate/40 font-normal">({t('form.optional')})</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-5 top-5 text-slate/30" size={20} />
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t('form.special_requests_placeholder')}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-10 py-5 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark hover:scale-105 transition-all shadow-xl shadow-pastel/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>

                <p className="flex items-center justify-center gap-2 text-slate/50 text-sm">
                  <Mail size={16} />
                  {t('form.confirmation_instant')}
                </p>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-pastel/10 to-peach/10 rounded-3xl p-8 border-2 border-pastel/20">
              <h3 className="text-xl font-bold text-slate mb-2">
                {t('quick_actions.title')}
              </h3>
              <p className="text-slate/60 mb-6">
                {t('quick_actions.subtitle')}
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+351213470214"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-lg shadow-pastel/30 hover:scale-105"
                >
                  <Phone size={20} />
                  {t('quick_actions.call')}
                </a>
              </div>
            </div>

            {/* Good to Know */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10">
              <h3 className="text-xl font-bold text-slate mb-4 flex items-center gap-2">
                <Info size={20} className="text-pastel" />
                {t('info.title')}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate text-sm mb-1">{t('info.punctuality.title')}</h4>
                  <p className="text-slate/70 text-sm leading-relaxed">{t('info.punctuality.text')}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate text-sm mb-1">{t('info.seating.title')}</h4>
                  <p className="text-slate/70 text-sm leading-relaxed">{t('info.seating.text')}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10">
              <h3 className="text-xl font-bold text-slate mb-4">
                {t('policy.title')}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <CheckCircle2 className="text-sage flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate/80 text-sm leading-relaxed">
                      {t(`policy.items.${num}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-slate text-center mb-12">
            {t('faq.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10 hover:border-pastel/30 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-slate mb-3">
                  {t(`faq.items.${num}.q`)}
                </h3>
                <p className="text-slate/70 leading-relaxed">
                  {t(`faq.items.${num}.a`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

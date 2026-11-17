export const COOKIE_CONSENT_KEY = 'mil-sabores-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'mil-sabores-cookie-consent-change'

export type CookieConsentChoice = 'accepted' | 'declined'

/**
 * Analytics is strictly opt-in. A change is broadcast so GA4 can be loaded
 * without requiring a page reload after the visitor accepts.
 */
export function saveCookieConsent(choice: CookieConsentChoice) {
  const previous = window.localStorage.getItem(COOKIE_CONSENT_KEY)
  window.localStorage.setItem(COOKIE_CONSENT_KEY, choice)

  if (choice === 'declined') {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })

    // Remove Google Analytics first-party cookies on consent withdrawal.
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0]
      if (name !== '_ga' && !name.startsWith('_ga_')) continue

      document.cookie = `${name}=; Max-Age=0; path=/`
      const labels = window.location.hostname.split('.')
      for (let i = 0; i < labels.length - 1; i++) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${labels.slice(i).join('.')}`
      }
    }
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))

  // gtag.js cannot be reliably unloaded from a running document.
  // Reload only when withdrawing a previously granted consent.
  if (previous === 'accepted' && choice === 'declined') {
    window.location.reload()
  }
}

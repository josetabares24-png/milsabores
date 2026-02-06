/**
 * Validación de email: formato estándar.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validación de teléfono: permite +, dígitos, espacios y guiones; mínimo 8 dígitos.
 */
const PHONE_REGEX = /^[\d\s+\-()]{8,}$/

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 8 && PHONE_REGEX.test(phone.trim())
}

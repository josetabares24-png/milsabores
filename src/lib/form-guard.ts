import type { NextRequest } from 'next/server'

/** Campo-armadilha invisível: pessoas não o preenchem, bots costumam preencher. */
export const HONEYPOT_FIELD = 'website'

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD]
  return typeof value === 'string' && value.trim() !== ''
}

/** Escapa texto do utilizador antes de o inserir no HTML dos emails. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Texto de uma linha (sem quebras), cortado no máximo indicado. */
export function oneLine(value: string, max: number): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max)
}

/** Devolve a string aparada se for texto com 1..max caracteres; caso contrário null. */
export function cleanString(value: unknown, max: number, { required = true } = {}): string | null {
  if (value === undefined || value === null || value === '') return required ? null : ''
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (required && trimmed === '') return null
  if (trimmed.length > max) return null
  return trimmed
}

// Limite simples por IP, em memória. Em serverless é por instância (melhor esforço),
// suficiente para travar envios repetidos de um mesmo cliente.
const hits = new Map<string, number[]>()

export function isRateLimited(request: NextRequest, bucket: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, list] of hits) if (!list.some((t) => now - t < windowMs)) hits.delete(k)
  }
  return false
}

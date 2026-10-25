// Páginas por intenção de pesquisa (pequeno-almoço, hambúrgueres, gelados).
// Os pratos e preços vêm sempre das mesmas mensagens da carta (/menu): nada é escrito à mão aqui.
import type { MenuCategory } from '@/lib/menu'

export type IntentKey = 'breakfast' | 'burgers' | 'gelato'

export interface IntentConfig {
  path: string
  image: string
  /** Grupos da carta a mostrar: categoria + (opcional) só estas chaves, pela ordem indicada. */
  groups: { category: MenuCategory; keys?: string[] }[]
  showBurgerPromo?: boolean
  showGelato?: boolean
}

export const INTENT_PAGES: Record<IntentKey, IntentConfig> = {
  breakfast: {
    path: 'pequeno-almoco-lisboa',
    image: '/images/Mil Sabores/Tosta de Agucate.webp',
    groups: [
      { category: 'eggs' },
      { category: 'bagels' },
      { category: 'bowls', keys: ['acai', 'yogur', 'frutas'] },
      { category: 'coffee', keys: ['espresso', 'cortado', 'cafe_leche', 'cappuccino', 'latte', 'flat_white'] },
      { category: 'drinks', keys: ['zumo_naranja_medio', 'zumo_naranja_grande'] },
    ],
  },
  burgers: {
    path: 'hamburgueres-lisboa',
    image: '/images/Mil Sabores/Hamburguesa Portobello.webp',
    groups: [{ category: 'burgers' }],
    showBurgerPromo: true,
  },
  gelato: {
    path: 'gelados-lisboa',
    image: '/images/Mil Sabores/Copos Helado.webp',
    groups: [{ category: 'coffee', keys: ['affogato'] }],
    showGelato: true,
  },
}

export const INTENT_KEYS = Object.keys(INTENT_PAGES) as IntentKey[]

// Categorias da carta que a página /menu mostra (e pela mesma ordem).
// Partilhado com o JSON-LD (SchemaMarkup) para que os dados estruturados reflitam exatamente a carta visível.
export const MENU_CATEGORIES = [
  'brunch',
  'dulces',
  'bowls',
  'coffee',
  'drinks',
  'bagels',
  'toasts',
  'eggs',
  'salads',
  'burgers',
  'wraps',
  'cocktails',
  'extras',
] as const

export type MenuCategory = (typeof MENU_CATEGORIES)[number]

export const GELATO_SIZES = ['single', 'double', 'triple'] as const

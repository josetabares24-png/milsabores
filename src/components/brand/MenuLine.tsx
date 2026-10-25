import type { ReactNode } from 'react'

interface MenuLineProps {
  name: ReactNode
  price?: ReactNode
  as?: 'h3' | 'h4' | 'p'
  className?: string
}

/** Linha de carta: nome · · · · · preço (pontilhado como na secção Promoções). */
export default function MenuLine({ name, price, as = 'h3', className = '' }: MenuLineProps) {
  const Tag = as
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <Tag className="font-bold leading-snug text-gray-800">{name}</Tag>
      {price !== undefined && (
        <>
          <span className="mb-1 min-w-[1.5rem] flex-1 self-end border-b-2 border-dotted border-slate/30" aria-hidden="true" />
          <span className="shrink-0 whitespace-nowrap font-bold text-gray-800">{price}</span>
        </>
      )}
    </div>
  )
}

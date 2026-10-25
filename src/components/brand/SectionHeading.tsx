import Scribble from './Scribble'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
}

/** Cabeçalho de secção ao estilo da carta: etiqueta pequena, título a tinta e sublinhado à mão. */
export default function SectionHeading({ eyebrow, title, intro, align = 'center', as = 'h2', id, className = '' }: SectionHeadingProps) {
  const Tag = as
  const centered = align === 'center'
  return (
    <header className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        id={id}
        className={`mt-2 font-bold text-gray-800 ${as === 'h1' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-[2.75rem]'} leading-tight`}
      >
        {title}
      </Tag>
      <Scribble className={`mt-2 h-3 w-28 text-mango ${centered ? 'mx-auto' : ''}`} />
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed text-slate ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{intro}</p>
      )}
    </header>
  )
}

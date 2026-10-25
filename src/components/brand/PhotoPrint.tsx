import Image from 'next/image'
import PaperShapes from './PaperShapes'

interface PhotoPrintProps {
  src: string
  alt: string
  caption?: string
  ratio?: 'portrait' | 'square' | 'landscape'
  shapes?: 'a' | 'b' | 'c' | false
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
}

const ratios = { portrait: 'aspect-[4/5]', square: 'aspect-square', landscape: 'aspect-[3/2]' }

/** Fotografia real tratada como prova impressa: recorte fixo, margem de papel, legenda opcional. */
export default function PhotoPrint({
  src, alt, caption, ratio = 'portrait', shapes = false, sizes = '(max-width: 768px) 100vw, 50vw', priority, className = '', imgClassName = 'object-cover',
}: PhotoPrintProps) {
  return (
    <figure className={`relative ${className}`}>
      {shapes && <PaperShapes variant={shapes} className="absolute -inset-6 -z-0 h-[calc(100%+3rem)] w-[calc(100%+3rem)] md:-inset-10 md:h-[calc(100%+5rem)] md:w-[calc(100%+5rem)]" />}
      <div className="relative bg-white p-2 ring-1 ring-black/5 md:p-3">
        <div className={`relative overflow-hidden rounded-[2px] ${ratios[ratio]}`}>
          <Image src={src} alt={alt} fill sizes={sizes} className={imgClassName} {...(priority ? { priority: true } : { loading: 'lazy' as const })} />
        </div>
        {caption && <figcaption className="px-1 pt-2 text-sm text-slate">{caption}</figcaption>}
      </div>
    </figure>
  )
}

import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  priority?: boolean
}

const sizes = { sm: 40, md: 56, lg: 80, xl: 120 }

/** Selo da marca, sempre a preto como no original (sem filtros de cor). */
export default function Logo({ size = 'md', className = '', priority = false }: LogoProps) {
  const dimension = sizes[size]
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/Mil Sabores/sellomilsabores.png"
        alt="Mil Sabores - Gelateria Artesanal"
        width={dimension}
        height={dimension}
        className="object-contain"
        {...(priority ? { priority: true } : {})}
      />
    </div>
  )
}

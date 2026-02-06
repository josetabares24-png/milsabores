import React from 'react'
import Image from 'next/image'

interface LogoProps {
  variant?: 'icon' | 'full' | 'horizontal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

export default function Logo({ variant = 'full', size = 'md', className = '', showText = true }: LogoProps) {
  const sizes = {
    sm: { dimension: 40 },
    md: { dimension: 56 },
    lg: { dimension: 80 },
    xl: { dimension: 120 },
  }

  const currentSize = sizes[size]

  // All variants use the real logo image
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/Mil Sabores/sellomilsabores.png"
        alt="Mil Sabores - Gelateria Artesanal"
        width={currentSize.dimension}
        height={currentSize.dimension}
        className="object-contain"
        priority
      />
    </div>
  )
}

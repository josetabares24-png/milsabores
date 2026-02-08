import React from 'react'
import Image from 'next/image'

interface LogoProps {
  variant?: 'icon' | 'full' | 'horizontal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
  colorFilter?: 'none' | 'mango' | 'gold' | 'sepia' | 'grayscale' | 'warm' | 'cool' | 'pastel'
}

export default function Logo({
  variant = 'full',
  size = 'md',
  className = '',
  showText = true,
  colorFilter = 'none'
}: LogoProps) {
  const sizes = {
    sm: { dimension: 40 },
    md: { dimension: 56 },
    lg: { dimension: 80 },
    xl: { dimension: 120 },
  }

  const filters = {
    none: '',
    mango: 'sepia(100%) saturate(300%) brightness(90%) hue-rotate(5deg)',
    gold: 'sepia(100%) saturate(200%) brightness(95%) hue-rotate(-10deg)',
    sepia: 'sepia(80%) saturate(120%)',
    grayscale: 'grayscale(100%)',
    warm: 'sepia(30%) saturate(130%) brightness(105%)',
    cool: 'sepia(20%) saturate(80%) brightness(105%) hue-rotate(180deg)',
    pastel: 'sepia(30%) saturate(150%) brightness(100%) hue-rotate(170deg)',
  }

  const currentSize = sizes[size]
  const filterStyle = filters[colorFilter]

  // All variants use the real logo image
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/Mil Sabores/sellomilsabores.png"
        alt="Mil Sabores - Gelateria Artesanal"
        width={currentSize.dimension}
        height={currentSize.dimension}
        className="object-contain"
        style={filterStyle ? { filter: filterStyle } : undefined}
        priority
      />
    </div>
  )
}

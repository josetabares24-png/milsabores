/**
 * Formas recortadas planas, tiradas da arte da marca (selo sobre manchas pêssego, oliva,
 * amarelo e azul). Decorativas: ficam atrás das fotos, sem transparências nem gradientes.
 */
type Variant = 'a' | 'b' | 'c'

const shapes: Record<Variant, { d: string; fill: string }[]> = {
  // oliva alta à esquerda, arco pêssego em cima, seixo azul e nuvem amarela em baixo
  a: [
    { d: 'M28 30c18-14 44-6 50 20 8 34-2 92-20 118-14 20-40 16-48-8-10-30-8-108 18-130z', fill: '#A8B080' },
    { d: 'M120 6c40-8 86 12 104 44 10 18-4 30-20 22-26-14-52-26-84-30-22-4-26-30 0-36z', fill: '#F0D0C0' },
    { d: 'M54 196c14-14 40-10 46 6 6 18-8 34-28 34-22 0-30-26-18-40z', fill: '#7898C0' },
    { d: 'M176 180c8-16 30-16 36-2 12-8 28 2 24 18-2 14-16 22-30 28-18 8-34-4-36-20-1-10 0-18 6-24z', fill: '#F8C008' },
  ],
  b: [
    { d: 'M150 14c30-10 66 10 76 40 10 32-6 74-34 86-24 10-40-10-40-36 0-24-28-74-2-90z', fill: '#F0D0C0' },
    { d: 'M16 150c10-26 44-34 64-18 22 16 18 58-6 72-26 14-68-24-58-54z', fill: '#A8B080' },
    { d: 'M196 186c10-12 30-8 34 6 4 16-8 28-22 28-16 0-22-22-12-34z', fill: '#F8C008' },
  ],
  c: [
    { d: 'M20 40c20-24 70-30 96-10 24 18 6 46-24 52-34 8-90-14-72-42z', fill: '#7898C0' },
    { d: 'M170 120c22-20 58-6 62 22 4 30-26 52-50 40-22-10-28-46-12-62z', fill: '#F0D0C0' },
    { d: 'M30 190c6-14 26-16 32-2 12-6 24 6 18 18-6 14-28 20-42 12-10-6-12-18-8-28z', fill: '#F8C008' },
  ],
}

export default function PaperShapes({ variant = 'a', className = '' }: { variant?: Variant; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      {shapes[variant].map((s, i) => (
        <path key={i} d={s.d} fill={s.fill} />
      ))}
    </svg>
  )
}

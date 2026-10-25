import { notFound } from 'next/navigation'

// Qualquer caminho desconhecido dentro de um idioma (ex.: /pagina-que-nao-existe, /en/xyz)
// mostra a página 404 do próprio site ([locale]/not-found.tsx) em vez da 404 genérica do Next.
export default function CatchAllPage() {
  notFound()
}

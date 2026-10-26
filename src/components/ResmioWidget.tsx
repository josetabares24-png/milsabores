'use client'

import { useCallback, useEffect, useRef } from 'react'
import Script from 'next/script'

// Código de integração fornecido pela resmio: <div id="resmio-mil-sabores"></div>
// + static.resmio.com/static/pt/widget.js#id=mil-sabores
// O script lê o id do próprio src (depois do #) e escreve um <iframe> dentro do div.
export const RESMIO_ID = 'mil-sabores'
export const RESMIO_BOOKING_URL = `https://app.resmio.com/${RESMIO_ID}/widget`
const RESMIO_SCRIPT_SRC = `https://static.resmio.com/static/pt/widget.js#id=${RESMIO_ID}`

export default function ResmioWidget({ iframeTitle }: { iframeTitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // O iframe criado pela resmio não tem título; acrescenta-o para leitores de ecrã.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const label = () => container.querySelector('iframe')?.setAttribute('title', iframeTitle)
    label()
    const observer = new MutationObserver(label)
    observer.observe(container, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [iframeTitle])

  // Em navegação interna o next/script não volta a executar um script já carregado:
  // se o div ficou vazio, volta a inserir o script da resmio (mesmo src).
  const ensureRendered = useCallback(() => {
    const container = containerRef.current
    if (!container || container.querySelector('iframe')) return
    const script = document.createElement('script')
    script.src = RESMIO_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <div
        id={`resmio-${RESMIO_ID}`}
        ref={containerRef}
        className="flex min-h-[460px] w-full justify-center [&_iframe]:max-w-full"
      />
      <Script id="resmio-widget" src={RESMIO_SCRIPT_SRC} strategy="afterInteractive" onReady={ensureRendered} />
    </>
  )
}

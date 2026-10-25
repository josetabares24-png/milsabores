/** Sublinhado traçado à mão (o mesmo da secção Promoções). Decorativo. */
export default function Scribble({ className = 'h-3 w-28 text-mango' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 12" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M2 8.5c14-4.5 26-5 39-2.5s23 3.5 37 0.5S104 2.5 118 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

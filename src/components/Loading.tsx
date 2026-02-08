export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-peach/20">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-pastel/20 rounded-full animate-spin"
                 style={{ animationDuration: '3s' }}></div>

            {/* Inner rotating ring */}
            <div className="absolute inset-2 border-4 border-t-pastel border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
                 style={{ animationDuration: '1.5s' }}></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-pastel animate-pulse">
                restaurant
              </span>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-semibold text-slate-700">A carregar</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-pastel rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-pastel rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-pastel rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>

        {/* Decorative food icons */}
        <div className="mt-8 flex justify-center gap-6 text-3xl opacity-30">
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0s' }}>
            cake
          </span>
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0.1s' }}>
            icecream
          </span>
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0.2s' }}>
            coffee
          </span>
        </div>
      </div>
    </div>
  )
}

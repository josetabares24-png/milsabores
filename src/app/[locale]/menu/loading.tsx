export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-peach/20 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-12 w-64 bg-slate-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex justify-center gap-4 mb-12 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-32 bg-slate-200 rounded-full"></div>
          ))}
        </div>

        {/* Menu Items Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
              <div className="h-64 bg-slate-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                <div className="h-8 w-24 bg-slate-200 rounded-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

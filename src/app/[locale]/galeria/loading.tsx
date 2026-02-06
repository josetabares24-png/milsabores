export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-peach/20 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-12 w-64 bg-slate-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
        </div>

        {/* Category Filters Skeleton */}
        <div className="flex justify-center gap-4 mb-12 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-slate-200 rounded-full"></div>
          ))}
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className={`bg-slate-200 rounded-2xl animate-pulse ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
              style={{ height: i % 5 === 0 ? '400px' : '200px' }}
            ></div>
          ))}
        </div>

        {/* Instagram CTA Skeleton */}
        <div className="text-center mt-16 animate-pulse">
          <div className="h-12 w-64 bg-slate-200 rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
}

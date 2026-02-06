export default function ReservationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-peach/20 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-12 w-64 bg-slate-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 animate-pulse">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
                <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
              </div>
            ))}
            <div className="h-14 w-full bg-slate-200 rounded-full mt-8"></div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl shadow-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

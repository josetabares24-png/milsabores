export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-peach/20 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <div className="h-12 w-64 bg-slate-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-96 bg-slate-200 rounded-lg mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form Skeleton */}
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-5 w-32 bg-slate-200 rounded mb-2"></div>
                  <div className={`w-full bg-slate-200 rounded-xl ${i === 4 ? 'h-32' : 'h-12'}`}></div>
                </div>
              ))}
              <div className="h-14 w-full bg-slate-200 rounded-full mt-8"></div>
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-8 animate-pulse">
            {/* Info Cards */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="h-6 w-40 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Skeleton */}
        <div className="mt-16 h-96 bg-slate-200 rounded-3xl animate-pulse"></div>
      </div>
    </div>
  )
}

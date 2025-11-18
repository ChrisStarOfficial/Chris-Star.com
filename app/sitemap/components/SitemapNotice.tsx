import Link from 'next/link'

export default function SitemapNotice() {
  return (
    <div className="mt-16 p-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">
            XML Sitemap
          </h3>
          <p className="text-purple-200">
            For search engines, we also provide an XML sitemap
          </p>
        </div>
        <Link 
          href="/sitemap.xml" 
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          View XML Sitemap
        </Link>
      </div>
    </div>
  )
}
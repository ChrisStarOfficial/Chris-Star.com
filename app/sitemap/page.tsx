import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SitemapPage() {
  const categories = [
    {
      name: 'Main',
      pages: [
        { href: '/', label: 'Home' },
        { href: '/navigation', label: 'Navigation' },
      ]
    },
    {
      name: 'Content',
      pages: [
        { href: '/community', label: 'Community' },
        { href: '/feedback', label: 'Feedback' },
      ]
    },
    {
      name: 'Personal',
      pages: [
        { href: '/music', label: 'Music' },
      ]
    },
    {
      name: 'The Archives',
      pages: [
        { href: '/archives', label: 'The Archives' },
        { href: '/archives/vault', label: 'The Vault' },
        { href: '/archives/wiki', label: 'Wiki' },
        { href: '/archives/compendia', label: 'Project Compendia' },
      ]
    },
    {
      name: 'Legal',
      pages: [
        { href: '/terms', label: 'Terms of Service' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/legal', label: 'Legal' },
      ]
    },
    {
      name: 'Careers',
      pages: [
        { href: '/careers', label: 'Careers' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="relative py-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
              Chris Star Enterprises Site Map
            </h1>
            <p className="text-xl font-sans text-purple-200 max-w-2xl mx-auto">
              Explore everything we have to offer
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="group"
              >
                {/* Category Header */}
                <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-purple-500/30">
                  {category.name}
                </h2>
                
                {/* Pages List */}
                <ul className="space-y-3">
                  {category.pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="flex items-center p-3 rounded-lg bg-black/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/30 shadow-2xl"
                      >
                        <div className="flex-1">
                          <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                            {page.label}
                          </span>
                          <p className="text-purple-300/70 text-sm mt-1">
                            {page.href}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg 
                            className="w-5 h-5 text-purple-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7" 
                            />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* XML Sitemap Notice */}
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
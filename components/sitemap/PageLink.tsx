import Link from 'next/link'

interface Page {
  href: string
  label: string
}

interface PageLinkProps {
  page: Page
}

export default function PageLink({ page }: PageLinkProps) {
  return (
    <li>
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
  )
}
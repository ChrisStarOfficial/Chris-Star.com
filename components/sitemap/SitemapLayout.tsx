import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PurpleGalaxyBackground from '@/components/ui/background/PurpleGalaxyBackground'

interface SitemapLayoutProps {
  children: React.ReactNode
}

export default function SitemapLayout({ children }: SitemapLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0">
        <PurpleGalaxyBackground />
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="relative py-16">
          {children}
        </main>

      <Footer />
      </div>
    </div>
  )
}
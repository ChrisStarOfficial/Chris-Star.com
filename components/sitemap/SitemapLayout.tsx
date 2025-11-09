import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PurpleGalaxyBackground from '@/components/ui/background/PurpleGalaxyBackground'

interface SitemapLayoutProps {
  children: React.ReactNode
}

export default function SitemapLayout({ children }: SitemapLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="relative py-16">
        <PurpleGalaxyBackground />
        {children}
      </main>

      <Footer />
    </div>
  )
}
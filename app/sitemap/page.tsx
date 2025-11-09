import CategoryCard from '@/components/sitemap/CategoryCard'
import SitemapNotice from '@/components/sitemap/SitemapNotice'
import Container from '@/components/ui/layout/Container'
import SitemapLayout from '@/components/sitemap/SitemapLayout'
import PageHeading from '@/components/ui/typography/PageHeading'

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
    <SitemapLayout>
      <Container>
        <PageHeading 
          title="Chris Star Enterprises Site Map"
          subtitle="Explore everything we have to offer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <CategoryCard key={categoryIndex} category={category} />
          ))}
        </div>

        <SitemapNotice />
      </Container>
    </SitemapLayout>
  )
}
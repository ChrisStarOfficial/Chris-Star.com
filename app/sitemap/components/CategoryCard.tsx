import PageLink from '@/app/sitemap/components/PageLink'

interface Category {
  name: string
  pages: Array<{ href: string; label: string }>
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group">
      <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-purple-500/30">
        {category.name}
      </h2>
      <ul className="space-y-3">
        {category.pages.map((page) => (
          <PageLink key={page.href} page={page} />
        ))}
      </ul>
    </div>
  )
}
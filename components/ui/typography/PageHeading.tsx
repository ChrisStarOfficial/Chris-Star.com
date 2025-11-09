interface PageHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeading({ title, subtitle, className = '' }: PageHeadingProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl font-sans text-purple-200 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
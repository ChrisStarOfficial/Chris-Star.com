import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

const cardVariants = {
  default: 'bg-card text-card-foreground border shadow-sm',
  outline: 'border border-border',
  ghost: 'bg-transparent',
}

export function Card({
  children,
  className,
  variant = 'default',
}: CardProps) {
  return (
    <div className={cn(
      'rounded-lg transition-colors',
      cardVariants[variant],
      className
    )}>
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}
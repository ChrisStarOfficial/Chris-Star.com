import { cn } from '@/lib/utils'
import type { SpacingToken, DirectionVariant, AlignVariant, JustifyVariant } from '@/types/design-tokens'

interface StackProps {
  children: React.ReactNode
  direction?: DirectionVariant
  spacing?: SpacingToken
  align?: AlignVariant
  justify?: JustifyVariant
  wrap?: boolean
  className?: string
}

const directionClasses: Record<DirectionVariant, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row'
}

const spacingClasses: Record<SpacingToken, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  section: 'gap-24'
}

const alignClasses: Record<AlignVariant, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end', 
  stretch: 'items-stretch',
  baseline: 'items-baseline'
}

const justifyClasses: Record<JustifyVariant, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export function Stack({
  children,
  direction = 'vertical',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className
}: StackProps) {
  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      spacingClasses[spacing],
      alignClasses[align],
      justifyClasses[justify],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  )
}
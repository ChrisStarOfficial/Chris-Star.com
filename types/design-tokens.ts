export type ColorToken = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'destructive' 
  | 'luxury.gold' 
  | 'luxury.gray'

export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type SpacingToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'section'
export type FontToken = 'sans' | 'serif' | 'inter' | 'dm-sans'

export type AnimationDirection = 
  | 'up' 
  | 'down' 
  | 'left' 
  | 'right' 
  | 'fade' 
  | 'scale' 
  | 'stagger'

// Add the missing types
export type DirectionVariant = 'vertical' | 'horizontal'
export type AlignVariant = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type JustifyVariant = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
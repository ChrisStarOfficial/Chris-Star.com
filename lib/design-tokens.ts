import type { SizeToken, SpacingToken, FontToken, ColorToken } from '@/types/design-tokens'

export const getSizeClass = (size: SizeToken) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  }
  return sizes[size]
}

export const getSpacingClass = (spacing: SpacingToken) => {
  const spacings = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    section: 'gap-24'
  }
  return spacings[spacing]
}

export const getFontClass = (font: FontToken) => {
  const fonts = {
    sans: 'font-sans',
    serif: 'font-serif',
    inter: 'font-inter',
    'dm-sans': 'font-dm-sans'
  }
  return fonts[font]
}

export const getColorClass = (color: ColorToken) => {
  const colors = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    'luxury.gold': 'bg-luxury-gold text-luxury-black',
    'luxury.gray': 'bg-luxury-gray text-luxury-white'
  }
  return colors[color]
}
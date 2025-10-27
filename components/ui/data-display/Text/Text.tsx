import { cn } from '@/lib/utils';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'lead';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const variantClasses = {
  h1: 'text-5xl font-bold tracking-tight',
  h2: 'text-4xl font-bold tracking-tight',
  h3: 'text-3xl font-semibold',
  h4: 'text-2xl font-semibold',
  h5: 'text-xl font-semibold',
  h6: 'text-lg font-semibold',
  body: 'text-base font-normal',
  lead: 'text-lg text-gray-600 font-normal',
  small: 'text-sm text-gray-500 font-normal',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function Text({
  children,
  variant = 'body',
  as: Component = variant.startsWith('h') ? (variant as 'h1') : 'p',
  className,
  weight,
  align = 'left',
}: TextProps) {
  return (
    <Component
      className={cn(
        variantClasses[variant],
        weight && weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
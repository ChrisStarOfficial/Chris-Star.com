import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'accent' | 'luxury';
  className?: string;
}

const spacingClasses = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32',
};

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
  accent: 'bg-accent',
  luxury: 'bg-luxury-gold/10', // Using your luxury token
};

export default function Section({
  children,
  spacing = 'md',
  background = 'default',
  className,
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], backgroundClasses[background], className)}>
      {children}
    </section>
  );
}
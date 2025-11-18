interface AnimatedTransitionProps {
  show: boolean
  children: React.ReactNode
  className?: string
}

export default function AnimatedTransition({ show, children, className = "" }: AnimatedTransitionProps) {
  return (
    <div
      className={`transition-all duration-1000 overflow-hidden ${show ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} ${className}`}
    >
      {children}
    </div>
  )
}
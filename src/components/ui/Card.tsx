import { cn } from '../../utils/cn'

interface CardProps {
  hoverable?: boolean
  className?: string
  children: React.ReactNode
}

export function Card({ hoverable, className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-4 transition-all duration-base',
        hoverable && 'hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

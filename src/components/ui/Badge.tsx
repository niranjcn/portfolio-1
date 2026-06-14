import { cn } from '../../utils/cn'

interface BadgeProps {
  variant?: 'accent' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const badgeVariants = {
  accent: 'bg-accent-dim text-accent border-accent/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  error: 'bg-error/10 text-error border-error/30',
  neutral: 'bg-surface text-text-muted border-border',
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
}

export function Badge({ variant = 'neutral', size = 'sm', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full border font-mono uppercase tracking-wider', badgeVariants[variant], badgeSizes[size], className)}>
      {children}
    </span>
  )
}

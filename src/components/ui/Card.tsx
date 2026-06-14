import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface CardProps {
  hoverable?: boolean
  className?: string
  children: React.ReactNode
}

export function Card({ hoverable, className, children }: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -6, borderColor: 'rgba(255, 107, 0, 0.4)' }}
        className={cn(
          'rounded-lg border border-border bg-surface p-4 transition-all duration-[var(--transition-smooth)] hover:shadow-glow hover:shadow-card cursor-pointer',
          className
        )}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface p-4',
        className
      )}
    >
      {children}
    </div>
  )
}

import { useInView } from '../../hooks/useInView'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface SectionWrapperProps {
  id: string
  className?: string
  children: React.ReactNode
  stagger?: boolean
  full?: boolean
}

const easeOut = [0.22, 1, 0.36, 1] as const

const defaultVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export function SectionWrapper({ id, className, children, stagger = false, full = false }: SectionWrapperProps) {
  const [ref, inView] = useInView(0.05, true)

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
      className={cn(full ? '' : 'py-20 md:py-28', className)}
    >
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={stagger
          ? {
            hidden: { opacity: 0, y: 32 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }
          : defaultVariants}
        className={cn(full ? 'w-full' : 'mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]')}
      >
        {children}
      </motion.div>
    </section>
  )
}

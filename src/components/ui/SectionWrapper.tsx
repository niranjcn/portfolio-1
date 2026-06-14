import { useInView } from '../../hooks/useInView'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface SectionWrapperProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  const [ref, inView] = useInView(0.1, true)

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
      className={cn('py-16 md:py-24', className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]"
      >
        {children}
      </motion.div>
    </section>
  )
}

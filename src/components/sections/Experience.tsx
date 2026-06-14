import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

const typeColors: Record<string, string> = {
  Internship: 'bg-warning/10 text-warning border-warning/30',
  Freelance: 'bg-accent-dim text-accent border-accent/30',
}

const easeOut = [0.22, 1, 0.36, 1] as const

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function Experience() {
  const sections = portfolio.experience
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">02.</span>
        <h2 id="experience-heading" className="font-display text-3xl font-bold text-text">Experience</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <div className="relative">
        {/* Desktop timeline spine */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-gradient-to-b from-accent via-accent/60 to-accent/20 origin-top"
            style={{ height: '100%' }}
          />
        </div>

        <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-border">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-gradient-to-b from-accent via-accent/60 to-accent/20 origin-top"
            style={{ height: '100%' }}
          />
        </div>

        <div className="space-y-10 md:space-y-20">
          {sections.map((section, i) => {
            const isLeft = i % 2 === 0
            const isExpanded = expanded === i

            return (
              <motion.div
                key={section.company}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  'relative pl-10 md:pl-0',
                  isLeft ? 'md:pr-[55%] md:text-right' : 'md:pl-[55%]'
                )}
              >
                {/* Timeline dot */}
                <div className="absolute top-2 left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="h-3.5 w-3.5 rounded-full bg-accent border-2 border-bg shadow-glow" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="rounded-lg border border-border bg-surface p-5 md:p-6 transition-all duration-[var(--transition-smooth)] hover:border-accent/30 hover:shadow-glow cursor-pointer"
                >
                  <div className={cn('flex flex-wrap items-center gap-2 mb-3', isLeft && 'md:justify-end')}>
                    <span className={cn(
                      'rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider border',
                      typeColors[section.type] || 'bg-surface-2 text-text-muted border-border'
                    )}>
                      {section.type}
                    </span>
                    <span className="font-mono text-xs text-text-muted">{section.period}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text">{section.role}</h3>
                  <p className="text-sm text-accent mt-0.5">
                    {section.company}
                    {section.location && <span className="text-text-muted"> · {section.location}</span>}
                  </p>

                  <p className="mt-3 text-sm text-text-muted leading-relaxed">{section.summary}</p>

                  {/* Expand indicator */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-mono text-[10px] text-text-muted/60">
                      {isExpanded ? 'Less details' : 'More details'}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={14} className="text-text-muted/60" />
                    </motion.div>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4">
                          {section.metrics && (
                            <div className={cn('flex gap-4 md:gap-6', isLeft ? 'md:justify-end' : '')}>
                              {section.metrics.map(([value, label]) => (
                                <div key={label} className="text-center">
                                  <div className="font-display text-lg font-bold gradient-text">{value}</div>
                                  <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {section.responsibilities && (
                            <ul className="space-y-2">
                              {section.responsibilities.map((item, ri) => (
                                <motion.li
                                  key={ri}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: ri * 0.03 }}
                                  className="flex gap-2 text-sm text-text-muted"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          )}

                          {section.tech && (
                            <div className={cn('flex flex-wrap gap-1.5', isLeft ? 'md:justify-end' : '')}>
                              {section.tech.map((t) => (
                                <span key={t} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          {section.clients && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {section.clients.map((client) => (
                                <div key={client.name} className="rounded-md border border-border bg-surface-2 p-3">
                                  <div className="font-display text-sm font-semibold text-text">{client.name}</div>
                                  <div className="font-mono text-[10px] text-accent mt-0.5">{client.meta}</div>
                                  <p className="text-xs text-text-muted mt-1">{client.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

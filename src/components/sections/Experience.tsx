import { motion } from 'framer-motion'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

const typeColors: Record<string, string> = {
  Internship: 'bg-warning/10 text-warning border-warning/30',
  Freelance: 'bg-accent-dim text-accent border-accent/30',
}

export default function Experience() {
  const sections = portfolio.experience

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">02.</span>
        <h2 id="experience-heading" className="font-display text-2xl font-bold text-text">Experience</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="relative">
        {/* Timeline spine - desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-accent origin-top"
            style={{ height: '100%' }}
          />
        </div>

        {/* Mobile spine */}
        <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-border">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full bg-accent origin-top"
            style={{ height: '100%' }}
          />
        </div>

        <div className="space-y-8 md:space-y-16">
          {sections.map((section, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={section.company}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  'relative pl-10 md:pl-0',
                  isLeft ? 'md:pr-[55%] md:text-right' : 'md:pl-[55%]'
                )}
              >
                {/* Timeline dot */}
                <div className={cn(
                  'absolute top-1 md:left-1/2 md:-translate-x-1/2 z-10',
                  'left-4 md:left-1/2'
                )}>
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-accent border-2 border-bg" />
                    <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Card */}
                <div className="rounded-lg border border-border bg-surface p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
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

                  {section.summary && (
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">{section.summary}</p>
                  )}

                  {/* Metrics */}
                  {section.metrics && (
                    <div className={cn('mt-4 flex gap-4 md:gap-6', isLeft ? 'md:justify-end' : '')}>
                      {section.metrics.map(([value, label]) => (
                        <div key={label} className="text-center">
                          <div className="font-display text-lg font-bold text-accent">{value}</div>
                          <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Responsibilities */}
                  {section.responsibilities && (
                    <ul className="mt-4 space-y-2">
                      {section.responsibilities.map((item, ri) => (
                        <li key={ri} className="flex gap-2 text-sm text-text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  {section.tech && (
                    <div className={cn('mt-4 flex flex-wrap gap-1.5', isLeft ? 'md:justify-end' : '')}>
                      {section.tech.slice(0, 6).map((t) => (
                        <span key={t} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted">
                          {t}
                        </span>
                      ))}
                      {section.tech.length > 6 && (
                        <span className="font-mono text-[10px] text-text-muted/50">+{section.tech.length - 6} more</span>
                      )}
                    </div>
                  )}

                  {/* Clients (freelance section) */}
                  {section.clients && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.clients.map((client) => (
                        <div key={client.name} className="rounded-md border border-border bg-surface-2 p-3">
                          <div className="font-display text-sm font-semibold text-text">{client.name}</div>
                          <div className="font-mono text-[10px] text-accent mt-0.5">{client.meta}</div>
                          <p className="text-xs text-text-muted mt-1">{client.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {client.stack.split(' · ').map((s) => (
                              <span key={s} className="text-[9px] font-mono text-text-muted/60">{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

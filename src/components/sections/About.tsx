import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Globe2, Coffee, Zap } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { Terminal } from '../ui/Terminal'
import { terminalCommands } from '../../utils/terminalCommands'
import { cn } from '../../utils/cn'

const factIcons: Record<string, React.ReactNode> = {
  '📍': <MapPin size={16} />,
  '🎓': <GraduationCap size={16} />,
  '💼': <Briefcase size={16} />,
  '🌐': <Globe2 size={16} />,
  '🏆': <Zap size={16} />,
  '⚡': <Coffee size={16} />,
}

export default function About() {
  return (
    <div className="space-y-12">
      {/* Section heading */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">01.</span>
        <h2 id="about-heading" className="font-display text-2xl font-bold text-text">About Me</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Bio + Facts + Timeline */}
        <div className="space-y-8">
          {/* Bio paragraphs */}
          <div className="space-y-4">
            {portfolio.personal.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-text-muted leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Quick Facts */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {portfolio.personal.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2"
                >
                  <span className="flex-shrink-0 text-accent">{factIcons[fact.icon] || fact.icon}</span>
                  <span className="text-xs text-text-muted">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">My Journey</h3>
            <div className="relative">
              {/* Spine */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute left-[11px] top-2 w-0.5 bg-accent origin-top"
                style={{ height: `${(portfolio.personal.milestones.length / portfolio.personal.milestones.length) * 100}%` }}
              />

              <div className="space-y-6">
                {portfolio.personal.milestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <div
                      className={cn(
                        'absolute left-0 top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center',
                        i === portfolio.personal.milestones.length - 1
                          ? 'border-accent bg-accent'
                          : 'border-border bg-surface'
                      )}
                    >
                      <div className={cn('h-2 w-2 rounded-full', i === portfolio.personal.milestones.length - 1 ? 'bg-bg' : 'bg-accent/50')} />
                    </div>
                    <div className="font-mono text-xs text-accent">{milestone.year}</div>
                    <div className="font-display text-sm font-semibold text-text mt-0.5">{milestone.title}</div>
                    <div className="text-xs text-text-muted">{milestone.subtitle}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Terminal */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">Interactive Terminal</h3>
          <p className="text-sm text-text-muted mb-4">Explore my profile by typing commands below. Try <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-accent">help</kbd> to get started.</p>
          <Terminal commands={terminalCommands} />
        </div>
      </div>
    </div>
  )
}

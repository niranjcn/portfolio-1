import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Briefcase, Globe2, Coffee, Zap } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { Terminal } from '../ui/Terminal'
import { terminalCommands } from '../../utils/terminalCommands'
import { useTilt } from '../../hooks/useMousePosition'
import { cn } from '../../utils/cn'

const factIcons: Record<string, React.ReactNode> = {
  '📍': <MapPin size={16} />,
  '🎓': <GraduationCap size={16} />,
  '💼': <Briefcase size={16} />,
  '🌐': <Globe2 size={16} />,
  '🏆': <Zap size={16} />,
  '⚡': <Coffee size={16} />,
}

const easeOut = [0.22, 1, 0.36, 1] as const

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function About() {
  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">01.</span>
        <h2 id="about-heading" className="font-display text-3xl font-bold text-text">About Me</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Left: Bio — takes 3 columns */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            {portfolio.personal.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="text-text-muted leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Key stats row */}
          <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4">
            {[
              { value: '6', label: 'Production Products' },
              { value: '2', label: 'Research Papers' },
              { value: '98.5%', label: 'Best ML Accuracy' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface/50 p-4 text-center">
                <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Quick Facts */}
          <motion.div variants={staggerItem}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">Quick Facts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {portfolio.personal.quickFacts.map((fact) => (
                <motion.div
                  key={fact.label}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface/50 backdrop-blur-sm px-3 py-2 transition-all duration-[var(--transition-smooth)]"
                >
                  <span className="flex-shrink-0 text-accent">{factIcons[fact.icon] || fact.icon}</span>
                  <span className="text-xs text-text-muted">{fact.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Terminal + Milestones — takes 2 columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Terminal */}
          <motion.div variants={staggerItem}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">Interactive Terminal</h3>
            <p className="text-sm text-text-muted mb-4">Explore my profile by typing commands below. Try <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-xs text-accent">help</kbd>.</p>
            <div className="rounded-lg border border-border bg-surface overflow-hidden">
              <Terminal commands={terminalCommands} />
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div variants={staggerItem}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">My Journey</h3>
            <div className="relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute left-[11px] top-2 w-0.5 bg-gradient-to-b from-accent to-accent/20 origin-top"
                style={{ height: '100%' }}
              />
              <div className="space-y-5">
                {portfolio.personal.milestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative pl-10"
                  >
                    <div className={cn(
                      'absolute left-0 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-[var(--transition-smooth)]',
                      i === portfolio.personal.milestones.length - 1 ? 'border-accent bg-accent shadow-glow' : 'border-border bg-surface'
                    )}>
                      <div className={cn('h-1.5 w-1.5 rounded-full', i === portfolio.personal.milestones.length - 1 ? 'bg-bg' : 'bg-accent/50')} />
                    </div>
                    <div className="font-mono text-xs text-accent">{milestone.year}</div>
                    <div className="font-display text-sm font-semibold text-text mt-0.5">{milestone.title}</div>
                    <div className="text-xs text-text-muted">{milestone.subtitle}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

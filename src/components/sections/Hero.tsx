import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useMagnetic } from '../../hooks/useMousePosition'
import portfolio from '../../data/portfolioData'

const easeOut = [0.22, 1, 0.36, 1] as const

function MagneticButton({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  const ref = useRef<HTMLButtonElement>(null)
  const style = useMagnetic(ref, 0.25)
  return (
    <button ref={ref} className={className} style={style} {...props}>
      {children}
    </button>
  )
}

function MagneticLink({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const style = useMagnetic(ref, 0.2)
  return (
    <a ref={ref} className={className} style={style} {...props}>
      {children}
    </a>
  )
}

export default function Hero() {
  const { displayText } = useTypewriter(portfolio.personal.roles, 80, 50, 2000)
  const sectionRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const nameChars = portfolio.personal.name.split('')

  const stats = [
    { value: portfolio.projects.length, label: 'Products Shipped', suffix: '+' },
    { value: 30000, label: 'Profiles Processed', suffix: '+' },
    { value: 98.5, label: 'ML Accuracy', suffix: '%' },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh-hero pointer-events-none" />

      {/* Floating decorative orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl pointer-events-none"
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-dim px-3 py-1 font-mono text-xs text-accent">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name with char-by-char reveal */}
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-tight text-text overflow-hidden">
              <span className="text-text-muted/40 font-mono text-sm align-middle mr-3">I&apos;m</span>
              <motion.span
                className="inline-flex flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
                }}
              >
                {nameChars.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: -90 },
                      visible: {
                        opacity: 1, y: 0, rotateX: 0,
                        transition: { duration: 0.5, ease: easeOut },
                      },
                    }}
                    className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${char === 'C' || char === 'N' ? 'gradient-text' : ''}`}
                    style={{ perspective: '800px' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="mt-2 h-8"
            >
              <span className="font-mono text-lg text-accent">
                {displayText}
                <span className="ml-0.5 inline-block h-5 w-[2px] bg-accent animate-[cursor-blink_1s_step-end_infinite]" />
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-4 max-w-xl text-lg text-text-muted leading-relaxed"
            >
              {portfolio.personal.tagline}
            </motion.p>

            {/* CTA buttons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-accent px-6 py-3 font-medium text-bg transition-all hover:shadow-glow-lg"
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-[var(--transition-smooth)]" />
              </MagneticButton>
              <MagneticLink
                href={portfolio.personal.resumeUrl}
                download
                className="group inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-medium text-text-muted transition-all hover:text-text hover:border-text-muted hover:bg-surface/50"
              >
                <FileText size={18} className="transition-transform group-hover:scale-110" />
                Download CV
              </MagneticLink>
              <MagneticLink
                href={portfolio.social.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-3 text-text-muted hover:text-text transition-colors hover:bg-surface/50"
                aria-label="GitHub"
              >
                <GithubIcon size={22} />
              </MagneticLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl font-bold gradient-text">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Avatar with tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: easeOut }}
            className="flex-shrink-0"
          >
            <div ref={avatarRef} className="relative group">
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-accent/40 animate-[spin_20s_linear_infinite]" />
              <div className="relative m-3 h-64 w-64 overflow-hidden rounded-2xl bg-surface border border-border shadow-glow-lg transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={portfolio.personal.avatarUrl}
                  alt={portfolio.personal.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                    ;(e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center')
                    const fallback = document.createElement('span')
                    fallback.className = 'text-4xl text-text-muted font-display'
                    fallback.textContent = portfolio.personal.name.split(' ').map(n => n[0]).join('')
                    ;(e.target as HTMLImageElement).parentElement!.appendChild(fallback)
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={24} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import { useTypewriter } from '../../hooks/useTypewriter'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

export default function Hero() {
  const { displayText } = useTypewriter(portfolio.personal.roles, 80, 50, 2000)
  const sectionRef = useRef<HTMLElement>(null)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const stats = [
    { value: String(portfolio.projects.length), label: 'Products Shipped' },
    { value: '30K+', label: 'Profiles Processed' },
    { value: '98.5%', label: 'ML Accuracy' },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-dim/20 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)] py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Left column */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-dim px-3 py-1 font-mono text-xs text-accent">
                &lt; Hello World /&gt;
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-tight text-text"
            >
              I&apos;m{' '}
              <span className="text-accent">{portfolio.personal.name}</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="mt-2 h-8">
              <span className="font-mono text-lg text-accent">
                {displayText}
                <span className="ml-0.5 inline-block h-5 w-[2px] bg-accent animate-pulse" />
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-lg text-text-muted leading-relaxed">
              {portfolio.personal.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-bg transition-all hover:bg-accent/90 hover:shadow-glow"
              >
                View My Work
              </button>
              <a
                href={portfolio.personal.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-medium text-text-muted transition-all hover:text-text hover:border-text-muted"
              >
                <FileText size={18} />
                Download CV
              </a>
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-3 text-text-muted hover:text-text transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={22} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-2xl font-bold text-accent">{stat.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Avatar */}
          <motion.div
            variants={fadeUp}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-accent/40 animate-spin" style={{ animationDuration: '20s' }} />

              {/* Avatar */}
              <div className="relative m-3 h-64 w-64 overflow-hidden rounded-2xl bg-surface border border-border">
                <img
                  src={portfolio.personal.avatarUrl}
                  alt={portfolio.personal.name}
                  className="h-full w-full object-cover"
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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

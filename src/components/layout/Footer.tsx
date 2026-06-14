import { Heart, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import portfolio from '../../data/portfolioData'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/50 font-display text-sm font-bold text-accent transition-all duration-[var(--transition-smooth)] hover:shadow-glow hover:scale-105">
                NC
              </span>
              <span className="font-display text-sm font-bold text-text">Niranj C N</span>
            </div>
            <p className="text-xs text-text-muted/70 leading-relaxed max-w-xs">
              Software Engineer & ML Researcher. Building production systems that solve real problems.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">Navigate</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  className="text-xs text-text-muted/70 hover:text-accent transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted">Connect</h4>
            <div className="flex items-center gap-3">
              <a href={portfolio.social.github} target="_blank" rel="noreferrer"
                className="rounded-md p-2 text-text-muted hover:text-text hover:bg-surface-2 transition-all duration-[var(--transition-smooth)] hover:scale-110" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer"
                className="rounded-md p-2 text-text-muted hover:text-text hover:bg-surface-2 transition-all duration-[var(--transition-smooth)] hover:scale-110" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={`mailto:${portfolio.contact.email}`}
                className="rounded-md p-2 text-text-muted hover:text-text hover:bg-surface-2 transition-all duration-[var(--transition-smooth)] hover:scale-110" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-xs text-text-muted/60">
            <span>&copy; {year} Niranj C N</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Built with</span>
            <Heart size={12} className="text-error fill-error mx-0.5" />
            <span className="hidden md:inline">React · Tailwind · Framer Motion</span>
          </div>
          <div className="text-xs text-text-muted/40">
            Kannur, Kerala, India
          </div>
        </div>
      </div>
    </footer>
  )
}

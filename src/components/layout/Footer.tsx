import { Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import portfolio from '../../data/portfolioData'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)] py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/50 font-display text-sm font-bold text-accent">
              NC
            </span>
            <span className="text-sm text-text-muted">
              &copy; {year} Niranj C N
            </span>
          </div>

          {/* Center tagline */}
          <div className="flex items-center gap-1 text-sm text-text-muted">
            <span>Built with</span>
            <Heart size={14} className="text-error" />
            <span>by Niranj C N</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>

        {/* Secondary */}
        <div className="mt-6 text-center text-xs text-text-muted/60">
          React · Tailwind CSS · Framer Motion · TypeScript
        </div>
      </div>
    </footer>
  )
}

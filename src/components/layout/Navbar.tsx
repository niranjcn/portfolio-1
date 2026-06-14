import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, ChevronUp } from 'lucide-react'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certs' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(NAV_ITEMS.map((i) => i.id), 80)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileOpen(false)
      }
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[9997] transition-all duration-300',
          scrolled ? 'glass border-b border-border shadow-card' : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-[var(--container-pad)] py-3" aria-label="Main navigation">
          <button
            onClick={scrollToTop}
            className="group flex h-9 w-9 items-center justify-center rounded-md border-2 border-accent font-display text-base font-bold text-accent transition-all duration-[var(--transition-smooth)] hover:shadow-glow hover:scale-105"
            aria-label="Scroll to top"
          >
            <span className="group-hover:scale-110 transition-transform">NC</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-body transition-all duration-[var(--transition-smooth)]',
                    activeId === item.id
                      ? 'text-accent font-medium bg-accent-dim'
                      : 'text-text-muted hover:text-text hover:bg-surface/50'
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={portfolio.personal.resumeUrl}
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg transition-all hover:shadow-glow"
            >
              <span className="relative z-10 flex items-center gap-2"><FileText size={16} />Resume</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-[var(--transition-smooth)]" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-md p-2 text-text-muted hover:text-text hover:bg-surface transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[57px] z-[9996] glass md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={cn('text-xl font-display transition-colors', activeId === item.id ? 'text-accent' : 'text-text-muted hover:text-text')}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                href={portfolio.personal.resumeUrl}
                download
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg"
              >
                <FileText size={16} /> Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[9995] flex h-11 w-11 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/30 hover:bg-accent/90 transition-all duration-[var(--transition-smooth)]"
          aria-label="Back to top"
        >
          <ChevronUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

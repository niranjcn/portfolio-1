import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import portfolio from '../../data/portfolioData'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import { useTilt } from '../../hooks/useMousePosition'
import { cn } from '../../utils/cn'

const statusColors: Record<string, 'accent' | 'success' | 'warning' | 'error' | 'neutral'> = {
  'Research & Production': 'accent',
  'Research Demo': 'warning',
  Production: 'success',
  Delivered: 'neutral',
}

const ALL_TAG = 'All Projects'
const tags = [ALL_TAG, 'Web App', 'Open Source', 'API/Backend', 'Blockchain', 'Computer Vision']

const easeOut = [0.22, 1, 0.36, 1] as const

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function Projects() {
  const [activeTag, setActiveTag] = useState(ALL_TAG)
  const [selectedProject, setSelectedProject] = useState<typeof portfolio.projects[0] | null>(null)

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return portfolio.projects
    return portfolio.projects.filter((p) =>
      p.badges.some((b) => b.toLowerCase().includes(activeTag.toLowerCase())) ||
      p.stack.some((s) => s.toLowerCase().includes(activeTag.toLowerCase()))
    )
  }, [activeTag])

  const featured = portfolio.projects.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">03.</span>
        <h2 id="projects-heading" className="font-display text-3xl font-bold text-text">Featured Projects</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      {/* Filter bar */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              'relative rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-[var(--transition-smooth)]',
              activeTag === tag
                ? 'bg-accent text-bg border-accent'
                : 'border-border text-text-muted hover:text-text hover:border-text-muted'
            )}
            aria-pressed={activeTag === tag}
          >
            {tag}
            {activeTag === tag && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-accent -z-10"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Featured projects */}
      {activeTag === ALL_TAG && (
        <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} featured />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Regular projects grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-4', activeTag === ALL_TAG && 'mt-4')}
        >
          {regular.length === 0 ? (
            <p className="col-span-full text-center text-text-muted py-12">No projects match this filter.</p>
          ) : (
            regular.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title || ''}>
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </Modal>
    </motion.div>
  )
}

function TiltCard({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const tiltStyle = useTilt(ref, 8)
  return (
    <div ref={ref} onClick={onClick} style={tiltStyle} className={className}>
      {children}
    </div>
  )
}

function ProjectCard({ project, onClick, featured }: { project: typeof portfolio.projects[0]; onClick: () => void; featured?: boolean }) {
  const thumb = project.images?.[0]

  return (
    <TiltCard
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer rounded-lg border border-border bg-surface transition-all duration-[var(--transition-smooth)] hover:shadow-glow hover:shadow-card overflow-hidden',
        featured && 'md:col-span-1'
      )}
    >
      {/* Thumbnail */}
      {thumb && (
        <div className="relative h-40 overflow-hidden bg-surface-2">
          <img
            src={thumb}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant={statusColors[project.status] || 'neutral'} size="sm">
            {project.status}
          </Badge>
          <span className="font-mono text-[10px] text-text-muted">{project.year}</span>
        </div>

        <h3 className="font-display font-bold text-text group-hover:text-accent transition-colors duration-[var(--transition-smooth)]">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted line-clamp-2">{project.tagline}</p>

        {project.metrics && (
          <div className="mt-3 flex gap-4">
            {project.metrics.slice(0, 2).map(([value, label]) => (
              <div key={label}>
                <div className="font-display text-sm font-bold gradient-text">{value}</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted">{s}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="font-mono text-[10px] text-text-muted/50">+{project.stack.length - 4}</span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="text-text-muted hover:text-text transition-colors" aria-label="GitHub repository">
              <GithubIcon size={16} />
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="text-text-muted hover:text-text transition-colors" aria-label="Live site">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-smooth)] pointer-events-none bg-gradient-to-t from-accent-dim/10 to-transparent" />
    </TiltCard>
  )
}

function ProjectDetail({ project }: { project: typeof portfolio.projects[0] }) {
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [tab, setTab] = useState<'overview' | 'solution' | 'challenges' | 'results'>('overview')

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'solution' as const, label: 'Solution' },
    { id: 'challenges' as const, label: 'Challenges' },
    { id: 'results' as const, label: 'Results' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Badge variant={statusColors[project.status] || 'neutral'} size="sm">{project.status}</Badge>
        <span className="font-mono text-xs text-text-muted">{project.year}</span>
      </div>

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface-2">
            <img
              src={project.images[galleryIdx]}
              alt={`${project.title} screenshot ${galleryIdx + 1}`}
              className="w-full h-auto max-h-80 object-contain"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          {project.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIdx(i)}
                  className={cn(
                    'flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all',
                    i === galleryIdx ? 'border-accent opacity-100' : 'border-border opacity-60 hover:opacity-100'
                  )}
                >
                  <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Case study tabs */}
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2 font-mono text-xs transition-all border-b-2 -mb-px',
              tab === t.id ? 'text-accent border-accent' : 'text-text-muted border-transparent hover:text-text'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'overview' && (
            <div className="space-y-4">
              <p className="text-text-muted leading-relaxed">{project.description}</p>
              {project.longDescription.map((para, i) => (
                <p key={i} className="text-sm text-text-muted leading-relaxed">{para}</p>
              ))}
            </div>
          )}
          {tab === 'solution' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Problem</h4>
                <p className="text-sm text-text-muted leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Solution</h4>
                <p className="text-sm text-text-muted leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded bg-surface-2 px-2.5 py-1 font-mono text-xs text-text">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === 'challenges' && project.challenges && (
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2 text-sm text-text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning" />
                  {c}
                </motion.li>
              ))}
            </ul>
          )}
          {tab === 'results' && (
            <div className="space-y-4">
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map(([value, label]) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-md border border-accent/20 bg-accent-dim p-3 text-center"
                    >
                      <div className="font-display text-xl font-bold gradient-text">{value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
              {project.highlights.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Key Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-2 text-sm text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              {project.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.badges.map((b) => (
                    <span key={b} className="rounded-full border border-accent/30 bg-accent-dim px-3 py-1 font-mono text-[10px] text-accent">{b}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 pt-2">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-text hover:border-accent hover:text-accent transition-all duration-[var(--transition-smooth)]">
            <GithubIcon size={16} className="transition-transform group-hover:scale-110" /> View Source
          </a>
        )}
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-bg hover:bg-accent/90 transition-all duration-[var(--transition-smooth)]">
            <ExternalLink size={16} className="transition-transform group-hover:scale-110" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}

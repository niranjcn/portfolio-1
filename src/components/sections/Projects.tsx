import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/Icons'
import portfolio from '../../data/portfolioData'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'
import { cn } from '../../utils/cn'

const statusColors: Record<string, 'accent' | 'success' | 'warning' | 'error' | 'neutral'> = {
  'Research & Production': 'accent',
  'Research Demo': 'warning',
  Production: 'success',
  Delivered: 'neutral',
}

const ALL_TAG = 'All'
const tags = [ALL_TAG, 'Web App', 'Open Source', 'API/Backend', 'UI/UX']

export default function Projects() {
  const [activeTag, setActiveTag] = useState(ALL_TAG)
  const [selectedProject, setSelectedProject] = useState<typeof portfolio.projects[0] | null>(null)

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return portfolio.projects
    return portfolio.projects.filter((p) => p.badges.some((b) => b.toLowerCase().includes(activeTag.toLowerCase())))
  }, [activeTag])

  const featured = portfolio.projects.filter((p) => p.featured)
  const regular = filtered.filter((p) => !p.featured)

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">03.</span>
        <h2 id="projects-heading" className="font-display text-2xl font-bold text-text">Projects</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              'rounded-full border px-4 py-1.5 font-mono text-xs transition-all',
              activeTag === tag
                ? 'bg-accent text-bg border-accent'
                : 'border-border text-text-muted hover:text-text hover:border-text-muted'
            )}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Featured projects */}
      {activeTag === ALL_TAG && (
        <div className="grid md:grid-cols-3 gap-4">
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
        </div>
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
    </div>
  )
}

function ProjectCard({ project, onClick, featured }: { project: typeof portfolio.projects[0]; onClick: () => void; featured?: boolean }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer rounded-lg border border-border bg-surface p-5 transition-all duration-base hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow',
        featured && 'md:col-span-1'
      )}
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant={statusColors[project.status] || 'neutral'} size="sm">
          {project.status}
        </Badge>
        <span className="font-mono text-[10px] text-text-muted">{project.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-text group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-text-muted line-clamp-2">{project.tagline}</p>

      {/* Metrics */}
      {project.metrics && (
        <div className="mt-3 flex gap-4">
          {project.metrics.slice(0, 2).map(([value, label]) => (
            <div key={label}>
              <div className="font-display text-sm font-bold text-accent">{value}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-1">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted">{s}</span>
        ))}
        {project.stack.length > 4 && (
          <span className="font-mono text-[10px] text-text-muted/50">+{project.stack.length - 4}</span>
        )}
      </div>

      {/* Links */}
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
  )
}

function ProjectDetail({ project }: { project: typeof portfolio.projects[0] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant={statusColors[project.status] || 'neutral'} size="sm">{project.status}</Badge>
        <span className="font-mono text-xs text-text-muted">{project.year}</span>
      </div>

      <p className="text-text-muted leading-relaxed">{project.description}</p>

      {project.longDescription.map((para, i) => (
        <p key={i} className="text-sm text-text-muted leading-relaxed">{para}</p>
      ))}

      {project.metrics && (
        <div className="grid grid-cols-3 gap-3">
          {project.metrics.map(([value, label]) => (
            <div key={label} className="rounded-md border border-accent/20 bg-accent-dim p-3 text-center">
              <div className="font-display text-xl font-bold text-accent">{value}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      )}

      {project.highlights.length > 0 && (
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Key Highlights</h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded bg-surface-2 px-2.5 py-1 font-mono text-xs text-text">{s}</span>
          ))}
        </div>
      </div>

      {project.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.badges.map((b) => (
            <span key={b} className="rounded-full border border-accent/30 bg-accent-dim px-3 py-1 font-mono text-[10px] text-accent">{b}</span>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-text hover:border-accent hover:text-accent transition-all">
            <GithubIcon size={16} /> View Source
          </a>
        )}
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm text-bg hover:bg-accent/90 transition-all">
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

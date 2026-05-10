import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../data/content.js'

const overlayMotion = {
  initial: { y: '100vh' },
  animate: { y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { y: '100vh', transition: { duration: 0.4, ease: 'easeIn' } },
}

const STATUS_COLOR = {
  'Research & Production': '#FF6B00',
  'Research Demo': '#8B5CF6',
  Production: '#10B981',
  Delivered: '#3B82F6',
}

function ProjectBanner({ project }) {
  const accent = '#FF6B00'
  const stroke = '#0D0D0D'
  const type = project.illustration

  const renderSvg = () => {
    switch (type) {
      case 'merkle':
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            <motion.path d="M80 40 L200 140 L320 40 L440 140 L520 40" stroke={accent} strokeWidth="2"
              strokeDasharray="6 6" initial={{ strokeDashoffset: 120 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1.2 }} />
            <path d="M200 140 L320 200 L440 140" stroke={stroke} strokeWidth="1.5" />
            {[80, 320, 520].map((x) => <circle key={x} cx={x} cy="40" r="8" fill={accent} />)}
            {[200, 440].map((x) => <circle key={x} cx={x} cy="140" r="8" fill={accent} opacity={0.7} />)}
            <circle cx="320" cy="200" r="10" fill={accent} />
          </svg>
        )
      case 'camera':
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            <rect x="120" y="40" width="360" height="140" rx="12" stroke={stroke} strokeWidth="2" />
            <circle cx="300" cy="110" r="50" stroke={accent} strokeWidth="3" />
            <circle cx="300" cy="110" r="25" stroke={accent} strokeWidth="1.5" opacity={0.5} />
            <motion.path d="M80 200 H520" stroke={accent} strokeWidth="2" strokeDasharray="8 8"
              initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1.1 }} />
          </svg>
        )
      case 'network':
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            <path d="M80 60 L300 110 L520 60" stroke={stroke} strokeWidth="1.5" />
            <path d="M120 170 L300 110 L480 170" stroke={stroke} strokeWidth="1.5" />
            {[80, 520].map((x) => <circle key={x} cx={x} cy="60" r="8" fill={accent} />)}
            <circle cx="300" cy="110" r="10" fill={accent} />
            {[120, 480].map((x) => <circle key={x} cx={x} cy="170" r="8" fill={accent} opacity={0.7} />)}
          </svg>
        )
      case 'house':
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            <path d="M140 130 L300 40 L460 130" stroke={stroke} strokeWidth="2" />
            <rect x="190" y="130" width="220" height="70" stroke={stroke} strokeWidth="2" />
            <rect x="260" y="150" width="50" height="50" stroke={accent} strokeWidth="1.5" />
            <motion.path d="M120 190 H480" stroke={accent} strokeWidth="2" strokeDasharray="8 8"
              initial={{ strokeDashoffset: 120 }} whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1.1 }} />
          </svg>
        )
      case 'grid':
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 9 }).map((__, c) => (
                <rect key={`${r}-${c}`} x={80 + c * 45} y={50 + r * 28} width="28" height="18"
                  stroke={r === 2 && c === 4 ? accent : stroke} strokeWidth={r === 2 && c === 4 ? 2 : 1}
                  fill={r === 2 && c === 4 ? `${accent}22` : 'none'} />
              ))
            )}
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 600 220" className="h-full w-full" fill="none">
            {[0, 14, 28].map((offset, i) => (
              <rect key={offset} x={140 + offset} y={40 + offset} width="320" height="130"
                stroke={i === 0 ? accent : stroke} strokeWidth="2" />
            ))}
          </svg>
        )
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink/12"
      style={{ height: '160px', background: project.featured ? '#0D0D0D' : 'rgba(13,13,13,0.03)' }}>
      {renderSvg()}
    </div>
  )
}

function ProjectDetail({ project, onBack }) {
  const statusColor = STATUS_COLOR[project.status] || '#FF6B00'

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <button type="button" onClick={onBack}
        className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-orange-500 transition-colors">
        ← Back to all projects
      </button>
      {project.featured && (
        <div className="mb-5 bg-orange-500 px-4 py-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-ink">
          {siteContent.projects.featuredBanner}
        </div>
      )}
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500/70 mb-2">{project.number}</div>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight"
        style={{ fontFamily: 'Syne, sans-serif' }}>{project.title}</h2>
      <p className="mt-3 font-body text-sm md:text-base italic text-ink/60">{project.tagline}</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: statusColor }}>
          <span className="w-2 h-2 rounded-full" style={{ background: statusColor }} />
          {project.status}
        </div>
        <span className="font-mono text-[9px] text-ink/35">{project.year}</span>
      </div>
      <div className="mt-6"><ProjectBanner project={project} /></div>
      {project.metrics?.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {project.metrics.map(([value, label]) => (
            <div key={label} className="rounded-xl border border-orange-500/25 bg-orange-500/5 px-3 py-4 text-center">
              <div className="font-display text-xl md:text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/50">{label}</div>
            </div>
          ))}
        </div>
      )}
      {project.longDescription ? (
        <div className="mt-6 space-y-4">
          {project.longDescription.map((para, i) => (
            <p key={i} className="font-body text-sm leading-relaxed text-ink/75">{para}</p>
          ))}
        </div>
      ) : (
        <p className="mt-6 font-body text-sm leading-relaxed text-ink/75">{project.description}</p>
      )}
      {project.highlights?.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/35">Project Highlights</div>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-ink/70">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />{h}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6">
        <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/35">Full Tech Stack</div>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {(project.stack || project.stackLine.split(' · ')).map((s) => (
            <span key={s} className="rounded-lg bg-ink px-2.5 py-1 md:px-3 md:py-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-cream">{s}</span>
          ))}
        </div>
      </div>
      {project.badges?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
          {project.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-orange-500">{badge}</span>
          ))}
        </div>
      )}
      <div className="mt-7 flex flex-wrap items-center gap-3 md:gap-6 font-mono text-[10px] uppercase tracking-[0.3em]">
        <a href={project.links.github} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-ink/20 hover:border-orange-500 hover:text-orange-500 transition-all">
          {siteContent.projects.links.githubLabel}
        </a>
        <a href={project.links.live} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 bg-orange-500 px-4 py-2 text-ink hover:bg-orange-600 transition-colors">
          {siteContent.projects.links.liveLabel}
        </a>
      </div>
    </motion.div>
  )
}

function ProjectsOverlay({ open, onClose }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = siteContent.projects.list

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[9999] overflow-y-auto bg-cream text-ink" {...overlayMotion}>
          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-cream/95 backdrop-blur-sm px-4 sm:px-6 md:px-10 py-4 md:py-5">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              {selectedProject && (
                <button type="button" onClick={() => setSelectedProject(null)}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-orange-500 transition-colors flex-shrink-0">
                  ← All
                </button>
              )}
              <div className="font-display text-sm md:text-lg font-bold tracking-[0.2em] md:tracking-[0.3em] truncate"
                style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>
                {selectedProject ? selectedProject.title.slice(0, 20) + '…' : siteContent.projects.overlayTitle}
              </div>
            </div>
            <button type="button" data-magnetic onClick={() => { setSelectedProject(null); onClose() }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 hover:text-orange-500 transition-colors flex-shrink-0 ml-4">
              {siteContent.projects.closeLabel}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {selectedProject ? (
              <ProjectDetail key="detail" project={selectedProject} onBack={() => setSelectedProject(null)} />
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 py-8 md:py-10">
                {projects.map((project, i) => (
                  <motion.article key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border-b border-ink/8 py-8 md:py-10 last:border-b-0">
                    {project.featured && (
                      <div className="mb-4 bg-orange-500 px-4 py-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-ink">
                        {siteContent.projects.featuredBanner}
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                      <div className="flex-1">
                        <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-orange-500/60 mb-1">
                          {project.number} · {project.year}
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-ink leading-tight"
                          style={{ fontFamily: 'Syne, sans-serif' }}>{project.title}</h3>
                        <p className="mt-2 font-body text-sm italic text-ink/55">{project.tagline}</p>
                        <p className="mt-3 font-body text-sm leading-relaxed text-ink/70 line-clamp-3">{project.description}</p>
                        {project.metrics?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-4 md:gap-6">
                            {project.metrics.map(([value, label]) => (
                              <div key={label}>
                                <div className="font-display text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
                                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/45">{label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {(project.stack || project.stackLine.split(' · ')).slice(0, 5).map((s) => (
                            <span key={s} className="rounded bg-ink/8 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/55">{s}</span>
                          ))}
                        </div>
                        {project.badges?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.badges.map((b) => (
                              <span key={b} className="rounded-full border border-orange-500/30 bg-orange-500/8 px-3 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-orange-500">{b}</span>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex items-center gap-4">
                          <button type="button" onClick={() => setSelectedProject(project)}
                            className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500 hover:underline">
                            VIEW FULL DETAILS →
                          </button>
                          <a href={project.links.github} target="_blank" rel="noreferrer"
                            className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 hover:text-ink transition-colors">
                            {siteContent.projects.links.githubLabel}
                          </a>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-full md:w-[200px] lg:w-[220px]">
                        <ProjectBanner project={project} />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectsOverlay

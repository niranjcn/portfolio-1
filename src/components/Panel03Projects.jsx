import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../data/content.js'

const STATUS_COLOR = {
  'Research & Production': '#FF6B00',
  'Research Demo': '#8B5CF6',
  Production: '#10B981',
  Delivered: '#3B82F6',
}

function ProjectCard({ project, isActive, onClick }) {
  const statusColor = STATUS_COLOR[project.status] || '#FF6B00'
  return (
    <motion.button type="button" layout onClick={onClick} whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group w-full text-left rounded-lg border transition-all duration-300 ${isActive ? 'border-orange-500 bg-gradient-to-r from-orange-500/5 to-transparent' : 'border-ink/10 bg-transparent hover:border-ink/25'
        }`} style={{ padding: '12px 14px' }}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 font-mono text-[10px] tracking-[0.3em] flex-shrink-0"
          style={{ color: isActive ? '#FF6B00' : 'rgba(13,13,13,0.35)' }}>{project.number}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display text-xs sm:text-sm font-semibold leading-tight truncate"
            style={{ fontFamily: 'Syne, sans-serif', color: isActive ? '#0D0D0D' : 'rgba(13,13,13,0.75)' }}>
            {project.title}
          </div>
          <div className="mt-0.5 text-[10px] text-ink/50 truncate">{project.tagline}</div>
          {isActive && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: statusColor }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
                {project.status}
              </div>
              {project.year && <span className="font-mono text-[9px] text-ink/40">{project.year}</span>}
            </motion.div>
          )}
        </div>
        {project.featured && <span className="flex-shrink-0 text-[10px]">⭐</span>}
      </div>
    </motion.button>
  )
}

function ProjectDetail({ project }) {
  if (!project) return null
  return (
    <AnimatePresence mode="wait">
      <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="flex flex-col gap-4 h-full">
        <div>
          {project.featured && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink">⭐ Best Paper · RAET&apos;26</span>
            </motion.div>
          )}
          <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-ink"
            style={{ fontFamily: 'Syne, sans-serif' }}>{project.title}</div>
          <div className="mt-2 font-body text-xs sm:text-sm italic text-ink/60">{project.tagline}</div>
        </div>
        {project.metrics?.length > 0 && (
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {project.metrics.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-orange-500/25 bg-orange-500/5 px-2 py-2 md:px-3 md:py-3 text-center">
                <div className="font-display text-base md:text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
                <div className="mt-0.5 font-mono text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-ink/55">{label}</div>
              </div>
            ))}
          </div>
        )}
        <p className="font-body text-xs sm:text-sm leading-relaxed text-ink/75">{project.description}</p>
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/40">Tech Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {(project.stack || project.stackLine.split(' · ')).map((s) => (
              <span key={s} className="rounded bg-ink px-2 py-0.5 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-cream">{s}</span>
            ))}
          </div>
        </div>
        {project.badges?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.badges.map((b) => (
              <span key={b} className="rounded border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-orange-500">{b}</span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em]">
          <a href={project.links.github} className="text-ink/60 orange-underline hover:text-orange-500 transition-colors" target="_blank" rel="noreferrer">
            {siteContent.projects.links.githubLabel}
          </a>
          <a href={project.links.live} className="text-ink/60 orange-underline hover:text-orange-500 transition-colors" target="_blank" rel="noreferrer">
            {siteContent.projects.links.liveLabel}
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Panel03Projects({ onOpenOverlay }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'detail'
  const projects = siteContent.projects.list
  const active = projects[activeIndex]

  const handleSelect = (i) => {
    setActiveIndex(i)
    setMobileView('detail')
  }

  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />

      {/* MOBILE: toggle list/detail */}
      <div className="flex md:hidden flex-col w-full min-h-screen">
        {mobileView === 'list' ? (
          <div className="flex flex-col flex-1 px-5 pt-16 pb-8">
            <div className="mb-4">
              <div className="section-label">{siteContent.projects.label}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/35">tap to explore</div>
            </div>
            <div className="space-y-2 flex-1">
              {projects.map((p, i) => (
                <ProjectCard key={p.title} project={p} isActive={false} onClick={() => handleSelect(i)} />
              ))}
            </div>
            <button type="button" onClick={onOpenOverlay}
              className="mt-6 w-full bg-orange-500 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink text-center">
              {siteContent.projects.teaserButton}
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 px-5 pt-16 pb-8 overflow-y-auto">
            <button type="button" onClick={() => setMobileView('list')}
              className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-orange-500">
              ← All Projects
            </button>
            <ProjectDetail project={active} />
          </div>
        )}
      </div>

      {/* DESKTOP: side-by-side */}
      <div className="hidden md:flex h-full w-full">
        <div className="flex w-[38%] flex-col justify-center gap-2 pl-10 lg:pl-14 pr-4 lg:pr-6 border-r border-ink/8">
          <div className="mb-4">
            <div className="section-label">{siteContent.projects.label}</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/35">{siteContent.projects.ghostHint}</div>
          </div>
          <div className="space-y-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} isActive={i === activeIndex} onClick={() => setActiveIndex(i)} />
            ))}
          </div>
          <motion.button type="button" data-magnetic onClick={onOpenOverlay}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-5 w-full bg-orange-500 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink text-center">
            {siteContent.projects.teaserButton}
          </motion.button>
        </div>

        <div className="flex w-[62%] flex-col justify-center px-8 lg:px-12 py-10 relative">
          <div className="absolute right-8 top-8 select-none pointer-events-none font-hero text-[80px] lg:text-[120px] leading-none opacity-[0.04]"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{active.number}</div>
          <ProjectDetail project={active} />
        </div>
      </div>

      <div className="absolute bottom-6 right-8 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/25 hidden md:block">
        {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
      </div>
    </section>
  )
}

export default Panel03Projects

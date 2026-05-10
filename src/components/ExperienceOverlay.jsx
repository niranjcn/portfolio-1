import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '../data/content.js'

const overlayMotion = {
  initial: { y: '100vh' },
  animate: { y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { y: '100vh', transition: { duration: 0.4, ease: 'easeIn' } },
}

const TYPE_COLOR = {
  Internship: '#FF6B00',
  Freelance: '#3B82F6',
}

function ClientCard({ client }) {
  return (
    <motion.div whileHover={{ y: -3, borderColor: 'rgba(255,107,0,0.5)' }}
      className="rounded-xl border border-cream/10 bg-[#181818] px-4 py-3 transition-all duration-200">
      <div className="font-display text-sm font-bold text-cream" style={{ fontFamily: 'Syne, sans-serif' }}>{client.name}</div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500">{client.meta}</div>
      <p className="mt-2 text-xs text-cream/60">{client.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {client.stack.split(' · ').map((s) => (
          <span key={s} className="rounded bg-cream/8 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-cream/50">{s}</span>
        ))}
      </div>
    </motion.div>
  )
}

function SectionDetail({ section, onBack }) {
  const typeColor = TYPE_COLOR[section.type] || '#FF6B00'

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <button type="button" onClick={onBack}
        className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-orange-500 transition-colors">
        ← Back to experience
      </button>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="rounded-full px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ background: `${typeColor}22`, color: typeColor }}>{section.type}</span>
        <span className="font-mono text-[9px] text-cream/35">{section.period}</span>
        {section.location && <span className="font-mono text-[9px] text-cream/35">· {section.location}</span>}
      </div>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cream leading-tight"
        style={{ fontFamily: 'Syne, sans-serif' }}>{section.company}</h2>
      <p className="mt-2 font-body text-sm md:text-base italic" style={{ color: '#FF6B00' }}>{section.role}</p>
      {section.summary && <p className="mt-4 font-body text-sm leading-relaxed text-cream/65">{section.summary}</p>}
      {section.metrics && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {section.metrics.map(([value, label]) => (
            <div key={label} className="rounded-xl border border-orange-500/20 bg-orange-500/8 px-3 py-4 text-center">
              <div className="font-display text-xl md:text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-cream/45">{label}</div>
            </div>
          ))}
        </div>
      )}
      {section.highlights?.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/30">Key Highlights</div>
          <ul className="space-y-2">
            {section.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-cream/70">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />{h}
              </li>
            ))}
          </ul>
        </div>
      )}
      {section.responsibilities && (
        <div className="mt-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/30">Responsibilities</div>
          <ul className="space-y-2.5">
            {section.responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 font-body text-sm leading-relaxed text-cream/65">
                <span className="flex-shrink-0 text-orange-500 mt-0.5">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {section.tech && (
        <div className="mt-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/30">Full Stack Used</div>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {section.tech.map((t) => (
              <span key={t} className="rounded-lg bg-cream/8 px-2.5 py-1 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-cream">{t}</span>
            ))}
          </div>
        </div>
      )}
      {section.clients && (
        <div className="mt-6">
          <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-cream/30">{section.subtitle}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.clients.map((c) => <ClientCard key={c.name} client={c} />)}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ExperienceOverlay({ open, onClose, onContact }) {
  const [selectedSection, setSelectedSection] = useState(null)
  const sections = siteContent.experience.sections

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[9999] overflow-y-auto bg-ink text-cream" {...overlayMotion}>
          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream/10 bg-ink/95 backdrop-blur-sm px-4 sm:px-6 md:px-10 py-4 md:py-5">
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              {selectedSection && (
                <button type="button" onClick={() => setSelectedSection(null)}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-orange-500 transition-colors flex-shrink-0">
                  ← All
                </button>
              )}
              <div className="font-display text-sm md:text-lg font-bold tracking-[0.2em] md:tracking-[0.3em] text-cream truncate"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {siteContent.experience.overlayTitle}
              </div>
            </div>
            <button type="button" data-magnetic onClick={() => { setSelectedSection(null); onClose() }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50 hover:text-orange-500 transition-colors flex-shrink-0 ml-4">
              {siteContent.experience.closeLabel}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {selectedSection ? (
              <SectionDetail key="detail" section={selectedSection} onBack={() => setSelectedSection(null)} />
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10 py-8 md:py-12">
                {sections.map((section, i) => (
                  <motion.div key={section.company} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="border-b border-cream/8 py-8 md:py-10 last:border-b-0">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="rounded-full px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em]"
                        style={{ background: `${TYPE_COLOR[section.type] || '#FF6B00'}22`, color: TYPE_COLOR[section.type] || '#FF6B00' }}>
                        {section.type}
                      </span>
                      <span className="font-mono text-[9px] text-cream/35">{section.period}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-3xl font-bold text-cream" style={{ fontFamily: 'Syne, sans-serif' }}>{section.company}</h3>
                    <p className="mt-1 font-body text-sm italic text-orange-500">{section.role}</p>
                    {section.summary && <p className="mt-3 font-body text-sm leading-relaxed text-cream/60">{section.summary}</p>}
                    {section.metrics && (
                      <div className="mt-5 flex flex-wrap gap-6 md:gap-8">
                        {section.metrics.map(([value, label]) => (
                          <div key={label}>
                            <div className="font-display text-xl md:text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
                            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-cream/40">{label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.tech && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {section.tech.slice(0, 6).map((t) => (
                          <span key={t} className="rounded bg-cream/8 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-cream/50">{t}</span>
                        ))}
                        {section.tech.length > 6 && <span className="font-mono text-[8px] text-cream/30">+{section.tech.length - 6} more</span>}
                      </div>
                    )}
                    {section.clients && (
                      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/40">{section.subtitle}</div>
                    )}
                    <button type="button" onClick={() => setSelectedSection(section)}
                      className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-orange-500 hover:underline">
                      VIEW FULL DETAILS →
                    </button>
                  </motion.div>
                ))}
                <div className="mt-6 rounded-xl bg-orange-500 px-6 md:px-8 py-6 md:py-8 text-center text-ink">
                  <div className="font-display text-lg md:text-xl font-bold tracking-[0.3em]"
                    style={{ fontFamily: 'Syne, sans-serif' }}>{siteContent.experience.cta.title}</div>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 font-mono text-xs uppercase tracking-[0.3em]">
                    <a data-magnetic href={siteContent.experience.cta.resumeFile} download
                      className="border border-ink/30 px-4 py-2 hover:bg-ink hover:text-cream transition-colors">
                      {siteContent.experience.cta.resume}
                    </a>
                    <button type="button" data-magnetic onClick={onContact}
                      className="bg-ink text-cream px-4 py-2 hover:bg-[#333] transition-colors">
                      {siteContent.experience.cta.contact}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ExperienceOverlay

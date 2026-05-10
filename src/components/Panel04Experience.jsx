import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '../data/content.js'

const { experience } = siteContent

function ClientPill({ client }) {
  return (
    <motion.div whileHover={{ y: -3, borderColor: 'rgba(255,107,0,0.5)' }}
      className="rounded-lg border border-ink/10 bg-ink/[0.02] px-3 py-3 transition-all duration-200 cursor-default">
      <div className="font-display text-sm font-bold text-ink" style={{ fontFamily: 'Syne, sans-serif' }}>{client.name}</div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500">{client.meta}</div>
      <div className="mt-1.5 text-xs text-ink/60">{client.description}</div>
      <div className="mt-2 flex flex-wrap gap-1">
        {client.stack.split(' · ').map((s) => (
          <span key={s} className="rounded bg-ink/8 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/55">{s}</span>
        ))}
      </div>
    </motion.div>
  )
}

function SectionDetail({ section }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-ink" style={{ fontFamily: 'Syne, sans-serif' }}>{section.company}</div>
        <div className="mt-1.5 font-body text-xs sm:text-sm italic text-orange-500">{section.role}</div>
        {section.summary && <p className="mt-3 font-body text-xs sm:text-sm leading-relaxed text-ink/65">{section.summary}</p>}
      </div>
      {section.metrics && (
        <div className="grid grid-cols-3 gap-3">
          {section.metrics.map(([value, label]) => (
            <div key={label} className="rounded-lg border border-orange-500/20 bg-orange-500/5 px-2 py-3 md:px-3 md:py-4 text-center">
              <div className="font-display text-lg md:text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#FF6B00' }}>{value}</div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/50">{label}</div>
            </div>
          ))}
        </div>
      )}
      {section.responsibilities && (
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/35">Key Contributions</div>
          <ul className="space-y-2">
            {section.responsibilities.map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3 font-body text-xs sm:text-sm leading-relaxed text-ink/70">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
      {section.tech && (
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/35">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {section.tech.map((t) => (
              <span key={t} className="rounded bg-ink px-2 py-0.5 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-cream">{t}</span>
            ))}
          </div>
        </div>
      )}
      {section.clients && (
        <div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ink/35">{section.subtitle}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.clients.map((c) => <ClientPill key={c.name} client={c} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function Panel04Experience({ onOpenOverlay }) {
  const [activeSection, setActiveSection] = useState(0)
  const sections = experience.sections

  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />

      {/* MOBILE layout: stacked */}
      <div className="flex md:hidden flex-col w-full min-h-screen px-5 pt-16 pb-8 overflow-y-auto">
        <div className="section-label mb-4">{experience.label}</div>
        {/* Tab buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {sections.map((sec, i) => (
            <button key={sec.company} type="button" onClick={() => setActiveSection(i)}
              className={`flex-shrink-0 rounded-lg px-4 py-2 border text-xs font-mono uppercase tracking-[0.2em] transition-all ${
                i === activeSection ? 'border-orange-500 bg-orange-500/5 text-ink' : 'border-ink/10 text-ink/50'}`}>
              {sec.type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SectionDetail section={sections[activeSection]} />
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={onOpenOverlay}
          className="mt-8 w-full bg-ink py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream text-center hover:bg-orange-500 transition-colors">
          {experience.teaserButton}
        </button>
      </div>

      {/* DESKTOP layout: side-by-side */}
      <div className="hidden md:flex h-full w-full">
        <div className="flex w-[30%] flex-col justify-center border-r border-ink/8 pl-10 lg:pl-14 pr-6 lg:pr-8">
          <div className="section-label mb-5">{experience.label}</div>
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <motion.button key={sec.company} type="button" onClick={() => setActiveSection(i)}
                whileHover={{ x: 4 }}
                className={`group w-full text-left rounded-lg px-3 lg:px-4 py-3 lg:py-4 border transition-all duration-300 ${
                  i === activeSection ? 'border-orange-500 bg-orange-500/5' : 'border-ink/8 hover:border-ink/20'}`}>
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: i === activeSection ? '#FF6B00' : 'rgba(13,13,13,0.2)' }} />
                  <div>
                    <div className="font-display text-xs lg:text-sm font-bold leading-tight"
                      style={{ fontFamily: 'Syne, sans-serif', color: i === activeSection ? '#0D0D0D' : 'rgba(13,13,13,0.5)' }}>
                      {sec.company}
                    </div>
                    <div className="mt-0.5 font-mono text-[8px] lg:text-[9px] uppercase tracking-[0.25em] text-ink/40">
                      {sec.type} · {sec.period}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-ink/[0.03] border border-ink/8 px-3 lg:px-4 py-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.4em] text-orange-500 mb-1">Education</div>
            <div className="font-body text-[9px] lg:text-[10px] text-ink/55 leading-relaxed">
              B.Tech CSE · St. Thomas College · 2022–2026 · CGPA 8.0
            </div>
          </div>
          <motion.button type="button" data-magnetic onClick={onOpenOverlay}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-5 w-full bg-ink py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream text-center hover:bg-orange-500 transition-colors duration-300">
            {experience.teaserButton}
          </motion.button>
        </div>

        <div className="flex w-[70%] flex-col justify-center px-8 lg:px-12 py-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <SectionDetail section={sections[activeSection]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Panel04Experience

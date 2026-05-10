import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '../data/content.js'

const { achievements } = siteContent

function AchievementCard({ item, index, isActive, onClick }) {
  return (
    <motion.button type="button" onClick={onClick}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className={`w-full text-left rounded-xl border transition-all duration-300 p-4 ${
        isActive
          ? 'border-orange-500 bg-gradient-to-br from-orange-500/8 to-transparent shadow-[0_0_0_1px_rgba(255,107,0,0.3)]'
          : item.highlight
          ? 'border-orange-500/40 bg-orange-500/3 hover:border-orange-500/70'
          : 'border-ink/10 bg-transparent hover:border-orange-500/30'
      }`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-xl lg:text-2xl"
          style={{ background: isActive ? 'rgba(255,107,0,0.15)' : item.highlight ? 'rgba(255,107,0,0.08)' : 'rgba(13,13,13,0.04)' }}>
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-display text-xs sm:text-sm font-bold leading-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: isActive ? '#0D0D0D' : 'rgba(13,13,13,0.8)' }}>
              {item.title}
            </div>
            {item.highlight && (
              <span className="badge-shimmer font-mono text-[8px] uppercase tracking-[0.3em] flex-shrink-0">FEATURED</span>
            )}
          </div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-orange-500">{item.year}</div>
          <div className="mt-0.5 text-[10px] text-ink/50 truncate">{item.org}</div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-ink/6 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/50">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function Panel06Achievements() {
  const [activeId, setActiveId] = useState(achievements.list[0].id)
  const activeItem = achievements.list.find((a) => a.id === activeId)

  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      <div className="absolute right-6 top-6 select-none pointer-events-none font-hero text-[60px] md:text-[100px] leading-none opacity-[0.035]"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}>ACHV</div>
      <div className="absolute left-0 top-[15%] h-[70%] w-[3px] bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50" />

      {/* MOBILE: cards only, no side panel */}
      <div className="flex md:hidden flex-col w-full min-h-screen px-5 pt-16 pb-8 overflow-y-auto">
        <div className="mb-5">
          <div className="section-label">{achievements.label}</div>
          <div className="mt-1 font-body text-xs text-ink/45">{achievements.subtitle}</div>
        </div>
        <div className="space-y-3">
          {achievements.list.map((item, i) => (
            <div key={item.id}>
              <AchievementCard item={item} index={i} isActive={activeId === item.id}
                onClick={() => setActiveId(activeId === item.id ? null : item.id)} />
              {/* Inline expanded detail on mobile */}
              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="overflow-hidden">
                    <div className="px-4 py-4 border border-orange-500/20 border-t-0 rounded-b-xl bg-orange-500/3">
                      <p className="font-body text-xs leading-relaxed text-ink/70">{item.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-orange-500/30 bg-orange-500/8 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-orange-500">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: two-column */}
      <div className="hidden md:flex h-full w-full">
        <div className="flex w-[52%] flex-col justify-center pl-10 lg:pl-14 pr-6 lg:pr-8 overflow-y-auto py-10">
          <div className="mb-5">
            <div className="section-label">{achievements.label}</div>
            <div className="mt-1 font-body text-xs text-ink/45">{achievements.subtitle}</div>
          </div>
          <div className="space-y-2.5">
            {achievements.list.map((item, i) => (
              <AchievementCard key={item.id} item={item} index={i} isActive={activeId === item.id}
                onClick={() => setActiveId(item.id)} />
            ))}
          </div>
        </div>

        <div className="flex w-[48%] flex-col justify-center border-l border-ink/8 px-8 lg:px-12 py-10">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div key={activeItem.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.35 }} className="space-y-5">
                <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-4xl lg:text-5xl"
                  style={{
                    background: activeItem.highlight ? 'linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,140,51,0.1))' : 'rgba(13,13,13,0.05)',
                    border: activeItem.highlight ? '1px solid rgba(255,107,0,0.3)' : '1px solid rgba(13,13,13,0.08)',
                  }}>
                  {activeItem.icon}
                </motion.div>
                <div>
                  <div className="font-display text-xl lg:text-2xl font-bold leading-tight text-ink"
                    style={{ fontFamily: 'Syne, sans-serif' }}>{activeItem.title}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.4em] text-orange-500">
                    {activeItem.year} · {activeItem.org}
                  </div>
                </div>
                <p className="font-body text-xs lg:text-sm leading-relaxed text-ink/70">{activeItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {activeItem.tags.map((tag, ti) => (
                    <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ti * 0.06 }}
                      className="rounded-full border border-orange-500/30 bg-orange-500/8 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.25em] text-orange-500">
                      {tag}
                    </motion.span>
                  ))}
                </div>
                {activeItem.highlight && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent px-4 py-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-orange-500 mb-1">National Recognition</div>
                    <div className="font-body text-xs lg:text-sm text-ink/70">
                      Awarded at a national-level conference, competing against engineering researchers from across India.
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Panel06Achievements

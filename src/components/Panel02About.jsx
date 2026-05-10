import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteContent } from '../data/content.js'

const { about } = siteContent

function Panel02About() {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [photoError, setPhotoError] = useState(false)

  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04] overflow-hidden pointer-events-none select-none">
        <div className="h-full w-full text-[6px] leading-[8px] text-ink">
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i} className="whitespace-pre-wrap">{about.backgroundText}</p>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-[10%] h-[80%] w-[3px] bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1300px] flex-col lg:flex-row items-center gap-6 lg:gap-10 px-5 sm:px-8 lg:px-12 py-16 lg:py-0">

        {/* PHOTO */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[280px]">
          <div className="photo-float relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-l-2 border-orange-500 z-10" />
            <div className="absolute -top-3 -right-3 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-orange-500 z-10" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-l-2 border-orange-500 z-10" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-r-2 border-orange-500 z-10" />
            <div className="absolute inset-0 -m-2 rounded-lg opacity-25 blur-2xl"
              style={{ background: 'radial-gradient(circle, #FF6B00, transparent 70%)' }} />
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '3/4' }}>
              {!photoError ? (
                <>
                  <img src={about.ownerPhoto} alt={about.ownerName}
                    onLoad={() => setPhotoLoaded(true)} onError={() => setPhotoError(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${photoLoaded ? 'opacity-100' : 'opacity-0'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)' }}>
                  <svg viewBox="0 0 120 160" className="w-20 lg:w-24 opacity-30" fill="none">
                    <circle cx="60" cy="45" r="28" fill="#FF6B00" opacity="0.8" />
                    <path d="M10 140 Q10 95 60 90 Q110 95 110 140" fill="#FF6B00" opacity="0.6" />
                  </svg>
                  <div className="mt-3 font-mono text-[8px] uppercase tracking-[0.3em] text-cream/40 text-center px-2">
                    Add photo.jpg to /public
                  </div>
                </div>
              )}
              {!photoLoaded && !photoError && (
                <div className="absolute inset-0 bg-gradient-to-r from-ink/10 via-ink/5 to-ink/10 animate-pulse" />
              )}
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 text-center">
              <div className="font-display text-lg lg:text-xl font-bold text-ink"
                style={{ fontFamily: 'Syne, sans-serif' }}>{about.ownerName}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500">{about.ownerTitle}</div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.25em] text-ink/40">📍 {about.ownerLocation}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* TEXT */}
        <div className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-label mb-3 md:mb-4">{about.label}</motion.div>
          <div className="space-y-4">
            {about.paragraphs.map((text, i) => (
              <motion.p key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="font-body text-sm md:text-base leading-relaxed text-ink/85">
                {i === 0 ? (
                <span><span className="text-orange-500 font-semibold">Computer Science Engineering Graduate </span>
                    {text.replace('Computer science Engineering graduate ', '')}</span>
                ) : text}
              </motion.p>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 md:mt-6 border border-ink/15 bg-ink/[0.03] p-3 md:p-4 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
            <div className="mb-2 text-orange-500">{about.systemInfoTitle}</div>
            <div className="space-y-1.5">
              {about.systemInfo.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-ink/50">{label}</span>
                  <span className={value.includes('ACTIVE') ? 'text-orange-500' : 'text-ink'}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* MILESTONES — hidden on mobile, shown md+ */}
        <div className="hidden md:block relative flex-shrink-0 w-full md:w-[220px] lg:w-[260px]">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="section-label mb-5 md:mb-6">{about.milestonesLabel}</motion.div>
          <motion.div initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-2 top-10 bottom-0 w-[1px] bg-gradient-to-b from-orange-500 to-transparent" />
          <div className="space-y-5 lg:space-y-7">
            {about.milestones.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-8">
                <div className="absolute left-0 top-1 w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 border-orange-500"
                  style={{ background: i === 3 ? '#FF6B00' : '#F5F0E8' }} />
                <div className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: '#FF6B00' }}>{item.year}</div>
                <div className="mt-0.5 font-display text-xs lg:text-sm font-semibold text-ink leading-tight"
                  style={{ fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
                <div className="text-[10px] lg:text-xs text-ink/55">{item.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel02About

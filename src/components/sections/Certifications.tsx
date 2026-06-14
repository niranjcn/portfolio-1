import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Award, Filter } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import type { CertificateCategory } from '../../types'
import { cn } from '../../utils/cn'

const ALL = 'All Certificates'
const categories: CertificateCategory[] = ['AI & Machine Learning', 'Cloud & DevOps', 'Web Development', 'Data Science', 'Programming', 'Design']
const filterOptions = [ALL, ...categories]

const easeOut = [0.22, 1, 0.36, 1] as const

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.04, ease: easeOut },
  }),
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState(ALL)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (activeFilter === ALL) return portfolio.certificates
    return portfolio.certificates.filter((c) => c.category === activeFilter)
  }, [activeFilter])

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">05.</span>
        <h2 id="certifications-heading" className="font-display text-3xl font-bold text-text">Certifications</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      {/* Category filters */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              'rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-[var(--transition-smooth)]',
              activeFilter === f
                ? 'bg-accent text-bg border-accent'
                : 'border-border text-text-muted hover:text-text hover:border-text-muted'
            )}
            aria-pressed={activeFilter === f}
          >
            {f}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-text-muted py-12 font-mono text-sm">No certificates in this category.</p>
          ) : (
            filtered.map((cert, i) => (
              <motion.div
                key={cert.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedImage(cert.image)}
                className="group relative rounded-lg border border-border bg-surface p-3 transition-all duration-[var(--transition-smooth)] hover:border-accent/40 hover:shadow-glow cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] rounded-md bg-surface-2 overflow-hidden mb-2">
                  {cert.image.match(/\.(pdf)$/i) ? (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <Award size={24} />
                    </div>
                  ) : (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                        const parent = (e.target as HTMLImageElement).parentElement!
                        parent.classList.add('flex', 'items-center', 'justify-center')
                        const icon = document.createElement('div')
                        icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
                        icon.className = 'text-text-muted/50'
                        parent.appendChild(icon)
                      }}
                    />
                  )}
                </div>

                {/* Category badge */}
                <span className="absolute top-2 left-2 rounded-full bg-bg/80 backdrop-blur-sm px-2 py-0.5 font-mono text-[8px] text-accent border border-accent/30">
                  {cert.category}
                </span>

                <h3 className="font-display text-xs font-bold text-text truncate">{cert.title}</h3>
                <p className="text-[10px] text-text-muted/70 truncate">{cert.issuer}</p>
                <p className="text-[9px] font-mono text-text-muted/50 mt-0.5">{cert.date}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Image lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-text-muted hover:text-text transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {selectedImage.match(/\.(pdf)$/i) ? (
                <div className="w-full aspect-[4/3] rounded-lg border border-border bg-surface flex items-center justify-center">
                  <p className="text-text-muted font-mono text-sm">
                    PDF certificate — <a href={selectedImage} target="_blank" rel="noreferrer" className="text-accent underline">Open PDF</a>
                  </p>
                </div>
              ) : (
                <img src={selectedImage} alt="Certificate" className="w-full h-full object-contain rounded-lg" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

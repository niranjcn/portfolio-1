import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, X } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'

const easeOut = [0.22, 1, 0.36, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: easeOut },
  }),
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function Achievements() {
  const achievements = portfolio.achievements
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">06.</span>
        <h2 id="achievements-heading" className="font-display text-3xl font-bold text-text">Achievements & Recognition</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <motion.div variants={staggerItem} className="grid sm:grid-cols-2 gap-4">
        {achievements.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            onClick={() => item.image && setSelectedImage(item.image)}
            className={cn(
              'rounded-lg border p-5 transition-all duration-[var(--transition-smooth)] hover:shadow-glow hover:shadow-card',
              item.image && 'cursor-pointer',
              item.highlight
                ? 'border-accent/50 bg-accent-dim/20 hover:border-accent'
                : 'border-border bg-surface hover:border-accent/30'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg transition-all duration-[var(--transition-smooth)]',
                item.highlight ? 'bg-accent-dim text-accent' : 'bg-surface-2 text-text-muted'
              )}>
                {item.icon || <Award size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-text truncate">{item.title}</h3>
                  {item.highlight && <Badge variant="accent" size="sm">Featured</Badge>}
                </div>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">{item.year}</p>
                <p className="mt-1 text-xs text-text-muted">{item.org}</p>
                <p className="mt-2 text-xs text-text-muted/80 leading-relaxed line-clamp-3">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[9px] text-text-muted">{tag}</span>
                  ))}
                </div>
                {item.image && (
                  <div className="mt-3">
                    <span className="font-mono text-[10px] text-accent/70 underline underline-offset-2">Click to view certificate</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Image lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-text-muted hover:text-text transition-colors" aria-label="Close">
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Certificate" className="w-full h-full object-contain rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

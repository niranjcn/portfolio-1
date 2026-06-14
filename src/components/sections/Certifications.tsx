import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'

export default function Certifications() {
  const achievements = portfolio.achievements

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">05.</span>
        <h2 id="certifications-heading" className="font-display text-2xl font-bold text-text">Achievements & Recognition</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={cn(
              'rounded-lg border p-5 transition-all duration-base hover:-translate-y-1',
              item.highlight
                ? 'border-accent/50 bg-accent-dim/20 hover:border-accent hover:shadow-glow'
                : 'border-border bg-surface hover:border-accent/30'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg',
                item.highlight ? 'bg-accent-dim text-accent' : 'bg-surface-2 text-text-muted'
              )}>
                {item.icon || <Award size={20} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-text truncate">{item.title}</h3>
                  {item.highlight && (
                    <Badge variant="accent" size="sm">Featured</Badge>
                  )}
                </div>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">{item.year}</p>
                <p className="mt-1 text-xs text-text-muted">{item.org}</p>
                <p className="mt-2 text-xs text-text-muted/80 leading-relaxed line-clamp-3">{item.description}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[9px] text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

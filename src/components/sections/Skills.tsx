import { motion } from 'framer-motion'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

const categoryIcons: Record<string, string> = {
  Frontend: '🖥️',
  Backend: '⚙️',
  'ML / AI': '🧠',
  Databases: '🗄️',
  'DevOps & Cloud': '☁️',
  Blockchain: '🔗',
}

const easeOut = [0.22, 1, 0.36, 1] as const

function getBarColor(proficiency: number): string {
  if (proficiency >= 85) return 'bg-accent'
  if (proficiency >= 70) return 'bg-accent/70'
  return 'bg-accent/40'
}

function SkillBar({ name, proficiency, index }: { name: string; proficiency: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs text-text-muted group-hover:text-text transition-colors">{name}</span>
        <span className="font-mono text-[10px] text-text-muted/50">{proficiency}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.03 + 0.2, ease: 'easeOut' }}
          className={cn('h-full rounded-full relative overflow-hidden', getBarColor(proficiency))}
        >
          <div className="absolute inset-0 shimmer" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: easeOut },
  }),
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export default function Skills() {
  const categories = [...new Set(portfolio.skills.map((s) => s.category))]

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">04.</span>
        <h2 id="skills-heading" className="font-display text-3xl font-bold text-text">Skills & Tech Stack</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <motion.div variants={staggerItem} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, ci) => {
          const skills = portfolio.skills.filter((s) => s.category === category)
          return (
            <motion.div
              key={category}
              custom={ci}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-border bg-surface p-5 transition-all duration-[var(--transition-smooth)] hover:border-accent/30 hover:shadow-glow"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{categoryIcons[category]}</span>
                <h3 className="font-display text-sm font-bold text-text">{category}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent ml-2" />
              </div>
              <div className="space-y-3">
                {skills.map((skill, si) => (
                  <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} index={ci * 10 + si} />
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

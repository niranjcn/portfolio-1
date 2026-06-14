import { motion } from 'framer-motion'
import portfolio from '../../data/portfolioData'
import { cn } from '../../utils/cn'

const categoryLabels: Record<string, string> = {
  Frontend: '🖥️ Frontend',
  Backend: '⚙️ Backend',
  'ML / AI': '🧠 ML / AI',
  Databases: '🗄️ Databases',
  'DevOps & Cloud': '☁️ DevOps & Cloud',
  Blockchain: '🔗 Blockchain',
}

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
          className={cn('h-full rounded-full', getBarColor(proficiency))}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const categories = [...new Set(portfolio.skills.map((s) => s.category))]

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">04.</span>
        <h2 id="skills-heading" className="font-display text-2xl font-bold text-text">Skills</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, ci) => {
          const skills = portfolio.skills.filter((s) => s.category === category)
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{categoryLabels[category]?.split(' ')[0]}</span>
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
      </div>

      {/* Tools I Use Daily */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">Tools I Use Daily</h3>
        <div className="flex flex-wrap gap-2">
          {portfolio.skills.sort((a, b) => b.proficiency - a.proficiency).map((skill) => (
            <span
              key={skill.name}
              className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted hover:border-accent/40 hover:text-accent transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

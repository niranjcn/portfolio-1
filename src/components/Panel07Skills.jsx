import { motion } from 'framer-motion'
import { siteContent } from '../data/content.js'

const { skills } = siteContent

const PROFICIENCY = {
  React: 92, Vite: 88, 'Next.js': 75, TailwindCSS: 90, JavaScript: 95, HTML5: 95, CSS3: 90,
  FastAPI: 90, Python: 93, 'REST APIs': 90, JWT: 85, RBAC: 82, WebSockets: 70,
  XGBoost: 85, 'Random Forest': 82, YOLOv8: 80, OpenCV: 80, 'Scikit-learn': 85, Pandas: 88, NumPy: 88,
  MongoDB: 85, MySQL: 82, PostgreSQL: 70, Redis: 65,
  Docker: 88, 'Docker Compose': 85, 'AWS EC2': 78, Nginx: 82, 'GitHub Actions': 80, Linux: 85, Cron: 78,
  'Hyperledger Fabric': 75, 'Smart Contracts': 70, 'Permissioned Blockchain': 72,
}

function SkillBar({ name, index }) {
  const pct = PROFICIENCY[name] || 70
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-ink/70 group-hover:text-orange-500 transition-colors">{name}</span>
        <span className="font-mono text-[8px] md:text-[9px] text-ink/35">{pct}%</span>
      </div>
      <div className="h-[3px] rounded-full bg-ink/8 overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: pct >= 88 ? 'linear-gradient(90deg, #FF6B00, #FFB347)' : pct >= 78 ? 'rgba(255,107,0,0.7)' : 'rgba(255,107,0,0.4)' }} />
      </div>
    </motion.div>
  )
}

function Panel07Skills() {
  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-300 to-transparent opacity-60" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-hero text-[100px] md:text-[220px] leading-none opacity-[0.025]"
        style={{ fontFamily: 'Bebas Neue, sans-serif' }}>SKILL</div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-14 py-14 lg:py-10">
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-6 lg:mb-8 flex items-end justify-between">
          <div>
            <div className="section-label">{skills.label}</div>
            <div className="mt-1 font-body text-xs text-ink/45">{skills.subtitle}</div>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink/30 hidden sm:block">
            {skills.categories.reduce((acc, c) => acc + c.items.length, 0)} technologies
          </div>
        </motion.div>

        {/* Responsive grid: 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-6 lg:gap-y-8">
          {skills.categories.map((cat, ci) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }}>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-base">{cat.icon}</span>
                <div className="font-display text-xs sm:text-sm font-bold text-ink" style={{ fontFamily: 'Syne, sans-serif' }}>{cat.name}</div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-500/30 to-transparent ml-2" />
              </div>
              <div className="space-y-2.5 md:space-y-3">
                {cat.items.map((item, ii) => (
                  <SkillBar key={item} name={item} index={ci * 10 + ii} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Panel07Skills

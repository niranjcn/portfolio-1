import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { siteContent } from '../data/content.js'

const skillCards = [
  {
    title: 'Product & Interfaces',
    desc: 'Building clear, usable interfaces that expose complex systems without hiding important details.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind'],
  },
  {
    title: 'APIs & Systems',
    desc: 'Designing backend systems that are predictable, debuggable, and easy to extend.',
    tags: ['FastAPI', 'Node.js', 'Go', 'MongoDB', 'MySQL'],
  },
  {
    title: 'AI & Data Platforms',
    desc: 'Certified Fabric pipelines plus LLM systems that run on-device and stay auditable.',
    tags: ['Fabric', 'LangChain', 'XGBoost', 'Ollama', 'RAG'],
  },
  {
    title: 'Infra & Delivery',
    desc: 'Shipping end-to-end with observability and long-term maintenance in mind.',
    tags: ['Docker', 'AWS', 'Nginx', 'Prometheus', 'Grafana'],
  },
]

function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 items-start">
        {/* giant parallax watermark */}
        <motion.span
          aria-hidden="true"
          style={{ y: watermarkY, x: watermarkX }}
          className="pointer-events-none select-none absolute -top-4 left-0 font-bebas italic leading-none text-[26vw] md:text-[19rem] text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.08)] whitespace-nowrap z-0"
        >
          ABOUT
        </motion.span>

        <motion.div style={{ y: photoY }} className="md:col-span-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            whileHover={{ rotate: 1.5, scale: 1.015 }}
            className="group border-[4px] border-black bg-stone-100 overflow-hidden aspect-[4/5] relative transition-shadow duration-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
          >
            <img
              src={siteContent.about.ownerPhoto}
              alt={siteContent.about.ownerName}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-black opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Backend Engineer
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black text-white px-4 py-3 flex justify-between items-center">
              <span className="font-bebas text-lg tracking-widest">{siteContent.about.ownerName}</span>
              <span className="text-[10px] font-black tracking-widest uppercase opacity-60">KANNUR // INDIA</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="md:col-span-7 space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-black text-white text-[10px] font-black tracking-[0.4em] px-3 py-1"
          >
            BACKEND ENGINEER // DATA & AI PLATFORMS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-bebas text-6xl md:text-8xl leading-[0.8] tracking-tighter italic uppercase"
          >
            BACKEND <br /> ENGINEER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-lg font-medium leading-relaxed text-black/70 max-w-2xl"
          >
            Platform Engineer for Data & AI systems. I ship production backends, certified Fabric data pipelines, and on-device RAG — work where <span className="font-black italic underline decoration-2">decisions matter, data is imperfect, and systems must explain themselves.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 6 }}
            className="border-l-[4px] border-black pl-6 py-2 bg-stone-50 hover:bg-black group/quote transition-colors duration-300"
          >
            <p className="font-black text-sm uppercase tracking-widest group-hover/quote:text-white transition-colors">HOW I THINK</p>
            <p className="text-sm italic text-black/60 group-hover/quote:text-stone-300 mt-1 transition-colors">“Choose boring technology, instrument everything, and automate the toil — excitement belongs in the product, never in the pager.”</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="space-y-2"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/40">CURRENT_FOCUS</p>
            <ul className="space-y-1 text-sm font-medium">
              <li>[01] Shipping production backends — RBAC platforms, Prometheus observability, Docker delivery.</li>
              <li>[02] Building <span className="font-black">ContextOS</span>: on-device Graph + Vector RAG with LangChain & Ollama</li>
              <li>[03] Microsoft Certified Fabric Data Engineer Associate · 250+ LeetCode · open to roles</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="border-t-[6px] border-black pt-8"
        >
          <h2 className="font-bebas text-5xl tracking-tighter italic uppercase">BACKGROUND</h2>
          <p className="text-sm font-medium text-black/60 mt-2">{siteContent.resume.education}</p>
          <p className="text-sm text-black/60 mt-1">Backend Engineer from Kannur, Kerala — DevOps intern turned contract Software Engineer, shipping RBAC platforms and data systems to production. {siteContent.about.paragraphs[1]}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {skillCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 48, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.09 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
              className="border-[3px] border-black p-6 bg-white hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] transition-shadow duration-300"
            >
              <h3 className="font-bebas text-xl italic">{card.title}</h3>
              <p className="text-xs text-black/60 mt-2">{card.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {card.tags.map(t => (
                  <span key={t} className="text-[9px] font-black bg-black text-white px-2 py-1 hover:bg-red-600 hover:scale-110 transition-all cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-stone-950 text-stone-100 p-8 border-[3px] border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group/cta"
        >
          <div>
            <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">Available Immediately · Open to Relocation</div>
            <p className="font-bebas text-3xl italic uppercase mt-1 group-hover/cta:tracking-wide transition-all">Available for roles & collaborations</p>
          </div>
          <Link to="/contact" className="border-2 border-white px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all">GET_IN_TOUCH →</Link>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="font-bebas text-4xl tracking-tighter italic"
        >
          ACHIEVEMENTS
        </motion.h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {siteContent.achievements.list.slice(0, 8).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -6 }}
              className={`border-[3px] p-5 bg-white flex gap-4 transition-shadow duration-300 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] ${a.highlight ? 'border-black hover:shadow-[7px_7px_0px_0px_rgba(220,38,38,1)]' : 'border-black'}`}
            >
              <motion.span
                whileHover={{ rotate: 14, scale: 1.2 }}
                className="text-2xl h-fit"
              >
                {a.icon}
              </motion.span>
              <div>
                <div className="font-bebas text-xl leading-none">{a.title}</div>
                <div className="text-xs font-black uppercase tracking-widest text-black/40">{a.org} · {a.year}</div>
                <p className="text-xs text-black/60 mt-2 line-clamp-2">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default About

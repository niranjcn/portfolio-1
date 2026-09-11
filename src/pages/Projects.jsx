import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { siteContent } from '../data/content.js'

const projects = siteContent.projects.list

const imageMap = {
  '01': '/images/tracient/frontend1.png',
  '02': '/images/railway/Screenshot 2026-05-10 125138.png',
  '03': '/images/dms/Screenshot 2026-05-10 085439.png',
  '04': '/images/step4eco/Screenshot 2026-05-10 085948.png',
  '05': '/images/examhall/Screenshot 2026-05-10 125138.png',
  '06': '/images/kccl/1000233801.jpg',
}

function Projects() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <main className="min-h-screen bg-white">
      {/* scroll progress */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[70]" />

      <section className="max-w-7xl mx-auto px-6 pt-12 pb-4 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bebas text-6xl md:text-8xl leading-[0.85] tracking-tighter italic uppercase"
        >
          PROJECT <br /> <span className="text-transparent [-webkit-text-stroke:1.5px_black]">ARCHIVES</span>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 h-[3px] bg-black origin-left max-w-7xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-3 text-[11px] font-black tracking-[0.3em] uppercase text-black/40"
        >
          AI Systems // Automation // Research Projects · {projects.length} shipped
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-12">
        {projects.map((p, idx) => (
          <motion.div
            key={p.number}
            id={p.number}
            initial={{ opacity: 0, y: 56, rotate: 0.4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
            className="grid md:grid-cols-12 gap-6 md:gap-10 items-start border-t-2 border-black pt-8 scroll-mt-24"
          >
            <div className="md:col-span-5">
              <Link
                to={`/projects/${p.number}`}
                className="block relative border-[4px] border-black bg-stone-100 overflow-hidden group aspect-video transition-all duration-300 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 hover:-rotate-[0.5deg]"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity z-10" style={{ backgroundImage: 'radial-gradient(#000 1.2px, transparent 0)', backgroundSize: '8px 8px' }} />
                <img
                  src={imageMap[p.number] || '/images/profile1.jpeg'}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] group-hover:rotate-[0.5deg] transition-all duration-700 ease-out"
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-bebas text-8xl italic text-black/10 group-hover:text-black/25 group-hover:scale-110 transition-all duration-500">{p.number}</span>
                </div>
                <div className="absolute top-0 right-0 w-10 h-10 bg-black skew-x-[30deg] translate-x-3 -translate-y-3 group-hover:w-14 group-hover:h-14 group-hover:bg-red-600 transition-all duration-500" />
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  OPEN <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? 32 : -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="md:col-span-7 space-y-4"
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-bebas text-sm tracking-[0.2em] text-black/40">PROJECT_{p.number}</span>
                <span className="text-[11px] font-black tracking-widest uppercase text-stone-500">{p.status}</span>
                {p.featured && <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 animate-pulse">★ BEST PAPER</span>}
              </div>

              <Link to={`/projects/${p.number}`} className="block group/title w-fit max-w-full">
                <h2 className="font-bebas text-4xl md:text-5xl leading-none uppercase tracking-tighter transition-all group-hover/title:italic group-hover/title:underline decoration-red-600 underline-offset-4">
                  {p.title}
                  <span className="inline-block ml-2 text-red-600 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300">→</span>
                </h2>
              </Link>

              <div className="text-xs font-black tracking-widest uppercase text-black/50">Category: {p.tagline.split(' —')[0] || p.tagline}</div>

              <p className="text-sm font-medium leading-relaxed text-black/70 max-w-2xl">{p.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.stack.slice(0, 6).map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5 skew-x-[-8deg] hover:bg-red-600 cursor-default transition-colors"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black/40 pt-2 border-t border-black/10">
                <span className="text-black">Core_Focus //</span> <span className="normal-case font-bold text-black/60">{p.highlights[0]}</span>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <Link to={`/projects/${p.number}`} className="group/btn border-2 border-black bg-white px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                  VIEW DETAILS <span className="inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
                {p.links.github && p.links.github.startsWith('http') && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="group/btn border-2 border-black bg-black text-white px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                    GITHUB <span className="inline-block group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">→</span>
                  </a>
                )}
                {p.links.live && (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="group/btn border-2 border-black bg-white px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                    LIVE <span className="inline-block group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">→</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12 border-t-[6px] border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h3 className="font-bebas text-5xl leading-none italic uppercase">LET&apos;S BUILD <br /> SOMETHING COOL.</h3>
          <p className="text-sm text-black/60 mt-2">Open to collaborations in AI, automation, and real-time systems.</p>
        </div>
        <Link to="/contact" className="group/cta border-[3px] border-black bg-black text-white px-8 py-4 font-bebas text-xl tracking-widest italic hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all">
          GET_IN_TOUCH <span className="inline-block group-hover/cta:translate-x-1.5 transition-transform">→</span>
        </Link>
      </motion.section>
    </main>
  )
}

export default Projects

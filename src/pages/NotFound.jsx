import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center">
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-red-600 text-white text-[10px] font-black tracking-[0.4em] px-3 py-1"
        >
          ERROR // 404
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-bebas leading-[0.8] tracking-tighter italic uppercase mt-4 text-[7rem] md:text-[12rem]"
        >
          LOST<span className="text-transparent [-webkit-text-stroke:2px_black]">_SIGNAL</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-sm font-medium text-black/60 max-w-xl"
        >
          This route returns nothing — no page, no data, no excuses. The systems that do exist are one click away.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link to="/" className="border-[3px] border-black bg-black text-white px-8 py-3 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">GO_HOME →</Link>
          <Link to="/projects" className="border-[3px] border-black bg-white px-8 py-3 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">PROJECTS →</Link>
          <Link to="/contact" className="border-[3px] border-black bg-white px-8 py-3 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">CONTACT →</Link>
        </motion.div>
        <div className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/30">
          <span className="w-2 h-2 bg-red-600 animate-pulse" /> ROUTE_NOT_FOUND // CHECK_URL
        </div>
      </section>
    </main>
  )
}

export default NotFound

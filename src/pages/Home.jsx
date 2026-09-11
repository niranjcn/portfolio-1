import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '../data/content.js'

function Home() {
  const featuredIds = ['01', '08', '03']
  const featured = featuredIds
    .map(id => siteContent.projects.list.find(p => p.number === id))
    .filter(Boolean)

  const coverMap = {
    '01': '/images/tracient/frontend1.png',
    '03': '/images/dms/Screenshot 2026-05-10 085439.png',
  }

  return (
    <main className="min-h-screen">
      {/* HERO — border 7px black m-2, dot grid, huge Bebas, pill, tags, portrait card */}
      <section className="relative min-h-[83vh] flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-hidden bg-white text-black font-inter border-[7px] border-black m-2 md:m-2">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '6px 6px' }} />
        <div className="relative z-20 w-full lg:flex-1 px-8 md:px-24 lg:pl-24 lg:pr-8 pt-12 lg:py-16">
          <div className="max-w-5xl space-y-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-[2.95rem] sm:text-6xl md:text-[7rem] lg:text-[6rem] xl:text-[8rem] font-bebas leading-[0.82] tracking-tighter italic whitespace-normal sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
                NIRANJ C N
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-5">
              <div className="inline-block bg-black text-white px-6 py-3 text-lg md:text-xl font-bold uppercase tracking-tight rotate-[-1deg]">Backend Software Engineer</div>
              <div className="max-w-2xl space-y-4">
                <p className="text-base md:text-lg font-medium leading-relaxed text-black/70 tracking-tight">
                  I design and ship backend systems that hold up in production — clean APIs, trusted data pipelines, and ML that earns its place.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="border-2 border-black bg-black text-white px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em]">Microsoft Certified Fabric Data Engineer Associate</span>
                  <span className="border-2 border-black px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em]">4 Delivered Software Solutions in Production</span>
                  <span className="border-2 border-black px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em]">Best Paper RAET&apos;26</span>
                  <span className="border-2 border-black px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em]">FastAPI + React</span>
                </div>
                <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 pt-2">Based in Kannur, Kerala, India</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 120, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative lg:shrink-0 w-full max-w-[440px] lg:max-w-none lg:w-[360px] xl:w-[400px] z-10 px-8 md:px-0 lg:px-0 mt-12 lg:mt-0 pb-12 lg:pb-0 lg:mr-16 xl:mr-24 mx-auto lg:mx-0">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative">
            {/* hard offset shadow + red accent behind card */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-black" aria-hidden="true" />
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-red-600 border-[3px] border-black -z-10 rotate-[8deg]" aria-hidden="true" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 -z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.6px, transparent 0)', backgroundSize: '10px 10px' }} aria-hidden="true" />

            {/* card */}
            <div className="group relative border-[4px] border-black bg-white overflow-hidden rotate-[1.5deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-500 hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]">
              {/* window bar */}
              <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-black" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-black" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-black/60">portrait.png</span>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-black"><span className="w-1.5 h-1.5 bg-red-600 animate-pulse" />Live</span>
              </div>

              {/* image */}
              <div className="relative overflow-hidden bg-stone-100">
                <img
                  src="/images/profile1.png"
                  alt="Niranj portrait"
                  className="w-full object-top object-cover aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:rotate-[0.5deg]"
                  style={{ filter: 'contrast(1.05) saturate(1.05)' }}
                  onError={e => { e.currentTarget.src = siteContent.about.ownerPhoto }}
                />
                {/* hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                  <span className="bg-black text-white text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5">Backend Engineer</span>
                  <span className="bg-white border-2 border-black text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1">↗</span>
                </div>
              </div>

              {/* footer strip */}
              <div className="flex items-center justify-between border-t-[3px] border-black bg-white px-4 py-3">
                <div>
                  <p className="font-bebas text-xl leading-none tracking-tight italic">NIRANJ C N</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/50 mt-1">Kannur, Kerala</p>
                </div>
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center font-black group-hover:bg-black group-hover:text-white transition-colors duration-300">→</div>
              </div>
            </div>

            {/* floating stickers */}
            <div className="absolute -top-4 -left-3 sm:-left-4 rotate-[-6deg] bg-red-600 text-white border-[3px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-[-2deg] transition-transform duration-500">Open to work</div>
            <div className="absolute -bottom-4 -right-2 sm:-right-3 rotate-[3deg] bg-black text-white border-[3px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">2026 // Portfolio</div>
          </motion.div>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-10 left-10 z-30 hidden md:block">
          <div className="flex flex-col items-center gap-4">
            <span className="[writing-mode:vertical-lr] font-black text-[10px] tracking-[0.5em] uppercase opacity-40">Explore Work</span>
            <div className="w-[2px] h-20 bg-gradient-to-b from-black to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT ME — stone-950 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mt-16 mb-24 md:mt-32 md:mb-40 font-inter bg-stone-950 py-20 border-y border-stone-800">
        <div className="absolute inset-0 z-0 bg-fixed pointer-events-none grayscale opacity-5" style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '12px 12px' }} />
        <div className="relative z-10 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="border-l-[12px] border-stone-100 pl-6">
              <h2 className="font-bebas text-7xl md:text-8xl text-stone-100 leading-[0.8] tracking-tighter italic uppercase">
                About <br />
                <span className="text-transparent [-webkit-text-stroke:1px_#f5f5f4] hover:text-stone-100 transition-all duration-500 cursor-default">ME</span>
              </h2>
              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">Backend Engineering · DevOps · Applied AI</p>
            </div>
            <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-[8px] bg-stone-100 skew-x-[-20deg]" />
          </motion.div>

          <div className="md:col-span-7 lg:col-span-8 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl font-black leading-[1] tracking-tighter text-stone-100 uppercase">
              <p>Building systems that</p>
              <span className="relative inline-block mt-2 group">
                <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-300">SCALE, SECURE, AUTOMATE.</span>
                <span className="absolute inset-0 bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
              </span>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8 md:gap-12 pt-8 border-t-[4px] border-stone-800">
              <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55 }} whileHover={{ x: 6 }} className="space-y-3">
                <h3 className="font-bebas text-3xl tracking-tight text-stone-100 italic">
                  01. BACKEND <span className="text-sm not-italic text-stone-600">// SYSTEMS</span>
                </h3>
                <p className="text-base font-medium leading-snug text-stone-400">
                  Engineering <span className="text-stone-200 font-black italic">audit-ready distribution & network</span> systems — React + FastAPI + Docker with JWT/RBAC, Prometheus + Grafana observability.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.12 }} whileHover={{ x: 6 }} className="space-y-3">
                <h3 className="font-bebas text-3xl tracking-tight text-stone-100 italic">
                  02. INTELLIGENCE <span className="text-sm not-italic text-stone-600">// RESEARCH</span>
                </h3>
                <p className="text-base font-medium leading-snug text-stone-400">
                  Shipping <span className="text-stone-200 font-black italic">ML + blockchain systems with on-device RAG</span> — Go chaincode on Hyperledger Fabric, XGBoost 98.52% over 30K profiles, RAET&apos;26 Best Paper.
                </p>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55 }} whileHover={{ scale: 1.01 }} className="flex items-center justify-between p-4 border-2 border-stone-800 bg-transparent group hover:border-stone-100 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-stone-700 rounded-full animate-pulse shadow-[0_0_10px_rgba(120,113,108,0.3)] group-hover:bg-red-600 transition-colors" />
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-stone-500">AVAILABLE NOW // KANNUR · OPEN TO RELOCATION</span>
              </div>
              <Link to="/contact" className="group/hire text-[11px] font-black uppercase tracking-widest text-stone-400 hover:text-white">HIRE ME <span className="inline-block group-hover/hire:translate-x-1.5 transition-transform">→</span></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACTIVE PROJECTS */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-32 mb-24 md:mb-40 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12 md:mb-16">
          <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-bebas text-5xl sm:text-7xl md:text-9xl text-black leading-none italic uppercase">
            ACTIVE <br /> <span className="text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black]">PROJECTS</span>
          </motion.h2>
          <div className="h-[2px] w-full md:flex-grow bg-black/10 mb-2 md:mb-4 relative overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1 }} className="absolute top-0 left-0 h-full bg-red-600/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {featured.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 56, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
            >
            <Link to={`/projects/${p.number}`} className="block group">
              <div className="relative border-[3px] md:border-[4px] border-black bg-white p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] md:group-hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] group-hover:-translate-y-1">
                <div className="relative w-full aspect-video bg-stone-100 border-b-[3px] md:border-b-[4px] border-black overflow-hidden mb-5 md:mb-6">
                  {coverMap[p.number] ? (
                    <img
                      src={coverMap[p.number]}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-500"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bebas text-8xl italic text-black/10 group-hover:scale-110 group-hover:text-black/20 transition-all duration-500">{p.number}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 0)', backgroundSize: '8px 8px' }} />
                  <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 bg-black skew-x-[45deg] translate-x-4 md:translate-x-6 -translate-y-4 md:-translate-y-6 z-30 group-hover:bg-red-600 transition-colors duration-300" />
                  <div className="absolute bottom-2 right-2 z-20 bg-black text-white text-[9px] font-black px-2 py-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">OPEN ↗</div>
                </div>
                <div className="flex justify-between items-start gap-3 mb-3 md:mb-4">
                  <h3 className="font-bebas text-2xl md:text-3xl text-black leading-[0.95] uppercase tracking-tighter group-hover:italic transition-all group-hover:underline decoration-red-600 underline-offset-4">{p.title.split(' —')[0]}</h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black group-hover:rotate-12 group-hover:text-red-600 transition-all shrink-0"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                </div>
                <p className="text-xs md:text-sm font-bold leading-tight text-black/80 mb-5 md:mb-6 line-clamp-2 border-l-2 border-black pl-3 group-hover:border-red-600 transition-colors">{p.tagline}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 pt-4 border-t border-black/10">
                  {p.stack.slice(0, 4).map(s => (
                    <span key={s} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-black text-white px-1.5 md:px-2 py-0.5 skew-x-[-10deg] hover:bg-red-600 hover:scale-105 transition-all cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-black/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg> Access_System_Logs // V.02
          </div>
          <Link to="/projects" className="group/all text-xs font-black uppercase tracking-widest border-2 border-black px-4 py-2 hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all">VIEW ALL <span className="inline-block group-hover/all:translate-x-1 transition-transform">→</span></Link>
        </div>
      </section>

      {/* TECH STACK — 3 tabs like Akash */}
      <TechStackSection />

      {/* FEATURED — RESEARCH & CREDENTIALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 bg-stone-950 font-inter">
        <div className="border-t-2 border-stone-800 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-red-900 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] text-stone-500 uppercase">Featured // Research & Credentials</span>
          </div>
          <div className="space-y-6 md:space-y-8">
          <motion.a href="https://github.com/niranjcn/tracient" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} whileHover={{ y: -6 }} className="group block relative border-2 md:border-[4px] border-stone-100 p-6 md:p-12 bg-stone-950 transition-all hover:bg-stone-900 hover:shadow-[10px_10px_0px_0px_rgba(220,38,38,0.35)]">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col min-[480px]:flex-row md:flex-col gap-6 md:gap-8 border-t lg:border-t-0 lg:border-r border-stone-800 pt-8 lg:pt-0 lg:pr-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg><span className="text-[9px] font-black uppercase tracking-widest">BEST PAPER</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">RAET&apos;26</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg><span className="text-[9px] font-black uppercase tracking-widest">ACCURACY</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">98.52%</div>
                </div>
              </div>
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                <div className="inline-block bg-red-900 text-stone-100 px-3 py-1 text-[9px] font-black tracking-widest uppercase italic">RESEARCH · BLOCKCHAIN · ML</div>
                <h3 className="font-bebas text-5xl md:text-7xl text-stone-100 leading-[0.85] uppercase tracking-tighter group-hover:italic transition-all">TRACIENT — Blockchain Income Traceability & Anomaly Detection</h3>
                <p className="text-stone-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-stone-800 pl-6 uppercase">National-scale income fraud detection using Hyperledger Fabric and XGBoost — awarded Best Paper at RAET&apos;26 over 30,000+ worker profiles.</p>
                <div className="pt-4 flex items-center gap-4 text-[10px] font-black text-stone-100 uppercase tracking-[0.4em]">READ_FULL_BREAKDOWN <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></div>
              </div>
            </div>
          </motion.a>
          <motion.a href="https://learn.microsoft.com/api/credentials/share/en-us/NiranjCN-8946/58C8E602D57E9D0A?sharingId=791990ED41203A07" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1 }} whileHover={{ y: -6 }} className="group block relative border-2 md:border-[4px] border-stone-100 p-6 md:p-12 bg-stone-950 transition-all hover:bg-stone-900 hover:shadow-[10px_10px_0px_0px_rgba(220,38,38,0.35)]">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col min-[480px]:flex-row md:flex-col gap-6 md:gap-8 border-t lg:border-t-0 lg:border-r border-stone-800 pt-8 lg:pt-0 lg:pr-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg><span className="text-[9px] font-black uppercase tracking-widest">ISSUER</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">MICROSOFT</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg><span className="text-[9px] font-black uppercase tracking-widest">EXAM</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">DP-700</div>
                </div>
              </div>
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                <div className="inline-block bg-red-900 text-stone-100 px-3 py-1 text-[9px] font-black tracking-widest uppercase italic">CERTIFICATION · DATA ENGINEERING · FABRIC</div>
                <h3 className="font-bebas text-5xl md:text-7xl text-stone-100 leading-[0.85] uppercase tracking-tighter group-hover:italic transition-all">MICROSOFT CERTIFIED — FABRIC DATA ENGINEER ASSOCIATE</h3>
                <p className="text-stone-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-stone-800 pl-6 uppercase">Certified data engineering on Microsoft Fabric — lakehouses, warehouses, Spark notebooks and medallion pipelines built for production analytics.</p>
                <div className="pt-4 flex items-center gap-4 text-[10px] font-black text-stone-100 uppercase tracking-[0.4em]">VERIFY_CREDENTIAL <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></div>
              </div>
            </div>
          </motion.a>
          <motion.a href="https://leetcode.com/u/niranjcn/" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ y: -6 }} className="group block relative border-2 md:border-[4px] border-stone-100 p-6 md:p-12 bg-stone-950 transition-all hover:bg-stone-900 hover:shadow-[10px_10px_0px_0px_rgba(220,38,38,0.35)]">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col min-[480px]:flex-row md:flex-col gap-6 md:gap-8 border-t lg:border-t-0 lg:border-r border-stone-800 pt-8 lg:pt-0 lg:pr-12">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg><span className="text-[9px] font-black uppercase tracking-widest">SOLVED</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">250+</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-stone-500 mb-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg><span className="text-[9px] font-black uppercase tracking-widest">HANDLE</span></div>
                  <div className="font-bebas text-5xl md:text-6xl text-stone-100 italic">@NIRANJCN</div>
                </div>
              </div>
              <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
                <div className="inline-block bg-red-900 text-stone-100 px-3 py-1 text-[9px] font-black tracking-widest uppercase italic">PROBLEM SOLVING · DSA · CONSISTENCY</div>
                <h3 className="font-bebas text-5xl md:text-7xl text-stone-100 leading-[0.85] uppercase tracking-tighter group-hover:italic transition-all">LEETCODE — 250+ PROBLEMS SOLVED</h3>
                <p className="text-stone-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-stone-800 pl-6 uppercase">Consistent problem solving in Python — arrays, graphs, dynamic programming and system-style thinking, tracked publicly.</p>
                <div className="pt-4 flex items-center gap-4 text-[10px] font-black text-stone-100 uppercase tracking-[0.4em]">VIEW_PROFILE <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></div>
              </div>
            </div>
          </motion.a>
          </div>
        </div>
      </section>

      {/* CORE COMMITMENTS — 3 cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-7 md:py-10 bg-stone-950 font-inter overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="mb-8 border-b border-stone-800 pb-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
            <span className="text-[10px] font-black tracking-[0.5em] text-stone-500 uppercase">NIRANJ // Technical_Standards // 2026</span>
          </div>
          <h2 className="font-bebas text-6xl sm:text-7xl md:text-[6rem] text-stone-100 italic uppercase leading-[0.8] tracking-tighter">CORE<span className="text-transparent [-webkit-text-stroke:1px_#f5f5f4]"> COMMITMENTS</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-stone-800 border-2 border-stone-800">
          <motion.div initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55 }} whileHover={{ y: -8 }} className="bg-stone-950 p-6 md:p-8 flex flex-col justify-between group min-h-[320px] hover:bg-stone-900 transition-colors duration-300">
            <div className="mb-8">
              <div className="text-stone-600 mb-8 group-hover:text-stone-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 origin-left"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg></div>
              <h3 className="font-bebas text-3xl md:text-4xl text-stone-100 mb-6 tracking-tight italic">SCALABLE SYSTEMS</h3>
              <div className="space-y-6">
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-800" /><p className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em] mb-2">OPERATING_STANDARD</p><p className="text-stone-400 text-sm leading-relaxed">We ship Docker-composed microservices behind Nginx with CI/CD — not manual deploys.</p></div>
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-100/20 group-hover:bg-stone-100 transition-colors" /><p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] mb-2">DELIVERED_OUTCOME</p><p className="text-stone-100 font-bold text-lg md:text-2xl leading-tight uppercase tracking-tighter italic">Horizontally scalable APIs that stay up under load.</p></div>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4"><div className="text-[10px] font-black text-stone-800 uppercase tracking-[0.3em]">Ref_Code // 01</div><div className="w-8 h-[1px] bg-stone-800 group-hover:w-16 group-hover:bg-stone-100 transition-all hidden sm:block" /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.1 }} whileHover={{ y: -8 }} className="bg-stone-950 p-6 md:p-8 flex flex-col justify-between group min-h-[320px] hover:bg-stone-900 transition-colors duration-300">
            <div className="mb-8">
              <div className="text-stone-600 mb-8 group-hover:text-stone-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 origin-left"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg></div>
              <h3 className="font-bebas text-3xl md:text-4xl text-stone-100 mb-6 tracking-tight italic">AUTOMATED OPS</h3>
              <div className="space-y-6">
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-800" /><p className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em] mb-2">OPERATING_STANDARD</p><p className="text-stone-400 text-sm leading-relaxed">We automate DNS, backups, and alerts via cron + APIs — eliminating 15 hrs/week manual work.</p></div>
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-100/20 group-hover:bg-stone-100 transition-colors" /><p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] mb-2">DELIVERED_OUTCOME</p><p className="text-stone-100 font-bold text-lg md:text-2xl leading-tight uppercase tracking-tighter italic">80% ops reduction — Multi-NOC automation that runs 24/7.</p></div>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4"><div className="text-[10px] font-black text-stone-800 uppercase tracking-[0.3em]">Ref_Code // 02</div><div className="w-8 h-[1px] bg-stone-800 group-hover:w-16 group-hover:bg-stone-100 transition-all hidden sm:block" /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: 0.2 }} whileHover={{ y: -8 }} className="bg-stone-950 p-6 md:p-8 flex flex-col justify-between group min-h-[320px] hover:bg-stone-900 transition-colors duration-300">
            <div className="mb-8">
              <div className="text-stone-600 mb-8 group-hover:text-stone-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 origin-left"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg></div>
              <h3 className="font-bebas text-3xl md:text-4xl text-stone-100 mb-6 tracking-tight italic">SECURE & AUDITABLE</h3>
              <div className="space-y-6">
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-800" /><p className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em] mb-2">OPERATING_STANDARD</p><p className="text-stone-400 text-sm leading-relaxed">We enforce JWT/RBAC, permissioned blockchain, and immutable audit trails — every decision traceable.</p></div>
                <div className="relative pl-6"><div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-100/20 group-hover:bg-stone-100 transition-colors" /><p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] mb-2">DELIVERED_OUTCOME</p><p className="text-stone-100 font-bold text-lg md:text-2xl leading-tight uppercase tracking-tighter italic">Citation-grounded, verifiable systems for high-stakes data.</p></div>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4"><div className="text-[10px] font-black text-stone-800 uppercase tracking-[0.3em]">Ref_Code // 03</div><div className="w-8 h-[1px] bg-stone-800 group-hover:w-16 group-hover:bg-stone-100 transition-all hidden sm:block" /></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="mt-8 flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-10 md:gap-16 border-t border-stone-800 pt-8">
          <p className="text-stone-500 text-xs font-bold uppercase leading-relaxed tracking-widest max-w-sm">These standards ensure every system I ship remains scalable, automated, and auditable.</p>
          <Link to="/contact" className="group flex items-center gap-8 cursor-pointer ml-auto">
            <div className="text-right">
              <span className="block text-stone-500 text-[9px] font-black uppercase tracking-[0.5em] mb-2 italic">Establish_Link</span>
              <span className="block font-bebas text-5xl md:text-7xl text-stone-100 italic leading-none group-hover:text-red-900 transition-colors">CONNECT</span>
            </div>
            <motion.div whileHover={{ rotate: 45, scale: 1.06 }} whileTap={{ scale: 0.94 }} className="w-16 h-16 md:w-20 md:h-20 border-2 border-stone-100 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-stone-950 transition-colors">
              <span className="text-4xl md:text-6xl italic">→</span>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </main>
  )
}

function TechStackSection() {
  const tabMap = {
    LANGUAGES: { label: 'LANGUAGES', sub: 'Core // Syntax', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'C/C++'] },
    BACKEND: { label: 'BACKEND', sub: 'APIs // Services', items: ['FastAPI', 'Node.js', 'Express.js', 'Flask', 'REST APIs', 'Microservices', 'JWT & OAuth2', 'RBAC'] },
    FRONTEND: { label: 'FRONTEND', sub: 'UI // Experience', items: ['React', 'Vite', 'TailwindCSS', 'Recharts', 'HTML5', 'CSS3'] },
    AI: { label: 'AI', sub: 'Models // Agents', items: ['LangChain', 'Ollama', 'XGBoost', 'Random Forest', 'YOLOv8', 'OpenCV', 'Scikit-learn', 'Whisper'] },
    DATA: { label: 'DATA', sub: 'Stores // Retrieval', items: ['SQL', 'MongoDB', 'MySQL', 'ChromaDB', 'Kuzu', 'SQLite'] },
    DEVOPS: { label: 'DEVOPS', sub: 'Cloud // Delivery', items: ['Docker', 'Docker Compose', 'AWS', 'Nginx', 'GitHub Actions', 'Linux', 'Prometheus', 'Grafana'] },
    TESTING: { label: 'TESTING', sub: 'Quality // Tools', items: ['pytest', 'Postman', 'Unit Testing', 'Integration Testing', 'Code Review', 'Git & GitHub'] },
    CORE: { label: 'CORE', sub: 'CS // Design', items: ['DSA', 'System Design', 'OOP', 'SDLC'] },
  }
  const tabs = Object.keys(tabMap)
  const [active, setActive] = useState('BACKEND')
  const activeData = tabMap[active]

  const descMap = {
    LANGUAGES: 'Six languages I think and ship in.',
    BACKEND: 'Production APIs and services — designed, secured, and shipped.',
    FRONTEND: 'Responsive interfaces over complex systems.',
    AI: 'ML models and LLM pipelines that run in production.',
    DATA: 'Databases and retrieval layers I design around.',
    DEVOPS: 'Containerized delivery with observable infra.',
    TESTING: 'Testing discipline and the tooling around it.',
    CORE: 'Fundamentals behind every system decision.',
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 bg-white font-inter overflow-hidden">
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="mb-8 flex flex-col items-start border-l-[8px] md:border-l-[12px] border-black pl-5 md:pl-8">
        <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-bebas leading-[0.8] tracking-tighter italic uppercase text-black">
          TECH <br className="md:hidden" />
          <span className="text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:1.5px_black]">STACK</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-[3px] md:border-[4px] border-black relative z-10">
        {tabs.map(t => (
          <motion.button
            key={t}
            onClick={() => setActive(t)}
            whileTap={{ scale: 0.97 }}
            className={`relative py-4 md:h-23 overflow-hidden transition-all duration-300 border-black border-b-[3px] last:border-b-0 md:[&:nth-child(n+7)]:border-b-0 lg:[&:nth-child(n+5)]:border-b-0 md:odd:border-r-[4px] lg:border-r-[4px] lg:[&:nth-child(4n)]:border-r-0 ${active === t ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
          >
            <div className="hidden sm:block absolute inset-0 z-0 opacity-10 pointer-events-none border-r-[1px] border-black skew-x-[-15deg]" />
            <div className="relative z-10 flex flex-col items-start px-5 lg:px-6 justify-center h-full text-left">
              <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-60 italic">{tabMap[t].sub}</span>
              <h3 className="font-bebas text-2xl lg:text-3xl xl:text-4xl tracking-tighter uppercase italic">{t}</h3>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <div className="relative border-x-[3px] border-b-[3px] md:border-x-[4px] md:border-b-[4px] border-black p-5 md:p-8 min-h-[380px] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
        <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col md:grid md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-5 space-y-4">
            <div className="inline-block border-2 border-black px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-black text-black/80 uppercase tracking-widest">Operational Registry // 0{tabs.indexOf(active) + 1}</div>
            <h4 className="text-2xl sm:text-3xl md:text-5xl font-black leading-[1.1] text-black tracking-tighter uppercase">{descMap[active]}</h4>
            <p className="text-[10px] md:text-sm font-medium text-black/60 uppercase pt-4 border-t-2 border-black/10 leading-relaxed">
              Utilizing a versatile arsenal for <span className="text-black font-black italic underline decoration-2 underline-offset-4 uppercase">Niranj</span> enterprise solutions.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-2 md:gap-3">
            {activeData.items.map((name, i) => (
              <motion.div
                key={`${active}-${name}`}
                initial={{ opacity: 0, scale: 0.9, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -5, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
                className="relative h-20 sm:h-24 md:h-32 border-[2px] md:border-[3px] border-black overflow-hidden group cursor-crosshair bg-white hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] group-hover:opacity-10 transition-opacity">
                  <span className="font-bebas text-6xl italic">{name[0]}</span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4 z-10 bg-white/40 group-hover:bg-black/90 transition-colors duration-300">
                  <span className="font-bebas text-lg md:text-2xl tracking-tight text-black group-hover:text-white transition-colors">{name}</span>
                </div>
                <div className="absolute top-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        </AnimatePresence>
        <div className="hidden md:flex absolute bottom-6 left-8 items-center gap-4 opacity-10">
          <span className="text-[10px] font-black tracking-[0.4em] text-black uppercase">Systems // 2026 // Niranj C N</span>
          <div className="w-12 h-[2px] bg-black" />
        </div>
      </div>
    </section>
  )
}

export default Home

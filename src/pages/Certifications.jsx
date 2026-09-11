import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const BASE = '/images/Certificates-main/Certificates-main/'
const THUMB_BASE = '/images/thumbs/'
const src = (f) => encodeURI(BASE + f)
const thumbSrc = (f) => encodeURI(THUMB_BASE + f + '.jpg')

const spotlight = {
  title: "Best Paper Award — RAET'26",
  issuer: 'RAET National Conference',
  year: '2026',
  file: 'tracient-raet26.jpg',
  type: 'img',
}

const dp700 = {
  title: 'DP-700 — Exam Completion',
  issuer: 'Microsoft',
  year: '2026',
  file: 'dp-700.png',
  type: 'img',
}

/* Individual certificates, ordered by importance */
const items = [
  { file: 'Niranj C N-1.png', title: 'iTech Hackfest 2023 — National Hackathon', issuer: 'PSG iTech · SAP', year: '2023', cat: 'HACKATHONS', type: 'img' },
  { file: 'CertificateOfCompletion_Data Engineering Professional Certificate by Snowflake.pdf', title: 'Data Engineering', issuer: 'Snowflake', year: '', cat: 'DATA & AI', type: 'pdf' },
  { file: 'CertificateOfCompletion_Microsoft Azure AI Essentials Professional Certificate by Microsoft and LinkedIn.pdf', title: 'Azure AI Essentials', issuer: 'Microsoft · LinkedIn', year: '', cat: 'DATA & AI', type: 'pdf' },
  { file: 'CertificateOfCompletion_Microsoft Azure Essentials Professional Certificate by Microsoft and LinkedIn.pdf', title: 'Microsoft Azure Essentials', issuer: 'Microsoft · LinkedIn', year: '', cat: 'CLOUD & DEVOPS', type: 'pdf' },
  { file: 'MLOps Fundamentals.png', title: 'MLOps Fundamentals', issuer: 'Professional Course', year: '2024', cat: 'DATA & AI', type: 'img' },
  { file: 'microsoft_entra.png', title: 'Microsoft Entra', issuer: 'Microsoft', year: '2024', cat: 'CLOUD & DEVOPS', type: 'img' },
  { file: 'Docker & Kubernetes -2.png', title: 'Docker & Kubernetes', issuer: 'Professional Course', year: '2024', cat: 'CLOUD & DEVOPS', type: 'img' },
  { file: 'docker & Kubernities.png', title: 'Docker & Kubernetes (Advanced)', issuer: 'Professional Course', year: '2024', cat: 'CLOUD & DEVOPS', type: 'img' },
  { file: 'CertificateOfCompletion_Docker Foundations Professional Certificate.pdf', title: 'Docker Foundations', issuer: 'LinkedIn Learning', year: '', cat: 'CLOUD & DEVOPS', type: 'pdf' },
  { file: 'CertificateOfCompletion_Docker Your First Project.pdf', title: 'Docker — First Project', issuer: 'LinkedIn Learning', year: '', cat: 'CLOUD & DEVOPS', type: 'pdf' },
  { file: 'DevOps, Cloud Computing and Cyber Security.png', title: 'DevOps, Cloud & Cybersecurity', issuer: 'Professional Course', year: '2024', cat: 'CLOUD & DEVOPS', type: 'img' },
  { file: 'CertificateOfCompletion_Network Automation Professional Certificate by Arista Networks.pdf', title: 'Network Automation', issuer: 'Arista Networks', year: '', cat: 'CLOUD & DEVOPS', type: 'pdf' },
  { file: 'microsoft_entra.png', title: 'Microsoft Entra', issuer: 'Microsoft', year: '2024', cat: 'CLOUD & DEVOPS', type: 'img' },
  { file: 'CertificateOfCompletion_Atlassian Agile Project Management Professional Certificate.pdf', title: 'Atlassian Agile Pro Certificate', issuer: 'LinkedIn Learning · Atlassian', year: '', cat: 'AGILE & PROCESS', type: 'pdf' },
  { file: 'CertificateOfCompletion_Agile Project Management with Jira Cloud 3 Advanced Topics.pdf', title: 'Jira Cloud — Advanced Topics', issuer: 'LinkedIn Learning', year: '', cat: 'AGILE & PROCESS', type: 'pdf' },
  { file: 'CertificateOfCompletion_Mistakes to Avoid in Agile Project Management.pdf', title: 'Mistakes to Avoid in Agile', issuer: 'LinkedIn Learning', year: '', cat: 'AGILE & PROCESS', type: 'pdf' },
  { file: 'CertificateOfCompletion_Career Essentials in GitHub Professional Certificate.pdf', title: 'Career Essentials in GitHub', issuer: 'LinkedIn Learning', year: '', cat: 'ACADEMIC', type: 'pdf' },
  { file: 'software_engineer certificate.pdf', title: 'Software Engineer Certificate', issuer: 'HackerRank', year: '', cat: 'ACADEMIC', type: 'pdf' },
  { file: 'Introduction_to_Data_Science_certificate_Cisco.pdf', title: 'Intro to Data Science', issuer: 'Cisco', year: '', cat: 'DATA & AI', type: 'pdf' },
  { file: 'GenerativeAI.pdf', title: 'Generative AI', issuer: 'Professional Course', year: '', cat: 'DATA & AI', type: 'pdf' },
  { file: 'Python fo rdatascience ai and dev.pdf', title: 'Python for Data Science & AI', issuer: 'Professional Course', year: '', cat: 'DATA & AI', type: 'pdf' },
  { file: 'Roadmap to Become a  ML  Engineer.png', title: 'Roadmap to ML Engineer', issuer: 'Professional Course', year: '2023', cat: 'DATA & AI', type: 'img' },
  { file: 'React-Bootcamp.png', title: 'React Bootcamp', issuer: 'Professional Course', year: '2023', cat: 'WEB & DESIGN', type: 'img' },
  { file: 'Vblaze web designing challenge-1.png', title: 'Vblaze Web Design Challenge', issuer: 'Vblaze Tech Club', year: '2024', cat: 'WEB & DESIGN', type: 'img' },
  { file: 'UI and UX-1.png', title: 'UI and UX Design', issuer: 'Professional Course', year: '2023', cat: 'WEB & DESIGN', type: 'img' },
  { file: '1-day web design challenge.jpg', title: '1-Day Web Design Challenge', issuer: 'Design Workshop', year: '2023', cat: 'WEB & DESIGN', type: 'img' },
  { file: 'Low_Level_Design_of_Payment_Apps.png', title: 'Low Level Design of Payment Apps', issuer: 'Professional Course', year: '2024', cat: 'ENGINEERING', type: 'img' },
  { file: 'S.O.L.I.D PRINCIPLES EVERY DEVELOPER MUST KNOW.png', title: 'S.O.L.I.D Principles', issuer: 'Professional Course', year: '2024', cat: 'ENGINEERING', type: 'img' },
  { file: 'Computer Network & Network Security.pdf', title: 'Computer Networks & Security', issuer: 'Professional Course', year: '', cat: 'ENGINEERING', type: 'pdf' },
  { file: 'EH_udemy.pdf', title: 'Ethical Hacking', issuer: 'Udemy', year: '', cat: 'ENGINEERING', type: 'pdf' },
  { file: 'Auto CAD-1.png', title: 'AutoCAD Certification', issuer: 'Professional Course', year: '2023', cat: 'ENGINEERING', type: 'img' },
  { file: 'Self Driving EV-1.png', title: 'Self Driving EV', issuer: 'Professional Course', year: '2023', cat: 'ENGINEERING', type: 'img' },
  { file: 'Teachnook COURSE Completion Certificate _ Niranj C N-1.png', title: 'Teachnook Course Completion', issuer: 'Teachnook', year: '2023', cat: 'ACADEMIC', type: 'img' },
  { file: 'TEACHNOOK Internship Completion Certificate _ Niranj C N-1.png', title: 'Teachnook Internship', issuer: 'Teachnook', year: '2023', cat: 'ACADEMIC', type: 'img' },
]

const filters = ['ALL', 'HACKATHONS', 'CLOUD & DEVOPS', 'DATA & AI', 'WEB & DESIGN', 'ENGINEERING', 'ACADEMIC', 'AGILE & PROCESS']

/* Pre-rendered first-page covers (scripts/pdf-thumbs.mjs). Plain <img>,
   so covers always load — no runtime PDF engine. */
function PdfThumb({ file, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={className}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <span className="font-bebas text-7xl italic text-stone-700">PDF</span>
          <span className="text-[8px] font-black uppercase tracking-[0.25em] text-stone-600">cover unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <img src={thumbSrc(file)} alt="" loading="lazy" onError={() => setFailed(true)} className={imgClassName} />
    </div>
  )
}

function Certifications() {
  const [filter, setFilter] = useState('ALL')
  const [box, setBox] = useState(null) // single item { file, title, issuer, year, type }
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  const visible = items.filter(c => filter === 'ALL' || c.cat === filter)
  const framed = items.filter(c => c.type === 'img').length + 2 // + spotlight + dp-700
  const filed = items.filter(c => c.type === 'pdf').length

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setBox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1.5 bg-red-600 origin-left z-[70]" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-black text-white text-[10px] font-black tracking-[0.4em] px-3 py-1"
        >
          LEARN // VERIFY
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-bebas text-6xl md:text-8xl leading-[0.85] tracking-tighter italic uppercase mt-3"
        >
          CERTIFIED <br /> <span className="text-transparent [-webkit-text-stroke:1.5px_black]">CREDENTIALS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-3 text-[11px] font-black tracking-[0.3em] uppercase text-black/40"
        >
          Every claim on this site, verified · {framed} framed // {filed} filed // 1 Microsoft-verified
        </motion.p>
      </section>

      {/* SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-6">
        <motion.button
          initial={{ opacity: 0, y: 48, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          whileHover={{ y: -6, rotate: 0.5 }}
          onClick={() => setBox(spotlight)}
          className="lg:col-span-5 order-2 group relative text-left border-[4px] border-black bg-stone-100 overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300"
        >
          <div className="absolute top-0 left-0 z-20 bg-black text-white text-[10px] font-black tracking-[0.3em] px-4 py-2 border-b-[3px] border-r-[3px] border-black">★ RAET’26</div>
          <img src={src(spotlight.file)} alt={spotlight.title} className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
          <div className="absolute inset-x-0 bottom-0 bg-black text-white px-5 py-4 flex justify-between items-center gap-4">
            <div>
              <div className="font-bebas text-2xl md:text-3xl leading-none italic uppercase">{spotlight.title}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-1">{spotlight.issuer} · {spotlight.year}</div>
            </div>
            <span className="shrink-0 border-2 border-white px-3 py-1.5 text-[10px] font-black tracking-widest group-hover:bg-white group-hover:text-black transition-colors">VIEW ↗</span>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 48, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.12 }}
          whileHover={{ y: -6, rotate: -0.5 }}
          className="lg:col-span-7 order-1 group relative border-[4px] border-black bg-black text-white p-8 flex flex-col justify-between overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-shadow duration-300 min-h-[320px]"
        >
          <div className="absolute top-0 left-0 z-20 bg-red-600 text-white text-[10px] font-black tracking-[0.3em] px-4 py-2 border-b-[3px] border-r-[3px] border-black">★ BEST CREDENTIAL</div>
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 0)', backgroundSize: '12px 12px' }} />
          <div className="relative flex justify-between items-start mt-6">
            <span className="text-[10px] font-black tracking-[0.35em] uppercase opacity-60">Microsoft · DP-700</span>
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="relative">
            <div className="font-bebas text-5xl md:text-6xl leading-[0.85] italic uppercase">Fabric Data<br />Engineer<br /><span className="text-transparent [-webkit-text-stroke:1.5px_white]">Associate</span></div>
            <button
              onClick={() => setBox(dp700)}
              className="mt-5 flex items-center gap-3 border-2 border-stone-700 hover:border-white transition-colors p-2 pr-4 group/dp"
            >
              <img src={src(dp700.file)} alt="DP-700 record" className="w-20 aspect-[4/3] object-cover object-top" />
              <span className="text-left">
                <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-stone-400">Exam record</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] group-hover/dp:underline underline-offset-4">VIEW_SCORE ↗</span>
              </span>
            </button>
          </div>
          <div className="relative flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase">
            <a
              href="https://learn.microsoft.com/api/credentials/share/en-us/NiranjCN-8946/58C8E602D57E9D0A?sharingId=791990ED41203A07"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 px-4 py-2 group-hover:bg-white group-hover:text-black transition-colors"
            >
              VERIFY_CREDENTIAL ↗
            </a>
          </div>
        </motion.div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                filter === f
                  ? 'bg-black text-white border-black italic shadow-[3px_3px_0px_0px_rgba(220,38,38,1)]'
                  : 'bg-white text-black/60 border-black/20 hover:border-black hover:text-black'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* WALL */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.button
                layout
                key={c.file}
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                whileHover={{ y: -6 }}
                onClick={() => setBox(c)}
                className="group text-left border-[3px] border-black bg-white overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300"
              >
                <div className="relative overflow-hidden bg-stone-950">
                  {c.type === 'img' ? (
                    <img
                      src={src(c.file)}
                      alt={c.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover object-top group-hover:scale-[1.06] transition-transform duration-700"
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                  ) : (
                    <PdfThumb
                      file={c.file}
                      className="w-full aspect-[4/3] overflow-hidden bg-stone-950"
                      imgClassName="w-full h-full object-cover object-top group-hover:scale-[1.06] transition-transform duration-700"
                    />
                  )}
                  <span className="absolute top-2 left-2 bg-black text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1">{c.cat}</span>
                  <span className="absolute bottom-2 right-2 bg-white border-2 border-black text-[9px] font-black px-2 py-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">VIEW +</span>
                </div>
                <div className="relative p-4 border-t-[3px] border-black bg-white">
                  <div className="font-bebas text-xl leading-none uppercase tracking-tight group-hover:italic transition-all">{c.title}</div>
                  <div className="mt-1 text-[9px] font-black uppercase tracking-[0.25em] text-black/45">{c.issuer}{c.year ? ` · ${c.year}` : ''}</div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="border-t-[6px] border-black pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h3 className="font-bebas text-5xl leading-none italic uppercase">STACK THESE<br />INTO SYSTEMS.</h3>
          <Link to="/contact" className="group border-[3px] border-black bg-black text-white px-8 py-4 font-bebas text-xl tracking-widest italic hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] transition-all">GET_IN_TOUCH →</Link>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {box && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBox(null)}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <motion.figure
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full border-[4px] border-white bg-black"
            >
              {box.type === 'img' ? (
                <img src={src(box.file)} alt={box.title} className="w-full max-h-[70vh] object-contain bg-stone-950" />
              ) : (
                <div className="w-full bg-stone-950 p-4 md:p-6">
                  <PdfThumb
                    file={box.file}
                    className="w-full max-h-[52vh] overflow-hidden border-2 border-stone-800"
                    imgClassName="w-full h-full object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 pt-4">
                    <span className="font-bebas text-2xl uppercase text-stone-100">{box.title}</span>
                    <a href={src(box.file)} target="_blank" rel="noopener noreferrer" className="border-2 border-white px-6 py-2.5 text-xs font-black tracking-widest text-white hover:bg-white hover:text-black transition-colors">OPEN_FILE ↗</a>
                  </div>
                </div>
              )}
              <figcaption className="flex justify-between items-center gap-3 bg-white text-black px-5 py-3">
                <div className="min-w-0">
                  <div className="font-bebas text-xl leading-none uppercase truncate">{box.title}</div>
                  <div className="text-[9px] font-black uppercase tracking-[0.25em] text-black/50 mt-1">
                    {box.issuer}{box.year ? ` · ${box.year}` : ''}
                  </div>
                </div>
                <button onClick={() => setBox(null)} className="shrink-0 border-2 border-black px-3 py-1.5 text-xs font-black hover:bg-black hover:text-white transition-colors">ESC ✕</button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Certifications

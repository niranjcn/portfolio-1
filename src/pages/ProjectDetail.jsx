import { Link, useParams, Navigate } from 'react-router-dom'
import { siteContent } from '../data/content.js'

const imageMap = {
  '01': ['/images/tracient/frontend1.png', '/images/tracient/architecturefinal(2).png', '/images/tracient/anomaly_model_results.png'],
  '02': ['/images/railway/Screenshot 2026-05-10 125138.png', '/images/railway/Screenshot 2026-05-10 125145.png'],
  '03': ['/images/dms/Screenshot 2026-05-10 085439.png', '/images/dms/Screenshot 2026-05-10 085620.png', '/images/dms/Screenshot 2026-05-10 085734.png'],
  '04': ['/images/step4eco/Screenshot 2026-05-10 085948.png', '/images/step4eco/Screenshot 2026-05-10 090001.png'],
  '05': ['/images/examhall/Screenshot 2026-05-10 125138.png', '/images/examhall/1000233804.jpg'],
  '06': ['/images/kccl/1000233801.jpg', '/images/kccl/1000233802.jpg'],
}

function ProjectDetail() {
  const { id } = useParams()
  const project = siteContent.projects.list.find(p => p.number === id)

  if (!project) return <Navigate to="/projects" replace />

  const images = imageMap[id] || []

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors">← BACK TO PROJECTS</Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-bebas text-sm tracking-[0.2em] text-black/40">PROJECT_{project.number}</span>
          <span className="text-[11px] font-black tracking-widest uppercase border border-black px-2 py-0.5">{project.year}</span>
          <span className="text-[11px] font-black tracking-widest uppercase text-stone-500">{project.status}</span>
          {project.featured && <span className="bg-black text-white text-[10px] font-black px-2 py-0.5">★ BEST PAPER RAET&apos;26</span>}
        </div>
        <h1 className="font-bebas text-5xl md:text-7xl leading-[0.85] tracking-tighter italic uppercase">{project.title}</h1>
        <p className="mt-3 text-lg font-medium text-black/60 max-w-3xl">{project.tagline}</p>
        <div className="mt-4 h-[2px] bg-black max-w-7xl" />
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map(s => (
            <span key={s} className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-2 py-1 skew-x-[-8deg]">{s}</span>
          ))}
        </div>
      </section>

      {images.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {images.map((src, i) => (
              <div key={i} className={`border-[4px] border-black bg-stone-100 overflow-hidden ${i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-video'}`}>
                <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 pb-12">
        <div className="md:col-span-8 space-y-8">
          <div className="border-l-[4px] border-black pl-6">
            <h3 className="font-bebas text-2xl tracking-tighter italic uppercase">Overview</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70">{project.description}</p>
          </div>

          <div className="space-y-4">
            {project.longDescription.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-black/70">{para}</p>
            ))}
          </div>

          {project.highlights && (
            <div className="border-2 border-black p-6 bg-stone-50">
              <h4 className="font-bebas text-xl tracking-widest uppercase">Highlights</h4>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-black/70"><span className="font-black">↳</span> {h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {project.links.github && project.links.github.startsWith('http') && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="border-[3px] border-black bg-black text-white px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors">OPEN GITHUB →</a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="border-[3px] border-black bg-white px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">LIVE DEMO →</a>
            )}
            <Link to="/contact" className="border-[3px] border-black bg-white px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">DISCUSS THIS PROJECT →</Link>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="border-[3px] border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-bebas text-lg tracking-widest uppercase">Metrics</h4>
            <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-1">
              {project.metrics.map(([val, label]) => (
                <div key={val} className="border-l-2 border-black pl-3">
                  <div className="font-bebas text-2xl leading-none">{val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/40">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {project.badges && project.badges.length > 0 && (
            <div className="border-[3px] border-black p-6 bg-black text-white">
              <h4 className="font-bebas text-sm tracking-[0.2em] uppercase opacity-60">Badges</h4>
              <div className="mt-3 space-y-2">
                {project.badges.map(b => (
                  <div key={b} className="border border-white/20 px-3 py-2 text-xs font-black uppercase tracking-widest">★ {b}</div>
                ))}
              </div>
            </div>
          )}

          <div className="border-2 border-black p-4 bg-stone-50">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Core_Focus</div>
            <p className="text-sm font-bold mt-2">{project.highlights[0]}</p>
          </div>

          <Link to="/projects" className="block border-2 border-black bg-white p-4 text-center font-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">← ALL PROJECTS</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 border-t-2 border-black pt-4">
          <span>PROJECT_{project.number} // {project.title}</span>
          <span className="ml-auto">NEXT: {siteContent.projects.list.find(p => p.number !== project.number)?.title.slice(0, 20)} →</span>
        </div>
      </section>
    </main>
  )
}

export default ProjectDetail

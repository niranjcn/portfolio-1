import { Link } from 'react-router-dom'
import { siteContent } from '../data/content.js'

function Blog() {
  const posts = [
    {
      title: 'TRACIENT — Blockchain Income Traceability & Anomaly Detection',
      excerpt: 'National-scale income fraud detection using Hyperledger Fabric and XGBoost — Best Paper at RAET’26 over 30,000+ profiles.',
      tag: 'RESEARCH',
      date: '2026',
      views: '1.2k',
      reads: '342',
      link: 'https://github.com/niranjcn/tracient',
    },
    {
      title: 'Railway Platform Monitoring — YOLOv8 Danger Zone Detection',
      excerpt: 'Real-time pedestrian risk detection at platforms with 4,000+ Roboflow-annotated images. Presented at RAET’25.',
      tag: 'COMPUTER VISION',
      date: '2025',
      views: '892',
      reads: '210',
      link: 'https://github.com/niranjcn/re-tram',
    },
    {
      title: '80% Ops Reduction at Kerala Vision — DNS & Backup Automation',
      excerpt: 'Two microservices that eliminated 15 hrs/week manual ops across Multi-NOC sites.',
      tag: 'DEVOPS',
      date: '2025',
      views: '640',
      reads: '156',
      link: '/projects/03',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <h1 className="font-bebas text-6xl md:text-8xl leading-[0.85] tracking-tighter italic uppercase">TECHNICAL <br /> <span className="text-transparent [-webkit-text-stroke:1.5px_black]">LOGS</span></h1>
        <p className="text-[11px] font-black tracking-[0.3em] uppercase text-black/40 mt-2">Medium_Articles // Engineering_Notes · Swipe_to_explore_articles</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12 space-y-6">
        {posts.map(p => (
          <a key={p.title} href={p.link} target={p.link.startsWith('http') ? '_blank' : undefined} rel={p.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="group block border-[3px] border-black bg-white hover:bg-stone-50 transition-colors">
            <div className="grid md:grid-cols-12 gap-6 p-6">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-block bg-black text-white px-2 py-1 text-[9px] font-black tracking-widest uppercase">{p.tag}</div>
                <h3 className="font-bebas text-3xl md:text-4xl leading-none uppercase tracking-tighter group-hover:italic group-hover:underline decoration-red-600 underline-offset-4">{p.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed border-l-2 border-black pl-4">{p.excerpt}</p>
                <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest pt-2">
                  <span className="border border-black px-2 py-1">READ →</span>
                  <span className="text-black/40">{p.date}</span>
                </div>
              </div>
              <div className="md:col-span-4 flex md:flex-col gap-6 border-t md:border-t-0 md:border-l border-black/10 pt-4 md:pt-0 md:pl-6">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-black/40">Views</div>
                  <div className="font-bebas text-4xl italic">{p.views}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-black/40">Reads</div>
                  <div className="font-bebas text-4xl italic">{p.reads}</div>
                </div>
              </div>
            </div>
          </a>
        ))}

        <div className="border-[3px] border-black p-8 bg-stone-950 text-stone-100 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60">More on GitHub</div>
            <p className="font-bebas text-3xl italic uppercase mt-2">6 PROJECTS · OPEN SOURCE</p>
          </div>
          <a href="https://github.com/niranjcn" target="_blank" rel="noopener noreferrer" className="border-2 border-white px-6 py-3 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors self-start">GITHUB →</a>
        </div>
      </section>
    </main>
  )
}

export default Blog

import { Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteContent } from '../data/content.js'

function Footer() {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t-[12px] border-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 0)', backgroundSize: '10px 10px' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-block bg-black text-white text-[10px] font-black tracking-[0.5em] px-3 py-1 mb-2">CONTACT // COLLABORATION</div>
            <h2 className="font-bebas text-7xl md:text-[10rem] leading-[0.8] tracking-tighter italic text-black uppercase">
              NIRANJ <br />
              <span className="relative">
                C N<div className="absolute -bottom-2 left-0 w-full h-4 bg-black skew-x-[-20deg]" />
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 border-b-[6px] border-black pb-4">
            <div className="space-y-1">
              <p className="font-bold text-lg text-black leading-tight uppercase">Building systems that scale, secure, and automate.</p>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/niranjcn" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a href="https://linkedin.com/in/niranjcn" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://leetcode.com/u/niranjcn/" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all" aria-label="LeetCode">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-1">
            <span className="font-black text-xs uppercase tracking-[0.4em] text-black">Inquiries</span>
            <a href={`mailto:${siteContent.resume.email}`} className="text-2xl md:text-4xl font-bebas text-black hover:italic transition-all">
              {siteContent.resume.email}
            </a>
          </div>
          <a href={siteContent.hero.resumeFile} target="_blank" rel="noopener noreferrer" className="group relative px-12 py-6 bg-black text-white font-bebas text-3xl tracking-widest italic overflow-hidden transition-transform active:scale-95">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]" />
            </div>
            <span className="relative z-10 flex items-center gap-4">VIEW RESUME <Download size={24} strokeWidth={3} /></span>
            <div className="absolute -inset-1 border-2 border-black -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
          </a>
        </div>
        <div className="mt-24 pt-4 border-t-2 border-black flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
          <span>KANNUR // INDIA</span>
          <span className="text-black">© 2026 Niranj C N</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

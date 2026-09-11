import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { siteContent } from '../data/content.js'

const navLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Certifications', to: '/certifications' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[60] bg-white border-b-[6px] border-black">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        <Link to="/" className="group relative flex items-baseline gap-2 md:gap-3 font-bebas leading-none tracking-tighter whitespace-nowrap" onClick={() => setMenuOpen(false)}>
          <span className="text-black text-[1.7rem] md:text-[2rem] group-hover:italic transition-all italic tracking-tighter">NIRANJ</span>
          <span className="text-transparent text-[1.7rem] md:text-[2rem] [-webkit-text-stroke:1.35px_black] group-hover:text-black transition-colors tracking-tighter">C N</span>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500" />
        </Link>

        {/* CENTER — section links shifted right toward actions */}
        <div className="hidden lg:flex items-center gap-1 lg:gap-1.5 lg:ml-auto lg:mr-10 lg:translate-x-4">
          {navLinks.map(link => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `group relative transition-all duration-300 px-2.5 lg:px-3 py-1.5 uppercase tracking-[0.18em] text-[10px] font-black border-2 ${
                  isActive
                    ? 'bg-black text-white border-black italic shadow-[3px_3px_0px_0px_rgba(220,38,38,1)]'
                    : 'text-black/60 border-transparent hover:text-black hover:border-black hover:bg-white hover:italic hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 shrink-0 transition-colors ${isActive ? 'bg-red-600' : 'bg-black/20 group-hover:bg-black'}`} />
                  {link.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* RIGHT — actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden lg:block h-6 w-[2px] bg-black rotate-[20deg]" />

          <div className="hidden lg:flex items-center gap-5">
            <a href="https://linkedin.com/in/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-transform" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://github.com/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black hover:scale-125 transition-transform" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

          <a
            href={siteContent.hero.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hidden lg:inline-flex ml-1 border-[3px] border-black bg-white px-6 lg:px-8 py-2 text-xs font-black text-black uppercase tracking-[0.3em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all overflow-hidden group"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 0)', backgroundSize: '6px 6px' }} />
            <span className="relative z-10 flex items-center gap-2">RESUME <span className="text-[12px] opacity-40 group-hover:opacity-100 italic transition-opacity">[🔻]</span></span>
          </a>

          <button className="lg:hidden border-2 border-black p-2 bg-black text-white" aria-label="Toggle menu" onClick={() => setMenuOpen(p => !p)}>
            <div className="space-y-1.5">
              <span className={`block h-[2px] w-6 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-8 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t-[3px] border-black bg-white">
          <div className="px-6 py-6 space-y-2">
            {navLinks.map(link => (
              <NavLink
                key={link.to + link.label}
                to={link.to}
                end={link.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between border-2 px-4 py-3 uppercase tracking-[0.2em] text-xs font-black transition-all ${
                    isActive
                      ? 'bg-black text-white border-black italic shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]'
                      : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 ${isActive ? 'bg-red-600' : 'bg-black/20'}`} />
                      {link.label}
                    </span>
                    {isActive && <span className="text-[9px] tracking-[0.3em] text-red-600 italic">● ACTIVE</span>}
                  </>
                )}
              </NavLink>
            ))}
            <div className="flex gap-4 pt-4">
              <a href="https://linkedin.com/in/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></a>
              <a href="https://github.com/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg></a>
              <a href={siteContent.hero.resumeFile} target="_blank" rel="noopener noreferrer" className="border-[3px] border-black bg-white px-4 py-2 text-xs font-black">RESUME [🔻]</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

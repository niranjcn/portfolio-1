import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

function Panel01Hero() {
  const badgeRef = useInView()
  const titleRef = useInView()
  const taglineRef = useInView()
  const actionsRef = useInView()
  const statsRef = useInView()

  return (
    <section id="landing" className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div ref={badgeRef} className="hero-badge">
            <div className="inline-flex items-center gap-2 rotate-[-1deg] border-[3px] border-black bg-white shadow-brutal px-4 py-2 font-bebas text-lg italic uppercase tracking-[0.3em]">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              Backend Engineer
            </div>
          </div>

          <h1 ref={titleRef} className="hero-title font-bebas italic text-7xl md:text-[11rem] font-black leading-[0.8] mt-6 select-none">
            <span className="block text-black">NIRANJ</span>
            <span className="block text-stroke">C N</span>
          </h1>

          <p ref={taglineRef} className="hero-tagline font-inter text-sm md:text-base text-black/70 max-w-xl mt-6">
            {siteContent.about.paragraphs[0]}
          </p>

          <div className="flex items-center gap-2 mt-3 font-inter text-xs text-black/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Based in {siteContent.about.ownerLocation}
          </div>

          <div ref={actionsRef} className="hero-actions flex flex-wrap items-center gap-4 mt-8">
            <a href="#about" className="brutal-btn group relative overflow-hidden">
              <span className="relative z-10">About Me</span>
              <span className="absolute inset-0 dot-grid opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href={siteContent.hero.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn-dark"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Resume
            </a>
            <div className="flex items-center gap-3">
              <a href="https://github.com/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black/60 transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com/in/niranjcn" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black/60 transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image flex-shrink-0">
          <div className="w-[280px] h-[320px] border-[3px] border-black shadow-brutal bg-stone-100 flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>

      <div ref={statsRef} className="hero-stats border-t-[3px] border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <span className="block font-bebas text-4xl italic text-black">1+</span>
              <span className="block font-inter text-[10px] font-black uppercase tracking-[0.2em] text-black/50 mt-1">Years</span>
            </div>
            <div className="text-center">
              <span className="block font-bebas text-4xl italic text-black">3</span>
              <span className="block font-inter text-[10px] font-black uppercase tracking-[0.2em] text-black/50 mt-1">Projects</span>
            </div>
            <div className="text-center">
              <span className="block font-bebas text-4xl italic text-black">80%</span>
              <span className="block font-inter text-[10px] font-black uppercase tracking-[0.2em] text-black/50 mt-1">Efficiency</span>
            </div>
            <div className="text-center">
              <span className="block font-bebas text-4xl italic text-black">2</span>
              <span className="block font-inter text-[10px] font-black uppercase tracking-[0.2em] text-black/50 mt-1">Awards</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-badge,
        .hero-title,
        .hero-tagline,
        .hero-actions,
        .hero-image,
        .hero-stats {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-badge { transform: translateY(24px); }
        .hero-title { transform: translateY(24px); transition-delay: 0.15s; }
        .hero-tagline { transform: translateY(24px); transition-delay: 0.3s; }
        .hero-image { transform: translateY(24px) scale(0.95); transition-delay: 0.2s; }
        .hero-actions { transform: translateY(24px); transition-delay: 0.5s; }
        .hero-stats { transform: translateY(24px); transition-delay: 0.7s; }
        .hero-badge.visible,
        .hero-title.visible,
        .hero-tagline.visible,
        .hero-actions.visible,
        .hero-image.visible,
        .hero-stats.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>
    </section>
  )
}

export default Panel01Hero

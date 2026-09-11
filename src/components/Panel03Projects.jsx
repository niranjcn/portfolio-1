import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const projects = siteContent.projects.list.slice(0, 3)

function Panel03Projects() {
  const titleRef = useInView()
  const barRef = useInView()
  const cardRef0 = useInView()
  const cardRef1 = useInView()
  const cardRef2 = useInView()
  const cardRefs = [cardRef0, cardRef1, cardRef2]

  return (
    <section id="projects" className="bg-white py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 ref={titleRef} className="projects-title font-bebas italic text-6xl md:text-8xl font-black leading-[0.8]">
          Active{' '}
          <span className="text-stroke">PROJECTS</span>
        </h2>

        <div ref={barRef} className="projects-bar h-1 bg-red-600 w-1/3 mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.number}
              ref={cardRefs[i]}
              className={`projects-card border-[3px] border-black brutal-card group ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="h-52 bg-stone-100 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-stone-100 group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0">
                  <span className="font-bebas italic text-8xl font-black text-black/5 select-none">
                    {project.number}
                  </span>
                </div>
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="font-bebas italic text-[9px] tracking-[0.15em] uppercase bg-white border-[2px] border-black px-2 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bebas italic text-2xl md:text-3xl font-black leading-[0.85] group-hover:text-red-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-inter text-xs text-black/70 mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.stack.slice(0, 5).map(tech => (
                    <span key={tech} className="font-bebas italic text-[9px] tracking-[0.1em] uppercase bg-black/5 px-2 py-0.5 text-black/60 border border-black/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="font-bebas italic text-[10px] tracking-[0.2em] text-black/40 uppercase">{project.status}</span>
                  <a
                    href={project.links.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-bebas italic text-xs tracking-[0.15em] uppercase group/link"
                  >
                    <span className="group-hover/link:text-red-600 transition-colors">View</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-title,
        .projects-bar,
        .projects-card {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .projects-title { transform: translateY(40px); }
        .projects-bar { transform: translateX(-20px); transition-delay: 0.15s; }
        .projects-card { transform: translateY(40px); }
        .projects-card:nth-child(2) { transition-delay: 0.2s; }
        .projects-card:nth-child(3) { transition-delay: 0.35s; }
        .projects-title.visible,
        .projects-bar.visible,
        .projects-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .projects-bar.visible {
          transform: translateX(0);
        }
      `}</style>
    </section>
  )
}

export default Panel03Projects

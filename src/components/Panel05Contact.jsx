import { Download } from 'lucide-react'
import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const { contact, resume } = siteContent

function Panel05Contact() {
  const formRef = useInView()
  const infoRef = useInView()

  return (
    <>
      <section id="contact" className="bg-stone-950 text-stone-100 py-32 dot-grid-white relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="font-bebas text-7xl uppercase tracking-wide mb-16">
            <span className="text-stroke-white">Contact</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={formRef}>
              <form action="https://formsubmit.co/niranjcn000@gmail.com" method="POST">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />

                <div className="mb-8">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-transparent border-b-[3px] border-stone-600 text-stone-100 font-inter text-lg pb-3 outline-none focus:border-white transition-colors placeholder:text-stone-500"
                  />
                </div>
                <div className="mb-8">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-transparent border-b-[3px] border-stone-600 text-stone-100 font-inter text-lg pb-3 outline-none focus:border-white transition-colors placeholder:text-stone-500"
                  />
                </div>
                <div className="mb-8">
                  <input
                    name="_subject"
                    type="text"
                    placeholder="Subject"
                    required
                    className="w-full bg-transparent border-b-[3px] border-stone-600 text-stone-100 font-inter text-lg pb-3 outline-none focus:border-white transition-colors placeholder:text-stone-500"
                  />
                </div>
                <div className="mb-8">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Message"
                    required
                    className="w-full bg-transparent border-b-[3px] border-stone-600 text-stone-100 font-inter text-lg pb-3 outline-none focus:border-white transition-colors placeholder:text-stone-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="brutal-btn-dark font-bebas text-xl uppercase tracking-wide px-10 py-4 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div ref={infoRef} className="space-y-8">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={contact.mailto} className="font-inter text-stone-300 hover:text-white transition-colors">
                  {resume.email}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-inter text-stone-300">{resume.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" className="shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-inter text-stone-300">{resume.location}</span>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href={`https://${resume.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[3px] border-stone-600 text-stone-300 hover:border-white hover:text-white transition-colors px-6 py-3 font-bebas uppercase tracking-wide flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={`https://${resume.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[3px] border-stone-600 text-stone-300 hover:border-white hover:text-white transition-colors px-6 py-3 font-bebas uppercase tracking-wide flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t-[12px] border-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: `radial-gradient(#000 2px, transparent 0)`, backgroundSize: '10px 10px' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-block bg-black text-white text-[10px] font-black tracking-[0.5em] px-3 py-1 mb-2">
                CONTACT // COLLABORATION
              </div>
              <h2 className="font-bebas text-7xl md:text-[10rem] leading-[0.8] tracking-tighter italic text-black uppercase">
                NIRANJ <br />
                <span className="relative">
                  C N
                  <div className="absolute -bottom-2 left-0 w-full h-4 bg-black skew-x-[-20deg]" />
                </span>
              </h2>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6 border-b-[6px] border-black pb-4">
              <div className="space-y-1">
                <p className="font-bold text-lg text-black leading-tight uppercase">
                  Building systems that scale, secure, and automate.
                </p>
              </div>

              <div className="flex gap-4">
                <a href={`https://${resume.github}`} target="_blank" rel="noopener noreferrer"
                   className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href={`https://${resume.linkedIn}`} target="_blank" rel="noopener noreferrer"
                   className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-1">
              <span className="font-black text-xs uppercase tracking-[0.4em] text-black">Inquiries</span>
              <a href={contact.mailto} className="text-2xl md:text-4xl font-bebas text-black hover:italic transition-all">
                {resume.email}
              </a>
            </div>

            <a
              href={siteContent.hero.resumeFile}
              download
              className="group relative px-12 py-6 bg-black text-white font-bebas text-3xl tracking-widest italic overflow-hidden transition-transform active:scale-95"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
                <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]" />
              </div>
              <span className="relative z-10 flex items-center gap-4">
                VIEW RESUME <Download size={24} strokeWidth={3} />
              </span>
              <div className="absolute -inset-1 border-2 border-black -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </a>
          </div>

          <div className="mt-24 pt-4 border-t-2 border-black flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
            <span>KANNUR // INDIA</span>
            <span className="text-black">&copy; 2026 Niranj C N</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Panel05Contact

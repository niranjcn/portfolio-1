import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const { education } = siteContent.resume

const [institution, degree, cgpa, period] = education.split(' · ')

function PanelEducation() {
  const cardRef = useInView()

  return (
    <section id="education" className="bg-stone-950 text-stone-100 py-32 dot-grid-white relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="font-bebas text-7xl uppercase tracking-wide mb-16 text-stone-100">
          <span className="text-stroke-white">Education</span>
        </h2>

        <div ref={cardRef} className="border-[3px] border-stone-700 bg-stone-900 p-10 max-w-2xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="shrink-0 mt-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="36" height="36" className="text-stone-400">
                <path d="M22 10l-10-5L2 10l10 5 10-5z"/>
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
              </svg>
            </div>
            <div className="space-y-3">
              <h3 className="font-bebas text-2xl uppercase tracking-wide text-white">{degree}</h3>
              <p className="font-inter text-stone-400">{institution}</p>
              <div className="flex gap-6 pt-2">
                <span className="font-inter text-sm uppercase tracking-wider text-stone-500 border border-stone-700 px-3 py-1">{cgpa}</span>
                <span className="font-inter text-sm uppercase tracking-wider text-stone-500 border border-stone-700 px-3 py-1">{period}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PanelEducation

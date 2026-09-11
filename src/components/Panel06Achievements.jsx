import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const { achievements } = siteContent

function Panel06Achievements() {
  const sectionRef = useInView()

  return (
    <section id="achievements" className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>
        <h2 className="font-bebas text-7xl uppercase tracking-wide mb-16">
          <span className="text-stroke">Achievements</span>
        </h2>

        <div className="flex gap-12 mb-20 justify-center">
          <div className="text-center">
            <div className="font-bebas text-5xl">{achievements.list.length}</div>
            <div className="font-inter text-sm uppercase tracking-wider text-gray-600 mt-2">Achievements</div>
          </div>
          <div className="text-center">
            <div className="font-bebas text-5xl">{achievements.list.filter(a => a.highlight).length}</div>
            <div className="font-inter text-sm uppercase tracking-wider text-gray-600 mt-2">Highlights</div>
          </div>
          <div className="text-center">
            <div className="font-bebas text-5xl">{new Set(achievements.list.map(a => a.year)).size}</div>
            <div className="font-inter text-sm uppercase tracking-wider text-gray-600 mt-2">Years</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.list.map((item) => (
            <div key={item.id} className="brutal-card border-[3px] border-black p-6">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bebas text-xl uppercase tracking-wide mb-2">{item.title}</h3>
              <p className="font-inter text-sm text-gray-600 mb-3">{item.org}</p>
              <p className="font-inter text-sm leading-relaxed">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map(tag => (
                  <span key={tag} className="font-inter text-xs uppercase tracking-wider border-[2px] border-black px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Panel06Achievements

import { useState } from 'react'
import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const { categories } = siteContent.skills

const tabCategories = {
  BACKEND: ['Backend', 'ML / AI', 'Blockchain'],
  FRONTEND: ['Frontend'],
  DEVOPS: ['Databases', 'DevOps & Cloud'],
}

const TABS = Object.keys(tabCategories)

function Panel04Experience() {
  const [activeTab, setActiveTab] = useState('BACKEND')
  const sectionRef = useInView()

  const activeCategoryNames = tabCategories[activeTab]
  const activeItems = categories
    .filter(cat => activeCategoryNames.includes(cat.name))
    .flatMap(cat => cat.items)

  return (
    <section id="tech-stack" className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>
        <h2 className="font-bebas text-7xl uppercase tracking-wide mb-16">
          Tech{' '}
          <span className="text-stroke">Stack</span>
        </h2>

        <div className="flex gap-4 mb-16">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-bebas text-xl uppercase tracking-wide px-8 py-3 cursor-pointer transition-colors ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-[3px] border-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeItems.map((item) => (
            <div
              key={item}
              className="border-[3px] border-black bg-white p-6 text-center group cursor-default relative overflow-hidden transition-colors hover:bg-black hover:text-white"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <span className="font-inter text-sm uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Panel04Experience

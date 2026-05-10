import { useEffect, useState } from 'react'
import { siteContent } from '../data/content.js'

function Panel05Contact() {
  const [visibleLines, setVisibleLines] = useState([])
  const [activeSocial, setActiveSocial] = useState(null)

  useEffect(() => {
    const timers = siteContent.contact.lines.map((_, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, siteContent.contact.lines[index]])
      }, index * 600)
    )
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <section className="relative flex min-h-screen md:h-screen w-screen flex-col justify-between bg-ink text-cream">
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16 md:py-0">
        <div className="font-mono text-sm md:text-lg leading-relaxed">
          {visibleLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          {visibleLines.length === siteContent.contact.lines.length ? (
            <a data-magnetic href={siteContent.contact.mailto}
              className="mt-4 inline-block font-mono text-saffron terminal-blink">
              {siteContent.contact.cta}
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pb-8 md:pb-10 px-6 font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.3em]">
        {siteContent.contact.socials.map((social) => (
          <a key={social.label} data-magnetic href={social.href}
            onMouseEnter={() => setActiveSocial(social.label)}
            onMouseLeave={() => setActiveSocial(null)}
            className={`transition-transform duration-300 ${
              activeSocial
                ? activeSocial === social.label ? 'scale-105' : 'scale-95 opacity-70'
                : 'scale-100'
            }`}>
            {social.label}
          </a>
        ))}
      </div>

      <div className="pb-4 text-center font-body text-xs italic text-cream/70 px-4">
        {siteContent.contact.footer}
      </div>
    </section>
  )
}

export default Panel05Contact

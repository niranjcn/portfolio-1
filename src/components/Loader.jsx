import { useEffect, useState } from 'react'
import { siteContent } from '../data/content.js'

function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2300)
    return () => clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-ink text-cream">
      <div className="loader-wipe absolute inset-0 bg-ink" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="h-2 w-56 overflow-hidden bg-cream/10">
          <div className="loader-bar h-full origin-left bg-saffron" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.4em]">
          {siteContent.ui.loaderText}
        </span>
      </div>
    </div>
  )
}

export default Loader

import { useEffect, useState } from 'react'
import { siteContent } from '../data/content.js'

function BuildLog({ open, onClose }) {
  const [visible, setVisible] = useState([])

  useEffect(() => {
    if (!open) {
      setVisible([])
      return
    }
    const timers = siteContent.buildLog.lines.map((line, index) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, line])
      }, 500 + index * 500)
    )
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9998] bg-ink text-cream">
      <div className="flex h-full flex-col items-center justify-center gap-3 font-mono text-sm">
        <div className="mb-2 text-xs uppercase tracking-[0.4em] text-cream/70">
          {siteContent.buildLog.title}
        </div>
        {visible.map((line) => (
          <div key={line}>{line}</div>
        ))}
        <button
          type="button"
          data-magnetic
          onClick={onClose}
          className="mt-6 border border-cream/30 px-4 py-2 text-xs uppercase tracking-[0.3em]"
        >
          {siteContent.buildLog.closeLabel}
        </button>
      </div>
    </div>
  )
}

export default BuildLog

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
    <div className="fixed inset-0 z-[9998] bg-black flex flex-col items-center justify-center gap-3"
      style={{ fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace" }}
    >
      <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-stone-500">
        {siteContent.buildLog.title}
      </div>
      {visible.map((line) => (
        <div key={line} className="text-stone-300 text-sm">{line}</div>
      ))}
      <button
        type="button"
        onClick={onClose}
        className="mt-6 border border-stone-700 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-stone-500 bg-transparent cursor-pointer font-inter transition-colors hover:text-stone-100 hover:border-stone-500"
      >
        {siteContent.buildLog.closeLabel}
      </button>
    </div>
  )
}

export default BuildLog

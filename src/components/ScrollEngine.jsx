import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll.js'
import { siteContent } from '../data/content.js'

const PANEL_COUNT = 7

function ScrollEngine({ children, onPanelChange }) {
  const [isMobile, setIsMobile] = useState(false)
  const { x, progress, panelIndex } = useHorizontalScroll(PANEL_COUNT, !isMobile)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (onPanelChange) onPanelChange(panelIndex)
  }, [panelIndex, onPanelChange])

  const percent = Math.round(progress * 100)

  if (isMobile) {
    return (
      <div className="flex flex-col">
        {children}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <motion.div
        style={{ x }}
        className="flex h-full w-[700vw]"
      >
        {children}
      </motion.div>
      <div className="panel-progress absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex items-center gap-4 text-[10px] md:text-[11px] text-ink">
        <div className="h-[2px] flex-1 bg-ink/10">
          <div
            className="h-full bg-orange-500"
            style={{ width: `${percent}%`, transition: 'width 0.3s ease' }}
          />
        </div>
        <span>[{siteContent.ui.progressLabel} — {percent}%]</span>
      </div>
    </div>
  )
}

export default ScrollEngine

import { useEffect, useMemo, useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function useHorizontalScroll(panelCount, enabled) {
  const { scrollY } = useScroll()
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [progressValue, setProgressValue] = useState(0)
  const [panelIndex, setPanelIndex] = useState(0)

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxScroll = useMemo(() => {
    if (!enabled) return 1
    return Math.max(1, (panelCount - 1) * viewport.height)
  }, [panelCount, viewport.height, enabled])

  const maxTranslate = useMemo(() => {
    if (!enabled) return 0
    return (panelCount - 1) * viewport.width
  }, [panelCount, viewport.width, enabled])

  const x = useTransform(scrollY, [0, maxScroll], [0, -maxTranslate])

  useEffect(() => {
    if (!enabled) {
      document.body.style.height = 'auto'
      setProgressValue(0)
      return
    }
    document.body.style.height = `${panelCount * 100}vh`
    const unsubscribe = scrollY.on('change', (value) => {
      const progress = clamp(value / maxScroll, 0, 1)
      setProgressValue(progress)
      const index = clamp(Math.round(progress * (panelCount - 1)), 0, panelCount - 1)
      setPanelIndex(index)
    })
    return () => {
      document.body.style.height = 'auto'
      unsubscribe()
    }
  }, [enabled, maxScroll, panelCount, scrollY])

  return {
    x,
    progress: progressValue,
    panelIndex,
    viewport,
    scrollToPanel: (index) => {
      const next = clamp(index, 0, panelCount - 1)
      const targetY = next * viewport.height
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    },
  }
}

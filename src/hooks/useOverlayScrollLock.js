import { useEffect, useRef } from 'react'

export function useOverlayScrollLock(active) {
  const scrollRef = useRef(0)

  useEffect(() => {
    if (!active) return
    scrollRef.current = window.scrollY
    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    return () => {
      body.style.overflow = prevOverflow
      window.scrollTo({ top: scrollRef.current, behavior: 'auto' })
    }
  }, [active])

  return scrollRef
}

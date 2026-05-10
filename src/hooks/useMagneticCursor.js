import { useEffect, useRef, useState } from 'react'

const lerp = (start, end, factor) => start + (end - start) * factor

export function useMagneticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const target = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0, w: 40, h: 40, r: 999 })

  useEffect(() => {
    const canUse = window.matchMedia('(pointer: fine)').matches
    setEnabled(canUse)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    const onOver = (event) => {
      const targetEl = event.target.closest('[data-magnetic]')
      if (!targetEl || !ringRef.current) return
      const bounds = targetEl.getBoundingClientRect()
      ring.current = {
        x: bounds.left + bounds.width / 2,
        y: bounds.top + bounds.height / 2,
        w: bounds.width + 16,
        h: bounds.height + 16,
        r: Math.min(bounds.width, bounds.height) / 3,
      }
      ringRef.current.classList.add('cursor-active')
    }

    const onOut = () => {
      if (!ringRef.current) return
      ring.current = { x: target.current.x, y: target.current.y, w: 40, h: 40, r: 999 }
      ringRef.current.classList.remove('cursor-active')
    }

    let frameId
    const animate = () => {
      if (ringRef.current) {
        const { x, y, w, h, r } = ring.current
        const nextX = lerp(parseFloat(ringRef.current.dataset.x || x), x, 0.2)
        const nextY = lerp(parseFloat(ringRef.current.dataset.y || y), y, 0.2)
        ringRef.current.dataset.x = nextX
        ringRef.current.dataset.y = nextY
        ringRef.current.style.transform = `translate(${nextX}px, ${nextY}px)`
        ringRef.current.style.width = `${w}px`
        ringRef.current.style.height = `${h}px`
        ringRef.current.style.borderRadius = `${r}px`
      }
      frameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    frameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(frameId)
    }
  }, [enabled])

  return { dotRef, ringRef, enabled }
}

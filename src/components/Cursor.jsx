import { useEffect, useRef, useState } from 'react'

function Cursor() {
  const coreRef = useRef(null)
  const trailRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const trailPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return
    setEnabled(true)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      const el = e.target
      if (
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.getAttribute('data-magnetic') !== null ||
        el.closest('[data-magnetic]')
      ) {
        setHovering(true)
      }
    }

    const onLeave = () => {
      setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t
      trailPos.current.x = lerp(trailPos.current.x, pos.current.x, 0.12)
      trailPos.current.y = lerp(trailPos.current.y, pos.current.y, 0.12)

      if (coreRef.current) {
        coreRef.current.style.left = `${pos.current.x}px`
        coreRef.current.style.top = `${pos.current.y}px`
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trailPos.current.x}px`
        trailRef.current.style.top = `${trailPos.current.y}px`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('cursor-none')
    return () => document.body.classList.remove('cursor-none')
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Core dot — snaps instantly */}
      <div
        ref={coreRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          width: hovering ? '6px' : '10px',
          height: hovering ? '6px' : '10px',
          background: '#FF6B00',
          borderRadius: '50%',
          transition: 'width 0.2s ease, height 0.2s ease',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Trail ring — lags behind with lerp */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          width: hovering ? '52px' : '36px',
          height: hovering ? '52px' : '36px',
          border: `1.5px solid ${hovering ? '#FF6B00' : 'rgba(255,107,0,0.5)'}`,
          borderRadius: hovering ? '6px' : '50%',
          opacity: hovering ? 1 : 0.65,
          transition: 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, border-color 0.25s ease, opacity 0.25s ease',
        }}
      />
    </>
  )
}

export default Cursor

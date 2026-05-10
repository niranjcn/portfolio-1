import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { siteContent } from '../data/content.js'
import Ticker from './Ticker.jsx'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

function scramble(target, onUpdate, onDone) {
  const letters = target.split('')
  let iterations = 0
  const interval = setInterval(() => {
    const result = letters.map((letter, index) => {
      if (letter === ' ' || letter === '\n') return letter
      if (index < iterations) return target[index]
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    onUpdate(result.join(''))
    iterations += 0.4
    if (iterations >= letters.length) {
      clearInterval(interval)
      onUpdate(target)
      onDone?.()
    }
  }, 40)
  return () => clearInterval(interval)
}

function Panel01Hero({ onEnterSystem }) {
  const [displayName, setDisplayName] = useState('NIRANJ\nC N')
  const [typed, setTyped] = useState('')
  const [nameRevealed, setNameRevealed] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const hoverRef = useRef(null)

  const line = siteContent.hero.roleLine

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble('NIRANJ\nC N', setDisplayName, () => setNameRevealed(true))
    }, 400)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    let index = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1
        setTyped(line.slice(0, index))
        if (index >= line.length) clearInterval(interval)
      }, 35)
    }, 2200)
    return () => clearTimeout(start)
  }, [line])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    const { nodes, edges } = siteContent.hero.graph
    const points = nodes.map((n) => ({ id: n.id, x: n.x, y: n.y, vx: 0, vy: 0 }))
    const links = edges.map(([s, t, w]) => ({ source: s, target: t, weight: w }))

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    points.forEach((p) => {
      p.x = p.x * canvas.clientWidth
      p.y = p.y * canvas.clientHeight
    })

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      hoverRef.current = null
      points.forEach((p) => {
        if (Math.hypot(p.x - mx, p.y - my) < 14) hoverRef.current = p.id
      })
    }
    canvas.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.max(1, Math.hypot(dx, dy))
          const repel = 120 / (dist * dist)
          const fx = (dx / dist) * repel, fy = (dy / dist) * repel
          a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy
        }
      }
      links.forEach(({ source, target, weight }) => {
        const a = points.find((p) => p.id === source)
        const b = points.find((p) => p.id === target)
        if (!a || !b) return
        const dx = b.x - a.x, dy = b.y - a.y
        const dist = Math.max(1, Math.hypot(dx, dy))
        const ideal = 120 / weight
        const force = (dist - ideal) * 0.002
        const fx = (dx / dist) * force, fy = (dy / dist) * force
        a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy
      })
      points.forEach((p) => {
        p.vx *= 0.92; p.vy *= 0.92
        p.x = Math.min(Math.max(30, p.x + p.vx), canvas.clientWidth - 30)
        p.y = Math.min(Math.max(30, p.y + p.vy), canvas.clientHeight - 30)
      })
      links.forEach(({ source, target }) => {
        const a = points.find((p) => p.id === source)
        const b = points.find((p) => p.id === target)
        if (!a || !b) return
        const hl = hoverRef.current && (hoverRef.current === a.id || hoverRef.current === b.id)
        ctx.strokeStyle = hl ? 'rgba(255,107,0,0.9)' : 'rgba(13,13,13,0.18)'
        ctx.lineWidth = hl ? 2 : 1
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      })
      points.forEach((p) => {
        const hl = hoverRef.current === p.id
        if (hl) {
          ctx.beginPath(); ctx.arc(p.x, p.y, 18, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,107,0,0.08)'; ctx.fill()
        }
        ctx.fillStyle = hl ? '#FF6B00' : 'rgba(13,13,13,0.75)'
        ctx.beginPath(); ctx.arc(p.x, p.y, hl ? 7 : 4, 0, Math.PI * 2); ctx.fill()
        ctx.font = `${hl ? 'bold ' : ''}11px JetBrains Mono`
        ctx.fillStyle = hl ? '#FF6B00' : 'rgba(13,13,13,0.55)'
        ctx.fillText(p.id, p.x + 10, p.y - 8)
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const nameLines = displayName.split('\n')
  const nameFontSize = 'clamp(52px, 10vw, 120px)'

  return (
    <section className="breathing-cream relative flex min-h-screen md:h-screen w-screen overflow-x-hidden md:overflow-hidden">
      <div className="flex flex-col md:flex-row h-full w-full">

        {/* LEFT SIDE */}
        <div className="flex w-full md:w-[58%] flex-col justify-center px-5 sm:px-8 md:pl-16 md:pr-6 pt-16 sm:pt-20 md:pt-0 pb-6 md:pb-0">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 md:mb-4 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-orange-500"
          >
            ◈ Software Engineer &amp; ML Researcher
          </motion.div>

          {/* NAME */}
          <div className="relative">
            {nameRevealed && (
              <>
                <div aria-hidden className="name-glitch-1 absolute inset-0 select-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: nameFontSize, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#FF6B00', opacity: 0.6 }}>
                  {nameLines.map((l, i) => <div key={i}>{l}</div>)}
                </div>
                <div aria-hidden className="name-glitch-2 absolute inset-0 select-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: nameFontSize, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#0D0D0D', opacity: 0.35 }}>
                  {nameLines.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              </>
            )}
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: nameFontSize, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#0D0D0D', position: 'relative', zIndex: 2 }}>
              {nameLines.map((l, i) => (
                <div key={i} style={{ display: 'block' }}>
                  {i === 0 ? (
                    <span>
                      {l.split('').map((ch, ci) => (
                        <motion.span key={ci} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          transition={{ duration: 0.05, delay: ci * 0.04 + 0.5 }}
                          style={{ color: ci === 6 ? '#FF6B00' : 'inherit' }}>
                          {ch}
                        </motion.span>
                      ))}
                    </span>
                  ) : (
                    <span style={{ color: '#FF6B00' }}>{l}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-3 md:mt-4 h-[3px] w-16 md:w-24 bg-orange-500" />

          <div className="mt-3 md:mt-5 font-body text-sm md:text-base tracking-wide text-ink/70">
            {typed}
            {typed.length < line.length && (
              <span className="inline-block w-[2px] h-[13px] bg-orange-500 ml-1 animate-pulse" />
            )}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.6 }}
            className="mt-7 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
            <button type="button" data-magnetic onClick={onEnterSystem}
              className="group relative overflow-hidden bg-ink px-5 py-2.5 md:px-6 md:py-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream transition-all duration-300 hover:bg-orange-500">
              <span className="relative z-10">{siteContent.hero.enterButton}</span>
            </button>
            <a data-magnetic href={siteContent.hero.resumeFile}
              className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-ink/70 orange-underline transition-colors duration-300 hover:text-orange-500"
              download>
              {siteContent.hero.resumeButton}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="mt-8 md:mt-12 flex items-center gap-6 md:gap-8">
            {[
              { value: '6', label: 'Products Shipped' },
              { value: '30K+', label: 'Profiles Processed' },
              { value: '98.52%', label: 'ML Accuracy' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-xl md:text-2xl font-bold" style={{ color: '#FF6B00', fontFamily: 'Syne, sans-serif' }}>{value}</div>
                <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-ink/50">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE — Graph (hidden on mobile, visible md+) */}
        <div className="hidden md:flex relative w-full md:w-[42%] flex-col justify-center pr-6 md:pr-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            ref={containerRef} className="h-[300px] md:h-[420px] w-full">
            <canvas ref={canvasRef} className="h-full w-full" />
          </motion.div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
            {siteContent.hero.graphCaption}
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  )
}

export default Panel01Hero

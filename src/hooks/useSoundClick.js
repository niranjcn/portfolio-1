import { useEffect, useRef, useState } from 'react'

export function useSoundClick() {
  const [enabled, setEnabled] = useState(true)
  const contextRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    if (!contextRef.current) {
      contextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }, [enabled])

  const play = () => {
    if (!enabled) return
    const context = contextRef.current
    if (!context) return
    if (context.state === 'suspended') {
      context.resume()
    }
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 440
    gain.gain.value = 0.05
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.04)
  }

  return {
    enabled,
    toggle: () => setEnabled((value) => !value),
    play,
  }
}

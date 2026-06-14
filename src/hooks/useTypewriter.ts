import { useEffect, useState, useCallback } from 'react'

export function useTypewriter(
  words: string[],
  speed = 80,
  deleteSpeed = 50,
  pause = 2000
): { displayText: string; isDeleting: boolean } {
  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const fullText = words[index]
    if (!isDeleting) {
      setDisplayText(fullText.slice(0, displayText.length + 1))
      if (displayText === fullText) {
        setTimeout(() => setIsDeleting(true), pause)
        return
      }
    } else {
      setDisplayText(fullText.slice(0, displayText.length - 1))
      if (displayText === '') {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [displayText, index, isDeleting, words, pause])

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeout)
  }, [tick, isDeleting, deleteSpeed, speed])

  return { displayText, isDeleting }
}

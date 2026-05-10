import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { siteContent } from './data/content.js'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import BuildLog from './components/BuildLog.jsx'
import ScrollEngine from './components/ScrollEngine.jsx'
import ProjectsOverlay from './components/ProjectsOverlay.jsx'
import ExperienceOverlay from './components/ExperienceOverlay.jsx'
import Panel01Hero from './components/Panel01Hero.jsx'
import { useOverlayScrollLock } from './hooks/useOverlayScrollLock.js'
import { useSoundClick } from './hooks/useSoundClick.js'

const Panel02About = lazy(() => import('./components/Panel02About.jsx'))
const Panel03Projects = lazy(() => import('./components/Panel03Projects.jsx'))
const Panel04Experience = lazy(() => import('./components/Panel04Experience.jsx'))
const Panel05Contact = lazy(() => import('./components/Panel05Contact.jsx'))
const Panel06Achievements = lazy(() => import('./components/Panel06Achievements.jsx'))
const Panel07Skills = lazy(() => import('./components/Panel07Skills.jsx'))

function App() {
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [experienceOpen, setExperienceOpen] = useState(false)
  const [buildLogOpen, setBuildLogOpen] = useState(false)
  const [panelIndex, setPanelIndex] = useState(0)
  const sound = useSoundClick()
  const overlayActive = projectsOpen || experienceOpen || buildLogOpen

  useOverlayScrollLock(overlayActive)

  // Document title
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.title = siteContent.meta.titleAlt
      } else {
        document.title = siteContent.meta.title
      }
    }
    document.title = siteContent.meta.title
    document.addEventListener('visibilitychange', handleVisibility)
    const interval = setInterval(() => {
      if (document.hidden) {
        document.title =
          document.title === siteContent.meta.titleAlt
            ? siteContent.meta.title
            : siteContent.meta.titleAlt
      }
    }, 4000)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      clearInterval(interval)
    }
  }, [])

  // Panel sound
  useEffect(() => {
    if (panelIndex === 0) return
    sound.play()
  }, [panelIndex, sound])

  // Build log keyboard shortcut
  useEffect(() => {
    const pressed = new Set()
    const onKeyDown = (event) => {
      pressed.add(event.key.toLowerCase())
      if (pressed.has('b') && pressed.has('l')) setBuildLogOpen(true)
      if (event.key === 'Escape') setBuildLogOpen(false)
    }
    const onKeyUp = (event) => pressed.delete(event.key.toLowerCase())
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const heroPanel = useMemo(
    () => (
      <Panel01Hero
        onEnterSystem={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      />
    ),
    []
  )

  // 7 panels total — contact is panel index 6 (0-indexed)
  const scrollToContact = () => {
    window.scrollTo({ top: window.innerHeight * 6, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Loader />
      <Cursor />

      {/* Mute toggle */}
      <button
        type="button"
        data-magnetic
        aria-label={siteContent.ui.muteLabel}
        onClick={sound.toggle}
        className="fixed right-3 top-3 md:right-6 md:top-6 z-[9999] flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-ink/20 bg-cream/90 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] backdrop-blur-sm hover:border-orange-500 hover:text-orange-500 transition-all"
      >
        {sound.enabled ? siteContent.ui.muteOn : siteContent.ui.muteOff}
      </button>

      <ScrollEngine onPanelChange={setPanelIndex}>
        {heroPanel}

        <Suspense fallback={<div />}>
          <Panel02About />
        </Suspense>

        <Suspense fallback={<div />}>
          <Panel03Projects onOpenOverlay={() => setProjectsOpen(true)} />
        </Suspense>

        <Suspense fallback={<div />}>
          <Panel04Experience onOpenOverlay={() => setExperienceOpen(true)} />
        </Suspense>

        <Suspense fallback={<div />}>
          <Panel06Achievements />
        </Suspense>

        <Suspense fallback={<div />}>
          <Panel07Skills />
        </Suspense>

        <Suspense fallback={<div />}>
          <Panel05Contact />
        </Suspense>
      </ScrollEngine>

      <ProjectsOverlay open={projectsOpen} onClose={() => setProjectsOpen(false)} />
      <ExperienceOverlay
        open={experienceOpen}
        onClose={() => setExperienceOpen(false)}
        onContact={() => {
          setExperienceOpen(false)
          scrollToContact()
        }}
      />
      <BuildLog open={buildLogOpen} onClose={() => setBuildLogOpen(false)} />
    </div>
  )
}

export default App

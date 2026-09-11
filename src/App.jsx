import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { siteContent } from './data/content.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BuildLog from './components/BuildLog.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Certifications from './pages/Certifications.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  const [buildLogOpen, setBuildLogOpen] = useState(false)

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) document.title = siteContent.meta.titleAlt
      else document.title = siteContent.meta.title
    }
    document.title = siteContent.meta.title
    document.addEventListener('visibilitychange', handleVisibility)
    const interval = setInterval(() => {
      if (document.hidden) {
        document.title = document.title === siteContent.meta.titleAlt ? siteContent.meta.title : siteContent.meta.titleAlt
      }
    }, 4000)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      clearInterval(interval)
    }
  }, [])

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

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <BuildLog open={buildLogOpen} onClose={() => setBuildLogOpen(false)} />
    </BrowserRouter>
  )
}

export default App

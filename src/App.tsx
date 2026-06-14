import { useState, lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { SectionWrapper } from './components/ui/SectionWrapper'
import { Toast } from './components/ui/Toast'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'

const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Contact = lazy(() => import('./components/sections/Contact'))

const sectionLoader = () => (
  <div className="flex h-48 items-center justify-center">
    <div className="flex items-center gap-3 text-text-muted">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <span className="font-mono text-sm">Loading...</span>
    </div>
  </div>
)

function App() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>
        <SectionWrapper id="experience">
          <Experience />
        </SectionWrapper>
        <Suspense fallback={sectionLoader()}>
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>
        </Suspense>
        <Suspense fallback={sectionLoader()}>
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
        </Suspense>
        <Suspense fallback={sectionLoader()}>
          <SectionWrapper id="certifications">
            <Certifications />
          </SectionWrapper>
        </Suspense>
        <SectionWrapper id="achievements">
          <Achievements />
        </SectionWrapper>
        <Suspense fallback={sectionLoader()}>
          <SectionWrapper id="contact">
            <Contact setToast={setToast} />
          </SectionWrapper>
        </Suspense>
      </main>

      <Footer />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}

export default App

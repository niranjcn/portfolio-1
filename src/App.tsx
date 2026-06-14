import { useState, lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { SectionWrapper } from './components/ui/SectionWrapper'
import { Toast } from './components/ui/Toast'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'

const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Contact = lazy(() => import('./components/sections/Contact'))

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
        <Suspense fallback={<SectionWrapper id="projects"><div className="h-64 flex items-center justify-center text-text-muted">Loading...</div></SectionWrapper>}>
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>
        </Suspense>
        <Suspense fallback={<SectionWrapper id="skills"><div className="h-64 flex items-center justify-center text-text-muted">Loading...</div></SectionWrapper>}>
          <SectionWrapper id="skills">
            <Skills />
          </SectionWrapper>
        </Suspense>
        <Suspense fallback={<SectionWrapper id="certifications"><div className="h-64 flex items-center justify-center text-text-muted">Loading...</div></SectionWrapper>}>
          <SectionWrapper id="certifications">
            <Certifications />
          </SectionWrapper>
        </Suspense>
        <Suspense fallback={<SectionWrapper id="contact"><div className="h-64 flex items-center justify-center text-text-muted">Loading...</div></SectionWrapper>}>
          <SectionWrapper id="contact">
            <Contact setToast={setToast} />
          </SectionWrapper>
        </Suspense>
      </main>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App

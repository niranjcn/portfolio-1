import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { crashed: false }
  }

  static getDerivedStateFromError() {
    return { crashed: true }
  }

  render() {
    if (this.state.crashed) {
      return (
        <main className="min-h-screen bg-white flex items-center">
          <section className="max-w-7xl mx-auto px-6 py-16 w-full">
            <div className="inline-block bg-black text-white text-[10px] font-black tracking-[0.4em] px-3 py-1">RUNTIME // FAULT</div>
            <h1 className="font-bebas leading-[0.8] tracking-tighter italic uppercase mt-4 text-[5rem] md:text-[9rem]">
              SYSTEM<span className="text-transparent [-webkit-text-stroke:2px_black]">_FAULT</span>
            </h1>
            <p className="mt-4 text-sm font-medium text-black/60 max-w-xl">
              Something threw an unhandled exception. Reloading usually clears it — if it persists, the logs have the full trace.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 border-[3px] border-black bg-black text-white px-8 py-3 font-black text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              RELOAD_SYSTEM →
            </button>
          </section>
        </main>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary

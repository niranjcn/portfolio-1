import { useState, useRef, useEffect } from 'react'
import { useInView } from '../hooks/useInView.js'
import { siteContent } from '../data/content.js'

const skillsData = siteContent.skills.categories
const automationSkills = skillsData.find(s => s.name === 'Backend') || { items: ['FastAPI', 'Python', 'REST APIs', 'Docker'] }
const intelligenceSkills = skillsData.find(s => s.name === 'ML / AI') || { items: ['XGBoost', 'OpenCV', 'YOLOv8'] }

const BANNER = `\
    ███╗   ██╗██╗██████╗  █████╗ ███╗   ██╗     ██╗
    ████╗  ██║██║██╔══██╗██╔══██╗████╗  ██║     ██║
    ██╔██╗ ██║██║██████╔╝███████║██╔██╗ ██║     ██║
    ██║╚██╗██║██║██╔══██╗██╔══██║██║╚██╗██║██╗  ██║
    ██║ ╚████║██║██║  ██║██║  ██║██║ ╚████║╚█████╔╝
    ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚════╝`

const COMMANDS = {
  help: { desc: 'Show available commands' },
  '?': { desc: 'Show available commands' },
  about: { desc: 'About Niranj' },
  whoami: { desc: 'Display identity' },
  skills: { desc: 'List technical skills' },
  projects: { desc: 'Show projects' },
  experience: { desc: 'Work experience' },
  education: { desc: 'Education details' },
  achievements: { desc: 'Awards & achievements' },
  contact: { desc: 'Contact information' },
  social: { desc: 'Social links' },
  status: { desc: 'Current availability' },
  location: { desc: 'Current location' },
  banner: { desc: 'Show ASCII banner' },
  clear: { desc: 'Clear terminal' },
  ls: { desc: 'List available sections' },
  date: { desc: 'Show current date/time' },
  repo: { desc: 'Link to this portfolio repo' },
  sudo: { desc: '👑 Try it' },
}

const projectsList = siteContent.projects.list.slice(0, 3).map(p =>
  `  ${p.number}. ${p.title}\n     ${p.description}`
).join('\n')

const skillsOutput = siteContent.skills.categories.map(cat =>
  `  ${cat.name}:\n    ${cat.items.join(', ')}`
).join('\n')

const achievementsOutput = siteContent.achievements.list.map(a =>
  `  ${a.icon} ${a.title} — ${a.org}`
).join('\n')

const experienceOutput = siteContent.experience.sections.map(s =>
  `  ${s.company} — ${s.role}\n    ${s.summary}`
).join('\n')

const contactOutput =
  `  Email: ${siteContent.resume.email}\n  Phone: ${siteContent.resume.phone}\n  Location: ${siteContent.resume.location}`

function AboutTerminal() {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([
    { type: 'system', text: `╭──────────────────────────────────────────────╮` },
    { type: 'system', text: `│   Welcome to Niranj's Terminal Portfolio v2  │` },
    { type: 'system', text: `│   Type 'help' for available commands.         │` },
    { type: 'system', text: `╰──────────────────────────────────────────────╯` },
  ])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  const addOutput = (text, type = 'output') => {
    setLines(prev => [...prev, { type, text }])
  }

  const processCommand = (cmd) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const lower = trimmed.toLowerCase()
    setHistory(prev => [...prev, trimmed])
    setHistoryIndex(-1)
    addOutput(`niranj@portfolio:~$ ${trimmed}`, 'input')

    switch (lower) {
      case 'help':
      case '?':
        addOutput('')
        addOutput('  Available commands:', 'highlight')
        Object.entries(COMMANDS).forEach(([cmd, meta]) => {
          if (cmd !== '?') addOutput(`    ${cmd.padEnd(16)} ${meta.desc}`)
        })
        addOutput('')
        break

      case 'banner':
        BANNER.split('\n').forEach(line => addOutput(line, 'highlight'))
        break

      case 'about':
        addOutput(`  ${siteContent.about.paragraphs[0]}`)
        addOutput(`  ${siteContent.about.paragraphs[1]}`)
        addOutput(`  ${siteContent.about.paragraphs[2]}`)
        break

      case 'whoami':
        addOutput(`  ${siteContent.about.ownerName}`)
        addOutput(`  ${siteContent.about.ownerTitle}`)
        addOutput(`  Based in ${siteContent.about.ownerLocation}`)
        break

      case 'skills':
        addOutput('')
        addOutput(skillsOutput)
        addOutput('')
        break

      case 'projects':
        addOutput('')
        addOutput(projectsList)
        addOutput('')
        break

      case 'experience':
        addOutput('')
        addOutput(experienceOutput)
        addOutput('')
        break

      case 'education':
        addOutput(`  ${siteContent.resume.education}`)
        break

      case 'achievements':
        addOutput('')
        addOutput(achievementsOutput)
        addOutput('')
        break

      case 'contact':
        addOutput('')
        addOutput(contactOutput)
        addOutput('')
        break

      case 'social':
        addOutput(`  GitHub:  https://${siteContent.resume.github}`)
        addOutput(`  LinkedIn: https://${siteContent.resume.linkedIn}`)
        addOutput(`  Email:   ${siteContent.resume.email}`)
        break

      case 'status':
        addOutput('  ● Currently available for opportunities')
        addOutput('  Location: Kannur, Kerala, India')
        addOutput('  Open to: Remote · Hybrid · Relocation')
        break

      case 'location':
        addOutput(`  ${siteContent.resume.location}`)
        break

      case 'ls':
        addOutput('')
        addOutput('  about  whoami  skills  projects  experience')
        addOutput('  education  achievements  contact  social')
        addOutput('  status  location  banner  date  repo  sudo')
        addOutput('')
        break

      case 'date':
        addOutput(`  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`)
        break

      case 'repo':
        addOutput('  https://github.com/niranjcn/niranj-portfolio')
        break

      case 'sudo':
        addOutput('  ⚠️  YOU HAVE NO POWER HERE.')
        addOutput('  — Niranj, probably')
        break

      case 'clear':
        setLines([])
        break

      default:
        addOutput(`  bash: ${trimmed.split(' ')[0]}: command not found`, 'error')
        addOutput(`  Type 'help' for available commands.`)
    }

    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const focusInput = () => inputRef.current?.focus()

  return (
    <div
      className="about-terminal border-[3px] border-stone-700 bg-black rounded-none overflow-hidden mt-16 cursor-text"
      onClick={focusInput}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-stone-900 border-b border-stone-700 select-none">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-[11px] text-stone-500 uppercase tracking-wider">
          niranj@portfolio — about
        </span>
      </div>

      <div
        ref={outputRef}
        className="p-5 h-80 overflow-y-auto font-mono text-sm leading-relaxed"
        style={{
          background: '#0a0a0a',
          color: '#d4d4d4',
          scrollbarWidth: 'thin',
          scrollbarColor: '#333 #0a0a0a',
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === 'input' ? 'text-green-400' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'highlight' ? 'text-emerald-300' :
              line.type === 'system' ? 'text-stone-500' :
              'text-stone-300'
            }`}
          >
            {line.text}
          </div>
        ))}

        <div className="flex items-center mt-1">
          <span className="text-green-400 shrink-0">niranj@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm ml-2 caret-green-400"
            style={{ background: 'transparent', color: '#4ade80' }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>

      <style>{`
        .about-terminal::-webkit-scrollbar { width: 6px; }
        .about-terminal::-webkit-scrollbar-track { background: #0a0a0a; }
        .about-terminal::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .about-terminal input::selection { background: #4ade80; color: #000; }
      `}</style>
    </div>
  )
}

function Panel02About() {
  const titleRef = useInView()
  const subtitleRef = useInView()
  const statementRef = useInView()
  const card1Ref = useInView()
  const card2Ref = useInView()
  const barRef = useInView()
  const terminalRef = useInView()

  return (
    <section id="about" className="bg-stone-950 text-stone-100 py-32 relative overflow-hidden">
      <div className="dot-grid-white absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 ref={titleRef} className="about-title font-bebas italic text-6xl md:text-8xl font-black leading-[0.8] text-white">
          About <span className="text-stroke-white">ME</span>
        </h2>

        <p ref={subtitleRef} className="about-subtitle font-bebas text-lg italic tracking-[0.3em] text-stone-400 mt-4">
          Backend Systems x Automation x Infrastructure
        </p>

        <p ref={statementRef} className="about-statement font-bebas italic text-4xl md:text-6xl font-black leading-[0.9] text-white mt-12 max-w-5xl">
          &ldquo;Building systems that scale, secure, and automate.&rdquo;
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div ref={card1Ref} className="about-card border-[3px] border-stone-700 bg-stone-900 p-8">
            <span className="font-bebas italic text-sm tracking-[0.3em] text-stone-400">01. AUTOMATION // INDUSTRY</span>
            <h3 className="font-bebas italic text-3xl md:text-4xl font-black leading-[0.85] text-white mt-3">Backend & DevOps</h3>
            <p className="font-inter text-sm text-stone-400 mt-4 leading-relaxed">
              {siteContent.about.paragraphs[1]}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {automationSkills.items.slice(0, 5).map(tech => (
                <span key={tech} className="font-bebas italic text-[10px] tracking-[0.2em] uppercase border border-stone-600 px-3 py-1 text-stone-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div ref={card2Ref} className="about-card border-[3px] border-stone-700 bg-stone-900 p-8">
            <span className="font-bebas italic text-sm tracking-[0.3em] text-stone-400">02. INTELLIGENCE // RESEARCH</span>
            <h3 className="font-bebas italic text-3xl md:text-4xl font-black leading-[0.85] text-white mt-3">ML & Research</h3>
            <p className="font-inter text-sm text-stone-400 mt-4 leading-relaxed">
              {siteContent.about.paragraphs[2]}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {intelligenceSkills.items.slice(0, 5).map(tech => (
                <span key={tech} className="font-bebas italic text-[10px] tracking-[0.2em] uppercase border border-stone-600 px-3 py-1 text-stone-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div ref={barRef} className="about-bar border-[3px] border-stone-700 bg-stone-900 p-5 mt-16 flex items-center justify-between">
          <span className="font-bebas italic text-sm tracking-[0.3em] text-stone-400">CURRENTLY AVAILABLE // KANNUR, KERALA</span>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
          </span>
        </div>

        <div ref={terminalRef} className="about-terminal-wrapper mt-20">
          <div className="font-bebas italic text-sm tracking-[0.3em] text-stone-500 mb-4">
            // INTERACTIVE TERMINAL — ASK ABOUT ME
          </div>
          <AboutTerminal />
        </div>
      </div>

      <style>{`
        .about-title,
        .about-subtitle,
        .about-statement,
        .about-card,
        .about-bar,
        .about-terminal-wrapper {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-title { transform: translateY(40px); }
        .about-subtitle { transform: translateY(30px); transition-delay: 0.2s; }
        .about-statement { transform: translateY(30px); transition-delay: 0.3s; }
        .about-card { transform: translateY(40px); }
        .about-card:nth-child(2) { transition-delay: 0.15s; }
        .about-bar { transform: translateY(30px); transition-delay: 0.35s; }
        .about-terminal-wrapper { transform: translateY(40px); transition-delay: 0.5s; }
        .about-title.visible,
        .about-subtitle.visible,
        .about-statement.visible,
        .about-card.visible,
        .about-bar.visible,
        .about-terminal-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

export default Panel02About

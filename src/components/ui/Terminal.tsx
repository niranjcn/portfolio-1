import { useEffect, useRef } from 'react'
import { useTerminal } from '../../hooks/useTerminal'
import type { TerminalCommand } from '../../types'

interface TerminalProps {
  commands: TerminalCommand[]
}

export function Terminal({ commands }: TerminalProps) {
  const { history, currentInput, setCurrentInput, handleCommand, handleKeyDown } = useTerminal(commands)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={handleContainerClick}
      role="application"
      aria-label="Interactive terminal"
      className="rounded-lg border border-border bg-[#0D1117] overflow-hidden cursor-text font-mono text-sm"
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-error" />
        <span className="h-3 w-3 rounded-full bg-warning" />
        <span className="h-3 w-3 rounded-full bg-success" />
        <span className="ml-2 text-xs text-text-muted">~/portfolio — zsh</span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="h-64 overflow-y-auto p-4 space-y-1"
        style={{ scrollBehavior: 'smooth' }}
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap text-text-muted">
            {line.startsWith('visitor@portfolio:~$') ? (
              <>
                <span className="text-success">visitor@portfolio</span>
                <span className="text-text-muted">:~$ </span>
                <span className="text-text">{line.slice(22)}</span>
              </>
            ) : line.startsWith('>') ? (
              <span className="text-accent">{line}</span>
            ) : line.startsWith('  ██') || line.startsWith('  ╚') ? (
              <span className="text-accent">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-success">visitor@portfolio</span>
          <span className="text-text-muted">:~$ </span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-text outline-none caret-transparent"
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="absolute inset-0 flex items-center pointer-events-none">
              <span className="text-text">{currentInput}</span>
              <span className="ml-0.5 h-4 w-2 bg-text animate-blink" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

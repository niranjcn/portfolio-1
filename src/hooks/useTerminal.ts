import { useState, useCallback } from 'react'
import type { TerminalCommand } from '../types'

const greetings = [
  '',
  'Welcome to my interactive terminal!',
  'Type "help" to see available commands.',
  '',
]

function getCommandOutput(input: string, commands: TerminalCommand[]): string {
  const cmd = input.trim().toLowerCase()
  if (cmd === 'clear') return ''
  const found = commands.find((c) => c.command === cmd || c.command === input.trim().toLowerCase())
  if (found) return found.output
  return `bash: ${cmd}: command not found. Type 'help' for available commands.`
}

function getAutocomplete(input: string, commands: TerminalCommand[]): string | null {
  const partial = input.trim().toLowerCase()
  if (!partial) return null
  const match = commands.find((c) => c.command.startsWith(partial))
  return match ? match.command : null
}

export function useTerminal(commands: TerminalCommand[]) {
  const [history, setHistory] = useState<string[]>(greetings)
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const handleCommand = useCallback(() => {
    const input = currentInput.trim()
    if (!input) return

    const output = getCommandOutput(input, commands)
    const promptLine = `visitor@portfolio:~$ ${input}`

    setHistory((prev) => {
      if (output === '') return [...prev, promptLine]
      return [...prev, promptLine, output]
    })

    setCommandHistory((prev) => [...prev, input])
    setHistoryIndex(-1)
    setCurrentInput('')
  }, [currentInput, commands])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand()
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length === 0) return
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setCurrentInput(commandHistory[newIndex])
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1)
        setCurrentInput('')
        return
      }
      setHistoryIndex(newIndex)
      setCurrentInput(commandHistory[newIndex])
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const completion = getAutocomplete(currentInput, commands)
      if (completion) setCurrentInput(completion + ' ')
      return
    }
  }, [currentInput, commandHistory, historyIndex, handleCommand])

  return {
    history,
    currentInput,
    setCurrentInput,
    handleCommand,
    handleKeyDown,
    commandHistory,
    historyIndex,
  }
}

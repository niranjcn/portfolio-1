import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const styles = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-error/30 bg-error/10 text-error',
  info: 'border-accent/30 bg-accent-dim text-accent',
}

export function Toast({ message, type, onClose }: ToastProps) {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className={cn('fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm', styles[type])}
          role="alert"
          aria-live="polite"
        >
          <Icon size={18} />
          <span className="font-body text-sm">{message}</span>
          <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity" aria-label="Dismiss">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

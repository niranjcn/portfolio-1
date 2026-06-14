import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Send, Copy, Check } from 'lucide-react'
import portfolio from '../../data/portfolioData'
import { useClipboard } from '../../hooks/useClipboard'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

export default function Contact({ setToast }: { setToast: (toast: { message: string; type: 'success' | 'error' | 'info' } | null) => void }) {
  const [copy, copied] = useClipboard(2000)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return

    try {
      // EmailJS would go here — for now just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setToast({ message: 'Message sent! I\'ll reply within 48 hours.', type: 'success' })
      reset()
    } catch {
      setToast({ message: 'Something went wrong. Try emailing directly.', type: 'error' })
    }
  }

  const handleCopyEmail = () => {
    copy(portfolio.contact.email)
    setToast({ message: 'Email copied to clipboard!', type: 'success' })
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-accent">06.</span>
        <h2 id="contact-heading" className="font-display text-2xl font-bold text-text">Contact</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display text-xl font-bold text-text">Let&apos;s Build Something Together</h3>
            <p className="mt-2 text-text-muted">
              I&apos;m currently open to freelance projects, full-time opportunities, and collaborations. 
              Whether you have a project in mind or just want to say hello, I&apos;d love to hear from you.
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              <span className="relative inline-block h-3 w-3 rounded-full bg-success" />
            </span>
            <span className="font-mono text-sm text-text-muted">
              {portfolio.personal.availabilityStatus === 'open' ? 'Available for opportunities' : 'Currently limited'}
            </span>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <a
              href={portfolio.social.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border p-3 text-text-muted hover:text-text hover:border-accent/40 transition-all group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-2 16h-2v-6h2v6zm-1-6.89c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 16h-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2v3h-2v-6h2v1.06c.48-.66 1.24-1.06 2.11-1.06 1.42 0 2.55 1.13 2.55 2.55V16z"/></svg>
              <span className="flex-1 text-sm">GitHub</span>
              <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
            <a
              href={portfolio.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border p-3 text-text-muted hover:text-text hover:border-accent/40 transition-all group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-2 16h-2V8h2v8zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 9h-2v-3.5c0-1.07-.93-2-2-2s-2 .93-2 2V16h-2V8h2v1.63c.66-.96 1.88-1.63 3.11-1.63C17.87 8 19 9.13 19 10.55V16z"/></svg>
              <span className="flex-1 text-sm">LinkedIn</span>
              <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="w-full flex items-center gap-3 rounded-md border border-border p-3 text-text-muted hover:text-text hover:border-accent/40 transition-all group text-left"
            >
              <Mail size={20} />
              <span className="flex-1 text-sm">{portfolio.contact.email}</span>
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>
          </div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-border bg-surface p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <input {...register('honeypot')} tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Name</label>
              <input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors',
                  errors.name ? 'border-error' : 'border-border focus:border-accent'
                )}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-error" role="alert">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors',
                  errors.email ? 'border-error' : 'border-border focus:border-accent'
                )}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-error" role="alert">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Subject</label>
              <select
                id="subject"
                {...register('subject', { required: 'Subject is required' })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors',
                  errors.subject ? 'border-error' : 'border-border focus:border-accent'
                )}
              >
                <option value="">Select a subject</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Freelance">Freelance Project</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && <p className="mt-1 text-xs text-error" role="alert">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Message</label>
              <textarea
                id="message"
                rows={4}
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors resize-none',
                  errors.message ? 'border-error' : 'border-border focus:border-accent'
                )}
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-1 text-xs text-error" role="alert">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" rightIcon={<Send size={16} />}>
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Send, Copy, Check, Loader2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { useState } from 'react'
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

const easeOut = [0.22, 1, 0.36, 1] as const

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: easeOut },
  }),
}

export default function Contact({ setToast }: { setToast: (toast: { message: string; type: 'success' | 'error' | 'info' } | null) => void }) {
  const [copy, copied] = useClipboard(2000)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setToast({ message: 'Message sent! I\'ll reply within 48 hours.', type: 'success' })
      reset()
    } catch {
      setToast({ message: 'Something went wrong. Try emailing directly.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = () => {
    copy(portfolio.contact.email)
    setToast({ message: 'Email copied to clipboard!', type: 'success' })
  }

  return (
    <motion.div className="space-y-12" variants={{ hidden: {}, visible: {} }}>
      <motion.div variants={staggerItem} className="flex items-center gap-4">
        <span className="font-mono text-accent text-sm">07.</span>
        <h2 id="contact-heading" className="font-display text-3xl font-bold text-text">Contact</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Info */}
        <motion.div variants={staggerItem} className="space-y-8">
          <div>
            <h3 className="font-display text-2xl font-bold text-text">Let&apos;s Build Something Together</h3>
            <p className="mt-2 text-text-muted leading-relaxed">
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

          {/* Contact info cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-md border border-border p-3 text-text-muted">
              <Mail size={18} className="text-accent" />
              <span className="text-sm">{portfolio.contact.email}</span>
              <button
                onClick={handleCopyEmail}
                className="ml-auto text-text-muted hover:text-text transition-colors"
                aria-label="Copy email"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>
            <a href={portfolio.social.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border p-3 text-text-muted hover:text-text hover:border-accent/40 transition-all group">
              <GithubIcon size={18} className="text-accent" />
              <span className="flex-1 text-sm">GitHub</span>
              <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 rounded-md border border-border p-3 text-text-muted hover:text-text hover:border-accent/40 transition-all group">
              <LinkedinIcon size={18} className="text-accent" />
              <span className="flex-1 text-sm">LinkedIn</span>
              <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          variants={staggerItem}
          className="rounded-lg border border-border bg-surface p-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="absolute -left-[9999px]" aria-hidden>
              <input {...register('honeypot')} tabIndex={-1} autoComplete="off" />
            </div>

            <motion.div custom={0} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Name</label>
              <input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors duration-[var(--transition-smooth)]',
                  errors.name ? 'border-error' : 'border-border focus:border-accent focus:ring-1 focus:ring-accent/30'
                )}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
            </motion.div>

            <motion.div custom={1} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors duration-[var(--transition-smooth)]',
                  errors.email ? 'border-error' : 'border-border focus:border-accent focus:ring-1 focus:ring-accent/30'
                )}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </motion.div>

            <motion.div custom={2} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Subject</label>
              <select
                id="subject"
                {...register('subject', { required: 'Subject is required' })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors duration-[var(--transition-smooth)]',
                  errors.subject ? 'border-error' : 'border-border focus:border-accent focus:ring-1 focus:ring-accent/30'
                )}
              >
                <option value="">Select a subject</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Freelance">Freelance Project</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject.message}</p>}
            </motion.div>

            <motion.div custom={3} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">Message</label>
              <textarea
                id="message"
                rows={4}
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
                className={cn(
                  'w-full rounded-md border bg-bg px-3 py-2 text-sm text-text placeholder-text-muted/50 outline-none transition-colors duration-[var(--transition-smooth)] resize-none',
                  errors.message ? 'border-error' : 'border-border focus:border-accent focus:ring-1 focus:ring-accent/30'
                )}
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
            </motion.div>

            <motion.div custom={4} variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Button
                type="submit"
                size="lg"
                className="w-full group relative overflow-hidden"
                disabled={isSubmitting}
                rightIcon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="transition-transform group-hover:translate-x-1" />}
              >
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && (
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-[var(--transition-smooth)]" />
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { siteContent } from '../data/content.js'

const socials = [
  {
    label: 'LINKEDIN',
    title: 'Professional Profile // CONNECT',
    href: 'https://linkedin.com/in/niranjcn',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    label: 'GITHUB',
    title: 'Projects & Open Source',
    href: 'https://github.com/niranjcn',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>,
  },
  {
    label: 'LEETCODE',
    title: '250+ Solved // @niranjcn',
    href: 'https://leetcode.com/u/niranjcn/',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
]

function Contact() {
  const [copied, setCopied] = useState(false)
  const [sendState, setSendState] = useState('idle') // idle | sending | sent | error
  const formRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '42%'])
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteContent.resume.email)
    } catch {
      /* clipboard unavailable — no-op */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (sendState === 'sending') return
    setSendState('sending')
    try {
      await emailjs.sendForm('service_os60t0u', 'template_bjquha5', formRef.current, {
        publicKey: 'JF13CwetAIHj16OyX',
      })
      setSendState('sent')
      formRef.current.reset()
    } catch {
      setSendState('error')
    }
    setTimeout(() => setSendState('idle'), 5000)
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 items-start">
        <motion.span
          aria-hidden="true"
          style={{ y: watermarkY, x: watermarkX }}
          className="pointer-events-none select-none absolute -top-6 left-0 font-bebas italic leading-none text-[28vw] md:text-[19rem] text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.08)] whitespace-nowrap z-0"
        >
          HELLO
        </motion.span>

        <div className="md:col-span-5 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 56, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            whileHover={{ rotate: -1.5, scale: 1.015 }}
            className="group border-[4px] border-black bg-stone-100 aspect-[4/5] overflow-hidden transition-shadow duration-300 hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]"
          >
            <img
              src={siteContent.about.ownerPhoto}
              alt={siteContent.about.ownerName}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black text-white text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1.5 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="w-1.5 h-1.5 bg-red-600 animate-pulse" /> Replies within 24h
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 border-2 border-black p-4 bg-black text-white flex justify-between items-center"
          >
            <span className="font-bebas text-xl tracking-widest">{siteContent.about.ownerName}</span>
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> AVAILABLE
            </span>
          </motion.div>
        </div>

        <div className="md:col-span-7 space-y-8 relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-black text-white text-[10px] font-black tracking-[0.4em] px-3 py-1"
            >
              CONTACT // COLLABORATION
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-bebas text-6xl md:text-8xl leading-[0.8] tracking-tighter italic uppercase mt-3"
            >
              CONTACT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-sm font-medium text-black/60 mt-4 max-w-xl"
            >
              Building systems where correctness matters. Open to conversations around backend platforms, data engineering, and high-impact roles.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center justify-between border-2 border-black p-4 group hover:bg-black hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all duration-300"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Email</div>
                <a href={`mailto:${siteContent.resume.email}`} className="font-bebas text-2xl tracking-widest break-all">{siteContent.resume.email} →</a>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={copyEmail}
                className="border border-black bg-white text-black px-3 py-1 text-xs font-black group-hover:bg-white shrink-0 ml-3"
              >
                {copied ? 'COPIED ✓' : 'COPY_EMAIL'}
              </motion.button>
            </motion.div>

            <motion.a
              whileHover={{ y: -4 }}
              href={`mailto:${siteContent.resume.email}?subject=Inquiry&body=Hey Niranj, I am writing after visiting your portfolio.`}
              className="flex items-center justify-between border-[3px] border-black bg-black text-white p-6 hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 group"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Available for Collaboration</div>
                <div className="font-bebas text-3xl tracking-widest italic mt-1">CONNECT →</div>
              </div>
              <div className="w-12 h-12 border-2 border-white flex items-center justify-center group-hover:border-black group-hover:rotate-45 group-hover:bg-red-600 group-hover:text-white text-2xl transition-all duration-300">→</div>
            </motion.a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
                className="border-[3px] border-black p-6 hover:bg-black hover:text-white hover:shadow-[7px_7px_0px_0px_rgba(220,38,38,1)] transition-colors duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">{s.label}</div>
                  <span className="group-hover:scale-125 group-hover:-rotate-6 transition-transform">{s.icon}</span>
                </div>
                <div className="font-bebas text-2xl mt-1">{s.title}</div>
                <div className="mt-3 text-[10px] font-black uppercase tracking-[0.25em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">VISIT ↗</div>
              </motion.a>
            ))}
          </div>

          <div className="border-t-2 border-black pt-4 flex justify-between text-[10px] font-black uppercase tracking-widest text-black/60">
            <span>KANNUR // 11.87° N</span>
            <span>END_OF_TRANS</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
          whileHover={{ y: -4 }}
          className="border-[3px] border-black p-6 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-shadow duration-300"
        >
          <h3 className="font-bebas text-2xl tracking-widest uppercase">Send a message</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <input name="from_name" required placeholder="Name" className="w-full border-b-[3px] border-black focus:border-red-600 py-3 outline-none placeholder:text-black/30 font-medium transition-colors bg-transparent" />
            <input name="from_email" required type="email" placeholder="Email" className="w-full border-b-[3px] border-black focus:border-red-600 py-3 outline-none placeholder:text-black/30 font-medium transition-colors bg-transparent" />
          </div>
          <input name="subject" required placeholder="Subject" className="w-full border-b-[3px] border-black focus:border-red-600 py-3 outline-none placeholder:text-black/30 font-medium mt-6 transition-colors bg-transparent" />
          <textarea name="message" required rows="4" placeholder="Message" className="w-full border-b-[3px] border-black focus:border-red-600 py-3 outline-none placeholder:text-black/30 font-medium mt-6 resize-none transition-colors bg-transparent" />
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={sendState === 'sending'}
            className={`group/send mt-6 px-8 py-3 font-black text-xs tracking-widest uppercase border-2 border-black transition-all disabled:opacity-70 ${
              sendState === 'sent'
                ? 'bg-green-600 text-white border-green-600'
                : sendState === 'error'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-black text-white hover:bg-white hover:text-black hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {sendState === 'sending' ? (
              'SENDING…'
            ) : sendState === 'sent' ? (
              'MESSAGE_SENT ✓'
            ) : sendState === 'error' ? (
              'FAILED — TRY_AGAIN'
            ) : (
              <>SEND MESSAGE <span className="inline-block group-hover/send:translate-x-1.5 transition-transform">→</span></>
            )}
          </motion.button>
        </motion.form>
      </section>
    </main>
  )
}

export default Contact

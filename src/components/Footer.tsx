import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const easeCinematic = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, amount: 0.2 }

const EXPLORE_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Coffee', href: '#coffee' },
  { label: 'Subscriptions', href: '#subscriptions' },
  { label: 'Brewing Guide', href: '#brewing-guide' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const COFFEE_LINKS = [
  { label: 'Single Origins', href: '#coffee' },
  { label: 'Espresso Blends', href: '#coffee' },
  { label: 'Cold Brew', href: '#coffee' },
  { label: 'Gift Sets', href: '#subscriptions' },
  { label: 'Brew Methods', href: '#brewing-guide' },
]

const CONTACT_ROWS = [
  { label: 'Email', value: 'hello@nomacoffee.com' },
  { label: 'Location', value: 'Specialty Coffee Studio' },
  { label: 'Hours', value: 'Sunday–Thursday, 09:00–17:00' },
]

const UTILITY_LINKS = ['Privacy Policy', 'Terms', 'Accessibility']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const [newsletterError, setNewsletterError] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const resetTimeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearTimeout(resetTimeout.current)
  }, [])

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport,
          transition: { duration: 0.7, ease: easeCinematic, delay },
        }

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('newsletter-email') ?? '').trim()

    if (!email || !EMAIL_PATTERN.test(email)) {
      setNewsletterError('Please enter a valid email address.')
      setSubscribed(false)
      return
    }

    setNewsletterError(null)
    form.reset()
    setSubscribed(true)
    window.clearTimeout(resetTimeout.current)
    resetTimeout.current = window.setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <footer className="relative overflow-hidden bg-[#160e08] text-[#f2e6d6]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 50% 0%, rgba(217,160,102,0.06) 0%, rgba(22,14,8,0) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10 sm:px-8 sm:pt-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <motion.div {...fadeUp(0)} className="sm:col-span-2 lg:col-span-1">
            <p className="font-serif text-xl font-medium tracking-wide text-[#f6ecdf]">
              Noma Coffee
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-[#f2e6d6]/70">
              Specialty coffee crafted for slower mornings, deeper moments,
              and daily rituals worth keeping.
            </p>
          </motion.div>

          {/* Explore column */}
          <motion.div {...fadeUp(0.08)}>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#f2e6d6]/50">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-[#f2e6d6]/75 transition-colors duration-300 hover:text-[#d9a066]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coffee column */}
          <motion.div {...fadeUp(0.14)}>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#f2e6d6]/50">
              Coffee
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {COFFEE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-[#f2e6d6]/75 transition-colors duration-300 hover:text-[#d9a066]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div {...fadeUp(0.2)}>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#f2e6d6]/50">
              Contact
            </h3>
            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              {CONTACT_ROWS.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/40">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 font-light text-[#f2e6d6]/75">{row.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-16 rounded-3xl border border-[#f6ecdf]/10 bg-[#f6ecdf]/[0.04] p-8 shadow-[0_10px_30px_rgba(10,6,3,0.2)] sm:p-10"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
            <div>
              <h3 className="font-serif text-xl font-medium text-[#f6ecdf]">
                Join the Ritual
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-[#f2e6d6]/70">
                Receive brewing notes, seasonal releases, and coffee stories
                crafted for slower mornings.
              </p>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: easeCinematic }}
                    role="status"
                    aria-live="polite"
                    className="rounded-xl border border-[#d9a066]/30 bg-[#d9a066]/10 px-5 py-4 text-sm font-medium text-[#f6ecdf]"
                  >
                    Thank you — newsletter signup will be available soon.
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: easeCinematic }}
                    onSubmit={handleNewsletterSubmit}
                    noValidate
                    className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3"
                  >
                    <div className="flex-1">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="newsletter-email"
                        name="newsletter-email"
                        type="email"
                        placeholder="Email address"
                        aria-invalid={Boolean(newsletterError)}
                        aria-describedby={newsletterError ? 'newsletter-error' : undefined}
                        className={`w-full rounded-xl border bg-[#1c120b] px-4 py-3 text-sm font-medium text-[#f6ecdf] outline-none transition-colors duration-300 placeholder:text-[#f2e6d6]/30 focus:border-[#d9a066]/60 ${
                          newsletterError ? 'border-[#e0836b]/70' : 'border-[#f6ecdf]/15'
                        }`}
                      />
                      {newsletterError && (
                        <p id="newsletter-error" role="alert" className="mt-1.5 text-xs font-light text-[#e0836b]">
                          {newsletterError}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="shrink-0 rounded-full bg-[#f6ecdf] px-6 py-3 text-sm font-medium tracking-wide text-[#2a1a10] transition-transform duration-300 hover:scale-[1.02] hover:bg-white"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-[#f6ecdf]/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs font-light text-[#f2e6d6]/50">
            © 2026 Noma Coffee. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {UTILITY_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="text-xs font-light text-[#f2e6d6]/50 transition-colors duration-300 hover:text-[#d9a066]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

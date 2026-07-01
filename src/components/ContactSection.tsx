import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const easeCinematic = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, amount: 0.25 }

const CONTACT_REASONS = [
  'Coffee Questions',
  'Subscription Plans',
  'Wholesale / Partnerships',
  'Gifts & Custom Orders',
  'Other',
]

const INFO_ROWS = [
  { label: 'Email', value: 'hello@nomacoffee.com' },
  { label: 'Location', value: 'Specialty Coffee Studio' },
  { label: 'Hours', value: 'Sunday–Thursday, 09:00–17:00' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormErrors = {
  name?: string
  email?: string
  reason?: string
  message?: string
}

function ContactSection() {
  const prefersReducedMotion = useReducedMotion()
  const [errors, setErrors] = useState<FormErrors>({})
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimeout = useRef<number | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    return () => window.clearTimeout(toastTimeout.current)
  }, [])

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport,
          transition: { duration: 0.8, ease: easeCinematic, delay },
        }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('contact-name') ?? '').trim()
    const email = String(data.get('contact-email') ?? '').trim()
    const reason = String(data.get('contact-reason') ?? '').trim()
    const message = String(data.get('contact-message') ?? '').trim()

    const nextErrors: FormErrors = {}
    if (!name) nextErrors.name = 'Please enter your full name.'
    if (!email) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!reason) nextErrors.reason = 'Please select a reason for contact.'
    if (!message) nextErrors.message = 'Please write a short message.'

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    form.reset()
    setToastVisible(true)
    window.clearTimeout(toastTimeout.current)
    toastTimeout.current = window.setTimeout(() => setToastVisible(false), 4000)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#1c120b] px-6 py-24 text-[#f6ecdf] sm:px-8 sm:py-32"
      aria-labelledby="contact-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 15% 0%, rgba(217,160,102,0.1) 0%, rgba(28,18,11,0) 100%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Text / info column */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9a066]"
          >
            Contact
          </motion.p>

          <motion.h2
            id="contact-section-heading"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
            className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
          >
            Let's make your next cup feel intentional.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-lg text-balance text-base font-light leading-relaxed text-[#f2e6d6]/80 sm:text-lg"
          >
            Have a question about our coffees, subscriptions, brewing
            methods, or gifting options? Send us a message and we'll get
            back to you soon.
          </motion.p>

          {/* Info card */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: easeCinematic, delay: 0.35 }}
            className="mt-10 rounded-3xl border border-[#f6ecdf]/10 bg-[#f6ecdf]/[0.04] p-8 shadow-[0_10px_30px_rgba(10,6,3,0.2)]"
          >
            <h3 className="font-serif text-lg font-medium text-[#f6ecdf]">
              Visit the Ritual
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-[#f2e6d6]/80">
              For questions about coffee selection, brewing guidance,
              subscriptions, or special orders, we're here to help you find
              the right cup.
            </p>

            <dl className="mt-6 flex flex-col gap-3">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-baseline gap-3 text-sm">
                  <dt className="w-20 shrink-0 text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    {row.label}
                  </dt>
                  <dd className="font-medium text-[#f6ecdf]">{row.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#brewing-guide"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-[#d9a066] transition-colors duration-300 hover:text-[#f6ecdf]"
            >
              Explore Brewing Guide
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M2 7H12M12 7L8 3M12 7L8 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Form column */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: easeCinematic, delay: 0.15 }}
          className="rounded-3xl border border-[#f6ecdf]/10 bg-gradient-to-b from-[#2c1c14] to-[#1c1109] p-8 shadow-[0_20px_50px_rgba(10,6,3,0.3)] sm:p-10"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {[
              { id: 'contact-name', label: 'Full Name', type: 'text', required: true, delay: 0.25, error: errors.name },
              { id: 'contact-email', label: 'Email Address', type: 'email', required: true, delay: 0.31, error: errors.email },
              { id: 'contact-phone', label: 'Phone Number (optional)', type: 'tel', required: false, delay: 0.37, error: undefined },
            ].map((field) => (
              <motion.div
                key={field.id}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease: easeCinematic, delay: field.delay }}
                className="flex flex-col gap-1.5"
              >
                <label
                  htmlFor={field.id}
                  className="text-xs uppercase tracking-wide text-[#f2e6d6]/60"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required={field.required}
                  aria-invalid={Boolean(field.error)}
                  aria-describedby={field.error ? `${field.id}-error` : undefined}
                  className={`w-full rounded-xl border bg-[#1c120b] px-4 py-3 text-sm font-medium text-[#f6ecdf] outline-none transition-colors duration-300 placeholder:text-[#f2e6d6]/30 focus:border-[#d9a066]/60 ${
                    field.error ? 'border-[#e0836b]/70' : 'border-[#f6ecdf]/15'
                  }`}
                />
                {field.error && (
                  <p id={`${field.id}-error`} role="alert" className="text-xs font-light text-[#e0836b]">
                    {field.error}
                  </p>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: easeCinematic, delay: 0.43 }}
              className="flex flex-col gap-1.5"
            >
              <label
                htmlFor="contact-reason"
                className="text-xs uppercase tracking-wide text-[#f2e6d6]/60"
              >
                Reason for contact
              </label>
              <select
                id="contact-reason"
                name="contact-reason"
                defaultValue=""
                required
                aria-invalid={Boolean(errors.reason)}
                aria-describedby={errors.reason ? 'contact-reason-error' : undefined}
                className={`w-full rounded-xl border bg-[#1c120b] px-4 py-3 text-sm font-medium text-[#f6ecdf] outline-none transition-colors duration-300 focus:border-[#d9a066]/60 ${
                  errors.reason ? 'border-[#e0836b]/70' : 'border-[#f6ecdf]/15'
                }`}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {CONTACT_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p id="contact-reason-error" role="alert" className="text-xs font-light text-[#e0836b]">
                  {errors.reason}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: easeCinematic, delay: 0.49 }}
              className="flex flex-col gap-1.5"
            >
              <label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-wide text-[#f2e6d6]/60"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="contact-message"
                rows={4}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`w-full resize-none rounded-xl border bg-[#1c120b] px-4 py-3 text-sm font-medium text-[#f6ecdf] outline-none transition-colors duration-300 placeholder:text-[#f2e6d6]/30 focus:border-[#d9a066]/60 ${
                  errors.message ? 'border-[#e0836b]/70' : 'border-[#f6ecdf]/15'
                }`}
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="text-xs font-light text-[#e0836b]">
                  {errors.message}
                </p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: easeCinematic, delay: 0.56 }}
              className="mt-2 rounded-full bg-[#f6ecdf] px-6 py-3.5 text-sm font-medium tracking-wide text-[#2a1a10] transition-transform duration-300 hover:scale-[1.02] hover:bg-white"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Bottom-center confirmation bubble */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: easeCinematic }}
            className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-6"
          >
            <div className="flex items-center gap-3 rounded-full border border-[#d9a066]/30 bg-[#2c1c14]/95 px-6 py-3.5 shadow-[0_15px_40px_rgba(10,6,3,0.4)] backdrop-blur-md">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-[#d9a066]"
              >
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M6 10.2L8.5 12.7L14 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-light text-[#f6ecdf]">
                Your Message Has Been Sent
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ContactSection

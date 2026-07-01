import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Coffee', href: '#coffee' },
  { label: 'Subscriptions', href: '#subscriptions' },
  { label: 'Brewing Guide', href: '#brewing-guide' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const easeCinematic = [0.16, 1, 0.3, 1] as const

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
    : { opacity: 0, y: -14, filter: 'blur(6px)' }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6 sm:pt-5">
        <div
          className="flex items-center justify-between rounded-2xl border border-[#f6ecdf]/12 bg-[#1c120b]/35 px-4 py-3 shadow-[0_8px_30px_rgba(10,6,3,0.25)] backdrop-blur-md sm:px-6"
        >
          <motion.a
            href="#home"
            className="font-serif text-lg font-medium tracking-wide text-[#f6ecdf] sm:text-xl"
            initial={initial}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: easeCinematic, delay: 0.2 }}
          >
            Noma Coffee
          </motion.a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium tracking-wide text-[#f2e6d6]/90 transition-colors duration-300 hover:text-[#f6ecdf]"
                initial={initial}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.6,
                  ease: easeCinematic,
                  delay: 0.4 + i * 0.12,
                }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d9a066] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#coffee"
            className="hidden shrink-0 rounded-full bg-[#f6ecdf] px-5 py-2.5 text-sm font-medium tracking-wide text-[#2a1a10] transition-transform duration-300 hover:scale-[1.03] hover:bg-white lg:inline-block"
            initial={initial}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: easeCinematic, delay: 1.2 }}
          >
            Shop Coffee
          </motion.a>

          <motion.button
            type="button"
            className="inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            initial={initial}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: easeCinematic, delay: 0.3 }}
          >
            <motion.span
              className="block h-px w-5 bg-[#f6ecdf]"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: easeCinematic }}
            />
            <motion.span
              className="block h-px w-5 bg-[#f6ecdf]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-5 bg-[#f6ecdf]"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: easeCinematic }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#1c120b]/95 backdrop-blur-lg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeCinematic }}
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="group absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#9a9a9a]/25 bg-[#9a9a9a]/10 text-[#c9c9c9] backdrop-blur-sm transition-colors duration-300 hover:border-[#c9c9c9]/40 hover:bg-[#9a9a9a]/20 hover:text-[#f6ecdf]"
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
              transition={{ duration: 0.4, ease: easeCinematic, delay: 0.1 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:rotate-90"
              >
                <path
                  d="M1 1L15 15M15 1L1 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>

            <nav
              className="flex flex-1 flex-col items-center justify-center gap-7 px-6 text-center"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-serif text-2xl font-medium text-[#f6ecdf]"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.5,
                    ease: easeCinematic,
                    delay: 0.1 + i * 0.08,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#coffee"
                className="mt-4 rounded-full bg-[#f6ecdf] px-8 py-3.5 text-sm font-medium tracking-wide text-[#2a1a10]"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{
                  duration: 0.5,
                  ease: easeCinematic,
                  delay: 0.1 + NAV_LINKS.length * 0.08,
                }}
              >
                Shop Coffee
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import aboutVisual from '../assets/images/about-visual.jpeg'

const easeCinematic = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, amount: 0.3 }

const PHILOSOPHY_POINTS = [
  {
    title: 'Thoughtful Sourcing',
    text: 'We focus on coffees with clear character, expressive aroma, and flavor profiles that feel memorable from the first sip.',
  },
  {
    title: 'Slow Roasting',
    text: 'Every roast is developed with patience, highlighting sweetness, balance, and depth instead of rushing the process.',
  },
  {
    title: 'Everyday Rituals',
    text: 'Whether it begins your morning or slows down your afternoon, each cup is made to become part of a better daily rhythm.',
  },
]

const VALUES = ['Specialty Roasts', 'Freshly Crafted', 'Ritual Focused']

function AboutSection() {
  const prefersReducedMotion = useReducedMotion()
  const visualRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const visualParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReducedMotion ? '0%' : '-8%', prefersReducedMotion ? '0%' : '8%'],
  )

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport,
          transition: { duration: 0.8, ease: easeCinematic, delay },
        }

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f6ecdf] px-6 py-24 text-[#2a1a10] sm:px-8 sm:py-32"
      aria-labelledby="about-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 90% 100%, rgba(217,160,102,0.1) 0%, rgba(246,236,223,0) 100%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Text column */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#a9642f]"
          >
            About Noma Coffee
          </motion.p>

          <motion.h2
            id="about-section-heading"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: easeCinematic, delay: 0.1 }}
            className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
          >
            Coffee made for slower mornings and deeper moments.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-xl text-balance text-base font-light leading-relaxed text-[#4a3527] sm:text-lg"
          >
            Noma Coffee was created for people who see coffee as more than a
            quick habit. Every roast is shaped around balance, warmth, and
            character — designed to turn a simple cup into a quiet daily
            ritual.
          </motion.p>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-4 max-w-xl text-balance text-base font-light leading-relaxed text-[#4a3527]/85 sm:text-lg"
          >
            From carefully selected origins to thoughtful roasting profiles,
            each coffee is crafted to bring out natural sweetness, smooth
            texture, and a flavor experience that feels both refined and
            familiar.
          </motion.p>

          {/* Philosophy points */}
          <div className="mt-10 flex flex-col gap-5">
            {PHILOSOPHY_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.7,
                  ease: easeCinematic,
                  delay: 0.4 + i * 0.14,
                }}
                className="rounded-2xl border border-[#2a1a10]/10 bg-white/40 p-5 shadow-[0_8px_24px_rgba(80,50,25,0.06)]"
              >
                <h3 className="font-serif text-lg font-medium text-[#2a1a10]">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-[#4a3527]/85">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quote block */}
          <motion.blockquote
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: easeCinematic, delay: 0.85 }}
            className="mt-12 border-l-2 border-[#a9642f]/40 pl-6"
          >
            <p className="text-balance font-serif text-xl font-medium italic leading-snug text-[#2a1a10] sm:text-2xl">
              "Good coffee should not rush you. It should make the moment feel
              intentional."
            </p>
          </motion.blockquote>

          {/* Values row */}
          <motion.ul
            {...fadeUp(1.0)}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            aria-label="Our values"
          >
            {VALUES.map((value) => (
              <li
                key={value}
                className="text-xs font-medium uppercase tracking-[0.15em] text-[#4a3527]/70"
              >
                {value}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual column */}
        <motion.div
          ref={visualRef}
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1, ease: easeCinematic, delay: 0.2 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#2a1a10]/10 shadow-[0_25px_60px_rgba(80,50,25,0.18)] lg:sticky lg:top-28 lg:aspect-[3/4]"
        >
          <motion.img
            src={aboutVisual}
            alt="A warm, unhurried coffee ritual — beans being poured or coffee being brewed by hand"
            className="h-[116%] w-full object-cover"
            style={{ y: visualParallaxY }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(0deg, rgba(20,12,7,0.4) 0%, rgba(20,12,7,0) 45%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection

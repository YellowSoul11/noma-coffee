import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import coffeeVisual from '../assets/images/coffee-cup.jpeg'

const easeCinematic = [0.16, 1, 0.3, 1] as const

const FEATURE_CARDS = [
  {
    title: 'Single-Origin Character',
    text: 'Distinct coffees sourced for clarity, aroma, and a flavor profile that reflects where each bean was grown.',
  },
  {
    title: 'Slow Roasted Balance',
    text: 'Roasted with patience to highlight chocolate notes, soft acidity, caramel sweetness, and a smooth finish.',
  },
  {
    title: 'Made for Every Ritual',
    text: 'Whether brewed as espresso, cold brew, pour-over, or French press, each coffee is crafted to feel consistent, rich, and memorable.',
  },
]

const TASTE_NOTES = ['Chocolate', 'Caramel', 'Citrus', 'Nutty', 'Floral', 'Bold']

const viewport = { once: true, amount: 0.3 }

function CoffeeSection() {
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
      id="coffee"
      className="relative overflow-hidden bg-[#221510] px-6 py-24 text-[#f6ecdf] sm:px-8 sm:py-32"
      aria-labelledby="coffee-section-heading"
    >
      {/* Soft ambient gradients for warmth and depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 15% 10%, rgba(217,160,102,0.08) 0%, rgba(34,21,16,0) 100%), radial-gradient(50% 40% at 100% 100%, rgba(120,72,38,0.12) 0%, rgba(34,21,16,0) 100%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Text column */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9a066]"
          >
            Our Coffee
          </motion.p>

          <motion.h2
            id="coffee-section-heading"
            {...fadeUp(0.1)}
            className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
          >
            Crafted for depth, balance, and quiet morning rituals.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-lg text-balance text-base font-light leading-relaxed text-[#f2e6d6]/85 sm:text-lg"
          >
            Every blend is selected for its character, roasted to bring out
            natural sweetness, and designed to turn a simple cup into a
            richer daily experience.
          </motion.p>

          {/* Taste notes */}
          <motion.ul
            {...fadeUp(0.3)}
            className="mt-8 flex flex-wrap gap-2.5"
            aria-label="Taste notes"
          >
            {TASTE_NOTES.map((note, i) => (
              <motion.li
                key={note}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.5,
                  ease: easeCinematic,
                  delay: 0.35 + i * 0.06,
                }}
                className="rounded-full border border-[#f6ecdf]/15 bg-[#f6ecdf]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#f2e6d6]/90"
              >
                {note}
              </motion.li>
            ))}
          </motion.ul>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.7,
                  ease: easeCinematic,
                  delay: 0.4 + i * 0.14,
                }}
                className="rounded-2xl border border-[#f6ecdf]/10 bg-gradient-to-b from-[#2c1c14] to-[#1c1109] p-6 shadow-[0_10px_30px_rgba(10,6,3,0.25)]"
              >
                <h3 className="font-serif text-lg font-medium text-[#f6ecdf]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-[#f2e6d6]/75">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual / product column */}
        <motion.div
          ref={visualRef}
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1, ease: easeCinematic, delay: 0.15 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-[#f6ecdf]/10 shadow-[0_20px_60px_rgba(10,6,3,0.35)] lg:aspect-[3/4]"
        >
          <motion.img
            src={coffeeVisual}
            alt="Espresso in a glass cup surrounded by roasted coffee beans"
            className="h-[116%] w-full object-cover"
            style={{ y: visualParallaxY }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(28,18,11,0) 60%, rgba(20,12,7,0.45) 100%)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default CoffeeSection

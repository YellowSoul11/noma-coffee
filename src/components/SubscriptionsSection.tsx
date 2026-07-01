import { motion, useReducedMotion } from 'framer-motion'

const easeCinematic = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, amount: 0.25 }

type Plan = {
  name: string
  price: string
  bestFor: string
  description: string
  includes: string[]
  cta: string
  highlighted?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter Ritual',
    price: '$18 / month',
    bestFor: 'Light coffee drinkers',
    description:
      'A simple monthly ritual for anyone who enjoys a slow, quality cup at home.',
    includes: [
      '1 bag of specialty coffee',
      'Monthly rotating origin',
      'Brewing notes included',
      'Cancel anytime',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Daily Brew',
    price: '$32 / month',
    bestFor: 'Everyday coffee lovers',
    description:
      'A balanced plan for daily coffee drinkers who want fresh beans always within reach.',
    includes: [
      '2 bags of specialty coffee',
      'Choice of espresso or filter roast',
      'Taste profile guidance',
      'Priority access to seasonal blends',
    ],
    cta: 'Choose Daily Brew',
    highlighted: true,
  },
  {
    name: 'Connoisseur',
    price: '$48 / month',
    bestFor: 'Deep flavor explorers',
    description:
      'A premium subscription for those who want variety, rare origins, and a richer tasting experience.',
    includes: [
      '3 bags of specialty coffee',
      'Limited seasonal releases',
      'Advanced tasting notes',
      'Early access to exclusive roasts',
    ],
    cta: 'Choose Connoisseur',
  },
]

function SubscriptionsSection() {
  const prefersReducedMotion = useReducedMotion()

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
      id="subscriptions"
      className="relative overflow-hidden bg-[#f6ecdf] px-6 py-24 text-[#2a1a10] sm:px-8 sm:py-32"
      aria-labelledby="subscriptions-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 40% at 50% 0%, rgba(217,160,102,0.12) 0%, rgba(246,236,223,0) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#a9642f]"
          >
            Subscriptions
          </motion.p>

          <motion.h2
            id="subscriptions-heading"
            {...fadeUp(0.1)}
            className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
          >
            Your coffee ritual, delivered on repeat.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 text-balance text-base font-light leading-relaxed text-[#4a3527] sm:text-lg"
          >
            Choose a plan that fits your routine and enjoy carefully roasted
            coffee delivered with consistency, freshness, and ease.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, y: 32, scale: plan.highlighted ? 0.96 : 1 }
              }
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={viewport}
              transition={{
                duration: 0.8,
                ease: easeCinematic,
                delay: 0.3 + i * 0.15,
              }}
              className={`relative flex flex-col rounded-3xl border p-8 transition-shadow duration-500 sm:col-span-1 ${
                plan.highlighted
                  ? 'border-[#d9a066]/40 bg-white/70 shadow-[0_25px_60px_rgba(150,95,40,0.22)] lg:-translate-y-3 lg:scale-[1.03]'
                  : 'border-[#2a1a10]/10 bg-white/40 shadow-[0_10px_30px_rgba(80,50,25,0.08)]'
              } ${i === 0 ? 'sm:col-start-1' : ''} ${
                i === 2 ? 'sm:col-start-2 lg:col-start-3' : ''
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#a9642f] px-4 py-1 text-xs font-medium tracking-wide text-[#f6ecdf] shadow-md">
                  Most Popular
                </span>
              )}

              <h3 className="font-serif text-xl font-medium text-[#2a1a10]">
                {plan.name}
              </h3>
              <p className="mt-1 text-2xl font-medium tracking-tight text-[#a9642f]">
                {plan.price}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#4a3527]/60">
                {plan.bestFor}
              </p>

              <p className="mt-5 text-sm font-light leading-relaxed text-[#4a3527]/90">
                {plan.description}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm font-light text-[#4a3527]/90"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#a9642f]"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-block rounded-full px-6 py-3 text-center text-sm font-medium tracking-wide transition-transform duration-300 hover:scale-[1.03] ${
                  plan.highlighted
                    ? 'bg-[#2a1a10] text-[#f6ecdf] hover:bg-[#1c120b]'
                    : 'border border-[#2a1a10]/20 text-[#2a1a10] hover:bg-[#2a1a10]/5'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SubscriptionsSection

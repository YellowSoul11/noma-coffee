import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const easeCinematic = [0.16, 1, 0.3, 1] as const
const viewport = { once: true, amount: 0.2 }

type BrewMethod = {
  id: string
  name: string
  grind: string
  ratio: string
  ratioValue: number
  coffeeAmount: number
  waterAmount: string
  brewTime: string
  tasteProfile: string
  description: string
  steps: string[]
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    grind: 'Fine',
    ratio: '1:2',
    ratioValue: 2,
    coffeeAmount: 18,
    waterAmount: '36g espresso',
    brewTime: '25–30 seconds',
    tasteProfile: 'Intense, rich, syrupy',
    description:
      'A concentrated method for bold flavor, deep body, and a smooth crema.',
    steps: [
      'Grind coffee finely.',
      'Distribute and tamp evenly.',
      'Lock the portafilter into the machine.',
      'Extract until the shot reaches the target yield.',
      'Serve immediately.',
    ],
  },
  {
    id: 'v60',
    name: 'V60 / Pour Over',
    grind: 'Medium-fine',
    ratio: '1:16',
    ratioValue: 16,
    coffeeAmount: 20,
    waterAmount: '320g',
    brewTime: '2:30–3:30 minutes',
    tasteProfile: 'Clean, bright, aromatic',
    description:
      'A precise manual brew method that highlights clarity, sweetness, and delicate notes.',
    steps: [
      'Rinse the paper filter and preheat the dripper.',
      'Add freshly ground coffee.',
      'Bloom with a small amount of water for 30 seconds.',
      'Pour slowly in circular motions.',
      'Let the coffee draw down fully and enjoy.',
    ],
  },
  {
    id: 'french-press',
    name: 'French Press',
    grind: 'Coarse',
    ratio: '1:15',
    ratioValue: 15,
    coffeeAmount: 30,
    waterAmount: '450g',
    brewTime: '4 minutes',
    tasteProfile: 'Full-bodied, round, comforting',
    description:
      'A rich immersion method with a heavier body and deep texture.',
    steps: [
      'Add coarse ground coffee to the French press.',
      'Pour hot water evenly over the grounds.',
      'Stir gently and place the lid on top.',
      'Steep for 4 minutes.',
      'Press slowly and serve.',
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    grind: 'Coarse',
    ratio: '1:8',
    ratioValue: 8,
    coffeeAmount: 80,
    waterAmount: '640g',
    brewTime: '12–16 hours',
    tasteProfile: 'Smooth, sweet, low acidity',
    description:
      'A slow extraction method for a refreshing, smooth, naturally sweet coffee.',
    steps: [
      'Combine coarse ground coffee and cold water.',
      'Stir gently until all grounds are saturated.',
      'Cover and steep in the fridge.',
      'Filter after 12–16 hours.',
      'Serve over ice or with milk.',
    ],
  },
  {
    id: 'moka-pot',
    name: 'Moka Pot',
    grind: 'Medium-fine',
    ratio: '1:10',
    ratioValue: 10,
    coffeeAmount: 20,
    waterAmount: '200g',
    brewTime: '3–5 minutes',
    tasteProfile: 'Bold, classic, concentrated',
    description:
      'A stovetop method that creates strong, rich coffee with an espresso-like character.',
    steps: [
      'Fill the bottom chamber with water.',
      'Add coffee to the basket without tamping.',
      'Assemble the moka pot securely.',
      'Heat gently until coffee rises.',
      'Remove from heat and serve.',
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    grind: 'Medium',
    ratio: '1:14',
    ratioValue: 14,
    coffeeAmount: 16,
    waterAmount: '224g',
    brewTime: '1:30–2:00 minutes',
    tasteProfile: 'Smooth, balanced, versatile',
    description:
      'A flexible method that can create clean, sweet, and balanced coffee quickly.',
    steps: [
      'Add a filter and rinse it.',
      'Add medium ground coffee.',
      'Pour hot water and stir gently.',
      'Steep briefly.',
      'Press slowly and serve.',
    ],
  },
]

function BrewingGuideSection() {
  const prefersReducedMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState('v60')
  const [coffeeGrams, setCoffeeGrams] = useState('20')

  const method = useMemo(
    () => BREW_METHODS.find((m) => m.id === selectedId) ?? BREW_METHODS[0],
    [selectedId],
  )

  const calculatedWater = useMemo(() => {
    const grams = parseFloat(coffeeGrams)
    if (!Number.isFinite(grams) || grams <= 0) return null
    return Math.round(grams * method.ratioValue)
  }, [coffeeGrams, method])

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
      id="brewing-guide"
      className="relative overflow-hidden bg-[#1c120b] px-6 py-24 text-[#f6ecdf] sm:px-8 sm:py-32"
      aria-labelledby="brewing-guide-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 40% at 85% 0%, rgba(217,160,102,0.08) 0%, rgba(28,18,11,0) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            {...fadeUp(0)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#d9a066]"
          >
            Brewing Guide
          </motion.p>

          <motion.h2
            id="brewing-guide-heading"
            {...fadeUp(0.1)}
            className="mt-4 text-balance font-serif text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]"
          >
            Brew with intention.
          </motion.h2>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 text-balance text-base font-light leading-relaxed text-[#f2e6d6]/80 sm:text-lg"
          >
            From espresso to cold brew, discover the method that fits your
            rhythm, flavor, and daily ritual.
          </motion.p>
        </div>

        {/* Method selector */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-14 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          role="tablist"
          aria-label="Brewing methods"
        >
          {BREW_METHODS.map((m, i) => {
            const isActive = m.id === selectedId
            return (
              <motion.button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`brew-panel-${m.id}`}
                id={`brew-tab-${m.id}`}
                onClick={() => setSelectedId(m.id)}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.5,
                  ease: easeCinematic,
                  delay: 0.35 + i * 0.06,
                }}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'border-[#d9a066]/60 bg-[#d9a066] text-[#1c120b]'
                    : 'border-[#f6ecdf]/15 bg-[#f6ecdf]/5 text-[#f2e6d6]/80 hover:bg-[#f6ecdf]/10 hover:text-[#f6ecdf]'
                }`}
              >
                {m.name}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Guide panel */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={method.id}
              id={`brew-panel-${method.id}`}
              role="tabpanel"
              aria-labelledby={`brew-tab-${method.id}`}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: easeCinematic }}
              className="rounded-3xl border border-[#f6ecdf]/10 bg-gradient-to-b from-[#2c1c14] to-[#1c1109] p-8 shadow-[0_20px_50px_rgba(10,6,3,0.3)]"
            >
              <h3 className="font-serif text-2xl font-medium text-[#f6ecdf]">
                {method.name}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#f2e6d6]/80">
                {method.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Grind size
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">{method.grind}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Ratio
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">{method.ratio}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Coffee
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">
                    {method.coffeeAmount}g
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Water / Output
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">
                    {method.waterAmount}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Brew time
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">
                    {method.brewTime}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Taste profile
                  </dt>
                  <dd className="mt-1 font-medium text-[#f6ecdf]">
                    {method.tasteProfile}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>

          {/* Steps + calculator */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={method.id}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: easeCinematic, delay: 0.05 }}
                className="rounded-3xl border border-[#f6ecdf]/10 bg-[#f6ecdf]/[0.04] p-8 shadow-[0_10px_30px_rgba(10,6,3,0.2)]"
              >
                <h4 className="font-serif text-lg font-medium text-[#f6ecdf]">
                  Step-by-step
                </h4>
                <ol className="mt-4 flex flex-col gap-3">
                  {method.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm font-light leading-relaxed text-[#f2e6d6]/85">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d9a066]/15 text-xs font-medium text-[#d9a066]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            </AnimatePresence>

            <motion.div
              {...fadeUp(0.4)}
              className="rounded-3xl border border-[#f6ecdf]/10 bg-[#f6ecdf]/[0.04] p-8 shadow-[0_10px_30px_rgba(10,6,3,0.2)]"
            >
              <h4 className="font-serif text-lg font-medium text-[#f6ecdf]">
                Coffee-to-water calculator
              </h4>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="flex flex-1 flex-col gap-1.5">
                  <span className="text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Coffee (grams)
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(e.target.value)}
                    className="w-full rounded-xl border border-[#f6ecdf]/15 bg-[#1c120b] px-4 py-3 text-sm font-medium text-[#f6ecdf] outline-none transition-colors duration-300 focus:border-[#d9a066]/60"
                    aria-describedby="calculated-water"
                  />
                </label>

                <div className="flex-1 rounded-xl border border-[#d9a066]/25 bg-[#d9a066]/10 px-4 py-3">
                  <span className="block text-xs uppercase tracking-wide text-[#f2e6d6]/50">
                    Recommended water
                  </span>
                  <span
                    id="calculated-water"
                    className="mt-1 block text-lg font-medium text-[#f6ecdf]"
                  >
                    {calculatedWater !== null ? `${calculatedWater}g` : '—'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrewingGuideSection

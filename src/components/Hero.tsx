import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/video/hero-coffee.mp4'

// Optional poster frame — drop a file at public/hero-poster.jpg to enable it.
const heroPoster = '/hero-poster.jpg'

// Timing (seconds) matched to the hero video's narrative beats.
// The clip runs ~4s total, so the reveal is timed just after the splash,
// comfortably before it ends.
const REVEAL_START = 3.1
const CTA_DELAY = 0.9

const easeCinematic = [0.16, 1, 0.3, 1] as const

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '18%'])

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true)
      return
    }

    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.currentTime >= REVEAL_START) {
        setRevealed(true)
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }

    // Freeze on the final frame instead of looping.
    const handleEnded = () => {
      video.pause()
    }

    // Fallback in case metadata/events are slow (e.g. autoplay blocked)
    const fallback = window.setTimeout(() => setRevealed(true), (REVEAL_START + 1) * 1000)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      window.clearTimeout(fallback)
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-[85svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#1c120b] text-[#f6ecdf] sm:h-[100svh]"
      aria-label="Noma Coffee hero"
    >
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-[120%] w-full object-cover"
        style={{ y: parallaxY }}
        src={heroVideo}
        poster={heroPoster}
        autoPlay
        muted
        playsInline
        preload="auto"
      />

      {/* Warm overlay for text readability */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(28,18,11,0.55) 0%, rgba(28,18,11,0.25) 32%, rgba(28,18,11,0.35) 68%, rgba(28,18,11,0.7) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 55%, rgba(45,28,17,0.15) 0%, rgba(20,12,7,0.55) 100%)',
        }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center sm:px-8">
        <h1 className="font-serif text-[2.25rem] font-medium leading-[1.12] tracking-tight sm:text-[3.25rem] md:text-[3.75rem]">
          <RevealLine show={revealed} delay={0}>
            Specialty Coffee,
          </RevealLine>
          <RevealLine show={revealed} delay={0.16}>
            Made for Slow Mornings.
          </RevealLine>
        </h1>

        <motion.p
          className="mt-5 max-w-xl text-balance text-base font-light leading-relaxed text-[#f2e6d6]/90 sm:mt-6 sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, ease: easeCinematic, delay: 0.55 }}
        >
          Discover rich blends, smooth cold brews, and daily rituals crafted for
          moments that deserve better coffee.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: easeCinematic, delay: 0.55 + CTA_DELAY }}
        >
          <a
            href="/shop"
            className="w-full rounded-full bg-[#f6ecdf] px-8 py-3.5 text-sm font-medium tracking-wide text-[#2a1a10] transition-transform duration-300 hover:scale-[1.03] hover:bg-white sm:w-auto"
          >
            Shop Coffee
          </a>
          <a
            href="/subscriptions"
            className="w-full rounded-full border border-[#f6ecdf]/50 bg-white/5 px-8 py-3.5 text-sm font-medium tracking-wide text-[#f6ecdf] backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:w-auto"
          >
            Explore Subscriptions
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function RevealLine({
  children,
  show,
  delay,
}: {
  children: string
  show: boolean
  delay: number
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '100%', opacity: 0 }}
        animate={show ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration: 0.9, ease: easeCinematic, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default Hero

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { urlFor } from '../../../sanity/lib/client';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Slide {
  _id: string;
  image: any;
  category: string;
  alt?: string;
}

interface HeroSectionProps {
  slides?: Slide[];
  title?: string;
  subtitle?: string;
}

const SLIDE_INTERVAL = 6000;
const TRANSITION_DURATION = 1500;
const KEN_BURNS_DURATION = 8000;

export function HeroSection({
  slides = [],
  title = SITE.tagline,
  subtitle = `Luxury wedding, quinceañera & engagement photography serving ${SITE.address.region}`,
}: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const hasSlides = slides.length > 0;

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setProgressKey((k) => k + 1);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
    setProgressKey((k) => k + 1);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  }, [slides.length]);

  // Auto-rotate
  useEffect(() => {
    if (!hasSlides || isPaused) return;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next, hasSlides, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const slideNumber = String(current + 1).padStart(2, '0');
  const totalSlides = String(slides.length).padStart(2, '0');

  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slideshow */}
      {hasSlides ? (
        <div className="absolute inset-0">
          {slides.map((slide, i) => {
            const isActive = i === current;
            const isPast = i === ((current - 1 + slides.length) % slides.length);
            const imageUrl = urlFor(slide.image).width(1920).quality(90).url();

            return (
              <div
                key={slide._id}
                className="absolute inset-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`,
                  zIndex: isActive ? 1 : 0,
                }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    animation: isActive
                      ? `kenBurns ${KEN_BURNS_DURATION}s ease-out forwards`
                      : 'none',
                    transformOrigin: isPast ? '100% 100%' : '0% 0%',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={slide.alt || slide.category}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                    quality={90}
                  />
                </div>
              </div>
            );
          })}

          {/* Overlays */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-warm-black/80 via-warm-black/40 to-warm-black/30" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-warm-black/30 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-br from-warm-black via-dark to-charcoal" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/40 to-warm-black/30" />
        </div>
      )}

      {/* Hero Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-light leading-[1.05] tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 text-lg sm:text-xl text-cream/70 font-body font-light max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-4"
          >
            <Button variant="primary" size="lg" href="/contact">
              Inquire Now
            </Button>
            <Button variant="outline" size="lg" href="/portfolio">
              View Portfolio
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-sm text-cream/40"
          >
            or call{' '}
            <a href={`tel:${SITE.phoneRaw}`} className="text-gold hover:text-gold-light transition-colors">
              {SITE.phone}
            </a>
          </motion.p>
        </div>
      </Container>

      {/* Slide Counter — bottom left */}
      {hasSlides && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-8 z-10 hidden sm:flex items-center gap-2"
        >
          <span className="font-accent text-sm tracking-widest text-gold">{slideNumber}</span>
          <span className="font-accent text-sm tracking-widest text-cream/30">/</span>
          <span className="font-accent text-sm tracking-widest text-cream/30">{totalSlides}</span>
        </motion.div>
      )}

      {/* Progress Bars — bottom right */}
      {hasSlides && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 right-8 z-10 flex items-center gap-2"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === current ? 50 : 30,
                backgroundColor: 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current && (
                <motion.div
                  key={progressKey}
                  className="absolute inset-0 bg-gold rounded-full"
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                />
              )}
              {i !== current && (
                <div className="absolute inset-0 bg-cream/20 group-hover:bg-cream/40 transition-colors" />
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Category Badge — right edge, vertical */}
      {hasSlides && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-accent text-[10px] tracking-[0.3em] uppercase text-cream/40"
              style={{ writingMode: 'vertical-rl' }}
            >
              {slides[current]?.category}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-cream/30">
          Scroll
        </span>
        <div className="relative w-[1px] h-10 bg-cream/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            style={{ height: '30%' }}
            animate={{ y: ['0%', '250%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

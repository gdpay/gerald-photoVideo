'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';

interface TestimonialItem {
  _id: string;
  quote: string;
  author: string;
  serviceType?: string;
  location?: string;
  rating?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  featured?: boolean;
}

const fallbackTestimonials = [
  {
    quote: 'Gerald and his team captured every moment of our wedding perfectly. Looking at our photos transports us back to that magical day. The attention to detail is incredible.',
    author: 'Sarah & Michael',
    date: 'Wedding — October 2024',
    rating: 5,
    location: 'Omaha, NE',
  },
  {
    quote: 'Our quinceañera photos and video are absolutely stunning! The team made us feel so comfortable and natural. Every frame is a work of art.',
    author: 'Maria G.',
    date: 'Quinceañera — August 2024',
    rating: 5,
    location: 'Lincoln, NE',
  },
  {
    quote: 'From the engagement shoot to our wedding day, Gerald Photo Video exceeded every expectation. They truly care about telling your story, not just taking pictures.',
    author: 'Jessica & David',
    date: 'Wedding — June 2024',
    rating: 5,
    location: 'Council Bluffs, IA',
  },
  {
    quote: 'The highlight reel brought me to tears. They captured moments I didn\'t even know happened. Worth every penny and more.',
    author: 'Amanda R.',
    date: 'Wedding — March 2024',
    rating: 5,
    location: 'Des Moines, IA',
  },
  {
    quote: 'As a mother, watching my daughter\'s quinceañera through their lens was incredible. They captured her joy, the family moments, everything. Thank you!',
    author: 'Patricia L.',
    date: 'Quinceañera — May 2024',
    rating: 5,
    location: 'Omaha, NE',
  },
];

interface TestimonialCarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testimonials?: TestimonialItem[];
}

export function TestimonialCarousel({ testimonials: sanityTestimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = sanityTestimonials && sanityTestimonials.length > 0
    ? sanityTestimonials.map((t) => ({
        quote: t.quote,
        author: t.author,
        date: t.serviceType ? `${t.serviceType.charAt(0).toUpperCase() + t.serviceType.slice(1)}` : '',
        rating: t.rating || 5,
        location: t.location || '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photo: t.photo as any,
      }))
    : fallbackTestimonials.map((t) => ({
        ...t,
        photo: null,
      }));

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <SectionWrapper className="bg-black/30">
      <Container narrow>
        <div className="text-center mb-12">
          <span className="font-accent text-xs uppercase tracking-[0.15em] text-gold">
            Kind Words
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-4xl text-cream">
            Trusted by Couples & Families
          </h2>
        </div>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Author Photo */}
              {t.photo && (
                <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold/30">
                  <SanityImage
                    source={t.photo}
                    alt={t.author}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              )}
              {!t.photo && <Quote className="h-10 w-10 text-gold/30 mx-auto mb-6" />}
              <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl text-cream/90 font-light italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-4">
                <div className="font-body font-medium text-cream">{t.author}</div>
                {t.date && <div className="text-sm text-cream/50">{t.date}</div>}
                {t.location && <div className="text-xs text-cream/40">{t.location}</div>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="p-2 text-cream/40 hover:text-gold transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-gold' : 'w-1.5 bg-cream/20 hover:bg-cream/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 text-cream/40 hover:text-gold transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </SectionWrapper>
  );
}

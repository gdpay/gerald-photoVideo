'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { hasSanityImageAsset, urlFor } from '../../../sanity/lib/client';

interface HeroSlide {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  category: string;
  alt?: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  title?: string;
  subtitle?: string;
  tagline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  locationLabel?: string;
}

const fallbackImage =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90';

const fallbackSlides: HeroSlide[] = [
  {
    _id: 'fallback-wedding-portrait',
    imageUrl: fallbackImage,
    category: 'WEDDINGS',
    alt: 'Romantic wedding portrait',
  },
  {
    _id: 'fallback-golden-hour',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=90',
    category: 'WEDDINGS',
    alt: 'Wedding couple at golden hour',
  },
  {
    _id: 'fallback-engagement',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=90',
    category: 'ENGAGEMENTS',
    alt: 'Engagement portrait',
  },
];

const SLIDE_INTERVAL = 2000;

function getSlideUrl(slide?: HeroSlide) {
  if (slide?.imageUrl) return slide.imageUrl;

  try {
    if (slide?.image && hasSanityImageAsset(slide.image)) {
      return urlFor(slide.image).width(1920).quality(90).url();
    }
  } catch {
    return fallbackImage;
  }

  return fallbackImage;
}

function isInquiryCta(text?: string) {
  return /\b(inquire|inquiry|contact|availability)\b/i.test(text || '');
}

function normalizeCtaLink(link: string | undefined, text: string | undefined, fallback: string) {
  const trimmedLink = link?.trim();

  if (!trimmedLink) return isInquiryCta(text) ? '/contact' : fallback;
  if (/^(https?:)?\/\//.test(trimmedLink) || /^(mailto|tel):/i.test(trimmedLink)) return trimmedLink;

  const internalPath = trimmedLink.startsWith('/') ? trimmedLink : `/${trimmedLink}`;
  return isInquiryCta(text) && /^\/(inquire|inquiry|contact-us)\/?$/i.test(internalPath)
    ? '/contact'
    : internalPath;
}

export function HeroSection({
  slides = [],
  title = "for Life's Most Beautiful Moments",
  subtitle = 'Luxury wedding, quinceañera & engagement photography and videography for couples and families in Nebraska & Iowa.',
  tagline,
  primaryCtaText = 'Check Availability',
  primaryCtaLink = '/contact',
  locationLabel = 'Omaha, NE',
}: HeroSectionProps) {
  const heroSlides = useMemo(() => (slides.length > 0 ? slides : fallbackSlides), [slides]);
  const primaryHref = normalizeCtaLink(primaryCtaLink, primaryCtaText, '/contact');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative isolate min-h-[420px] overflow-hidden bg-[#06112A] pt-[82px] lg:min-h-[520px]">
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={slide._id}
            className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <Image
              src={getSlideUrl(slide)}
              alt={slide.alt || slide.category || 'Romantic wedding portrait'}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[2000ms] ease-linear"
              style={{ transform: isActive ? 'scale(1.03)' : 'scale(1)' }}
              priority={index === 0}
              quality={92}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-[#06112A]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06112A]/95 via-[#06112A]/62 to-[#06112A]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06112A]/42 via-transparent to-transparent" />

      <Container className="relative z-10 flex min-h-[260px] items-center py-6 lg:min-h-[340px] lg:py-10">
        <div className="grid w-full items-center gap-3 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C8A23D]">
              {tagline || 'Timeless Storytelling'}
            </span>
            <h1 className="mt-5 font-heading text-5xl font-light leading-[0.98] text-[#FAF7F2] sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <div className="mt-7 h-px w-16 bg-[#C8A23D]" />
            <p className="mt-7 max-w-md font-heading text-xl leading-relaxed text-[#FAF7F2]/82">
              {subtitle}
            </p>
            <div className="mt-9">
              <Button
                variant="secondary"
                size="lg"
                href={primaryHref}
                className="border-[#C8A23D] bg-[#C8A23D] text-[#FAF7F2] hover:bg-[#A8842E] hover:text-[#FAF7F2]"
              >
                {primaryCtaText}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden min-h-[140px] lg:block"
          >
            <div className="absolute bottom-0 right-0 text-right">
              <Image
                src="/Gerald Photo Video-w.png"
                alt={SITE.name}
                width={150}
                height={70}
                className="ml-auto h-auto w-32"
                priority
              />
              <div className="mt-2 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A23D]">
                {locationLabel}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Slide Indicators */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide._id}
              onClick={() => setCurrentSlide(index)}
              className="group flex items-center justify-center p-2"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'h-3 w-8 bg-[#C8A23D] shadow-[0_0_12px_rgba(200,162,61,0.5)]'
                    : 'h-2.5 w-2.5 bg-[#FAF7F2]/45 hover:bg-[#FAF7F2]/75'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

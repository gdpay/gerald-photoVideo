'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { heroText, heroTextSecondary } from '@/lib/animations';
import { ChevronDown } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
  imageUrl?: string;
  isVideo?: boolean;
  videoUrl?: string;
  size?: 'full' | 'large';
}

export function HeroSection({
  title = SITE.tagline,
  subtitle = `Luxury wedding, quinceañera & engagement photography serving ${SITE.address.region}`,
  imageSource,
  imageUrl,
  videoUrl,
  size = 'full',
}: HeroSectionProps) {
  return (
    <section className={`relative ${size === 'full' ? 'h-screen min-h-[700px]' : 'h-[70vh] min-h-[500px]'} flex items-center justify-center overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0">
        {imageSource ? (
          <SanityImage
            source={imageSource}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-warm-black via-dark to-charcoal" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/40 to-warm-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-black/30 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-light leading-[1.05] tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={heroTextSecondary}
            initial="hidden"
            animate="visible"
            className="mt-6 text-lg sm:text-xl text-cream/70 font-body font-light max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
          <motion.div
            variants={heroTextSecondary}
            initial="hidden"
            animate="visible"
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
            variants={heroTextSecondary}
            initial="hidden"
            animate="visible"
            className="mt-4 text-sm text-cream/40"
          >
            or call{' '}
            <a href={`tel:${SITE.phoneRaw}`} className="text-gold hover:text-gold-light transition-colors">
              {SITE.phone}
            </a>
          </motion.p>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-cream/30" />
      </motion.div>
    </section>
  );
}

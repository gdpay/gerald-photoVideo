'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { heroText, heroTextSecondary } from '@/lib/animations';
import { SanityImage } from '@/components/shared/sanity-image';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
  imageUrl?: string;
}

export function PageHero({ title, subtitle, imageSource, imageUrl }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background */}
      {imageSource ? (
        <>
          <SanityImage
            source={imageSource}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-warm-black/60" />
        </>
      ) : imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/70 to-warm-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-warm-black to-warm-black" />
      )}

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container className="relative z-10">
        <motion.h1
          variants={heroText}
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light max-w-3xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={heroTextSecondary}
            initial="hidden"
            animate="visible"
            className="mt-4 text-lg text-cream/60 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SanityImage } from '@/components/shared/sanity-image';
import { TypewriterText } from '@/components/shared/typewriter-text';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
  imageUrl?: string;
  typewriterWords?: string[];
}

export function PageHero({ title, subtitle, imageSource, imageUrl, typewriterWords }: PageHeroProps) {
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light max-w-3xl"
        >
          {typewriterWords ? (
            <TypewriterText
              words={typewriterWords}
              delay={500}
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={2500}
            />
          ) : (
            title
          )}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-lg text-cream/60 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}

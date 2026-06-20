'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SanityImage } from '@/components/shared/sanity-image';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
  imageUrl?: string;
}

export function PageHero({ title, subtitle, imageSource, imageUrl }: PageHeroProps) {
  const hasImage = !!(imageSource || imageUrl);

  return (
    <section className="relative pt-8 pb-4 md:pt-8 md:pb-6 overflow-hidden bg-ivory">
      {/* Background */}
      {hasImage && (
        <>
          {imageSource ? (
            <SanityImage
              source={imageSource}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/90 via-navy/30 to-navy/20" />
        </>
      )}

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <Container className="relative z-10">
        {hasImage ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-light max-w-3xl"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-4 text-lg text-ivory/60 max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}
          </>
        ) : (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-[1px] w-16 bg-gold mb-8 origin-left"
            />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-navy font-light max-w-3xl"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-4 text-lg text-stone-500 max-w-xl"
              >
                {subtitle}
              </motion.p>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

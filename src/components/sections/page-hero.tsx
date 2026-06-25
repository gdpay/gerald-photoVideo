'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SanityImage } from '@/components/shared/sanity-image';

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
  imageUrl?: string;
}

export function PageHero({ title, subtitle, tagline, imageSource, imageUrl }: PageHeroProps) {
  const fallbackImageUrl = imageUrl || DEFAULT_HERO_IMAGE;

  return (
    <section className="relative isolate min-h-[420px] overflow-hidden bg-[#06112A] pt-[82px] lg:min-h-[520px]">
      {/* Background */}
      {imageSource ? (
        <SanityImage
          source={imageSource}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      ) : (
        <img
          src={fallbackImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-[#06112A]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06112A]/95 via-[#06112A]/62 to-[#06112A]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06112A]/42 via-transparent to-transparent" />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <Container className="relative z-10 flex min-h-[260px] items-center py-6 lg:min-h-[340px] lg:py-10">
        <div className="max-w-xl">
          {tagline && (
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C8A23D]"
            >
              {tagline}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-5 font-heading text-5xl font-light leading-[0.98] text-[#FAF7F2] sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>
          <div className="mt-7 h-px w-16 bg-[#C8A23D]" />
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-7 max-w-md font-heading text-xl leading-relaxed text-[#FAF7F2]/82"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}

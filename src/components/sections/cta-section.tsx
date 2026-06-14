'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { SanityImage } from '@/components/shared/sanity-image';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageSource?: any;
}

export function CTASection({
  title = 'Ready to Create Something Beautiful?',
  subtitle = "Let's start planning your session. We'll work together to create images you'll treasure forever.",
  primaryCTA = { label: 'Check Availability', href: '/contact' },
  secondaryCTA,
  imageSource,
}: CTASectionProps) {
  return (
    <SectionWrapper navy>
      {/* Background Image */}
      {imageSource && (
        <div className="absolute inset-0">
          <SanityImage
            source={imageSource}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
        </div>
      )}

      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#C8A23D]/50 to-transparent" />

      <Container narrow className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#FAF7F2]"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-[#FAF7F2]/60 max-w-lg mx-auto"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href={primaryCTA.href}>
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button variant="outline" size="lg" href={secondaryCTA.href}>
              {secondaryCTA.label}
            </Button>
          )}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-[#FAF7F2]/40"
        >
          Or call{' '}
          <a href={`tel:${SITE.phoneRaw}`} className="text-[#C8A23D] hover:text-[#C8A23D]/80 transition-colors">
            {SITE.phone}
          </a>
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}

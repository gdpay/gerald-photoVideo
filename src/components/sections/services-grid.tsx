'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { SERVICES } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Heart, Crown, Sparkles, Film, ArrowRight } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';
import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  Heart: <Heart className="h-6 w-6" />,
  Crown: <Crown className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Film: <Film className="h-6 w-6" />,
};

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
}

interface ServicesGridProps {
  services?: ServiceItem[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const displayServices = SERVICES.map((s) => {
    const sanityService = services?.find((ss) => ss.slug === s.id);
    return {
      ...s,
      heroImage: sanityService?.heroImage,
      sanityDescription: sanityService?.shortDescription,
    };
  });

  return (
    <SectionWrapper gold>
      <Container>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-xs uppercase tracking-[0.15em] text-gold"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl text-cream"
          >
            What We Capture
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayServices.map((service) => (
            <motion.div key={service.id} variants={staggerItem}>
              <Link href={service.href} className="group block">
                <div className="relative h-80 overflow-hidden rounded-sm bg-gradient-to-b from-charcoal to-dark border border-cream/5 group-hover:border-gold/30 transition-all duration-500">
                  {/* Hero Image */}
                  {service.heroImage ? (
                    <SanityImage
                      source={service.heroImage}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                  ) : (
                    /* Icon fallback */
                    <div className="absolute top-6 left-6 text-gold/60 group-hover:text-gold transition-colors duration-500">
                      {iconMap[service.icon]}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-warm-black/90 via-warm-black/30 to-transparent">
                    <h3 className="font-heading text-2xl text-cream group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/60 leading-relaxed">
                      {service.sanityDescription || service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-accent uppercase tracking-wider text-gold group-hover:gap-3 transition-all duration-300">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

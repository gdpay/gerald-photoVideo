'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { SERVICES } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';

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
    <SectionWrapper>
      <Container>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-[#C8A23D]"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl text-[#0A1F44]"
          >
            What We Capture
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {displayServices.map((service) => (
            <motion.div key={service.id} variants={staggerItem} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
              <Link href={service.href} className="group block h-full">
                <div className="relative h-80 overflow-hidden bg-[#FAF7F2] border border-[#E5E0D8] group-hover:border-[#C8A23D]/40 transition-all duration-500">
                  {/* Hero Image */}
                  {service.heroImage ? (
                    <SanityImage
                      source={service.heroImage}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    />
                  ) : (
                    /* Gradient fallback */
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F0EDE6] to-[#E5E0D8]" />
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#FAF7F2]/95 via-[#FAF7F2]/30 to-transparent">
                    <h3 className="font-heading text-2xl text-[#0A1F44] group-hover:text-[#C8A23D] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#736D63] leading-relaxed">
                      {service.sanityDescription || service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-body uppercase tracking-wider text-[#C8A23D] group-hover:gap-3 transition-all duration-300">
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

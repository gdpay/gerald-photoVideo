'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { SERVICES } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowRight, Play } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  tagline?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
}

interface GalleryItem {
  _id: string;
  title: string;
  serviceType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage?: any;
  images?: Array<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asset?: any;
    alt?: string;
    caption?: string;
  }>;
}

interface ServicesGridProps {
  services?: ServiceItem[];
  galleries?: GalleryItem[];
  eyebrow?: string;
  heading?: string;
  linkLabel?: string;
}

const featuredServiceIds = ['weddings', 'quinceaneras', 'engagements', 'videography'] as const;

const serviceTaglines: Record<(typeof featuredServiceIds)[number], string> = {
  weddings: 'Timeless & Elegant',
  quinceaneras: 'Celebrating Her Story',
  engagements: 'Your Beginning',
  videography: 'Cinematic Films',
};

const serviceFallbacks: Record<(typeof featuredServiceIds)[number], string> = {
  weddings:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&auto=format',
  quinceaneras:'https://images.unsplash.com/photo-1495231916356-a86217efff12?w=800&q=85&auto=format',
  engagements:'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=85&auto=format',
  videography:'',
};

export function ServicesGrid({ services, galleries, eyebrow = 'Explore', heading = 'Every Love Story is Unique', linkLabel = 'View Gallery' }: ServicesGridProps) {
  const displayServices = featuredServiceIds.map((serviceId) => {
    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) return null;

    const sanityService = services?.find((ss) => ss.slug === service.id);
    const sanityGallery = galleries?.find((gallery) => gallery.serviceType === service.id);
    const galleryImage = sanityGallery?.coverImage || sanityGallery?.images?.[0];

    return {
      ...service,
      heroImage: galleryImage || sanityService?.heroImage,
      imageAlt: sanityGallery?.coverImage?.alt || sanityGallery?.images?.[0]?.alt || service.title,
      tagline: sanityService?.tagline || serviceTaglines[serviceId],
    };
  }).filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <SectionWrapper>
      <Container>
        <div className="mb-10 text-center md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#A8842E]"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-heading text-4xl font-light leading-none text-[#0A1F44] md:text-5xl lg:text-6xl"
          >
            {heading}
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-6"
        >
          {displayServices.map((service) => (
            <motion.article key={service.id} variants={staggerItem}>
              <Link href={service.href} className="group block">
                <div className="relative aspect-[1.08/1] overflow-hidden border border-[#E5E0D8] bg-[#F0EDE6] shadow-sm transition duration-500 group-hover:border-[#C8A23D]/60">
                  {service.heroImage ? (
                    <SanityImage
                      source={service.heroImage}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (serviceFallbacks as Record<string, string>)[service.id] ? (
                    <Image
                      src={(serviceFallbacks as Record<string, string>)[service.id]}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#E5E0D8]" />
                  )}

                  {service.id === 'videography' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-[#0A1F44]/35 text-white shadow-[0_0_24px_rgba(10,31,68,0.24)] backdrop-blur-[2px] transition duration-300 group-hover:scale-110 group-hover:bg-[#0A1F44]/50">
                        <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-7 text-center">
                  <h3 className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1A1713]">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-heading text-xl italic leading-none text-[#1A1713] md:text-2xl">
                    {service.tagline}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1713] transition-all duration-300 group-hover:gap-3 group-hover:text-[#A8842E]">
                    {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

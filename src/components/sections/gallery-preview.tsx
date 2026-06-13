'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { SanityImage } from '@/components/shared/sanity-image';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GalleryImage {
  source: any;
  alt: string;
  span?: 'wide' | 'tall' | 'large';
}

interface GalleryPreviewProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
}

export function GalleryPreview({ images, title = 'Featured Collections', subtitle = 'Our Work' }: GalleryPreviewProps) {
  // If no images provided, show nothing
  if (!images || images.length === 0) return null;

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
            {subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-[#0A1F44]"
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={cn(
                'relative overflow-hidden group cursor-pointer',
                image.span === 'large' && 'col-span-2 row-span-2',
                image.span === 'wide' && 'col-span-2',
                image.span === 'tall' && 'row-span-2',
                !image.span && 'aspect-[3/4]'
              )}
            >
              <SanityImage
                source={image.source}
                alt={image.alt}
                fill
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A1F44]/0 group-hover:bg-[#0A1F44]/20 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="secondary" size="lg" href="/portfolio">
            View Full Portfolio
          </Button>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

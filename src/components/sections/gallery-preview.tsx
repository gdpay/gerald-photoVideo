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
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  // If no images provided, show nothing (or could show a loading state)
  if (!images || images.length === 0) return null;

  return (
    <SectionWrapper>
      <Container>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-xs uppercase tracking-[0.15em] text-gold"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-cream"
          >
            Featured Collections
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
                'relative overflow-hidden rounded-sm group cursor-pointer',
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
              <div className="absolute inset-0 bg-warm-black/0 group-hover:bg-warm-black/30 transition-all duration-500" />
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

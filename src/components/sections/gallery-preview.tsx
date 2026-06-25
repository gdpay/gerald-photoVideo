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
  // If no images provided, show nothing
  if (!images || images.length === 0) return null;

  return (
    <SectionWrapper>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0"
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
                !image.span && 'aspect-[3/4]',
                'border-[6px] md:border-[8px] border-[#FAF7F2]'
              )}
            >
              <SanityImage
                source={image.source}
                alt={image.alt}
                fill
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-[6px] md:inset-[8px] bg-[#0A1F44]/0 group-hover:bg-[#0A1F44]/20 transition-all duration-500" />
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

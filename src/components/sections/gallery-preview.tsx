'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { SanityImage } from '@/components/shared/sanity-image';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GalleryImage {
  source?: any;
  imageUrl?: string;
  alt: string;
  span?: 'wide' | 'tall' | 'large';
}

interface GalleryPreviewProps {
  images?: GalleryImage[];
  layout?: 'mosaic' | 'row';
}

export function GalleryPreview({ images, layout = 'mosaic' }: GalleryPreviewProps) {
  // If no images provided, show nothing
  if (!images || images.length === 0) return null;
  const isRowLayout = layout === 'row';
  const visibleImages = images.slice(0, 3);

  return (
    <SectionWrapper>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className={cn(
            'grid gap-0',
            isRowLayout ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
          )}
        >
          {visibleImages.map((image, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={cn(
                'relative overflow-hidden group cursor-pointer',
                isRowLayout && 'aspect-[4/3]',
                !isRowLayout && image.span === 'large' && 'col-span-2 row-span-2 aspect-square',
                !isRowLayout && image.span === 'wide' && 'col-span-2 aspect-[4/3]',
                !isRowLayout && image.span === 'tall' && 'row-span-2 aspect-[3/4]',
                !isRowLayout && !image.span && 'aspect-[3/4]',
                'border-[6px] md:border-[8px] border-[#FAF7F2]'
              )}
            >
              {image.source ? (
                <SanityImage
                  source={image.source}
                  alt={image.alt}
                  fill
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              ) : image.imageUrl ? (
                <Image
                  src={image.imageUrl}
                  alt={image.alt}
                  fill
                  sizes={isRowLayout ? '(max-width: 768px) 100vw, 33vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
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

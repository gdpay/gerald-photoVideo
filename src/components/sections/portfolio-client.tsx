'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { SanityImage } from '@/components/shared/sanity-image';
import { VideoEmbed } from '@/components/shared/video-embed';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PageHeroData } from '@/lib/page-hero-data';

const categories = ['All', 'Weddings', 'Quinceañeras', 'Engagements', 'Videography'] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GalleryImage {
  source: any;
  alt: string;
  category: string;
}

interface PortfolioClientProps {
  galleryImages: GalleryImage[];
  hero?: PageHeroData | null;
}

export function PortfolioClient({ galleryImages, hero }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHero
        tagline={hero?.tagline}
        title={hero?.heading || 'Our Portfolio'}
        subtitle={hero?.subheading || 'A curated collection of our favorite moments.'}
        imageSource={hero?.backgroundImage}
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      <SectionWrapper className="-mt-8">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2 text-sm font-body uppercase tracking-wider transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-[#0A1F44] text-[#FAF7F2]'
                    : 'text-[#736D63] border border-[#D4CEC4] hover:border-[#C8A23D]/50 hover:text-[#C8A23D]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Video — Videography */}
          {activeCategory === 'Videography' && (
            <div className="mb-12 max-w-4xl mx-auto">
              <p className="text-sm uppercase tracking-[0.18em] text-[#C8A23D] text-center mb-3">
                Featured Film
              </p>
              <VideoEmbed
                src="https://vimeo.com/284882984"
                title="Quinceañera de Ayaremi"
              />
              <p className="mt-4 text-sm text-[#736D63] text-center">
                A cinematic highlight reel — Quinceañera de Ayaremi
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {galleryImages.length === 0 && activeCategory !== 'Videography' ? (
            <div className="text-center py-20 text-[#A39D93]">No gallery images yet.</div>
          ) : filtered.length === 0 && galleryImages.length > 0 && activeCategory !== 'Videography' ? (
            <div className="text-center py-20 text-[#A39D93]">No images in this category yet.</div>
          ) : null}
          {filtered.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={activeCategory}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            >
              <AnimatePresence mode="wait">
                {filtered.map((image, index) => (
                  <motion.div
                    key={`${image.category}-${index}`}
                    variants={staggerItem}
                    layout
                    className="aspect-[3/4] overflow-hidden cursor-pointer group relative"
                    onClick={() => setLightboxIndex(filtered.indexOf(image))}
                  >
                    <SanityImage
                      source={image.source}
                      alt={image.alt}
                      fill
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0A1F44]/0 group-hover:bg-[#0A1F44]/30 transition-all duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-[#FAF7F2] text-xs font-body uppercase tracking-wider transition-opacity duration-300">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A1F44]/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
            )}

            <div className="relative max-h-[90vh] max-w-[90vw] aspect-[3/4]" onClick={(e) => e.stopPropagation()}>
              <SanityImage
                source={filtered[lightboxIndex].source}
                alt={filtered[lightboxIndex].alt}
                fill
                priority
              />
            </div>

            {lightboxIndex < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAF7F2]/50 hover:text-[#FAF7F2] transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#FAF7F2]/40 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection
        title="Ready to Create Your Own Gallery?"
        subtitle="Let's work together to create images you'll love."
        primaryCTA={{ label: 'Get Started', href: '/contact' }}
      />
    </>
  );
}

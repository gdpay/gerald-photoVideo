import { HeroSection } from '@/components/sections/hero-section';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesGrid } from '@/components/sections/services-grid';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { ProcessSection } from '@/components/sections/process-section';
import { CTASection } from '@/components/sections/cta-section';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { client } from '../../sanity/lib/client';
import { galleriesQuery, homeHeroQuery, featuredServicesQuery, featuredTestimonialsQuery, heroSlidesQuery } from '../../sanity/lib/queries';
import { Camera, Film, Heart, Play, ArrowRight } from 'lucide-react';
import { VideoEmbed } from '@/components/shared/video-embed';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function preparePreviewImages(galleries: any[]) {
  const images: { source: any; alt: string; span?: 'wide' | 'tall' | 'large' }[] = [];
  const spans = ['large', 'tall', 'wide', undefined, undefined, undefined] as const;

  let count = 0;
  for (const gallery of galleries) {
    if (!gallery.images) continue;
    for (const img of gallery.images) {
      if (count >= 7) break;
      images.push({
        source: img,
        alt: img.alt || gallery.title,
        span: spans[count % spans.length],
      });
      count++;
    }
    if (count >= 7) break;
  }
  return images;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareCategoryImages(galleries: any[], serviceType: string) {
  const gallery = galleries.find((g: any) => g.serviceType === serviceType);
  if (!gallery?.images) return [];
  return gallery.images.slice(0, 1).map((img: any) => ({
    source: img,
    alt: img.alt || gallery.title,
  }));
}

export default async function HomePage() {
  const [galleries, heroData, services, testimonials, heroSlides] = await Promise.all([
    client.fetch(galleriesQuery),
    client.fetch(homeHeroQuery),
    client.fetch(featuredServicesQuery),
    client.fetch(featuredTestimonialsQuery),
    client.fetch(heroSlidesQuery).catch(() => []),
  ]);
  const previewImages = preparePreviewImages(galleries);

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection
        slides={heroSlides}
        title={heroData?.sections?.heading}
        subtitle={heroData?.sections?.subheading}
      />

      {/* 2. Featured Galleries - Wedding, Quinceañeras, Engagements, Videography, Portraits */}
      <ServicesGrid services={services} />
      <GalleryPreview images={previewImages} />

      {/* 3. Featured Film Section */}
      <SectionWrapper navy>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-[#C8A23D]">
                Cinematic Films
              </span>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl text-[#FAF7F2]">
                Experience Your Story in Motion
              </h2>
              <p className="mt-6 text-[#FAF7F2]/60 leading-relaxed max-w-md">
                Our cinematic wedding films are crafted to transport you back to your wedding day — 
                the sound of your heartbeat during the first look, the laughter during toasts, 
                the energy of the dance floor.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Button variant="primary" size="lg" href="/videography">
                  Watch Films
                </Button>
                <Button variant="outline" size="lg" href="/videography">
                  Learn About Videography
                </Button>
              </div>
            </div>
            <VideoEmbed
              src="https://player.vimeo.com/video/947865089"
              title="Watch Featured Film"
              posterUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
            />
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. Meet Gerald Section */}
      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/5] bg-[#F0EDE6] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#F0EDE6] to-[#E5E0D8] flex items-center justify-center">
                <Camera className="h-16 w-16 text-[#A39D93]/30" />
              </div>
            </div>
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-[#C8A23D]">
                About
              </span>
              <h2 className="mt-4 font-heading text-4xl md:text-5xl text-[#0A1F44]">
                Meet Gerald
              </h2>
              <p className="mt-6 text-[#736D63] leading-relaxed">
                With over a decade of experience capturing life&apos;s most beautiful moments, 
                Gerald brings an editorial eye and a genuine heart to every celebration. 
                What started as a passion for photography has grown into a full-service studio 
                serving couples and families across Nebraska and Iowa.
              </p>
              <p className="mt-4 text-[#736D63] leading-relaxed">
                Every image is crafted with intention — from composition to color to emotion. 
                We don&apos;t just take pictures; we tell stories that families treasure for generations.
              </p>
              <div className="mt-8">
                <Button variant="secondary" size="lg" href="/about">
                  Read Our Story <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 5. The Experience Section */}
      <ProcessSection />

      {/* 6. Client Stories / Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* 7. Contact / Check Availability */}
      <CTASection />
    </>
  );
}

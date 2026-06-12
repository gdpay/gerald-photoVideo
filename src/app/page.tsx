import { HeroSection } from '@/components/sections/hero-section';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesGrid } from '@/components/sections/services-grid';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { ProcessSection } from '@/components/sections/process-section';
import { CTASection } from '@/components/sections/cta-section';
import { client } from '../../sanity/lib/client';
import { galleriesQuery, homeHeroQuery, featuredServicesQuery, featuredTestimonialsQuery } from '../../sanity/lib/queries';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function preparePreviewImages(galleries: any[]) {
  const images: { source: any; alt: string; span?: 'wide' | 'tall' | 'large' }[] = [];
  const spans = ['large', 'tall', 'wide', undefined, undefined, undefined] as const;

  // Pick up to 7 featured images across all galleries
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

export default async function HomePage() {
  const [galleries, heroData, services, testimonials] = await Promise.all([
    client.fetch(galleriesQuery),
    client.fetch(homeHeroQuery),
    client.fetch(featuredServicesQuery),
    client.fetch(featuredTestimonialsQuery),
  ]);
  const previewImages = preparePreviewImages(galleries);

  return (
    <>
      <HeroSection
        title={heroData?.sections?.heading}
        subtitle={heroData?.sections?.subheading}
        imageSource={heroData?.sections?.backgroundImage}
      />
      <TrustBar />
      <ServicesGrid services={services} />
      <GalleryPreview images={previewImages} />
      <TestimonialCarousel testimonials={testimonials} />
      <ProcessSection />
      <CTASection />
    </>
  );
}

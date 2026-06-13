import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { galleryByServiceTypeQuery, pageBySlugQuery, featuredTestimonialsQuery } from '../../../sanity/lib/queries';
import { Heart, Camera, Video, Users, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Wedding Photography & Videography',
  description:
    'Cinematic wedding photography and videography for couples in Nebraska and Iowa. Capturing your love story with artistry and heart.',
  path: '/weddings',
  keywords: [
    'wedding photographer Omaha',
    'Nebraska wedding photographer',
    'Iowa wedding photographer',
    'luxury wedding photography',
    'cinematic wedding videography',
  ],
});

const highlights = [
  { icon: Camera, label: 'Photography', desc: 'High-resolution digital images edited in our signature style' },
  { icon: Video, label: 'Videography', desc: 'Cinematic highlight film and full ceremony edit available' },
  { icon: Users, label: 'Second Shooter', desc: 'Additional photographer for multi-angle coverage' },
  { icon: Clock, label: 'Full Day Coverage', desc: 'From getting ready to the last dance' },
  { icon: Heart, label: 'Engagement Session', desc: 'Complimentary engagement shoot with select collections' },
  { icon: MapPin, label: 'Destination Ready', desc: 'Serving Nebraska, Iowa, and beyond' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareGalleryImages(gallery: any) {
  if (!gallery?.images) return [];
  const spans = ['large', 'tall', 'wide', undefined, undefined, undefined];
  return gallery.images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery.title,
    span: spans[i % spans.length],
  }));
}

export default async function WeddingsPage() {
  const [gallery, pageData, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery('weddings')),
    client.fetch(pageBySlugQuery('weddings')).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const galleryImages = prepareGalleryImages(gallery);

  // Find hero section from page data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroSection = pageData?.sections?.find((s: any) => s._type === 'hero');

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Weddings', url: '/weddings' },
      ]} />
      <PageHero
        title="Wedding Photography & Videography"
        subtitle="Every love story deserves to be told beautifully. We capture the emotion, the details, and the moments that make your wedding uniquely yours."
        imageSource={heroSection?.backgroundImage}
      />

      {/* Intro */}
      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            Your wedding day is one of the most important days of your life. It&apos;s a celebration of love,
            family, and the beginning of a new chapter. Our approach is documentary meets editorial —
            we capture authentic moments with a cinematic, fine-art aesthetic. From the quiet anticipation
            of getting ready to the joyful chaos of the dance floor, we&apos;re there for all of it.
          </p>
        </Container>
      </SectionWrapper>

      {/* What We Cover */}
      <SectionWrapper champagne>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] text-center mb-12">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="p-6 bg-[#FAF7F2] border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors group"
              >
                <item.icon className="h-6 w-6 text-[#C8A23D] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl text-[#0A1F44] mb-2">{item.label}</h3>
                <p className="text-sm text-[#736D63]">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <GalleryPreview images={galleryImages} />
      <TestimonialCarousel testimonials={testimonials} />
      <CTASection
        title="Let's Capture Your Love Story"
        subtitle="Reach out to check availability and learn more about our wedding collections."
        primaryCTA={{ label: 'Inquire About Weddings', href: '/contact' }}
        secondaryCTA={{ label: 'View Investment', href: '/investment' }}
      />
    </>
  );
}

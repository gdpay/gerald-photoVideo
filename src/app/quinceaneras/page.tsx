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
import { Crown, Camera, Video, Users, Sparkles, Heart } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Quinceañera Photography & Videography',
  description:
    'Professional quinceañera photography and videography in Nebraska and Iowa. Celebrating your daughter\'s journey with stunning portraits and cinematic films.',
  path: '/quinceaneras',
  keywords: [
    'quinceañera photographer Omaha',
    'quinceañera videography Nebraska',
    'quince photographer Iowa',
    'fifteenth birthday photographer',
  ],
});

const highlights = [
  { icon: Camera, label: 'Portrait Session', desc: 'Stunning individual and family portraits in our studio or on location' },
  { icon: Video, label: 'Highlight Film', desc: 'Cinematic keepsake video capturing the magic of the celebration' },
  { icon: Crown, label: 'Court Coverage', desc: 'Your daughter and her court — every choreographed moment' },
  { icon: Sparkles, label: 'Details & Decor', desc: 'The dress, the cake, the flowers, and all the carefully planned details' },
  { icon: Heart, label: 'Family & Friends', desc: 'Candid moments with loved ones that you will treasure forever' },
  { icon: Users, label: 'Full Event Coverage', desc: 'From preparations through the reception — we capture it all' },
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

export default async function QuinceanerasPage() {
  const [gallery, pageData, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery('quinceaneras')),
    client.fetch(pageBySlugQuery('quinceaneras')).catch(() => null),
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
        { name: 'Quinceañeras', url: '/quinceaneras' },
      ]} />
      <PageHero
        title="Quinceañera Photography & Video"
        subtitle="Celebrating her journey into womanhood with the elegance and artistry it deserves."
        imageSource={heroSection?.backgroundImage}
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            A quinceañera is a once-in-a-lifetime celebration — a beautiful blend of tradition, family, and
            joy. We understand the cultural significance and work closely with families to ensure every
            moment is captured with respect and artistry. From the religious ceremony to the waltz, from
            the formal portraits to the candid laughter, we&apos;re honored to document this milestone.
          </p>
        </Container>
      </SectionWrapper>

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
        title="Plan Her Dream Celebration"
        subtitle="Let's discuss how we can capture every beautiful moment of her special day."
        primaryCTA={{ label: 'Inquire About Quinceañeras', href: '/contact' }}
      />
    </>
  );
}

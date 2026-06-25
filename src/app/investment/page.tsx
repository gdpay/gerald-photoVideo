import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { Button } from '@/components/ui/button';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { investmentPageQuery, galleryByServiceTypeQuery } from '../../../sanity/lib/queries';
import { Check, Heart } from 'lucide-react';

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getInvestmentData(): Promise<any> {
  try {
    return await client.fetch(investmentPageQuery);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Investment',
    description:
      'Premium wedding, quinceañera, and engagement photography investment. Custom collections designed for your unique celebration in Nebraska and Iowa.',
    path: '/investment',
    keywords: [
      'wedding photography investment Omaha',
      'photography pricing Nebraska',
      'quinceañera photography packages',
      'wedding photographer cost Iowa',
    ],
  });
}

const fallbackCollections = [
  {
    name: 'Essentials',
    subtitle: 'For the intimate celebration',
    priceLabel: 'Upon Request',
    priceNote: 'Custom quote for your event',
    features: ['6 hours of coverage', 'Single photographer', '400+ edited images', 'Online gallery with print store', 'Print release'],
    popular: false,
  },
  {
    name: 'Signature',
    subtitle: 'Our most popular collection',
    priceLabel: 'Upon Request',
    priceNote: 'Custom quote for your event',
    features: ['10 hours of coverage', 'Lead photographer + second shooter', '800+ edited images', 'Online gallery with print store', 'Print release', 'Engagement session included', 'Premium album credit'],
    popular: true,
  },
  {
    name: 'Luxury',
    subtitle: 'The complete experience',
    priceLabel: 'Upon Request',
    priceNote: 'Custom quote for your event',
    features: ['Full day coverage (up to 12 hours)', 'Lead photographer + second shooter', 'All edited images (1,200+)', 'Online gallery with print store', 'Print release', 'Engagement session included', 'Premium heirloom album', 'Cinematic highlight film', 'Complimentary wall art'],
    popular: false,
  },
];

const fallbackAddOns = [
  'Additional hour of coverage',
  'Second shooter',
  'Engagement session',
  'Cinematic highlight film',
  'Drone footage',
  'Premium wedding album',
  'Same-day edit reel',
  'Raw footage archive',
];

const fallbackGalleryImages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    alt: 'Wedding couple sharing a quiet portrait moment',
    span: 'large' as const,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80',
    alt: 'Elegant wedding reception table details',
    span: 'tall' as const,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
    alt: 'Couple portrait during an engagement session',
    span: 'wide' as const,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareGalleryImages(gallery: any) {
  if (!gallery?.images) return [];
  const images = gallery.images.slice(0, 3);
  const spans = ['large', 'tall', 'wide'] as const;
  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery.title,
    span: spans[i % spans.length] as 'large' | 'tall' | 'wide' | undefined,
  }));
}

export default async function InvestmentPage() {
  const [data, investmentGallery] = await Promise.all([
    getInvestmentData(),
    client.fetch(galleryByServiceTypeQuery('investment')).catch(() => null),
  ]);

  const collections = data?.collections?.length ? data.collections : fallbackCollections;
  const addOns = data?.addOns?.length ? data.addOns : fallbackAddOns;
  const galleryImages = prepareGalleryImages(investmentGallery);
  const previewImages = galleryImages.length > 0 ? galleryImages : fallbackGalleryImages;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Investment', url: '/investment' },
      ]} />
      <PageHero
        title={data?.heroHeading || 'Investment'}
        subtitle={data?.heroSubheading || 'Every collection is as unique as your story. We create custom experiences tailored to your vision.'}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow className="text-center">
          <p className="text-lg text-[#736D63] leading-relaxed mb-4">
            {data?.philosophyText || "Our investment reflects our commitment to quality, not quantity. We believe in creating meaningful, lasting work that you'll treasure for generations. Every collection is thoughtfully crafted to provide an exceptional experience from start to finish."}
          </p>
          <p className="text-[#A39D93] text-sm">
            {data?.philosophyNote || 'All collections are customizable. Contact us for a personalized quote.'}
          </p>
        </Container>
      </SectionWrapper>

      <GalleryPreview images={previewImages} layout="row" />

      <SectionWrapper champagne>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection: { name: string; subtitle?: string; priceLabel?: string; priceNote?: string; features?: string[]; popular?: boolean }) => (
              <div
                key={collection.name}
                className={`relative p-8 border transition-all duration-300 bg-[#FAF7F2] ${
                  collection.popular
                    ? 'border-[#C8A23D] shadow-warm'
                    : 'border-[#E5E0D8] hover:border-[#C8A23D]/40'
                }`}
              >
                {collection.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C8A23D] text-[#FAF7F2] text-xs font-body uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <h3 className="font-heading text-2xl text-[#0A1F44] mb-1">{collection.name}</h3>
                <p className="text-sm text-[#736D63] mb-6">{collection.subtitle}</p>

                <div className="text-center mb-8">
                  <span className="font-body text-xs uppercase tracking-wider text-[#A39D93]">
                    Starting At
                  </span>
                  <p className="font-heading text-3xl text-[#C8A23D] mt-1">{collection.priceLabel || 'Upon Request'}</p>
                  <p className="text-xs text-[#A39D93] mt-1">{collection.priceNote || 'Custom quote for your event'}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {(collection.features || []).map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#736D63]">
                      <Check className="h-4 w-4 text-[#C8A23D] shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={collection.popular ? 'primary' : 'secondary'}
                  size="md"
                  href="/contact"
                  className="w-full"
                >
                  Request Details
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] text-center mb-12">
            {data?.addOnsHeading || 'A La Carte Add-Ons'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {addOns.map((addon: string) => (
              <div
                key={addon}
                className="p-4 border border-[#E5E0D8] text-center hover:border-[#C8A23D]/30 transition-colors"
              >
                <p className="text-sm text-[#736D63]">{addon}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper champagne>
        <Container narrow className="text-center">
          <Heart className="h-8 w-8 text-[#C8A23D]/50 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            {data?.paymentHeading || 'Flexible Payment Plans'}
          </h2>
          <p className="text-[#736D63] mb-8 max-w-lg mx-auto">
            {data?.paymentText || "We believe exceptional photography should be accessible. We offer flexible payment plans to make your investment manageable. A 30% deposit secures your date, with the balance due before your event."}
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-[#C8A23D] hover:text-[#A8842E] transition-colors font-body text-sm uppercase tracking-wider"
          >
            View FAQs About Payments →
          </a>
        </Container>
      </SectionWrapper>

      <CTASection
        title="Let's Create Your Custom Collection"
        subtitle="Tell us about your vision and we'll design the perfect collection for you."
        primaryCTA={{ label: 'Get Your Custom Quote', href: '/contact' }}
      />
    </>
  );
}

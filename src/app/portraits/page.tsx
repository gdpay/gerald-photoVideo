import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { PortfolioFeature } from '@/components/sections/portfolio-feature';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { getPageHeroData } from '@/lib/page-hero-data';
import { client } from '../../../sanity/lib/client';
import { galleryByServiceTypeQuery, portraitsPageQuery } from '../../../sanity/lib/queries';
import { Camera, Sparkles, Heart, Sun, MapPin, Users } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Portrait Photography',
  description:
    'Timeless portrait photography in Nebraska and Iowa. Individual, family, and senior portraits that celebrate your unique beauty and personality.',
  path: '/portraits',
  keywords: [
    'portrait photographer Omaha',
    'family portraits Nebraska',
    'senior portraits Iowa',
    'professional portrait photography',
  ],
});

const highlights = [
  { icon: Camera, label: 'Individual Portraits', desc: 'Professional portraits that capture your unique personality and style' },
  { icon: Users, label: 'Family Portraits', desc: 'Beautiful family portraits that celebrate your loved ones' },
  { icon: Sparkles, label: 'Senior Portraits', desc: 'Celebrate this milestone with stunning senior portraits' },
  { icon: Heart, label: 'Couple Portraits', desc: 'Romantic portraits that capture your connection' },
  { icon: Sun, label: 'Natural Light', desc: 'Beautiful outdoor sessions using golden hour light' },
  { icon: MapPin, label: 'Location Options', desc: 'Studio, urban, or outdoor locations across Nebraska & Iowa' },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function preparePortfolioFeatureImages(feature: any, gallery: any) {
  const images = feature?.images?.length ? feature.images : gallery?.images;
  if (!images) return [];

  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery?.title || `Portrait portfolio image ${i + 1}`,
  })).slice(0, 3);
}

export default async function PortraitsPage() {
  const [hero, data, portraitsGallery] = await Promise.all([
    getPageHeroData('portraits'),
    client.fetch(portraitsPageQuery).catch(() => null),
    client.fetch(galleryByServiceTypeQuery('portraits')).catch(() => null),
  ]);
  const portfolioFeatureImages = preparePortfolioFeatureImages(data?.portfolioFeature, portraitsGallery);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Portraits', url: '/portraits' },
      ]} />
      <PageHero
        tagline={hero?.tagline}
        title={hero?.heading || 'Portrait Photography'}
        subtitle={hero?.subheading || 'Timeless portraits that celebrate your unique beauty and personality.'}
        imageSource={hero?.backgroundImage}
        imageUrl="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            Every person has a story worth telling. Our portrait sessions are designed to capture 
            your authentic self — whether you&apos;re celebrating a milestone, updating your professional 
            brand, or simply want beautiful images of yourself and your loved ones. We create a 
            comfortable, relaxed environment where your true personality can shine through.
          </p>
        </Container>
      </SectionWrapper>

      <PortfolioFeature
        images={portfolioFeatureImages}
        buttonLabel={data?.portfolioFeature?.buttonLabel}
        buttonHref={data?.portfolioFeature?.buttonLink}
      />

      <SectionWrapper champagne>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] text-center mb-12">
            Portrait Sessions
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

      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            The Portrait Experience
          </h2>
          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A23D]/10 text-[#C8A23D] text-sm font-body shrink-0 mt-1">01</span>
              <div>
                <h3 className="font-heading text-xl text-[#0A1F44] mb-1">Consultation</h3>
                <p className="text-sm text-[#736D63]">We&apos;ll discuss your vision, style preferences, and choose the perfect location.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A23D]/10 text-[#C8A23D] text-sm font-body shrink-0 mt-1">02</span>
              <div>
                <h3 className="font-heading text-xl text-[#0A1F44] mb-1">Your Session</h3>
                <p className="text-sm text-[#736D63]">A relaxed, enjoyable photoshoot where we capture a range of natural and styled portraits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A23D]/10 text-[#C8A23D] text-sm font-body shrink-0 mt-1">03</span>
              <div>
                <h3 className="font-heading text-xl text-[#0A1F44] mb-1">Your Gallery</h3>
                <p className="text-sm text-[#736D63]">Beautifully edited images delivered in a private online gallery ready to share and print.</p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <CTASection
        title="Book Your Portrait Session"
        subtitle="Let's create beautiful portraits that celebrate you."
        primaryCTA={{ label: 'Check Availability', href: '/contact' }}
      />
    </>
  );
}

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

const highlightIcons = [Camera, Users, Sparkles, Heart, Sun, MapPin];

const fallbackHighlights = [
  { label: 'Individual Portraits', description: 'Professional portraits that capture your unique personality and style' },
  { label: 'Family Portraits', description: 'Beautiful family portraits that celebrate your loved ones' },
  { label: 'Senior Portraits', description: 'Celebrate this milestone with stunning senior portraits' },
  { label: 'Couple Portraits', description: 'Romantic portraits that capture your connection' },
  { label: 'Natural Light', description: 'Beautiful outdoor sessions using golden hour light' },
  { label: 'Location Options', description: 'Studio, urban, or outdoor locations across Nebraska & Iowa' },
];

const fallbackSteps = [
  { title: 'Consultation', description: "We'll discuss your vision, style preferences, and choose the perfect location." },
  { title: 'Your Session', description: 'A relaxed, enjoyable photoshoot where we capture a range of natural and styled portraits.' },
  { title: 'Your Gallery', description: 'Beautifully edited images delivered in a private online gallery ready to share and print.' },
];

interface HighlightItem {
  label: string;
  description?: string;
  desc?: string;
}

interface StepItem {
  title: string;
  description: string;
}
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
  const highlights: HighlightItem[] = data?.highlights?.length ? data.highlights : fallbackHighlights;
  const steps: StepItem[] = data?.steps?.length ? data.steps : fallbackSteps;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Portraits', url: '/portraits' },
      ]} />
      <PageHero
        tagline={hero?.tagline}
        title={data?.heroHeading || hero?.heading || 'Portrait Photography'}
        subtitle={data?.heroSubheading || hero?.subheading || 'Timeless portraits that celebrate your unique beauty and personality.'}
        imageSource={data?.heroImage || hero?.backgroundImage}
        imageUrl="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            {data?.introText || "Every person has a story worth telling. Our portrait sessions are designed to capture your authentic self — whether you're celebrating a milestone, updating your professional brand, or simply want beautiful images of yourself and your loved ones. We create a comfortable, relaxed environment where your true personality can shine through."}
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
            {data?.highlightsHeading || 'Portrait Sessions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = highlightIcons[index % highlightIcons.length];
              return (
                <div
                  key={item.label}
                  className="p-6 bg-[#FAF7F2] border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-[#C8A23D] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl text-[#0A1F44] mb-2">{item.label}</h3>
                  <p className="text-sm text-[#736D63]">{item.description || item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            {data?.stepsHeading || 'The Portrait Experience'}
          </h2>
          <div className="space-y-6 text-left">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A23D]/10 text-[#C8A23D] text-sm font-body shrink-0 mt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-[#0A1F44] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#736D63]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTASection
        title={data?.ctaTitle || 'Book Your Portrait Session'}
        subtitle={data?.ctaSubtitle || "Let's create beautiful portraits that celebrate you."}
        primaryCTA={{ label: 'Check Availability', href: '/contact' }}
      />
    </>
  );
}

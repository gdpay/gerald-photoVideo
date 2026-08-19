import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { PortfolioFeature } from '@/components/sections/portfolio-feature';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { engagementsPageQuery, galleryByServiceTypeQuery } from '../../../sanity/lib/queries';
import { Camera, Sparkles, Heart, Sun, MapPin, Users } from 'lucide-react';

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getEngagementsData(): Promise<any> {
  try {
    return await client.fetch(engagementsPageQuery);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function preparePortfolioFeatureImages(feature: any, gallery: any) {
  const images = feature?.images?.length ? feature.images : gallery?.images;
  if (!images || images.length === 0) return fallbackGalleryImages;

  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery?.title || `Engagement portfolio image ${i + 1}`,
  })).slice(0, 3);
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Engagement Photography',
    description:
      'Romantic engagement photography in Nebraska and Iowa. Capture the excitement of your new chapter with stunning couple portraits.',
    path: '/engagements',
    keywords: [
      'engagement photographer Omaha',
      'couple portrait photographer Nebraska',
      'engagement photo ideas Iowa',
      'romantic couple photography',
    ],
  });
}

const fallbackGalleryImages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
    alt: 'Romantic couple portrait in golden hour light',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1529507843649-c4f5e56ea9b0?w=900&q=80',
    alt: 'Engagement session at a scenic botanical garden',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200&q=80',
    alt: 'Couple sharing a candid moment during their engagement session',
  },
];

const fallbackHighlights = [
  { label: 'Couples Photography', description: 'Romantic portraits that capture your unique connection and chemistry' },
  { label: 'Save-the-Date Sessions', description: 'Create stunning images for your save-the-dates and wedding decor' },
  { label: 'Styling Guidance', description: 'We help you choose outfits and locations that reflect your story' },
  { label: 'Love Storytelling', description: 'Every session is tailored to celebrate your journey together' },
  { label: 'Golden Hour Sessions', description: 'Beautiful outdoor sessions timed for the most flattering natural light' },
  { label: 'Scenic Locations', description: 'From urban backdrops to stunning natural landscapes across Nebraska & Iowa' },
];

const highlightIcons = [Camera, Users, Sparkles, Heart, Sun, MapPin];

const fallbackSteps = [
  { title: 'Planning Your Session', description: "We'll discuss your vision, choose the perfect location, and plan outfits that reflect your style." },
  { title: 'Your Session', description: 'A relaxed, fun photoshoot capturing your connection — from candid laughter to romantic portraits.' },
  { title: 'Your Gallery', description: 'Beautifully edited images delivered in a private online gallery — perfect for save-the-dates and sharing.' },
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

const fallbackLocations = [
  { name: 'Old Market', area: 'Omaha, NE', description: 'Urban charm with historic brick streets and vibrant murals' },
  { name: 'Lauritzen Gardens', area: 'Omaha, NE', description: 'Lush botanical gardens with stunning seasonal blooms' },
  { name: 'Loess Hills', area: 'Western Iowa', description: 'Dramatic rolling landscapes with golden prairie light' },
  { name: 'University of Nebraska', area: 'Lincoln, NE', description: 'Iconic campus architecture and green spaces' },
];

export default async function EngagementsPage() {
  const [data, engagementGallery] = await Promise.all([
    getEngagementsData(),
    client.fetch(galleryByServiceTypeQuery('engagements')).catch(() => null),
  ]);

  const locations = data?.locations?.length ? data.locations : fallbackLocations;
  const highlights: HighlightItem[] = data?.highlights?.length ? data.highlights : fallbackHighlights;
  const steps: StepItem[] = data?.steps?.length ? data.steps : fallbackSteps;
  const portfolioFeatureImages = preparePortfolioFeatureImages(data?.portfolioFeature, engagementGallery);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Engagements', url: '/engagements' },
      ]} />
      <PageHero
        title={data?.heroHeading || 'Engagement Portraits'}
        subtitle={data?.heroSubheading || "Your love story deserves a beautiful beginning. Let's create portraits that capture the excitement of this chapter."}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            {data?.introText || "Engagement sessions are about celebrating your love and getting comfortable in front of the camera before your wedding day. Whether you want urban edge, natural beauty, or something entirely unique, we'll find the perfect setting. These portraits become your save-the-dates, wedding decor, and treasured keepsakes for years to come."}
          </p>
        </Container>
      </SectionWrapper>

      <PortfolioFeature
        images={portfolioFeatureImages}
        buttonLabel={data?.portfolioFeature?.buttonLabel}
        buttonHref={data?.portfolioFeature?.buttonLink}
      />

      <SectionWrapper>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] text-center mb-12">
            {data?.highlightsHeading || 'Engagement Sessions'}
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

      <SectionWrapper champagne>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] text-center mb-4">
            {data?.locationsHeading || 'Popular Locations'}
          </h2>
          <p className="text-[#736D63] text-center mb-12 max-w-lg mx-auto">
            {data?.locationsSubheading || 'We know the most photogenic spots across Nebraska and Iowa. Here are a few favorites.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc: { name: string; area?: string; location?: string; description: string }) => (
              <div
                key={loc.name}
                className="p-6 bg-[#FAF7F2] border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors"
              >
                <MapPin className="h-5 w-5 text-[#C8A23D] mb-3" />
                <h3 className="font-heading text-xl text-[#0A1F44] mb-1">{loc.name}</h3>
                <p className="text-sm text-[#A39D93] mb-2">{loc.area || loc.location}</p>
                <p className="text-sm text-[#736D63]">{loc.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            {data?.stepsHeading || 'The Engagement Experience'}
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

      <SectionWrapper>
        <Container narrow className="text-center">
          <Heart className="h-8 w-8 text-[#C8A23D]/50 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            {data?.bundleHeading || 'Book Your Engagement + Wedding Together'}
          </h2>
          <p className="text-[#736D63] mb-8 max-w-lg mx-auto">
            {data?.bundleText || "Save when you bundle your engagement session with your wedding coverage. It's the perfect way to start your journey with us."}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[#C8A23D] hover:text-[#A8842E] transition-colors font-body text-sm uppercase tracking-wider"
          >
            Check Availability →
          </a>
        </Container>
      </SectionWrapper>

      <CTASection
        title={data?.ctaTitle || 'Capture This Season of Love'}
        subtitle={data?.ctaSubtitle || "Let's plan an engagement session that reflects your unique story."}
        primaryCTA={{ label: 'Book Your Session', href: '/contact' }}
      />
    </>
  );
}

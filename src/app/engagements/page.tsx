import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { engagementsPageQuery } from '../../../sanity/lib/queries';
import { Heart, MapPin } from 'lucide-react';

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getEngagementsData(): Promise<any> {
  try {
    return await client.fetch(engagementsPageQuery);
  } catch {
    return null;
  }
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

const fallbackLocations = [
  { name: 'Old Market', area: 'Omaha, NE', description: 'Urban charm with historic brick streets and vibrant murals' },
  { name: 'Lauritzen Gardens', area: 'Omaha, NE', description: 'Lush botanical gardens with stunning seasonal blooms' },
  { name: 'Loess Hills', area: 'Western Iowa', description: 'Dramatic rolling landscapes with golden prairie light' },
  { name: 'University of Nebraska', area: 'Lincoln, NE', description: 'Iconic campus architecture and green spaces' },
];

export default async function EngagementsPage() {
  const data = await getEngagementsData();

  const locations = data?.locations?.length ? data.locations : fallbackLocations;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Engagements', url: '/engagements' },
      ]} />
      <PageHero
        title={data?.heroHeading || 'Engagement Portraits'}
        subtitle={data?.heroSubheading || "Your love story deserves a beautiful beginning. Let's create portraits that capture the excitement of this chapter."}
        imageUrl="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-[#736D63] leading-relaxed">
            {data?.introText || "Engagement sessions are about celebrating your love and getting comfortable in front of the camera before your wedding day. Whether you want urban edge, natural beauty, or something entirely unique, we'll find the perfect setting. These portraits become your save-the-dates, wedding decor, and treasured keepsakes for years to come."}
          </p>
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
        title="Capture This Season of Love"
        subtitle="Let's plan an engagement session that reflects your unique story."
        primaryCTA={{ label: 'Book Your Session', href: '/contact' }}
      />
    </>
  );
}

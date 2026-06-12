import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { Heart, MapPin, Sun, Camera } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
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

const locations = [
  { name: 'Old Market', location: 'Omaha, NE', desc: 'Urban charm with historic brick streets and vibrant murals' },
  { name: 'Lauritzen Gardens', location: 'Omaha, NE', desc: 'Lush botanical gardens with stunning seasonal blooms' },
  { name: 'Loess Hills', location: 'Western Iowa', desc: 'Dramatic rolling landscapes with golden prairie light' },
  { name: 'University of Nebraska', location: 'Lincoln, NE', desc: 'Iconic campus architecture and green spaces' },
];

export default function EngagementsPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Engagements', url: '/engagements' },
      ]} />
      <PageHero
        title="Engagement Portraits"
        subtitle="Your love story deserves a beautiful beginning. Let's create portraits that capture the excitement of this chapter."
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-cream/70 leading-relaxed">
            Engagement sessions are about celebrating your love and getting comfortable in front of the
            camera before your wedding day. Whether you want urban edge, natural beauty, or something
            entirely unique, we'll find the perfect setting. These portraits become your save-the-dates,
            wedding decor, and treasured keepsakes for years to come.
          </p>
        </Container>
      </SectionWrapper>

      {/* Location Ideas */}
      <SectionWrapper className="bg-black/20">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-cream text-center mb-4">
                Popular Locations
              </h2>
          <p className="text-cream/50 text-center mb-12 max-w-lg mx-auto">
            We know the most photogenic spots across Nebraska and Iowa. Here are a few favorites.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="p-6 border border-cream/5 rounded-sm hover:border-gold/20 transition-colors"
              >
                <MapPin className="h-5 w-5 text-gold mb-3" />
                <h3 className="font-heading text-xl text-cream mb-1">{loc.name}</h3>
                <p className="text-sm text-cream/40 mb-2">{loc.location}</p>
                <p className="text-sm text-cream/50">{loc.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Engagement + Wedding Upsell */}
      <SectionWrapper>
        <Container narrow className="text-center">
          <Heart className="h-8 w-8 text-gold/50 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Book Your Engagement + Wedding Together
          </h2>
          <p className="text-cream/60 mb-8 max-w-lg mx-auto">
            Save when you bundle your engagement session with your wedding coverage.
            It's the perfect way to start your journey with us.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-accent text-sm uppercase tracking-wider"
          >
            Inquire About Bundles →
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

import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema, VideoSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { videographyPageQuery } from '../../../sanity/lib/queries';
import { Film, Camera, Drone, Music, Heart, Clock } from 'lucide-react';

export const revalidate = 60;

const iconMap: Record<string, React.ElementType> = {
  Film,
  Camera,
  Drone,
  Music,
  Heart,
  Clock,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getVideographyData(): Promise<any> {
  try {
    return await client.fetch(videographyPageQuery);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Cinematic Videography',
    description:
      'Professional wedding videography and cinematic films in Nebraska and Iowa. Highlight reels, full ceremony edits, and drone footage.',
    path: '/videography',
    keywords: [
      'wedding videographer Omaha',
      'cinematic wedding films Nebraska',
      'wedding videographer Iowa',
      'professional wedding video',
    ],
  });
}

const fallbackFeatures = [
  { icon: 'Film', label: 'Highlight Film', description: 'Cinematic 3–5 minute highlight reel set to music' },
  { icon: 'Camera', label: 'Full Ceremony Edit', description: 'Complete ceremony and reception coverage' },
  { icon: 'Drone', label: 'Aerial Footage', description: 'Stunning drone perspectives of your venue' },
  { icon: 'Music', label: 'Custom Soundtrack', description: 'Music selection that matches your style' },
  { icon: 'Heart', label: 'Same-Day Edit', description: 'Short highlight reel ready for your reception' },
  { icon: 'Clock', label: 'Multi-Hour Coverage', description: 'From preparations through the final dance' },
];

export default async function VideographyPage() {
  const data = await getVideographyData();

  const features = data?.features?.length ? data.features : fallbackFeatures;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Videography', url: '/videography' },
      ]} />
      <VideoSchema video={{
        name: 'Gerald Photo Video Wedding Showreel',
        description: 'Cinematic wedding film showcase featuring beautiful weddings across Nebraska and Iowa.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
        contentUrl: 'https://player.vimeo.com/video/example',
        duration: 'PT3M45S',
        uploadDate: '2025-01-01',
      }} />
      <PageHero
        title={data?.heroHeading || 'Cinematic Videography'}
        subtitle={data?.heroSubheading || 'Wedding films that let you relive every laugh, every tear, and every dance.'}
      />

      <SectionWrapper>
        <Container narrow>
          <p className="text-lg text-cream/70 leading-relaxed">
            {data?.introText || "A photograph captures a moment. A film captures time itself. Our cinematic wedding films are crafted to transport you back to your wedding day — the sound of your heartbeat during the first look, the laughter during toasts, the energy of the dance floor. We combine documentary storytelling with cinematic artistry to create films you'll watch again and again."}
          </p>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="bg-black/20">
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-cream text-center mb-12">
            {data?.featuresHeading || 'Our Film Offerings'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item: { icon?: string; label: string; description: string }) => {
              const Icon = iconMap[item.icon || 'Film'] || Film;
              return (
                <div
                  key={item.label}
                  className="p-6 border border-cream/5 rounded-sm hover:border-gold/20 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl text-cream mb-2">{item.label}</h3>
                  <p className="text-sm text-cream/50">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            {data?.comboHeading || 'Photo + Video Combo'}
          </h2>
          <p className="text-cream/60 mb-8 max-w-lg mx-auto">
            {data?.comboText || 'Book both photography and videography together for a seamless experience and preferred pricing. One team, two perspectives, one unforgettable collection.'}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-accent text-sm uppercase tracking-wider"
          >
            Inquire About Combos →
          </a>
        </Container>
      </SectionWrapper>

      <CTASection
        title="Book Your Wedding Film"
        subtitle="Let's create a cinematic keepsake you'll treasure for generations."
        primaryCTA={{ label: 'Inquire About Videography', href: '/contact' }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { aboutPageQuery } from '../../../sanity/lib/queries';
import { Camera, Heart, Star, Users, Award, Sparkles } from 'lucide-react';

export const revalidate = 60;

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Camera,
  Star,
  Users,
  Award,
  Sparkles,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getAboutData(): Promise<any> {
  try {
    return await client.fetch(aboutPageQuery);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'About Us',
    description:
      'Learn the story behind Gerald Photo Video. Passionate wedding and quinceañera photographers serving Nebraska and Iowa since 2015.',
    path: '/about',
    keywords: [
      'about Gerald Photo Video',
      'wedding photographer Omaha Nebraska',
      'professional photography team',
    ],
  });
}

const fallbackParagraphs = [
  "Gerald Photo Video was born from a simple belief: every moment matters. What started as a passion for capturing life's beauty has grown into a full-service photography and videography studio serving couples and families across Nebraska and Iowa.",
  "We believe that the best photographs are the ones that make you feel something. A stolen glance during a first look. The tears of joy during a parent dance. The infectious laughter of a quinceañera court. These are the moments that tell your story — and we're honored to capture them.",
  "Our approach is warm, professional, and unobtrusive. We blend into the background to capture authentic moments while providing gentle guidance when needed. We're not just your photographers — we become part of your celebration.",
];

const fallbackValues = [
  { icon: 'Heart', title: 'Passion', description: 'We pour our hearts into every project. Your celebration becomes our mission.' },
  { icon: 'Camera', title: 'Artistry', description: 'Every image is crafted with intention — from composition to color to emotion.' },
  { icon: 'Heart', title: 'Connection', description: 'We build genuine relationships with our clients, creating comfort and trust.' },
];

export default async function AboutPage() {
  const data = await getAboutData();

  const paragraphs = data?.storyParagraphs?.length ? data.storyParagraphs : fallbackParagraphs;
  const values = data?.values?.length ? data.values : fallbackValues;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ]} />
      <PageHero
        title={data?.heroHeading || 'Our Story'}
        subtitle={data?.heroSubheading || "We're not just photographers — we're storytellers, memory-keepers, and your biggest fans."}
        imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <div className="space-y-6 text-lg text-[#736D63] leading-relaxed">
            {paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper champagne>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value: { icon?: string; title: string; description: string }) => {
              const Icon = iconMap[value.icon || 'Heart'] || Heart;
              return (
                <div key={value.title} className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-[#C8A23D]/10 border border-[#C8A23D]/20">
                    <Icon className="h-6 w-6 text-[#C8A23D]" />
                  </div>
                  <h3 className="font-heading text-xl text-[#0A1F44] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#736D63]">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
            {data?.communityHeading || 'Proudly Serving Nebraska & Iowa'}
          </h2>
          <p className="text-[#736D63] max-w-lg mx-auto">
            {data?.communityText || "We're deeply connected to our community. From Omaha to Des Moines, Lincoln to Council Bluffs, we're honored to document the love stories of the Midwest."}
          </p>
        </Container>
      </SectionWrapper>

      <CTASection
        title={data?.ctaHeading || "We'd Love to Hear Your Story"}
        subtitle={data?.ctaSubheading || 'Get to know us better over a cup of coffee (or a video call).'}
        primaryCTA={{ label: 'Read Our Story', href: '/contact' }}
      />
    </>
  );
}

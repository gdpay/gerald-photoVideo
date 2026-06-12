import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { Camera, Heart } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
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

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ]} />
      <PageHero
        title="Our Story"
        subtitle="We're not just photographers — we're storytellers, memory-keepers, and your biggest fans."
      />

      {/* The Story */}
      <SectionWrapper>
        <Container narrow>
          <div className="space-y-6 text-lg text-cream/70 leading-relaxed">
            <p>
              Gerald Photo Video was born from a simple belief: every moment matters. What started 
              as a passion for capturing life's beauty has grown into a full-service photography and 
              videography studio serving couples and families across Nebraska and Iowa.
            </p>
            <p>
              We believe that the best photographs are the ones that make you feel something. A 
              stolen glance during a first look. The tears of joy during a parent dance. The 
              infectious laughter of a quinceañera court. These are the moments that tell your 
              story — and we're honored to capture them.
            </p>
            <p>
              Our approach is warm, professional, and unobtrusive. We blend into the background 
              to capture authentic moments while providing gentle guidance when needed. We're not 
              just your photographers — we become part of your celebration.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper className="bg-black/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Passion',
                desc: 'We pour our hearts into every project. Your celebration becomes our mission.',
              },
              {
                icon: Camera,
                title: 'Artistry',
                desc: 'Every image is crafted with intention — from composition to color to emotion.',
              },
              {
                icon: Heart,
                title: 'Connection',
                desc: 'We build genuine relationships with our clients, creating comfort and trust.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/20">
                  <value.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-heading text-xl text-cream mb-2">{value.title}</h3>
                <p className="text-sm text-cream/50">{value.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Community */}
      <SectionWrapper>
        <Container narrow className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Proudly Serving Nebraska & Iowa
          </h2>
          <p className="text-cream/60 max-w-lg mx-auto">
            We're deeply connected to our community. From Omaha to Des Moines, Lincoln to Council 
            Bluffs, we're honored to document the love stories of the Midwest.
          </p>
        </Container>
      </SectionWrapper>

      <CTASection
        title="We'd Love to Hear Your Story"
        subtitle="Get to know us better over a cup of coffee (or a video call)."
        primaryCTA={{ label: 'Meet the Team', href: '/contact' }}
      />
    </>
  );
}

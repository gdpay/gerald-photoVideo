import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/seo-metadata';
import { Check, Heart } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
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

const collections = [
  {
    name: 'Essentials',
    subtitle: 'For the intimate celebration',
    features: [
      '6 hours of coverage',
      'Single photographer',
      '400+ edited images',
      'Online gallery with print store',
      'Print release',
    ],
    popular: false,
  },
  {
    name: 'Signature',
    subtitle: 'Our most popular collection',
    features: [
      '10 hours of coverage',
      'Lead photographer + second shooter',
      '800+ edited images',
      'Online gallery with print store',
      'Print release',
      'Engagement session included',
      'Premium album credit',
    ],
    popular: true,
  },
  {
    name: 'Luxury',
    subtitle: 'The complete experience',
    features: [
      'Full day coverage (up to 12 hours)',
      'Lead photographer + second shooter',
      'All edited images (1,200+)',
      'Online gallery with print store',
      'Print release',
      'Engagement session included',
      'Premium heirloom album',
      'Cinematic highlight film',
      'Complimentary wall art',
    ],
    popular: false,
  },
];

const addOns = [
  'Additional hour of coverage',
  'Second shooter',
  'Engagement session',
  'Cinematic highlight film',
  'Drone footage',
  'Premium wedding album',
  'Same-day edit reel',
  'Raw footage archive',
];

export default function InvestmentPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Investment', url: '/investment' },
      ]} />
      <PageHero
        title="Investment"
        subtitle="Every collection is as unique as your story. We create custom experiences tailored to your vision."
      />

      {/* Philosophy */}
      <SectionWrapper>
        <Container narrow className="text-center">
          <p className="text-lg text-cream/70 leading-relaxed mb-4">
            Our investment reflects our commitment to quality, not quantity. We believe in creating 
            meaningful, lasting work that you'll treasure for generations. Every collection is 
            thoughtfully crafted to provide an exceptional experience from start to finish.
          </p>
          <p className="text-cream/50 text-sm">
            All collections are customizable. Contact us for a personalized quote.
          </p>
        </Container>
      </SectionWrapper>

      {/* Collections */}
      <SectionWrapper className="bg-black/20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.name}
                className={`relative p-8 rounded-sm border transition-all duration-300 ${
                  collection.popular
                    ? 'border-gold bg-gold/5 shadow-glow'
                    : 'border-cream/10 bg-warm-black/50 hover:border-gold/30'
                }`}
              >
                {collection.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-warm-black text-xs font-accent uppercase tracking-wider rounded-sm">
                    Most Popular
                  </div>
                )}

                <h3 className="font-heading text-2xl text-cream mb-1">{collection.name}</h3>
                <p className="text-sm text-cream/50 mb-6">{collection.subtitle}</p>

                <div className="text-center mb-8">
                  <span className="font-accent text-xs uppercase tracking-wider text-cream/40">
                    Starting At
                  </span>
                  <p className="font-heading text-4xl text-gold mt-1">Upon Request</p>
                  <p className="text-xs text-cream/40 mt-1">Custom quote for your event</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {collection.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-cream/60">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
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

      {/* Add-Ons */}
      <SectionWrapper>
        <Container>
          <h2 className="font-heading text-3xl md:text-4xl text-cream text-center mb-12">
            A La Carte Add-Ons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {addOns.map((addon) => (
              <div
                key={addon}
                className="p-4 border border-cream/5 rounded-sm text-center hover:border-gold/20 transition-colors"
              >
                <p className="text-sm text-cream/70">{addon}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Payment Plans */}
      <SectionWrapper className="bg-black/20">
        <Container narrow className="text-center">
          <Heart className="h-8 w-8 text-gold/50 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-cream mb-4">
            Flexible Payment Plans
          </h2>
          <p className="text-cream/60 mb-8 max-w-lg mx-auto">
            We believe exceptional photography should be accessible. We offer flexible payment plans 
            to make your investment manageable. A 30% deposit secures your date, with the balance 
            due before your event.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-accent text-sm uppercase tracking-wider"
          >
            View FAQs About Payments →
          </a>
        </Container>
      </SectionWrapper>

      <CTASection
        title="Let's Create Your Custom Collection"
        subtitle="Tell us about your vision and we'll design the perfect collection for you."
        primaryCTA={{ label: 'Get Your Custom Quote', href: '/contact' }}
        secondaryCTA={{ label: '(402) 541-4498', href: 'tel:+14025414498' }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { TrustBar } from '@/components/sections/trust-bar';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { SITE } from '@/lib/constants';
import { client } from '../../../sanity/lib/client';
import { cityPageQuery, featuredTestimonialsQuery, trustStatsQuery } from '../../../sanity/lib/queries';
import { MapPin, Camera } from 'lucide-react';
import { getIcon } from '@/lib/icons';

interface LocalSEOPageProps {
  city: string;
  state: string;
  slug: string;
  services: string[];
}

export function generateLocalSEOMetadata({ city, state, slug, services }: LocalSEOPageProps): Metadata {
  const serviceList = services.join(', ');
  return generateMetadata({
    title: `${city} ${services[0]} | ${SITE.name}`,
    description: `Premier ${serviceList.toLowerCase()} serving ${city}, ${state} and surrounding areas. Professional photography and videography tailored to your celebration.`,
    path: `/${slug}-wedding-photographer`,
    keywords: [
      `${city.toLowerCase()} ${services[0].toLowerCase()}`,
      `${city.toLowerCase()} ${services[1]?.toLowerCase() || services[0].toLowerCase()}`,
      `${state.toLowerCase()} ${services[0].toLowerCase()}`,
      `${city.toLowerCase()} photographer`,
    ],
  });
}

export async function LocalSEOPage({ city, state, slug }: LocalSEOPageProps) {
  const [data, trustStats, testimonials] = await Promise.all([
    client.fetch(cityPageQuery(slug)).catch(() => null),
    client.fetch(trustStatsQuery).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const services: string[] = data?.servicesList?.length
    ? data.servicesList
    : [
        `Wedding Photography & Videography in ${city}`,
        `Quinceañera Photography & Video in ${city}`,
        `Engagement & Couple Portraits in ${city}`,
        `Cinematic Wedding Films in ${city}`,
      ];
  const IntroIcon = getIcon(data?.introIcon, MapPin);
  const ServicesIcon = getIcon(data?.servicesIcon, Camera);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: `${city} Wedding Photographer`, url: `/${slug}-wedding-photographer` },
      ]} />
      <PageHero
        tagline={data?.heroTagline}
        title={data?.heroHeading || `${city} Wedding Photographer`}
        subtitle={data?.heroSubheading || `Serving ${city}, ${state} and the surrounding areas with premium photography and videography services.`}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <div className="flex items-start gap-4 mb-8">
            <IntroIcon className="h-6 w-6 text-[#C8A23D] shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-2xl text-[#0A1F44] mb-2">
                {data?.introHeading || `Proudly Serving ${city}, ${state}`}
              </h2>
              <p className="text-[#736D63] leading-relaxed">
                {data?.introText || `${city} holds a special place in our hearts. We've had the privilege of documenting countless beautiful weddings, quinceañeras, and engagement sessions in this wonderful community. From ${city}'s most beautiful venues to its hidden gems, we know exactly where to create stunning images for your celebration.`}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ServicesIcon className="h-6 w-6 text-[#C8A23D] shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-2xl text-[#0A1F44] mb-2">
                {data?.servicesHeading || `Our ${city} Photography Services`}
              </h2>
              <ul className="space-y-2 text-[#736D63]">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C8A23D]/50 rounded-full" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <TrustBar stats={trustStats?.length ? trustStats : undefined} />
      <TestimonialCarousel
        testimonials={testimonials}
        eyebrow={data?.testimonialsEyebrow}
        heading={data?.testimonialsHeading}
        buttonLabel={data?.testimonialsButtonLabel}
        buttonLink={data?.testimonialsButtonLink}
      />

      <CTASection
        imageSource={data?.ctaImage}
        title={data?.ctaTitle || `Book Your ${city} Session`}
        subtitle={data?.ctaSubtitle || `Let's create something beautiful together in ${city}, ${state}.`}
        primaryCTA={{ label: data?.ctaButtonLabel || 'Check Availability', href: data?.ctaButtonLink || '/contact' }}
      />
    </>
  );
}

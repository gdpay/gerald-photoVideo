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
import { getPageHeroData } from '@/lib/page-hero-data';
import { MapPin, Camera } from 'lucide-react';

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
  const hero = await getPageHeroData(`${slug}-wedding-photographer`);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: `${city} Wedding Photographer`, url: `/${slug}-wedding-photographer` },
      ]} />
      <PageHero
        tagline={hero?.tagline}
        title={hero?.heading || `${city} Wedding Photographer`}
        subtitle={hero?.subheading || `Serving ${city}, ${state} and the surrounding areas with premium photography and videography services.`}
        imageSource={hero?.backgroundImage}
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      <SectionWrapper>
        <Container narrow>
          <div className="flex items-start gap-4 mb-8">
            <MapPin className="h-6 w-6 text-[#C8A23D] shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-2xl text-[#0A1F44] mb-2">
                Proudly Serving {city}, {state}
              </h2>
              <p className="text-[#736D63] leading-relaxed">
                {city} holds a special place in our hearts. We&apos;ve had the privilege of documenting countless 
                beautiful weddings, quinceañeras, and engagement sessions in this wonderful community. 
                From {city}&apos;s most beautiful venues to its hidden gems, we know exactly where to 
                create stunning images for your celebration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Camera className="h-6 w-6 text-[#C8A23D] shrink-0 mt-1" />
            <div>
              <h2 className="font-heading text-2xl text-[#0A1F44] mb-2">
                Our {city} Photography Services
              </h2>
              <ul className="space-y-2 text-[#736D63]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A23D]/50 rounded-full" />
                  Wedding Photography & Videography in {city}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A23D]/50 rounded-full" />
                  Quinceañera Photography & Video in {city}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A23D]/50 rounded-full" />
                  Engagement & Couple Portraits in {city}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8A23D]/50 rounded-full" />
                  Cinematic Wedding Films in {city}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <TrustBar />
      <TestimonialCarousel />

      <CTASection
        title={`Book Your ${city} Session`}
        subtitle={`Let's create something beautiful together in ${city}, ${state}.`}
        primaryCTA={{ label: 'Check Availability', href: '/contact' }}
      />
    </>
  );
}

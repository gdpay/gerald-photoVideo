import Image from 'next/image';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesGrid } from '@/components/sections/services-grid';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { VideoEmbed } from '@/components/shared/video-embed';
import { SanityImage } from '@/components/shared/sanity-image';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { client, hasSanityImageAsset } from '../../sanity/lib/client';
import {
  featuredServicesQuery,
  featuredTestimonialsQuery,
  galleriesQuery,
  heroSlidesQuery,
  homeHeroQuery,
  homePageQuery,
  settingsQuery,
} from '../../sanity/lib/queries';
import {
  Album,
  Camera,
  Clock,
  HeartHandshake,
  Images,
  MapPin,
  Play,
  Sparkles,
  Users,
} from 'lucide-react';

export const revalidate = 60;

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Sparkles,
  HeartHandshake,
  Users,
  Images,
  Album,
  Clock,
  MapPin,
};

const fallbackExperienceFeatures = [
  { icon: 'Camera', label: 'Photography & Videography Under One Team' },
  { icon: 'Sparkles', label: 'Thoughtful & Timeless Edits' },
  { icon: 'HeartHandshake', label: 'Natural Poses & Guidance' },
  { icon: 'Users', label: 'Trusted by 500+ Families' },
  { icon: 'Images', label: 'Cinematic & True to Life' },
  { icon: 'Album', label: 'Luxury Albums & Keepsakes' },
  { icon: 'Clock', label: 'Fast & Clear Communication' },
  { icon: 'MapPin', label: 'Nebraska & Iowa Expertise' },
];

export default async function HomePage() {
    const [services, galleries, testimonials, heroSlides, homeHero, homeData, settings] = await Promise.all([
    client.fetch(featuredServicesQuery).catch(() => []),
    client.fetch(galleriesQuery).catch(() => []),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
    client.fetch(heroSlidesQuery).catch(() => []),
    client.fetch(homeHeroQuery).catch(() => null),
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null),
  ]);
  const sanityHeroSlides = heroSlides.length > 0
    ? heroSlides
    : homeHero?.sections?.backgroundImage
      ? [
          {
            _id: 'home-hero-background',
            image: homeHero.sections.backgroundImage,
            category: 'WEDDINGS',
            alt: 'Gerald Photo Video hero background',
          },
        ]
      : [];
  const heroTitle = homeHero?.sections?.heading || "for Life's Most Beautiful Moments";
  const heroSubtitle =
    homeHero?.sections?.subheading ||
    'Luxury wedding, quinceanera & engagement photography and videography for couples and families in Nebraska & Iowa.';
  const heroTagline = homeHero?.sections?.tagline || settings?.tagline;
  const heroPrimaryCtaText = homeHero?.sections?.ctaText || 'Check Availability';
  const heroPrimaryCtaLink = homeHero?.sections?.ctaLink || '/contact';
  const heroLocationLabel = homeHero?.sections?.locationLabel || 'Omaha, NE';

  const featuredFilm = homeData?.featuredFilm || {};
  const meetGerald = homeData?.meetGerald || {};
  const experience = homeData?.experience || {};
  const experienceFeatures = experience.features?.length ? experience.features : fallbackExperienceFeatures;

  return (
    <>
      <HeroSection
        slides={sanityHeroSlides}
        title={heroTitle}
        subtitle={heroSubtitle}
        tagline={heroTagline}
        primaryCtaText={heroPrimaryCtaText}
        primaryCtaLink={heroPrimaryCtaLink}
        locationLabel={heroLocationLabel}
      />
      <TrustBar stats={homeData?.trustStats?.length ? homeData.trustStats : undefined} />

      <ServicesGrid
        services={services}
        galleries={galleries}
        eyebrow={homeData?.servicesEyebrow}
        heading={homeData?.servicesHeading}
        linkLabel={homeData?.servicesLinkLabel}
      />

      {featuredFilm?.videoUrl && (
        <SectionWrapper navy>
          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.33fr_0.67fr] lg:gap-16">
              <div className="max-w-sm">
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                  {featuredFilm.eyebrow || 'Featured Wedding Film'}
                </span>
                <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-[#FAF7F2] md:text-5xl">
                  {featuredFilm.heading || 'A Day to Remember Forever'}
                </h2>
                <div className="mt-5 h-px w-14 bg-[#C8A23D]" />
                <p className="mt-6 max-w-xs font-heading text-lg leading-relaxed text-[#FAF7F2]/78">
                  {featuredFilm.text || 'Cinematic storytelling that lets you relive every emotion, every time.'}
                </p>
                <Button
                  variant="outline-light"
                  size="md"
                  href={featuredFilm.buttonLink || '/videography'}
                  className="mt-8 border-[#C8A23D] text-[#C8A23D] hover:bg-[#C8A23D] hover:text-[#06112A]"
                >
                  {featuredFilm.buttonLabel || 'Watch Film'} <Play className="h-3.5 w-3.5 fill-current" />
                </Button>
              </div>
              <VideoEmbed
                src={featuredFilm.videoUrl}
                title={featuredFilm.videoTitle || 'Featured Film'}
                posterAsset={featuredFilm.videoPoster}
              />
            </div>
          </Container>
        </SectionWrapper>
      )}

      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                {meetGerald.eyebrow || 'Meet Gerald'}
              </span>
              <h2 className="mt-4 max-w-md font-heading text-4xl font-light leading-tight text-[#0A1F44] md:text-5xl">
                {meetGerald.heading || 'More Than Photos. We Preserve Legacy.'}
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-[0.9fr_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E0D8]">
                  {hasSanityImageAsset(meetGerald.image) ? (
                    <SanityImage
                      source={meetGerald.image}
                      alt={meetGerald.name || 'Gerald portrait'}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=90"
                      alt={meetGerald.name || 'Gerald portrait'}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-lg leading-relaxed text-[#524C43]">
                    {meetGerald.text1 ||
                      'My passion is capturing the emotion, connection, and love that make your story unique. I approach each wedding and quinceañera with heart, intention, and care.'}
                  </p>
                  <p className="mt-5 font-heading text-lg leading-relaxed text-[#524C43]">
                    {meetGerald.text2 || "When you look back, you'll feel the moment all over again."}
                  </p>
                  <div className="mt-6 font-heading text-4xl italic text-[#0A1F44]">
                    {meetGerald.name || 'Gerald'}
                  </div>
                  <Button variant="primary" size="md" href={meetGerald.buttonLink || '/about'} className="mt-6 w-fit">
                    {meetGerald.buttonLabel || 'Read Our Story'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#D4CEC4] pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                {experience.eyebrow || 'Why Couples Choose Us'}
              </span>
              <h2 className="mt-4 max-w-md font-heading text-4xl font-light leading-tight text-[#0A1F44] md:text-5xl">
                {experience.heading || 'The Gerald Photo Video Experience'}
              </h2>
              <div className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {experienceFeatures.map((feature: { icon?: string; label: string }) => {
                  const Icon = iconMap[feature.icon || ''] || Camera;
                  return (
                    <div key={feature.label} className="flex items-start gap-4">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#C8A23D]" strokeWidth={1.5} />
                      <span className="font-heading text-lg leading-snug text-[#3D382F]">
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="secondary"
                size="lg"
                href={experience.buttonLink || '/about'}
                className="mt-10 border-[#C8A23D] bg-[#C8A23D] text-[#FAF7F2] hover:bg-[#A8842E] hover:text-[#FAF7F2]"
              >
                {experience.buttonLabel || 'Learn More About Our Process'}
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <TestimonialCarousel
        testimonials={testimonials}
        eyebrow={homeData?.testimonialsEyebrow}
        heading={homeData?.testimonialsHeading}
        buttonLabel={homeData?.testimonialsButtonLabel}
        buttonLink={homeData?.testimonialsButtonLink}
      />
    </>
  );
}
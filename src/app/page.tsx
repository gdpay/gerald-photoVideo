import Image from 'next/image';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustBar } from '@/components/sections/trust-bar';
import { ServicesGrid } from '@/components/sections/services-grid';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { client } from '../../sanity/lib/client';
import { featuredServicesQuery, featuredTestimonialsQuery, galleriesQuery, heroSlidesQuery, homeHeroQuery } from '../../sanity/lib/queries';
import {
  Album,
  Camera,
  Clock,
  HeartHandshake,
  Images,
  MapPin,
  Maximize,
  Play,
  Sparkles,
  Users,
  Volume2,
} from 'lucide-react';

const experienceFeatures = [
  { icon: Camera, label: 'Photography & Videography Under One Team' },
  { icon: Sparkles, label: 'Thoughtful & Timeless Edits' },
  { icon: HeartHandshake, label: 'Natural Poses & Guidance' },
  { icon: Users, label: 'Trusted by 500+ Families' },
  { icon: Images, label: 'Cinematic & True to Life' },
  { icon: Album, label: 'Luxury Albums & Keepsakes' },
  { icon: Clock, label: 'Fast & Clear Communication' },
  { icon: MapPin, label: 'Nebraska & Iowa Expertise' },
];

function FeaturedFilmFrame() {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#06112A] shadow-2xl">
      <Image
        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=90"
        alt="Wedding sparkler exit film preview"
        fill
        sizes="(max-width: 1024px) 100vw, 760px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06112A]/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-5 py-4 text-[#FAF7F2]">
        <Play className="h-5 w-5 fill-current" aria-hidden="true" />
        <span className="font-body text-xs text-[#FAF7F2]/85">02:17</span>
        <div className="h-1 flex-1 bg-[#FAF7F2]/35">
          <div className="h-full w-[38%] bg-[#FAF7F2]" />
        </div>
        <Volume2 className="h-4 w-4" aria-hidden="true" />
        <Maximize className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [services, galleries, testimonials, heroSlides, homeHero] = await Promise.all([
    client.fetch(featuredServicesQuery),
    client.fetch(galleriesQuery),
    client.fetch(featuredTestimonialsQuery),
    client.fetch(heroSlidesQuery).catch(() => []),
    client.fetch(homeHeroQuery).catch(() => null),
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

  return (
    <>
      <HeroSection
        slides={sanityHeroSlides}
        title="for Life's Most Beautiful Moments"
        subtitle="Luxury wedding, quinceañera & engagement photography and videography for couples and families in Nebraska & Iowa."
      />
      <TrustBar />

      <ServicesGrid services={services} galleries={galleries} />

      <SectionWrapper navy className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.33fr_0.67fr] lg:gap-16">
            <div className="max-w-sm">
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                Featured Wedding Film
              </span>
              <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-[#FAF7F2] md:text-5xl">
                A Day to Remember Forever
              </h2>
              <div className="mt-5 h-px w-14 bg-[#C8A23D]" />
              <p className="mt-6 max-w-xs font-heading text-lg leading-relaxed text-[#FAF7F2]/78">
                Cinematic storytelling that lets you relive every emotion, every time.
              </p>
              <Button
                variant="outline-light"
                size="md"
                href="/videography"
                className="mt-8 border-[#C8A23D] text-[#C8A23D] hover:bg-[#C8A23D] hover:text-[#06112A]"
              >
                Watch Film <Play className="h-3.5 w-3.5 fill-current" />
              </Button>
            </div>
            <FeaturedFilmFrame />
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                Meet Gerald
              </span>
              <h2 className="mt-4 max-w-md font-heading text-4xl font-light leading-tight text-[#0A1F44] md:text-5xl">
                More Than Photos. We Preserve Legacy.
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-[0.9fr_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E0D8]">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=90"
                    alt="Gerald portrait"
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-lg leading-relaxed text-[#524C43]">
                    My passion is capturing the emotion, connection, and love that make your story unique. I approach each wedding and quinceañera with heart, intention, and care.
                  </p>
                  <p className="mt-5 font-heading text-lg leading-relaxed text-[#524C43]">
                    When you look back, you&apos;ll feel the moment all over again.
                  </p>
                  <div className="mt-6 font-heading text-4xl italic text-[#0A1F44]">Gerald</div>
                  <Button variant="primary" size="md" href="/about" className="mt-6 w-fit">
                    Read Our Story
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#D4CEC4] pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
                Why Couples Choose Us
              </span>
              <h2 className="mt-4 max-w-md font-heading text-4xl font-light leading-tight text-[#0A1F44] md:text-5xl">
                The Gerald Photo Video Experience
              </h2>
              <div className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {experienceFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-4">
                    <feature.icon className="mt-0.5 h-6 w-6 shrink-0 text-[#C8A23D]" strokeWidth={1.5} />
                    <span className="font-heading text-lg leading-snug text-[#3D382F]">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                size="lg"
                href="/about"
                className="mt-10 border-[#C8A23D] bg-[#C8A23D] text-[#FAF7F2] hover:bg-[#A8842E] hover:text-[#FAF7F2]"
              >
                Learn More About Our Process
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <TestimonialCarousel testimonials={testimonials} />
      <CTASection />
    </>
  );
}

import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { PageHero } from '@/components/sections/page-hero';
import { VideoEmbed } from '@/components/shared/video-embed';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { getIcon } from '@/lib/icons';
import { client } from '../../../sanity/lib/client';
import { galleryByServiceTypeQuery, featuredTestimonialsQuery, quinceanerasPageQuery } from '../../../sanity/lib/queries';
import { Crown, Users, Sparkles, Heart, Star, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export const metadata: Metadata = generateMetadata({
  title: "Quinceañera Photography & Videography",
  description:
    "Professional quinceañera photography and videography in Nebraska and Iowa. Celebrating your daughter's journey with stunning portraits and cinematic films.",
  path: '/quinceaneras',
  keywords: [
    "quinceañera photographer Omaha",
    "quinceañera videography Nebraska",
    "quince photographer Iowa",
    "fifteenth birthday photographer",
  ],
});

const traditionIcons = [Crown, Heart, Star, Music, Users, Sparkles];

const fallbackTraditions = [
  { label: "The Court", description: "The quinceañera court — her closest friends and family joining in the celebration" },
  { label: "The Ceremony", description: "The religious ceremony blessing her journey into womanhood" },
  { label: "The Dress & Crown", description: "The stunning gown, tiara, and all the carefully chosen details" },
  { label: "The Waltz", description: "The traditional waltz — a choreographed dance that marks her debut" },
  { label: "Family Portraits", description: "Generational portraits capturing the love and pride of family" },
  { label: "The Reception", description: "The celebration, the cake, the laughter, and the memories" },
];

const fallbackSteps = [
  {
    title: "Consultation",
    description: "We meet with you and your family to understand your vision, discuss traditions, and plan every detail. We speak Spanish and understand the cultural significance of this milestone.",
  },
  {
    title: "Pre-Event Portrait Session",
    description: "A dedicated portrait session before the event, capturing stunning individual and family portraits in full regalia — the dress, the crown, the court.",
  },
  {
    title: "The Celebration",
    description: "From the ceremony to the waltz, from the formal portraits to the candid laughter — we document every beautiful moment with artistry and care.",
  },
  {
    title: "Your Gallery & Film",
    description: "A beautifully curated online gallery plus a cinematic highlight film that captures the magic of her special day.",
  },
];

interface HighlightItem {
  icon?: string;
  label: string;
  description?: string;
}

interface StepItem {
  title: string;
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareGalleryImages(images: any[] | undefined, fallbackAlt?: string) {
  if (!images?.length) return [];
  // Curate: use fewer images (max 3), only the strongest ones
  const spans = ["large", "tall", "wide"];
  return images.slice(0, 3).map((img: any, i: number) => ({
    source: img,
    alt: img.alt || fallbackAlt,
    span: spans[i % spans.length] as "large" | "tall" | "wide" | undefined,
  }));
}

export default async function QuinceanerasPage() {
  const [gallery, data, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery("quinceaneras")),
    client.fetch(quinceanerasPageQuery).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const galleryImages = prepareGalleryImages(
    data?.galleryImages?.length ? data.galleryImages : gallery?.images,
    gallery?.title
  );
  const steps: StepItem[] = data?.steps?.length ? data.steps : fallbackSteps;
  const traditions: HighlightItem[] = data?.highlights?.length ? data.highlights : fallbackTraditions;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Quinceañeras", url: "/quinceaneras" },
      ]} />

      {/* Hero Section */}
      <PageHero
        tagline={data?.heroTagline}
        title={data?.heroHeading || "Celebrating Her Story With Elegance, Family, and Cinematic Beauty"}
        subtitle={data?.heroSubheading || "From the dress and crown to the ceremony, waltz, family emotions, and reception celebration, we preserve her once-in-a-lifetime milestone with artistry and care."}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=90"
      />
      {/* Intro Section */}
      <SectionWrapper>
        <Container narrow>
          <div className="text-center">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.introEyebrow || "Honoring Tradition"}
            </span>
            <p className="mt-6 text-lg md:text-xl text-stone-500 leading-relaxed font-light">
              {data?.introText || "A quinceañera is a once-in-a-lifetime celebration — a beautiful blend of tradition, family, and joy. We understand the cultural significance and work closely with families to ensure every moment is captured with respect and artistry. From the religious ceremony to the waltz, from the formal portraits to the candid laughter, we are honored to document this milestone."}
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Quinceañera Gallery */}
      {galleryImages.length > 0 && (
        <GalleryPreview
          images={galleryImages}
          layout="row"
          buttonLabel={data?.galleryButtonLabel}
          buttonHref={data?.galleryButtonLink}
        />
      )}

      {/* The Quinceañera Experience */}
      <SectionWrapper champagne>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.stepsEyebrow || "The Journey"}
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              {data?.stepsHeading || "The Quinceañera Experience"}
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              {data?.stepsSubheading || "From consultation to your finished gallery and film, every step is designed to honor her special day."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="font-heading text-4xl md:text-5xl text-gold/20 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-navy mb-2">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Traditions We Capture */}
      <SectionWrapper>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.highlightsEyebrow || "Every Tradition Matters"}
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              {data?.highlightsHeading || "Traditions We Capture"}
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              {data?.highlightsSubheading || "From the crown to the waltz, from the court to the cake — we honor every tradition with intention."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traditions.map((item, index) => {
              const Icon = getIcon(item.icon, traditionIcons[index % traditionIcons.length]);
              return (
                <div
                  key={item.label}
                  className="p-6 bg-ivory border border-stone-200 hover:border-gold/30 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-xl text-navy mb-2">{item.label}</h3>
                  <p className="text-sm text-stone-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Quinceañera Film */}
      <SectionWrapper navy>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
                {data?.filmEyebrow || "Cinematic Films"}
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory">
                {data?.filmHeading || "Her Story in Motion"}
              </h2>
              <p className="mt-6 text-ivory/60 leading-relaxed max-w-md">
                {data?.filmText || "A cinematic highlight film captures the emotions of the day in a way photographs alone cannot. The waltz, the smiles, the tears of joy — all set to music that moves the soul."}
              </p>
              <div className="mt-8 flex justify-center">
                <Button variant="outline-light" size="lg" href={data?.filmButtonLink || "/videography"}>
                  {data?.filmButtonLabel || "Learn About Videography"}
                </Button>
              </div>
            </div>
            <VideoEmbed
              src={data?.filmVideoUrl || 'https://player.vimeo.com/video/284882984'}
              title={data?.filmVideoTitle || 'Watch Featured Quinceañera Film'}
              posterAsset={data?.filmVideoPoster}
              posterUrl="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
            />
          </div>
        </Container>
      </SectionWrapper>

      {/* Stories From Our Clients */}
      <TestimonialCarousel
        testimonials={testimonials}
        eyebrow={data?.testimonialsEyebrow}
        heading={data?.testimonialsHeading}
        buttonLabel={data?.testimonialsButtonLabel}
        buttonLink={data?.testimonialsButtonLink}
      />

      {/* Check Availability CTA */}
      <CTASection
        imageSource={data?.ctaImage}
        title={data?.ctaTitle || "Plan Her Dream Celebration"}
        subtitle={data?.ctaSubtitle || "Let's discuss how we can capture every beautiful moment of her special day. We would love to be part of this milestone."}
        primaryCTA={{ label: data?.ctaButtonLabel || 'Check Availability', href: data?.ctaButtonLink || '/contact' }}
      />
    </>
  );
}

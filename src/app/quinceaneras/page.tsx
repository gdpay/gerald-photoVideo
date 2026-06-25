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
import { client } from '../../../sanity/lib/client';
import { galleryByServiceTypeQuery, pageBySlugQuery, featuredTestimonialsQuery } from '../../../sanity/lib/queries';
import { Crown, Camera, Video, Users, Sparkles, Heart, Star, Music } from 'lucide-react';
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

const traditions = [
  { icon: Crown, label: "The Court", desc: "The quinceañera court — her closest friends and family joining in the celebration" },
  { icon: Heart, label: "The Ceremony", desc: "The religious ceremony blessing her journey into womanhood" },
  { icon: Star, label: "The Dress & Crown", desc: "The stunning gown, tiara, and all the carefully chosen details" },
  { icon: Music, label: "The Waltz", desc: "The traditional waltz — a choreographed dance that marks her debut" },
  { icon: Users, label: "Family Portraits", desc: "Generational portraits capturing the love and pride of family" },
  { icon: Sparkles, label: "The Reception", desc: "The celebration, the cake, the laughter, and the memories" },
];

const experienceSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We meet with you and your family to understand your vision, discuss traditions, and plan every detail. We speak Spanish and understand the cultural significance of this milestone.",
  },
  {
    number: "02",
    title: "Pre-Event Portrait Session",
    description: "A dedicated portrait session before the event, capturing stunning individual and family portraits in full regalia — the dress, the crown, the court.",
  },
  {
    number: "03",
    title: "The Celebration",
    description: "From the ceremony to the waltz, from the formal portraits to the candid laughter — we document every beautiful moment with artistry and care.",
  },
  {
    number: "04",
    title: "Your Gallery & Film",
    description: "A beautifully curated online gallery plus a cinematic highlight film that captures the magic of her special day.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareGalleryImages(gallery: any) {
  if (!gallery?.images) return [];
  // Curate: use fewer images (max 3), only the strongest ones
  const images = gallery.images.slice(0, 3);
  const spans = ["large", "tall", "wide"];
  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery.title,
    span: spans[i % spans.length] as "large" | "tall" | "wide" | undefined,
  }));
}

export default async function QuinceanerasPage() {
  const [gallery, pageData, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery("quinceaneras")),
    client.fetch(pageBySlugQuery("quinceaneras")).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const galleryImages = prepareGalleryImages(gallery);

  // Find hero section from page data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroSection = pageData?.sections?.find((s: any) => s._type === "hero");

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Quinceañeras", url: "/quinceaneras" },
      ]} />

      {/* Hero Section */}
      <PageHero
        tagline={heroSection?.tagline || "QuinceaÃ±eras"}
        title={heroSection?.heading || "Celebrating Her Story With Elegance, Family, and Cinematic Beauty"}
        subtitle={heroSection?.subheading || "From the dress and crown to the ceremony, waltz, family emotions, and reception celebration, we preserve her once-in-a-lifetime milestone with artistry and care."}
        imageSource={heroSection?.backgroundImage}
        imageUrl="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=90"
      />
      {/* Intro Section */}
      <SectionWrapper>
        <Container narrow>
          <div className="text-center">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              Honoring Tradition
            </span>
            <p className="mt-6 text-lg md:text-xl text-stone-500 leading-relaxed font-light">
              A quinceañera is a once-in-a-lifetime celebration — a beautiful blend of tradition, family, and joy. We understand the cultural significance and work closely with families to ensure every moment is captured with respect and artistry. From the religious ceremony to the waltz, from the formal portraits to the candid laughter, we are honored to document this milestone.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Quinceañera Gallery */}
      {galleryImages.length > 0 && (
        <GalleryPreview
          images={galleryImages}
          layout="row"
        />
      )}

      {/* The Quinceañera Experience */}
      <SectionWrapper champagne>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              The Journey
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              The Quinceañera Experience
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              From consultation to your finished gallery and film, every step is designed to honor her special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {experienceSteps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="font-heading text-4xl md:text-5xl text-gold/20 select-none">
                    {step.number}
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
              Every Tradition Matters
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              Traditions We Capture
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              From the crown to the waltz, from the court to the cake — we honor every tradition with intention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traditions.map((item) => (
              <div
                key={item.label}
                className="p-6 bg-ivory border border-stone-200 hover:border-gold/30 transition-colors group"
              >
                <item.icon className="h-6 w-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl text-navy mb-2">{item.label}</h3>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Quinceañera Film */}
      <SectionWrapper navy>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
                Cinematic Films
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory">
                Her Story in Motion
              </h2>
              <p className="mt-6 text-ivory/60 leading-relaxed max-w-md">
                A cinematic highlight film captures the emotions of the day in a way photographs alone cannot. The waltz, the smiles, the tears of joy — all set to music that moves the soul.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Button variant="primary" size="lg" href="/videography">
                  Watch Quinceañera Films
                </Button>
                <Button variant="outline-light" size="lg" href="/videography">
                  Learn About Videography
                </Button>
              </div>
            </div>
            <VideoEmbed
              src="https://player.vimeo.com/video/284882984"
              title="Watch Featured Quinceañera Film"
              posterUrl="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
            />
          </div>
        </Container>
      </SectionWrapper>

      {/* Stories From Our Clients */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Check Availability CTA */}
      <CTASection
        title="Plan Her Dream Celebration"
        subtitle="Let&apos;s discuss how we can capture every beautiful moment of her special day. We would love to be part of this milestone."
        primaryCTA={{ label: 'Check Availability', href: '/contact' }}
      />
    </>
  );
}

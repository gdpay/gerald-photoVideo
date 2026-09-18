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
import { galleryByServiceTypeQuery, featuredTestimonialsQuery, weddingsPageQuery } from '../../../sanity/lib/queries';
import { Camera, Video, Users, Clock, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

export const metadata: Metadata = generateMetadata({
  title: 'Wedding Photography & Videography',
  description:
    'Cinematic wedding photography and videography for couples in Nebraska and Iowa. Capturing your love story with artistry and heart.',
  path: '/weddings',
  keywords: [
    'wedding photographer Omaha',
    'Nebraska wedding photographer',
    'Iowa wedding photographer',
    'luxury wedding photography',
    'cinematic wedding videography',
  ],
});

const highlightIcons = [Camera, Video, Users, Clock, Heart, MapPin];

const fallbackHighlights = [
  { label: 'Photography', description: 'High-resolution digital images edited in our signature editorial style' },
  { label: 'Videography', description: 'Cinematic highlight film and full ceremony edit available' },
  { label: 'Second Shooter', description: 'Additional photographer for multi-angle coverage of your day' },
  { label: 'Full Day Coverage', description: 'From getting ready to the last dance — every moment preserved' },
  { label: 'Engagement Session', description: 'Complimentary engagement shoot with select collections' },
  { label: 'Destination Ready', description: 'Serving Nebraska, Iowa, and destination weddings beyond' },
];

const fallbackSteps = [
  {
    title: 'Consultation',
    description: 'We begin with a conversation. Over coffee or video call, we learn about your vision, your story, and what matters most to you. This is where we start designing your perfect collection.',
  },
  {
    title: 'Engagement Session',
    description: 'A relaxed, natural photoshoot that helps us get to know each other before the big day. You will get comfortable in front of the camera, and we will capture beautiful portraits you can use for save-the-dates.',
  },
  {
    title: 'Your Wedding Day',
    description: 'We blend into the background to capture authentic moments as they unfold — from quiet getting-ready details to the energy of the dance floor. Documentary meets editorial.',
  },
  {
    title: 'Your Gallery',
    description: 'Beautifully edited images delivered in a private online gallery. Every photo is hand-selected and color-graded in our signature cinematic style. Ready to share, print, and treasure.',
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
function prepareGalleryImages(gallery: any) {
  if (!gallery?.images) return [];
  // Curate: use fewer images (max 3), only the strongest ones
  const images = gallery.images.slice(0, 3);
  const spans = ['large', 'tall', 'wide'];
  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery.title,
    span: spans[i % spans.length] as 'large' | 'tall' | 'wide' | undefined,
  }));
}

export default async function WeddingsPage() {
  const [gallery, data, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery('weddings')),
    client.fetch(weddingsPageQuery).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const galleryImages = prepareGalleryImages(gallery);
  const steps: StepItem[] = data?.steps?.length ? data.steps : fallbackSteps;
  const highlights: HighlightItem[] = data?.highlights?.length ? data.highlights : fallbackHighlights;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Weddings', url: '/weddings' },
      ]} />

      {/* Hero Section — Custom luxury hero */}
      <PageHero
        tagline={data?.heroTagline}
        title={data?.heroHeading || 'Cinematic Wedding Photography & Films for Once-in-a-Lifetime Love Stories'}
        subtitle={data?.heroSubheading || 'From quiet first looks to emotional vows and unforgettable celebrations, we preserve every detail with elegance, intention, and cinematic storytelling.'}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90"
      />
      {/* Intro Section */}
      <SectionWrapper>
        <Container narrow>
          <div className="text-center">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.introEyebrow || 'Our Philosophy'}
            </span>
            <p className="mt-6 text-lg md:text-xl text-stone-500 leading-relaxed font-light">
              {data?.introText || 'Your wedding day is one of the most important days of your life. Our approach is documentary meets editorial — we capture authentic, unrehearsed moments with a cinematic, fine-art aesthetic. From the quiet anticipation of getting ready to the joyful chaos of the dance floor, we are there for all of it.'}
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Wedding Gallery */}
      {galleryImages.length > 0 && (
        <GalleryPreview
          images={galleryImages}
          layout="row"
          buttonLabel={data?.galleryButtonLabel}
          buttonHref={data?.galleryButtonLink}
        />
      )}

      {/* The Wedding Experience */}
      <SectionWrapper champagne>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.stepsEyebrow || 'The Journey'}
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              {data?.stepsHeading || 'The Wedding Experience'}
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              {data?.stepsSubheading || 'From our first conversation to your final gallery delivery, every step is designed with intention.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="font-heading text-4xl md:text-5xl text-gold/20 select-none">
                    {String(index + 1).padStart(2, '0')}
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

      {/* What's Included */}
      <SectionWrapper>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              {data?.highlightsEyebrow || 'Collections'}
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              {data?.highlightsHeading || "What's Included"}
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              {data?.highlightsSubheading || 'Every collection is thoughtfully designed and fully customizable to your unique celebration.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = getIcon(item.icon, highlightIcons[index % highlightIcons.length]);
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

          <div className="mt-10 text-center">
            <Button variant="secondary" size="lg" href={data?.highlightsButtonLink || '/investment'}>
              {data?.highlightsButtonLabel || 'View Investment Details'} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Wedding Film */}
      <SectionWrapper navy>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
                {data?.filmEyebrow || 'Cinematic Films'}
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory">
                {data?.filmHeading || 'Your Love Story in Motion'}
              </h2>
              <p className="mt-6 text-ivory/60 leading-relaxed max-w-md">
                {data?.filmText || 'A photograph captures a moment. A film captures time itself. Our cinematic wedding films are crafted to transport you back — the sound of your heartbeat during the first look, the laughter during toasts, the energy of the dance floor.'}
              </p>
              <div className="mt-8 flex justify-center">
                <Button variant="outline-light" size="lg" href={data?.filmButtonLink || '/videography'}>
                  {data?.filmButtonLabel || 'Learn About Videography'}
                </Button>
              </div>
            </div>
            <VideoEmbed
              src={data?.filmVideoUrl || 'https://player.vimeo.com/video/284882984'}
              title={data?.filmVideoTitle || 'Watch Featured Wedding Film'}
              posterAsset={data?.filmVideoPoster}
              posterUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
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
        title={data?.ctaTitle || "Let's Capture Your Love Story"}
        subtitle={data?.ctaSubtitle || 'Reach out to check availability and learn more about our wedding collections. We would love to hear from you.'}
        primaryCTA={{ label: data?.ctaButtonLabel || 'Check Availability', href: data?.ctaButtonLink || '/contact' }}
        secondaryCTA={{ label: data?.ctaSecondaryButtonLabel || 'View Investment', href: data?.ctaSecondaryButtonLink || '/investment' }}
      />
    </>
  );
}

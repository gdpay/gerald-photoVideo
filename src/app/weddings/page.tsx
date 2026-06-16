import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { GalleryPreview } from '@/components/sections/gallery-preview';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { VideoEmbed } from '@/components/shared/video-embed';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { galleryByServiceTypeQuery, pageBySlugQuery, featuredTestimonialsQuery } from '../../../sanity/lib/queries';
import { Camera, Video, Users, Clock, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

const highlights = [
  { icon: Camera, label: 'Photography', desc: 'High-resolution digital images edited in our signature editorial style' },
  { icon: Video, label: 'Videography', desc: 'Cinematic highlight film and full ceremony edit available' },
  { icon: Users, label: 'Second Shooter', desc: 'Additional photographer for multi-angle coverage of your day' },
  { icon: Clock, label: 'Full Day Coverage', desc: 'From getting ready to the last dance — every moment preserved' },
  { icon: Heart, label: 'Engagement Session', desc: 'Complimentary engagement shoot with select collections' },
  { icon: MapPin, label: 'Destination Ready', desc: 'Serving Nebraska, Iowa, and destination weddings beyond' },
];

const experienceSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with a conversation. Over coffee or video call, we learn about your vision, your story, and what matters most to you. This is where we start designing your perfect collection.',
  },
  {
    number: '02',
    title: 'Engagement Session',
    description: 'A relaxed, natural photoshoot that helps us get to know each other before the big day. You will get comfortable in front of the camera, and we will capture beautiful portraits you can use for save-the-dates.',
  },
  {
    number: '03',
    title: 'Your Wedding Day',
    description: 'We blend into the background to capture authentic moments as they unfold — from quiet getting-ready details to the energy of the dance floor. Documentary meets editorial.',
  },
  {
    number: '04',
    title: 'Your Gallery',
    description: 'Beautifully edited images delivered in a private online gallery. Every photo is hand-selected and color-graded in our signature cinematic style. Ready to share, print, and treasure.',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareGalleryImages(gallery: any) {
  if (!gallery?.images) return [];
  // Curate: use fewer images (max 5), only the strongest ones
  const images = gallery.images.slice(0, 5);
  const spans = ['large', 'tall', 'wide', undefined, undefined];
  return images.map((img: any, i: number) => ({
    source: img,
    alt: img.alt || gallery.title,
    span: spans[i % spans.length] as 'large' | 'tall' | 'wide' | undefined,
  }));
}

export default async function WeddingsPage() {
  const [gallery, pageData, testimonials] = await Promise.all([
    client.fetch(galleryByServiceTypeQuery('weddings')),
    client.fetch(pageBySlugQuery('weddings')).catch(() => null),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);
  const galleryImages = prepareGalleryImages(gallery);

  // Find hero section from page data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroSection = pageData?.sections?.find((s: any) => s._type === 'hero');

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Weddings', url: '/weddings' },
      ]} />

      {/* Hero Section — Custom luxury hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroSection?.backgroundImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90'}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/30 text-gold text-[11px] font-body uppercase tracking-[0.2em] mb-8">
              Weddings
            </div>

            <div className="h-[1px] w-16 bg-gold mb-8" />

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory font-light leading-[1.05] tracking-tight">
              Cinematic Wedding Photography &amp; Films for Once-in-a-Lifetime Love Stories
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-ivory/60 font-body font-light max-w-2xl leading-relaxed">
              From quiet first looks to emotional vows and unforgettable celebrations, we preserve every detail with elegance, intention, and cinematic storytelling.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Check Availability
              </Button>
              <Button variant="outline-light" size="lg" href="/portfolio">
                View Wedding Gallery
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <SectionWrapper>
        <Container narrow>
          <div className="text-center">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              Our Philosophy
            </span>
            <p className="mt-6 text-lg md:text-xl text-stone-500 leading-relaxed font-light">
              Your wedding day is one of the most important days of your life. Our approach is documentary meets editorial — we capture authentic, unrehearsed moments with a cinematic, fine-art aesthetic. From the quiet anticipation of getting ready to the joyful chaos of the dance floor, we are there for all of it.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Featured Wedding Gallery */}
      {galleryImages.length > 0 && (
        <GalleryPreview
          images={galleryImages}
          title="Featured Weddings"
          subtitle="Recent Work"
        />
      )}

      {/* The Wedding Experience */}
      <SectionWrapper champagne>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              The Journey
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              The Wedding Experience
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              From our first conversation to your final gallery delivery, every step is designed with intention.
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

      {/* What's Included */}
      <SectionWrapper>
        <Container>
          <div className="text-center mb-16">
            <span className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-gold">
              Collections
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-navy">
              What&apos;s Included
            </h2>
            <p className="mt-4 text-stone-500 max-w-lg mx-auto">
              Every collection is thoughtfully designed and fully customizable to your unique celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
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

          <div className="mt-10 text-center">
            <Button variant="secondary" size="lg" href="/investment">
              View Investment Details <ArrowRight className="h-4 w-4" />
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
                Cinematic Films
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-ivory">
                Your Love Story in Motion
              </h2>
              <p className="mt-6 text-ivory/60 leading-relaxed max-w-md">
                A photograph captures a moment. A film captures time itself. Our cinematic wedding films are crafted to transport you back — the sound of your heartbeat during the first look, the laughter during toasts, the energy of the dance floor.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Button variant="primary" size="lg" href="/videography">
                  Watch Wedding Films
                </Button>
                <Button variant="outline-light" size="lg" href="/videography">
                  Learn About Videography
                </Button>
              </div>
            </div>
            <VideoEmbed
              src="https://player.vimeo.com/video/947865089"
              title="Watch Featured Wedding Film"
              posterUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
            />
          </div>
        </Container>
      </SectionWrapper>

      {/* Stories From Our Clients */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Check Availability CTA */}
      <CTASection
        title="Let&apos;s Capture Your Love Story"
        subtitle="Reach out to check availability and learn more about our wedding collections. We would love to hear from you."
        primaryCTA={{ label: 'Check Availability', href: '/contact' }}
        secondaryCTA={{ label: 'View Investment', href: '/investment' }}
      />
    </>
  );
}

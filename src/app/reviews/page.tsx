import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as generatePageMetadata } from '@/lib/seo-metadata';
import { SITE } from '@/lib/constants';
import { client } from '../../../sanity/lib/client';
import { allTestimonialsQuery, reviewsPageQuery } from '../../../sanity/lib/queries';
import { Star, Quote } from 'lucide-react';

export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getTestimonials(): Promise<any[]> {
  try {
    return await client.fetch(allTestimonialsQuery);
  } catch {
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getReviewsPageData(): Promise<any> {
  try {
    return await client.fetch(reviewsPageQuery);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Reviews',
    description:
      'Read what couples and families say about Gerald Photo Video. 4.5★ average rating from 46+ reviews across Facebook and The Knot.',
    path: '/reviews',
    keywords: [
      'Gerald Photo Video reviews',
      'Omaha wedding photographer reviews',
      'best wedding photographer Nebraska',
    ],
  });
}

const fallbackReviews = [
  { quote: "Absolutely incredible! Gerald captured our wedding day perfectly. Every photo tells a story and brings back all the emotions. We couldn't be happier!", author: 'Emily & James', serviceType: 'wedding', location: 'Omaha, NE', rating: 5 },
  { quote: "The quinceañera video brought our whole family to tears. They captured the beauty and emotion of the day so perfectly. Thank you!", author: 'Luis & Maria', serviceType: 'quinceanera', location: 'Lincoln, NE', rating: 5 },
  { quote: "Our engagement photos are stunning! We felt so comfortable and natural the whole time. Highly recommend!", author: 'Ashley R.', serviceType: 'engagement', location: 'Omaha, NE', rating: 5 },
  { quote: "Professional, creative, and genuinely caring. They went above and beyond to make sure everything was perfect.", author: 'Sarah K.', serviceType: 'wedding', location: 'Council Bluffs, IA', rating: 5 },
  { quote: "The highlight film was more beautiful than we ever imagined. They captured moments we didn't even see!", author: 'Michael & Jessica', serviceType: 'wedding', location: 'Des Moines, IA', rating: 5 },
  { quote: "As a mother, seeing my daughter's quinceañera through their lens was magical. They captured every detail and emotion.", author: 'Carmen G.', serviceType: 'quinceanera', location: 'Omaha, NE', rating: 5 },
  { quote: "Worth every penny. The quality, the service, the final products — all exceptional.", author: 'David T.', serviceType: 'wedding', location: 'Lincoln, NE', rating: 5 },
  { quote: "They made our engagement session fun and relaxed. The photos are absolutely gorgeous!", author: 'Lauren & Chris', serviceType: 'engagement', location: 'Omaha, NE', rating: 5 },
  { quote: "From the first call to the final delivery, everything was seamless. The photos are works of art.", author: 'Amanda P.', serviceType: 'wedding', location: 'Sioux City, IA', rating: 5 },
  { quote: "Our quinceañera photos are stunning! They captured the joy and beauty of the celebration perfectly.", author: 'Rosa M.', serviceType: 'quinceanera', location: 'Omaha, NE', rating: 5 },
];

const serviceLabels: Record<string, string> = {
  wedding: 'Wedding',
  quinceanera: 'Quinceañera',
  engagement: 'Engagement',
  portrait: 'Portrait',
  videography: 'Videography',
  other: 'Other',
};

export default async function ReviewsPage() {
  const [testimonials, reviewsData] = await Promise.all([
    getTestimonials(),
    getReviewsPageData(),
  ]);
  const reviewsList = testimonials.length > 0 ? testimonials : fallbackReviews;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Reviews', url: '/reviews' },
      ]} />
      <PageHero
        title={reviewsData?.heroHeading || 'Kind Words'}
        subtitle={reviewsData?.heroSubheading || "We're honored to be part of your celebrations. Here's what our clients say."}
        imageSource={reviewsData?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
      />

      <SectionWrapper className="-mt-8">
        <Container>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-6 w-6 ${i < Math.floor(SITE.reviews.aggregate.rating) ? 'fill-[#C8A23D] text-[#C8A23D]' : 'text-[#D4CEC4]'}`} />
              ))}
            </div>
            <div className="font-heading text-5xl text-[#0A1F44]">{SITE.reviews.aggregate.rating}</div>
            <div className="text-[#736D63] mt-1">Average Rating</div>
            <div className="text-sm text-[#A39D93] mt-1">Based on {SITE.reviews.aggregate.count}+ reviews</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsList.map((review: { quote: string; author: string; serviceType?: string; location?: string; rating?: number }, index: number) => (
              <div
                key={index}
                className="p-6 border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors"
              >
                <Quote className="h-6 w-6 text-[#C8A23D]/30 mb-3" />
                <p className="text-[#736D63] text-sm leading-relaxed mb-4">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#C8A23D] text-[#C8A23D]" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-medium text-[#0A1F44] text-sm">{review.author}</div>
                    <div className="text-xs text-[#A39D93]">
                      {serviceLabels[review.serviceType || ''] || review.serviceType || 'Other'}{review.location ? ` · ${review.location}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTASection
        title="Join Our Happy Clients"
        subtitle="Ready to become part of the Gerald Photo Video family?"
        primaryCTA={{ label: 'Book Your Session', href: '/contact' }}
      />
    </>
  );
}

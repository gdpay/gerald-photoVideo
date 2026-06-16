'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Star } from 'lucide-react';
import { SanityImage } from '@/components/shared/sanity-image';

interface TestimonialItem {
  _id: string;
  quote: string;
  author: string;
  serviceType?: string;
  location?: string;
  rating?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  featured?: boolean;
}

const fallbackTestimonials = [
  {
    quote: 'Gerald and his team felt like family. The photos and film are pure perfection, every detail, and emotion was captured.',
    author: 'Laura & Michael',
    rating: 5,
    location: 'Omaha, NE',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  },
  {
    quote: 'Gerald made me feel like a queen on my day. I cried when I saw the film because it is my childhood in movie form.',
    author: 'Isabella',
    rating: 5,
    location: 'Lincoln, NE',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
  },
  {
    quote: 'The love, the care, and the way every moment was captured is something we will treasure forever.',
    author: 'Jessica & David',
    rating: 5,
    location: 'Council Bluffs, IA',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
  },
];

interface TestimonialCarouselProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialCarousel({ testimonials: sanityTestimonials }: TestimonialCarouselProps) {
  const testimonials = sanityTestimonials && sanityTestimonials.length > 0
    ? sanityTestimonials.slice(0, 3).map((t, index) => ({
        quote: t.quote,
        author: t.author,
        rating: t.rating || 5,
        location: t.location || '',
        photo: t.photo,
        imageUrl: fallbackTestimonials[index]?.imageUrl,
      }))
    : fallbackTestimonials;

  return (
    <SectionWrapper className="bg-[#FFFDF9] py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C8A23D]">
              Kind Words
            </span>
            <h2 className="mt-3 font-heading text-4xl font-light leading-tight text-[#0A1F44] md:text-5xl">
              Stories From Our Clients
            </h2>
          </div>
          <Link
            href="/reviews"
            className="inline-flex h-11 w-fit items-center justify-center border border-[#C8A23D] px-7 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C8A23D] transition hover:bg-[#C8A23D] hover:text-[#06112A]"
          >
            Read More Reviews
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={`${testimonial.author}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid gap-5 sm:grid-cols-[120px_1fr] md:grid-cols-1 lg:grid-cols-[128px_1fr]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#E5E0D8]">
                {'photo' in testimonial && testimonial.photo ? (
                  <SanityImage
                    source={testimonial.photo}
                    alt={testimonial.author}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                ) : (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div>
                <blockquote className="font-heading text-lg italic leading-relaxed text-[#3D382F]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4 font-body text-[12px] font-semibold text-[#0A1F44]">
                  {testimonial.author}
                </div>
                {testimonial.location && (
                  <div className="mt-1 font-body text-[11px] text-[#736D63]">
                    {testimonial.location}
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1 text-[#C8A23D]" aria-label={`${testimonial.rating} star rating`}>
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

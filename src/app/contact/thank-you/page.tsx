import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/seo-metadata';
import { Heart } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Thank You',
  description: 'Thank you for reaching out to Gerald Photo Video. We\'ll be in touch within 24 hours.',
  path: '/contact/thank-you',
});

export default function ThankYouPage() {
  return (
    <>
      <SectionWrapper className="min-h-[80vh] flex items-center">
        <Container narrow className="text-center">
          <Heart className="h-12 w-12 text-gold/50 mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl text-cream mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-cream/60 mb-4 max-w-md mx-auto">
            We've received your inquiry and will get back to you within 24 hours.
            We can't wait to learn more about your vision!
          </p>
          <p className="text-cream/40 text-sm mb-8">
            In the meantime, feel free to browse our portfolio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/portfolio">
              View Portfolio
            </Button>
            <Button variant="ghost" size="lg" href="/">
              Back to Home
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

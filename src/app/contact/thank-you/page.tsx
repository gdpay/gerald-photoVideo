import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { generateMetadata } from '@/lib/seo-metadata';
import { ThankYouTracker } from '@/components/analytics/thank-you-tracker';
import { Heart } from 'lucide-react';
import { getIcon } from '@/lib/icons';
import { client } from '../../../../sanity/lib/client';
import { contactPageQuery } from '../../../../sanity/lib/queries';

export const metadata: Metadata = generateMetadata({
  title: 'Thank You',
  description: 'Thank you for reaching out to Gerald Photo Video. We\'ll be in touch within 24 hours.',
  path: '/contact/thank-you',
});

export default async function ThankYouPage() {
  const data = await client.fetch(contactPageQuery).catch(() => null);
  const Icon = getIcon(data?.thankYouIcon, Heart);

  return (
    <>
      <ThankYouTracker />
      <SectionWrapper className="min-h-[80vh] flex items-center">
        <Container narrow className="text-center">
          <Icon className="h-12 w-12 text-[#C8A23D]/50 mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl text-[#0A1F44] mb-4">
            {data?.thankYouHeading || 'Thank You!'}
          </h1>
          <p className="text-lg text-[#736D63] mb-4 max-w-md mx-auto">
            {data?.thankYouText || "We've received your inquiry and will get back to you within 24 hours. We can't wait to learn more about your vision!"}
          </p>
          <p className="text-[#A39D93] text-sm mb-8">
            {data?.thankYouNote || 'In the meantime, feel free to browse our portfolio.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href={data?.thankYouButtonLink || '/portfolio'}>
              {data?.thankYouButtonLabel || 'View Portfolio'}
            </Button>
            <Button variant="ghost" size="lg" href={data?.thankYouSecondButtonLink || '/'}>
              {data?.thankYouSecondButtonLabel || 'Back to Home'}
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

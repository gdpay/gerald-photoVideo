'use client';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <SectionWrapper className="min-h-[80vh] flex items-center">
      <Container narrow className="text-center">
        <div className="font-heading text-6xl md:text-7xl text-accent/30 mb-4">Oops!</div>
        <h1 className="font-heading text-3xl md:text-4xl text-cream mb-4">
          Something Went Wrong
        </h1>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" onClick={reset}>
            Try Again
          </Button>
          <Button variant="ghost" size="lg" href="/">
            Back to Home
          </Button>
        </div>
      </Container>
    </SectionWrapper>
  );
}

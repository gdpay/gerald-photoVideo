import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';

export default function NotFound() {
  return (
    <SectionWrapper className="min-h-[80vh] flex items-center">
      <Container narrow className="text-center">
        <div className="font-heading text-8xl md:text-9xl text-gold/20 mb-4">404</div>
        <h1 className="font-heading text-3xl md:text-4xl text-cream mb-4">
          Page Not Found
        </h1>
        <p className="text-cream/60 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="primary" size="lg" href="/">
            Back to Home
          </Button>
          <Button variant="secondary" size="lg" href="/contact">
            Contact Us
          </Button>
        </div>
        <div className="border-t border-cream/5 pt-8">
          <p className="text-sm text-cream/30 mb-4 font-accent uppercase tracking-wider">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {NAV_ITEMS.slice(1, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-cream/40 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

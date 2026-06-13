import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';

export default function NotFound() {
  return (
    <SectionWrapper className="min-h-[80vh] flex items-center">
      <Container narrow className="text-center">
        <div className="font-heading text-8xl md:text-9xl text-[#C8A23D]/20 mb-4">404</div>
        <h1 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
          Page Not Found
        </h1>
        <p className="text-[#736D63] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="primary" size="lg" href="/">
            Back to Home
          </Button>
          <Button variant="secondary" size="lg" href="/contact">
            Contact Us
          </Button>
        </div>
        <div className="border-t border-[#E5E0D8] pt-8">
          <p className="text-sm text-[#A39D93] mb-4 font-body uppercase tracking-wider">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {NAV_ITEMS.slice(1, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[#A39D93] hover:text-[#C8A23D] transition-colors"
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

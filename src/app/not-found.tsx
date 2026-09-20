import Link from 'next/link';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';
import { client } from '../../sanity/lib/client';
import { settingsQuery } from '../../sanity/lib/queries';

export default async function NotFound() {
  const settings = await client.fetch(settingsQuery).catch(() => null);
  const sanityLinks = (settings?.navItems || [])
    .filter((item: { label?: string; link?: string }) => item?.label && item?.link && item.link !== '/')
    .map((item: { label: string; link: string }) => ({ label: item.label, href: item.link }));
  const links = sanityLinks.length > 0
    ? sanityLinks
    : NAV_ITEMS.slice(1, 8).map((item) => ({ label: item.label, href: item.href }));

  return (
    <SectionWrapper className="min-h-[80vh] flex items-center">
      <Container narrow className="text-center">
        <div className="font-heading text-8xl md:text-9xl text-[#C8A23D]/20 mb-4">404</div>
        <h1 className="font-heading text-3xl md:text-4xl text-[#0A1F44] mb-4">
          {settings?.notFoundHeading || 'Page Not Found'}
        </h1>
        <p className="text-[#736D63] mb-8 max-w-md mx-auto">
          {settings?.notFoundText || "The page you're looking for doesn't exist or has been moved. Let's get you back on track."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button variant="primary" size="lg" href={settings?.notFoundButtonLink || '/'}>
            {settings?.notFoundButtonLabel || 'Back to Home'}
          </Button>
          <Button variant="secondary" size="lg" href={settings?.notFoundSecondButtonLink || '/contact'}>
            {settings?.notFoundSecondButtonLabel || 'Contact Us'}
          </Button>
        </div>
        <div className="border-t border-[#E5E0D8] pt-8">
          <p className="text-sm text-[#A39D93] mb-4 font-body uppercase tracking-wider">
            {settings?.notFoundLinksHeading || 'Popular Pages'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {links.slice(0, 7).map((item: { label: string; href: string }) => (
              <Link
                key={`${item.label}-${item.href}`}
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

import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { galleriesQuery, videographyPageQuery, portfolioPageQuery } from '../../../sanity/lib/queries';
import { PortfolioClient } from '@/components/sections/portfolio-client';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as genMeta } from '@/lib/seo-metadata';

export const revalidate = 60;

export const metadata: Metadata = genMeta({
  title: 'Portfolio',
  description: 'A curated collection of our favorite wedding, quinceañera, and engagement moments.',
  path: '/portfolio',
});

const CATEGORY_LABELS: Record<string, string> = {
  weddings: 'Weddings',
  quinceaneras: 'Quinceañeras',
  engagements: 'Engagements',
  portraits: 'Portraits',
  videography: 'Videography',
  featured: 'Featured',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function prepareImages(galleries: any[]) {
  const images: { source: any; alt: string; category: string }[] = [];
  for (const gallery of galleries) {
    const category = CATEGORY_LABELS[gallery.serviceType] || gallery.serviceType;
    for (const img of gallery.images || []) {
      images.push({
        source: img,
        alt: img.alt || gallery.title,
        category,
      });
    }
  }
  return images;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface PortfolioPageData {
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: any;
  videographyEyebrow?: string;
  ctaHeading?: string;
  ctaSubheading?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
}

export default async function PortfolioPage() {
  let galleryImages: { source: any; alt: string; category: string }[] = [];
  let portfolioData: PortfolioPageData | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let videographyVideos: any[] = [];

  try {
    const [galleries, videographyData, portfolioPageData] = await Promise.all([
      client.fetch(galleriesQuery),
      client.fetch(videographyPageQuery).catch(() => null),
      client.fetch(portfolioPageQuery).catch(() => null),
    ]);
    galleryImages = prepareImages(galleries);
    videographyVideos = videographyData?.videos?.length ? videographyData.videos : [];
    portfolioData = portfolioPageData;
  } catch {
    // Sanity unavailable
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Portfolio', url: '/portfolio' },
      ]} />
      <PortfolioClient
        galleryImages={galleryImages}
        hero={{
          heading: portfolioData?.heroHeading,
          subheading: portfolioData?.heroSubheading,
          backgroundImage: portfolioData?.heroImage,
        }}
        videographyVideos={videographyVideos}
        videographyEyebrow={portfolioData?.videographyEyebrow}
        cta={{
          heading: portfolioData?.ctaHeading,
          subheading: portfolioData?.ctaSubheading,
          buttonLabel: portfolioData?.ctaButtonLabel,
          buttonLink: portfolioData?.ctaButtonLink,
        }}
      />
    </>
  );
}

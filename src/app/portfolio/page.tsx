import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { galleriesQuery } from '../../../sanity/lib/queries';
import { PortfolioClient } from '@/components/sections/portfolio-client';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as genMeta } from '@/lib/seo-metadata';
import { getPageHeroData } from '@/lib/page-hero-data';

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

export default async function PortfolioPage() {
  let galleryImages: { source: any; alt: string; category: string }[] = [];
  const hero = await getPageHeroData('portfolio');

  try {
    const galleries = await client.fetch(galleriesQuery);
    galleryImages = prepareImages(galleries);
  } catch {
    // Sanity unavailable
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Portfolio', url: '/portfolio' },
      ]} />
      <PortfolioClient galleryImages={galleryImages} hero={hero} />
    </>
  );
}

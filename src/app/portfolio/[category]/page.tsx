import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { galleriesQuery, videographyPageQuery } from '../../../../sanity/lib/queries';
import { PortfolioClient } from '@/components/sections/portfolio-client';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata as genMeta } from '@/lib/seo-metadata';
import { getPageHeroData } from '@/lib/page-hero-data';

export const revalidate = 60;

const validCategories = ['weddings', 'quinceaneras', 'engagements', 'portraits', 'videography'];

const CATEGORY_LABELS: Record<string, string> = {
  weddings: 'Weddings',
  quinceaneras: 'Quinceañeras',
  engagements: 'Engagements',
  portraits: 'Portraits',
  videography: 'Videography',
  featured: 'Featured',
};

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = params.category;
  if (!validCategories.includes(category)) {
    return {};
  }
  const label = CATEGORY_LABELS[category] || category;
  return genMeta({
    title: `${label} Portfolio`,
    description: `Browse our ${label.toLowerCase()} photography and videography portfolio.`,
    path: `/portfolio/${category}`,
  });
}

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

export default async function PortfolioCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  let galleryImages: { source: any; alt: string; category: string }[] = [];
  const hero = await getPageHeroData('portfolio');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let videographyVideos: any[] = [];

  try {
    const [galleries, videographyData] = await Promise.all([
      client.fetch(galleriesQuery),
      client.fetch(videographyPageQuery).catch(() => null),
    ]);
    galleryImages = prepareImages(galleries);
    videographyVideos = videographyData?.videos?.length ? videographyData.videos : [];
  } catch {
    // Sanity unavailable
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Portfolio', url: '/portfolio' },
        { name: CATEGORY_LABELS[category] || category, url: `/portfolio/${category}` },
      ]} />
      <PortfolioClient
        galleryImages={galleryImages}
        hero={hero}
        videographyVideos={videographyVideos}
        initialCategory={CATEGORY_LABELS[category] || category}
      />
    </>
  );
}

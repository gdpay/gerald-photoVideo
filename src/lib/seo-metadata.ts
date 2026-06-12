import type { Metadata } from 'next';
import { SITE } from './constants';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  keywords,
}: SEOProps): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/images/og-default.jpg`;

  return {
    title: `${title} | ${SITE.name}`,
    description,
    keywords: keywords?.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
      locale: 'en_US',
      ...(publishedTime && type === 'article' ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

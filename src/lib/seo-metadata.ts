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

/**
 * The "SEO" section every page has in the Studio. Anything left blank here falls
 * back to the wording built into the page, so a half-filled section is still safe.
 */
export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: { asset?: { url?: string } };
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
  // The root layout adds " | <site name>" through its title template, so the page
  // title stays bare here — otherwise every tab read "Page | Gerald Photo Video | Gerald Photo Video".
  const sharedTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    keywords: keywords?.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: sharedTitle,
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
      title: sharedTitle,
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

/**
 * Builds a page's metadata from the page's own SEO section, falling back to the
 * defaults passed in. Use this instead of `generateMetadata` on any page whose
 * document is loaded from Sanity, so the SEO section actually takes effect.
 */
export function generateMetadataFromSeo(seo: SanitySeo | undefined | null, defaults: SEOProps): Metadata {
  const merged = generateMetadata({
    ...defaults,
    title: seo?.metaTitle || defaults.title,
    description: seo?.metaDescription || defaults.description,
    image: seo?.ogImage?.asset?.url || defaults.image,
    keywords: seo?.keywords?.length ? seo.keywords : defaults.keywords,
  });

  if (seo?.noIndex) {
    merged.robots = { index: false, follow: false };
  }

  return merged;
}

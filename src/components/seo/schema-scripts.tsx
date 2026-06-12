import { SITE } from '@/lib/constants';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    image: `${SITE.url}/images/og-default.jpg`,
    '@id': SITE.url,
    url: SITE.url,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Omaha',
      addressRegion: 'NE',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.2565,
      longitude: -95.9345,
    },
    sameAs: Object.values(SITE.social),
    areaServed: [
      { '@type': 'City', name: 'Omaha' },
      { '@type': 'City', name: 'Lincoln' },
      { '@type': 'City', name: 'Council Bluffs' },
      { '@type': 'City', name: 'Des Moines' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography & Videography Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Photography' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Quinceañera Photography' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engagement Photography' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Videography' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.reviews.aggregate.rating,
      reviewCount: SITE.reviews.aggregate.count,
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ProfessionalService schema — adds Google-recognized service offerings
 * that appear in Knowledge Panels and local service results.
 */
export function ProfessionalServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    image: `${SITE.url}/images/og-default.jpg`,
    '@id': `${SITE.url}/#professional-service`,
    url: SITE.url,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    priceRange: '$$$',
    areaServed: [
      { '@type': 'City', name: 'Omaha' },
      { '@type': 'City', name: 'Lincoln' },
      { '@type': 'City', name: 'Council Bluffs' },
      { '@type': 'City', name: 'Des Moines' },
      { '@type': 'State', name: 'Nebraska' },
      { '@type': 'State', name: 'Iowa' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography & Videography Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Photography',
            description: 'Cinematic wedding photography capturing your love story with artistry and heart.',
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Quinceañera Photography',
            description: 'Professional quinceañera photography celebrating her journey with stunning portraits.',
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Engagement Photography',
            description: 'Romantic engagement sessions capturing the excitement of your new chapter.',
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Videography',
            description: 'Cinematic wedding films and highlight reels that let you relive every moment.',
            provider: { '@type': 'LocalBusiness', name: SITE.name },
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite schema with SearchAction — improves search result appearance
 * with sitelinks search box and richer employer/organization profiles.
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      '@id': SITE.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Organization schema with detailed founding and contact information.
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/og-default.jpg`,
    foundingDate: `${SITE.foundingYear}`,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Omaha',
        addressRegion: 'NE',
        addressCountry: 'US',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneRaw,
        contactType: 'customer service',
        email: SITE.email,
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    sameAs: Object.values(SITE.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ImageObject schema — adds structured data to gallery images for
 * better image search visibility (Google Images).
 */
export function ImageObjectSchema({
  imageUrl,
  caption,
  author,
}: {
  imageUrl: string;
  caption: string;
  author?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    caption: caption,
    author: {
      '@type': 'Organization',
      name: author || SITE.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  duration: string;
  uploadDate: string;
}

export function VideoSchema({ video }: { video: VideoData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
    duration: video.duration,
    uploadDate: video.uploadDate,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

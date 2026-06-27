import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// Uses the same fallback project ID as sanity.config.ts / sanity.cli.ts
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Server-side client (has access to SANITY_API_TOKEN)
// Disables Sanity CDN so ISR revalidations always fetch fresh data.
// Next.js page-level caching (ISR) handles performance instead.
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Client-side safe client (no secret token, uses CDN for reads)
export const clientReadOnly = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function hasSanityImageAsset(source: SanityImageSource): boolean {
  if (!source) return false;

  if (typeof source === 'string') {
    return source.startsWith('image-') || source.startsWith('http://') || source.startsWith('https://');
  }

  const asset = source.asset || source;
  if (!asset) return false;

  if (typeof asset === 'string') {
    return asset.length > 0;
  }

  return Boolean(asset._ref || asset._id || asset.url);
}

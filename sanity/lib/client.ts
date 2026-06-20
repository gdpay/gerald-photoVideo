import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// Uses the same fallback project ID as sanity.config.ts / sanity.cli.ts
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9vm83yjc';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Server-side client (has access to SANITY_API_TOKEN)
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  ...(process.env.NODE_ENV !== 'production' && {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: { cache: 'no-store' } as any,
  }),
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

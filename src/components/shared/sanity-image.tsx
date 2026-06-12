'use client';

import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/client';
import { useState } from 'react';

interface SanityImageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  alt?: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

/**
 * Generates a descriptive alt text fallback when none is provided.
 * Uses the image's own alt text, caption, or a contextual description.
 */
function generateDescriptiveAlt(source: Record<string, unknown> | null | undefined): string {
  if (!source) return '';

  // Use the image's native alt text if available
  if (typeof source.alt === 'string' && source.alt.trim().length > 0) {
    return source.alt.trim();
  }

  // Fall back to caption
  if (typeof source.caption === 'string' && source.caption.trim().length > 0) {
    return source.caption.trim();
  }

  return '';
}

interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Attempts to extract intrinsic dimensions from the Sanity image source.
 * Falls back to standard aspect ratios if unavailable.
 */
function getImageDimensions(source: Record<string, unknown> | null | undefined): ImageDimensions | null {
  if (!source) return null;

  const asset = (source.asset || source) as Record<string, unknown> | undefined;
  if (!asset) return null;

  // Sanity asset metadata stores dimensions
  const metadata = asset.metadata as Record<string, unknown> | undefined;
  if (metadata?.dimensions) {
    const dims = metadata.dimensions as Record<string, unknown>;
    if (typeof dims.width === 'number' && typeof dims.height === 'number') {
      return { width: dims.width, height: dims.height };
    }
  }

  return null;
}

const DEFAULT_FILL_WIDTH = 1200;
const DEFAULT_FIXED_WIDTH = 800;

export function SanityImage({
  source,
  alt,
  className = '',
  fill = false,
  sizes,
  priority = false,
  quality = 80,
}: SanityImageProps) {
  const [imgError, setImgError] = useState(false);

  // Generate descriptive alt text
  const altText = alt || generateDescriptiveAlt(source as Record<string, unknown>);

  // Extract dimensions for fixed-size images (helps prevent CLS)
  const dimensions = !fill ? getImageDimensions(source as Record<string, unknown>) : null;

  // Build the Sanity URL with appropriate dimensions
  const imageUrl = urlFor(source)
    .width(fill ? DEFAULT_FILL_WIDTH : (dimensions?.width || DEFAULT_FIXED_WIDTH))
    .quality(quality)
    .url();

  // Shared image props
  const imgProps = {
    src: imageUrl,
    alt: altText,
    className: `object-cover ${className}`,
    priority,
    loading: priority ? undefined : ('lazy' as const),
    onError: () => setImgError(true),
  };

  if (!source || imgError) {
    return (
      <div
        className={`bg-warm-black/20 ${className}`}
        role="img"
        aria-label={altText || 'Decorative image placeholder'}
      />
    );
  }

  if (fill) {
    return (
      <Image
        {...imgProps}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      />
    );
  }

  return (
    <Image
      {...imgProps}
      width={dimensions?.width || DEFAULT_FIXED_WIDTH}
      height={dimensions?.height || 600}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
    />
  );
}

import { hasSanityImageAsset, urlFor } from '../../sanity/lib/client';

// Square PNG of a Sanity image for use as a favicon. The whole image is fitted onto a transparent square
// (crop settings are ignored, since the builder would otherwise crop a wide logo down to a square).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function faviconUrl(image: any, size: number): string | null {
  return hasSanityImageAsset(image)
    ? urlFor(image).ignoreImageParams().width(size).height(size).fit('fill').bg('00000000').format('png').url()
    : null;
}

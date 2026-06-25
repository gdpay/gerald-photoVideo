import { client } from '../../sanity/lib/client';
import { pageHeroBySlugQuery } from '../../sanity/lib/queries';

export interface PageHeroData {
  title?: string;
  tagline?: string;
  heading?: string;
  subheading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backgroundImage?: any;
}

export async function getPageHeroData(slug: string): Promise<PageHeroData | null> {
  try {
    const data = await client.fetch(pageHeroBySlugQuery(slug));
    return data?.sections || null;
  } catch {
    return null;
  }
}

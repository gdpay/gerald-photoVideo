import type { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';

const BASE_URL = 'https://www.geraldphotovideo.com';

const staticPages = [
  { path: '', priority: 1.0 },
  { path: '/weddings', priority: 0.9 },
  { path: '/quinceaneras', priority: 0.9 },
  { path: '/engagements', priority: 0.8 },
  { path: '/portraits', priority: 0.8 },
  { path: '/videography', priority: 0.9 },
  { path: '/portfolio', priority: 0.8 },
  { path: '/investment', priority: 0.7 },
  { path: '/about', priority: 0.7 },
  { path: '/reviews', priority: 0.6 },
  { path: '/faq', priority: 0.6 },
  { path: '/contact', priority: 0.8 },
  { path: '/blog', priority: 0.7 },
  { path: '/omaha-wedding-photographer', priority: 0.8 },
  { path: '/lincoln-wedding-photographer', priority: 0.7 },
  { path: '/council-bluffs-wedding-photographer', priority: 0.7 },
  { path: '/des-moines-wedding-photographer', priority: 0.7 },
];

async function getBlogPosts(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await client.fetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "post" && defined(slug)]{ "slug": slug.current, publishedAt }`
    );

    return posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.priority >= 0.9 ? ('weekly' as const) : ('monthly' as const),
    priority: page.priority,
  }));

  const blogUrls = await getBlogPosts();

  return [...staticUrls, ...blogUrls];
}

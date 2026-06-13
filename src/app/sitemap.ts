import type { MetadataRoute } from 'next';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.priority >= 0.9 ? 'weekly' as const : 'monthly' as const,
    priority: page.priority,
  }));

  return [...staticUrls];
}

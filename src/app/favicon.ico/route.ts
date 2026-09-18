import { NextResponse } from 'next/server';
import { faviconUrl } from '@/lib/favicon';
import { client } from '../../../sanity/lib/client';

export const revalidate = 60;

// Browsers and search engines request /favicon.ico directly, so serve the Site Settings favicon
// (or the logo when no favicon is set). The image itself is returned rather than a redirect,
// because this route is pre-rendered and a pre-rendered redirect loses its Location header.
export async function GET() {
  const settings = await client.fetch(`*[_id == "siteSettings"][0] { favicon, logo }`).catch(() => null);
  const url = faviconUrl(settings?.favicon, 64) || faviconUrl(settings?.logo, 64);
  if (!url) return new NextResponse(null, { status: 404 });

  const image = await fetch(url);
  if (!image.ok) return new NextResponse(null, { status: 502 });
  return new NextResponse(await image.arrayBuffer(), { headers: { 'Content-Type': 'image/png' } });
}

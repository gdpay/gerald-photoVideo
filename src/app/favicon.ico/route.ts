import { NextResponse } from 'next/server';
import { faviconUrl } from '@/lib/favicon';
import { client } from '../../../sanity/lib/client';

export const revalidate = 60;

// Browsers and search engines request /favicon.ico directly, so send them to the Site Settings favicon
// (or the logo when no favicon is set).
export async function GET() {
  const settings = await client.fetch(`*[_id == "siteSettings"][0] { favicon, logo }`).catch(() => null);
  const url = faviconUrl(settings?.favicon, 64) || faviconUrl(settings?.logo, 64);
  return url ? NextResponse.redirect(url) : new NextResponse(null, { status: 404 });
}

import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Revalidation endpoint.
 *
 * POST: Sanity webhook (requires Bearer secret)
 * GET:  Manual trigger (requires ?secret= query param)
 */
export async function POST(request: NextRequest) {
  try {
    const secret =
      process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: 'SANITY_REVALIDATE_SECRET not configured' },
        { status: 500 }
      );
    }
    const authHeader = request.headers.get('authorization') || '';
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const documentType = body?._type as string | undefined;

    const pathsToRevalidate = getPathsForType(documentType);

    for (const path of pathsToRevalidate) {
      revalidatePath(path, 'page');
    }
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      paths: Array.from(pathsToRevalidate),
      documentType,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET;
    const providedSecret = request.nextUrl.searchParams.get('secret');

    if (!secret || providedSecret !== secret) {
      return NextResponse.json({ message: 'Invalid or missing secret' }, { status: 401 });
    }

    const paths = [
      '/', '/about', '/weddings', '/quinceaneras', '/engagements',
      '/portraits', '/videography', '/portfolio', '/investment',
      '/blog', '/reviews', '/faq', '/contact',
    ];

    for (const path of paths) {
      revalidatePath(path, 'page');
    }
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      paths,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

function getPathsForType(documentType?: string): Set<string> {
  const paths = new Set<string>(['/']);

  if (!documentType) {
    const all = ['/', '/about', '/weddings', '/quinceaneras', '/engagements',
      '/portraits', '/videography', '/portfolio', '/investment',
      '/blog', '/reviews', '/faq', '/contact'];
    all.forEach((p) => paths.add(p));
    return paths;
  }

  switch (documentType) {
    case 'settings':
      ['/', '/about', '/weddings', '/quinceaneras', '/engagements',
        '/portraits', '/videography', '/portfolio', '/investment',
        '/blog', '/reviews', '/faq', '/contact'].forEach((p) => paths.add(p));
      break;
    case 'aboutPage':
      paths.add('/about');
      break;
    case 'investmentPage':
      paths.add('/investment');
      break;
    case 'faqPage':
      paths.add('/faq');
      break;
    case 'engagementsPage':
      paths.add('/engagements');
      break;
    case 'videographyPage':
      paths.add('/videography');
      break;
    case 'service':
      ['/weddings', '/quinceaneras', '/engagements', '/portraits', '/videography'].forEach((p) => paths.add(p));
      break;
    case 'gallery':
    case 'testimonial':
      ['/portfolio', '/reviews'].forEach((p) => paths.add(p));
      break;
    case 'blog':
      paths.add('/blog');
      break;
    case 'page':
      ['/about', '/weddings', '/quinceaneras', '/engagements',
        '/portraits', '/videography', '/portfolio', '/investment',
        '/blog', '/reviews', '/faq'].forEach((p) => paths.add(p));
      break;
    case 'homePage':
      paths.add('/');
      break;
    case 'portfolioPage':
      paths.add('/portfolio');
      break;
    case 'reviewsPage':
      paths.add('/reviews');
      break;
    default:
      ['/', '/about', '/weddings', '/quinceaneras', '/engagements',
        '/portraits', '/videography', '/portfolio', '/investment',
        '/blog', '/reviews', '/faq', '/contact'].forEach((p) => paths.add(p));
      break;
  }

  return paths;
}

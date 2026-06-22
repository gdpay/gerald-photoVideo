import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Sanity webhook endpoint for on-demand revalidation.
 *
 * Configure a Sanity webhook (Project → API → Webhooks) with:
 *   URL:    https://www.geraldphotovideo.com/api/revalidate
 *   Secret: (set SANITY_REVALIDATE_SECRET in Vercel env vars)
 *   Trigger: Create, update, delete
 *   Filter: _type == "settings" || _type == "page" || _type == "heroSlide" || _type == "service" || _type == "gallery" || _type == "testimonial" || _type == "blog" || _type == "aboutPage" || _type == "investmentPage" || _type == "faqPage" || _type == "engagementsPage" || _type == "videographyPage"
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
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

    // Determine which paths to revalidate based on document type
    const pathsToRevalidate = new Set<string>();

    // Always revalidate the homepage — it uses settings, heroSlides, services, etc.
    pathsToRevalidate.add('/');

    if (documentType) {
      switch (documentType) {
        case 'settings':
          // Site settings affect all pages (logo, metadata)
          pathsToRevalidate.add('/about');
          pathsToRevalidate.add('/weddings');
          pathsToRevalidate.add('/quinceaneras');
          pathsToRevalidate.add('/engagements');
          pathsToRevalidate.add('/portraits');
          pathsToRevalidate.add('/videography');
          pathsToRevalidate.add('/portfolio');
          pathsToRevalidate.add('/investment');
          pathsToRevalidate.add('/blog');
          pathsToRevalidate.add('/reviews');
          pathsToRevalidate.add('/faq');
          pathsToRevalidate.add('/contact');
          break;
        case 'aboutPage':
          pathsToRevalidate.add('/about');
          break;
        case 'investmentPage':
          pathsToRevalidate.add('/investment');
          break;
        case 'faqPage':
          pathsToRevalidate.add('/faq');
          break;
        case 'engagementsPage':
          pathsToRevalidate.add('/engagements');
          break;
        case 'videographyPage':
          pathsToRevalidate.add('/videography');
          break;
        case 'service':
          pathsToRevalidate.add('/weddings');
          pathsToRevalidate.add('/quinceaneras');
          pathsToRevalidate.add('/engagements');
          pathsToRevalidate.add('/portraits');
          pathsToRevalidate.add('/videography');
          break;
        case 'gallery':
        case 'testimonial':
          pathsToRevalidate.add('/portfolio');
          pathsToRevalidate.add('/reviews');
          break;
        case 'blog':
          pathsToRevalidate.add('/blog');
          // Slug-based blog posts will be revalidated via layout
          break;
        case 'page':
          // Pages have dynamic slugs — revalidate main paths
          pathsToRevalidate.add('/about');
          pathsToRevalidate.add('/weddings');
          pathsToRevalidate.add('/quinceaneras');
          pathsToRevalidate.add('/engagements');
          pathsToRevalidate.add('/portraits');
          pathsToRevalidate.add('/videography');
          pathsToRevalidate.add('/portfolio');
          pathsToRevalidate.add('/investment');
          pathsToRevalidate.add('/blog');
          pathsToRevalidate.add('/reviews');
          pathsToRevalidate.add('/faq');
          break;
        case 'heroSlide':
          // Hero slides appear on the homepage
          break;
        default:
          // For unknown types, revalidate all main paths
          pathsToRevalidate.add('/about');
          pathsToRevalidate.add('/weddings');
          pathsToRevalidate.add('/quinceaneras');
          pathsToRevalidate.add('/engagements');
          pathsToRevalidate.add('/portraits');
          pathsToRevalidate.add('/videography');
          pathsToRevalidate.add('/portfolio');
          pathsToRevalidate.add('/investment');
          pathsToRevalidate.add('/blog');
          pathsToRevalidate.add('/reviews');
          pathsToRevalidate.add('/faq');
          break;
      }
    }

    // Revalidate all determined paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path, 'page');
    }

    // Also revalidate the root layout to catch any shared data
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

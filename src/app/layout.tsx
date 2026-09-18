import type { Metadata } from 'next';

export const revalidate = 60;
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { StickyCTA } from '@/components/layout/sticky-cta';
import { LocalBusinessSchema, WebSiteSchema, OrganizationSchema, ProfessionalServiceSchema } from '@/components/seo/schema-scripts';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { MetaPixel } from '@/components/analytics/meta-pixel';
import { AnalyticsConsentProvider } from '@/components/analytics/meta-pixel-provider';
import { ConsentBanner } from '@/components/analytics/consent-banner';
import { SITE } from '@/lib/constants';
import { client } from '../../sanity/lib/client';
import { reviewsRatingQuery, settingsQuery } from '../../sanity/lib/queries';
import { hasSanityImageAsset, urlFor } from '../../sanity/lib/client';
import { faviconUrl } from '@/lib/favicon';
import './globals.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSettings(): Promise<any> {
  try {
    return await client.fetch(settingsQuery);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const icon = (size: number) => faviconUrl(settings?.favicon, size);

  const name = settings?.title || SITE.name;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${name} | Wedding & Quinceañera Photographer Nebraska & Iowa`,
      template: `%s | ${name}`,
    },
    description: settings?.description || SITE.description,
    keywords: [
      'wedding photographer',
      'quinceañera photographer',
      'engagement photographer',
      'portrait photographer',
      'wedding videographer',
      'Nebraska photographer',
      'Iowa photographer',
      'Omaha wedding photographer',
      'cinematic wedding films',
      'Gerald Photo Video',
    ],
    authors: [{ name: name }],
    creator: name,
    publisher: name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: name,
      title: `${name} | Wedding & Quinceañera Photographer Nebraska & Iowa`,
      description: settings?.description || SITE.description,
      url: SITE.url,
      images: [
        {
          url: `${SITE.url}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description: settings?.description || SITE.description,
      images: [`${SITE.url}/images/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Without a Sanity favicon, browsers fall back to /favicon.ico (src/app/favicon.ico/route.ts).
    icons: icon(32)
      ? {
          icon: [
            { url: icon(32)!, sizes: '32x32', type: 'image/png' },
            { url: icon(192)!, sizes: '192x192', type: 'image/png' },
          ],
          apple: [{ url: icon(180)!, sizes: '180x180', type: 'image/png' }],
        }
      : undefined,
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, reviewsRating] = await Promise.all([
    getSettings(),
    client.fetch(reviewsRatingQuery).catch(() => null),
  ]);

  const logoUrl = hasSanityImageAsset(settings?.logo)
    ? urlFor(settings.logo).width(200).url()
    : null;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema
          rating={{ value: reviewsRating?.ratingValue, count: reviewsRating?.ratingCount }}
        />
        <ProfessionalServiceSchema />
        <WebSiteSchema />
        <OrganizationSchema />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#0A1F44] antialiased">
        <AnalyticsConsentProvider>
          <Navigation
            logoUrl={logoUrl}
            navItems={settings?.navItems}
            buttonLabel={settings?.headerButtonLabel}
            buttonLink={settings?.headerButtonLink}
            callLabel={settings?.mobileCallLabel}
            phone={settings?.phone}
          />
          <main className="min-h-screen">{children}</main>
          <Footer settings={settings} />
          <StickyCTA
            phone={settings?.phone}
            callIcon={settings?.stickyCallIcon}
            callLabel={settings?.stickyCallLabel}
            buttonIcon={settings?.stickyButtonIcon}
            buttonLabel={settings?.stickyButtonLabel}
            buttonLink={settings?.stickyButtonLink}
          />
          <GoogleAnalytics />
          <MetaPixel />
          <ConsentBanner
            icon={settings?.cookieIcon}
            title={settings?.cookieTitle}
            text={settings?.cookieText}
            acceptLabel={settings?.cookieAcceptLabel}
            rejectLabel={settings?.cookieRejectLabel}
            policyLabel={settings?.cookiePolicyLabel}
            policyLink={settings?.cookiePolicyLink}
          />
        </AnalyticsConsentProvider>
      </body>
    </html>
  );
}

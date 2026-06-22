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
import { settingsQuery } from '../../sanity/lib/queries';
import { urlFor } from '../../sanity/lib/client';
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

  const faviconUrl = settings?.favicon
    ? urlFor(settings.favicon).width(64).url()
    : null;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} | Wedding & Quinceañera Photographer Nebraska & Iowa`,
      template: `%s | ${SITE.name}`,
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
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE.name,
      title: `${SITE.name} | Wedding & Quinceañera Photographer Nebraska & Iowa`,
      description: settings?.description || SITE.description,
      url: SITE.url,
      images: [
        {
          url: `${SITE.url}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE.name,
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
    icons: {
      icon: faviconUrl || '/favicon.ico',
    },
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
  const settings = await getSettings();

  const logoUrl = settings?.logo
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
        <LocalBusinessSchema />
        <ProfessionalServiceSchema />
        <WebSiteSchema />
        <OrganizationSchema />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#0A1F44] antialiased">
        <AnalyticsConsentProvider>
          <Navigation logoUrl={logoUrl} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <StickyCTA />
          <GoogleAnalytics />
          <MetaPixel />
          <ConsentBanner />
        </AnalyticsConsentProvider>
      </body>
    </html>
  );
}

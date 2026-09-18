import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { HoneyBookContactWidget } from '@/components/forms/honeybook-contact-widget';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { SITE } from '@/lib/constants';
import { toDialableNumber } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import { client } from '../../../sanity/lib/client';
import { contactPageQuery, settingsQuery } from '../../../sanity/lib/queries';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Us',
  description:
    'Book your wedding, quinceañera, or engagement photography session. Contact Gerald Photo Video serving Nebraska and Iowa. We respond within 24 hours.',
  path: '/contact',
  keywords: [
    'book wedding photographer Omaha',
    'contact photographer Nebraska',
    'engagement photographer booking',
    'Gerald Photo Video contact',
  ],
});

export default async function ContactPage() {
  const [data, settings] = await Promise.all([
    client.fetch(contactPageQuery).catch(() => null),
    client.fetch(settingsQuery).catch(() => null),
  ]);

  const phone = settings?.phone || SITE.phone;
  const phoneRaw = settings?.phone ? toDialableNumber(settings.phone) : SITE.phoneRaw;
  const email = settings?.email || SITE.email;
  const instagramUrl = settings?.socialLinks?.instagram || SITE.social.instagram;
  const region = settings?.addressRegion || SITE.address.region;
  const PhoneIcon = getIcon(data?.phoneIcon, Phone);
  const EmailIcon = getIcon(data?.emailIcon, Mail);
  const InstagramIcon = getIcon(data?.instagramIcon, MessageCircle);
  const ServiceAreaIcon = getIcon(data?.serviceAreaIcon, Clock);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ]} />
      <PageHero
        tagline={data?.heroTagline}
        title={data?.heroHeading || "Let's Create Together"}
        subtitle={data?.heroSubheading || "Tell us about your vision and we'll make it happen."}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
      />

      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden border border-[#E5E0D8] bg-[#FAF7F2]">
                <HoneyBookContactWidget />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6 lg:sticky lg:top-28">
                <h2 className="font-heading text-2xl text-[#0A1F44] mb-6">{data?.detailsHeading || 'Get in Touch'}</h2>

                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-start gap-4 p-4 border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors group"
                >
                  <PhoneIcon className="h-5 w-5 text-[#C8A23D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-[#0A1F44] text-sm">{data?.phoneTitle || 'Call Us'}</h3>
                    <p className="text-[#736D63] text-sm group-hover:text-[#C8A23D] transition-colors">{phone}</p>
                    <p className="text-xs text-[#A39D93]">{data?.phoneNote || 'Available Mon–Fri, 9AM–6PM'}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-4 p-4 border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors group"
                >
                  <EmailIcon className="h-5 w-5 text-[#C8A23D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-[#0A1F44] text-sm">{data?.emailTitle || 'Email Us'}</h3>
                    <p className="text-[#736D63] text-sm group-hover:text-[#C8A23D] transition-colors">{email}</p>
                    <p className="text-xs text-[#A39D93]">{data?.emailNote || 'We respond within 24 hours'}</p>
                  </div>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 border border-[#E5E0D8] hover:border-[#C8A23D]/30 transition-colors group"
                >
                  <InstagramIcon className="h-5 w-5 text-[#C8A23D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-[#0A1F44] text-sm">{data?.instagramTitle || 'DM Us'}</h3>
                    <p className="text-[#736D63] text-sm group-hover:text-[#C8A23D] transition-colors">{data?.instagramHandle || '@geraldphotovideo'}</p>
                    <p className="text-xs text-[#A39D93]">{data?.instagramNote || 'Follow us on Instagram'}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 border border-[#E5E0D8]">
                  <ServiceAreaIcon className="h-5 w-5 text-[#C8A23D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-[#0A1F44] text-sm">{data?.serviceAreaTitle || 'Service Area'}</h3>
                    <p className="text-[#736D63] text-sm">{region}</p>
                    <p className="text-xs text-[#A39D93]">{data?.serviceAreaNote || 'Omaha · Lincoln · Council Bluffs · Des Moines'}</p>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-[#E5E0D8] bg-[#F8E8D0]">
                  <p className="text-sm text-[#736D63] leading-relaxed">
                    {data?.bookingNote || "Ready to book? We recommend reaching out at least 6–12 months in advance to secure your preferred date. However, we always check for last-minute availability — don't hesitate to ask!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}

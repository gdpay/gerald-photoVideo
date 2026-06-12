import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { MultiStepInquiryForm } from '@/components/forms/multi-step-inquiry-form';
import { BreadcrumbSchema } from '@/components/seo/schema-scripts';
import { generateMetadata } from '@/lib/seo-metadata';
import { SITE } from '@/lib/constants';
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

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ]} />
      <PageHero
        title="Let's Create Together"
        subtitle="Tell us about your vision and we'll make it happen."
        typewriterWords={['Get in Touch', "Let's Talk", 'Book Now', 'Your Vision']}
      />

      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="p-8 border border-cream/5 rounded-sm bg-warm-black/50">
                <h2 className="font-heading text-2xl text-cream mb-1">Send Us a Message</h2>
                <p className="text-cream/50 text-sm mb-8">We respond within 24 hours.</p>
                <MultiStepInquiryForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6 lg:sticky lg:top-28">
                <h2 className="font-heading text-2xl text-cream mb-6">Get in Touch</h2>

                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-start gap-4 p-4 border border-cream/5 rounded-sm hover:border-gold/20 transition-colors group"
                >
                  <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-cream text-sm">Call Us</h3>
                    <p className="text-cream/60 text-sm group-hover:text-gold transition-colors">{SITE.phone}</p>
                    <p className="text-xs text-cream/40">Available Mon–Fri, 9AM–6PM</p>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-4 p-4 border border-cream/5 rounded-sm hover:border-gold/20 transition-colors group"
                >
                  <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-cream text-sm">Email Us</h3>
                    <p className="text-cream/60 text-sm group-hover:text-gold transition-colors">{SITE.email}</p>
                    <p className="text-xs text-cream/40">We respond within 24 hours</p>
                  </div>
                </a>

                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 border border-cream/5 rounded-sm hover:border-gold/20 transition-colors group"
                >
                  <MessageCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-cream text-sm">DM Us</h3>
                    <p className="text-cream/60 text-sm group-hover:text-gold transition-colors">@geraldphotovideo</p>
                    <p className="text-xs text-cream/40">Follow us on Instagram</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 border border-cream/5 rounded-sm">
                  <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-body font-medium text-cream text-sm">Service Area</h3>
                    <p className="text-cream/60 text-sm">{SITE.address.region}</p>
                    <p className="text-xs text-cream/40">Omaha · Lincoln · Council Bluffs · Des Moines</p>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-cream/5 rounded-sm bg-black/30">
                  <p className="text-sm text-cream/70 leading-relaxed">
                    Ready to book? We recommend reaching out at least 6–12 months in advance 
                    to secure your preferred date. However, we always check for last-minute 
                    availability — don't hesitate to ask!
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

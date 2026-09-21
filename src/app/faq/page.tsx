import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/page-hero';
import { CTASection } from '@/components/sections/cta-section';
import { FAQAccordion, type FAQCategory } from '@/components/sections/faq-accordion';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/schema-scripts';
import { generateMetadataFromSeo } from '@/lib/seo-metadata';
import { client } from '../../../sanity/lib/client';
import { faqPageQuery } from '../../../sanity/lib/queries';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  // The page's own "SEO" section wins; anything left blank falls back to the copy below.
  const seo = await client.fetch(faqPageQuery).then((d) => d?.seo).catch(() => null);
  return generateMetadataFromSeo(seo, {
    title: 'FAQ',
    description:
      'Answers to common questions about booking, photography, videography, and delivery for weddings and quinceañeras in Nebraska and Iowa.',
    path: '/faq',
    keywords: [
      'wedding photography FAQ',
      'wedding photographer questions Omaha',
      'quinceañera photography questions',
    ],
  });
}

const fallbackData: FAQCategory[] = [
  {
    category: 'Booking & Timing',
    questions: [
      { question: 'How far in advance should we book?', answer: "We recommend booking 6–12 months in advance, especially for peak wedding season (May–October). However, we occasionally have last-minute availability — don't hesitate to ask!" },
      { question: 'Do you travel for weddings?', answer: "Absolutely! We're based in Omaha but proudly serve all of Nebraska, Iowa, and beyond. Travel within 100 miles is included. Additional travel fees may apply for farther destinations." },
      { question: "What's the booking process?", answer: "Simple! Reach out through our contact form, we'll schedule a consultation to discuss your vision, then we'll create a custom proposal. A 30% deposit secures your date." },
    ],
  },
  {
    category: 'Photography',
    questions: [
      { question: 'How many photos do we receive?', answer: 'It depends on your collection, but typically 400–1,200+ fully edited, high-resolution images. We focus on quality over quantity, delivering only the best shots.' },
      { question: "What's your editing style?", answer: 'Our style is a blend of documentary and fine-art editorial. We enhance natural light and colors to create timeless, cinematic images that never feel dated.' },
      { question: 'How long does it take to receive our photos?', answer: "You'll receive a sneak peek within 48 hours. Full galleries are typically delivered within 4–6 weeks during peak season, 2–3 weeks otherwise." },
    ],
  },
  {
    category: 'Videography',
    questions: [
      { question: 'Do you offer drone footage?', answer: 'Yes! Drone footage is available as an add-on to any of our videography collections. It adds a stunning cinematic perspective to your film.' },
      { question: 'How long are the wedding films?', answer: 'Highlight films are typically 3–5 minutes. Full ceremony and reception edits are delivered as separate films. We also offer same-day edits for your reception.' },
      { question: 'Can we get the raw footage?', answer: "Raw footage is available as an add-on. However, we highly recommend our edited films — we carefully select the best moments and color-grade everything for a cohesive, cinematic look." },
    ],
  },
  {
    category: 'Investment',
    questions: [
      { question: 'Do you offer payment plans?', answer: 'Yes! We offer flexible payment plans. A 30% deposit secures your date, and the remaining balance can be paid in installments leading up to your event.' },
      { question: 'Is there a deposit required?', answer: 'Yes, a 30% non-refundable deposit is required to reserve your date. This goes toward your total investment.' },
      { question: 'Can we customize a collection?', answer: "Absolutely! Every collection is fully customizable. We'll work with you to create the perfect package for your needs and budget." },
    ],
  },
  {
    category: 'Quinceañeras',
    questions: [
      { question: 'Do you speak Spanish?', answer: 'Sí, hablamos español! We understand the cultural traditions and can communicate with Spanish-speaking family members.' },
      { question: 'How long does a quinceañera event typically last?', answer: 'Most celebrations include the religious ceremony (1 hour), followed by the reception (3–5 hours). We typically recommend 6–8 hours of coverage.' },
      { question: 'Do you offer photo + video packages for quinceañeras?', answer: 'Yes! Our photo and video combo packages are very popular for quinceañeras. You get the best of both worlds — stunning portraits and a cinematic highlight film.' },
    ],
  },
];

export default async function FAQPage() {
  const data = await client.fetch(faqPageQuery).catch(() => null);
  const categories: FAQCategory[] = data?.categories?.length ? data.categories : fallbackData;

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'FAQ', url: '/faq' },
      ]} />
      <FAQSchema faqs={categories.flatMap((cat) => cat.questions)} />
      <PageHero
        tagline={data?.heroTagline}
        title={data?.heroHeading || 'Frequently Asked Questions'}
        subtitle={data?.heroSubheading || 'Everything you need to know about working with us.'}
        imageSource={data?.heroImage}
        imageUrl="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
      />

      <FAQAccordion categories={categories} />

      <CTASection
        imageSource={data?.ctaImage}
        title={data?.ctaTitle || 'Still Have Questions?'}
        subtitle={data?.ctaSubtitle || "We're happy to answer anything else you'd like to know."}
        primaryCTA={{ label: data?.ctaButtonLabel || 'Contact Us', href: data?.ctaButtonLink || '/contact' }}
      />
    </>
  );
}

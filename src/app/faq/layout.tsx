import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo-metadata';
import FAQPage from './page';

export const metadata: Metadata = genMeta({
  title: 'FAQ',
  description: 'Frequently asked questions about Gerald Photo Video wedding and quinceañera photography and videography services in Nebraska and Iowa.',
  path: '/faq',
});

export default function FAQLayout() {
  return <FAQPage />;
}

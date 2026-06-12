'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/sections/page-hero';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { CTASection } from '@/components/sections/cta-section';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/schema-scripts';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
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

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQCategory[]>(fallbackData);

  useEffect(() => {
    fetch('/api/faq')
      .then((res) => res.json())
      .then((data) => {
        if (data?.categories?.length) {
          setFaqData(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const flatFaqs = faqData.flatMap((cat) => cat.questions);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'FAQ', url: '/faq' },
      ]} />
      <FAQSchema faqs={flatFaqs} />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with us."
        typewriterWords={['FAQ', 'Your Questions', 'Answers Here', 'Need to Know']}
      />

      <SectionWrapper>
        <Container narrow>
          {faqData.map((category) => (
            <div key={category.category} className="mb-12 last:mb-0">
              <h2 className="font-heading text-2xl text-gold mb-6">{category.category}</h2>
              <div className="space-y-2">
                {category.questions.map((item, idx) => {
                  const globalIndex = flatFaqs.indexOf(item);
                  const isOpen = openIndex === globalIndex;
                  return (
                    <div
                      key={idx}
                      className="border border-cream/5 rounded-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-5 text-left text-cream/80 hover:text-gold transition-colors"
                      >
                        <span className="font-body font-medium">{item.question}</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 shrink-0 transition-transform duration-300',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm text-cream/50 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </SectionWrapper>

      <CTASection
        title="Still Have Questions?"
        subtitle="We're happy to answer anything else you'd like to know."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}

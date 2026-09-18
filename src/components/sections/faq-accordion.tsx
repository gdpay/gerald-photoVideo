'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Container } from '@/components/shared/container';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export function FAQAccordion({ categories }: { categories: FAQCategory[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const flatFaqs = categories.flatMap((cat) => cat.questions);

  return (
    <SectionWrapper>
      <Container narrow>
        {categories.map((category) => (
          <div key={category.category} className="mb-12 last:mb-0">
            <h2 className="font-heading text-2xl text-[#C8A23D] mb-6">{category.category}</h2>
            <div className="space-y-2">
              {category.questions.map((item, idx) => {
                const globalIndex = flatFaqs.indexOf(item);
                const isOpen = openIndex === globalIndex;
                return (
                  <div
                    key={idx}
                    className="border border-[#E5E0D8] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full flex items-center justify-between p-5 text-left text-[#0A1F44]/80 hover:text-[#C8A23D] transition-colors"
                    >
                      <span className="font-body font-medium">{item.question}</span>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-[#A39D93] transition-transform duration-300',
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
                          <p className="px-5 pb-5 text-sm text-[#736D63] leading-relaxed">
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
  );
}

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { MessageCircle, Calendar, Heart, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Inquire',
    description: 'Reach out through our contact form or give us a call. We\'ll learn about your vision and check availability.',
    number: '01',
  },
  {
    icon: Calendar,
    title: 'Meet',
    description: 'We\'ll schedule a consultation to discuss details, share ideas, and create a custom plan for your special day.',
    number: '02',
  },
  {
    icon: Heart,
    title: 'Celebrate',
    description: 'We capture every precious moment with artistry and care, delivering a timeless collection you\'ll cherish forever.',
    number: '03',
  },
];

export function ProcessSection() {
  return (
    <SectionWrapper className="bg-[#FAF7F2]">
      <Container>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[12px] font-medium uppercase tracking-[0.15em] text-[#C8A23D]"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl text-[#0A1F44]"
          >
            The Experience
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={staggerItem} className="relative text-center">
              {/* Step number */}
              <div className="font-heading text-6xl md:text-7xl text-[#C8A23D]/10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-[#C8A23D]/5 border border-[#C8A23D]/20">
                <step.icon className="h-7 w-7 text-[#C8A23D]" />
              </div>

              <h3 className="font-heading text-2xl text-[#0A1F44] mb-3">{step.title}</h3>
              <p className="text-[#736D63] text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow connector (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 text-[#C8A23D]/20">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

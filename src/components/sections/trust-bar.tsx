'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { SITE } from '@/lib/constants';
import { Star, Award, Camera, Heart } from 'lucide-react';

const stats = [
  {
    icon: Star,
    value: `${SITE.reviews.aggregate.rating}`,
    label: 'Average Rating',
    sublabel: `${SITE.reviews.aggregate.count}+ Reviews`,
    color: 'text-[#C8A23D]',
  },
  {
    icon: Award,
    value: '5.0',
    label: 'The Knot Rating',
    sublabel: `${SITE.reviews.theKnot.count} Reviews`,
    color: 'text-[#C8A23D]',
  },
  {
    icon: Camera,
    value: '200+',
    label: 'Weddings Captured',
    sublabel: 'Since 2015',
    color: 'text-[#0A1F44]',
  },
  {
    icon: Heart,
    value: SITE.address.region,
    label: 'Proudly Serving',
    sublabel: 'Your Stories Matter',
    color: 'text-[#8A1C3E]',
  },
];

export function TrustBar() {
  return (
    <section className="py-12 bg-[#F8E8D0] border-y border-[#C8A23D]/10">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-3`} />
              <div className="font-heading text-3xl text-[#0A1F44]">{stat.value}</div>
              <div className="mt-1 text-sm text-[#736D63]">{stat.label}</div>
              <div className="text-xs text-[#A39D93] mt-0.5">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

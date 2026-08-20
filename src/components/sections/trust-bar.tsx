'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/shared/container';
import { Heart, Star } from 'lucide-react';

const defaultStats = [
  {
    value: '20+',
    label: 'Years Experience',
    variant: 'laurel',
  },
  {
    value: '500+',
    label: 'Families Captured',
  },
  {
    value: '5.0',
    label: 'Client Reviews',
    variant: 'stars',
  },
  {
    value: 'the knot',
    label: 'Hall of Fame',
    variant: 'script',
  },
  {
    value: '100%',
    label: 'Passion',
    variant: 'heart',
  },
];

export function TrustBar({ stats = defaultStats }: { stats?: { value: string; label: string; variant?: string }[] }) {
  return (
    <section className="border-y border-[#C8A23D]/30 bg-[#06112A] py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex min-h-20 items-center justify-center px-5 text-center lg:min-h-16 lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:right-0 lg:[&:not(:last-child)]:after:top-1/2 lg:[&:not(:last-child)]:after:h-14 lg:[&:not(:last-child)]:after:w-px lg:[&:not(:last-child)]:after:-translate-y-1/2 lg:[&:not(:last-child)]:after:bg-[#C8A23D]/60"
            >
              <div className="flex items-center justify-center gap-3">
                {stat.variant === 'laurel' && (
                  <span
                    className="h-12 w-4 rounded-l-full border-l-2 border-[#C8A23D]"
                    aria-hidden="true"
                  />
                )}

                {stat.variant === 'heart' && (
                  <Heart className="h-10 w-10 text-[#C8A23D]" strokeWidth={1.6} aria-hidden="true" />
                )}

                <div>
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={
                        stat.variant === 'script'
                          ? 'font-heading text-3xl italic leading-none text-[#FAF7F2]'
                          : 'font-heading text-4xl font-medium leading-none text-[#FAF7F2]'
                      }
                    >
                      {stat.value}
                    </span>

                    {stat.variant === 'stars' && (
                      <span className="flex items-center gap-0.5 text-[#C8A23D]" aria-label="5 stars">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                        ))}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-[#FAF7F2]/80">
                    {stat.label}
                  </div>
                </div>

                {stat.variant === 'laurel' && (
                  <span
                    className="h-12 w-4 rounded-r-full border-r-2 border-[#C8A23D]"
                    aria-hidden="true"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

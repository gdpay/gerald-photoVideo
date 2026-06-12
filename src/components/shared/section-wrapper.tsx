'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  gold?: boolean;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark,
  gold,
  noPadding,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      className={cn(
        'relative',
        !noPadding && 'py-20 md:py-24 lg:py-32',
        dark && 'bg-warm-black',
        gold && 'bg-gradient-to-b from-warm-black via-warm-black/95 to-warm-black',
        className
      )}
    >
      {children}
    </motion.section>
  );
}

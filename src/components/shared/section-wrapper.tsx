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
  champagne?: boolean;
  navy?: boolean;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark,
  champagne,
  navy,
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
        dark && 'bg-[#0A1F44] text-[#FAF7F2]',
        champagne && 'bg-[#F8E8D0]',
        navy && 'bg-[#0A1F44] text-[#FAF7F2]',
        !dark && !champagne && !navy && 'bg-[#FAF7F2]',
        className
      )}
    >
      {children}
    </motion.section>
  );
}

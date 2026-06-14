'use client';

import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-[12px] sm:text-[13px] font-body font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-[#0A1F44] text-[#FAF7F2] hover:bg-[#122D5A] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(10,31,68,0.15)] shadow-md',
        secondary:
          'border border-[#C8A23D] text-[#C8A23D] hover:bg-[#C8A23D]/10 hover:text-[#A8842E] hover:-translate-y-0.5',
        ghost:
          'text-[#736D63] hover:text-[#0A1F44] hover:bg-[#F0EDE6]',
        dark:
          'bg-[#0A1F44] text-[#FAF7F2] border border-[#C8A23D]/30 hover:bg-[#122D5A] hover:border-[#C8A23D]',
        outline:
          'border border-[#D4CEC4] text-[#0A1F44] hover:border-[#C8A23D] hover:text-[#C8A23D] hover:-translate-y-0.5',
        accent:
          'bg-[#8A1C3E] text-white hover:bg-[#6E1532] hover:-translate-y-0.5 shadow-md',
      },
      size: {
        sm: 'h-8 sm:h-9 px-3 sm:px-4 text-[11px] sm:text-[12px]',
        md: 'h-10 sm:h-12 px-5 sm:px-6',
        lg: 'h-11 sm:h-14 px-6 sm:px-8',
        xl: 'h-12 sm:h-16 px-8 sm:px-10',
        icon: 'h-10 sm:h-12 w-10 sm:w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:');
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, href, type = 'button', onClick, ...props }, ref) => {
    const classNameStr = cn(buttonVariants({ variant, size, className }));

    const content = (
      <>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    // Render as link
    if (href) {
      if (isExternalLink(href)) {
        return (
          <motion.a
            href={href}
            className={classNameStr}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {content}
          </motion.a>
        );
      }

      // Internal link — use Next.js Link for client-side navigation
      return (
        <Link href={href} className={classNameStr}>
          <motion.span
            className="inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {content}
          </motion.span>
        </Link>
      );
    }

    // Render as button
    return (
      <motion.button
        className={classNameStr}
        ref={ref}
        disabled={disabled || isLoading}
        type={type}
        onClick={onClick}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
      >
        {content}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

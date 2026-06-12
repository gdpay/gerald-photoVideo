'use client';

import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-accent font-semibold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gold text-warm-black hover:bg-gold-dark hover:text-white shadow-lg hover:shadow-gold/25',
        secondary:
          'border border-gold text-gold hover:bg-gold/10 hover:text-gold-light',
        ghost: 'text-cream/70 hover:text-gold hover:bg-white/5',
        dark: 'bg-warm-black text-cream border border-cream/20 hover:bg-charcoal hover:border-gold/50',
        accent:
          'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-accent/25',
        outline:
          'border border-cream/20 text-cream hover:border-gold hover:text-gold',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-12 px-6 text-sm',
        lg: 'h-14 px-8 text-sm',
        xl: 'h-16 px-10 text-sm',
        icon: 'h-12 w-12',
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

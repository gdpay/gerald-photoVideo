'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  logoUrl?: string | null;
}

export function Navigation({ logoUrl }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        isScrolled
          ? 'bg-[#0A1F44]/95 backdrop-blur-xl shadow-lg'
          : 'bg-[#0A1F44]'
      )}
      style={{
        transition: 'padding 0.4s ease, background 0.4s ease',
        padding: isScrolled ? '12px 0' : '18px 0',
      }}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={SITE.name}
                width={180}
                height={40}
                className={cn(
                  'w-auto brightness-0 invert transition-all duration-400',
                  isScrolled ? 'h-7' : 'h-9'
                )}
                priority
              />
            ) : (
              <span className={cn(
                'font-heading text-[#FAF7F2] tracking-wider transition-all duration-400',
                isScrolled ? 'text-xl' : 'text-2xl'
              )}>
                Gerald<span className="text-[#C8A23D]"> </span>Photo Video
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-[13px] font-body font-medium uppercase tracking-[0.08em] transition-colors duration-200',
                  pathname === item.href
                    ? 'text-[#C8A23D]'
                    : 'text-[#FAF7F2]/70 hover:text-[#C8A23D]'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-3">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-2 text-[13px] text-[#FAF7F2]/50 hover:text-[#C8A23D] transition-colors"
                aria-label={`Call ${SITE.phone}`}
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{SITE.phone}</span>
              </a>
              <Button variant="primary" size="sm" href="/contact">
                Inquire
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2 text-[#FAF7F2] hover:text-[#C8A23D] transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 bg-[#0A1F44]/98 backdrop-blur-xl z-0 pt-20"
          >
            <div className="flex flex-col h-full p-6 pb-24 overflow-y-auto">
              <div className="flex-1 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-3 px-4 text-lg font-body transition-colors rounded-lg',
                        pathname === item.href
                          ? 'text-[#C8A23D] bg-[#C8A23D]/5'
                          : 'text-[#FAF7F2]/70 hover:text-[#C8A23D] hover:bg-white/5'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-[#FAF7F2]/10">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#8A1C3E] text-white rounded-lg font-body text-sm uppercase tracking-wider"
                >
                  <Phone className="h-4 w-4" />
                  Call {SITE.phone}
                </a>
                <Link
                  href="/contact"
                  className="block w-full py-3 px-4 bg-[#C8A23D] text-[#FAF7F2] rounded-lg font-body text-sm uppercase tracking-wider text-center"
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

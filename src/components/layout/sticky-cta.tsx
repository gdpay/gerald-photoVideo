'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden animate-fade-in-up">
      <div className="flex items-stretch bg-[#0A1F44]/98 backdrop-blur-xl border-t border-[#C8A23D]/20">
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-body uppercase tracking-wider text-white bg-[#8A1C3E] hover:bg-[#6E1532] transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-body uppercase tracking-wider text-[#FAF7F2] bg-[#C8A23D] hover:bg-[#A8842E] transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Inquire
        </Link>
      </div>
    </div>
  );
}

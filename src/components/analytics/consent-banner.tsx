'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalyticsConsent } from './meta-pixel-provider';
import type { ConsentState } from '@/lib/analytics/types';
import { Shield, X } from 'lucide-react';

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { consent, setConsent } = useAnalyticsConsent();

  useEffect(() => {
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    setConsent(newConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    setConsent(newConsent);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[#0A1F44] border border-[#C8A23D]/20 shadow-2xl">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <Shield className="h-5 w-5 text-[#C8A23D]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#FAF7F2] font-heading text-lg mb-2">
                    Cookie Preferences
                  </h3>
                  <p className="text-[#D4CEC4] text-sm leading-relaxed mb-4">
                    We use cookies to enhance your experience and analyze site traffic.
                    Analytics cookies help us understand how visitors interact with our website,
                    while marketing cookies enable personalized advertisements on Facebook and Instagram.
                    You can choose which cookies to accept.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2 bg-[#C8A23D] text-[#0A1F44] text-sm font-body uppercase tracking-wider hover:bg-[#A8842E] transition-colors"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-5 py-2 border border-[#736D63] text-[#D4CEC4] text-sm font-body uppercase tracking-wider hover:border-[#C8A23D] hover:text-[#C8A23D] transition-colors"
                    >
                      Reject All
                    </button>
                    <a
                      href="/privacy"
                      className="px-5 py-2 text-[#A39D93] text-sm font-body uppercase tracking-wider hover:text-[#C8A23D] transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 text-[#736D63] hover:text-[#C8A23D] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

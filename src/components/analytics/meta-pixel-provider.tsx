'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ConsentState, AnalyticsConsentContextType } from '@/lib/analytics/types';

const CONSENT_STORAGE_KEY = 'gv-analytics-consent';

const AnalyticsConsentContext = createContext<AnalyticsConsentContextType | null>(null);

export function AnalyticsConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        setConsentState(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const setConsent = useCallback((newConsent: ConsentState) => {
    setConsentState(newConsent);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    } catch {
      // storage full or unavailable
    }
  }, []);

  const revokeConsent = useCallback(() => {
    const revoked: ConsentState = { analytics: false, marketing: false, timestamp: Date.now() };
    setConsentState(revoked);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(revoked));
    } catch {
      // ignore
    }
  }, []);

  const hasConsent = consent?.analytics === true || consent?.marketing === true;

  return (
    <AnalyticsConsentContext.Provider value={{ consent, hasConsent, setConsent, revokeConsent }}>
      {children}
    </AnalyticsConsentContext.Provider>
  );
}

export function useAnalyticsConsent(): AnalyticsConsentContextType {
  const context = useContext(AnalyticsConsentContext);
  if (!context) {
    return { consent: null, hasConsent: false, setConsent: () => {}, revokeConsent: () => {} };
  }
  return context;
}

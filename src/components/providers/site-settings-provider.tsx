'use client';

import { createContext, useContext } from 'react';

/**
 * Site Settings, made available to client components.
 *
 * The root layout already loads Site Settings for the header and footer. Sections
 * like the "Check Availability" band are client components rendered from a dozen
 * pages, so rather than threading the same two values through every page, they
 * read them from here.
 */
export interface SiteSettingsValue {
  phone?: string;
  ctaPhoneLabel?: string;
}

const SiteSettingsContext = createContext<SiteSettingsValue>({});

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettingsValue;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettingsValue {
  return useContext(SiteSettingsContext);
}

'use client';

import { useCallback } from 'react';
import { trackLead, trackViewContent, trackCompleteRegistration, trackContact, trackCustom } from '@/lib/analytics/meta-pixel';
import { useAnalyticsConsent } from '@/components/analytics/meta-pixel-provider';
import type { MetaPixelViewContentParams, MetaPixelLeadParams, MetaPixelCompleteRegistrationParams } from '@/lib/analytics/types';

export function useMetaPixel() {
  const { hasConsent } = useAnalyticsConsent();

  const safeTrack = useCallback(
    <T extends unknown[]>(tracker: (...args: T) => void, ...args: T): void => {
      if (hasConsent) {
        tracker(...args);
      }
    },
    [hasConsent]
  );

  const trackLeadEvent = useCallback(
    (params?: MetaPixelLeadParams) => {
      safeTrack(trackLead, params);
    },
    [safeTrack]
  );

  const trackViewContentEvent = useCallback(
    (params?: MetaPixelViewContentParams) => {
      safeTrack(trackViewContent, params);
    },
    [safeTrack]
  );

  const trackCompleteRegistrationEvent = useCallback(
    (params?: MetaPixelCompleteRegistrationParams) => {
      safeTrack(trackCompleteRegistration, params);
    },
    [safeTrack]
  );

  const trackContactEvent = useCallback(() => {
    safeTrack(trackContact);
  }, [safeTrack]);

  const trackCustomEvent = useCallback(
    (eventName: string, params?: Record<string, unknown>) => {
      safeTrack(trackCustom, eventName, params);
    },
    [safeTrack]
  );

  return {
    trackLead: trackLeadEvent,
    trackViewContent: trackViewContentEvent,
    trackCompleteRegistration: trackCompleteRegistrationEvent,
    trackContact: trackContactEvent,
    trackCustom: trackCustomEvent,
    hasConsent,
  };
}

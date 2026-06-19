declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq?: typeof Window.prototype.fbq;
  }
}

export type MetaPixelStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Purchase'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Search'
  | 'Contact'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'Schedule'
  | 'ShowTime';

export type MetaPixelCustomEvent = string;

export interface MetaPixelViewContentParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}

export interface MetaPixelLeadParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}

export interface MetaPixelCompleteRegistrationParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  status?: boolean;
}

export interface MetaPixelEventParams {
  event_name: MetaPixelStandardEvent | MetaPixelCustomEvent;
  params?: MetaPixelViewContentParams | MetaPixelLeadParams | MetaPixelCompleteRegistrationParams;
}

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export interface AnalyticsConsentContextType {
  consent: ConsentState | null;
  hasConsent: boolean;
  setConsent: (consent: ConsentState) => void;
  revokeConsent: () => void;
}

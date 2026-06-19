import type { MetaPixelStandardEvent, MetaPixelViewContentParams, MetaPixelLeadParams, MetaPixelCompleteRegistrationParams } from './types';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function isFbqAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function trackEvent(
  event: MetaPixelStandardEvent | string,
  params?: MetaPixelViewContentParams | MetaPixelLeadParams | MetaPixelCompleteRegistrationParams
): void {
  if (!PIXEL_ID || !isFbqAvailable()) return;

  if (params) {
    window.fbq('track', event, params);
  } else {
    window.fbq('track', event);
  }
}

function trackCustomEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!PIXEL_ID || !isFbqAvailable()) return;

  if (params) {
    window.fbq('trackCustom', eventName, params);
  } else {
    window.fbq('trackCustom', eventName);
  }
}

export function trackPageView(): void {
  trackEvent('PageView');
}

export function trackViewContent(params?: MetaPixelViewContentParams): void {
  trackEvent('ViewContent', params);
}

export function trackLead(params?: MetaPixelLeadParams): void {
  trackEvent('Lead', params);
}

export function trackCompleteRegistration(params?: MetaPixelCompleteRegistrationParams): void {
  trackEvent('CompleteRegistration', params);
}

export function trackPurchase(params: { value: number; currency: string; content_ids?: string[] }): void {
  trackEvent('Purchase', params);
}

export function trackContact(): void {
  trackEvent('Contact');
}

export function trackSchedule(params?: { content_name?: string; content_ids?: string[] }): void {
  trackEvent('Schedule', params);
}

export function trackCustom(eventName: string, params?: Record<string, unknown>): void {
  trackCustomEvent(eventName, params);
}

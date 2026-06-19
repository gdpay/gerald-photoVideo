'use client';

import { useEffect } from 'react';
import { useMetaPixel } from '@/hooks/use-meta-pixel';

export function ThankYouTracker() {
  const { trackCompleteRegistration } = useMetaPixel();

  useEffect(() => {
    trackCompleteRegistration({
      content_name: 'Contact Form Submission',
      content_category: 'lead',
    });
  }, [trackCompleteRegistration]);

  return null;
}
